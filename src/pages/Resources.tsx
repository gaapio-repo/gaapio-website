import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FileSearch, ExternalLink, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import { SEO } from "@/components/SEO";

export default function Resources() {
  useEffect(() => {
    const animatedCards = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animatedCards.forEach((card) => {
      observer.observe(card);
    });

    window.scrollTo(0, 0);

    return () => {
      animatedCards.forEach((card) => {
        observer.unobserve(card);
      });
    };
  }, []);

  const cardClass = "animate-on-scroll rounded-lg bg-muted/70 shadow-inner hover:shadow-md transition-shadow duration-200 flex flex-col";

  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title="Accounting Resources - FASB, SEC, Big 4 Guidance"
        description="Access curated accounting resources including SEC EDGAR, FASB Codification, and Big 4 guidance from Deloitte, PwC, EY, and KPMG."
        canonical="/resources"
        keywords={['accounting resources', 'FASB codification', 'SEC EDGAR', 'Big 4 guidance', 'CPA resources']}
      />
      <Header />

      <main className="flex-1 pt-32 pb-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Resources</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Helpful tools and guidance for accounting and finance professionals
            </p>
          </div>

          {/* Technical Tools */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Technical Tools</h2>
              <div className="h-px flex-grow bg-border/50 ml-4"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className={cardClass}>
                <CardHeader>
                  <div className="flex items-start">
                    <FileSearch className="h-8 w-8 mb-3 text-primary mr-3" />
                    <div>
                      <CardTitle>SEC Comment Letters</CardTitle>
                      <Badge variant="outline" className="mt-1 mb-2 text-xs font-normal">Free Tool</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">
                    Browse and search SEC comment letters organized by accounting topic. Find real-world examples of SEC staff feedback on financial reporting.
                  </p>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button variant="blue" size="sm" className="w-full gap-2 rounded-full" asChild>
                    <Link to="/comment-letters">
                      <span>Try It Free</span>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Featured External Resources */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">External Resources</h2>
              <div className="h-px flex-grow bg-border/50 ml-4"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {/* SEC EDGAR */}
              <Card className={cardClass}>
                <CardHeader>
                  <div className="flex items-start">
                    <div className="h-8 w-8 mb-3 mr-3 flex items-center justify-center">
                      <img
                        src="/lovable-uploads/49bf8f26-e72a-4813-ae6e-65275eca9e0b.png"
                        alt="SEC logo"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle>SEC EDGAR</CardTitle>
                      <Badge className="mt-1 bg-[#eef6ff] text-[#0369a1] dark:bg-muted dark:text-primary">Authoritative</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">
                    Access public company filings and disclosure documents. Search for financial statements, annual reports, and regulatory filings.
                  </p>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button variant="blue" size="sm" className="w-full gap-2 rounded-full" asChild>
                    <a href="https://www.sec.gov/edgar/searchedgar/companysearch" target="_blank" rel="noopener noreferrer">
                      <span>Visit Resource</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>

              {/* FASB */}
              <Card className={cardClass} style={{ animationDelay: "100ms" }}>
                <CardHeader>
                  <div className="flex items-start">
                    <div className="h-8 w-8 mb-3 mr-3 flex items-center justify-center">
                      <img
                        src="/lovable-uploads/ed9cded5-35b2-4e6c-99b1-57356472c6c6.png"
                        alt="FASB logo"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle>FASB Codification</CardTitle>
                      <Badge className="mt-1 bg-[#eef6ff] text-[#0369a1] dark:bg-muted dark:text-primary">Standards</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">
                    Access the official source of authoritative GAAP, including real-time updates to U.S. accounting standards via the FASB Codification platform.
                  </p>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button variant="blue" size="sm" className="w-full gap-2 rounded-full" asChild>
                    <a href="https://asc.fasb.org" target="_blank" rel="noopener noreferrer">
                      <span>Visit Resource</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>

              {/* Deloitte */}
              <Card className={cardClass} style={{ animationDelay: "200ms" }}>
                <CardHeader>
                  <div className="flex items-start">
                    <div className="h-8 w-8 mb-3 mr-3 flex items-center justify-center">
                      <img
                        src="/lovable-uploads/93f201e3-8804-4292-8062-6c3c44f943da.png"
                        alt="Deloitte logo"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle>Deloitte Accounting Library</CardTitle>
                      <Badge className="mt-1 bg-[#eef6ff] text-[#0369a1] dark:bg-muted dark:text-primary">Big 4</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">
                    Comprehensive technical accounting guidance and publications. Access in-depth resources on accounting standards and implementation.
                  </p>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button variant="blue" size="sm" className="w-full gap-2 rounded-full" asChild>
                    <a href="https://dart.deloitte.com" target="_blank" rel="noopener noreferrer">
                      <span>Visit Resource</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>

              {/* PwC */}
              <Card className={cardClass} style={{ animationDelay: "300ms" }}>
                <CardHeader>
                  <div className="flex items-start">
                    <div className="h-8 w-8 mb-3 mr-3 flex items-center justify-center">
                      <img
                        src="/lovable-uploads/384d5446-f85d-4583-a3ca-92cce2a60fb4.png"
                        alt="PwC logo"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle>PwC Inform</CardTitle>
                      <Badge className="mt-1 bg-[#eef6ff] text-[#0369a1] dark:bg-muted dark:text-primary">Big 4</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">
                    In-depth accounting and financial reporting guidance. Industry-specific resources and technical insights from PwC professionals.
                  </p>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button variant="blue" size="sm" className="w-full gap-2 rounded-full" asChild>
                    <a href="https://viewpoint.pwc.com" target="_blank" rel="noopener noreferrer">
                      <span>Visit Resource</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>

              {/* EY */}
              <Card className={cardClass} style={{ animationDelay: "400ms" }}>
                <CardHeader>
                  <div className="flex items-start">
                    <div className="h-8 w-8 mb-3 mr-3 flex items-center justify-center">
                      <img
                        src="/lovable-uploads/7f20efb4-675d-4fcc-9aee-da6b28444c68.png"
                        alt="EY logo"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle>EY AccountingLink</CardTitle>
                      <Badge className="mt-1 bg-[#eef6ff] text-[#0369a1] dark:bg-muted dark:text-primary">Big 4</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">
                    Technical insights on accounting, regulatory and financial reporting. Access EY's interpretations and guidance on complex accounting matters.
                  </p>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button variant="blue" size="sm" className="w-full gap-2 rounded-full" asChild>
                    <a href="https://www.ey.com/en_us/technical/accountinglink" target="_blank" rel="noopener noreferrer">
                      <span>Visit Resource</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>

              {/* KPMG */}
              <Card className={cardClass} style={{ animationDelay: "500ms" }}>
                <CardHeader>
                  <div className="flex items-start">
                    <div className="h-8 w-8 mb-3 mr-3 flex items-center justify-center">
                      <img
                        src="/lovable-uploads/5439856b-67e6-47c5-8171-7b7b38e9e8c1.png"
                        alt="KPMG logo"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle>KPMG Guidance Center</CardTitle>
                      <Badge className="mt-1 bg-[#eef6ff] text-[#0369a1] dark:bg-muted dark:text-primary">Big 4</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">
                    Accounting standards implementation and practical insights. Stay up-to-date with KPMG's interpretations of new and existing standards.
                  </p>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button variant="blue" size="sm" className="w-full gap-2 rounded-full" asChild>
                    <a href="https://kpmg.com/us/en/frv.html" target="_blank" rel="noopener noreferrer">
                      <span>Visit Resource</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>

              {/* RevenueHub */}
              <Card className={cardClass} style={{ animationDelay: "600ms" }}>
                <CardHeader>
                  <div className="flex items-start">
                    <Heart className="h-8 w-8 mb-3 text-primary mr-3" />
                    <div className="flex-1">
                      <CardTitle>RevenueHub</CardTitle>
                      <Badge className="mt-1 bg-[#eef6ff] text-[#0369a1] dark:bg-muted dark:text-primary">Community</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">
                    Free technical accounting insights from BYU School of Accountancy and Connor Group. Articles written by MAcc students with guidance from professors and industry professionals.
                  </p>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button variant="blue" size="sm" className="w-full gap-2 rounded-full" asChild>
                    <a href="https://www.revenuehub.org/" target="_blank" rel="noopener noreferrer">
                      <span>Visit Resource</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>

              {/* Financial Reporting Hub */}
              <Card className={cardClass} style={{ animationDelay: "700ms" }}>
                <CardHeader>
                  <div className="flex items-start">
                    <Heart className="h-8 w-8 mb-3 text-primary mr-3" />
                    <div className="flex-1">
                      <CardTitle>Financial Reporting Hub</CardTitle>
                      <Badge className="mt-1 bg-[#eef6ff] text-[#0369a1] dark:bg-muted dark:text-primary">Community</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">
                    Free articles on FASB updates, SEC disclosure requirements, and emerging accounting issues. A BYU School of Accountancy and Connor Group collaboration.
                  </p>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button variant="blue" size="sm" className="w-full gap-2 rounded-full" asChild>
                    <a href="https://www.financialreportinghub.org/" target="_blank" rel="noopener noreferrer">
                      <span>Visit Resource</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>

              {/* IPO Hub */}
              <Card className={cardClass} style={{ animationDelay: "800ms" }}>
                <CardHeader>
                  <div className="flex items-start">
                    <Heart className="h-8 w-8 mb-3 text-primary mr-3" />
                    <div className="flex-1">
                      <CardTitle>IPO Hub</CardTitle>
                      <Badge className="mt-1 bg-[#eef6ff] text-[#0369a1] dark:bg-muted dark:text-primary">Community</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">
                    Comprehensive IPO guidance covering preparation, transaction mechanics, and post-IPO reporting. A BYU School of Accountancy and Connor Group collaboration.
                  </p>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button variant="blue" size="sm" className="w-full gap-2 rounded-full" asChild>
                    <a href="https://www.ipohub.org/" target="_blank" rel="noopener noreferrer">
                      <span>Visit Resource</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
