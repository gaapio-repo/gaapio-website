import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HomepageCtaToggle } from "@/components/admin/HomepageCtaToggle";
import { supabase } from "@/integrations/supabase/client";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricData {
  current: number;
  previous: number;
  sparkline: { value: number }[];
}

export function AdminDashboard() {
  const [metrics, setMetrics] = useState<Record<string, MetricData | null>>({
    waitlist: null,
    contacts: null,
    users: null,
    companies: null,
  });
  const [recentActivity, setRecentActivity] = useState<{ type: string; label: string; time: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      setLoading(true);

      const now = new Date();
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

      // Fetch current totals
      const [waitlistRes, contactRes, userRes, companyRes] = await Promise.all([
        supabase.from("waitlist_submissions").select("*", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
        supabase.from("users").select("*", { count: "exact", head: true }),
        supabase.from("companies").select("*", { count: "exact", head: true }),
      ]);

      // Fetch last 7 days counts for sparklines
      const [waitlistWeek, contactWeek, userWeek, companyWeek] = await Promise.all([
        supabase.from("waitlist_submissions").select("created_at").gte("created_at", sevenDaysAgo.toISOString()),
        supabase.from("contact_submissions").select("created_at").gte("created_at", sevenDaysAgo.toISOString()),
        supabase.from("users").select("created_at").gte("created_at", sevenDaysAgo.toISOString()),
        supabase.from("companies").select("created_at").gte("created_at", sevenDaysAgo.toISOString()),
      ]);

      // Fetch previous 7 days counts for comparison
      const [waitlistPrev, contactPrev, userPrev, companyPrev] = await Promise.all([
        supabase.from("waitlist_submissions").select("*", { count: "exact", head: true })
          .gte("created_at", fourteenDaysAgo.toISOString()).lt("created_at", sevenDaysAgo.toISOString()),
        supabase.from("contact_submissions").select("*", { count: "exact", head: true })
          .gte("created_at", fourteenDaysAgo.toISOString()).lt("created_at", sevenDaysAgo.toISOString()),
        supabase.from("users").select("*", { count: "exact", head: true })
          .gte("created_at", fourteenDaysAgo.toISOString()).lt("created_at", sevenDaysAgo.toISOString()),
        supabase.from("companies").select("*", { count: "exact", head: true })
          .gte("created_at", fourteenDaysAgo.toISOString()).lt("created_at", sevenDaysAgo.toISOString()),
      ]);

      const buildSparkline = (rows: { created_at: string }[] | null) => {
        const data = Array.from({ length: 7 }, (_, i) => {
          const day = new Date(now.getTime() - (6 - i) * 24 * 60 * 60 * 1000);
          const dayStr = day.toISOString().split("T")[0];
          const count = (rows || []).filter(r => r.created_at?.startsWith(dayStr)).length;
          return { value: count };
        });
        return data;
      };

      setMetrics({
        waitlist: {
          current: waitlistRes.count ?? 0,
          previous: waitlistPrev.count ?? 0,
          sparkline: buildSparkline(waitlistWeek.data),
        },
        contacts: {
          current: contactRes.count ?? 0,
          previous: contactPrev.count ?? 0,
          sparkline: buildSparkline(contactWeek.data),
        },
        users: {
          current: userRes.count ?? 0,
          previous: userPrev.count ?? 0,
          sparkline: buildSparkline(userWeek.data),
        },
        companies: {
          current: companyRes.count ?? 0,
          previous: companyPrev.count ?? 0,
          sparkline: buildSparkline(companyWeek.data),
        },
      });

      // Fetch recent activity
      const [recentUsers, recentContacts] = await Promise.all([
        supabase.from("users").select("email, created_at").order("created_at", { ascending: false }).limit(3),
        supabase.from("contact_submissions").select("email, created_at").order("created_at", { ascending: false }).limit(3),
      ]);

      const activity: { type: string; label: string; time: string; date: Date }[] = [];
      (recentUsers.data || []).forEach(u => {
        activity.push({ type: "signup", label: `${u.email} signed up`, time: u.created_at, date: new Date(u.created_at) });
      });
      (recentContacts.data || []).forEach(c => {
        activity.push({ type: "contact", label: `${c.email} submitted contact form`, time: c.created_at, date: new Date(c.created_at) });
      });

      activity.sort((a, b) => b.date.getTime() - a.date.getTime());
      setRecentActivity(activity.slice(0, 5).map(a => ({
        type: a.type,
        label: a.label,
        time: formatRelativeTime(a.date),
      })));

      setLoading(false);
    }

    fetchMetrics();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Waitlist" data={metrics.waitlist} loading={loading} color="#3b82f6" />
        <MetricCard title="Contacts" data={metrics.contacts} loading={loading} color="#8b5cf6" />
        <MetricCard title="Users" data={metrics.users} loading={loading} color="#10b981" />
        <MetricCard title="Companies" data={metrics.companies} loading={loading} color="#f59e0b" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-muted/70 border-0 shadow-inner">
          <CardHeader>
            <CardTitle>Homepage CTA</CardTitle>
            <CardDescription>Toggle call-to-action buttons on the homepage</CardDescription>
          </CardHeader>
          <CardContent>
            <HomepageCtaToggle />
          </CardContent>
        </Card>

        <Card className="bg-muted/70 border-0 shadow-inner">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest signups and submissions</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-10 bg-muted animate-pulse rounded" />
                ))}
              </div>
            ) : recentActivity.length === 0 ? (
              <p className="text-muted-foreground text-sm">No recent activity</p>
            ) : (
              <div className="space-y-3">
                {recentActivity.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full shrink-0 ${item.type === "signup" ? "bg-green-500" : "bg-blue-500"}`} />
                      <span className="text-sm truncate max-w-[280px]">{item.label}</span>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0 ml-2">{item.time}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ title, data, loading, color }: {
  title: string;
  data: MetricData | null;
  loading: boolean;
  color: string;
}) {
  if (loading || !data) {
    return (
      <Card className="bg-muted/70 border-0 shadow-inner">
        <CardContent className="p-5">
          <p className="text-sm text-muted-foreground">{title}</p>
          <div className="h-8 w-20 bg-muted animate-pulse rounded mt-2" />
          <div className="h-10 bg-muted animate-pulse rounded mt-3" />
        </CardContent>
      </Card>
    );
  }

  const weekCurrent = data.sparkline.reduce((sum, d) => sum + d.value, 0);
  const weekChange = weekCurrent - data.previous;
  const hasActivity = data.sparkline.some(d => d.value > 0);

  return (
    <Card className="bg-muted/70 border-0 shadow-inner">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{title}</p>
          {weekChange > 0 && (
            <span className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-0.5" />
              +{weekChange}
            </span>
          )}
          {weekChange < 0 && (
            <span className="flex items-center text-xs text-red-500">
              <TrendingDown className="h-3 w-3 mr-0.5" />
              {weekChange}
            </span>
          )}
          {weekChange === 0 && (
            <span className="flex items-center text-xs text-muted-foreground">
              <Minus className="h-3 w-3 mr-0.5" />
              0
            </span>
          )}
        </div>
        <p className="text-3xl font-bold mt-1">{data.current.toLocaleString()}</p>
        {hasActivity && (
          <div className="h-10 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.sparkline}>
                <defs>
                  <linearGradient id={`grad-${title}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={color}
                  strokeWidth={2}
                  fill={`url(#grad-${title})`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}
