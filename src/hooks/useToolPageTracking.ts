import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

const SESSION_KEY = 'tool_session_id';
const PAGES_KEY_PREFIX = 'tool_pages_viewed_';

function getOrCreateSessionId(): string {
  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

function incrementPageCount(toolSlug: string): number {
  const key = `${PAGES_KEY_PREFIX}${toolSlug}`;
  const current = parseInt(sessionStorage.getItem(key) || '0', 10);
  const next = current + 1;
  sessionStorage.setItem(key, String(next));
  return next;
}

function getUTMParams(): { utm_source: string | null; utm_medium: string | null; utm_campaign: string | null } {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
  };
}

/**
 * Detect whether the current visitor is internal based on:
 * 1. Authenticated admin session
 * 2. Previously captured email matching an internal domain
 * 3. Email stored from email gate matching an internal domain
 */
async function detectIsInternal(toolSlug: string, internalDomains: string[]): Promise<boolean> {
  if (!internalDomains.length) return false;

  // Check 1: authenticated user with admin role
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user?.email) {
      const emailDomain = session.user.email.split('@')[1]?.toLowerCase();
      if (emailDomain && internalDomains.some(d => d.toLowerCase() === emailDomain)) {
        return true;
      }
    }
  } catch {
    // Auth check failed, continue
  }

  // Check 2: email from prior gate submission stored in localStorage
  const storedEmail = localStorage.getItem(`tool_email_${toolSlug}`);
  if (storedEmail && storedEmail !== 'skipped') {
    const emailDomain = storedEmail.split('@')[1]?.toLowerCase();
    if (emailDomain && internalDomains.some(d => d.toLowerCase() === emailDomain)) {
      return true;
    }
  }

  return false;
}

export function useToolPageTracking(toolSlug: string, internalDomains: string[] = []) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    const sessionId = getOrCreateSessionId();
    const pageNumber = incrementPageCount(toolSlug);
    const utmParams = getUTMParams();
    const abVariantId = sessionStorage.getItem(`ab_variant_${toolSlug}`) || null;

    const trackView = async () => {
      try {
        const isInternal = await detectIsInternal(toolSlug, internalDomains);

        const payload = {
          tool_slug: toolSlug,
          page_path: window.location.pathname,
          session_id: sessionId,
          page_number_in_session: pageNumber,
          ab_variant_id: abVariantId,
          referrer: document.referrer || null,
          ...utmParams,
          user_agent: navigator.userAgent,
          is_internal: isInternal,
        };

        // Try edge function first for country code enrichment
        const functionUrl = `${import.meta.env.VITE_SUPABASE_URL || 'https://bxojxrcerefklsrqkmrs.supabase.co'}/functions/v1/track-tool-pageview`;

        const response = await fetch(functionUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        // If edge function fails, fall back to direct insert (without country code)
        if (!response.ok) {
          await supabase.from('tool_page_views').insert(payload);
        }
      } catch {
        // Silently fail — tracking should never break the user experience
      }
    };

    trackView();
  }, [toolSlug, internalDomains]);
}

export function getToolPagesViewed(toolSlug: string): number {
  return parseInt(sessionStorage.getItem(`${PAGES_KEY_PREFIX}${toolSlug}`) || '0', 10);
}
