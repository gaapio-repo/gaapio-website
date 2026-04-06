import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Download, ChevronRight, FlaskConical, ExternalLink, EyeOff, Eye } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useToolViewStats, useToolEmailCaptures } from "@/hooks/useToolAnalytics";
import { useActiveABTest } from "@/hooks/useToolABTest";

interface ToolAnalyticsDashboardProps {
  toolSlug: string;
  toolName: string;
  onBack: () => void;
  onViewABTests: () => void;
}

const DATE_RANGE_OPTIONS = [
  { label: "7d", days: 7 },
  { label: "30d", days: 30 },
  { label: "90d", days: 90 },
] as const;

export function ToolAnalyticsDashboard({
  toolSlug,
  toolName,
  onBack,
  onViewABTests,
}: ToolAnalyticsDashboardProps) {
  const [days, setDays] = useState(30);
  const [excludeInternal, setExcludeInternal] = useState(true);
  const { data: stats, isLoading } = useToolViewStats(toolSlug, days, 3, excludeInternal);
  const { data: emailCaptures, isLoading: emailsLoading } =
    useToolEmailCaptures(toolSlug, excludeInternal);
  const { data: activeTest } = useActiveABTest(toolSlug);

  const handleExportCSV = () => {
    if (!emailCaptures?.length) return;
    const header = "email,page,date";
    const rows = emailCaptures.map(
      (e) =>
        `"${e.email}","${e.page_path ?? ""}","${new Date(e.created_at).toLocaleDateString()}"`
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${toolSlug}-email-captures.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-6 w-48" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-xl font-semibold">{toolName} Analytics</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {excludeInternal ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
            <Label htmlFor="exclude-internal" className="text-sm text-muted-foreground cursor-pointer whitespace-nowrap">
              {excludeInternal ? "Internal hidden" : "Showing all"}
            </Label>
            <Switch
              id="exclude-internal"
              checked={excludeInternal}
              onCheckedChange={setExcludeInternal}
            />
          </div>
          <div className="flex gap-1 bg-muted rounded-md p-1">
            {DATE_RANGE_OPTIONS.map((opt) => (
              <Button
                key={opt.days}
                variant={days === opt.days ? "default" : "ghost"}
                size="sm"
                onClick={() => setDays(opt.days)}
              >
                {opt.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Total Views", value: stats?.totalViews ?? 0 },
          { label: "Unique Sessions", value: stats?.uniqueSessions ?? 0 },
          {
            label: "Bounce Rate",
            value: stats ? `${stats.bounceRate.toFixed(1)}%` : "0%",
          },
          {
            label: "Avg Depth",
            value: stats ? stats.avgSessionDepth.toFixed(1) : "0",
          },
          { label: "Emails Captured", value: emailCaptures?.length ?? 0 },
        ].map((metric) => (
          <Card key={metric.label}>
            <CardContent className="pt-4 pb-3">
              <p className="text-xs text-muted-foreground">{metric.label}</p>
              <p className="text-2xl font-bold">{metric.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Daily Views Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Daily Views</CardTitle>
        </CardHeader>
        <CardContent>
          {stats?.dailyViews.length ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.dailyViews}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(d) =>
                    new Date(d + "T00:00:00").toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  className="text-xs"
                />
                <YAxis allowDecimals={false} className="text-xs" />
                <Tooltip
                  labelFormatter={(d) =>
                    new Date(d + "T00:00:00").toLocaleDateString()
                  }
                />
                <Bar dataKey="views" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-muted-foreground py-8 text-center">
              No view data for this period.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Conversion Funnel */}
      {stats?.conversionFunnel && stats.conversionFunnel.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {stats.conversionFunnel.map((step, i) => (
                <div key={step.label} className="flex items-center gap-2">
                  <div className="text-center rounded-lg border p-4 min-w-[140px]">
                    <p className="text-sm font-medium">{step.label}</p>
                    <p className="text-2xl font-bold">{step.count}</p>
                    <p className="text-xs text-muted-foreground">
                      {step.percentage.toFixed(1)}%
                    </p>
                  </div>
                  {i < stats.conversionFunnel.length - 1 && (
                    <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Two-Column: Top Pages + Referrers */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top Pages</CardTitle>
          </CardHeader>
          <CardContent>
            {stats?.topPages.length ? (
              <div className="space-y-2">
                {stats.topPages.map((p) => (
                  <div
                    key={p.page_path}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="truncate mr-2 text-muted-foreground">
                      {p.page_path}
                    </span>
                    <span className="font-medium tabular-nums">{p.views}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No page data.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Referrer Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            {stats?.referrerBreakdown.length ? (
              <div className="space-y-2">
                {stats.referrerBreakdown.map((r) => {
                  const max = stats.referrerBreakdown[0].count;
                  const pct = max > 0 ? (r.count / max) * 100 : 0;
                  return (
                    <div key={r.source} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="truncate mr-2">{r.source}</span>
                        <span className="font-medium tabular-nums">
                          {r.count}
                        </span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No referrer data.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Country Breakdown */}
      {stats?.countryBreakdown && stats.countryBreakdown.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Country Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-6 gap-y-2">
              {stats.countryBreakdown.slice(0, 10).map((c) => (
                <div
                  key={c.country_code}
                  className="flex items-center justify-between text-sm"
                >
                  <span>{c.country_code}</span>
                  <span className="font-medium tabular-nums">{c.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Email Captures */}
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">Email Captures</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            disabled={!emailCaptures?.length}
          >
            <Download className="h-4 w-4 mr-1" />
            Export CSV
          </Button>
        </CardHeader>
        <CardContent>
          {emailsLoading ? (
            <Skeleton className="h-32" />
          ) : emailCaptures?.length ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2 pl-4 pr-4 font-medium">Email</th>
                    <th className="pb-2 pr-4 font-medium">Page</th>
                    <th className="pb-2 pr-4 font-medium">Date</th>
                    <th className="pb-2 pr-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {emailCaptures.slice(0, 50).map((e) => (
                    <tr key={e.id} className="border-b last:border-0 hover:bg-muted/30">
                      <td className="py-2.5 pl-4 pr-4 font-medium">
                        {e.email}
                      </td>
                      <td className="py-2.5 pr-4 text-muted-foreground">
                        {e.page_path ?? "--"}
                      </td>
                      <td className="py-2.5 pr-4 text-muted-foreground whitespace-nowrap">
                        {new Date(e.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-2.5 pr-4">
                        <a
                          href={`mailto:${e.email}`}
                          className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition-colors whitespace-nowrap"
                        >
                          Send Email
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground py-4 text-center">
              No email captures yet.
            </p>
          )}
        </CardContent>
      </Card>

      {/* A/B Test Results Summary */}
      {activeTest && (
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <FlaskConical className="h-4 w-4" />
              Active A/B Test: {activeTest.test_name}
            </CardTitle>
            <Button variant="outline" size="sm" onClick={onViewABTests}>
              View Full Results
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Traffic split: {100 - activeTest.traffic_split}% / {activeTest.traffic_split}%
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
