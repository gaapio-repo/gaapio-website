import { useParams, Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ResponsiveContainer } from '@/components/layout/ResponsiveContainer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { SoftCTA } from '@/components/comment-letters/SoftCTA';
import { CommentLetterStructuredData, buildBreadcrumbSchema, buildWebPageSchema } from '@/components/comment-letters/CommentLetterStructuredData';
import { useCommentLetterDetail } from '@/hooks/useCommentLetterDetail';
import { useCommentLetterThread, ThreadLetter } from '@/hooks/useCommentLetterThread';
import { topicToSlug } from '@/types/commentLetters';
import { ArrowLeft, ExternalLink, FileText } from 'lucide-react';

/** Extract the HTML content from EDGAR raw text, stripping the SGML wrapper */
function extractHtmlBody(raw: string): string {
  // EDGAR wraps content in <DOCUMENT><TYPE>CORRESP...<TEXT> before the actual HTML
  const htmlMatch = raw.match(/<HTML[\s\S]*<\/HTML>/i);
  if (htmlMatch) return htmlMatch[0];
  // Fallback: try to find a <BODY> tag
  const bodyMatch = raw.match(/<BODY[\s\S]*<\/BODY>/i);
  if (bodyMatch) return `<html><head><style>body{font-family:system-ui,-apple-system,sans-serif;font-size:14px;line-height:1.7;padding:32px;max-width:100%;color:#333;}</style></head>${bodyMatch[0]}</html>`;
  // Last resort: format plain text with proper typography
  const escaped = raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return `<html><head><style>
    body { font-family: system-ui, -apple-system, sans-serif; font-size: 14px; line-height: 1.7; padding: 32px; max-width: 100%; color: #333; }
    p { margin: 0 0 1em 0; }
  </style></head><body>${escaped.replace(/\n\n+/g, '</p><p>').replace(/\n/g, '<br>')}</body></html>`;
}

/** Render a single letter's content */
function LetterContent({ item }: { item: ThreadLetter }) {
  const date = new Date(item.date_filed).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const isSecStaff = item.letter_type === 'SEC Staff';

  return (
    <div className="rounded-lg bg-muted/70 shadow-sm overflow-hidden">
      {/* Letter header */}
      <div className="flex items-center justify-between p-5 md:px-8">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full shrink-0 ${isSecStaff ? 'bg-amber-500' : 'bg-primary'}`} />
          <h3 className="text-base font-semibold">
            {item.letter_type}
          </h3>
          <span className="text-sm text-muted-foreground">{date}</span>
        </div>
        {item.sec_url && (
          <a
            href={item.sec_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
          >
            View on EDGAR
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>

      {/* Letter content */}
      {item.raw_text ? (
        <div className="px-5 md:px-8 pb-5">
          <iframe
            srcDoc={extractHtmlBody(item.raw_text)}
            title={`${item.letter_type} — ${date}`}
            className="w-full border-0 bg-white rounded-lg shadow-inner"
            style={{ height: '70vh', minHeight: '500px' }}
            sandbox=""
          />
        </div>
      ) : item.cleaned_text ? (
        <div className="px-5 md:px-8 pb-5">
          <iframe
            srcDoc={extractHtmlBody(item.cleaned_text)}
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

  // Determine what letters to show: full thread if available, otherwise just the current letter
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

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-12">
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

  // Not found
  if (!letter) {
    return (
      <div className="flex min-h-screen flex-col">
        <SEO title="Letter Not Found" description="The requested SEC comment letter could not be found." noindex />
        <Header />
        <main className="flex-1 flex items-center justify-center py-16">
          <div className="text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Letter not found</h1>
            <p className="text-muted-foreground mb-6">The requested comment letter could not be found.</p>
            <Button asChild variant="outline">
              <Link to="/comment-letters">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to browse
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const filingDateFormatted = new Date(letter.date_filed).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const primaryTopic = letter.primary_tags[0] || letter.tags[0];

  // Thread date range
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

      <main className="flex-1 py-8 md:py-12">
        <ResponsiveContainer className="max-w-4xl">
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
                <BreadcrumbPage>{letter.company_name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Unified Header */}
          <div className="rounded-lg bg-muted/70 shadow-sm p-6 md:p-8 mb-6">
            {/* Company + ticker */}
            <div className="flex items-baseline gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                {letter.company_name}
              </h1>
              {letter.ticker && (
                <span className="text-sm font-medium text-muted-foreground/70 tracking-wide uppercase">
                  {letter.ticker}
                </span>
              )}
            </div>

            {/* Filing details grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mt-4 mb-5 pb-5 border-b border-border/40">
              <div>
                <span className="text-muted-foreground/60 text-xs uppercase tracking-wide">
                  {hasThread ? 'Date Range' : 'Filing Date'}
                </span>
                <p className="font-medium mt-0.5">{threadDateRange}</p>
              </div>
              <div>
                <span className="text-muted-foreground/60 text-xs uppercase tracking-wide">
                  {hasThread ? 'Letters' : 'Letter Type'}
                </span>
                <p className="font-medium mt-0.5">
                  {hasThread ? `${threadLetters.length} in thread` : letter.letter_type}
                </p>
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

            {/* Accounting Topics */}
            {letter.tags.length > 0 && (
              <div>
                <span className="text-muted-foreground/60 text-xs uppercase tracking-wide">Accounting Topics</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {letter.tags.map(tag => (
                    <Link key={tag} to={`/comment-letters/topics/${topicToSlug(tag)}`}>
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0 cursor-pointer text-xs">
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* AI Summary */}
          {letter.ai_summary && (
            <div className="rounded-lg bg-muted/70 shadow-sm p-6 md:p-8 mb-6">
              <h2 className="text-lg font-semibold mb-3">Summary</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {letter.ai_summary}
              </p>
            </div>
          )}

          {/* Correspondence — all letters inline */}
          {lettersToShow.length > 0 && (
            <div className="space-y-4">
              {hasThread && (
                <h2 className="text-lg font-semibold px-1">
                  Correspondence ({threadLetters.length} letters)
                </h2>
              )}
              {lettersToShow.map(item => (
                <LetterContent key={item.id} item={item} />
              ))}
            </div>
          )}

          {/* Back link */}
          <div className="mt-8">
            <Button asChild variant="ghost">
              <Link to="/comment-letters">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to all comment letters
              </Link>
            </Button>
          </div>
        </ResponsiveContainer>
      </main>

      <SoftCTA context={primaryTopic} />
      <Footer />
    </div>
  );
}
