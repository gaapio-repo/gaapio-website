import { Link } from "react-router-dom";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Lightbulb, Heart, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhyWeBuiltThis = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Lightbulb className="h-4 w-4" />
              <span className="text-sm font-medium">Our Story</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Why We Built Gaapio
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Born from the frustration of spending countless hours on repetitive accounting tasks, 
              Gaapio was created to give accountants their time back.
            </p>
          </div>
        </section>

        {/* The Problem Section */}
        <section className="py-16 px-4 bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-6 mb-8">
              <div className="p-4 rounded-xl bg-destructive/10">
                <Target className="h-8 w-8 text-destructive" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4">The Problem We Saw</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  As former Big Four accountants, we spent years watching talented professionals 
                  waste their expertise on repetitive, time-consuming tasks. Research that should 
                  take minutes stretched into hours. Disclosures that could be standardized required 
                  constant reinvention. Contract reviews consumed entire afternoons.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  The worst part? These weren't challenges that required human judgment or expertise—
                  they were just tedious, mechanical processes that ate up billable hours and left 
                  accountants exhausted and unfulfilled.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Vision Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-6 mb-8">
              <div className="p-4 rounded-xl bg-primary/10">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  We believe accountants should spend their time on what matters: strategic thinking, 
                  client relationships, and high-value analysis. Not formatting disclosures or searching 
                  through ASC guidance for the hundredth time.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  That's why we built Gaapio—to automate the tedious work and amplify human expertise. 
                  Our AI doesn't replace accountants; it empowers them to focus on the work that truly 
                  requires their professional judgment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What Makes Us Different Section */}
        <section className="py-16 px-4 bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-6 mb-8">
              <div className="p-4 rounded-xl bg-accent/50">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4">What Makes Us Different</h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-2">Built by Accountants</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We're not tech people trying to understand accounting. We're accountants who 
                      learned to code because we were tired of the status quo.
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-2">Purpose-Built AI</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Our AI is specifically trained on accounting standards, not general knowledge. 
                      It understands ASC references, revenue recognition nuances, and disclosure requirements.
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-2">Continuous Improvement</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We're constantly updating our models with the latest guidance, incorporating 
                      user feedback, and expanding capabilities based on real accounting needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Join Us in Transforming Accounting</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We're on a mission to give accountants their time back. Whether you're at a Big Four 
              firm, a mid-size practice, or working in corporate accounting, Gaapio can help you 
              work smarter, not harder.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/request-demo">Request a Demo</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8">
                <Link to="/about-us">Meet Our Team</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WhyWeBuiltThis;
