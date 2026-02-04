
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HomepageCtaToggle } from "@/components/admin/HomepageCtaToggle";
import { UnderConstructionToggle } from "@/components/admin/UnderConstructionToggle";
import { supabase } from "@/integrations/supabase/client";

export function AdminDashboard() {
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);
  const [contactCount, setContactCount] = useState<number | null>(null);
  const [userCount, setUserCount] = useState<number | null>(null);
  const [companyCount, setCompanyCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchCounts() {
      setLoading(true);
      
      // Fetch all counts in parallel
      const [waitlistRes, contactRes, userRes, companyRes] = await Promise.all([
        supabase.from("waitlist_submissions").select("*", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
        supabase.from("users").select("*", { count: "exact", head: true }),
        supabase.from("companies").select("*", { count: "exact", head: true }),
      ]);
      
      setWaitlistCount(waitlistRes.count ?? 0);
      setContactCount(contactRes.count ?? 0);
      setUserCount(userRes.count ?? 0);
      setCompanyCount(companyRes.count ?? 0);
      setLoading(false);
    }
    
    fetchCounts();
  }, []);

  return (
    <div className="space-y-6">
      <UnderConstructionToggle />
      
      <Card>
        <CardHeader>
          <CardTitle>Homepage CTA Settings</CardTitle>
          <CardDescription>
            Toggle between different call-to-action buttons on the homepage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <HomepageCtaToggle />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Site Metrics</CardTitle>
          <CardDescription>
            Key performance indicators for your website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard title="Waitlist Submissions" value={waitlistCount} loading={loading} />
            <MetricCard title="Contact Submissions" value={contactCount} loading={loading} />
            <MetricCard title="User Sign-ups" value={userCount} loading={loading} />
            <MetricCard title="Companies" value={companyCount} loading={loading} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MetricCard({ title, value, loading }: { title: string; value: number | null; loading: boolean }) {
  return (
    <div className="bg-accent/50 rounded-lg p-4">
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-3xl font-bold mt-2">
        {loading ? "..." : (value ?? 0)}
      </p>
    </div>
  );
}
