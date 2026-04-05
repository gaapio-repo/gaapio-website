import { useParams } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ResponsiveContainer } from '@/components/layout/ResponsiveContainer';
import { BreadcrumbNav } from '@/components/comment-letters/BreadcrumbNav';
import { CommentLetterHero } from '@/components/comment-letters/CommentLetterHero';
import { CommentLetterThreadCard } from '@/components/comment-letters/CommentLetterThreadCard';
import { CommentLetterFilterBar } from '@/components/comment-letters/CommentLetterFilterBar';
import { CommentLetterPagination } from '@/components/comment-letters/CommentLetterPagination';
import { SoftCTA } from '@/components/comment-letters/SoftCTA';
import { SkeletonCards } from '@/components/comment-letters/SkeletonCards';
import { EmptyState } from '@/components/comment-letters/EmptyState';
import { CommentLetterStructuredData, buildBreadcrumbSchema, buildFAQSchema, buildCollectionPageSchema } from '@/components/comment-letters/CommentLetterStructuredData';
import { useURLFilters } from '@/hooks/useURLFilters';
import { useCommentLetters } from '@/hooks/useCommentLetters';
import { useCommentLetterTopics } from '@/hooks/useCommentLetterTopics';
import { useCommentLetterFilterOptions } from '@/hooks/useCommentLetterFilters';
import { slugToTopicPattern, groupIntoThreads } from '@/types/commentLetters';
import { useMemo } from 'react';

export default function CommentLetterTopicDetail() {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  const { data: allTopics, isLoading: topicsLoading } = useCommentLetterTopics();
  const { data: filterOptions } = useCommentLetterFilterOptions();

  const topicPattern = topicSlug ? slugToTopicPattern(topicSlug) : '';
  const matchedTopic = useMemo(() => {
    if (!allTopics || !topicPattern) return null;
    return allTopics.find(t => t.topic.toLowerCase().includes(topicPattern.toLowerCase())) || null;
  }, [allTopics, topicPattern]);

  const topicName = matchedTopic?.topic || topicPattern;

  const [filters, setFilters] = useURLFilters();
  const effectiveFilters = useMemo(() => ({ ...filters, topic: topicName }), [filters, topicName]);

  const { data: results, isLoading: lettersLoading } = useCommentLetters(effectiveFilters);
  const page = filters.page || 1;

  const threads = useMemo(() => {
    if (!results?.data) return [];
    return groupIntoThreads(results.data);
  }, [results?.data]);

  const isLoading = topicsLoading || lettersLoading;

  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title={`SEC Comment Letters: ${topicName}`}
        description={`Browse ${matchedTopic?.letter_count || ''} SEC comment letters related to ${topicName}, with AI summaries.`}
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
          buildFAQSchema(topicName, matchedTopic?.letter_count || 0,
            `SEC staff frequently questions companies about their application and disclosure of ${topicName}. Common areas of inquiry include measurement approaches, disclosure completeness, and the basis for significant judgments and estimates.`),
        ]}
      />
      <Header />

      <CommentLetterHero
        title={`SEC Comment Letters — ${topicName}`}
        description={matchedTopic
          ? `${matchedTopic.letter_count} comment ${matchedTopic.letter_count === 1 ? 'letter' : 'letters'} addressing ${topicName}`
          : `SEC comment letters related to ${topicName}`}
      />

      <section className="py-4 md:py-6">
        <ResponsiveContainer className="max-w-7xl">
          <BreadcrumbNav items={[
            { name: 'Home', url: '/' },
            { name: 'Comment Letters', url: '/comment-letters' },
            { name: 'Topics', url: '/comment-letters/topics' },
            { name: topicName },
          ]} />

          <div className="mb-6">
            <h2 className="text-base font-semibold mb-2">
              What does the SEC commonly ask about {topicName}?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              SEC staff frequently questions companies about their application and disclosure of {topicName}.
              Common areas of inquiry include measurement approaches, disclosure completeness, and the basis
              for significant judgments and estimates related to this accounting area.
            </p>
          </div>

          <CommentLetterFilterBar
            filters={filters}
            onFilterChange={setFilters}
            filterOptions={filterOptions || { years: [], industries: [], letterTypes: [] }}
            lockedTopic={topicName}
          />

          {!isLoading && results && (
            <p className="text-xs text-muted-foreground/70 mt-5 mb-3">
              {results.count === 0
                ? 'No letters match your filters.'
                : `Showing ${threads.length} thread${threads.length !== 1 ? 's' : ''} · ${results.count.toLocaleString()} letters total`}
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
            <EmptyState description="Try adjusting your filters." />
          )}
        </ResponsiveContainer>
      </section>

      <SoftCTA context={topicName} />
      <Footer />
    </div>
  );
}
