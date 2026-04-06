import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getToolPagesViewed } from '@/hooks/useToolPageTracking';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Search, Bell, Shield } from 'lucide-react';

interface EmailGateProps {
  toolSlug: string;
  toolConfig: {
    require_email: boolean;
    email_gate_hard: boolean;
    email_gate_page_threshold: number;
    internal_domains?: string[];
  };
  variantConfig?: {
    email_gate_hard?: boolean;
    email_gate_page_threshold?: number;
    email_gate_copy?: string;
  } | null;
  abVariantId?: string | null;
  children: React.ReactNode;
}

const DEFAULT_COPY = 'Enter your email for unlimited access to our SEC comment letter database, plus alerts when new letters are published.';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function EmailGate({
  toolSlug,
  toolConfig,
  variantConfig,
  abVariantId,
  children,
}: EmailGateProps) {
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // If email not required, render children directly
  if (!toolConfig.require_email) {
    return <>{children}</>;
  }

  // If user already provided email for this tool, skip the gate
  const storageKey = `tool_email_${toolSlug}`;
  const existingEmail = localStorage.getItem(storageKey);
  if (existingEmail) {
    return <>{children}</>;
  }

  // Check page view threshold
  const threshold = variantConfig?.email_gate_page_threshold ?? toolConfig.email_gate_page_threshold;
  const pagesViewed = getToolPagesViewed(toolSlug);

  if (pagesViewed < threshold) {
    return <>{children}</>;
  }

  // Determine gate behavior from variant or tool config
  const isHard = variantConfig?.email_gate_hard ?? toolConfig.email_gate_hard;
  const copy = variantConfig?.email_gate_copy ?? DEFAULT_COPY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setSubmitting(true);
    try {
      const emailDomain = email.split('@')[1]?.toLowerCase();
      const internalDomains = toolConfig.internal_domains ?? [];
      const isInternal = emailDomain ? internalDomains.some(d => d.toLowerCase() === emailDomain) : false;

      await supabase.from('tool_email_captures').insert({
        tool_slug: toolSlug,
        email,
        ab_variant_id: abVariantId ?? null,
        page_path: window.location.pathname,
        is_internal: isInternal,
      });

      localStorage.setItem(storageKey, email);
      setOpen(false);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSkip = () => {
    localStorage.setItem(storageKey, 'skipped');
    setOpen(false);
  };

  return (
    <>
      {children}
      <Dialog open={open} onOpenChange={isHard ? undefined : setOpen}>
        <DialogContent
          className="sm:max-w-lg p-0 gap-0 overflow-hidden"
          onPointerDownOutside={isHard ? (e) => e.preventDefault() : undefined}
          onEscapeKeyDown={isHard ? (e) => e.preventDefault() : undefined}
        >
          {/* Header accent bar */}
          <div className="h-1.5 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600" />

          <div className="px-6 pt-6 pb-2">
            {/* Icon + Title */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold tracking-tight">You're on a roll</h2>
                <p className="text-xs text-muted-foreground">Keep going with full access</p>
              </div>
            </div>

            {/* Value proposition */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              {copy}
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-1 gap-2.5 mb-5">
              <div className="flex items-center gap-2.5 text-sm">
                <Search className="h-4 w-4 text-blue-500 shrink-0" />
                <span className="text-muted-foreground">Unlimited search across 8,000+ comment letters</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <Bell className="h-4 w-4 text-blue-500 shrink-0" />
                <span className="text-muted-foreground">Alerts when new letters are published</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <Shield className="h-4 w-4 text-blue-500 shrink-0" />
                <span className="text-muted-foreground">No account required — just your email</span>
              </div>
            </div>
          </div>

          {/* Form section */}
          <div className="px-6 pb-6">
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
                required
                autoFocus
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full h-11 font-medium" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Continue with Email'}
              </Button>
            </form>

            {!isHard && (
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={handleSkip}
                  className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors underline underline-offset-2"
                >
                  No thanks, continue browsing
                </button>
              </div>
            )}

            <p className="text-[11px] text-muted-foreground/50 text-center mt-4">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
