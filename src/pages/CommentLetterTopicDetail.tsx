import { useParams, Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ResponsiveContainer } from '@/components/layout/ResponsiveContainer';
import { GradientBackground } from '@/components/home/GradientBackground';
import { Skeleton } from '@/components/ui/skeleton';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { CommentLetterCard } from '@/components/comment-letters/CommentLetterCard';
import { CommentLetterFilterBar } from '@/components/comment-letters/CommentLetterFilterBar';
import { CommentLetterPagination } from '@/components/comment-letters/CommentLetterPagination';
import { SoftCTA } from '@/components/comment-letters/SoftCTA';
import { CommentLetterStructuredData, buildBreadcrumbSchema, buildFAQSchema, buildCollectionPageSchema } from '@/components/comment-letters/CommentLetterStructuredData';
import { useURLFilters } from '@/hooks/useURLFilters';
import { useCommentLetters } from '@/hooks/useCommentLetters';
import { useCommentLetterTopics } from '@/hooks/useCommentLetterTopics';
import { useCommentLetterFilterOptions } from '@/hooks/useCommentLetterFilters';
import { slugToTopicPattern } from '@/types/commentLetters';
import { FileSearch } from 'lucide-react';
import { useMemo } from 'react';

export default function CommentLetterTopicDetail() {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  const { data: allTopics, isLoading: topicsLoading } = useCommentLetterTopics();
  const { data: filterOptions } = useCommentLetterFilterOptions();

  // Resolve the topic name from the slug
  const topicPattern = topicSlug ? slugToTopicPattern(topicSlug) : '';
  const matchedTopic = useMemo(() => {
    if (!allTopics || !topicPattern) return null;
    return allTopics.find(t =>
      t.topic.toLowerCase().includes(topicPattern.toLowerCase())
    ) || null;
  }, [allTopics, topicPattern]);

  const topicName = matchedTopic?.topic || topicPattern;

  // Use URL filters but force topic filter
  const [filters, setFilters] = useURLFilters();
  const effectiveFilters = useMemo(() => ({
    ...filters,
    topic: topicName,
  }), [filters, topicName]);

  const { data: results, isLoading: lettersLoading } = useCommentLetters(effectiveFilters);
  const page = filters.page || 1;

  const isLoading = topicsLoading || lettersLoading;

  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title={`SEC Comment Letters: ${topicName}`}
        description={`Browse ${matchedTopic?.letter_count || ''} SEC comment letters related to ${topicName}, with AI summaries explaining what the SEC asked and why it matters.`}
        canonical={`/comment-letters/topics/${topicSlug}`}
        keywords={[topicName, 'SEC comment letters', 'SEC scrutiny', 'accounting standards']}
      />
      <CommentLetterStructuredData
        schemas={[
          buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'SEC Comment Letters', url: '/comment-letters' },
            { name: 'Topics', url: '/comment-letters/topics' },
            { name: topicName, url: `/comment-letters/topics/${topicSlug}` },
          ]),
          buildCollectionPageSchema(topicName, `/comment-letters/topics/${topicSlug}`),
          buildFAQSchema(
            topicName,
            matchedTopic?.letter_count || 0,
            `SEC staff frequently questions companies about their application and disclosure of ${topicName}. Common areas of inquiry include measurement approaches, disclosure completeness, and the basis for significant judgments and estimates.`
          ),
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <GradientBackground />
        <ResponsiveContainer className="relative z-10 text-center max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            SEC Comment Letters — {topicName}
          </h1>
          <p className="text-lg text-white/80">
            {matchedTopic
              ? `${matchedTopic.letter_count} comment ${matchedTopic.letter_count === 1 ? 'letter' : 'letters'} addressing ${topicName}`
              : `SEC comment letters related to ${topicName}`}
          </p>
        </ResponsiveContainer>
      </section>

      <section className="py-8 md:py-12">
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
                <BreadcrumbLink asChild>
                  <Link to="/comment-letters/topics">Topics</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{topicName}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Topic overview — question-format headings for AEO */}
          <div className="mb-8 p-6 bg-muted/50 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">
              What does the SEC commonly ask about {topicName}?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              SEC staff frequently questions companies about their application and disclosure of {topicName}.
              Common areas of inquiry include measurement approaches, disclosure completeness, and the basis
              for significant judgments and estimates related to this accounting area.
            </p>
            <h3 className="text-lg font-semibold mb-2">
              How many SEC comment letters have addressed {topicName}?
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {matchedTopic
                ? `As of ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}, the SEC has issued ${matchedTopic.letter_count} comment ${matchedTopic.letter_count === 1 ? 'letter' : 'letters'} referencing ${topicName}.`
                : `Browse the letters below to see SEC correspondence related to ${topicName}.`}
            </p>
          </div>

          {/* Filters (topic locked) */}
          <CommentLetterFilterBar
            filters={filters}
            onFilterChange={setFilters}
            filterOptions={filterOptions || { years: [], industries: [], letterTypes: [] }}
            lockedTopic={topicName}
          />

          {/* Results count */}
          {!isLoading && results && (
            <p className="text-sm text-muted-foreground mt-6 mb-4">
              {results.count === 0
                ? 'No letters match your filters.'
                : `Showing ${((page - 1) * results.pageSize) + 1}–${Math.min(page * results.pageSize, results.count)} of ${results.count.toLocaleString()} letters`}
            </p>
          )}

          {/* Loading */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-3 p-6 border rounded-lg">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ))}
            </div>
          )}

          {/* Results */}
          {!isLoading && results && results.data.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.data.map(letter => (
                  <CommentLetterCard key={letter.id} letter={letter} />
                ))}
              </div>
              <div className="mt-8">
                <CommentLetterPagination
                  currentPage={page}
                  totalPages={results.totalPages}
                  onPageChange={p => setFilters({ page: p })}
                />
              </div>
            </>
          )}

          {/* Empty */}
          {!isLoading && results && results.data.length === 0 && (
            <div className="text-center py-16">
              <FileSearch className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No letters found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters.
              </p>
            </div>
          )}
        </ResponsiveContainer>
      </section>

      <SoftCTA context={topicName} />
      <Footer />
    </div>
  );
}
