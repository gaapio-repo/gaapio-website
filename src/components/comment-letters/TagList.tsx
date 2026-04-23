import { Link } from 'react-router-dom';
import { topicToSlug } from '@/types/commentLetters';

interface TagListProps {
  tags: string[];
  maxTags?: number;
  /** Stop click propagation (for use inside clickable cards) */
  stopPropagation?: boolean;
}

export function TagList({ tags, maxTags = 4, stopPropagation = false }: TagListProps) {
  if (tags.length === 0) return null;

  const visible = tags.slice(0, maxTags);
  const remaining = tags.length - maxTags;

  return (
    <>
      <hr className="border-t border-border/30 my-3" />
      <div className="flex flex-wrap items-center text-[10px] uppercase tracking-widest text-muted-foreground/50">
        {visible.map((tag, i) => (
          <span key={tag} className="flex items-center">
            {i > 0 && <span className="mx-2">·</span>}
            <Link
              to={`/comment-letters/topics/${topicToSlug(tag)}`}
              onClick={stopPropagation ? e => e.stopPropagation() : undefined}
              className="hover:text-primary transition-colors"
            >
              {tag}
            </Link>
          </span>
        ))}
        {remaining > 0 && (
          <span className="ml-2">+{remaining} more</span>
        )}
      </div>
    </>
  );
}
