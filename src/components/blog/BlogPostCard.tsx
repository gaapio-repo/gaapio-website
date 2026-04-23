import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { memo } from "react";
import { Link } from "react-router-dom";

interface BlogPost {
  id: string | number;
  title: string;
  slug?: string;
  excerpt: string;
  date: string;
  author: string;
  imageUrl: string;
  category: string;
  readingTime?: string;
}

interface BlogPostCardProps {
  post: BlogPost;
  featured?: boolean;
}

export const BlogPostCard = memo(function BlogPostCard({ post, featured = false }: BlogPostCardProps) {
  const postSlug = post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const readingTime = post.readingTime || "5 min read";
  
  if (featured) {
    return (
      <Card className="group h-full flex flex-col lg:flex-row overflow-hidden rounded-2xl hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-border/50 bg-card">
        <div className="lg:w-1/2 aspect-video lg:aspect-auto overflow-hidden relative">
          <img
            src={post.imageUrl}
            alt={`Featured image for article: ${post.title}`}
            className="h-full w-full object-cover transition-transform group-hover:scale-105 duration-500"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="lg:w-1/2 flex flex-col p-6 lg:p-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="default" className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
              {post.category}
            </Badge>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>{readingTime}</span>
            </div>
          </div>
          <h3 className="text-2xl lg:text-3xl font-bold leading-tight mb-4 group-hover:text-primary transition-colors">
            <Link 
              to={`/blog/${postSlug}`} 
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
            >
              {post.title}
            </Link>
          </h3>
          <p className="text-muted-foreground mb-6 flex-grow line-clamp-3 lg:line-clamp-4">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">{post.author}</span>
              <span className="text-xs text-muted-foreground">{post.date}</span>
            </div>
            <Button 
              size="sm" 
              variant="default"
              asChild
              className="rounded-full"
            >
              <Link 
                to={`/blog/${postSlug}`}
                aria-label={`Read more about ${post.title}`}
              >
                Read Article
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="group h-full flex flex-col overflow-hidden rounded-2xl hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 border border-border/50 bg-card">
      <div className="aspect-video w-full overflow-hidden relative">
        <img
          src={post.imageUrl}
          alt={`Featured image for article: ${post.title}`}
          className="h-full w-full object-cover transition-transform group-hover:scale-105 duration-500"
          loading="lazy"
          decoding="async"
          width={400}
          height={225}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <CardHeader className="pb-0 space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="default" className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
            {post.category}
          </Badge>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>{readingTime}</span>
          </div>
        </div>
        <h3 className="text-lg sm:text-xl font-bold leading-tight group-hover:text-primary transition-colors">
          <Link 
            to={`/blog/${postSlug}`} 
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
          >
            {post.title}
          </Link>
        </h3>
      </CardHeader>
      <CardContent className="py-4 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {post.excerpt}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-0 border-t border-border/30 mt-auto">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">{post.author}</span>
          <span className="text-xs text-muted-foreground">{post.date}</span>
        </div>
        <Button 
          size="sm" 
          variant="ghost"
          asChild
          className="text-primary hover:text-primary hover:bg-primary/10"
        >
          <Link 
            to={`/blog/${postSlug}`}
            aria-label={`Read more about ${post.title}`}
          >
            Read More →
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
});
