import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { Logo } from "@/components/logo";
import { Link } from "react-router-dom";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { Menu, X, ChevronDown, ChevronRight, FileText, FileCheck, FileSearch, Bell, ArrowRight, Lightbulb, Users, ShieldCheck, Briefcase, Brain, Shield, Building, Building2, Database } from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

// ─── Data ───────────────────────────────────────────────────────────────────

const products = [
  {
    name: "Memos",
    href: "/accounting-memos",
    icon: FileText,
    description: "Better memos, faster",
  },
  {
    name: "Footnote Disclosures",
    href: "/footnote-disclosures",
    icon: FileCheck,
    description: "Benchmark & AI completed checklists",
  },
  {
    name: "Contract Analysis",
    href: "/contract-analysis",
    icon: FileSearch,
    description: "AI-powered contract analysis",
  },
  {
    name: "Accounting Research",
    href: "/research-gpt",
    icon: Brain,
    description: "Your firm's AI-powered research assistant",
  },
  {
    name: "Internal GPT",
    href: "/internal-gpt",
    icon: Database,
    description: "Query your internal knowledge base with AI",
  },
  {
    name: "Guidance Updates",
    href: "/guidance-updates",
    icon: Bell,
    description: "Apply new guidance to your situation",
  },
  {
    name: "SOX Controls",
    href: "/sox-controls",
    icon: Shield,
    description: "Coming Soon",
    comingSoon: true,
  },
];

const solutionPages = [
  {
    name: "Private Companies",
    href: "/solutions/private",
    icon: Building,
    description: "Audit-ready without Big 4 headcount",
  },
  {
    name: "Public Companies",
    href: "/solutions/public",
    icon: Building2,
    description: "SEC & SOX reporting made easier",
  },
  {
    name: "Accounting Firms",
    href: "/solutions/firm",
    icon: Briefcase,
    description: "Serve more clients with the same team",
  },
];

const companyPages = [
  {
    name: "Why We Built This",
    href: "/why-we-built-this",
    icon: Lightbulb,
    description: "Our story and mission behind Gaapio",
  },
  {
    name: "About Us",
    href: "/about-us",
    icon: Users,
    description: "Meet the team and learn about our expertise",
  },
  {
    name: "Blog",
    href: "/blog",
    icon: FileText,
    description: "Insights on technical accounting and technology",
  },
  {
    name: "Trust and Security",
    href: "https://security.gaapio.com",
    icon: ShieldCheck,
    description: "Our commitment to security and compliance",
    external: true,
  },
  {
    name: "Careers",
    href: "/careers",
    icon: Briefcase,
    description: "Join our team and help shape the future",
  },
];

// ─── Mini Product Screenshots (coded HTML/CSS) ─────────────────────────────

function AppWindowFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex-1 bg-[#141e30] rounded-[10px] border border-[#1a2a40] overflow-hidden">
      <div className="px-3 py-2 bg-[#0d1824] border-b border-[#1a2a40] flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f56]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#ffbd2e]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#27c93f]" />
        <span className="text-[9px] text-[#4a6080] ml-2">{title}</span>
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

function ContentLine({ width = "80%" }: { width?: string }) {
  return <div className="h-[5px] bg-[#1a2a40] rounded-full mb-1.5" style={{ width }} />;
}

function Badge({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return (
    <div className={cn(
      "px-2 py-0.5 rounded text-[9px] font-semibold",
      active ? "bg-primary text-white" : "bg-[#1a2a40] text-[#6688aa]"
    )}>
      {children}
    </div>
  );
}

function MemoScreenshot() {
  return (
    <AppWindowFrame title="Gaapio — New Memo">
      <div className="flex gap-1.5 mb-2">
        <Badge active>Draft</Badge>
        <Badge>ASC 842</Badge>
      </div>
      <ContentLine width="88%" />
      <ContentLine width="72%" />
      <ContentLine width="80%" />
      <div className="mt-2.5 flex items-center gap-1.5">
        <div className="w-3.5 h-3.5 rounded-full bg-primary/30 border-[1.5px] border-primary flex items-center justify-center">
          <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-primary"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <span className="text-[9px] text-[#4a6080]">AI generating citations...</span>
      </div>
    </AppWindowFrame>
  );
}

function FootnoteScreenshot() {
  return (
    <AppWindowFrame title="Gaapio — Footnote Disclosures">
      <div className="space-y-2">
        {["Revenue Recognition", "Lease Disclosures", "Fair Value", "Related Parties"].map((item, i) => (
          <div key={item} className="flex items-center gap-2">
            <div className={cn(
              "w-3.5 h-3.5 rounded-full flex items-center justify-center text-white",
              i < 2 ? "bg-green-500" : "bg-[#1a2a40]"
            )}>
              {i < 2 && <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
            </div>
            <span className={cn("text-[10px]", i < 2 ? "text-[#8899bb]" : "text-[#4a6080]")}>{item}</span>
          </div>
        ))}
      </div>
      <div className="mt-2.5 h-1 bg-[#1a2a40] rounded-full overflow-hidden">
        <div className="h-full w-1/2 bg-green-500 rounded-full" />
      </div>
    </AppWindowFrame>
  );
}

function ContractScreenshot() {
  return (
    <AppWindowFrame title="Gaapio — Contract Analysis">
      <div className="flex gap-2">
        <div className="flex-1">
          <ContentLine width="90%" />
          <ContentLine width="75%" />
          <ContentLine width="85%" />
          <ContentLine width="60%" />
        </div>
        <div className="flex-1 border-l-2 border-primary/30 pl-2">
          <div className="text-[9px] text-primary font-semibold mb-1">Key Terms</div>
          <ContentLine width="70%" />
          <ContentLine width="55%" />
        </div>
      </div>
    </AppWindowFrame>
  );
}

function ResearchScreenshot() {
  return (
    <AppWindowFrame title="Gaapio — Accounting Research">
      <div className="bg-[#1a2a40] rounded-md px-2 py-1.5 mb-2 flex items-center gap-1.5">
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#4a6080" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <span className="text-[9px] text-[#4a6080]">ASC 842 lease modification...</span>
      </div>
      {[1, 2].map((i) => (
        <div key={i} className="bg-[#0d1824] rounded-md p-2 mb-1.5">
          <ContentLine width="85%" />
          <div className="flex gap-1 mt-1">
            <Badge>ASC 842-10</Badge>
          </div>
        </div>
      ))}
    </AppWindowFrame>
  );
}

function InternalGPTScreenshot() {
  return (
    <AppWindowFrame title="Gaapio — Internal GPT">
      <div className="flex justify-end mb-2">
        <div className="bg-primary/20 rounded-lg px-2.5 py-1.5 max-w-[70%]">
          <span className="text-[9px] text-primary">What's our rev rec policy?</span>
        </div>
      </div>
      <div className="flex justify-start mb-2">
        <div className="bg-[#1a2a40] rounded-lg px-2.5 py-1.5 max-w-[75%]">
          <ContentLine width="90%" />
          <ContentLine width="70%" />
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        <span className="text-[9px] text-[#4a6080]">Searching knowledge base...</span>
      </div>
    </AppWindowFrame>
  );
}

function GuidanceScreenshot() {
  return (
    <AppWindowFrame title="Gaapio — Guidance Updates">
      {["ASU 2025-01 Released", "FASB Update: Crypto Assets", "New Disclosure Req."].map((item, i) => (
        <div key={item} className="flex items-center gap-2 py-1.5 border-b border-[#1a2a40] last:border-0">
          <div className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", i === 0 ? "bg-primary" : "bg-[#2a3a50]")} />
          <span className="text-[10px] text-[#8899bb] flex-1">{item}</span>
          <span className="text-[8px] text-[#4a6080]">{i === 0 ? "New" : `${i + 1}d ago`}</span>
        </div>
      ))}
    </AppWindowFrame>
  );
}

function SOXScreenshot() {
  return (
    <AppWindowFrame title="Gaapio — SOX Controls">
      <div className="flex flex-col items-center justify-center py-4 opacity-50">
        <Shield className="w-6 h-6 text-[#4a6080] mb-1.5" />
        <span className="text-[10px] text-[#4a6080] font-medium">Coming Soon</span>
      </div>
    </AppWindowFrame>
  );
}

const productScreenshots: Record<string, React.ReactNode> = {
  "Memos": <MemoScreenshot />,
  "Footnote Disclosures": <FootnoteScreenshot />,
  "Contract Analysis": <ContractScreenshot />,
  "Accounting Research": <ResearchScreenshot />,
  "Internal GPT": <InternalGPTScreenshot />,
  "Guidance Updates": <GuidanceScreenshot />,
  "SOX Controls": <SOXScreenshot />,
};

// ─── Solution Screenshots ───────────────────────────────────────────────────

function PrivateCompanyScreenshot() {
  return (
    <AppWindowFrame title="Gaapio — Audit Dashboard">
      <div className="text-[10px] text-[#8899bb] font-semibold mb-2">Audit Status</div>
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { label: "Memos", count: "12", color: "bg-green-500" },
          { label: "Disclosures", count: "8", color: "bg-yellow-500" },
          { label: "Reviews", count: "5", color: "bg-green-500" },
        ].map((item) => (
          <div key={item.label} className="bg-[#0d1824] rounded-md p-2 text-center">
            <div className="text-[14px] font-bold text-white">{item.count}</div>
            <div className="text-[8px] text-[#4a6080]">{item.label}</div>
            <div className={cn("w-1.5 h-1.5 rounded-full mx-auto mt-1", item.color)} />
          </div>
        ))}
      </div>
    </AppWindowFrame>
  );
}

function PublicCompanyScreenshot() {
  return (
    <AppWindowFrame title="Gaapio — SEC Filing">
      <div className="flex items-center gap-1.5 mb-2">
        <Badge active>10-K</Badge>
        <span className="text-[9px] text-[#4a6080]">FY 2025</span>
      </div>
      <div className="text-[9px] text-[#6688aa] mb-1">Disclosures Progress</div>
      <div className="h-1.5 bg-[#1a2a40] rounded-full overflow-hidden mb-1">
        <div className="h-full w-[85%] bg-primary rounded-full" />
      </div>
      <div className="text-[8px] text-[#4a6080]">85% complete</div>
      <div className="mt-2">
        <ContentLine width="90%" />
        <ContentLine width="70%" />
      </div>
    </AppWindowFrame>
  );
}

function FirmScreenshot() {
  return (
    <AppWindowFrame title="Gaapio — Client Overview">
      {["Acme Corp", "Beta Holdings", "Gamma Inc"].map((name, i) => (
        <div key={name} className="flex items-center gap-2 py-1.5 border-b border-[#1a2a40] last:border-0">
          <div className="w-5 h-5 rounded-full bg-[#1a2a40] flex items-center justify-center">
            <span className="text-[8px] text-[#4a6080]">{name[0]}</span>
          </div>
          <span className="text-[10px] text-[#8899bb] flex-1">{name}</span>
          <Badge active={i === 0}>{["Complete", "In Review", "Draft"][i]}</Badge>
        </div>
      ))}
    </AppWindowFrame>
  );
}

const solutionScreenshots: Record<string, React.ReactNode> = {
  "Private Companies": <PrivateCompanyScreenshot />,
  "Public Companies": <PublicCompanyScreenshot />,
  "Accounting Firms": <FirmScreenshot />,
};

// ─── Company Visuals ────────────────────────────────────────────────────────

function WhyWeBuiltVisual() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-6">
      <div className="text-[32px] text-[#2a3a50] leading-none mb-3">"</div>
      <ContentLine width="85%" />
      <ContentLine width="70%" />
      <div className="text-[10px] text-[#4a6080] mt-3">— Gaapio Team</div>
    </div>
  );
}

function AboutUsVisual() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-6">
      <div className="flex -space-x-2 mb-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-8 h-8 rounded-full bg-[#1a2a40] border-2 border-[#0d2040] flex items-center justify-center">
            <Users className="w-3.5 h-3.5 text-[#4a6080]" />
          </div>
        ))}
      </div>
      <ContentLine width="60%" />
      <div className="text-[10px] text-primary font-semibold mt-2">Meet the team →</div>
    </div>
  );
}

function BlogVisual() {
  return (
    <div className="flex-1 flex flex-col gap-2 py-2">
      {["AI in Accounting", "Technical Memos Guide"].map((title) => (
        <div key={title} className="bg-[#141e30] rounded-lg p-3 border border-[#1a2a40]">
          <Badge active>Insights</Badge>
          <div className="text-[11px] text-[#8899bb] font-medium mt-1.5">{title}</div>
          <div className="text-[8px] text-[#4a6080] mt-1">Mar 2026</div>
        </div>
      ))}
    </div>
  );
}

function TrustVisual() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-6">
      <div className="w-10 h-10 rounded-xl bg-[#141e30] border border-[#1a2a40] flex items-center justify-center mb-3">
        <ShieldCheck className="w-5 h-5 text-primary" />
      </div>
      <div className="flex gap-1.5 mb-2">
        <Badge active>SOC 2 Type II</Badge>
        <Badge>Enterprise</Badge>
      </div>
      <div className="text-[9px] text-[#4a6080] mt-1">Enterprise-grade security</div>
    </div>
  );
}

function CareersVisual() {
  return (
    <div className="flex-1 flex flex-col py-4">
      <div className="text-[12px] font-bold text-primary mb-3 text-center">We're hiring</div>
      {["Senior Engineer", "Product Designer"].map((role) => (
        <div key={role} className="bg-[#141e30] rounded-lg p-2.5 border border-[#1a2a40] mb-1.5">
          <div className="text-[10px] text-[#8899bb] font-medium">{role}</div>
          <div className="text-[8px] text-[#4a6080]">Remote</div>
        </div>
      ))}
    </div>
  );
}

const companyVisuals: Record<string, React.ReactNode> = {
  "Why We Built This": <WhyWeBuiltVisual />,
  "About Us": <AboutUsVisual />,
  "Blog": <BlogVisual />,
  "Trust and Security": <TrustVisual />,
  "Careers": <CareersVisual />,
};

// ─── Shared Mega Menu Components ────────────────────────────────────────────

interface MegaMenuItemData {
  name: string;
  href: string;
  icon: React.ElementType;
  description: string;
  external?: boolean;
  comingSoon?: boolean;
}

function MegaMenuLeftItem({
  item,
  isActive,
  onHover,
}: {
  item: MegaMenuItemData;
  isActive: boolean;
  onHover: () => void;
}) {
  const Icon = item.icon;
  const Wrapper = item.external ? "a" : Link;
  const wrapperProps = item.external
    ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
    : { to: item.href };

  return (
    <NavigationMenuLink asChild>
      <Wrapper
        {...(wrapperProps as any)}
        onMouseEnter={onHover}
        className={cn(
          "flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] transition-all duration-150 cursor-pointer",
          isActive
            ? "bg-[var(--mega-menu-active-bg)] shadow-[var(--shadow-sm)]"
            : "hover:bg-[var(--mega-menu-hover-bg)]"
        )}
      >
        <div className={cn(
          "w-7 h-7 rounded-[7px] flex items-center justify-center flex-shrink-0 transition-colors duration-150",
          isActive
            ? "bg-gradient-to-br from-primary to-[#0077CC] text-white"
            : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
        )}>
          <Icon className="w-3.5 h-3.5" strokeWidth={2.5} />
        </div>
        <div className="min-w-0">
          <div className={cn(
            "text-[13px] transition-colors duration-150 truncate",
            isActive ? "font-semibold text-gray-900 dark:text-gray-100" : "font-medium text-gray-500 dark:text-gray-400"
          )}>
            {item.name}
          </div>
          {isActive && (
            <div className="text-[11px] text-gray-500 dark:text-gray-500 mt-0.5 truncate">
              {item.description}
            </div>
          )}
        </div>
      </Wrapper>
    </NavigationMenuLink>
  );
}

function MegaMenuRightPanel({
  name,
  description,
  href,
  children,
  external,
}: {
  name: string;
  description: string;
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const LinkComp = external ? "a" : Link;
  const linkProps = external
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { to: href };

  return (
    <div className="bg-gradient-to-br from-[#0a1628] via-[#0d2040] to-[#0a1628] rounded-xl p-6 flex flex-col shadow-[var(--shadow-lg)] transition-opacity duration-200">
      <div className="mb-3">
        <div className="text-[17px] font-bold text-white tracking-tight">{name}</div>
        <div className="text-[13px] text-[#6688aa] mt-1">{description}</div>
      </div>
      {children}
      <div className="mt-3">
        <LinkComp
          {...(linkProps as any)}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary hover:gap-2.5 transition-all"
        >
          Learn more <ArrowRight className="w-3.5 h-3.5" />
        </LinkComp>
      </div>
    </div>
  );
}

// ─── Header Component ───────────────────────────────────────────────────────

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(products[0]);
  const [hoveredSolution, setHoveredSolution] = useState(solutionPages[0]);
  const [hoveredCompany, setHoveredCompany] = useState(companyPages[0]);
  const { siteConfig, loading } = useSiteConfig();
  const enableSelfSignup = siteConfig?.enable_self_signup ?? true;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsProductsOpen(false);
    setIsSolutionsOpen(false);
    setIsCompanyOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid h-16 grid-cols-[1fr_auto] md:grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 md:gap-x-6 lg:gap-x-8">
          {/* Logo */}
          <div className="col-start-1 row-start-1 justify-self-start min-w-0 z-10">
            <Link to="/" onClick={closeMenu}>
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation — centered in its own column so it never overlaps CTAs */}
          <div className="hidden md:flex col-start-2 row-start-1 justify-center min-w-0 w-full px-2 md:px-4">
            <NavigationMenu className="max-w-full">
              <NavigationMenuList className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-x-3 md:gap-x-5 lg:gap-x-7 xl:gap-x-9 2xl:gap-x-10 gap-y-1">
                {/* Solutions Mega Menu */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 dark:text-gray-200 text-base font-medium hover:text-gray-900 dark:hover:text-white transition-colors px-3 md:px-4 py-2 gap-1.5 data-[state=open]:text-gray-900 dark:data-[state=open]:text-white [&_svg]:ml-0">
                    Solutions
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-[100]">
                    <div className="rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 w-[700px] bg-[var(--mega-menu-bg)] p-4">
                      <div className="grid grid-cols-[240px_1fr] gap-4">
                        <div className="py-1">
                          <div className="text-[11px] font-bold text-primary uppercase tracking-widest mb-3 px-3">
                            Solutions
                          </div>
                          <div className="flex flex-col gap-0.5">
                            {solutionPages.map((solution) => (
                              <MegaMenuLeftItem
                                key={solution.name}
                                item={solution}
                                isActive={hoveredSolution.name === solution.name}
                                onHover={() => setHoveredSolution(solution)}
                              />
                            ))}
                          </div>
                        </div>
                        <MegaMenuRightPanel
                          name={hoveredSolution.name}
                          description={hoveredSolution.description}
                          href={hoveredSolution.href}
                        >
                          {solutionScreenshots[hoveredSolution.name]}
                        </MegaMenuRightPanel>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Products Mega Menu */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 dark:text-gray-200 text-base font-medium hover:text-gray-900 dark:hover:text-white transition-colors px-3 md:px-4 py-2 gap-1.5 data-[state=open]:text-gray-900 dark:data-[state=open]:text-white [&_svg]:ml-0">
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-[100]">
                    <div className="rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 w-[700px] bg-[var(--mega-menu-bg)] p-4">
                      <div className="grid grid-cols-[240px_1fr] gap-4">
                        <div className="py-1">
                          <div className="text-[11px] font-bold text-primary uppercase tracking-widest mb-3 px-3">
                            Products
                          </div>
                          <div className="flex flex-col gap-0.5">
                            {products.map((product) => (
                              <MegaMenuLeftItem
                                key={product.name}
                                item={product}
                                isActive={hoveredProduct.name === product.name}
                                onHover={() => setHoveredProduct(product)}
                              />
                            ))}
                          </div>
                        </div>
                        <MegaMenuRightPanel
                          name={hoveredProduct.name}
                          description={hoveredProduct.description}
                          href={hoveredProduct.href}
                        >
                          {productScreenshots[hoveredProduct.name]}
                        </MegaMenuRightPanel>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Company Mega Menu */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 dark:text-gray-200 text-base font-medium hover:text-gray-900 dark:hover:text-white transition-colors px-3 md:px-4 py-2 gap-1.5 data-[state=open]:text-gray-900 dark:data-[state=open]:text-white [&_svg]:ml-0">
                    Company
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-[100]">
                    <div className="rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 w-[700px] bg-[var(--mega-menu-bg)] p-4">
                      <div className="grid grid-cols-[240px_1fr] gap-4">
                        <div className="py-1">
                          <div className="text-[11px] font-bold text-primary uppercase tracking-widest mb-3 px-3">
                            Company
                          </div>
                          <div className="flex flex-col gap-0.5">
                            {companyPages.map((page) => (
                              <MegaMenuLeftItem
                                key={page.name}
                                item={page}
                                isActive={hoveredCompany.name === page.name}
                                onHover={() => setHoveredCompany(page)}
                              />
                            ))}
                          </div>
                        </div>
                        <MegaMenuRightPanel
                          name={hoveredCompany.name}
                          description={hoveredCompany.description}
                          href={hoveredCompany.href}
                          external={hoveredCompany.external}
                        >
                          <div className="flex-1 bg-gradient-to-br from-[#0a1628] to-[#0d2040] rounded-lg flex">
                            {companyVisuals[hoveredCompany.name]}
                          </div>
                        </MegaMenuRightPanel>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    to="/faq"
                    className="text-gray-700 dark:text-gray-200 text-base font-medium hover:text-gray-900 dark:hover:text-white transition-colors px-3 md:px-4 py-2 inline-flex"
                  >
                    FAQ
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem className="pr-2 md:pr-4 lg:pr-6">
                  <Link
                    to="/contact"
                    className="text-gray-700 dark:text-gray-200 text-base font-medium hover:text-gray-900 dark:hover:text-white transition-colors px-3 md:px-4 py-2 inline-flex"
                  >
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Action Buttons — own grid column; extra left padding separates from nav */}
          <div className="hidden md:flex col-start-3 row-start-1 justify-self-end items-center gap-3 lg:gap-4 flex-shrink-0 whitespace-nowrap z-10 pl-4 md:pl-6 lg:pl-8 xl:pl-10 border-l border-gray-200/80 dark:border-gray-700/80">
            <div className={loading ? "invisible" : ""}>
              {enableSelfSignup ? (
                <Button variant="blue" asChild className="shrink-0">
                  <Link to="/signup-select">Sign Up Now</Link>
                </Button>
              ) : (
                <Button variant="blue" asChild className="shrink-0">
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              )}
            </div>
            <a
              href="https://app.gaapio.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-200 text-sm font-medium hover:text-gray-900 dark:hover:text-white hover:underline transition-colors px-2 py-2 shrink-0"
            >
              Login
            </a>
            <ModeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden col-start-2 row-start-1 justify-self-end flex items-center gap-2 z-10">
            <ModeToggle />
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              {/* Solutions Section */}
              <div>
                <button
                  onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                  className="w-full flex items-center justify-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <span>Solutions</span>
                  {isSolutionsOpen ? <ChevronDown className="h-4 w-4 ml-2" /> : <ChevronRight className="h-4 w-4 ml-2" />}
                </button>
                {isSolutionsOpen && (
                  <div className="pl-4 space-y-1 mt-1">
                    {solutionPages.map((page) => (
                      <Link
                        key={page.name}
                        to={page.href}
                        className="block px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                        onClick={closeMenu}
                      >
                        {page.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Products Section */}
              <div>
                <button
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  className="w-full flex items-center justify-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <span>Products</span>
                  {isProductsOpen ? <ChevronDown className="h-4 w-4 ml-2" /> : <ChevronRight className="h-4 w-4 ml-2" />}
                </button>
                {isProductsOpen && (
                  <div className="pl-4 space-y-1 mt-1">
                    {products.map((product) => (
                      <Link
                        key={product.name}
                        to={product.href}
                        className="block px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                        onClick={closeMenu}
                      >
                        {product.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Company Section */}
              <div>
                <button
                  onClick={() => setIsCompanyOpen(!isCompanyOpen)}
                  className="w-full flex items-center justify-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <span>Company</span>
                  {isCompanyOpen ? <ChevronDown className="h-4 w-4 ml-2" /> : <ChevronRight className="h-4 w-4 ml-2" />}
                </button>
                {isCompanyOpen && (
                  <div className="pl-4 space-y-1 mt-1">
                    {companyPages.map((page) =>
                      page.external ? (
                        <a
                          key={page.name}
                          href={page.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          onClick={closeMenu}
                        >
                          {page.name}
                        </a>
                      ) : (
                        <Link
                          key={page.name}
                          to={page.href}
                          className="block px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                          onClick={closeMenu}
                        >
                          {page.name}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>

              <Link
                to="/faq"
                className="block px-3 py-2 rounded-md text-base font-medium text-center transition-colors text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={closeMenu}
              >
                FAQ
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-center transition-colors text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={closeMenu}
              >
                Contact
              </Link>

              {/* CTA buttons for mobile */}
              <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
                <div className="mt-3 px-3 space-y-3">
                  <div className={loading ? "invisible" : ""}>
                    {enableSelfSignup ? (
                      <Button variant="blue" asChild className="w-full">
                        <Link to="/signup-select" onClick={closeMenu}>Sign Up Now</Link>
                      </Button>
                    ) : (
                      <Button variant="blue" asChild className="w-full">
                        <Link to="/contact" onClick={closeMenu}>Contact Sales</Link>
                      </Button>
                    )}
                  </div>
                  <a
                    href="https://app.gaapio.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 rounded-md text-base font-medium text-center text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    onClick={closeMenu}
                  >
                    Login
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
