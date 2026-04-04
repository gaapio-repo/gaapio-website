import { Link } from 'react-router-dom';
import { FileText, Calendar } from 'lucide-react';
import type { TopicStat } from '@/types/commentLetters';
import { topicToSlug } from '@/types/commentLetters';
import { CARD_STYLES } from './styles';

interface TopicCardProps {
  topic: TopicStat;
}

export function TopicCard({ topic }: TopicCardProps) {
  return (
    <Link to={`/comment-letters/topics/${topicToSlug(topic.topic)}`}>
      <div className={`group p-5 h-full cursor-pointer ${CARD_STYLES}`}>
        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-tight mb-2">
          {topic.topic}
        </h3>
        <div className="flex items-center gap-4 text-xs text-muted-foreground/60">
          <span className="flex items-center gap-1">
            <FileText className="h-3 w-3" />
            {topic.letter_count} {topic.letter_count === 1 ? 'letter' : 'letters'}
          </span>
          {topic.latest_filing_date && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(topic.latest_filing_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
              })}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
