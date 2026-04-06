import { ExternalLink } from 'lucide-react';
import type { ThreadLetter } from '@/hooks/useCommentLetterThread';
import { extractHtmlBody } from '@/utils/extractHtmlBody';
import { formatDate } from '@/utils/formatDate';
import { CARD_STYLES_STATIC } from './styles';

interface LetterSlideProps {
  item: ThreadLetter;
}

export function LetterSlide({ item }: LetterSlideProps) {
  const date = formatDate(item.date_filed, 'long');
  const isSecStaff = item.letter_type === 'SEC Staff';
  const isPdf = item.sec_url?.toLowerCase().endsWith('.pdf');

  return (
    <div className={`overflow-hidden ${CARD_STYLES_STATIC}`}>
      {/* Letter metadata + summary */}
      <div className="p-5 md:px-8 md:pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${isSecStaff ? 'bg-amber-500' : 'bg-primary'}`} />
            <span className="text-base font-semibold">{item.letter_type}</span>
            <span className="text-sm text-muted-foreground">{date}</span>
          </div>
          {item.sec_url && (
            <a
              href={item.sec_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
            >
              EDGAR
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
        {item.ai_summary && (
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {item.ai_summary}
          </p>
        )}
      </div>

      {/* Letter content */}
      {isPdf && item.sec_url ? (
        <div className="px-5 md:px-8 pb-5">
          <iframe
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(item.sec_url)}&embedded=true`}
            title={`${item.letter_type} — ${date}`}
            className="w-full border-0 bg-background rounded-lg shadow-inner"
            style={{ height: '70vh', minHeight: '500px' }}
          />
        </div>
      ) : (item.raw_text || item.cleaned_text) ? (
        <div className="px-5 md:px-8 pb-5">
          <iframe
            srcDoc={extractHtmlBody(item.raw_text || item.cleaned_text!)}
            title={`${item.letter_type} — ${date}`}
            className="w-full border-0 bg-background rounded-lg shadow-inner"
            style={{ height: '70vh', minHeight: '500px' }}
            sandbox=""
          />
        </div>
      ) : (
        <div className="px-5 md:px-8 pb-5">
          <p className="text-sm text-muted-foreground italic">Content not available.</p>
        </div>
      )}
    </div>
  );
}
