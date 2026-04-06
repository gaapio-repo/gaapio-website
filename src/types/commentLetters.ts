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
  file_number: string | null;
  slug: string;
  created_at: string;
  tags: string[];
  primary_tags: string[];
}

export interface CommentLetterDetail extends CommentLetter {
  cleaned_text?: string | null;
  raw_text?: string | null;
}

export interface TopicStat {
  topic: string;
  letter_count: number;
  latest_filing_date: string;
}

export interface CommentLetterThread {
  file_number: string | null;
  company_name: string;
  ticker: string | null;
  industry: string | null;
  slug: string; // slug of the most recent letter
  letter_count: number;
  first_date: string;
  last_date: string;
  ai_summary: string | null;
  tags: string[];
  primary_tags: string[];
  letters: CommentLetter[];
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

/** Group an array of letters into threads by file_number */
export function groupIntoThreads(letters: CommentLetter[]): CommentLetterThread[] {
  const threadMap = new Map<string, CommentLetter[]>();

  for (const letter of letters) {
    const key = letter.file_number || `standalone-${letter.id}`;
    if (!threadMap.has(key)) {
      threadMap.set(key, []);
    }
    threadMap.get(key)!.push(letter);
  }

  const threads: CommentLetterThread[] = [];

  for (const [key, threadLetters] of threadMap) {
    // Sort by date ascending within thread
    threadLetters.sort((a, b) => new Date(a.date_filed).getTime() - new Date(b.date_filed).getTime());

    const latest = threadLetters[threadLetters.length - 1];
    const allTags = [...new Set(threadLetters.flatMap(l => l.tags))];
    const allPrimaryTags = [...new Set(threadLetters.flatMap(l => l.primary_tags))];

    threads.push({
      file_number: latest.file_number,
      company_name: latest.company_name,
      ticker: latest.ticker,
      industry: latest.industry,
      slug: latest.slug,
      letter_count: threadLetters.length,
      first_date: threadLetters[0].date_filed,
      last_date: latest.date_filed,
      ai_summary: latest.ai_summary,
      tags: allTags,
      primary_tags: allPrimaryTags,
      letters: threadLetters,
    });
  }

  // Sort threads by most recent letter date, descending
  threads.sort((a, b) => new Date(b.last_date).getTime() - new Date(a.last_date).getTime());

  return threads;
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
