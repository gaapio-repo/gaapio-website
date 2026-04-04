import { useRef, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { CommentLetterFilters } from '@/types/commentLetters';
import type { TopicStat } from '@/types/commentLetters';

interface CommentLetterFilterBarProps {
  filters: CommentLetterFilters;
  onFilterChange: (updates: Partial<CommentLetterFilters>) => void;
  filterOptions: {
    years: string[];
    industries: string[];
    letterTypes: string[];
  };
  topics?: TopicStat[];
  lockedTopic?: string;
}

export function CommentLetterFilterBar({
  filters,
  onFilterChange,
  filterOptions,
  topics,
  lockedTopic,
}: CommentLetterFilterBarProps) {
  const [searchValue, setSearchValue] = useState(filters.search || '');
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // Sync external search changes
  useEffect(() => {
    setSearchValue(filters.search || '');
  }, [filters.search]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onFilterChange({ search: value || undefined });
    }, 300);
  };

  useEffect(() => {
    return () => clearTimeout(debounceRef.current);
  }, []);

  const activeFilterCount = [
    filters.search,
    !lockedTopic && filters.topic,
    filters.year,
    filters.letterType,
    filters.industry,
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setSearchValue('');
    onFilterChange({
      search: undefined,
      topic: lockedTopic || undefined,
      year: undefined,
      letterType: undefined,
      industry: undefined,
      sort: undefined,
    });
  };

  const filterDropdowns = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {/* Topic filter — hidden when topic is locked (on topic detail page) */}
      {!lockedTopic && (
        <Select
          value={filters.topic || '_all'}
          onValueChange={v => onFilterChange({ topic: v === '_all' ? undefined : v })}
        >
          <SelectTrigger className="bg-muted/70 border-0 shadow-sm">
            <SelectValue placeholder="All Topics" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="_all">All Topics</SelectItem>
            {(topics || []).map(t => (
              <SelectItem key={t.topic} value={t.topic}>
                {t.topic} ({t.letter_count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <Select
        value={filters.year || '_all'}
        onValueChange={v => onFilterChange({ year: v === '_all' ? undefined : v })}
      >
        <SelectTrigger className="bg-muted/70 border-0 shadow-sm">
          <SelectValue placeholder="All Years" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="_all">All Years</SelectItem>
          {filterOptions.years.map(y => (
            <SelectItem key={y} value={y}>{y}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.letterType || '_all'}
        onValueChange={v => onFilterChange({ letterType: v === '_all' ? undefined : v })}
      >
        <SelectTrigger className="bg-muted/70 border-0 shadow-sm">
          <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="_all">All Types</SelectItem>
          {filterOptions.letterTypes.map(t => (
            <SelectItem key={t} value={t}>{t}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.industry || '_all'}
        onValueChange={v => onFilterChange({ industry: v === '_all' ? undefined : v })}
      >
        <SelectTrigger className="bg-muted/70 border-0 shadow-sm">
          <SelectValue placeholder="All Industries" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="_all">All Industries</SelectItem>
          {filterOptions.industries.map(i => (
            <SelectItem key={i} value={i}>{i}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Search + Sort row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by company, ticker, or keyword..."
            value={searchValue}
            onChange={e => handleSearchChange(e.target.value)}
            className="pl-9 bg-muted/70 border-0 shadow-sm"
          />
          {searchValue && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Select
          value={filters.sort || 'date_desc'}
          onValueChange={v => onFilterChange({ sort: v as CommentLetterFilters['sort'] })}
        >
          <SelectTrigger className="w-full sm:w-48 bg-muted/70 border-0 shadow-sm">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date_desc">Newest First</SelectItem>
            <SelectItem value="date_asc">Oldest First</SelectItem>
            <SelectItem value="company_asc">Company A-Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Desktop: always visible filters */}
      <div className="hidden md:block">
        {filterDropdowns}
      </div>

      {/* Mobile: collapsible filters */}
      <Collapsible className="md:hidden">
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {activeFilterCount}
                </Badge>
              )}
            </span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3">
          {filterDropdowns}
        </CollapsibleContent>
      </Collapsible>

      {/* Active filters */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {filters.search && (
            <Badge variant="secondary" className="gap-1">
              Search: {filters.search}
              <button onClick={() => { setSearchValue(''); onFilterChange({ search: undefined }); }}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {!lockedTopic && filters.topic && (
            <Badge variant="secondary" className="gap-1">
              {filters.topic}
              <button onClick={() => onFilterChange({ topic: undefined })}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.year && (
            <Badge variant="secondary" className="gap-1">
              {filters.year}
              <button onClick={() => onFilterChange({ year: undefined })}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.letterType && (
            <Badge variant="secondary" className="gap-1">
              {filters.letterType}
              <button onClick={() => onFilterChange({ letterType: undefined })}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.industry && (
            <Badge variant="secondary" className="gap-1">
              {filters.industry}
              <button onClick={() => onFilterChange({ industry: undefined })}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          <button
            onClick={clearAllFilters}
            className="text-sm text-muted-foreground hover:text-foreground underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
