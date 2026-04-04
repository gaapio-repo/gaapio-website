import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar } from 'lucide-react';
import type { TopicStat } from '@/types/commentLetters';
import { topicToSlug } from '@/types/commentLetters';

interface TopicCardProps {
  topic: TopicStat;
}

export function TopicCard({ topic }: TopicCardProps) {
  return (
    <Link to={`/comment-letters/topics/${topicToSlug(topic.topic)}`}>
      <Card className="group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 h-full">
        <CardHeader className="pb-2">
          <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
            {topic.topic}
          </h3>
        </CardHeader>
        <CardContent className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <FileText className="h-3.5 w-3.5" />
            {topic.letter_count} {topic.letter_count === 1 ? 'letter' : 'letters'}
          </span>
          {topic.latest_filing_date && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              Latest: {new Date(topic.latest_filing_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
              })}
            </span>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
