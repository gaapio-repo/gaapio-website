import { FileSearch } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onClear?: () => void;
}

export function EmptyState({
  title = 'No letters found',
  description = 'Try adjusting your search or filters.',
  onClear,
}: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <FileSearch className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      {onClear && (
        <button onClick={onClear} className="text-primary hover:underline text-sm">
          Clear all filters
        </button>
      )}
    </div>
  );
}
