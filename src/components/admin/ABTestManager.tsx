import { useState, useEffect } from "react";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Plus, Pencil, Eye, ChevronDown, ChevronUp, Trophy } from "lucide-react";
import {
  useToolABTests,
  useActiveABTest,
  useCreateABTest,
  useUpdateABTest,
  type ABTest,
} from "@/hooks/useToolABTest";
import { useToolABResults, type ABTestResults } from "@/hooks/useToolAnalytics";

interface ABTestManagerProps {
  toolSlug: string;
  toolName: string;
  compact?: boolean;
  onBack?: () => void;
}

const STATUS_COLORS: Record<ABTest["status"], string> = {
  draft: "bg-muted text-muted-foreground border-border",
  running: "bg-green-50 text-green-700 border-green-200",
  paused: "bg-yellow-50 text-yellow-700 border-yellow-200",
  completed: "bg-blue-50 text-blue-700 border-blue-200",
};

const STATUS_DOT: Record<ABTest["status"], string> = {
  draft: "bg-muted-foreground",
  running: "bg-green-500 animate-pulse",
  paused: "bg-yellow-500",
  completed: "bg-blue-500",
};

// ─── Compact mode (embedded in analytics dashboard) ─────────────────
function CompactResults({
  results,
  testName,
}: {
  results: ABTestResults;
  testName: string;
}) {
  return (
    <div className="rounded-lg bg-muted/70 shadow-sm p-4 space-y-2">
      <p className="text-sm font-medium">{testName}</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Variant A</p>
            <p className="font-medium">
              {results.variantA.captureRate.toFixed(1)}% capture
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Variant B</p>
            <p className="font-medium">
              {results.variantB.captureRate.toFixed(1)}% capture
            </p>
          </div>
        </div>
        <Badge
          variant="outline"
          className={
            results.isSignificant
              ? "border-green-300 text-green-700"
              : "border-amber-300 text-amber-700"
          }
        >
          {results.isSignificant
            ? "Significant (95%)"
            : `Need ~${results.samplesNeeded} more sessions`}
        </Badge>
    </div>
  );
}

// ─── Results panel for any test ─────────────────────────────────────
function TestResults({
  testId,
  toolSlug,
  test,
}: {
  testId: string;
  toolSlug: string;
  test: ABTest;
}) {
  const { data: results, isLoading } = useToolABResults(testId, toolSlug);

  if (isLoading) return <Skeleton className="h-48" />;
  if (!results) return (
    <div className="text-center py-8 text-muted-foreground text-sm">
      No data collected yet. Results will appear once visitors are assigned to variants.
    </div>
  );

  const rows: { label: string; a: string; b: string; aNum: number; bNum: number; higherIsBetter: boolean }[] = [
    {
      label: "Views",
      a: results.variantA.views.toLocaleString(),
      b: results.variantB.views.toLocaleString(),
      aNum: results.variantA.views,
      bNum: results.variantB.views,
      higherIsBetter: true,
    },
    {
      label: "Unique Sessions",
      a: results.variantA.uniqueSessions.toLocaleString(),
      b: results.variantB.uniqueSessions.toLocaleString(),
      aNum: results.variantA.uniqueSessions,
      bNum: results.variantB.uniqueSessions,
      higherIsBetter: true,
    },
    {
      label: "Email Capture Rate",
      a: `${results.variantA.captureRate.toFixed(1)}%`,
      b: `${results.variantB.captureRate.toFixed(1)}%`,
      aNum: results.variantA.captureRate,
      bNum: results.variantB.captureRate,
      higherIsBetter: true,
    },
    {
      label: "Emails Captured",
      a: results.variantA.emailsCaptured.toLocaleString(),
      b: results.variantB.emailsCaptured.toLocaleString(),
      aNum: results.variantA.emailsCaptured,
      bNum: results.variantB.emailsCaptured,
      higherIsBetter: true,
    },
    {
      label: "Bounce Rate",
      a: `${results.variantA.bounceRate.toFixed(1)}%`,
      b: `${results.variantB.bounceRate.toFixed(1)}%`,
      aNum: results.variantA.bounceRate,
      bNum: results.variantB.bounceRate,
      higherIsBetter: false,
    },
    {
      label: "Avg Session Depth",
      a: results.variantA.avgDepth.toFixed(1),
      b: results.variantB.avgDepth.toFixed(1),
      aNum: results.variantA.avgDepth,
      bNum: results.variantB.avgDepth,
      higherIsBetter: true,
    },
  ];

  const getHighlight = (aNum: number, bNum: number, side: "a" | "b", higherIsBetter: boolean) => {
    if (aNum === bNum) return "";
    const aWins = higherIsBetter ? aNum > bNum : aNum < bNum;
    if (side === "a" && aWins) return "text-green-600 font-semibold";
    if (side === "b" && !aWins) return "text-green-600 font-semibold";
    return "";
  };

  const variantAConfig = test.variant_a_config as Record<string, any>;
  const variantBConfig = test.variant_b_config as Record<string, any>;

  return (
    <div className="space-y-4">
      {/* Variant config summary */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-lg bg-muted/70 shadow-sm p-4 space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-3 w-3 rounded-full bg-blue-500" />
            <span className="font-medium text-sm">Variant A</span>
            <span className="text-xs text-muted-foreground">({100 - test.traffic_split}% traffic)</span>
          </div>
          <p className="text-xs text-muted-foreground">Threshold: {variantAConfig.email_gate_page_threshold ?? variantAConfig.threshold ?? "default"} pages</p>
          <p className="text-xs text-muted-foreground">Gate: {variantAConfig.email_gate_hard ? "Hard" : "Soft"}</p>
          {variantAConfig.email_gate_copy && (
            <p className="text-xs text-muted-foreground italic mt-1">"{variantAConfig.email_gate_copy}"</p>
          )}
          {variantAConfig.copy && (
            <p className="text-xs text-muted-foreground italic mt-1">"{variantAConfig.copy}"</p>
          )}
        </div>
        <div className="rounded-lg bg-muted/70 shadow-sm p-4 space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-3 w-3 rounded-full bg-purple-500" />
            <span className="font-medium text-sm">Variant B</span>
            <span className="text-xs text-muted-foreground">({test.traffic_split}% traffic)</span>
          </div>
          <p className="text-xs text-muted-foreground">Threshold: {variantBConfig.email_gate_page_threshold ?? variantBConfig.threshold ?? "default"} pages</p>
          <p className="text-xs text-muted-foreground">Gate: {variantBConfig.email_gate_hard ? "Hard" : "Soft"}</p>
          {variantBConfig.email_gate_copy && (
            <p className="text-xs text-muted-foreground italic mt-1">"{variantBConfig.email_gate_copy}"</p>
          )}
          {variantBConfig.copy && (
            <p className="text-xs text-muted-foreground italic mt-1">"{variantBConfig.copy}"</p>
          )}
        </div>
      </div>

      {/* Results table */}
      <div className="overflow-x-auto rounded-lg bg-muted/70 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Metric</th>
              <th className="py-3 px-4 text-left font-medium">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                  Variant A
                </div>
              </th>
              <th className="py-3 px-4 text-left font-medium">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-purple-500" />
                  Variant B
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-b last:border-0 hover:bg-muted/30">
                <td className="py-2.5 px-4 text-muted-foreground">{r.label}</td>
                <td className={`py-2.5 px-4 ${getHighlight(r.aNum, r.bNum, "a", r.higherIsBetter)}`}>
                  {r.a}
                </td>
                <td className={`py-2.5 px-4 ${getHighlight(r.aNum, r.bNum, "b", r.higherIsBetter)}`}>
                  {r.b}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Lift + significance */}
      <div className="flex flex-wrap items-center gap-3 px-1">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Lift (B vs A):</span>
          <span className={`font-semibold ${results.lift >= 0 ? "text-green-600" : "text-red-600"}`}>
            {results.lift >= 0 ? "+" : ""}{results.lift.toFixed(1)}%
          </span>
        </div>
        <Badge
          variant="outline"
          className={
            results.isSignificant
              ? "border-green-300 text-green-700 bg-green-50"
              : "border-amber-300 text-amber-700 bg-amber-50"
          }
        >
          {results.isSignificant
            ? "Statistically Significant (95%)"
            : `Need ~${results.samplesNeeded.toLocaleString()} more sessions`}
        </Badge>
      </div>
    </div>
  );
}

// ─── Create / Edit form ─────────────────────────────────────────────
interface TestFormProps {
  initialValues?: ABTest | null;
  onSave: (values: {
    test_name: string;
    traffic_split: number;
    variant_a_config: Record<string, any>;
    variant_b_config: Record<string, any>;
    status: ABTest["status"];
  }) => void;
  onCancel: () => void;
  saving?: boolean;
  isEdit?: boolean;
}

function TestForm({ initialValues, onSave, onCancel, saving, isEdit }: TestFormProps) {
  const [formName, setFormName] = useState(initialValues?.test_name ?? "");
  const [formSplit, setFormSplit] = useState(initialValues?.traffic_split ?? 50);

  const aConfig = (initialValues?.variant_a_config ?? {}) as Record<string, any>;
  const bConfig = (initialValues?.variant_b_config ?? {}) as Record<string, any>;

  const [variantAHard, setVariantAHard] = useState(aConfig.email_gate_hard ?? false);
  const [variantAThreshold, setVariantAThreshold] = useState(aConfig.email_gate_page_threshold ?? aConfig.threshold ?? 3);
  const [variantACopy, setVariantACopy] = useState(aConfig.email_gate_copy ?? aConfig.copy ?? "");
  const [variantBHard, setVariantBHard] = useState(bConfig.email_gate_hard ?? false);
  const [variantBThreshold, setVariantBThreshold] = useState(bConfig.email_gate_page_threshold ?? bConfig.threshold ?? 3);
  const [variantBCopy, setVariantBCopy] = useState(bConfig.email_gate_copy ?? bConfig.copy ?? "");

  const buildPayload = (status: ABTest["status"]) => ({
    test_name: formName.trim(),
    traffic_split: formSplit,
    variant_a_config: {
      email_gate_hard: variantAHard,
      email_gate_page_threshold: variantAThreshold,
      email_gate_copy: variantACopy || undefined,
    },
    variant_b_config: {
      email_gate_hard: variantBHard,
      email_gate_page_threshold: variantBThreshold,
      email_gate_copy: variantBCopy || undefined,
    },
    status,
  });

  return (
    <div className="rounded-lg bg-muted/70 shadow-sm p-6 space-y-6">
      <div>
        <CardTitle className="text-base">{isEdit ? "Edit A/B Test" : "New A/B Test"}</CardTitle>
        <CardDescription>
          {isEdit
            ? "Update the test configuration. Changes to variants won't affect already-assigned visitors."
            : "Configure two variants of your email gate to test which performs better."}
        </CardDescription>
      </div>
        <div className="space-y-2">
          <Label>Test Name</Label>
          <Input
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder="e.g. Early gate (2 pages) vs late gate (5 pages)"
          />
        </div>

        <div className="space-y-2">
          <Label>Traffic Split</Label>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm min-w-[80px]">
              <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
              A: {100 - formSplit}%
            </div>
            <input
              type="range"
              min={10}
              max={90}
              value={formSplit}
              onChange={(e) => setFormSplit(Number(e.target.value))}
              className="flex-1"
            />
            <div className="flex items-center gap-2 text-sm min-w-[80px]">
              <div className="h-2.5 w-2.5 rounded-full bg-purple-500" />
              B: {formSplit}%
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Variant A */}
          <div className="space-y-4 rounded-lg bg-blue-50/50 shadow-sm p-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-500" />
              <h4 className="font-medium">Variant A</h4>
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm">Hard Gate (no skip)</Label>
              <Switch checked={variantAHard} onCheckedChange={setVariantAHard} />
            </div>
            <div className="space-y-1">
              <Label className="text-sm">Page Threshold</Label>
              <Input
                type="number"
                min={1}
                max={20}
                value={variantAThreshold}
                onChange={(e) => setVariantAThreshold(parseInt(e.target.value, 10) || 1)}
              />
              <p className="text-xs text-muted-foreground">Gate shows after this many pages viewed</p>
            </div>
            <div className="space-y-1">
              <Label className="text-sm">Gate Copy</Label>
              <textarea
                className="w-full rounded-md bg-muted/70 border-0 shadow-sm px-3 py-2 text-sm min-h-[80px] resize-y focus:outline-none focus:ring-2 focus:ring-ring"
                value={variantACopy}
                onChange={(e) => setVariantACopy(e.target.value)}
                placeholder="Custom CTA copy (leave blank for default)"
              />
            </div>
          </div>

          {/* Variant B */}
          <div className="space-y-4 rounded-lg bg-purple-50/50 shadow-sm p-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-purple-500" />
              <h4 className="font-medium">Variant B</h4>
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm">Hard Gate (no skip)</Label>
              <Switch checked={variantBHard} onCheckedChange={setVariantBHard} />
            </div>
            <div className="space-y-1">
              <Label className="text-sm">Page Threshold</Label>
              <Input
                type="number"
                min={1}
                max={20}
                value={variantBThreshold}
                onChange={(e) => setVariantBThreshold(parseInt(e.target.value, 10) || 1)}
              />
              <p className="text-xs text-muted-foreground">Gate shows after this many pages viewed</p>
            </div>
            <div className="space-y-1">
              <Label className="text-sm">Gate Copy</Label>
              <textarea
                className="w-full rounded-md bg-muted/70 border-0 shadow-sm px-3 py-2 text-sm min-h-[80px] resize-y focus:outline-none focus:ring-2 focus:ring-ring"
                value={variantBCopy}
                onChange={(e) => setVariantBCopy(e.target.value)}
                placeholder="Custom CTA copy (leave blank for default)"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-2 border-t">
          {isEdit ? (
            <Button
              onClick={() => onSave(buildPayload(initialValues?.status ?? "draft"))}
              disabled={!formName.trim() || saving}
            >
              Save Changes
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => onSave(buildPayload("draft"))}
                disabled={!formName.trim() || saving}
              >
                Save as Draft
              </Button>
              <Button
                onClick={() => onSave(buildPayload("running"))}
                disabled={!formName.trim() || saving}
              >
                Save & Start Test
              </Button>
            </>
          )}
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        </div>
    </div>
  );
}

// ─── Single test row (expandable) ───────────────────────────────────
function TestRow({
  test,
  toolSlug,
  onEdit,
  onStatusChange,
  onDeclareWinner,
  updating,
}: {
  test: ABTest;
  toolSlug: string;
  onEdit: (test: ABTest) => void;
  onStatusChange: (test: ABTest, status: ABTest["status"]) => void;
  onDeclareWinner: (testId: string, winner: string) => void;
  updating: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [selectedWinner, setSelectedWinner] = useState("");

  const canStart = test.status === "draft" || test.status === "paused";
  const canPause = test.status === "running";
  const canEnd = test.status === "running";
  const canEdit = test.status === "draft" || test.status === "paused";
  const canDeclareWinner = test.status === "completed" && !test.winner;
  const hasResults = test.status !== "draft";

  return (
    <div className="rounded-lg bg-muted/70 shadow-inner hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* Row header */}
      <div
        className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-muted/50 transition-colors ${expanded ? "border-b" : ""}`}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium truncate">{test.test_name}</span>
            {test.winner && (
              <Badge variant="outline" className="border-green-300 text-green-700 bg-green-50 shrink-0">
                <Trophy className="h-3 w-3 mr-1" />
                Winner: Variant {test.winner.toUpperCase()}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
            <span>Created {new Date(test.created_at).toLocaleDateString()}</span>
            {test.started_at && <span>Started {new Date(test.started_at).toLocaleDateString()}</span>}
            {test.ended_at && <span>Ended {new Date(test.ended_at).toLocaleDateString()}</span>}
            <span>Split: {100 - test.traffic_split}/{test.traffic_split}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Status badge */}
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium border ${STATUS_COLORS[test.status]}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[test.status]}`} />
            {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
          </span>

          {/* Action buttons */}
          <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
            {canEdit && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(test)} title="Edit test">
                <Pencil className="h-3.5 w-3.5" />
              </Button>
            )}
            {canStart && (
              <Button variant="outline" size="sm" className="h-8" onClick={() => onStatusChange(test, "running")} disabled={updating}>
                Start
              </Button>
            )}
            {canPause && (
              <Button variant="outline" size="sm" className="h-8" onClick={() => onStatusChange(test, "paused")} disabled={updating}>
                Pause
              </Button>
            )}
            {canEnd && (
              <Button variant="outline" size="sm" className="h-8 text-red-600 hover:text-red-700" onClick={() => onStatusChange(test, "completed")} disabled={updating}>
                End Test
              </Button>
            )}
          </div>

          {/* Expand chevron */}
          {expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="p-4 bg-muted/10 space-y-4">
          {hasResults ? (
            <TestResults testId={test.id} toolSlug={toolSlug} test={test} />
          ) : (
            <div className="text-center py-6 text-muted-foreground text-sm">
              Start the test to begin collecting data. Results will appear here once visitors are assigned to variants.
            </div>
          )}

          {/* Declare winner controls */}
          {canDeclareWinner && (
            <div className="flex items-center gap-3 pt-4 border-t" onClick={(e) => e.stopPropagation()}>
              <span className="text-sm font-medium">Declare Winner:</span>
              <Select value={selectedWinner} onValueChange={setSelectedWinner}>
                <SelectTrigger className="w-32 h-8">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a">Variant A</SelectItem>
                  <SelectItem value="b">Variant B</SelectItem>
                </SelectContent>
              </Select>
              <Button
                size="sm"
                onClick={() => { onDeclareWinner(test.id, selectedWinner); setSelectedWinner(""); }}
                disabled={!selectedWinner || updating}
              >
                <Trophy className="h-3.5 w-3.5 mr-1" />
                Promote to Settings
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────
export function ABTestManager({
  toolSlug,
  toolName,
  compact,
  onBack,
}: ABTestManagerProps) {
  const { data: tests, isLoading } = useToolABTests(toolSlug);
  const { data: activeTest } = useActiveABTest(toolSlug);
  const { data: activeResults } = useToolABResults(activeTest?.id, toolSlug);
  const createTest = useCreateABTest();
  const updateTest = useUpdateABTest();

  const [showForm, setShowForm] = useState(false);
  const [editingTest, setEditingTest] = useState<ABTest | null>(null);

  // Compact mode for embedding in analytics dashboard
  if (compact) {
    if (!activeTest) return <p className="text-sm text-muted-foreground">No active A/B test.</p>;
    if (activeResults) return <CompactResults results={activeResults} testName={activeTest.test_name} />;
    return <Skeleton className="h-24" />;
  }

  const handleCreate = (values: {
    test_name: string;
    traffic_split: number;
    variant_a_config: Record<string, any>;
    variant_b_config: Record<string, any>;
    status: ABTest["status"];
  }) => {
    createTest.mutate(
      { tool_slug: toolSlug, ...values },
      { onSuccess: () => { setShowForm(false); } }
    );
  };

  const handleEdit = (values: {
    test_name: string;
    traffic_split: number;
    variant_a_config: Record<string, any>;
    variant_b_config: Record<string, any>;
    status: ABTest["status"];
  }) => {
    if (!editingTest) return;
    updateTest.mutate(
      { id: editingTest.id, ...values },
      { onSuccess: () => { setEditingTest(null); } }
    );
  };

  const handleStatusChange = (test: ABTest, newStatus: ABTest["status"]) => {
    const updates: Partial<ABTest> & { id: string } = { id: test.id, status: newStatus };
    if (newStatus === "running" && !test.started_at) updates.started_at = new Date().toISOString();
    if (newStatus === "completed") updates.ended_at = new Date().toISOString();
    updateTest.mutate(updates);
  };

  const handleDeclareWinner = (testId: string, winner: string) => {
    updateTest.mutate({ id: testId, winner });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-48" />
      </div>
    );
  }

  const activeTests = (tests || []).filter(t => t.status === "running" || t.status === "paused");
  const draftTests = (tests || []).filter(t => t.status === "draft");
  const completedTests = (tests || []).filter(t => t.status === "completed");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <div>
            <h2 className="text-xl font-semibold">A/B Tests</h2>
            <p className="text-sm text-muted-foreground">{toolName} — email gate experiments</p>
          </div>
        </div>
        {!showForm && !editingTest && (
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Create New Test
          </Button>
        )}
      </div>

      {/* Create form */}
      {showForm && (
        <TestForm
          onSave={handleCreate}
          onCancel={() => setShowForm(false)}
          saving={createTest.isPending}
        />
      )}

      {/* Edit form */}
      {editingTest && (
        <TestForm
          initialValues={editingTest}
          onSave={handleEdit}
          onCancel={() => setEditingTest(null)}
          saving={updateTest.isPending}
          isEdit
        />
      )}

      {/* Active / Running tests */}
      {activeTests.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Active Tests</h3>
          {activeTests.map((test) => (
            <TestRow
              key={test.id}
              test={test}
              toolSlug={toolSlug}
              onEdit={(t) => { setEditingTest(t); setShowForm(false); }}
              onStatusChange={handleStatusChange}
              onDeclareWinner={handleDeclareWinner}
              updating={updateTest.isPending}
            />
          ))}
        </div>
      )}

      {/* Draft tests */}
      {draftTests.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Drafts</h3>
          {draftTests.map((test) => (
            <TestRow
              key={test.id}
              test={test}
              toolSlug={toolSlug}
              onEdit={(t) => { setEditingTest(t); setShowForm(false); }}
              onStatusChange={handleStatusChange}
              onDeclareWinner={handleDeclareWinner}
              updating={updateTest.isPending}
            />
          ))}
        </div>
      )}

      {/* Completed tests */}
      {completedTests.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Completed</h3>
          {completedTests.map((test) => (
            <TestRow
              key={test.id}
              test={test}
              toolSlug={toolSlug}
              onEdit={(t) => { setEditingTest(t); setShowForm(false); }}
              onStatusChange={handleStatusChange}
              onDeclareWinner={handleDeclareWinner}
              updating={updateTest.isPending}
            />
          ))}
        </div>
      )}

      {/* Empty state */}
      {(!tests || tests.length === 0) && !showForm && (
        <div className="rounded-lg bg-muted/70 shadow-sm p-6 py-12 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-background/60 flex items-center justify-center mb-4">
            <Eye className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="font-medium mb-1">No A/B tests yet</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Create a test to experiment with different email gate configurations and find what converts best.
          </p>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Create Your First Test
          </Button>
        </div>
      )}
    </div>
  );
}
