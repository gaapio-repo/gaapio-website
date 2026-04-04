import { useQuery } from '@tanstack/react-query';
import { appSupabase } from '@/integrations/supabase/appClient';
import type { CommentLetterDetail } from '@/types/commentLetters';

export function useCommentLetterDetail(slug: string | undefined) {
  return useQuery<CommentLetterDetail | null>({
    queryKey: ['comment-letter', slug],
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
    queryFn: async () => {
      if (!slug) return null;

      // Fetch the letter by slug
      const { data: letter, error: letterError } = await appSupabase
        .from('sec_comment_letters')
        .select('*')
        .eq('slug', slug)
        .eq('accounting_relevant', true)
        .maybeSingle();

      if (letterError) throw letterError;
      if (!letter) return null;

      // Fetch tags and content in parallel
      const [tagsResult, contentResult] = await Promise.all([
        appSupabase
          .from('sec_comment_letter_tags')
          .select('tag, tag_type')
          .eq('comment_letter_id', letter.id),
        appSupabase
          .from('sec_comment_contents')
          .select('cleaned_text')
          .eq('comment_letter_id', letter.id)
          .maybeSingle(),
      ]);

      if (tagsResult.error) throw tagsResult.error;

      const tags = (tagsResult.data || []).map(t => t.tag);
      const primaryTags = (tagsResult.data || [])
        .filter(t => t.tag_type === 'primary')
        .map(t => t.tag);

      return {
        ...letter,
        tags,
        primary_tags: primaryTags,
        cleaned_text: contentResult.data?.cleaned_text || null,
      } as CommentLetterDetail;
    },
  });
}
