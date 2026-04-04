import { useSearchParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import type { CommentLetterFilters } from '@/types/commentLetters';

export function useURLFilters(): [CommentLetterFilters, (updates: Partial<CommentLetterFilters>) => void] {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: CommentLetterFilters = useMemo(() => ({
    search: searchParams.get('q') || undefined,
    topic: searchParams.get('topic') || undefined,
    year: searchParams.get('year') || undefined,
    letterType: searchParams.get('type') || undefined,
    industry: searchParams.get('industry') || undefined,
    sort: (searchParams.get('sort') as CommentLetterFilters['sort']) || undefined,
    page: searchParams.get('page') ? Number(searchParams.get('page')) : undefined,
  }), [searchParams]);

  const setFilters = useCallback((updates: Partial<CommentLetterFilters>) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);

      // Check if any non-page filter changed — reset page to 1
      const nonPageKeys = ['search', 'topic', 'year', 'letterType', 'industry', 'sort'] as const;
      const hasNonPageChange = nonPageKeys.some(key => key in updates);

      if (hasNonPageChange && !('page' in updates)) {
        next.delete('page');
      }

      const paramMap: Record<string, string> = {
        search: 'q',
        topic: 'topic',
        year: 'year',
        letterType: 'type',
        industry: 'industry',
        sort: 'sort',
        page: 'page',
      };

      for (const [key, value] of Object.entries(updates)) {
        const param = paramMap[key];
        if (!param) continue;
        if (value === undefined || value === '' || value === null) {
          next.delete(param);
        } else {
          next.set(param, String(value));
        }
      }

      return next;
    }, { replace: true });
  }, [setSearchParams]);

  return [filters, setFilters];
}
