import { useQuery } from '@tanstack/react-query';
import { appSupabase } from '@/integrations/supabase/appClient';

export interface ThreadLetter {
  id: string;
  company_name: string;
  letter_type: string;
  date_filed: string;
  slug: string | null;
  file_number: string | null;
  ai_summary: string | null;
  sec_url: string | null;
  raw_text: string | null;
  cleaned_text: string | null;
}

export function useCommentLetterThread(fileNumber: string | null | undefined, currentId: string) {
  return useQuery<ThreadLetter[]>({
    queryKey: ['comment-letter-thread', fileNumber],
    enabled: !!fileNumber,
    staleTime: 15 * 60 * 1000,
    queryFn: async () => {
      if (!fileNumber) return [];

      // Fetch all letters in this thread
      const { data: letters, error } = await appSupabase
        .from('sec_comment_letters')
        .select('id, company_name, letter_type, date_filed, slug, file_number, ai_summary, sec_url')
        .eq('file_number', fileNumber)
        .order('date_filed', { ascending: true });

      if (error) throw error;
      if (!letters || letters.length === 0) return [];

      // Fetch content for all letters in parallel
      const letterIds = letters.map(l => l.id);
      const { data: contents } = await appSupabase
        .from('sec_comment_contents')
        .select('comment_letter_id, raw_text, cleaned_text')
        .in('comment_letter_id', letterIds);

      const contentMap = new Map<string, { raw_text: string | null; cleaned_text: string | null }>();
      for (const c of (contents || [])) {
        contentMap.set(c.comment_letter_id, {
          raw_text: c.raw_text,
          cleaned_text: c.cleaned_text,
        });
      }

      return letters.map(l => ({
        ...l,
        raw_text: contentMap.get(l.id)?.raw_text || null,
        cleaned_text: contentMap.get(l.id)?.cleaned_text || null,
      })) as ThreadLetter[];
    },
  });
}
