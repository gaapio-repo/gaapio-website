import { Link } from "react-router-dom";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

const WhyWeBuiltThis = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-background">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Why We Built Gaapio
            </h1>
            <div className="w-20 h-1 bg-[#339CFF] mx-auto"></div>
          </div>
        </section>

        {/* Article Content */}
        <article className="pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Section 1 - White Background */}
            <section className="py-16 px-8 bg-white dark:bg-background rounded-lg mb-8">
              <p className="text-xl font-semibold text-gray-900 dark:text-white mb-6 leading-relaxed">
                Before AI, before software, there was the puzzle.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Accounting has always been this beautiful mix of structure and judgment—the rules are clear, but the real skill lies in interpreting and applying them. We didn&apos;t get into accounting because it was easy; we got into it because it was complex. There&apos;s a quiet satisfaction in getting it right—not just balancing debits and credits, but understanding the reasoning behind the standard.
              </p>
            </section>

            {/* Visual Divider */}
            <div className="flex justify-center my-12">
              <div className="w-16 h-1 bg-gradient-to-r from-[#339CFF] to-[#9b87f5] rounded-full"></div>
            </div>

            {/* Section 2 - Subtle Background */}
            <section className="py-16 px-8 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-gray-800/50 dark:to-gray-900/50 rounded-lg mb-8">
              <p className="text-xl font-semibold text-gray-900 dark:text-white mb-6 leading-relaxed">
                Over the years, we worked through the release of multiple new accounting standards—ASC 815, ASC 606, and ASC 842.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Each one reshaped the profession and left a lasting mark on how we think about financial reporting. We reviewed exposure drafts, tuned in to FASB board meetings, and spent months—sometimes years—navigating adoption projects. These standards demanded deep analysis, careful documentation, and relentless collaboration. The work was rigorous, rewarding, and exhausting. We helped hundreds of companies work through changes in hedge accounting and lease accounting. We saw firsthand how easy it was to get things wrong—even with an auditor&apos;s sign-off.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Back then, AI wasn&apos;t even on anyone&apos;s radar. The idea that software could actually understand accounting, let alone help with it, would have sounded absurd. But fast forward a few years, and the world changed. AI can now read, reason, and synthesize complex information—the very kind of thinking work accountants do every day.
              </p>
            </section>

            {/* Pull Quote */}
            <div className="my-16 px-8">
              <blockquote className="border-l-4 border-[#339CFF] pl-6 py-4">
                <p className="text-2xl font-medium text-gray-900 dark:text-white italic leading-relaxed">
                  "We didn&apos;t want AI to replace judgment—we wanted it to amplify it."
                </p>
              </blockquote>
            </div>

            {/* Section 3 - White Background */}
            <section className="py-16 px-8 bg-white dark:bg-background rounded-lg mb-8">
              <p className="text-xl font-semibold text-gray-900 dark:text-white mb-6 leading-relaxed">
                That realization changed everything.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                For the first time, we could imagine combining our accounting experience with this new technology to make something genuinely useful: a system that helps accountants get to the right answer faster and easier, without losing the rigor that good accounting demands.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                The smartest accountants already have the instincts and experience to make the right call. What they need is the right research, the right guidance, and a structured way to document their reasoning. That&apos;s what Gaapio is built to do.
              </p>
            </section>

            {/* Visual Divider */}
            <div className="flex justify-center my-12">
              <div className="w-16 h-1 bg-gradient-to-r from-[#339CFF] to-[#9b87f5] rounded-full"></div>
            </div>

            {/* Section 4 - Subtle Background */}
            <section className="py-16 px-8 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-gray-800/50 dark:to-gray-900/50 rounded-lg mb-8">
              <p className="text-xl font-semibold text-gray-900 dark:text-white mb-6 leading-relaxed">
                We started small—testing how AI could help draft policy memos, analyze proposed treatments, and summarize disclosures.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Then we layered on structure: ASC topics, version histories, and detailed CPA review tools. The result is a workspace where human judgment stays in control. Every AI response is transparent, auditable, and built to be discussed, challenged, and improved.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Because the goal isn&apos;t to automate accounting—it&apos;s to empower accountants. To help them research faster, write clearer, and spend more time thinking critically instead of formatting documents. To make it easier to get it right.
              </p>
            </section>

            {/* Visual Divider */}
            <div className="flex justify-center my-12">
              <div className="w-16 h-1 bg-gradient-to-r from-[#339CFF] to-[#9b87f5] rounded-full"></div>
            </div>

            {/* Section 5 - White Background */}
            <section className="py-16 px-8 bg-white dark:bg-background rounded-lg mb-8">
              <p className="text-xl font-semibold text-gray-900 dark:text-white mb-6 leading-relaxed">
                We&apos;re accountants turned builders.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                We&apos;ve lived the standard adoptions, the late nights before audit, the endless redlines. We know how high the bar is for good accounting work—and we wouldn&apos;t want it any other way. But now that AI can help us synthesize and reason more efficiently, there&apos;s no reason the process has to be as hard or as slow as it&apos;s always been.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                That&apos;s why we built Gaapio—to combine our experience with AI and help accountants get it right quicker and easier, without ever losing sight of the judgment that makes this profession so vital.
              </p>
            </section>

          </div>
        </article>

        {/* Call to Action Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
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
      </main>

      <Footer />
    </div>
  );
};

export default WhyWeBuiltThis;
