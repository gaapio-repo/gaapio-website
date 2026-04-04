import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ExternalLink } from 'lucide-react';
import type { CommentLetter } from '@/types/commentLetters';
import { topicToSlug } from '@/types/commentLetters';

interface CommentLetterCardProps {
  letter: CommentLetter;
}

export function CommentLetterCard({ letter }: CommentLetterCardProps) {
  return (
    <Card className="group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <Link
            to={`/comment-letters/${letter.slug}`}
            className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-tight"
          >
            {letter.company_name}
          </Link>
          {letter.ticker && (
            <Badge variant="secondary" className="shrink-0 text-xs">
              {letter.ticker}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(letter.date_filed).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
          <Badge
            variant="outline"
            className="text-xs"
          >
            {letter.letter_type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-3">
        {letter.ai_summary && (
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {letter.ai_summary}
          </p>
        )}
        {letter.primary_tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
            {letter.primary_tags.slice(0, 3).map(tag => (
              <Link
                key={tag}
                to={`/comment-letters/topics/${topicToSlug(tag)}`}
              >
                <Badge
                  variant="default"
                  className="bg-primary/10 text-primary hover:bg-primary/20 border-0 text-xs cursor-pointer"
                >
                  {tag}
                </Badge>
              </Link>
            ))}
            {letter.primary_tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{letter.primary_tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
