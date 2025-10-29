import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { Logo } from "@/components/logo";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight, FileText, FileCheck, FileSearch, Bell, ArrowRight, Lightbulb, Users, ShieldCheck, Briefcase, Brain, Shield } from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const products = [
  {
    name: "Accounting Research",
    href: "/research-gpt",
    icon: Brain,
    description: "Your firm's AI-powered research assistant",
    features: ["Internal knowledge base search", "Natural language queries", "Contextual answers from your firm's documents"],
  },
  {
    name: "Memos",
    href: "/accounting-memos",
    icon: FileText,
    description: "AI-powered technical accounting memos",
    features: ["Automated memo generation", "ASC guidance integration", "Collaborative review workflow"],
  },
  {
    name: "Footnote Disclosures",
    href: "/footnote-disclosures",
    icon: FileCheck,
    description: "Generate compliant financial statement disclosures",
    features: ["SEC-compliant templates", "Real-time guidance updates", "Multi-standard support"],
  },
  {
    name: "Contract Analysis",
    href: "/contract-analysis",
    icon: FileSearch,
    description: "Extract key terms and analyze contracts instantly",
    features: ["AI-powered extraction", "Risk identification", "Revenue recognition analysis"],
  },
  {
    name: "Guidance Updates",
    href: "/guidance-updates",
    icon: Bell,
    description: "Stay current with the latest accounting standards",
    features: ["Real-time notifications", "Impact analysis", "Implementation guidance"],
  },
  {
    name: "SOX Controls (Coming Soon)",
    href: "/sox-controls",
    icon: Shield,
    description: "Streamline SOX compliance and control testing",
    features: ["Automated control testing", "Risk assessment workflows", "Compliance documentation"],
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
  const location = useLocation();

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

  const isActive = (path: string) => location.pathname === path;

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
                  <NavigationMenuContent className="!w-screen z-[100]">
                    <div className="w-full px-4 py-6">
                      <div className="max-w-6xl mx-auto">
                         <div className="rounded-2xl shadow-2xl bg-white dark:bg-gray-900 overflow-hidden border border-gray-200 dark:border-gray-800">
                            <div className="grid grid-cols-[400px_1fr] gap-0">
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
                              <div className="p-8 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/10 dark:to-transparent">
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
                    <div className="w-auto px-4 py-4">
                      <div className="rounded-xl shadow-xl bg-white dark:bg-gray-900 overflow-hidden border border-gray-200 dark:border-gray-800 p-4">
                        <div className="grid grid-cols-2 gap-2 w-[480px]">
                          {companyPages.map((page) => (
                            page.external ? (
                              <a
                                key={page.name}
                                href={page.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-3 p-4 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                              >
                                <div className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-[#339CFF] group-hover:text-white transition-colors flex-shrink-0">
                                  <page.icon className="h-5 w-5" />
                                </div>
                                <div>
                                  <div className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                                    {page.name}
                                  </div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {page.description}
                                  </p>
                                </div>
                              </a>
                            ) : (
                              <NavigationMenuLink key={page.name} asChild>
                                <Link
                                  to={page.href}
                                  className="flex items-start gap-3 p-4 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                                >
                                  <div className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-[#339CFF] group-hover:text-white transition-colors flex-shrink-0">
                                    <page.icon className="h-5 w-5" />
                                  </div>
                                  <div>
                                    <div className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                                      {page.name}
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                      {page.description}
                                    </p>
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
                      className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/accounting-memos') ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                      onClick={closeMenu}
                    >
                      Memos
                    </Link>
                    <Link
                      to="/footnote-disclosures"
                      className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/footnote-disclosures') ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                      onClick={closeMenu}
                    >
                      Footnote Disclosures
                    </Link>
                    <Link
                      to="/contract-analysis"
                      className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/contract-analysis') ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                      onClick={closeMenu}
                    >
                      Contract Analysis
                    </Link>
                    <Link
                      to="/guidance-updates"
                      className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/guidance-updates') ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'}`}
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
                          className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(page.href) ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'}`}
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
                className={`block px-3 py-2 rounded-md text-base font-medium text-center transition-colors ${isActive('/faq') ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                onClick={closeMenu}
              >
                FAQ
              </Link>
              <Link
                to="/contact"
                className={`block px-3 py-2 rounded-md text-base font-medium text-center transition-colors ${isActive('/contact') ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'}`}
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
