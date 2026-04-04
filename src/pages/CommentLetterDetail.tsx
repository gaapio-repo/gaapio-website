import { useParams, Link } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { SEO } from '@/components/SEO';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ResponsiveContainer } from '@/components/layout/ResponsiveContainer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { SoftCTA } from '@/components/comment-letters/SoftCTA';
import { CommentLetterStructuredData, buildBreadcrumbSchema, buildWebPageSchema } from '@/components/comment-letters/CommentLetterStructuredData';
import { useCommentLetterDetail } from '@/hooks/useCommentLetterDetail';
import { useCommentLetterThread, ThreadLetter } from '@/hooks/useCommentLetterThread';
import { topicToSlug } from '@/types/commentLetters';
import { ArrowLeft, ArrowRight, ExternalLink, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Extract the HTML content from EDGAR raw text, stripping the SGML wrapper */
function extractHtmlBody(raw: string): string {
  // Try to find actual HTML content
  const htmlMatch = raw.match(/<HTML[\s\S]*<\/HTML>/i);
  if (htmlMatch) return htmlMatch[0];
  const bodyMatch = raw.match(/<BODY[\s\S]*<\/BODY>/i);
  if (bodyMatch) return `<html><head><style>body{font-family:system-ui,-apple-system,sans-serif;font-size:14px;line-height:1.7;padding:32px;max-width:100%;color:#333;}</style></head>${bodyMatch[0]}</html>`;

  // Plain text — format with proper typography for SEC staff letters
  const escaped = raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Convert plain text structure into readable HTML
  const lines = escaped.split('\n');
  let html = '';
  let inList = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (inList) { html += '</ol>'; inList = false; }
      html += '<br>';
      continue;
    }
    // Numbered items (e.g., "1.", "2.") — render as ordered list
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (numMatch) {
      if (!inList) { html += '<ol style="margin:0.5em 0 0.5em 1.5em;padding:0;">'; inList = true; }
      html += `<li style="margin-bottom:0.5em;">${numMatch[2]}</li>`;
      continue;
    }
    if (inList) { html += '</ol>'; inList = false; }
    // Short standalone lines (likely headings or labels)
    if (trimmed.length < 60 && !trimmed.endsWith('.') && !trimmed.endsWith(',')) {
      html += `<p style="margin:1.2em 0 0.3em 0;font-weight:600;">${trimmed}</p>`;
    } else {
      html += `<p style="margin:0 0 0.5em 0;">${trimmed}</p>`;
    }
  }
  if (inList) html += '</ol>';

  return `<html><head><style>
    body { font-family: system-ui, -apple-system, sans-serif; font-size: 14px; line-height: 1.7; padding: 32px; max-width: 100%; color: #333; }
  </style></head><body>${html}</body></html>`;
}

/** Single letter slide — one continuous card: metadata → summary → content */
function LetterSlide({ item }: { item: ThreadLetter }) {
  const date = new Date(item.date_filed).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const isSecStaff = item.letter_type === 'SEC Staff';
  const isPdf = item.sec_url?.toLowerCase().endsWith('.pdf');

  return (
    <div className="rounded-lg bg-muted/70 shadow-sm overflow-hidden">
      {/* Letter metadata + summary */}
      <div className="p-5 md:px-8 md:pt-6">
        {/* Type + date + EDGAR link */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${isSecStaff ? 'bg-amber-500' : 'bg-primary'}`} />
            <span className="text-base font-semibold">{item.letter_type}</span>
            <span className="text-sm text-muted-foreground">{date}</span>
          </div>
          {item.sec_url && (
            <a
              href={item.sec_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
            >
              EDGAR
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>

        {/* Per-letter summary */}
        {item.ai_summary && (
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {item.ai_summary}
          </p>
        )}
      </div>

      {/* Letter content — white area inside the grey card */}
      {isPdf && item.sec_url ? (
        /* PDF letters (SEC Staff) — use Google's PDF viewer */
        <div className="px-5 md:px-8 pb-5">
          <iframe
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(item.sec_url)}&embedded=true`}
            title={`${item.letter_type} — ${date}`}
            className="w-full border-0 bg-white rounded-lg shadow-inner"
            style={{ height: '70vh', minHeight: '500px' }}
          />
        </div>
      ) : (item.raw_text || item.cleaned_text) ? (
        /* HTML letters (Company Response) — render via srcdoc */
        <div className="px-5 md:px-8 pb-5">
          <iframe
            srcDoc={extractHtmlBody(item.raw_text || item.cleaned_text!)}
            title={`${item.letter_type} — ${date}`}
            className="w-full border-0 bg-white rounded-lg shadow-inner"
            style={{ height: '70vh', minHeight: '500px' }}
            sandbox=""
          />
        </div>
      ) : (
        <div className="px-5 md:px-8 pb-5">
          <p className="text-sm text-muted-foreground italic">Content not available.</p>
        </div>
      )}
    </div>
  );
}

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
          id: letter.id,
          company_name: letter.company_name,
          letter_type: letter.letter_type,
          date_filed: letter.date_filed,
          slug: letter.slug,
          file_number: letter.file_number || null,
          ai_summary: letter.ai_summary,
          sec_url: letter.sec_url,
          raw_text: letter.raw_text || null,
          cleaned_text: letter.cleaned_text || null,
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
            <Skeleton className="h-24 w-full" />
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

  const filingDateFormatted = new Date(letter.date_filed).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  const primaryTopic = letter.primary_tags[0] || letter.tags[0];
  const threadDateRange = hasThread
    ? `${new Date(threadLetters[0].date_filed).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} — ${new Date(threadLetters[threadLetters.length - 1].date_filed).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`
    : filingDateFormatted;

  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title={`${letter.company_name} SEC Comment Letter${hasThread ? ` — ${threadLetters.length} Letters` : ` ${filingDateFormatted}`}`}
        description={letter.ai_summary?.slice(0, 155) || `SEC comment letter for ${letter.company_name} filed on ${filingDateFormatted}`}
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
          {/* Breadcrumbs */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/comment-letters">Comment Letters</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>{letter.company_name}</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Header card — company info, filing details, topics */}
          <div className="rounded-lg bg-muted/70 shadow-sm p-6 md:p-8 mb-6">
            <div className="flex items-baseline gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{letter.company_name}</h1>
              {letter.ticker && (
                <span className="text-sm font-medium text-muted-foreground/70 tracking-wide uppercase">{letter.ticker}</span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mt-4 mb-5 pb-5 border-b border-border/40">
              <div>
                <span className="text-muted-foreground/60 text-xs uppercase tracking-wide">{hasThread ? 'Date Range' : 'Filing Date'}</span>
                <p className="font-medium mt-0.5">{threadDateRange}</p>
              </div>
              <div>
                <span className="text-muted-foreground/60 text-xs uppercase tracking-wide">{hasThread ? 'Letters' : 'Letter Type'}</span>
                <p className="font-medium mt-0.5">{hasThread ? `${threadLetters.length} in thread` : letter.letter_type}</p>
              </div>
              {letter.industry && (
                <div>
                  <span className="text-muted-foreground/60 text-xs uppercase tracking-wide">Industry</span>
                  <p className="font-medium mt-0.5">{letter.industry}</p>
                </div>
              )}
              {letter.cik && (
                <div>
                  <span className="text-muted-foreground/60 text-xs uppercase tracking-wide">CIK</span>
                  <p className="font-medium mt-0.5">{letter.cik}</p>
                </div>
              )}
            </div>

            {letter.tags.length > 0 && (
              <div>
                <span className="text-muted-foreground/60 text-xs uppercase tracking-wide">Accounting Topics</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {letter.tags.map(tag => (
                    <Link key={tag} to={`/comment-letters/topics/${topicToSlug(tag)}`}>
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0 cursor-pointer text-xs">{tag}</Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Thread carousel */}
          {hasThread && lettersToShow.length > 0 && (
            <div className="mb-6">
              {/* Timeline + nav — no card wrapper, just sits between header and content */}
              <div className="flex items-center gap-4 mb-4 px-1">
                {/* Prev button */}
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full shrink-0"
                  onClick={() => api?.scrollPrev()}
                  disabled={activeIndex === 0}
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                </Button>

                {/* Timeline dots */}
                <div className="flex items-center flex-1 overflow-x-auto py-2">
                  <div className="flex items-center w-full min-w-max px-2">
                    {lettersToShow.map((item, i) => {
                      const isActive = i === activeIndex;
                      const isSecStaff = item.letter_type === 'SEC Staff';
                      const shortDate = new Date(item.date_filed).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

                      return (
                        <div key={item.id} className="flex items-center flex-1">
                          <button
                            onClick={() => api?.scrollTo(i)}
                            className="flex flex-col items-center gap-1 cursor-pointer group"
                          >
                            <div className={cn(
                              'w-3 h-3 rounded-full transition-all duration-200',
                              isSecStaff ? 'bg-amber-500' : 'bg-primary',
                              isActive ? 'ring-4 ring-primary/20 scale-125' : 'opacity-40 group-hover:opacity-70',
                            )} />
                            <span className={cn(
                              'text-[11px] font-medium whitespace-nowrap transition-colors',
                              isActive ? 'text-foreground' : 'text-muted-foreground/50 group-hover:text-muted-foreground',
                            )}>
                              {isSecStaff ? 'SEC' : 'Response'}
                            </span>
                            <span className={cn(
                              'text-[10px] transition-colors',
                              isActive ? 'text-muted-foreground' : 'text-muted-foreground/30',
                            )}>
                              {shortDate}
                            </span>
                          </button>
                          {i < lettersToShow.length - 1 && (
                            <div className="flex-1 h-px bg-border/50 mx-1 mt-[-18px]" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Next button */}
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full shrink-0"
                  onClick={() => api?.scrollNext()}
                  disabled={activeIndex === lettersToShow.length - 1}
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>

              {/* Carousel — slides directly below timeline */}
              <Carousel
                setApi={onApiChange}
                opts={{ align: 'start', loop: false }}
              >
                <CarouselContent>
                  {lettersToShow.map(item => (
                    <CarouselItem key={item.id}>
                      <LetterSlide item={item} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          )}

          {/* Single letter — no timeline, just the letter */}
          {!hasThread && lettersToShow.length > 0 && (
            <LetterSlide item={lettersToShow[0]} />
          )}

          {/* Back link */}
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
