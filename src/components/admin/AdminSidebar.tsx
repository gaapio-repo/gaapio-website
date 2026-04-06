import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Building2,
  Users,
  Mail,
  CalendarCheck,
  Image,
  Quote,
  FileText,
  Globe,
  Wrench,
  Settings,
} from "lucide-react";

export interface AdminNavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: AdminNavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "companies", label: "Companies", icon: Building2 },
  { id: "users", label: "Users", icon: Users },
  { id: "contacts", label: "Contacts", icon: Mail },
  { id: "demos", label: "Demo Requests", icon: CalendarCheck },
  { id: "logos", label: "Customer Logos", icon: Image },
  { id: "testimonials", label: "Customer Quotes", icon: Quote },
  { id: "blog", label: "Blog Posts", icon: FileText },
  { id: "webpages", label: "Webpages", icon: Globe },
  { id: "tools", label: "Tools", icon: Wrench },
  { id: "settings", label: "Settings", icon: Settings },
];

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabVisibility: Record<string, boolean>;
}

export function AdminSidebar({ activeTab, onTabChange, tabVisibility }: AdminSidebarProps) {
  const visibleItems = navItems.filter((item) => tabVisibility[item.id]);

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Toggle sidebar">
              <SidebarTrigger className="w-full justify-start" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Portal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {visibleItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeTab === item.id}
                    onClick={() => onTabChange(item.id)}
                    tooltip={item.label}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
