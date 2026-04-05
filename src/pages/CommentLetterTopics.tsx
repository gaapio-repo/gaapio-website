import { useState, useMemo } from 'react';
import { SEO } from '@/components/SEO';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ResponsiveContainer } from '@/components/layout/ResponsiveContainer';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { BreadcrumbNav } from '@/components/comment-letters/BreadcrumbNav';
import { CommentLetterHero } from '@/components/comment-letters/CommentLetterHero';
import { TopicCard } from '@/components/comment-letters/TopicCard';
import { SoftCTA } from '@/components/comment-letters/SoftCTA';
import { INPUT_STYLES } from '@/components/comment-letters/styles';
import { CommentLetterStructuredData, buildBreadcrumbSchema } from '@/components/comment-letters/CommentLetterStructuredData';
import { useCommentLetterTopics } from '@/hooks/useCommentLetterTopics';
import { appSupabase } from '@/integrations/supabase/appClient';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';

export default function CommentLetterTopics() {
  const { data: topics, isLoading } = useCommentLetterTopics();
  const [search, setSearch] = useState('');

  const filteredTopics = (topics || []).filter(t =>
    t.topic.toLowerCase().includes(search.toLowerCase())
  );

  const { data: letterCount } = useQuery({
    queryKey: ['comment-letter-total-count'],
    staleTime: 30 * 60 * 1000,
    queryFn: async () => {
      const { count, error } = await appSupabase
        .from('sec_comment_letters')
        .select('id', { count: 'exact', head: true })
        .eq('accounting_relevant', true);
      if (error) throw error;
      return count || 0;
    },
  });
  const totalLetters = letterCount || 0;
  const allCounts = useMemo(() => (topics || []).map(t => t.letter_count).sort((a, b) => a - b), [topics]);

  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title="Browse SEC Comment Letters by ASC Topic"
        description={`Explore SEC comment letters organized by ${topics?.length || ''} ASC Codification topics. Find SEC scrutiny patterns by accounting standard.`}
        canonical="/comment-letters/topics"
        keywords={['ASC topics', 'SEC comment letter topics', 'accounting standards', 'FASB ASC', 'SEC scrutiny by topic']}
      />
      <CommentLetterStructuredData
        schemas={[buildBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'SEC Comment Letters', url: '/comment-letters' },
          { name: 'Topics', url: '/comment-letters/topics' },
        ])]}
      />
      <Header />

      <CommentLetterHero
        title="SEC Comment Letters by ASC Topic"
        description={topics && topics.length > 0
          ? `Browse ${topics.length} accounting topics across ${totalLetters.toLocaleString()} SEC comment letters.`
          : 'Browse SEC comment letters organized by ASC Codification topic.'}
      />

      <section className="py-4 md:py-6">
        <ResponsiveContainer className="max-w-7xl">
          <BreadcrumbNav items={[
            { name: 'Home', url: '/' },
            { name: 'Comment Letters', url: '/comment-letters' },
            { name: 'Topics' },
          ]} />

          <div className="relative max-w-md mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search topics..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={`pl-9 ${INPUT_STYLES}`}
            />
          </div>

          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="p-5 rounded-lg bg-muted/40 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          )}

          {!isLoading && filteredTopics.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredTopics.map(topic => (
                <TopicCard key={topic.topic} topic={topic} allCounts={allCounts} />
              ))}
            </div>
          )}

          {!isLoading && filteredTopics.length === 0 && search && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No topics match "{search}"</p>
              <button onClick={() => setSearch('')} className="text-primary hover:underline text-sm mt-2">
                Clear search
              </button>
            </div>
          )}
        </ResponsiveContainer>
      </section>

      <SoftCTA />
      <Footer />
    </div>
  );
}
