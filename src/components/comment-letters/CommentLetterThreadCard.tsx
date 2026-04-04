import { Link, useNavigate } from 'react-router-dom';
import type { CommentLetterThread } from '@/types/commentLetters';
import { topicToSlug } from '@/types/commentLetters';
import { CARD_STYLES } from './styles';

interface CommentLetterThreadCardProps {
  thread: CommentLetterThread;
}

export function CommentLetterThreadCard({ thread }: CommentLetterThreadCardProps) {
  const navigate = useNavigate();
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

  const detailUrl = `/comment-letters/${thread.slug}`;

  return (
    <article
      onClick={() => navigate(detailUrl)}
      className={`group py-5 px-6 mb-3 last:mb-0 cursor-pointer ${CARD_STYLES}`}
    >
      {/* Company name + ticker + metadata on one line */}
      <div className="flex items-baseline flex-wrap gap-x-2 gap-y-0.5 mb-2">
        <span className="text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
          {thread.company_name}
        </span>
        {thread.ticker && (
          <span className="text-xs font-medium text-muted-foreground/70 tracking-wide uppercase">
            {thread.ticker}
          </span>
        )}
        <span className="text-sm text-muted-foreground/60">
          {metaParts.join(' · ')}
        </span>
      </div>

      {/* AI Summary */}
      {thread.ai_summary && (
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">
          {thread.ai_summary}
        </p>
      )}

      {/* Topic tags — uppercase micro-labels */}
      {thread.primary_tags.length > 0 && (
        <>
          <hr className="border-t border-border/30 my-3" />
          <div className="flex flex-wrap items-center text-[10px] uppercase tracking-widest text-muted-foreground/50">
            {thread.primary_tags.slice(0, 4).map((tag, i) => (
              <span key={tag} className="flex items-center">
                {i > 0 && <span className="mx-2">·</span>}
                <Link
                  to={`/comment-letters/topics/${topicToSlug(tag)}`}
                  onClick={e => e.stopPropagation()}
                  className="hover:text-primary transition-colors"
                >
                  {tag}
                </Link>
              </span>
            ))}
            {thread.primary_tags.length > 4 && (
              <span className="ml-2">
                +{thread.primary_tags.length - 4} more
              </span>
            )}
          </div>
        </>
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
