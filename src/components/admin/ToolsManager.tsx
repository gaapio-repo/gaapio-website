import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToolSettings, useUpdateToolSetting } from "@/hooks/useToolSettings";
import { useToolViewStats } from "@/hooks/useToolAnalytics";
import { useActiveABTest } from "@/hooks/useToolABTest";
import { ToolCard } from "@/components/admin/ToolCard";
import { ToolAnalyticsDashboard } from "@/components/admin/ToolAnalyticsDashboard";
import { ABTestManager } from "@/components/admin/ABTestManager";

type View = "overview" | "analytics" | "ab-test";

function ToolCardWithData({
  tool,
  onViewAnalytics,
  onViewABTests,
}: {
  tool: ReturnType<typeof useToolSettings>["data"] extends (infer T)[] ? T : never;
  onViewAnalytics: () => void;
  onViewABTests: () => void;
}) {
  const { data: stats } = useToolViewStats(tool.tool_slug, 7);
  const { data: activeTest } = useActiveABTest(tool.tool_slug);
  const updateMutation = useUpdateToolSetting();

  return (
    <ToolCard
      tool={tool}
      stats={
        stats
          ? {
              totalViews: stats.totalViews,
              uniqueSessions: stats.uniqueSessions,
              emailsCaptured: stats.conversionFunnel[2]?.count ?? 0,
              bounceRate: stats.bounceRate,
            }
          : undefined
      }
      hasActiveTest={!!activeTest}
      onUpdate={(updates) => updateMutation.mutate(updates)}
      onViewAnalytics={onViewAnalytics}
      onViewABTests={onViewABTests}
      updating={updateMutation.isPending}
    />
  );
}

export function ToolsManager() {
  const { data: tools, isLoading } = useToolSettings();
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [view, setView] = useState<View>("overview");

  const selectedToolData = tools?.find((t) => t.tool_slug === selectedTool);

  const goToOverview = () => {
    setView("overview");
    setSelectedTool(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Tools Management</h2>
          <p className="text-sm text-muted-foreground">
            Configure tools, view analytics, and run A/B tests.
          </p>
        </div>
        <div className="grid gap-6">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </div>
    );
  }

  if (view === "analytics" && selectedTool && selectedToolData) {
    return (
      <ToolAnalyticsDashboard
        toolSlug={selectedTool}
        toolName={selectedToolData.tool_name}
        onBack={goToOverview}
        onViewABTests={() => setView("ab-test")}
      />
    );
  }

  if (view === "ab-test" && selectedTool && selectedToolData) {
    return (
      <ABTestManager
        toolSlug={selectedTool}
        toolName={selectedToolData.tool_name}
        onBack={goToOverview}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Tools Management</h2>
        <p className="text-sm text-muted-foreground">
          Configure tools, view analytics, and run A/B tests.
        </p>
      </div>

      {tools && tools.length > 0 ? (
        <div className="grid gap-6">
          {tools.map((tool) => (
            <ToolCardWithData
              key={tool.id}
              tool={tool}
              onViewAnalytics={() => {
                setSelectedTool(tool.tool_slug);
                setView("analytics");
              }}
              onViewABTests={() => {
                setSelectedTool(tool.tool_slug);
                setView("ab-test");
              }}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground text-center py-12">
          No tools configured yet.
        </p>
      )}
    </div>
  );
}
