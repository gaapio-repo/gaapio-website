import { useParams, Link } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { SEO } from '@/components/SEO';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ResponsiveContainer } from '@/components/layout/ResponsiveContainer';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { BreadcrumbNav } from '@/components/comment-letters/BreadcrumbNav';
import { TagList } from '@/components/comment-letters/TagList';
import { LetterSlide } from '@/components/comment-letters/LetterSlide';
import { SoftCTA } from '@/components/comment-letters/SoftCTA';
import { CommentLetterStructuredData, buildBreadcrumbSchema, buildWebPageSchema } from '@/components/comment-letters/CommentLetterStructuredData';
import { CARD_STYLES_STATIC } from '@/components/comment-letters/styles';
import { useCommentLetterDetail } from '@/hooks/useCommentLetterDetail';
import { useCommentLetterThread, ThreadLetter } from '@/hooks/useCommentLetterThread';
import { formatDate } from '@/utils/formatDate';
import { ArrowLeft, ArrowRight, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CommentLetterDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: letter, isLoading } = useCommentLetterDetail(slug);
  const { data: threadLetters } = useCommentLetterThread(letter?.file_number, letter?.id || '');

  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);

  const onApiChange = useCallback((newApi: CarouselApi) => {
    setApi(newApi);
    if (!newApi) return;
    newApi.on('select', () => {
      setActiveIndex(newApi.selectedScrollSnap());
    });
  }, []);

  const hasThread = threadLetters && threadLetters.length > 1;
  const lettersToShow: ThreadLetter[] = hasThread
    ? threadLetters
    : letter
      ? [{
          id: letter.id, company_name: letter.company_name, letter_type: letter.letter_type,
          date_filed: letter.date_filed, slug: letter.slug, file_number: letter.file_number || null,
          ai_summary: letter.ai_summary, sec_url: letter.sec_url,
          raw_text: letter.raw_text || null, cleaned_text: letter.cleaned_text || null,
        }]
      : [];

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 pt-24 pb-12">
          <ResponsiveContainer className="max-w-4xl space-y-6">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-32 w-full" />
          </ResponsiveContainer>
        </main>
        <Footer />
      </div>
    );
  }

  if (!letter) {
    return (
      <div className="flex min-h-screen flex-col">
        <SEO title="Letter Not Found" description="The requested SEC comment letter could not be found." noindex />
        <Header />
        <main className="flex-1 flex items-center justify-center pt-24 pb-16">
          <div className="text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Letter not found</h1>
            <p className="text-muted-foreground mb-6">The requested comment letter could not be found.</p>
            <Button asChild variant="outline">
              <Link to="/comment-letters"><ArrowLeft className="h-4 w-4 mr-2" />Back to browse</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const primaryTopic = letter.primary_tags[0] || letter.tags[0];
  const threadDateRange = hasThread
    ? `${formatDate(threadLetters[0].date_filed)} — ${formatDate(threadLetters[threadLetters.length - 1].date_filed)}`
    : formatDate(letter.date_filed, 'long');

  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title={`${letter.company_name} SEC Comment Letter${hasThread ? ` — ${threadLetters.length} Letters` : ` ${formatDate(letter.date_filed, 'long')}`}`}
        description={letter.ai_summary?.slice(0, 155) || `SEC comment letter for ${letter.company_name}`}
        canonical={`/comment-letters/${letter.slug}`}
        keywords={['SEC comment letter', letter.company_name, ...(letter.primary_tags || [])]}
      />
      <CommentLetterStructuredData
        schemas={[
          buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'SEC Comment Letters', url: '/comment-letters' },
            { name: letter.company_name, url: `/comment-letters/${letter.slug}` },
          ]),
          buildWebPageSchema(letter),
        ]}
      />
      <Header />

      <main className="flex-1 pt-24 pb-8 md:pb-12">
        <ResponsiveContainer className="max-w-4xl">
          <BreadcrumbNav items={[
            { name: 'Home', url: '/' },
            { name: 'Comment Letters', url: '/comment-letters' },
            { name: letter.company_name },
          ]} />

          {/* Header card */}
          <div className={`p-6 md:p-8 mb-6 ${CARD_STYLES_STATIC}`}>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-center">
              {letter.company_name}
            </h1>

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm mb-5 pb-5 border-b border-border/40 text-center">
              <div>
                <span className="text-muted-foreground/60 text-xs uppercase tracking-wide">{hasThread ? 'Date Range' : 'Filing Date'}</span>
                <p className="font-medium mt-0.5">{threadDateRange}</p>
              </div>
              <div>
                <span className="text-muted-foreground/60 text-xs uppercase tracking-wide">{hasThread ? 'Letters' : 'Letter Type'}</span>
                <p className="font-medium mt-0.5">{hasThread ? `${threadLetters.length} in thread` : letter.letter_type}</p>
              </div>
              {letter.ticker ? (
                <div>
                  <span className="text-muted-foreground/60 text-xs uppercase tracking-wide">Ticker</span>
                  <p className="font-medium mt-0.5">{letter.ticker}</p>
                </div>
              ) : letter.cik ? (
                <div>
                  <span className="text-muted-foreground/60 text-xs uppercase tracking-wide">CIK</span>
                  <p className="font-medium mt-0.5">{letter.cik}</p>
                </div>
              ) : null}
              {letter.industry && (
                <div>
                  <span className="text-muted-foreground/60 text-xs uppercase tracking-wide">Industry</span>
                  <p className="font-medium mt-0.5">{letter.industry}</p>
                </div>
              )}
            </div>

            <TagList tags={letter.tags} />
          </div>

          {/* Thread carousel */}
          {hasThread && lettersToShow.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4 px-1">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full shrink-0"
                  onClick={() => api?.scrollPrev()} disabled={activeIndex === 0}>
                  <ArrowLeft className="h-3.5 w-3.5" />
                </Button>
                <div className="flex items-center flex-1 overflow-x-auto py-2">
                  <div className="flex items-center w-full min-w-max px-2">
                    {lettersToShow.map((item, i) => {
                      const isActive = i === activeIndex;
                      const isSecStaff = item.letter_type === 'SEC Staff';
                      const shortDate = formatDate(item.date_filed);
                      return (
                        <div key={item.id} className="flex items-center flex-1">
                          <button onClick={() => api?.scrollTo(i)} className="flex flex-col items-center gap-1 cursor-pointer group">
                            <div className={cn(
                              'w-3 h-3 rounded-full transition-all duration-200',
                              isSecStaff ? 'bg-amber-500' : 'bg-primary',
                              isActive ? 'ring-4 ring-primary/20 scale-125' : 'opacity-40 group-hover:opacity-70',
                            )} />
                            <span className={cn('text-[11px] font-medium whitespace-nowrap transition-colors',
                              isActive ? 'text-foreground' : 'text-muted-foreground/50 group-hover:text-muted-foreground')}>
                              {isSecStaff ? 'SEC' : 'Response'}
                            </span>
                            <span className={cn('text-[10px] transition-colors',
                              isActive ? 'text-muted-foreground' : 'text-muted-foreground/30')}>
                              {shortDate}
                            </span>
                          </button>
                          {i < lettersToShow.length - 1 && <div className="flex-1 h-px bg-border/50 mx-1 mt-[-18px]" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full shrink-0"
                  onClick={() => api?.scrollNext()} disabled={activeIndex === lettersToShow.length - 1}>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>

              <Carousel setApi={onApiChange} opts={{ align: 'start', loop: false }}>
                <CarouselContent>
                  {lettersToShow.map(item => (
                    <CarouselItem key={item.id}><LetterSlide item={item} /></CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          )}

          {!hasThread && lettersToShow.length > 0 && <LetterSlide item={lettersToShow[0]} />}

          <div className="mt-8">
            <Button asChild variant="ghost">
              <Link to="/comment-letters"><ArrowLeft className="h-4 w-4 mr-2" />Back to all comment letters</Link>
            </Button>
          </div>
        </ResponsiveContainer>
      </main>

      <SoftCTA context={primaryTopic} />
      <Footer />
    </div>
  );
}
