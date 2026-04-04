import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ResponsiveContainer } from '@/components/layout/ResponsiveContainer';
import { GradientBackground } from '@/components/home/GradientBackground';
import { Skeleton } from '@/components/ui/skeleton';
import { CommentLetterThreadCard } from '@/components/comment-letters/CommentLetterThreadCard';
import { CommentLetterFilterBar } from '@/components/comment-letters/CommentLetterFilterBar';
import { CommentLetterPagination } from '@/components/comment-letters/CommentLetterPagination';
import { SoftCTA } from '@/components/comment-letters/SoftCTA';
import { CommentLetterStructuredData, buildBreadcrumbSchema, buildDatasetSchema } from '@/components/comment-letters/CommentLetterStructuredData';
import { useURLFilters } from '@/hooks/useURLFilters';
import { useCommentLetters } from '@/hooks/useCommentLetters';
import { useCommentLetterTopics } from '@/hooks/useCommentLetterTopics';
import { useCommentLetterFilterOptions } from '@/hooks/useCommentLetterFilters';
import { groupIntoThreads } from '@/types/commentLetters';
import { FileSearch } from 'lucide-react';

export default function CommentLetters() {
  const [filters, setFilters] = useURLFilters();
  const { data: results, isLoading } = useCommentLetters(filters);
  const { data: topics } = useCommentLetterTopics();
  const { data: filterOptions } = useCommentLetterFilterOptions();

  const totalLetters = results?.count || 0;
  const page = filters.page || 1;

  // Group fetched letters into threads
  const threads = useMemo(() => {
    if (!results?.data) return [];
    return groupIntoThreads(results.data);
  }, [results?.data]);

  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title="SEC Comment Letter Browser — Free Search Tool"
        description={`Search and browse ${totalLetters > 0 ? totalLetters.toLocaleString() : ''} SEC comment letters with AI summaries and ASC topic classification. Free, no login required.`}
        canonical="/comment-letters"
        keywords={['SEC comment letters', 'EDGAR', 'SEC correspondence', 'ASC topics', 'accounting research', 'SEC comment letter search']}
      />
      <CommentLetterStructuredData
        schemas={[
          buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'SEC Comment Letters', url: '/comment-letters' },
          ]),
          buildDatasetSchema(totalLetters),
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative pt-24 pb-8 md:pb-12 overflow-hidden">
        <GradientBackground />
        <ResponsiveContainer className="relative z-10 text-center max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            SEC Comment Letter Browser
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            {totalLetters > 0
              ? `Search ${totalLetters.toLocaleString()} SEC comment letters with AI summaries and ASC topic classification.`
              : 'Search SEC comment letters with AI summaries and ASC topic classification.'}
          </p>
          <p className="text-sm text-white/70 mt-2">
            Free and open. No login required.
          </p>
        </ResponsiveContainer>
      </section>

      {/* Filters + Results */}
      <section className="py-4 md:py-6">
        <ResponsiveContainer className="max-w-7xl">
          <CommentLetterFilterBar
            filters={filters}
            onFilterChange={setFilters}
            filterOptions={filterOptions || { years: [], industries: [], letterTypes: [] }}
            topics={topics}
          />

          {/* Topics link */}
          <div className="mt-5 mb-2">
            <Link to="/comment-letters/topics" className="text-sm text-primary hover:underline transition-colors">
              Browse all {topics?.length || ''} topics →
            </Link>
          </div>

          {/* Results count */}
          {!isLoading && results && (
            <p className="text-xs text-muted-foreground/70 mt-5 mb-3">
              {results.count === 0
                ? 'No letters match your filters.'
                : `Showing ${threads.length} thread${threads.length !== 1 ? 's' : ''} · ${results.count.toLocaleString()} letters total`}
            </p>
          )}

          {/* Loading state */}
          {isLoading && (
            <div className="mt-6 space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="py-5 px-6 rounded-lg bg-muted/40 space-y-2.5">
                  <Skeleton className="h-5 w-1/3" />
                  <Skeleton className="h-3.5 w-1/4" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              ))}
            </div>
          )}

          {/* Results — grouped by thread */}
          {!isLoading && threads.length > 0 && (
            <>
              <div>
                {threads.map(thread => (
                  <CommentLetterThreadCard
                    key={thread.file_number || thread.slug}
                    thread={thread}
                  />
                ))}
              </div>

              <div className="mt-8">
                <CommentLetterPagination
                  currentPage={page}
                  totalPages={results?.totalPages || 1}
                  onPageChange={p => setFilters({ page: p })}
                />
              </div>
            </>
          )}

          {/* Empty state */}
          {!isLoading && results && results.data.length === 0 && (
            <div className="text-center py-16">
              <FileSearch className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No letters found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters.
              </p>
              <button
                onClick={() => setFilters({ search: undefined, topic: undefined, year: undefined, letterType: undefined, industry: undefined })}
                className="text-primary hover:underline text-sm"
              >
                Clear all filters
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
