import { useState, useMemo } from 'react';
import { SEO } from '@/components/SEO';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ResponsiveContainer } from '@/components/layout/ResponsiveContainer';
import { GradientBackground } from '@/components/home/GradientBackground';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { TopicCard } from '@/components/comment-letters/TopicCard';
import { SoftCTA } from '@/components/comment-letters/SoftCTA';
import { INPUT_STYLES } from '@/components/comment-letters/styles';
import { CommentLetterStructuredData, buildBreadcrumbSchema } from '@/components/comment-letters/CommentLetterStructuredData';
import { useCommentLetterTopics } from '@/hooks/useCommentLetterTopics';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';

export default function CommentLetterTopics() {
  const { data: topics, isLoading } = useCommentLetterTopics();
  const [search, setSearch] = useState('');

  const filteredTopics = (topics || []).filter(t =>
    t.topic.toLowerCase().includes(search.toLowerCase())
  );

  const totalLetters = (topics || []).reduce((sum, t) => sum + t.letter_count, 0);
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
        schemas={[
          buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'SEC Comment Letters', url: '/comment-letters' },
            { name: 'Topics', url: '/comment-letters/topics' },
          ]),
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative pt-24 pb-8 md:pb-10 overflow-hidden">
        <GradientBackground />
        <ResponsiveContainer className="relative z-10 text-center max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            SEC Comment Letters by ASC Topic
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            {topics && topics.length > 0
              ? `Browse ${topics.length} accounting topics across ${totalLetters.toLocaleString()} SEC comment letters.`
              : 'Browse SEC comment letters organized by ASC Codification topic.'}
          </p>
        </ResponsiveContainer>
      </section>

      <section className="py-4 md:py-6">
        <ResponsiveContainer className="max-w-7xl">
          {/* Breadcrumbs */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/comment-letters">Comment Letters</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Topics</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Search */}
          <div className="relative max-w-md mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search topics..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={`pl-9 ${INPUT_STYLES}`}
            />
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="p-6 border rounded-lg space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          )}

          {/* Topics grid */}
          {!isLoading && filteredTopics.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredTopics.map(topic => (
                <TopicCard key={topic.topic} topic={topic} allCounts={allCounts} />
              ))}
            </div>
          )}

          {/* Empty */}
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
