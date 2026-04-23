import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { GradientBackground } from "@/components/home/GradientBackground";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { SEO } from "@/components/SEO";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Linkedin, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  author: string | null;
  featured_image: string | null;
  category: string | null;
  reading_time: string | null;
  published_at: string | null;
  created_at: string;
  is_featured: boolean | null;
}

export default function Blog() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [posts, setPosts] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, author, featured_image, category, reading_time, published_at, created_at, is_featured")
        .eq("is_published", true)
        .order("published_at", { ascending: false, nullsFirst: false });

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    }

    fetchPosts();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;
    
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
  }, [loading, posts]);

  // Transform database posts to component format
  const transformPost = (post: BlogPostData) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || "",
    date: post.published_at 
      ? new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      : new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    author: post.author || "Gaapio Team",
    imageUrl: post.featured_image || "/lovable-uploads/01273276-ea88-43e0-9d91-0cb238f997be.png",
    category: post.category || "Insights",
    readingTime: post.reading_time || "5 min read"
  });

  const featuredPost = posts.find(p => p.is_featured) || posts[0];
  const remainingPosts = posts.filter(p => p.id !== featuredPost?.id);

  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title="Gaapio Blog"
        description="Expert perspectives on technical accounting, compliance, and technology from the Gaapio team. Learn about ASC 606, ASC 842, AI in accounting, and more."
        canonical="/blog"
        keywords={['accounting blog', 'technical accounting insights', 'CPA resources', 'accounting best practices']}
      />
      <Header />
      
      <a href="#blog-content" className="skip-to-content">
        Skip to content
      </a>
      
      <main className="flex-1" id="blog-content">
        {/* Hero Section */}
        <section className="relative pt-28 pb-20 md:pt-32 md:pb-28 overflow-hidden">
          <GradientBackground />

          <ResponsiveContainer className="relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 
                className={cn(
                  "text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight transition-all duration-1000",
                  heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"
                )}
              >
                <span className="text-foreground">Gaapio</span>{" "}
                <span className="text-primary-foreground">Blog</span>
              </h1>
              <p 
                className={cn(
                  "text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed transition-all duration-1000",
                  heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"
                )}
                style={{ transitionDelay: "200ms" }}
              >
                Expert perspectives on technical accounting, compliance, and technology from the Gaapio team.
              </p>
            </div>
          </ResponsiveContainer>
        </section>

        {loading ? (
          <section className="py-20 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </section>
        ) : posts.length === 0 ? (
          <section className="py-20 text-center">
            <ResponsiveContainer>
              <p className="text-muted-foreground text-lg">No blog posts available yet. Check back soon!</p>
            </ResponsiveContainer>
          </section>
        ) : (
          <>
            {/* Featured Post Section */}
            {featuredPost && (
              <section className="py-12 md:py-16 bg-background" aria-labelledby="featured-heading">
                <ResponsiveContainer>
                  <h2 id="featured-heading" className="sr-only">Featured Article</h2>
                  <div className="max-w-6xl mx-auto">
                    <BlogPostCard post={transformPost(featuredPost)} featured />
                  </div>
                </ResponsiveContainer>
              </section>
            )}

            {/* Post Grid Section */}
            {remainingPosts.length > 0 && (
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
                        <BlogPostCard post={transformPost(post)} />
                      </div>
                    ))}
                  </div>
                </ResponsiveContainer>
              </section>
            )}
          </>
        )}
      </main>

      {/* Newsletter CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-muted/50 via-primary/5 to-muted/50">
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

      <FinalCtaSection />
      
      <Footer />
    </div>
  );
}
