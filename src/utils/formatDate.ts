/** Format a date string for display */
export function formatDate(dateStr: string, format: 'short' | 'long' = 'short'): string {
  const opts: Intl.DateTimeFormatOptions = format === 'long'
    ? { year: 'numeric', month: 'long', day: 'numeric' }
    : { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString('en-US', opts);
}

/** Format a date as "Mon YYYY" (e.g., "Feb 2026") */
export function formatDateMonth(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}
