import { useEffect, useState } from "react";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { CompaniesTable } from "@/components/admin/CompaniesTable";
import { UserSignupsTable } from "@/components/admin/UsersTable";
import { ContactTable } from "@/components/admin/ContactTable";
import { DemoRequestsTable } from "@/components/admin/DemoRequestsTable";
import { AdminPageGuard } from "@/components/admin/AdminPageGuard";
import { AdminSecurityAlert } from "@/components/admin/AdminSecurityAlert";
import { AdminFetchErrorAlert } from "@/components/admin/AdminFetchErrorAlert";
import { FeatureToggles } from "@/components/admin/FeatureToggles";
import { UnderConstructionToggle } from "@/components/admin/UnderConstructionToggle";
import { useCurrentAdmin } from "@/hooks/useCurrentAdmin";
import { useFetchAdmins } from "@/hooks/useFetchAdmins";
import { Button } from "@/components/ui/button";
import { AddAdminDialog } from "@/components/admin/AddAdminDialog";
import { AdminNameDialog } from "@/components/admin/AdminNameDialog";
import { Header } from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ExternalLink, FileEdit, Home, FileText, Shield, Users, Mail, Book, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BlogPostsManager } from "@/components/admin/BlogPostsManager";
import { PageEditor } from "@/components/admin/PageEditor";
import { CustomerLogosManager } from "@/components/admin/CustomerLogosManager";
import { TestimonialsManager } from "@/components/admin/TestimonialsManager";
import { TabVisibilitySettings, AdminTab } from "@/components/admin/TabVisibilitySettings";
import { ToolsManager } from "@/components/admin/ToolsManager";
import { Badge } from "@/components/ui/badge";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

// Group websites pages into categories
interface PageCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  pages: { title: string; path: string; description: string; seoStatus?: "missing" | "incomplete" | "complete" }[];
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const {
    currentUser,
    loading: userLoading,
    error: userError,
    fixAdminStatus,
    fetchCurrentUserInfo
  } = useCurrentAdmin();

  const [showAddAdminDialog, setShowAddAdminDialog] = useState(false);
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [selectedPage, setSelectedPage] = useState<{ title: string; path: string; description: string; } | null>(null);
  const [pageSearch, setPageSearch] = useState("");

  // Store the tab visibility settings
  const [tabVisibility, setTabVisibility] = useState<Record<string, boolean>>({
    dashboard: true,
    companies: true,
    users: true,
    contacts: true,
    demos: true,
    firms: false,  // Hidden - no longer in use
    logos: true,
    testimonials: true,
    blog: true,
    webpages: true,
    tools: true,
    settings: true
  });

  // Ensure at least one tab is always visible
  const hasVisibleTabs = Object.values(tabVisibility).some(visible => visible);

  const {
    admins,
    loading: adminsLoading,
    error: adminsError,
    fetchAdmins
  } = useFetchAdmins(currentUser);

  // Categorized website pages - descriptions show actual SEO metadata
  const websitePageCategories: PageCategory[] = [
    {
      id: "products",
      title: "Product Pages",
      icon: <FileText className="h-5 w-5" />,
      pages: [
        { title: "Accounting Memos", path: "/accounting-memos", description: "Create audit-ready ASC 606, ASC 842 memos in minutes with AI-powered drafting and version history", seoStatus: "complete" },
        { title: "Footnote Disclosures", path: "/footnote-disclosures", description: "Generate complete footnote disclosures with AI-trained benchmarking and requirement checklists", seoStatus: "complete" },
        { title: "Contract Analysis", path: "/contract-analysis", description: "Automated contract analysis for ASC 606 revenue triggers and ASC 842 embedded lease identification", seoStatus: "complete" },
        { title: "Guidance Updates", path: "/guidance-updates", description: "Daily monitoring of FASB, SEC, PCAOB, and Big 4 guidance with AI-powered impact summaries", seoStatus: "complete" },
        { title: "ResearchGPT", path: "/research-gpt", description: "AI research assistant for technical accounting with citations to ASC, SEC, and Big 4 resources", seoStatus: "complete" },
        { title: "SOX Controls", path: "/sox-controls", description: "AI-powered SOX compliance documentation, control narratives, and deficiency tracking", seoStatus: "complete" },
      ]
    },
    {
      id: "solutions",
      title: "Solutions",
      icon: <Users className="h-5 w-5" />,
      pages: [
        { title: "Private Company", path: "/solutions/private", description: "Technical accounting solutions for private companies without Big 4 budgets", seoStatus: "complete" },
        { title: "Public Company", path: "/solutions/public", description: "Enterprise-grade SEC-compliant disclosures, 10-K/10-Q support, and SOX documentation", seoStatus: "complete" },
        { title: "Accounting Firm", path: "/solutions/firm", description: "Multi-client dashboards, standardized workflows, and firm-wide collaboration features", seoStatus: "complete" },
      ]
    },
    {
      id: "core",
      title: "Core Site Pages",
      icon: <Home className="h-5 w-5" />,
      pages: [
        { title: "Home Page", path: "/", description: "AI-powered platform built by CPAs for CPAs - memos, disclosures, contract analysis, compliance", seoStatus: "complete" },
        { title: "About Us", path: "/about-us", description: "Founded by Big 4 CPAs who experienced technical accounting pain firsthand", seoStatus: "complete" },
        { title: "Why We Built This", path: "/why-we-built-this", description: "From ASC standards adoption to AI innovation - our mission to transform accounting", seoStatus: "complete" },
        { title: "Contact", path: "/contact", description: "Contact our team for sales inquiries, support, or partnership opportunities", seoStatus: "complete" },
        { title: "FAQ", path: "/faq", description: "Answers to common questions about pricing, security, integrations, and features", seoStatus: "complete" },
        { title: "Careers", path: "/careers", description: "Join our remote-first team - hiring engineers, sales, and marketing professionals", seoStatus: "complete" },
        { title: "Resources", path: "/resources", description: "Curated links to SEC EDGAR, FASB Codification, and Big 4 guidance publications", seoStatus: "complete" },
      ]
    },
    {
      id: "legal",
      title: "Legal & Compliance",
      icon: <Shield className="h-5 w-5" />,
      pages: [
        { title: "Privacy Policy", path: "/privacy", description: "Data collection, usage, security, and your rights under GDPR and CCPA", seoStatus: "complete" },
        { title: "Terms of Service", path: "/terms-of-service", description: "Service terms, billing policies, and user responsibilities", seoStatus: "complete" },
        { title: "Subscription Agreement", path: "/ssa", description: "Subscription Services Agreement governing platform access", seoStatus: "complete" },
        { title: "Data Processing Addendum", path: "/dpa", description: "GDPR-compliant data processing terms for enterprise customers", seoStatus: "complete" },
      ]
    },
    {
      id: "access",
      title: "User Access & Registration",
      icon: <Users className="h-5 w-5" />,
      pages: [
        { title: "Login", path: "/login", description: "Admin login portal (noindex)", seoStatus: "complete" },
        { title: "Sign Up", path: "/signup", description: "Choose your plan and start with AI-powered accounting today", seoStatus: "complete" },
        { title: "Firm Signup", path: "/firm-signup", description: "Special pricing for CPA firms with multi-user discounts", seoStatus: "complete" },
      ]
    },
    {
      id: "leads",
      title: "Demo & Sales",
      icon: <Mail className="h-5 w-5" />,
      pages: [
        { title: "Request Demo", path: "/request-demo", description: "Schedule a personalized demo of the AI-powered accounting platform", seoStatus: "complete" },
        { title: "One Pager", path: "/onepager", description: "Quick overview PDF of platform capabilities and features", seoStatus: "complete" },
      ]
    },
    {
      id: "blog",
      title: "Blog & Articles",
      icon: <Book className="h-5 w-5" />,
      pages: [
        { title: "Blog", path: "/blog", description: "Expert insights on technical accounting, AI in finance, and ASC standards", seoStatus: "complete" },
        { title: "ASC 606 Pitfalls", path: "/blog/5-common-asc-606-pitfalls", description: "5 most common revenue recognition mistakes and how to avoid them", seoStatus: "complete" },
        { title: "Tech Accounting Memos", path: "/blog/why-technical-accounting-memos-matter", description: "Why technical accounting memos matter for audit readiness", seoStatus: "complete" },
        { title: "AI in Accounting", path: "/blog/how-ai-is-changing-the-accounting-landscape", description: "How AI is transforming the accounting profession", seoStatus: "complete" },
      ]
    },
    {
      id: "system",
      title: "System Pages",
      icon: <FileText className="h-5 w-5" />,
      pages: [
        { title: "Status", path: "/status", description: "Service health for API, web app, and database systems", seoStatus: "complete" },
        { title: "Success", path: "/success", description: "Payment confirmation page (noindex)", seoStatus: "complete" },
        { title: "Cancel", path: "/cancel", description: "Checkout canceled page (noindex)", seoStatus: "complete" },
        { title: "Not Found (404)", path: "/404", description: "Error page for missing routes (noindex)", seoStatus: "complete" },
      ]
    },
  ];

  useEffect(() => {
    const savedSettings = localStorage.getItem("adminTabVisibility");
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        const visibility: Record<string, boolean> = {};

        parsedSettings.forEach((tab: AdminTab) => {
          visibility[tab.id] = tab.visible;
        });

        setTabVisibility(visibility);
      } catch (error) {
        console.error("Error loading tab visibility settings:", error);
      }
    }
  }, []);

  // Set the active tab from URL if present
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam && tabVisibility[tabParam]) {
      setActiveTab(tabParam);
    } else {
      // Find first visible tab if current one is hidden
      if (!tabVisibility[activeTab]) {
        const firstVisible = Object.entries(tabVisibility)
          .find(([_, visible]) => visible)?.[0];

        if (firstVisible) {
          setActiveTab(firstVisible);
        }
      }
    }
  }, [tabVisibility]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Update URL without reload
    const url = new URL(window.location.href);
    url.searchParams.set('tab', value);
    window.history.pushState({}, '', url);
  };

  // Render SEO status badge
  const renderSeoStatusBadge = (status?: "missing" | "incomplete" | "complete") => {
    if (!status) return null;

    switch (status) {
      case "complete":
        return <Badge variant="default" className="bg-green-500">SEO Complete</Badge>;
      case "incomplete":
        return <Badge variant="outline" className="text-amber-500 border-amber-500">SEO Incomplete</Badge>;
      case "missing":
        return <Badge variant="destructive">Missing SEO</Badge>;
      default:
        return null;
    }
  };

  const handleFixAdminStatus = async () => {
    return await fixAdminStatus();
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard />;
      case "companies":
        return <CompaniesTable />;
      case "users":
        return <UserSignupsTable />;
      case "contacts":
        return <ContactTable />;
      case "demos":
        return <DemoRequestsTable />;
      case "logos":
        return <CustomerLogosManager />;
      case "testimonials":
        return <TestimonialsManager />;
      case "blog":
        return <BlogPostsManager />;
      case "webpages":
        return renderWebpages();
      case "tools":
        return <ToolsManager />;
      case "settings":
        return renderSettings();
      default:
        return <AdminDashboard />;
    }
  };

  const renderWebpages = () => {
    if (selectedPage) {
      return (
        <PageEditor
          page={selectedPage}
          onClose={() => setSelectedPage(null)}
        />
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Website Pages</h2>
            <p className="text-muted-foreground mt-1">Manage content and SEO settings</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search pages..."
              value={pageSearch}
              onChange={(e) => setPageSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="space-y-8">
          {websitePageCategories.map((category) => {
            const filteredPages = pageSearch
              ? category.pages.filter(p =>
                  p.title.toLowerCase().includes(pageSearch.toLowerCase()) ||
                  p.description.toLowerCase().includes(pageSearch.toLowerCase())
                )
              : category.pages;
            if (filteredPages.length === 0) return null;
            return (
              <div key={category.id} className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b">
                  {category.icon}
                  <h3 className="text-lg font-medium">{category.title}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredPages.map((page) => (
                    <Card key={page.path} className="overflow-hidden bg-muted/70 border-0 shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{page.title}</h3>
                          {renderSeoStatusBadge(page.seoStatus)}
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">{page.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <Link
                            to={page.path}
                            className="text-primary hover:text-primary/80 text-sm flex items-center"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            View
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center"
                            onClick={() => setSelectedPage(page)}
                          >
                            <FileEdit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderSettings = () => (
    <div className="space-y-8">
      <div className="rounded-lg bg-muted/70 shadow-inner p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Admin Users</h2>
          <Button onClick={() => setShowAddAdminDialog(true)} size="sm">
            Add Admin User
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="pb-2 font-medium">Name</th>
                <th className="pb-2 font-medium">Email</th>
                <th className="pb-2 font-medium">Role</th>
                <th className="pb-2 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {admins.map(admin => (
                <tr key={admin.id}>
                  <td className="py-2.5 font-medium">
                    {admin.first_name || admin.last_name ?
                      `${admin.first_name || ''} ${admin.last_name || ''}`.trim() :
                      'Unnamed'}
                  </td>
                  <td className="py-2.5 text-muted-foreground">{admin.email}</td>
                  <td className="py-2.5 capitalize">{admin.role}</td>
                  <td className="py-2.5 text-right">
                    {admin.user_id === currentUser.id && (!currentUser.first_name && !currentUser.last_name) && (
                      <Button variant="outline" size="sm" onClick={() => setShowNameDialog(true)}>
                        Set Your Name
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
              {!adminsLoading && admins.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-muted-foreground">
                    No admin users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-lg bg-muted/70 shadow-inner p-5">
        <h2 className="text-xl font-semibold mb-4">Admin Portal Settings</h2>
        <TabVisibilitySettings />
      </div>

      <div className="rounded-lg bg-muted/70 shadow-inner p-5">
        <h2 className="text-xl font-semibold mb-4">Feature Toggles</h2>
        <FeatureToggles />
        <div className="border-t mt-4 pt-4">
          <UnderConstructionToggle />
        </div>
      </div>
    </div>
  );

  return (
    <AdminPageGuard>
      <div className="min-h-screen bg-background">
        <Header />
        {currentUser.isAdmin && !currentUser.displayedInList && (
          <AdminSecurityAlert
            currentUserEmail={currentUser.email}
            onFixStatus={handleFixAdminStatus}
          />
        )}

        <div className="pt-16 admin-sidebar">
          <SidebarProvider defaultOpen={true}>
            <AdminSidebar
              activeTab={activeTab}
              onTabChange={handleTabChange}
              tabVisibility={tabVisibility}
            />
            <SidebarInset className="admin-main">
              <div className="px-4 pt-4 pb-3 lg:px-6 lg:pb-4">
                <AdminFetchErrorAlert
                  error={userError || adminsError}
                  onRetry={fetchAdmins}
                  loading={adminsLoading}
                />

                {!hasVisibleTabs ? (
                  <div className="p-8 text-center border rounded-md bg-card">
                    <h2 className="text-lg font-medium mb-2">No Sections Available</h2>
                    <p className="text-muted-foreground mb-4">All admin sections are currently hidden. Please enable at least one in Settings.</p>
                    <Button onClick={() => {
                      setTabVisibility(prev => ({ ...prev, settings: true }));
                      setActiveTab('settings');
                    }}>
                      Go to Settings
                    </Button>
                  </div>
                ) : (
                  renderContent()
                )}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </div>

        {showAddAdminDialog && (
          <AddAdminDialog
            open={showAddAdminDialog}
            onOpenChange={setShowAddAdminDialog}
            onSuccess={fetchAdmins}
          />
        )}

        {showNameDialog && (
          <AdminNameDialog
            open={showNameDialog}
            onOpenChange={setShowNameDialog}
            onSave={handleUpdateName}
            isLoading={false}
          />
        )}
      </div>
    </AdminPageGuard>
  );

  async function handleUpdateName(firstName: string, lastName: string): Promise<boolean> {
    console.log("Updating admin name:", firstName, lastName);
    if (!currentUser.email) return false;

    await fetchAdmins();
    return true;
  }
}
