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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { SoftCTA } from '@/components/comment-letters/SoftCTA';
import { CommentLetterStructuredData, buildBreadcrumbSchema, buildWebPageSchema } from '@/components/comment-letters/CommentLetterStructuredData';
import { useCommentLetterDetail } from '@/hooks/useCommentLetterDetail';
import { topicToSlug } from '@/types/commentLetters';
import { ArrowLeft, Calendar, Building2, ExternalLink, FileText, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function CommentLetterDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: letter, isLoading, error } = useCommentLetterDetail(slug);
  const [contentOpen, setContentOpen] = useState(false);

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

          {/* Letter Content (collapsible) */}
          {letter.cleaned_text && (
            <Collapsible open={contentOpen} onOpenChange={setContentOpen}>
              <Card>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardTitle className="text-lg flex items-center justify-between">
                      Letter Content
                      <ChevronDown className={`h-5 w-5 transition-transform ${contentOpen ? 'rotate-180' : ''}`} />
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent>
                    <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line">
                      {letter.cleaned_text}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
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
