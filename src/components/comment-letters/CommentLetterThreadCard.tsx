import { Link } from 'react-router-dom';
import type { CommentLetterThread } from '@/types/commentLetters';
import { topicToSlug } from '@/types/commentLetters';

interface CommentLetterThreadCardProps {
  thread: CommentLetterThread;
}

export function CommentLetterThreadCard({ thread }: CommentLetterThreadCardProps) {
  const isMulti = thread.letter_count > 1;

  const dateDisplay = isMulti
    ? `${formatDate(thread.first_date)} — ${formatDate(thread.last_date)}`
    : formatDate(thread.first_date);

  // Build metadata parts
  const metaParts: string[] = [dateDisplay];
  if (isMulti) {
    metaParts.push(`${thread.letter_count} letters`);
  } else {
    metaParts.push(thread.letters[0]?.letter_type || '');
  }
  if (thread.industry) {
    metaParts.push(thread.industry);
  }

  return (
    <article className="group py-5 px-6 rounded-lg bg-muted/70 shadow-sm hover:shadow-md transition-shadow duration-200 mb-3 last:mb-0">
      {/* Company name + ticker */}
      <div className="flex items-baseline gap-2 mb-1">
        <Link
          to={`/comment-letters/${thread.slug}`}
          className="text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-snug"
        >
          {thread.company_name}
        </Link>
        {thread.ticker && (
          <span className="text-xs font-medium text-muted-foreground/70 tracking-wide uppercase">
            {thread.ticker}
          </span>
        )}
      </div>

      {/* Metadata line */}
      <p className="text-sm text-muted-foreground/70 mb-2.5">
        {metaParts.join(' · ')}
      </p>

      {/* Thread letter breakdown (for multi-letter threads) */}
      {isMulti && (
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground/60 mb-2.5">
          {thread.letters.map((letter, i) => (
            <span key={letter.id} className="flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${letter.letter_type === 'SEC Staff' ? 'bg-amber-400' : 'bg-primary/60'}`} />
              {letter.letter_type === 'SEC Staff' ? 'SEC' : 'Response'} — {formatDateShort(letter.date_filed)}
            </span>
          ))}
        </div>
      )}

      {/* AI Summary */}
      {thread.ai_summary && (
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">
          {thread.ai_summary}
        </p>
      )}

      {/* Topic tags as text links */}
      {thread.primary_tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-1 text-xs">
          {thread.primary_tags.slice(0, 4).map((tag, i) => (
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
          {thread.primary_tags.length > 4 && (
            <span className="text-muted-foreground/50 ml-1">
              +{thread.primary_tags.length - 4} more
            </span>
          )}
        </div>
      )}
    </article>
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function formatDateShort(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}
