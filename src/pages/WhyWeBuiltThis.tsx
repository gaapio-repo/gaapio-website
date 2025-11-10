import { Link } from "react-router-dom";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { GradientBackground } from "@/components/home/GradientBackground";
import foundersPhoto from "@/assets/founders-photo.jpg";

const WhyWeBuiltThis = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-background">
      <Header />
      
      <main className="flex-grow relative">
        <GradientBackground />
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 dark:text-white">
              Why We Built Gaapio
            </h1>
          </div>
        </section>

        {/* Article Content */}
        <article className="pb-20 px-4 relative z-10">
          <div className="max-w-5xl mx-auto prose prose-lg dark:prose-invert bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 md:p-12">
            
            {/* A Love for Technical Accounting */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                A Love for Technical Accounting
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Before AI, before software, there was the puzzle. Accounting has always been this beautiful mix of structure and judgment—the rules are clear, but the real skill lies in interpreting and applying them. We didn&apos;t get into accounting because it was easy; we got into it because it was complex. There&apos;s a quiet satisfaction in getting it right—not just balancing debits and credits, but understanding the reasoning behind the standard.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Over the years, we worked through the release of multiple new accounting standards—ASC 815, ASC 606, and ASC 842. Each one reshaped the profession and left a lasting mark on how we think about financial reporting. We reviewed exposure drafts, tuned in to FASB board meetings, and spent months—sometimes years—navigating adoption projects. These standards demanded deep analysis, careful documentation, and relentless collaboration. The work was rigorous, rewarding, and exhausting. We helped hundreds of companies work through changes in hedge accounting and lease accounting. We saw firsthand how easy it was to get things wrong—even with an auditor&apos;s sign-off.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Back then, AI wasn&apos;t even on anyone&apos;s radar. The idea that software could actually understand accounting, let alone help with it, would have sounded absurd. But fast forward a few years, and the world changed. AI can now read, reason, and synthesize complex information—the very kind of thinking work accountants do every day.
              </p>
            </section>

            {/* When Possibility Met Experience - With Founders Photo */}
            <section className="mb-12 -mx-8 md:-mx-12">
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 p-8 md:p-12 rounded-lg">
                <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                  When Possibility Met Experience
                </h2>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="order-2 md:order-1">
                    <img 
                      src={foundersPhoto} 
                      alt="Gaapio Founders" 
                      className="rounded-lg shadow-xl w-full h-auto"
                    />
                  </div>
                  <div className="order-1 md:order-2">
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      That realization changed everything. For the first time, we could imagine combining our accounting experience with this new technology to make something genuinely useful: a system that helps accountants get to the right answer faster and easier, without losing the rigor that good accounting demands.
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      We didn&apos;t want AI to replace judgment—we wanted it to amplify it. The smartest accountants already have the instincts and experience to make the right call. What they need is the right research, the right guidance, and a structured way to document their reasoning. That&apos;s what Gaapio is built to do.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Continued Content */}
            <section className="mb-12">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                We started small—testing how AI could help draft policy memos, analyze proposed treatments, and summarize disclosures. Then we layered on structure: ASC topics, version histories, and detailed CPA review tools. The result is a workspace where human judgment stays in control. Every AI response is transparent, auditable, and built to be discussed, challenged, and improved.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Because the goal isn&apos;t to automate accounting—it&apos;s to empower accountants. To help them research faster, write clearer, and spend more time thinking critically instead of formatting documents. To make it easier to get it right.
              </p>
            </section>

            {/* Our Mission */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                We&apos;re accountants turned builders. We&apos;ve lived the standard adoptions, the late nights before audit, the endless redlines. We know how high the bar is for good accounting work—and we wouldn&apos;t want it any other way. But now that AI can help us synthesize and reason more efficiently, there&apos;s no reason the process has to be as hard or as slow as it&apos;s always been.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                That&apos;s why we built Gaapio—to combine our experience with AI and help accountants get it right quicker and easier, without ever losing sight of the judgment that makes this profession so vital.
              </p>
            </section>

          </div>
        </article>
      </main>

      {/* Call to Action Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Join Us in Transforming Accounting
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              Ready to see how Gaapio can help you work smarter? Request a demo or reach out to learn more about our mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="blue">
                <Link to="/request-demo">Request a Demo</Link>
              </Button>
              <Button asChild size="lg" variant="blueOutline">
                <Link to="/about-us">Meet Our Team</Link>
              </Button>
            </div>
          </div>
        </section>

      <Footer />
    </div>
  );
};

export default WhyWeBuiltThis;
