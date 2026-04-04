export interface CommentLetter {
  id: string;
  company_name: string;
  ticker: string | null;
  cik: string | null;
  date_filed: string;
  industry: string | null;
  ai_summary: string | null;
  sec_url: string;
  letter_type: string;
  filing_type: string | null;
  form_type: string | null;
  slug: string;
  created_at: string;
  tags: string[];
  primary_tags: string[];
}

export interface CommentLetterDetail extends CommentLetter {
  cleaned_text?: string | null;
}

export interface TopicStat {
  topic: string;
  letter_count: number;
  latest_filing_date: string;
}

export interface CommentLetterFilters {
  search?: string;
  topic?: string;
  year?: string;
  letterType?: string;
  industry?: string;
  sort?: 'date_desc' | 'date_asc' | 'company_asc';
  page?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export function topicToSlug(topic: string): string {
  return topic
    .toLowerCase()
    .replace(/\s*—\s*/g, '-')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function slugToTopicPattern(slug: string): string {
  // Convert slug back to a pattern for matching
  // e.g. "asc-606-revenue-recognition" → "ASC 606"
  const match = slug.match(/^asc-(\d+)/);
  if (match) {
    return `ASC ${match[1]}`;
  }
  return slug.replace(/-/g, ' ');
}
