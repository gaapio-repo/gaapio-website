import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { SEO } from "@/components/SEO";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Why Technical Accounting Memos Matter",
    excerpt: "Discover why thorough documentation is essential for audit readiness and regulatory compliance. Learn how structured technical memos can save your team countless hours during the audit process.",
    date: "April 10, 2025",
    author: "Zack Larsen, CPA",
    imageUrl: "/lovable-uploads/01273276-ea88-43e0-9d91-0cb238f997be.png",
    category: "Best Practices",
    readingTime: "6 min read"
  },
  {
    id: 2,
    title: "5 Common ASC 606 Pitfalls",
    excerpt: "Navigate the complexities of revenue recognition and avoid these frequent mistakes in your accounting memos. From contract identification to variable consideration, we cover what matters most.",
    date: "October 29, 2025",
    author: "Zack Larsen, CPA",
    imageUrl: "/lovable-uploads/76a4d290-2102-4790-88a8-8783b2d8ae44.png",
    category: "Accounting Standards",
    readingTime: "8 min read"
  },
  {
    id: 3,
    title: "How AI Is Changing the Accounting Landscape",
    excerpt: "Explore the impact of artificial intelligence on accounting workflows and documentation processes. See how modern tools are helping CPAs focus on high-value advisory work.",
    date: "March 28, 2025",
    author: "Zack Larsen, CPA",
    imageUrl: "/lovable-uploads/0ca75d1e-cef9-48b9-b1fa-91dca93bbddc.png",
    category: "Technology",
    readingTime: "5 min read"
  },
  {
    id: 4,
    title: "Understanding ASC 842 Lease Modifications",
    excerpt: "A deep dive into lease modification accounting under ASC 842. Learn when to reassess versus when to treat as a new lease, with practical examples.",
    date: "February 15, 2025",
    author: "Zack Larsen, CPA",
    imageUrl: "/lovable-uploads/3a657ff4-6c15-4cac-9ca2-12382772e241.png",
    category: "Accounting Standards",
    readingTime: "7 min read"
  },
  {
    id: 5,
    title: "Building an Audit-Ready Documentation Process",
    excerpt: "Step-by-step guide to creating documentation that auditors love. Reduce review notes and build confidence in your technical accounting positions.",
    date: "January 22, 2025",
    author: "Zack Larsen, CPA",
    imageUrl: "/lovable-uploads/d383cacb-035f-4ca1-9c54-7013f8acf023.png",
    category: "Best Practices",
    readingTime: "6 min read"
  },
  {
    id: 6,
    title: "The Future of Technical Accounting Teams",
    excerpt: "How leading companies are restructuring their accounting teams to leverage AI and automation while maintaining technical excellence and audit quality.",
    date: "December 10, 2024",
    author: "Zack Larsen, CPA",
    imageUrl: "/lovable-uploads/e13abd02-7766-469a-af2d-18a152812501.png",
    category: "Industry Insights",
    readingTime: "5 min read"
  }
];

export default function Blog() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    // Trigger hero animation on mount
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = gridRef.current?.querySelectorAll(".blog-card-item");
    cards?.forEach((card) => {
      observer.observe(card);
    });

    return () => {
      cards?.forEach((card) => {
        observer.unobserve(card);
      });
    };
  }, []);

  const featuredPost = blogPosts[0];
  const remainingPosts = blogPosts.slice(1);

  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title="Gaapio Blog"
        description="Expert perspectives on technical accounting, compliance, and technology from the Gaapio team. Learn about ASC 606, ASC 842, AI in accounting, and more."
        canonical="/blog"
        keywords={['accounting blog', 'technical accounting insights', 'CPA resources', 'accounting best practices']}
      />
      <Header />
      
      {/* Skip to content link for keyboard users */}
      <a href="#blog-content" className="skip-to-content">
        Skip to content
      </a>
      
      <main className="flex-1" id="blog-content">
        {/* Hero Section - Brand Blue Gradient */}
        <section className="relative pt-28 pb-20 md:pt-32 md:pb-28 overflow-hidden">
          {/* Brand blue gradient background */}
          <div className="absolute inset-0 hero-gradient-bg" />
          
          {/* Subtle dot grid texture */}
          <div 
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
              backgroundSize: '24px 24px'
            }}
          />
          
          {/* Subtle white glow for depth */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-br from-white/10 via-white/5 to-transparent blur-3xl pointer-events-none rounded-full" />

          <ResponsiveContainer className="relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 
                className={cn(
                  "text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight transition-all duration-1000",
                  heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"
                )}
              >
                Insights & Resources
              </h1>
              <p 
                className={cn(
                  "text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed transition-all duration-1000",
                  heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"
                )}
                style={{ transitionDelay: "200ms" }}
              >
                Expert perspectives on technical accounting, compliance, and technology from the Gaapio team.
              </p>
            </div>
          </ResponsiveContainer>
        </section>

        {/* Featured Post Section */}
        <section className="py-12 md:py-16 bg-background" aria-labelledby="featured-heading">
          <ResponsiveContainer>
            <h2 id="featured-heading" className="sr-only">Featured Article</h2>
            <div className="max-w-6xl mx-auto">
              <BlogPostCard post={featuredPost} featured />
            </div>
          </ResponsiveContainer>
        </section>

        {/* Post Grid Section */}
        <section className="py-12 md:py-16 bg-background" aria-labelledby="articles-heading">
          <ResponsiveContainer>
            <h2 id="articles-heading" className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Latest Articles
            </h2>
            <div 
              ref={gridRef}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto" 
              role="list" 
              aria-label="Blog posts"
            >
              {remainingPosts.map((post, index) => (
                <div 
                  key={post.id} 
                  role="listitem" 
                  className="blog-card-item opacity-0 transform translate-y-4 transition-all duration-500"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <BlogPostCard post={post} />
                </div>
              ))}
            </div>
          </ResponsiveContainer>
        </section>

        {/* Newsletter CTA Section - Light gradient band */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-slate-50 via-blue-50/40 to-slate-50 dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900">
          <ResponsiveContainer>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Stay Updated
              </h2>
              <p className="text-muted-foreground mb-4">
                More insights coming soon. Follow our journey as we continue to share expert perspectives on technical accounting.
              </p>
              <Button 
                variant="blue" 
                size="lg" 
                className="mt-4"
                asChild
              >
                <a 
                  href="https://www.linkedin.com/company/gaapio" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <Linkedin className="h-5 w-5" />
                  Follow Us on LinkedIn
                </a>
              </Button>
            </div>
          </ResponsiveContainer>
        </section>

        {/* Final CTA Section */}
        <FinalCtaSection />
      </main>
      
      <Footer />
    </div>
  );
}
