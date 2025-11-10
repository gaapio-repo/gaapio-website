import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { Logo } from "@/components/logo";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight, FileText, FileCheck, FileSearch, Bell, ArrowRight, Lightbulb, Users, ShieldCheck, Briefcase, Brain, Shield } from "lucide-react";
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
    features: ["Search Big 4 accounting guides and technical resources", "Natural language queries across comprehensive knowledge base", "Internal GPT (coming soon)"],
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
    name: "Trust and Security",
    href: "https://security.gaapio.com",
    icon: ShieldCheck,
    description: "Our commitment to security and compliance",
    external: true
  },
  {
    name: "Careers",
    href: "/careers",
    icon: Briefcase,
    description: "Join our team and help shape the future"
  }
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [enableSelfSignup, setEnableSelfSignup] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState(products[0]);
  const [hoveredCompanyPage, setHoveredCompanyPage] = useState(companyPages[0]);

  useEffect(() => {
    const savedSetting = localStorage.getItem("enableSelfSignup");
    setEnableSelfSignup(savedSetting !== null ? savedSetting === "true" : true);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "enableSelfSignup") {
        const newSetting = e.newValue !== null ? e.newValue === "true" : true;
        setEnableSelfSignup(newSetting);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsProductsOpen(false);
  };

  const toggleProducts = () => {
    setIsProductsOpen(!isProductsOpen);
  };

  const toggleCompany = () => {
    setIsCompanyOpen(!isCompanyOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" onClick={closeMenu}>
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center space-x-4">
                {/* Products Mega Menu */}
              <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className="text-gray-700 dark:text-gray-200 text-base font-medium hover:text-gray-900 dark:hover:text-white hover:underline transition-colors px-3 py-2 data-[state=open]:text-gray-900 dark:data-[state=open]:text-white"
                  >
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-[100]">
                    <div className="rounded-2xl shadow-2xl bg-white dark:bg-gray-900 overflow-hidden border border-gray-200 dark:border-gray-800 w-[900px]">
                      <div className="grid grid-cols-[400px_auto] gap-0">
                              {/* Left Column - Product List */}
                              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 border-r border-gray-200 dark:border-gray-700">
                                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider px-3">
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
                                            ? "bg-blue-100 dark:bg-blue-900/30" 
                                            : "hover:bg-gray-100 dark:hover:bg-gray-700/50"
                                        )}
                                      >
                                        <div className={cn(
                                          "p-1.5 rounded-md transition-colors flex-shrink-0",
                                          hoveredProduct.name === product.name
                                            ? "bg-[#339CFF] text-white"
                                            : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                                        )}>
                                          <product.icon className="h-4 w-4" />
                                        </div>
                                        <span className={cn(
                                          "font-medium text-sm transition-colors",
                                          hoveredProduct.name === product.name
                                            ? "text-gray-900 dark:text-white"
                                            : "text-gray-700 dark:text-gray-300"
                                        )}>
                                          {product.name}
                                        </span>
                                        <ChevronRight className={cn(
                                          "h-4 w-4 ml-auto transition-all",
                                          hoveredProduct.name === product.name
                                            ? "text-[#339CFF] opacity-100"
                                            : "text-gray-400 opacity-0 group-hover:opacity-100"
                                        )} />
                                      </Link>
                                    </NavigationMenuLink>
                                  ))}
                                </div>
                              </div>

                              {/* Right Column - Product Details */}
                              <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100/30 dark:from-blue-950/50 dark:to-blue-900/20">
                                <div className="flex items-start gap-4 mb-6">
                                  <div className="p-3 rounded-xl bg-[#339CFF] shadow-lg">
                                    <hoveredProduct.icon className="h-7 w-7 text-white" />
                                  </div>
                                  <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                      {hoveredProduct.name}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                      {hoveredProduct.description}
                                    </p>
                                  </div>
                                </div>

                                <Separator className="my-6 bg-gray-200 dark:bg-gray-700" />

                                <div className="space-y-3 mb-6">
                                  <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Key Features
                                  </h4>
                                  {hoveredProduct.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                      <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#339CFF] flex-shrink-0" />
                                      <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
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
                  <NavigationMenuTrigger className="text-gray-700 dark:text-gray-200 text-base font-medium hover:text-gray-900 dark:hover:text-white hover:underline transition-colors px-3 py-2 data-[state=open]:text-gray-900 dark:data-[state=open]:text-white">
                    Company
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-[100]">
                    <div className="rounded-2xl shadow-2xl bg-gray-50 dark:bg-gray-800/50 overflow-hidden border border-gray-200 dark:border-gray-800 min-h-[400px] w-[600px]">
                          <div className="p-6">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-5 uppercase tracking-wider px-3">
                              Company
                            </h3>
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
                                      "flex items-center gap-3 px-3 py-3 rounded-lg transition-all group",
                                      (hoveredCompanyPage.name === page.name || (index === 0 && hoveredCompanyPage === companyPages[0]))
                                        ? "bg-blue-100 dark:bg-blue-900/30"
                                        : "hover:bg-gray-100 dark:hover:bg-gray-700/50"
                                    )}
                                  >
                                    <div className={cn(
                                      "p-1.5 rounded-md transition-colors flex-shrink-0",
                                      (hoveredCompanyPage.name === page.name || (index === 0 && hoveredCompanyPage === companyPages[0]))
                                        ? "bg-[#339CFF] text-white"
                                        : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                                    )}>
                                      <page.icon className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <span className={cn(
                                        "font-medium text-sm transition-colors block truncate",
                                        (hoveredCompanyPage.name === page.name || (index === 0 && hoveredCompanyPage === companyPages[0]))
                                          ? "text-gray-900 dark:text-white"
                                          : "text-gray-700 dark:text-gray-300"
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
                                        "flex items-center gap-3 px-3 py-3 rounded-lg transition-all group",
                                        (hoveredCompanyPage.name === page.name || (index === 0 && hoveredCompanyPage === companyPages[0]))
                                          ? "bg-blue-100 dark:bg-blue-900/30"
                                          : "hover:bg-gray-100 dark:hover:bg-gray-700/50"
                                      )}
                                    >
                                      <div className={cn(
                                        "p-1.5 rounded-md transition-colors flex-shrink-0",
                                        (hoveredCompanyPage.name === page.name || (index === 0 && hoveredCompanyPage === companyPages[0]))
                                          ? "bg-[#339CFF] text-white"
                                          : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                                      )}>
                                        <page.icon className="h-4 w-4" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <span className={cn(
                                          "font-medium text-sm transition-colors block truncate",
                                          (hoveredCompanyPage.name === page.name || (index === 0 && hoveredCompanyPage === companyPages[0]))
                                            ? "text-gray-900 dark:text-white"
                                            : "text-gray-700 dark:text-gray-300"
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
                    className="text-gray-700 dark:text-gray-200 font-medium hover:text-gray-900 dark:hover:text-white hover:underline transition-colors px-3 py-2"
                  >
                    FAQ
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link 
                    to="/contact" 
                    className="text-gray-700 dark:text-gray-200 font-medium hover:text-gray-900 dark:hover:text-white hover:underline transition-colors px-3 py-2"
                  >
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Action Buttons - Right Aligned */}
          <div className="hidden md:flex items-center space-x-4">
              <Button variant="blue" asChild>
              <Link to="/request-demo">Request a Demo</Link>
              </Button>
              <a 
                href="https://app.gaapio.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-200 font-medium hover:text-gray-900 dark:hover:text-white hover:underline transition-colors px-3 py-2"
              >
                Login
              </a>
              <ModeToggle />
            </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ModeToggle />
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
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
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              
              {/* Products Section */}
              <div>
                <button
                  onClick={toggleProducts}
                  className="w-full flex items-center justify-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
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
                      className="block px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                      onClick={closeMenu}
                    >
                      Memos
                    </Link>
                    <Link
                      to="/footnote-disclosures"
                      className="block px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                      onClick={closeMenu}
                    >
                      Footnote Disclosures
                    </Link>
                    <Link
                      to="/contract-analysis"
                      className="block px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                      onClick={closeMenu}
                    >
                      Contract Analysis
                    </Link>
                    <Link
                      to="/guidance-updates"
                      className="block px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
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
                  className="w-full flex items-center justify-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
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
                    ))}
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
              
              {/* Demo button and Login for mobile */}
              <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
                <div className="mt-3 px-3 space-y-3">
                  <Button variant="blue" asChild className="w-full">
                    <Link to="/request-demo" onClick={closeMenu}>Request a Demo</Link>
                  </Button>
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