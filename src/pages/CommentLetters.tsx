import { SEO } from '@/components/SEO';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ResponsiveContainer } from '@/components/layout/ResponsiveContainer';
import { GradientBackground } from '@/components/home/GradientBackground';
import { Skeleton } from '@/components/ui/skeleton';
import { CommentLetterCard } from '@/components/comment-letters/CommentLetterCard';
import { CommentLetterFilterBar } from '@/components/comment-letters/CommentLetterFilterBar';
import { CommentLetterPagination } from '@/components/comment-letters/CommentLetterPagination';
import { SoftCTA } from '@/components/comment-letters/SoftCTA';
import { CommentLetterStructuredData, buildBreadcrumbSchema, buildDatasetSchema } from '@/components/comment-letters/CommentLetterStructuredData';
import { useURLFilters } from '@/hooks/useURLFilters';
import { useCommentLetters } from '@/hooks/useCommentLetters';
import { useCommentLetterTopics } from '@/hooks/useCommentLetterTopics';
import { useCommentLetterFilterOptions } from '@/hooks/useCommentLetterFilters';
import { FileSearch } from 'lucide-react';

export default function CommentLetters() {
  const [filters, setFilters] = useURLFilters();
  const { data: results, isLoading } = useCommentLetters(filters);
  const { data: topics } = useCommentLetterTopics();
  const { data: filterOptions } = useCommentLetterFilterOptions();

  const totalLetters = results?.count || 0;
  const page = filters.page || 1;

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
      <section className="relative py-16 md:py-24 overflow-hidden">
        <GradientBackground />
        <ResponsiveContainer className="relative z-10 text-center max-w-4xl">
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm">
              <FileSearch className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            SEC Comment Letter Browser
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            {totalLetters > 0
              ? `Search ${totalLetters.toLocaleString()} SEC comment letters with AI summaries and ASC topic classification.`
              : 'Search SEC comment letters with AI summaries and ASC topic classification.'}
          </p>
          <p className="text-sm text-white/60 mt-3">
            Free and open. No login required.
          </p>
        </ResponsiveContainer>
      </section>

      {/* Filters + Results */}
      <section className="py-8 md:py-12">
        <ResponsiveContainer className="max-w-7xl">
          <CommentLetterFilterBar
            filters={filters}
            onFilterChange={setFilters}
            filterOptions={filterOptions || { years: [], industries: [], letterTypes: [] }}
            topics={topics}
          />

          {/* Results count */}
          {!isLoading && results && (
            <p className="text-sm text-muted-foreground mt-6 mb-4">
              {results.count === 0
                ? 'No letters match your filters.'
                : `Showing ${((page - 1) * results.pageSize) + 1}–${Math.min(page * results.pageSize, results.count)} of ${results.count.toLocaleString()} letters`}
            </p>
          )}

          {/* Loading state */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-3 p-6 border rounded-lg">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-16 w-full" />
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Results grid */}
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
