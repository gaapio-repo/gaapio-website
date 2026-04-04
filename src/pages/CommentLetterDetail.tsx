import { useParams, Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ResponsiveContainer } from '@/components/layout/ResponsiveContainer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { SoftCTA } from '@/components/comment-letters/SoftCTA';
import { CommentLetterStructuredData, buildBreadcrumbSchema, buildWebPageSchema } from '@/components/comment-letters/CommentLetterStructuredData';
import { useCommentLetterDetail } from '@/hooks/useCommentLetterDetail';
import { topicToSlug } from '@/types/commentLetters';
import { ArrowLeft, Calendar, Building2, ExternalLink, FileText } from 'lucide-react';
/** Extract the HTML content from EDGAR raw text, stripping the SGML wrapper */
function extractHtmlBody(raw: string): string {
  // EDGAR wraps content in <DOCUMENT><TYPE>CORRESP...<TEXT> before the actual HTML
  const htmlMatch = raw.match(/<HTML[\s\S]*<\/HTML>/i);
  if (htmlMatch) return htmlMatch[0];
  // Fallback: try to find a <BODY> tag
  const bodyMatch = raw.match(/<BODY[\s\S]*<\/BODY>/i);
  if (bodyMatch) return `<html><head><style>body{font-family:system-ui,sans-serif;font-size:14px;line-height:1.6;padding:24px;max-width:100%;}</style></head>${bodyMatch[0]}</html>`;
  // Last resort: wrap plain text
  return `<html><head><style>body{font-family:system-ui,sans-serif;font-size:14px;line-height:1.6;padding:24px;white-space:pre-wrap;}</style></head><body>${raw}</body></html>`;
}

export default function CommentLetterDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: letter, isLoading, error } = useCommentLetterDetail(slug);

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

  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title={`${letter.company_name} SEC Comment Letter ${filingDateFormatted}`}
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

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start gap-3 mb-3">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                {letter.company_name}
              </h1>
              {letter.ticker && (
                <Badge variant="secondary" className="text-sm mt-1">
                  {letter.ticker}
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {filingDateFormatted}
              </span>
              <Badge variant="outline">{letter.letter_type}</Badge>
              {letter.industry && (
                <span className="flex items-center gap-1.5">
                  <Building2 className="h-4 w-4" />
                  {letter.industry}
                </span>
              )}
              {letter.cik && (
                <span className="text-xs text-muted-foreground/60">
                  CIK: {letter.cik}
                </span>
              )}
            </div>
          </div>

          {/* AI Summary */}
          {letter.ai_summary && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">What did the SEC ask about in this comment letter?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {letter.ai_summary}
                </p>
              </CardContent>
            </Card>
          )}

          {/* ASC Topics */}
          {letter.tags.length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Accounting Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {letter.tags.map(tag => (
                    <Link key={tag} to={`/comment-letters/topics/${topicToSlug(tag)}`}>
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0 cursor-pointer">
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* View on EDGAR */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Filing Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Filing Date</span>
                  <p className="font-medium">{filingDateFormatted}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Letter Type</span>
                  <p className="font-medium">{letter.letter_type}</p>
                </div>
                {letter.industry && (
                  <div>
                    <span className="text-muted-foreground">Industry</span>
                    <p className="font-medium">{letter.industry}</p>
                  </div>
                )}
                {letter.cik && (
                  <div>
                    <span className="text-muted-foreground">CIK</span>
                    <p className="font-medium">{letter.cik}</p>
                  </div>
                )}
              </div>
              {letter.sec_url && (
                <Button asChild variant="outline" className="mt-2">
                  <a href={letter.sec_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Original on EDGAR
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Letter Content */}
          {(letter.raw_text || letter.cleaned_text) && (
            <Card className="mb-6">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Original Letter</CardTitle>
                {letter.sec_url && (
                  <a
                    href={letter.sec_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
                  >
                    View on EDGAR
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </CardHeader>
              <CardContent className={letter.raw_text ? 'p-0' : undefined}>
                {letter.raw_text ? (
                  <iframe
                    srcDoc={extractHtmlBody(letter.raw_text)}
                    title={`SEC Comment Letter — ${letter.company_name}`}
                    className="w-full border-0 rounded-b-lg"
                    style={{ height: '80vh', minHeight: '600px' }}
                    sandbox=""
                  />
                ) : (
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    {letter.cleaned_text!.split('\n\n').map((paragraph, i) => {
                      const trimmed = paragraph.trim();
                      if (!trimmed) return null;
                      return (
                        <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                          {trimmed}
                        </p>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
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
