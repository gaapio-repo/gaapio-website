import { useNavigate } from 'react-router-dom';
import type { CommentLetterThread } from '@/types/commentLetters';
import { CARD_STYLES } from './styles';
import { TagList } from './TagList';
import { formatDate } from '@/utils/formatDate';

interface CommentLetterThreadCardProps {
  thread: CommentLetterThread;
}

export function CommentLetterThreadCard({ thread }: CommentLetterThreadCardProps) {
  const navigate = useNavigate();
  const isMulti = thread.letter_count > 1;

  const dateDisplay = isMulti
    ? `${formatDate(thread.first_date)} — ${formatDate(thread.last_date)}`
    : formatDate(thread.first_date);

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

      {thread.ai_summary && (
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">
          {thread.ai_summary}
        </p>
      )}

      <TagList tags={thread.primary_tags} maxTags={4} stopPropagation />
    </article>
  );
}
