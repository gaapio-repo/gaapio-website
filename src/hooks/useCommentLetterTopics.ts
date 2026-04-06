import { useQuery } from '@tanstack/react-query';
import { appSupabase } from '@/integrations/supabase/appClient';
import type { TopicStat } from '@/types/commentLetters';

export function useCommentLetterTopics() {
  return useQuery<TopicStat[]>({
    queryKey: ['comment-letter-topics'],
    staleTime: 15 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await appSupabase
        .from('sec_comment_letter_topic_stats')
        .select('*')
        .order('letter_count', { ascending: false });

      if (error) throw error;
      return (data || []) as TopicStat[];
    },
  });
}
