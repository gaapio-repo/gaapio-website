import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, User, Calendar, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  author: string | null;
  category: string | null;
  featured_image: string | null;
  reading_time: string | null;
  published_at: string | null;
  created_at: string;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) {
        setError("Post not found");
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();

      if (fetchError) {
        console.error("Error fetching post:", fetchError);
        setError("Failed to load post");
      } else if (!data) {
        setError("Post not found");
      } else {
        setPost(data);
      }
      setLoading(false);
    }

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center gap-6 p-8">
          <h1 className="text-4xl font-bold">Post Not Found</h1>
          <p className="text-muted-foreground">The blog post you're looking for doesn't exist or has been unpublished.</p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const publishedDate = post.published_at 
    ? new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title={post.title}
        description={post.excerpt || `Read ${post.title} on the Gaapio blog`}
        canonical={`/blog/${post.slug}`}
      />
      <Header />
      
      <main className="flex-1 pt-28">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-primary/5 to-transparent border-b">
          <ResponsiveContainer className="py-16 md:py-20">
            <div className="max-w-4xl mx-auto">
              <Button asChild variant="ghost" size="sm" className="mb-6 -ml-2">
                <Link to="/blog">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blog
                </Link>
              </Button>
              
              {post.category && (
                <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary hover:bg-primary/15">
                  {post.category}
                </Badge>
              )}
              
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {post.author && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time>{publishedDate}</time>
                </div>
                {post.reading_time && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.reading_time}</span>
                  </div>
                )}
              </div>
            </div>
          </ResponsiveContainer>
        </div>

        {/* Featured Image */}
        {post.featured_image && (
          <ResponsiveContainer className="py-8">
            <div className="max-w-4xl mx-auto">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
          </ResponsiveContainer>
        )}

        {/* Content Section */}
        <ResponsiveContainer className="py-12 md:py-16">
          <article
            className="prose prose-gray dark:prose-invert max-w-4xl [&_*]:!text-left prose-headings:font-bold prose-a:text-primary prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="mt-16 flex justify-center">
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/blog">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </ResponsiveContainer>
      </main>

      <Footer />
    </div>
  );
}
