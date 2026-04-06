
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, Tag } from "lucide-react";

export function ExampleUpdateFeedSection() {
  const updates = [
    {
      date: "2025-05-01",
      standard: "ASC 326",
      summary: "CECL update clarifying qualitative factors",
      impact: "Medium",
      impactColor: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400"
    },
    {
      date: "2025-04-10",
      standard: "IFRS 17",
      summary: "Updated guidance on contract boundary changes",
      impact: "High",
      impactColor: "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400"
    },
    {
      date: "2025-03-22",
      standard: "ASC 842",
      summary: "Lease modification accounting clarifications",
      impact: "Low",
      impactColor: "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400"
    },
    {
      date: "2025-03-15",
      standard: "ASC 606",
      summary: "Revenue recognition for bundled services",
      impact: "Medium",
      impactColor: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400"
    },
    {
      date: "2025-02-28",
      standard: "PCAOB",
      summary: "New audit documentation requirements",
      impact: "High",
      impactColor: "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Recent Guidance Updates
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See the latest accounting standard updates with clear summaries and impact assessments
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-hidden rounded-lg border border-border">
            <table className="w-full bg-background">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Standard</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Summary</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Impact</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {updates.map((update, index) => (
                  <tr key={index} className="hover:bg-muted transition-colors">
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {update.date}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-muted dark:text-blue-400">
                        {update.standard}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground max-w-md">
                      {update.summary}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${update.impactColor}`}>
                        <Tag className="w-3 h-3 mr-1" />
                        {update.impact}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        View Summary
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {updates.map((update, index) => (
              <div key={index} className="bg-background rounded-lg border border-border p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-muted dark:text-blue-400">
                      {update.standard}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${update.impactColor}`}>
                      {update.impact}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {update.date}
                  </div>
                </div>
                <p className="text-sm text-foreground mb-3">{update.summary}</p>
                <Button variant="ghost" size="sm" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  View Summary
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
