import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ResponsiveContainer } from '@/components/layout/ResponsiveContainer';
import { CommentLetterHero } from '@/components/comment-letters/CommentLetterHero';
import { CommentLetterThreadCard } from '@/components/comment-letters/CommentLetterThreadCard';
import { CommentLetterFilterBar } from '@/components/comment-letters/CommentLetterFilterBar';
import { CommentLetterPagination } from '@/components/comment-letters/CommentLetterPagination';
import { SoftCTA } from '@/components/comment-letters/SoftCTA';
import { SkeletonCards } from '@/components/comment-letters/SkeletonCards';
import { EmptyState } from '@/components/comment-letters/EmptyState';
import { CommentLetterStructuredData, buildBreadcrumbSchema, buildDatasetSchema } from '@/components/comment-letters/CommentLetterStructuredData';
import { useURLFilters } from '@/hooks/useURLFilters';
import { useCommentLetters } from '@/hooks/useCommentLetters';
import { useCommentLetterTopics } from '@/hooks/useCommentLetterTopics';
import { useCommentLetterFilterOptions } from '@/hooks/useCommentLetterFilters';
import { groupIntoThreads } from '@/types/commentLetters';
import { ToolPageWrapper } from '@/components/tools/ToolPageWrapper';

export default function CommentLetters() {
  const [filters, setFilters] = useURLFilters();
  const { data: results, isLoading } = useCommentLetters(filters);
  const { data: topics } = useCommentLetterTopics();
  const { data: filterOptions } = useCommentLetterFilterOptions();

  const totalLetters = results?.count || 0;
  const page = filters.page || 1;

  const threads = useMemo(() => {
    if (!results?.data) return [];
    return groupIntoThreads(results.data);
  }, [results?.data]);

  return (
    <ToolPageWrapper toolSlug="sec-comment-letters">
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

      <CommentLetterHero
        title="SEC Comment Letter Browser"
        description={totalLetters > 0
          ? `Search ${totalLetters.toLocaleString()} SEC comment letters with AI summaries and ASC topic classification.`
          : 'Search SEC comment letters with AI summaries and ASC topic classification.'}
        subtitle="Free and open. No login required."
      />

      <section className="py-4 md:py-6">
        <ResponsiveContainer className="max-w-7xl">
          <CommentLetterFilterBar
            filters={filters}
            onFilterChange={setFilters}
            filterOptions={filterOptions || { years: [], industries: [], letterTypes: [] }}
            topics={topics}
          />

          <div className="mt-5 mb-2">
            <Link to="/comment-letters/topics" className="text-sm text-primary hover:underline transition-colors">
              Browse all {topics?.length || ''} topics →
            </Link>
          </div>

          {!isLoading && results && (
            <p className="text-xs text-muted-foreground/70 mt-5 mb-3">
              {results.count === 0
                ? 'No letters match your filters.'
                : `Showing ${threads.length} of ${results.count.toLocaleString()} results`}
            </p>
          )}

          {isLoading && <SkeletonCards />}

          {!isLoading && threads.length > 0 && (
            <>
              <div>
                {threads.map(thread => (
                  <CommentLetterThreadCard key={thread.file_number || thread.slug} thread={thread} />
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

          {!isLoading && results && results.data.length === 0 && (
            <EmptyState
              onClear={() => setFilters({ search: undefined, topic: undefined, year: undefined, letterType: undefined, industry: undefined })}
            />
          )}
        </ResponsiveContainer>
      </section>

      <SoftCTA />
      <Footer />
    </div>
    </ToolPageWrapper>
  );
}
