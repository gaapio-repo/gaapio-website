import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { Logo } from "@/components/logo";
import { Link } from "react-router-dom";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { Menu, X, ChevronDown, ChevronRight, FileText, FileCheck, FileSearch, Bell, ArrowRight, Lightbulb, Users, ShieldCheck, Briefcase, Brain, Shield, Building, Building2, Database } from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// Product order: Memos, Footnote Disclosures, Contract Analysis, Accounting Research, Guidance Updates, SOX Controls
const products = [
  {
    name: "Memos",
    href: "/accounting-memos",
    icon: FileText,
    description: "Better memos, faster",
    features: ["Version history, reviewer comments, and internal sign offs", "Guided prompts + AI follow up questions", "Exportable Audit package"],
  },
  {
    name: "Footnote Disclosures",
    href: "/footnote-disclosures",
    icon: FileCheck,
    description: "Benchmark & AI completed checklists",
    features: ["AI trained benchmarking", "Footnote requirement checklists", "CPA approved, industry leading formatting"],
  },
  {
    name: "Contract Analysis",
    href: "/contract-analysis",
    icon: FileSearch,
    description: "AI-powered contract analysis",
    features: ["Lease abstraction", "Revenue contract analysis and ASC 606 compliance", "Embedded lease identification and evaluation"],
  },
  {
    name: "Accounting Research",
    href: "/research-gpt",
    icon: Brain,
    description: "Your firm's AI-powered research assistant",
    features: ["Search Big 4 accounting guides and technical resources", "Natural language queries across comprehensive knowledge base", "Access authoritative sources with citations"],
  },
  {
    name: "Internal GPT",
    href: "/internal-gpt",
    icon: Database,
    description: "Query your internal knowledge base with AI",
    features: ["Upload policies, procedures, and memos", "Staff self-service for instant answers", "Preserve and access institutional knowledge"],
  },
  {
    name: "Guidance Updates",
    href: "/guidance-updates",
    icon: Bell,
    description: "Apply new guidance to your situation",
    features: ["Instant alerts for new standards", "Actionable implementation guidance", "Turn new guidance into a memo"],
  },
  {
    name: "SOX Controls (Coming Soon)",
    href: "/sox-controls",
    icon: Shield,
    description: "Coming Soon",
    features: [],
  },
];

const companyPages = [
  {
    name: "Why We Built This",
    href: "/why-we-built-this",
    icon: Lightbulb,
    description: "Our story and mission behind Gaapio"
  },
  {
    name: "About Us",
    href: "/about-us",
    icon: Users,
    description: "Meet the team and learn about our expertise"
  },
  {
    name: "Blog",
    href: "/blog",
    icon: FileText,
    description: "Insights on technical accounting and technology"
  },
  {
    name: "Trust and Security",
    href: "https://security.gaapio.com",
    icon: ShieldCheck,
    description: "Our commitment to security and compliance",
    external: true
  },
  {
    name: "SEC Comment Letters",
    href: "/comment-letters",
    icon: FileSearch,
    description: "Browse SEC comment letters by ASC topic"
  },
  {
    name: "Careers",
    href: "/careers",
    icon: Briefcase,
    description: "Join our team and help shape the future"
  }
];

const solutionPages = [
  {
    name: "Private Companies",
    href: "/solutions/private",
    icon: Building,
    description: "Audit-ready without Big 4 headcount",
    features: ["Audit-ready memos in minutes", "Built-in ASC guidance with citations", "Reviewer-ready deliverables every time"],
  },
  {
    name: "Public Companies",
    href: "/solutions/public",
    icon: Building2,
    description: "SEC & SOX reporting made easier",
    features: ["10-K & 10-Q disclosures, faster", "SOX documentation without spreadsheets", "Defensible outputs auditors trust"],
  },
  {
    name: "Accounting Firms",
    href: "/solutions/firm",
    icon: Briefcase,
    description: "Serve more clients with the same team",
    features: ["Serve more clients per staff", "Senior-level work from associates", "Standardized, client-ready deliverables"],
  }
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(products[0]);
  const [hoveredCompanyPage, setHoveredCompanyPage] = useState(companyPages[0]);
  const [hoveredSolutionPage, setHoveredSolutionPage] = useState(solutionPages[0]);
  const { siteConfig, loading } = useSiteConfig();
  const enableSelfSignup = siteConfig?.enable_self_signup ?? true;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsProductsOpen(false);
    setIsSolutionsOpen(false);
  };

  const toggleSolutions = () => {
    setIsSolutionsOpen(!isSolutionsOpen);
  };

  const toggleProducts = () => {
    setIsProductsOpen(!isProductsOpen);
  };

  const toggleCompany = () => {
    setIsCompanyOpen(!isCompanyOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" onClick={closeMenu}>
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center space-x-2">
                {/* Solutions Mega Menu - matching Products structure */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground text-base font-medium hover:text-foreground hover:underline transition-colors px-3 py-2 data-[state=open]:text-foreground">
                    Solutions
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-[100]">
                    <div className="rounded-2xl shadow-2xl bg-background overflow-hidden border border-border w-[750px]">
                      <div className="grid grid-cols-[300px_auto] gap-0">
                        {/* Left Column - Solution List */}
                        <div className="bg-muted p-6 border-r border-border">
                          <h3 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider px-3">
                            Our Solutions
                          </h3>
                          <div className="space-y-1">
                            {solutionPages.map((solution) => (
                              <NavigationMenuLink key={solution.name} asChild>
                                <Link
                                  to={solution.href}
                                  onMouseEnter={() => setHoveredSolutionPage(solution)}
                                  className={cn(
                                    "flex items-center gap-3 px-3 py-3 rounded-lg transition-all group",
                                    hoveredSolutionPage.name === solution.name
                                      ? "bg-blue-100 dark:bg-muted"
                                      : "hover:bg-muted"
                                  )}
                                >
                                  <div className={cn(
                                    "p-1.5 rounded-md transition-colors flex-shrink-0",
                                    hoveredSolutionPage.name === solution.name
                                      ? "bg-[#339CFF] text-white"
                                      : "bg-muted text-muted-foreground"
                                  )}>
                                    <solution.icon className="h-4 w-4" />
                                  </div>
                                  <span className={cn(
                                    "font-medium text-sm transition-colors",
                                    hoveredSolutionPage.name === solution.name
                                      ? "text-foreground"
                                      : "text-foreground"
                                  )}>
                                    {solution.name}
                                  </span>
                                  <ChevronRight className={cn(
                                    "h-4 w-4 ml-auto transition-all",
                                    hoveredSolutionPage.name === solution.name
                                      ? "text-[#339CFF] opacity-100"
                                      : "text-muted-foreground opacity-0 group-hover:opacity-100"
                                  )} />
                                </Link>
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </div>

                        {/* Right Column - Solution Details */}
                        <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100/30 dark:from-muted dark:to-muted">
                          <div className="flex items-start gap-4 mb-6">
                            <div className="p-3 rounded-xl bg-[#339CFF] shadow-lg">
                              <hoveredSolutionPage.icon className="h-7 w-7 text-white" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-foreground mb-2 text-left">
                                {hoveredSolutionPage.name}
                              </h3>
                              <p className="text-muted-foreground text-sm leading-relaxed">
                                {hoveredSolutionPage.description}
                              </p>
                            </div>
                          </div>

                          <Separator className="my-6 bg-border" />

                          <div className="space-y-3 mb-6">
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                              Key Benefits
                            </h4>
                            {hoveredSolutionPage.features.map((feature, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#339CFF] flex-shrink-0" />
                                <span className="text-sm text-foreground leading-relaxed">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>

                          <Link
                            to={hoveredSolutionPage.href}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#339CFF] hover:gap-3 transition-all group"
                          >
                            Learn more
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Products Mega Menu */}
              <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className="text-foreground text-base font-medium hover:text-foreground hover:underline transition-colors px-3 py-2 data-[state=open]:text-foreground"
                  >
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-[100]">
                    <div className="rounded-2xl shadow-2xl bg-background overflow-hidden border border-border w-[900px]">
                      <div className="grid grid-cols-[400px_auto] gap-0">
                              {/* Left Column - Product List */}
                              <div className="bg-muted p-6 border-r border-border">
                                <h3 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider px-3">
                                  Our Products
                                </h3>
                                <div className="space-y-1">
                                  {products.map((product) => (
                                    <NavigationMenuLink key={product.name} asChild>
                                      <Link
                                        to={product.href}
                                        onMouseEnter={() => setHoveredProduct(product)}
                                        className={cn(
                                          "flex items-center gap-3 px-3 py-3 rounded-lg transition-all group",
                                          hoveredProduct.name === product.name
                                            ? "bg-blue-100 dark:bg-muted"
                                            : "hover:bg-muted"
                                        )}
                                      >
                                        <div className={cn(
                                          "p-1.5 rounded-md transition-colors flex-shrink-0",
                                          hoveredProduct.name === product.name
                                            ? "bg-[#339CFF] text-white"
                                            : "bg-muted text-muted-foreground"
                                        )}>
                                          <product.icon className="h-4 w-4" />
                                        </div>
                                        <span className={cn(
                                          "font-medium text-sm transition-colors",
                                          hoveredProduct.name === product.name
                                            ? "text-foreground"
                                            : "text-foreground"
                                        )}>
                                          {product.name}
                                        </span>
                                        <ChevronRight className={cn(
                                          "h-4 w-4 ml-auto transition-all",
                                          hoveredProduct.name === product.name
                                            ? "text-[#339CFF] opacity-100"
                                            : "text-muted-foreground opacity-0 group-hover:opacity-100"
                                        )} />
                                      </Link>
                                    </NavigationMenuLink>
                                  ))}
                                </div>
                              </div>

                              {/* Right Column - Product Details */}
                              <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100/30 dark:from-muted dark:to-muted">
                                <div className="flex items-start gap-4 mb-6">
                                  <div className="p-3 rounded-xl bg-[#339CFF] shadow-lg">
                                    <hoveredProduct.icon className="h-7 w-7 text-white" />
                                  </div>
                                  <div>
                                    <h3 className="text-xl font-bold text-foreground mb-2 text-left">
                                      {hoveredProduct.name}
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                      {hoveredProduct.description}
                                    </p>
                                  </div>
                                </div>

                                <Separator className="my-6 bg-border" />

                                <div className="space-y-3 mb-6">
                                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Key Features
                                  </h4>
                                  {hoveredProduct.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                      <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#339CFF] flex-shrink-0" />
                                      <span className="text-sm text-foreground leading-relaxed">
                                        {feature}
                                      </span>
                                    </div>
                                  ))}
                                </div>

                                <Link
                                  to={hoveredProduct.href}
                                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#339CFF] hover:gap-3 transition-all group"
                                >
                                  Learn more
                                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                               </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Company Mega Menu */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground text-base font-medium hover:text-foreground hover:underline transition-colors px-3 py-2 data-[state=open]:text-foreground">
                    Company
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-[100]">
                    <div className="rounded-2xl shadow-2xl bg-muted overflow-hidden border border-border w-[600px]">
                          <div className="p-6">
                            <div className="mb-5 px-3">
                              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-2 text-center">
                                Company
                              </h3>
                              <div className="h-0.5 w-48 bg-border rounded-full mx-auto"></div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {companyPages.map((page, index) => (
                                page.external ? (
                                  <a
                                    key={page.name}
                                    href={page.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onMouseEnter={() => setHoveredCompanyPage(page)}
                                    className={cn(
                                      "flex items-center gap-2 px-3 py-3 rounded-lg transition-all group",
                                      (hoveredCompanyPage.name === page.name || (index === 0 && hoveredCompanyPage === companyPages[0]))
                                        ? "bg-blue-100 dark:bg-muted"
                                        : "hover:bg-muted"
                                    )}
                                  >
                                    <div className={cn(
                                      "p-1.5 rounded-md transition-colors flex-shrink-0",
                                      (hoveredCompanyPage.name === page.name || (index === 0 && hoveredCompanyPage === companyPages[0]))
                                        ? "bg-[#339CFF] text-white"
                                        : "bg-muted text-muted-foreground"
                                    )}>
                                      <page.icon className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <span className={cn(
                                        "font-medium text-sm transition-colors block truncate text-left",
                                        (hoveredCompanyPage.name === page.name || (index === 0 && hoveredCompanyPage === companyPages[0]))
                                          ? "text-foreground"
                                          : "text-foreground"
                                      )}>
                                        {page.name}
                                      </span>
                                    </div>
                                  </a>
                                ) : (
                                  <NavigationMenuLink key={page.name} asChild>
                                    <Link
                                      to={page.href}
                                      onMouseEnter={() => setHoveredCompanyPage(page)}
                                      className={cn(
                                        "flex items-center gap-2 px-3 py-3 rounded-lg transition-all group",
                                        (hoveredCompanyPage.name === page.name || (index === 0 && hoveredCompanyPage === companyPages[0]))
                                          ? "bg-blue-100 dark:bg-muted"
                                          : "hover:bg-muted"
                                      )}
                                    >
                                      <div className={cn(
                                        "p-1.5 rounded-md transition-colors flex-shrink-0",
                                        (hoveredCompanyPage.name === page.name || (index === 0 && hoveredCompanyPage === companyPages[0]))
                                          ? "bg-[#339CFF] text-white"
                                          : "bg-muted text-muted-foreground"
                                      )}>
                                        <page.icon className="h-4 w-4" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <span className={cn(
                                          "font-medium text-sm transition-colors block truncate text-left",
                                          (hoveredCompanyPage.name === page.name || (index === 0 && hoveredCompanyPage === companyPages[0]))
                                            ? "text-foreground"
                                            : "text-foreground"
                                        )}>
                                          {page.name}
                                        </span>
                                      </div>
                                    </Link>
                                  </NavigationMenuLink>
                                )
                              ))}
                             </div>
                           </div>
                         </div>
                       </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    to="/faq"
                    className="text-foreground text-sm font-medium hover:text-foreground hover:underline transition-colors px-2 py-2"
                  >
                    FAQ
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Action Buttons - Right Aligned */}
          <div className="hidden lg:flex items-center space-x-3">
            <div className={loading ? "invisible" : ""}>
              {enableSelfSignup ? (
                <Button variant="blue" asChild>
                  <Link to="/signup-select">Sign Up Now</Link>
                </Button>
              ) : (
                <Button variant="blue" asChild>
                  <Link to="/request-demo">Request a Demo</Link>
                </Button>
              )}
            </div>
              <a
                href="https://app.gaapio.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground font-medium hover:text-foreground hover:underline transition-colors px-3 py-2"
              >
                Login
              </a>
              <ModeToggle />
            </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <ModeToggle />
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-muted-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
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
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-b border-border">

              {/* Solutions Section */}
              <div>
                <button
                  onClick={toggleSolutions}
                  className="w-full flex items-center justify-center px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <span>Solutions</span>
                  {isSolutionsOpen ? (
                    <ChevronDown className="h-4 w-4 ml-2" />
                  ) : (
                    <ChevronRight className="h-4 w-4 ml-2" />
                  )}
                </button>

                {/* Solutions Submenu */}
                {isSolutionsOpen && (
                  <div className="pl-4 space-y-1 mt-1">
                    {solutionPages.map((page) => (
                      <Link
                        key={page.name}
                        to={page.href}
                        className="block px-3 py-2 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
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
                  onClick={toggleProducts}
                  className="w-full flex items-center justify-center px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <span>Products</span>
                  {isProductsOpen ? (
                    <ChevronDown className="h-4 w-4 ml-2" />
                  ) : (
                    <ChevronRight className="h-4 w-4 ml-2" />
                  )}
                </button>

                {/* Products Submenu */}
                {isProductsOpen && (
                  <div className="pl-4 space-y-1 mt-1">
                    <Link
                      to="/accounting-memos"
                      className="block px-3 py-2 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
                      onClick={closeMenu}
                    >
                      Memos
                    </Link>
                    <Link
                      to="/footnote-disclosures"
                      className="block px-3 py-2 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
                      onClick={closeMenu}
                    >
                      Footnote Disclosures
                    </Link>
                    <Link
                      to="/contract-analysis"
                      className="block px-3 py-2 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
                      onClick={closeMenu}
                    >
                      Contract Analysis
                    </Link>
                    <Link
                      to="/guidance-updates"
                      className="block px-3 py-2 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
                      onClick={closeMenu}
                    >
                      Guidance Updates
                    </Link>
                  </div>
                )}
              </div>

              {/* Company Section */}
              <div>
                <button
                  onClick={toggleCompany}
                  className="w-full flex items-center justify-center px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <span>Company</span>
                  {isCompanyOpen ? (
                    <ChevronDown className="h-4 w-4 ml-2" />
                  ) : (
                    <ChevronRight className="h-4 w-4 ml-2" />
                  )}
                </button>

                {/* Company Submenu */}
                {isCompanyOpen && (
                  <div className="pl-4 space-y-1 mt-1">
                    {companyPages.map((page) => (
                      page.external ? (
                        <a
                          key={page.name}
                          href={page.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                          onClick={closeMenu}
                        >
                          {page.name}
                        </a>
                      ) : (
                        <Link
                          key={page.name}
                          to={page.href}
                          className="block px-3 py-2 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
                          onClick={closeMenu}
                        >
                          {page.name}
                        </Link>
                      )
                    ))}
                  </div>
                )}
              </div>
              <Link
                to="/faq"
                className="block px-3 py-2 rounded-md text-base font-medium text-center transition-colors text-foreground hover:text-foreground hover:bg-muted"
                onClick={closeMenu}
              >
                FAQ
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-center transition-colors text-foreground hover:text-foreground hover:bg-muted"
                onClick={closeMenu}
              >
                Contact
              </Link>

              {/* Demo button and Login for mobile */}
              <div className="pt-4 pb-3 border-t border-border">
                <div className="mt-3 px-3 space-y-3">
                  <div className={loading ? "invisible" : ""}>
                    {enableSelfSignup ? (
                      <Button variant="blue" asChild className="w-full">
                        <Link to="/signup-select" onClick={closeMenu}>Sign Up Now</Link>
                      </Button>
                    ) : (
                      <Button variant="blue" asChild className="w-full">
                        <Link to="/request-demo" onClick={closeMenu}>Request a Demo</Link>
                      </Button>
                    )}
                  </div>
                  <a
                    href="https://app.gaapio.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 rounded-md text-base font-medium text-center text-foreground hover:text-foreground hover:bg-muted transition-colors"
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
