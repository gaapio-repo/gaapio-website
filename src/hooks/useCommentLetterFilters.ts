import { useQuery } from '@tanstack/react-query';
import { appSupabase } from '@/integrations/supabase/appClient';

interface FilterOptions {
  years: string[];
  industries: string[];
  letterTypes: string[];
}

export function useCommentLetterFilterOptions() {
  return useQuery<FilterOptions>({
    queryKey: ['comment-letter-filter-options'],
    staleTime: 30 * 60 * 1000,
    queryFn: async () => {
      // Fetch years, industries, and letter types in parallel
      const [yearsResult, industriesResult, typesResult] = await Promise.all([
        appSupabase.rpc('get_comment_letter_years'),
        appSupabase
          .from('sec_comment_letters')
          .select('industry')
          .eq('accounting_relevant', true)
          .not('industry', 'is', null),
        appSupabase
          .from('sec_comment_letters')
          .select('letter_type')
          .eq('accounting_relevant', true)
          .not('letter_type', 'is', null),
      ]);

      if (yearsResult.error) throw yearsResult.error;

      const years = (yearsResult.data || []).map((r: { year: string }) => r.year);

      const industries = [...new Set(
        (industriesResult.data || []).map((r: { industry: string }) => r.industry)
      )].sort();

      const letterTypes = [...new Set(
        (typesResult.data || []).map((r: { letter_type: string }) => r.letter_type)
      )].sort();

      return { years, industries, letterTypes };
    },
  });
}
