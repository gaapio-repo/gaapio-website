import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface PageView {
  id: string;
  tool_slug: string;
  page_path: string;
  session_id: string | null;
  page_number_in_session: number;
  ab_variant_id: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  country_code: string | null;
  is_internal: boolean;
  created_at: string;
}

interface EmailCapture {
  id: string;
  tool_slug: string;
  email: string;
  page_path: string | null;
  ab_variant_id: string | null;
  is_internal: boolean;
  created_at: string;
}

export interface DailyView {
  date: string;
  views: number;
}

export interface TopPage {
  page_path: string;
  views: number;
}

export interface ReferrerStat {
  source: string;
  count: number;
}

export interface CountryStat {
  country_code: string;
  count: number;
}

export interface FunnelStep {
  label: string;
  count: number;
  percentage: number;
}

export interface ToolViewStats {
  dailyViews: DailyView[];
  totalViews: number;
  uniqueSessions: number;
  bounceRate: number;
  avgSessionDepth: number;
  topPages: TopPage[];
  referrerBreakdown: ReferrerStat[];
  countryBreakdown: CountryStat[];
  conversionFunnel: FunnelStep[];
}

function classifyReferrer(referrer: string | null): string {
  if (!referrer) return 'Direct';
  try {
    const url = new URL(referrer);
    const host = url.hostname.toLowerCase();
    if (host.includes('google') || host.includes('bing') || host.includes('yahoo') || host.includes('duckduckgo')) return 'Organic Search';
    if (host.includes('linkedin') || host.includes('twitter') || host.includes('facebook') || host.includes('reddit')) return 'Social';
    return host;
  } catch {
    return 'Other';
  }
}

function aggregateViews(views: PageView[], emails: EmailCapture[], emailThreshold: number): ToolViewStats {
  // Daily views
  const dailyMap = new Map<string, number>();
  views.forEach(v => {
    const date = v.created_at.split('T')[0];
    dailyMap.set(date, (dailyMap.get(date) || 0) + 1);
  });
  const dailyViews = Array.from(dailyMap.entries())
    .map(([date, count]) => ({ date, views: count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // Unique sessions
  const sessions = new Set(views.map(v => v.session_id).filter(Boolean));
  const uniqueSessions = sessions.size;

  // Session depth map
  const sessionDepthMap = new Map<string, number>();
  views.forEach(v => {
    if (!v.session_id) return;
    const current = sessionDepthMap.get(v.session_id) || 0;
    sessionDepthMap.set(v.session_id, Math.max(current, v.page_number_in_session));
  });

  // Bounce rate
  const sessionDepths = Array.from(sessionDepthMap.values());
  const bounceCount = sessionDepths.filter(d => d === 1).length;
  const bounceRate = sessionDepths.length > 0 ? (bounceCount / sessionDepths.length) * 100 : 0;

  // Avg session depth
  const avgSessionDepth = sessionDepths.length > 0
    ? sessionDepths.reduce((sum, d) => sum + d, 0) / sessionDepths.length
    : 0;

  // Top pages
  const pageMap = new Map<string, number>();
  views.forEach(v => {
    pageMap.set(v.page_path, (pageMap.get(v.page_path) || 0) + 1);
  });
  const topPages = Array.from(pageMap.entries())
    .map(([page_path, count]) => ({ page_path, views: count }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  // Referrer breakdown
  const referrerMap = new Map<string, number>();
  views.forEach(v => {
    const source = classifyReferrer(v.referrer);
    referrerMap.set(source, (referrerMap.get(source) || 0) + 1);
  });
  const referrerBreakdown = Array.from(referrerMap.entries())
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count);

  // Country breakdown
  const countryMap = new Map<string, number>();
  views.forEach(v => {
    if (!v.country_code) return;
    countryMap.set(v.country_code, (countryMap.get(v.country_code) || 0) + 1);
  });
  const countryBreakdown = Array.from(countryMap.entries())
    .map(([country_code, count]) => ({ country_code, count }))
    .sort((a, b) => b.count - a.count);

  // Conversion funnel
  const totalSessions = uniqueSessions;
  const engagedSessions = sessionDepths.filter(d => d >= emailThreshold).length;
  const emailSessions = emails.length;

  const conversionFunnel: FunnelStep[] = [
    { label: 'Visitors', count: totalSessions, percentage: 100 },
    {
      label: `Engaged (${emailThreshold}+ pages)`,
      count: engagedSessions,
      percentage: totalSessions > 0 ? (engagedSessions / totalSessions) * 100 : 0,
    },
    {
      label: 'Email Captured',
      count: emailSessions,
      percentage: totalSessions > 0 ? (emailSessions / totalSessions) * 100 : 0,
    },
  ];

  return {
    dailyViews,
    totalViews: views.length,
    uniqueSessions,
    bounceRate,
    avgSessionDepth,
    topPages,
    referrerBreakdown,
    countryBreakdown,
    conversionFunnel,
  };
}

export function useToolViewStats(slug: string, days: number, emailThreshold = 3, excludeInternal = true) {
  return useQuery({
    queryKey: ['tool-view-stats', slug, days, excludeInternal],
    queryFn: async () => {
      const since = new Date();
      since.setDate(since.getDate() - days);
      const sinceISO = since.toISOString();

      let viewsQuery = supabase
        .from('tool_page_views')
        .select('*')
        .eq('tool_slug', slug)
        .gte('created_at', sinceISO)
        .order('created_at', { ascending: true });

      let emailsQuery = supabase
        .from('tool_email_captures')
        .select('*')
        .eq('tool_slug', slug)
        .gte('created_at', sinceISO)
        .order('created_at', { ascending: true });

      if (excludeInternal) {
        viewsQuery = viewsQuery.eq('is_internal', false);
        emailsQuery = emailsQuery.eq('is_internal', false);
      }

      const [viewsRes, emailsRes] = await Promise.all([viewsQuery, emailsQuery]);

      if (viewsRes.error) throw viewsRes.error;
      if (emailsRes.error) throw emailsRes.error;

      const views = viewsRes.data as unknown as PageView[];
      const emails = emailsRes.data as unknown as EmailCapture[];

      return aggregateViews(views, emails, emailThreshold);
    },
    staleTime: 2 * 60 * 1000,
    enabled: !!slug,
  });
}

export function useToolEmailCaptures(slug: string, excludeInternal = true) {
  return useQuery({
    queryKey: ['tool-email-captures', slug, excludeInternal],
    queryFn: async () => {
      let query = supabase
        .from('tool_email_captures')
        .select('*')
        .eq('tool_slug', slug)
        .order('created_at', { ascending: false });

      if (excludeInternal) {
        query = query.eq('is_internal', false);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as unknown as EmailCapture[];
    },
    enabled: !!slug,
  });
}

export interface ABVariantStats {
  variantId: string | null;
  label: string;
  views: number;
  uniqueSessions: number;
  emailsCaptured: number;
  captureRate: number;
  bounceRate: number;
  avgDepth: number;
}

export interface ABTestResults {
  variantA: ABVariantStats;
  variantB: ABVariantStats;
  lift: number; // % lift of B over A for capture rate
  isSignificant: boolean;
  samplesNeeded: number;
}

function computeABStats(
  views: PageView[],
  emails: EmailCapture[],
  variantId: string | null,
  label: string
): ABVariantStats {
  const filtered = variantId
    ? views.filter(v => v.ab_variant_id === variantId)
    : views.filter(v => !v.ab_variant_id);
  const filteredEmails = variantId
    ? emails.filter(e => e.ab_variant_id === variantId)
    : emails.filter(e => !e.ab_variant_id);

  const sessions = new Set(filtered.map(v => v.session_id).filter(Boolean));
  const uniqueSessions = sessions.size;

  const sessionDepthMap = new Map<string, number>();
  filtered.forEach(v => {
    if (!v.session_id) return;
    sessionDepthMap.set(v.session_id, Math.max(sessionDepthMap.get(v.session_id) || 0, v.page_number_in_session));
  });
  const depths = Array.from(sessionDepthMap.values());
  const bounceCount = depths.filter(d => d === 1).length;

  return {
    variantId,
    label,
    views: filtered.length,
    uniqueSessions,
    emailsCaptured: filteredEmails.length,
    captureRate: uniqueSessions > 0 ? (filteredEmails.length / uniqueSessions) * 100 : 0,
    bounceRate: depths.length > 0 ? (bounceCount / depths.length) * 100 : 0,
    avgDepth: depths.length > 0 ? depths.reduce((s, d) => s + d, 0) / depths.length : 0,
  };
}

export function useToolABResults(testId: string, toolSlug: string) {
  return useQuery({
    queryKey: ['tool-ab-results', testId],
    queryFn: async () => {
      // Fetch all views and emails for this tool that have an ab_variant_id
      const [viewsRes, emailsRes] = await Promise.all([
        supabase
          .from('tool_page_views' )
          .select('*')
          .eq('tool_slug', toolSlug)
          .not('ab_variant_id', 'is', null),
        supabase
          .from('tool_email_captures' )
          .select('*')
          .eq('tool_slug', toolSlug)
          .not('ab_variant_id', 'is', null),
      ]);

      if (viewsRes.error) throw viewsRes.error;
      if (emailsRes.error) throw emailsRes.error;

      const views = viewsRes.data as unknown as PageView[];
      const emails = emailsRes.data as unknown as EmailCapture[];

      // Get distinct variant IDs
      const variantIds = [...new Set(views.map(v => v.ab_variant_id).filter(Boolean))];

      const variantA = computeABStats(views, emails, variantIds[0] || null, 'Variant A');
      const variantB = computeABStats(views, emails, variantIds[1] || null, 'Variant B');

      // Lift calculation
      const lift = variantA.captureRate > 0
        ? ((variantB.captureRate - variantA.captureRate) / variantA.captureRate) * 100
        : 0;

      // Simple z-test for proportions significance
      const nA = variantA.uniqueSessions;
      const nB = variantB.uniqueSessions;
      const pA = nA > 0 ? variantA.emailsCaptured / nA : 0;
      const pB = nB > 0 ? variantB.emailsCaptured / nB : 0;
      const pPool = (nA + nB) > 0 ? (variantA.emailsCaptured + variantB.emailsCaptured) / (nA + nB) : 0;
      const se = (nA > 0 && nB > 0) ? Math.sqrt(pPool * (1 - pPool) * (1 / nA + 1 / nB)) : 0;
      const z = se > 0 ? Math.abs(pB - pA) / se : 0;
      const isSignificant = z >= 1.96; // 95% confidence

      // Rough sample size needed (per variant) for 80% power, 5% significance
      const baseRate = pA > 0 ? pA : 0.05;
      const mde = 0.05; // 5% absolute minimum detectable effect
      const samplesNeeded = Math.ceil((2 * Math.pow(1.96 + 0.84, 2) * baseRate * (1 - baseRate)) / Math.pow(mde, 2));

      return {
        variantA,
        variantB,
        lift,
        isSignificant,
        samplesNeeded,
      } as ABTestResults;
    },
    enabled: !!testId && !!toolSlug,
    staleTime: 2 * 60 * 1000,
  });
}
