import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import type { TopicStat } from '@/types/commentLetters';
import { topicToSlug } from '@/types/commentLetters';
import { CARD_STYLES } from './styles';

interface TopicCardProps {
  topic: TopicStat;
  /** Sorted array of all letter counts across topics, for relative scaling */
  allCounts?: number[];
}

/** 10-step volume gradient: grey → teal → blue */
const VOLUME_STYLES = [
  'bg-[#f1f1f1] text-[#999]',
  'bg-[#e8e8e8] text-[#777]',
  'bg-[#dde8e8] text-[#5f7a7a]',
  'bg-[#d0e8ee] text-[#3d7a8a]',
  'bg-[#bee0f0] text-[#2a6f8f]',
  'bg-[#a8d5f2] text-[#1a6090]',
  'bg-[#8ec8f4] text-[#0e5090]',
  'bg-[#70b8f5] text-[#084080]',
  'bg-[#4da3f0] text-white',
  'bg-[#0088ee] text-white',
];

/** Get volume style based on percentile rank within all topics */
function getVolumeStyle(count: number, allCounts?: number[]): string {
  if (!allCounts || allCounts.length === 0) return VOLUME_STYLES[4];
  // Find what percentile this count is at
  const rank = allCounts.filter(c => c <= count).length;
  const percentile = rank / allCounts.length;
  const idx = Math.min(Math.floor(percentile * 10), 9);
  return VOLUME_STYLES[idx];
}

/** 10-step recency gradient: green → grey */
const RECENCY_COLORS = [
  'bg-[#22c55e]',  // last month
  'bg-[#4ade80]',  // 1–2 months
  'bg-[#86efac]',  // 2–3 months
  'bg-[#a3d9a5]',  // 3–4 months
  'bg-[#b8ccb0]',  // 4–6 months
  'bg-[#c4c4b8]',  // 6–8 months
  'bg-[#cccccc]',  // 8–10 months
  'bg-[#d4d4d4]',  // 10–12 months
  'bg-[#ddd]',     // 1–2 years
  'bg-[#e5e5e5]',  // 2+ years
];

function getRecencyColor(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const monthsAgo = (now.getFullYear() - date.getFullYear()) * 12 + (now.getMonth() - date.getMonth());

  if (monthsAgo <= 1) return RECENCY_COLORS[0];
  if (monthsAgo <= 2) return RECENCY_COLORS[1];
  if (monthsAgo <= 3) return RECENCY_COLORS[2];
  if (monthsAgo <= 4) return RECENCY_COLORS[3];
  if (monthsAgo <= 6) return RECENCY_COLORS[4];
  if (monthsAgo <= 8) return RECENCY_COLORS[5];
  if (monthsAgo <= 10) return RECENCY_COLORS[6];
  if (monthsAgo <= 12) return RECENCY_COLORS[7];
  if (monthsAgo <= 24) return RECENCY_COLORS[8];
  return RECENCY_COLORS[9];
}

export function TopicCard({ topic, allCounts }: TopicCardProps) {
  const volumeStyle = getVolumeStyle(topic.letter_count, allCounts);
  const recencyColor = topic.latest_filing_date ? getRecencyColor(topic.latest_filing_date) : RECENCY_COLORS[9];

  return (
    <Link to={`/comment-letters/topics/${topicToSlug(topic.topic)}`}>
      <div className={`group p-5 h-full cursor-pointer text-center flex flex-col justify-between ${CARD_STYLES}`}>
        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-tight mb-3">
          {topic.topic}
        </h3>
        <div className="flex items-center justify-center gap-3 mt-auto pt-2">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${volumeStyle}`}>
            {topic.letter_count}
          </span>
          {topic.latest_filing_date && (
            <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground/60">
              <span className={`w-1.5 h-1.5 rounded-full ${recencyColor}`} />
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
