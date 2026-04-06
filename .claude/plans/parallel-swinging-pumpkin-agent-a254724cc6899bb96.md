# SEC Comment Letters AI Tool Integration Plan

## Executive Summary

Make SEC comment letters available as an AI-assisted tool within the Gaapio website. The recommended approach is a **structured database search with LLM synthesis** -- NOT full RAG with vector embeddings. The existing ai_summary, tags, and cleaned_text fields provide sufficient structure for high-quality retrieval without the cost and complexity of embedding 42k+ documents.

---

## Strategic Decision: Why NOT RAG (Yet)

### The case against vector embeddings right now:

1. **You already have structured metadata that captures semantic meaning.** The ai_summary field is a 2-3 sentence description written by Gemini 2.5 Flash. The tags map to specific ASC topics. This IS your semantic layer -- it was created by an LLM that understood the content.

2. **Cost for marginal gain.** Embedding 42k documents (with cleaned_text averaging several KB each) would require ~$50-150 in embedding API costs, a vector database (pgvector extension or external service), and ongoing maintenance for new letters. The ai_summary + tags already answer "what is this letter about?" which is what semantic search solves.

3. **ILIKE on ai_summary is surprisingly good for this domain.** Accounting queries use precise terminology ("revenue recognition", "lease modification", "goodwill impairment"). Users searching SEC comment letters are professionals who know the vocabulary. Fuzzy semantic matching matters less here than in consumer search.

4. **The real value is in synthesis, not retrieval.** Users don't just want "find me letters about ASC 842" -- they want "what has the SEC been asking about lease modifications for tech companies in the last 2 years, and what patterns do you see?" That's an LLM synthesis problem, not a retrieval problem.

### The recommended approach: Structured Search + LLM Synthesis

Use PostgreSQL full-text search (tsvector/tsquery) on ai_summary + company_name + tags as the retrieval layer, then pass the top results to an LLM for synthesis. This gets 90% of RAG's benefit at 10% of the complexity.

**Phase 2 upgrade path:** If structured search proves insufficient, add pgvector embeddings on ai_summary only (not full cleaned_text). This is a ~28k row embedding job on short text, which is fast and cheap. The ai_summary is already a distilled semantic representation.

---

## Architecture Overview

```
User Query (chat UI)
    |
    v
Edge Function: comment-letter-ai-search
    |
    |- 1. Parse intent (LLM call to extract: topic, company, year, industry, question type)
    |
    |- 2. Structured DB search (PostgreSQL full-text search + filters)
    |
    |- 3. Retrieve top N letters with ai_summary + cleaned_text snippets
    |
    +- 4. LLM synthesis (answer the user's question using retrieved context)
    |
    v
Structured response (answer + cited letters + suggested follow-ups)
```

---

## Phase 1: Enhanced Search Infrastructure (Database Layer)

### 1a. Add PostgreSQL Full-Text Search

Create a migration to add tsvector columns and GIN indexes for fast text search.

**New migration file:** `supabase/migrations/YYYYMMDD_comment_letter_fts.sql`

Key elements:
- Add `search_vector tsvector` column to `sec_comment_letters`
- Populate with weighted vectors: company_name/ticker (weight A), ai_summary (weight B), industry (weight C)
- Create GIN index on search_vector
- Add trigger to auto-update search_vector on insert/update
- Use `websearch_to_tsquery` for natural language query parsing (handles AND/OR/NOT, quoted phrases)

### 1b. Create the Search RPC Function

Add a `search_comment_letters` RPC function that accepts:
- `query_text` (text) -- natural language search
- `topic_filter` (text) -- ASC topic code
- `year_from` / `year_to` (integer) -- date range
- `industry_filter` (text)
- `company_filter` (text)
- `result_limit` (integer, default 20)

Returns letters with tags array and ts_rank score, ordered by relevance then date.

This RPC encapsulates the full-text search + filter logic so the edge function only needs one database call.

---

## Phase 2: AI Search Edge Function

### 2a. Edge Function: `comment-letter-ai-search`

**New file:** `supabase/functions/comment-letter-ai-search/index.ts`

This is the core backend. It receives a natural language query, uses an LLM to parse intent, runs structured search, then synthesizes an answer.

**Request shape:**
```
{
  query: string,           // Natural language question
  conversationId?: string  // For follow-up questions (future)
}
```

**Response shape:**
```
{
  answer: string,           // LLM-synthesized answer in markdown
  letters: CitedLetter[],   // Letters used to generate the answer
  suggestedQueries: string[], // Follow-up questions
  searchMetadata: {
    totalFound: number,
    filtersApplied: Record<string, string>,
    searchTimeMs: number
  }
}
```

**Implementation approach -- TWO LLM calls:**

1. **Intent extraction** (fast, small model -- Gemini 2.5 Flash via AI Gateway):
   - Input: user query
   - Output: structured filters (topic, company, year range, industry, search terms)
   - Example: "What has the SEC asked tech companies about revenue recognition since 2023?" becomes `{ topic: "ASC 606", industry: "Technology", year_from: 2023, search_terms: "revenue recognition" }`

2. **Answer synthesis** (Gemini 2.5 Flash or Claude Haiku):
   - Input: user query + top 10-15 retrieved letters (ai_summary + tags + metadata)
   - Output: synthesized answer with citations
   - System prompt instructs: cite specific letters, identify patterns, suggest follow-ups

**Key design decisions:**
- Use Supabase service role key to call the search RPC (edge function runs server-side)
- Store AI Gateway API key as Supabase secret (pattern exists from classification scripts)
- Rate limit: 10 queries per minute per IP (simple in-memory counter)
- No streaming in Phase 2 -- return complete JSON. Streaming adds significant frontend complexity.
- Follow the existing edge function pattern from `track-tool-pageview/index.ts` and `create-checkout/index.ts`

### 2b. Shared Types

**New file:** `supabase/functions/_shared/commentLetterTypes.ts`

Shared TypeScript types for edge function request/response. Keep aligned with frontend types.

---

## Phase 3: Frontend Chat Interface

### 3a. New Component: AI Search Panel

The UI should be a **slide-over panel** (Sheet component from shadcn/ui) that opens from the comment letters browse page, NOT a separate page. This keeps the browse experience intact and makes the AI feel like an enhancement, not a replacement.

**New files:**

| File | Purpose |
|------|---------|
| `src/components/comment-letters/AIChatPanel.tsx` | Main panel component (Sheet wrapper + message list + input) |
| `src/components/comment-letters/AIChatMessage.tsx` | Individual message bubble (user vs AI styling) |
| `src/components/comment-letters/AIChatInput.tsx` | Input bar with submit button and loading state |
| `src/components/comment-letters/AIChatLetterCard.tsx` | Compact letter citation card (clickable, links to detail page) |

**UX flow:**
1. User sees a floating "Ask AI" button on the comment letters browse page
2. Clicking opens a Sheet (slide-over panel) from the right
3. Panel contains a chat-like interface with a text input at the bottom
4. User types a natural language question
5. Loading state shows while edge function processes (2-4 seconds)
6. Response appears as a formatted message with:
   - The synthesized answer (rendered as markdown)
   - Cited letters shown as compact cards (clickable, linking to detail page)
   - 2-3 suggested follow-up questions as clickable chips
7. User can ask follow-up questions in the same panel

### 3b. Hook: `useCommentLetterAISearch`

**New file:** `src/hooks/useCommentLetterAISearch.ts`

Uses React Query `useMutation` (not useQuery) because this is a user-initiated action. Maintains local conversation state for the panel.

Interface:
- `messages: ChatMessage[]` -- conversation history
- `isSearching: boolean` -- loading state
- `search: (query: string) => void` -- trigger a search
- `clearConversation: () => void` -- reset

The hook calls the edge function via fetch (same pattern as `useToolPageTracking.ts` at line 96-101), maintains an array of messages in local state, and does NOT persist conversation history.

### 3c. Integration Points

**Modify `src/pages/CommentLetters.tsx`:**
- Add "Ask AI about these letters" button in the hero or filter bar area
- Import and render `AIChatPanel` with Sheet wrapper
- Pass current filters as context so AI can reference what user is browsing

**Modify `src/pages/CommentLetterDetail.tsx`:**
- Add "Ask AI about this letter" button on detail page
- Opens same panel but pre-fills context about the specific letter being viewed

**No changes to `src/App.tsx`** -- the panel is a Sheet overlay, not a new route.

---

## Phase 4: Polish and Optimization

### 4a. Suggested Queries / Quick Actions
Add pre-built query chips to the AI panel based on current context:
- "What are the most common SEC questions about [current topic]?"
- "Show me recent trends in [current industry]"
- "Compare how different companies responded to [current topic] questions"

### 4b. Analytics
Track AI search usage via new `ai_search_queries` table or extend `tool_page_views`:
- Query text, response time, cited letter click-through, follow-up rate

### 4c. Response Caching
Cache common queries at the edge function level:
- Hash normalized query + filters
- Store in `ai_search_cache` table with 24-hour TTL
- Skip both LLM calls for cache hits
- Invalidate on new letter ingestion

---

## Full File Inventory

### New Files to Create

| File | Purpose |
|------|---------|
| `supabase/migrations/YYYYMMDD_comment_letter_fts.sql` | Full-text search indexes, search_vector column, trigger, search RPC |
| `supabase/functions/comment-letter-ai-search/index.ts` | Edge function: intent parsing + DB search + LLM synthesis |
| `supabase/functions/_shared/commentLetterTypes.ts` | Shared TypeScript types for request/response |
| `src/components/comment-letters/AIChatPanel.tsx` | Slide-over chat panel (Sheet + messages + input) |
| `src/components/comment-letters/AIChatMessage.tsx` | Chat message bubble component |
| `src/components/comment-letters/AIChatInput.tsx` | Chat input with submit button |
| `src/components/comment-letters/AIChatLetterCard.tsx` | Compact letter citation card |
| `src/hooks/useCommentLetterAISearch.ts` | React Query mutation hook for AI search |

### Existing Files to Modify

| File | Change |
|------|--------|
| `src/pages/CommentLetters.tsx` | Add AI search trigger button + AIChatPanel |
| `src/pages/CommentLetterDetail.tsx` | Add contextual "Ask AI" button |
| `src/types/commentLetters.ts` | Add ChatMessage, SearchResponse, CitedLetter types |

### Files That Stay Unchanged

- `src/hooks/useCommentLetters.ts` -- existing browse search stays as-is
- `src/hooks/useCommentLetterDetail.ts` -- no changes
- `src/hooks/useCommentLetterThread.ts` -- no changes
- `src/integrations/supabase/client.ts` -- edge function called via fetch, not supabase client
- `src/integrations/supabase/appClient.ts` -- no changes
- `src/App.tsx` -- no new routes (panel is a Sheet, not a page)

---

## Implementation Sequence

### Sprint 1: Database + Edge Function (~2-3 days)
1. Write and deploy the FTS migration (search_vector + GIN index + trigger + search RPC)
2. Test `search_comment_letters` RPC via Supabase dashboard
3. Build edge function `comment-letter-ai-search` with intent extraction + search + synthesis
4. Add AI Gateway API key as Supabase secret
5. Test edge function with curl

### Sprint 2: Frontend Chat UI (~2-3 days)
6. Build `AIChatPanel`, `AIChatMessage`, `AIChatInput`, `AIChatLetterCard`
7. Build `useCommentLetterAISearch` hook
8. Integrate panel into browse page (`CommentLetters.tsx`)
9. End-to-end testing

### Sprint 3: Polish (~1-2 days)
10. Add contextual AI to detail page
11. Suggested query chips
12. Analytics tracking
13. Response caching (optional)

---

## Cost Estimates

- **Gemini 2.5 Flash for intent extraction:** ~$0.00001 per query
- **Gemini 2.5 Flash for synthesis:** ~$0.0001-0.0005 per query
- **Total per query:** < $0.001
- **At 1,000 queries/day:** ~$1/day, ~$30/month
- **No embedding costs, no vector database, no additional infrastructure**

---

## Risk Mitigation

1. **Search quality:** If PostgreSQL FTS misses relevant results, upgrade path is clear -- add pgvector on ai_summary only (database-only change, no edge function or frontend changes).

2. **LLM latency:** Two sequential LLM calls add 2-4 seconds. Mitigations: (a) cache common queries, (b) streaming in future phase, (c) intent extraction can be replaced with regex/rules for common patterns.

3. **Hallucination:** Synthesis step only has access to retrieved letter data. System prompt must instruct model to ONLY cite retrieved letters, never fabricate. Include letter IDs so citations are verifiable.

4. **Abuse:** Public endpoint with no auth. IP-based rate limiting in edge function. Consider requiring email gate (already built in tool_settings) for AI search specifically.

5. **Cost control:** Set hard limits on tokens per request. Monitor usage via Supabase function logs. Kill switch via tool_settings.enabled flag.
