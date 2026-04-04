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

      // If filtering by topic, first get matching letter IDs from tags table
      let letterIdsForTopic: string[] | null = null;
      if (filters.topic) {
        const { data: tagRows, error: tagError } = await appSupabase
          .from('sec_comment_letter_tags')
          .select('comment_letter_id')
          .eq('tag', filters.topic);
        if (tagError) throw tagError;
        letterIdsForTopic = (tagRows || []).map(r => r.comment_letter_id);
        if (letterIdsForTopic.length === 0) {
          return { data: [], count: 0, page, pageSize: PAGE_SIZE, totalPages: 0 };
        }
      }

      // Query the base letters table
      let query = appSupabase
        .from('sec_comment_letters')
        .select('id, company_name, ticker, cik, date_filed, industry, ai_summary, sec_url, letter_type, filing_type, form_type, file_number, slug, created_at', { count: 'exact' })
        .eq('accounting_relevant', true);

      // Topic filter — use the IDs we fetched
      if (letterIdsForTopic) {
        query = query.in('id', letterIdsForTopic);
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

      // Fetch tags for the returned letters
      const letterIds = letters.map(l => l.id);
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

      const totalCount = count || 0;
      const enriched: CommentLetter[] = letters.map(l => ({
        ...l,
        tags: tagsByLetter.get(l.id)?.tags || [],
        primary_tags: tagsByLetter.get(l.id)?.primary_tags || [],
      }));

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
