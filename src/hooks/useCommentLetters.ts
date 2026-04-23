import { useQuery } from '@tanstack/react-query';
import { appSupabase } from '@/integrations/supabase/appClient';
import type { CommentLetter, CommentLetterFilters, PaginatedResult } from '@/types/commentLetters';

const PAGE_SIZE = 25;

export function useCommentLetters(filters: CommentLetterFilters) {
  return useQuery<PaginatedResult<CommentLetter>>({
    queryKey: ['comment-letters', filters],
    queryFn: async () => {
      const page = filters.page || 1;
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      // Build the select — if topic filter is active, use inner join with tags table
      const selectFields = 'id, company_name, ticker, cik, date_filed, industry, ai_summary, sec_url, letter_type, filing_type, form_type, file_number, slug, created_at';

      let query;
      if (filters.topic) {
        // Inner join: only return letters that have a matching tag
        query = appSupabase
          .from('sec_comment_letters')
          .select(`${selectFields}, sec_comment_letter_tags!inner(tag)`, { count: 'exact' })
          .eq('accounting_relevant', true)
          .eq('sec_comment_letter_tags.tag', filters.topic);
      } else {
        query = appSupabase
          .from('sec_comment_letters')
          .select(selectFields, { count: 'exact' })
          .eq('accounting_relevant', true);
      }

      // Public companies filter (default: true — only show companies with tickers)
      if (filters.publicOnly !== false) {
        query = query.not('ticker', 'is', null);
      }

      // Search filter
      if (filters.search) {
        const searchTerm = `%${filters.search}%`;
        query = query.or(
          `company_name.ilike.${searchTerm},ticker.ilike.${searchTerm},ai_summary.ilike.${searchTerm}`
        );
      }

      // Year filter
      if (filters.year) {
        query = query.gte('date_filed', `${filters.year}-01-01`)
          .lte('date_filed', `${filters.year}-12-31`);
      }

      // Letter type filter
      if (filters.letterType) {
        query = query.eq('letter_type', filters.letterType);
      }

      // Industry filter
      if (filters.industry) {
        query = query.eq('industry', filters.industry);
      }

      // Sorting
      switch (filters.sort) {
        case 'date_asc':
          query = query.order('date_filed', { ascending: true });
          break;
        case 'company_asc':
          query = query.order('company_name', { ascending: true });
          break;
        case 'date_desc':
        default:
          query = query.order('date_filed', { ascending: false });
          break;
      }

      // Pagination
      query = query.range(from, to);

      const { data: letters, error, count } = await query;
      if (error) throw error;

      if (!letters || letters.length === 0) {
        return { data: [], count: count || 0, page, pageSize: PAGE_SIZE, totalPages: Math.ceil((count || 0) / PAGE_SIZE) };
      }

      // Fetch tags for the returned letters (only 25 IDs max — safe for .in())
      const letterIds = letters.map((l: any) => l.id);
      const { data: tags } = await appSupabase
        .from('sec_comment_letter_tags')
        .select('comment_letter_id, tag, tag_type')
        .in('comment_letter_id', letterIds);

      // Group tags by letter
      const tagsByLetter = new Map<string, { tags: string[]; primary_tags: string[] }>();
      for (const t of (tags || [])) {
        if (!tagsByLetter.has(t.comment_letter_id)) {
          tagsByLetter.set(t.comment_letter_id, { tags: [], primary_tags: [] });
        }
        const entry = tagsByLetter.get(t.comment_letter_id)!;
        if (!entry.tags.includes(t.tag)) entry.tags.push(t.tag);
        if (t.tag_type === 'primary' && !entry.primary_tags.includes(t.tag)) entry.primary_tags.push(t.tag);
      }

      // Fetch the full thread letter counts for file_numbers on this page
      // so thread cards show the real count, not just what's on this page
      const fileNumbers = [...new Set(letters.map((l: any) => l.file_number).filter(Boolean))];
      const threadCountMap = new Map<string, number>();

      if (fileNumbers.length > 0) {
        // Count ALL letters per thread (not just accounting_relevant) so the
        // card count matches what the detail page timeline shows
        const { data: threadCounts } = await appSupabase
          .from('sec_comment_letters')
          .select('file_number')
          .in('file_number', fileNumbers);

        if (threadCounts) {
          // Count occurrences of each file_number
          for (const row of threadCounts) {
            const fn = row.file_number;
            if (fn) threadCountMap.set(fn, (threadCountMap.get(fn) || 0) + 1);
          }
        }
      }

      const totalCount = count || 0;
      const enriched: CommentLetter[] = letters.map((l: any) => {
        // Strip the joined tag data from the response
        const { sec_comment_letter_tags, ...letterData } = l;
        return {
          ...letterData,
          thread_total: l.file_number ? (threadCountMap.get(l.file_number) || 1) : 1,
          tags: tagsByLetter.get(l.id)?.tags || [],
          primary_tags: tagsByLetter.get(l.id)?.primary_tags || [],
        };
      });

      return {
        data: enriched,
        count: totalCount,
        page,
        pageSize: PAGE_SIZE,
        totalPages: Math.ceil(totalCount / PAGE_SIZE),
      };
    },
  });
}
