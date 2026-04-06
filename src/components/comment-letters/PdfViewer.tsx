import { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Loader2, ExternalLink } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { supabase } from '@/integrations/supabase/client';

// Use unpkg for the worker — cdnjs doesn't have this version yet
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  url: string;
  title?: string;
}

export function PdfViewer({ url, title }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState(1.2);
  const [error, setError] = useState(false);

  // Proxy SEC URLs through our edge function to avoid CORS/X-Frame-Options blocks
  const functionsUrl = supabase.functionsUrl;
  const proxyUrl = url.includes('sec.gov')
    ? `${functionsUrl}/proxy-sec-pdf?url=${encodeURIComponent(url)}`
    : url;

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  }, []);

  const onDocumentLoadError = useCallback((err: Error) => {
    console.error('PDF load error:', err?.message || err);
    setError(true);
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-sm text-muted-foreground mb-3">Unable to load PDF preview.</p>
        <Button variant="outline" size="sm" asChild>
          <a href={url} target="_blank" rel="noopener noreferrer">
            View on EDGAR <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
          </a>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Toolbar — zoom only */}
      {numPages > 0 && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border/40 bg-muted/30">
          <span className="text-xs text-muted-foreground">
            {numPages} {numPages === 1 ? 'page' : 'pages'}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost" size="icon" className="h-7 w-7"
              onClick={() => setScale(s => Math.max(0.5, s - 0.2))}
              disabled={scale <= 0.5}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-xs text-muted-foreground min-w-[40px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <Button
              variant="ghost" size="icon" className="h-7 w-7"
              onClick={() => setScale(s => Math.min(2.5, s + 0.2))}
              disabled={scale >= 2.5}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* PDF content — all pages rendered for continuous scroll */}
      <div className="overflow-auto" style={{ maxHeight: '70vh', minHeight: '400px' }}>
        <Document
          file={proxyUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              <span className="ml-2 text-sm text-muted-foreground">Loading PDF...</span>
            </div>
          }
        >
          {Array.from({ length: numPages }, (_, i) => (
            <Page
              key={i + 1}
              pageNumber={i + 1}
              scale={scale}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              loading={null}
            />
          ))}
        </Document>
      </div>
    </div>
  );
}
