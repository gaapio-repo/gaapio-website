import { CardDescription, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wrench, ExternalLink, BarChart3, FlaskConical, X, Plus } from "lucide-react";
import { useState } from "react";
import type { ToolSetting } from "@/hooks/useToolSettings";

interface ToolCardProps {
  tool: ToolSetting;
  stats?: { totalViews: number; uniqueSessions: number; emailsCaptured: number; bounceRate: number };
  hasActiveTest?: boolean;
  onUpdate: (updates: Partial<ToolSetting> & { id: string }) => void;
  onViewAnalytics: () => void;
  onViewABTests: () => void;
  updating?: boolean;
}

function InternalDomainsEditor({
  domains,
  onSave,
  disabled,
}: {
  domains: string[];
  onSave: (domains: string[]) => void;
  disabled?: boolean;
}) {
  const [newDomain, setNewDomain] = useState("");

  const handleAdd = () => {
    const domain = newDomain.trim().toLowerCase().replace(/^@/, "");
    if (!domain || domains.includes(domain)) return;
    onSave([...domains, domain]);
    setNewDomain("");
  };

  const handleRemove = (domain: string) => {
    onSave(domains.filter((d) => d !== domain));
  };

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium">Internal Domains</h4>
      <p className="text-xs text-muted-foreground">
        Traffic from these email domains will be flagged as internal and excluded from analytics by default.
      </p>
      <div className="flex flex-wrap gap-2">
        {domains.map((domain) => (
          <Badge key={domain} variant="secondary" className="gap-1 pr-1">
            @{domain}
            <button
              onClick={() => handleRemove(domain)}
              className="ml-0.5 rounded-full hover:bg-muted-foreground/20 p-0.5"
              disabled={disabled}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="domain.com"
          value={newDomain}
          onChange={(e) => setNewDomain(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAdd())}
          className="flex-1 bg-muted/70 border-0 shadow-sm"
          disabled={disabled}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={handleAdd}
          disabled={disabled || !newDomain.trim()}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>
    </div>
  );
}

export function ToolCard({
  tool,
  stats,
  hasActiveTest,
  onUpdate,
  onViewAnalytics,
  onViewABTests,
  updating,
}: ToolCardProps) {
  return (
    <div className="rounded-lg bg-muted/70 shadow-inner hover:shadow-md transition-shadow duration-200 p-6 space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-lg">{tool.tool_name}</CardTitle>
          </div>
          <Switch
            checked={tool.enabled}
            onCheckedChange={(checked) =>
              onUpdate({ id: tool.id, enabled: checked })
            }
            disabled={updating}
          />
        </div>
        {tool.description && (
          <CardDescription>{tool.description}</CardDescription>
        )}
      </div>

      {/* Settings */}
      <div className="space-y-4 border-b pb-6">
        <h4 className="text-sm font-medium">Settings</h4>

          <div className="flex items-center justify-between">
            <Label htmlFor={`require-email-${tool.id}`}>Require Email</Label>
            <Switch
              id={`require-email-${tool.id}`}
              checked={tool.require_email}
              onCheckedChange={(checked) =>
                onUpdate({ id: tool.id, require_email: checked })
              }
              disabled={updating}
            />
          </div>

          {tool.require_email && (
            <>
              <div className="flex items-center justify-between pl-4 border-l-2 border-muted">
                <Label htmlFor={`hard-gate-${tool.id}`}>
                  Hard Gate (no skip)
                </Label>
                <Switch
                  id={`hard-gate-${tool.id}`}
                  checked={tool.email_gate_hard}
                  onCheckedChange={(checked) =>
                    onUpdate({ id: tool.id, email_gate_hard: checked })
                  }
                  disabled={updating}
                />
              </div>

              <div className="flex items-center justify-between pl-4 border-l-2 border-muted">
                <Label htmlFor={`threshold-${tool.id}`}>Page Threshold</Label>
                <Input
                  id={`threshold-${tool.id}`}
                  type="number"
                  min={1}
                  max={20}
                  value={tool.email_gate_page_threshold}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    if (val >= 1 && val <= 20) {
                      onUpdate({ id: tool.id, email_gate_page_threshold: val });
                    }
                  }}
                  className="w-20"
                  disabled={updating}
                />
              </div>
            </>
          )}
        </div>

      {/* Internal Domains */}
      <div className="border-b pb-6">
        <InternalDomainsEditor
          domains={tool.internal_domains ?? []}
          onSave={(domains) => onUpdate({ id: tool.id, internal_domains: domains } as any)}
          disabled={updating}
        />
      </div>

      {/* Quick Stats */}
      <div className="border-b pb-6">
          <h4 className="text-sm font-medium mb-3">Quick Stats (7d)</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Total Views</p>
              <p className="text-lg font-semibold">
                {stats?.totalViews ?? "--"}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Unique Sessions</p>
              <p className="text-lg font-semibold">
                {stats?.uniqueSessions ?? "--"}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Emails Captured</p>
              <p className="text-lg font-semibold">
                {stats?.emailsCaptured ?? "--"}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Bounce Rate</p>
              <p className="text-lg font-semibold">
                {stats ? `${stats.bounceRate.toFixed(1)}%` : "--"}
              </p>
            </div>
          </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={onViewAnalytics}>
          <BarChart3 className="h-4 w-4 mr-1" />
          View Analytics
        </Button>
        <Button variant="outline" size="sm" onClick={onViewABTests}>
          <FlaskConical className="h-4 w-4 mr-1" />
          A/B Tests
          {hasActiveTest && (
            <Badge variant="default" className="ml-1.5 px-1.5 py-0 text-[10px]">
              Live
            </Badge>
          )}
        </Button>
        {tool.base_route && (
          <Button variant="outline" size="sm" asChild>
            <a href={tool.base_route} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-1" />
              Open Tool
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
