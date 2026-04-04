import { Link } from 'react-router-dom';
import type { CommentLetter } from '@/types/commentLetters';
import { topicToSlug } from '@/types/commentLetters';

interface CommentLetterCardProps {
  letter: CommentLetter;
}

export function CommentLetterCard({ letter }: CommentLetterCardProps) {
  const date = new Date(letter.date_filed).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <article className="group py-5 px-6 rounded-lg bg-muted/70 shadow-sm hover:shadow-md transition-shadow duration-200 mb-3 last:mb-0">
      {/* Company name + ticker */}
      <div className="flex items-baseline gap-2 mb-1">
        <Link
          to={`/comment-letters/${letter.slug}`}
          className="text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-snug"
        >
          {letter.company_name}
        </Link>
        {letter.ticker && (
          <span className="text-xs font-medium text-muted-foreground/70 tracking-wide uppercase">
            {letter.ticker}
          </span>
        )}
      </div>

      {/* Metadata line */}
      <p className="text-sm text-muted-foreground/70 mb-2.5">
        {date}
        <span className="mx-1.5">·</span>
        {letter.letter_type}
        {letter.industry && (
          <>
            <span className="mx-1.5">·</span>
            {letter.industry}
          </>
        )}
      </p>

      {/* AI Summary */}
      {letter.ai_summary && (
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">
          {letter.ai_summary}
        </p>
      )}

      {/* Topic tags as text links */}
      {letter.primary_tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-1 text-xs">
          {letter.primary_tags.slice(0, 3).map((tag, i) => (
            <span key={tag} className="flex items-center">
              {i > 0 && <span className="text-muted-foreground/40 mr-1">·</span>}
              <Link
                to={`/comment-letters/topics/${topicToSlug(tag)}`}
                className="text-primary/80 hover:text-primary hover:underline transition-colors"
              >
                {tag}
              </Link>
            </span>
          ))}
          {letter.primary_tags.length > 3 && (
            <span className="text-muted-foreground/50 ml-1">
              +{letter.primary_tags.length - 3} more
            </span>
          )}
        </div>
      )}
    </article>
  );
}
