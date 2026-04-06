import { Link } from 'react-router-dom';
import type { CommentLetter } from '@/types/commentLetters';
import { CARD_STYLES } from './styles';
import { TagList } from './TagList';
import { formatDate } from '@/utils/formatDate';

interface CommentLetterCardProps {
  letter: CommentLetter;
}

export function CommentLetterCard({ letter }: CommentLetterCardProps) {
  return (
    <article className={`group py-5 px-6 mb-3 last:mb-0 ${CARD_STYLES}`}>
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

      <p className="text-sm text-muted-foreground/70 mb-2.5">
        {formatDate(letter.date_filed)}
        <span className="mx-1.5">·</span>
        {letter.letter_type}
        {letter.industry && (
          <>
            <span className="mx-1.5">·</span>
            {letter.industry}
          </>
        )}
      </p>

      {letter.ai_summary && (
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">
          {letter.ai_summary}
        </p>
      )}

      <TagList tags={letter.primary_tags} maxTags={3} />
    </article>
  );
}
