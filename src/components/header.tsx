import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { Logo } from "@/components/logo";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight, FileText, FileCheck, FileSearch, Bell, ArrowRight, Lightbulb, Users, ShieldCheck, Briefcase, Brain } from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const products = [
  {
    name: "Research/Internal GPT",
    href: "/research-gpt",
    icon: Brain,
    description: "Your firm's AI-powered research assistant",
    features: ["Internal knowledge base search", "Natural language queries", "Contextual answers from your firm's documents"],
  },
  {
    name: "Accounting Memos",
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
                  <NavigationMenuContent className="!w-screen">
                    <div className="w-full px-4 py-6">
                      <div className="max-w-7xl mx-auto">
                         <div className="rounded-xl border border-gray-200 shadow-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700 overflow-hidden">
                            <div className="grid grid-cols-2 gap-0 overflow-hidden">
                              {/* Left Column - Product Navigation */}
                               <div className="p-8 bg-white dark:bg-gray-800 shadow-[4px_0_16px_-8px_rgba(0,0,0,0.1)]">
                                 <h3 className="text-xs font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                                   <div className="h-1 w-10 bg-[#339CFF] rounded-full"></div>
                                   Our Products
                                 </h3>
                               <div className="space-y-1">
                                {products.map((product) => (
                                  <NavigationMenuLink key={product.name} asChild>
                                    <Link
                                      to={product.href}
                                      onMouseEnter={() => setHoveredProduct(product)}
                                       className={cn(
                                         "flex items-start gap-4 p-4 rounded-xl transition-all group",
                                         "hover:bg-blue-50/80 dark:hover:bg-blue-900/20",
                                         hoveredProduct.name === product.name && "bg-blue-50/80 dark:bg-blue-900/20 shadow-sm"
                                       )}
                                    >
                                       <div className={cn(
                                         "p-2.5 rounded-xl transition-all",
                                         hoveredProduct.name === product.name 
                                           ? "bg-[#339CFF] shadow-md scale-105" 
                                           : "bg-gray-100 dark:bg-gray-700 group-hover:bg-[#339CFF] group-hover:shadow-md group-hover:scale-105"
                                       )}>
                                         <product.icon className={cn(
                                           "h-5 w-5 transition-colors",
                                           hoveredProduct.name === product.name
                                             ? "text-white"
                                             : "text-gray-600 dark:text-gray-300 group-hover:text-white"
                                         )} />
                                       </div>
                                       <div className="flex-1">
                                         <div className="font-semibold text-gray-900 dark:text-white transition-colors mb-0.5">
                                           {product.name}
                                         </div>
                                         <div className="text-sm text-gray-600 dark:text-gray-400">
                                           {product.description}
                                         </div>
                                      </div>
                                      <ChevronRight className={cn(
                                        "h-4 w-4 text-[#339CFF] transition-all",
                                        hoveredProduct.name === product.name ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                                      )} />
                                    </Link>
                                  </NavigationMenuLink>
                                ))}
                              </div>
                            </div>

                             {/* Right Column - Product Details */}
                             <div className="p-8 bg-gradient-to-br from-[hsl(207,85%,88%)] to-[hsl(207,85%,92%)] dark:from-[hsl(207,60%,18%)] dark:to-[hsl(207,55%,15%)]">
                               <div className="flex items-start gap-4 mb-8">
                                 <div className="p-3.5 rounded-2xl bg-[#339CFF] shadow-lg ring-4 ring-white/50 dark:ring-black/20">
                                   <hoveredProduct.icon className="h-8 w-8 text-white" />
                                 </div>
                                 <div>
                                   <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                     {hoveredProduct.name}
                                   </h3>
                                   <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                     {hoveredProduct.description}
                                   </p>
                                </div>
                              </div>

                               <div className="space-y-4 mb-8">
                                 <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">
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
                                 className="inline-flex items-center gap-2 text-sm font-semibold text-[#339CFF] dark:text-[#4DB0FF] hover:gap-3 transition-all group bg-white/80 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800/80 px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md"
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
                  <NavigationMenuContent className="!w-screen">
                    <div className="w-full px-4 py-6">
                      <div className="max-w-7xl mx-auto">
                        <div className="rounded-xl border border-blue-200 shadow-2xl bg-gradient-to-br from-blue-400 to-blue-500 dark:from-blue-500 dark:to-blue-600 dark:border-blue-300/20 overflow-hidden">
                          <div className="grid grid-cols-5 gap-0">
                            {/* Left Column - Company Pages */}
                            <div className="col-span-3 border-r border-blue-300/40 dark:border-blue-400/30 p-8 bg-gradient-to-br from-blue-300/30 to-transparent">
                              <h3 className="text-xs font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                                <div className="h-1 w-8 bg-white rounded-full"></div>
                                Company
                              </h3>
                              <div className="space-y-2">
                                {companyPages.map((page) => (
                                  page.external ? (
                                    <a
                                      key={page.name}
                                      href={page.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="group flex items-start gap-4 p-4 rounded-lg transition-all hover:bg-white/20"
                                      onMouseEnter={() => setHoveredCompanyPage(page)}
                                    >
                                      <div className="p-2 rounded-lg transition-colors bg-white/60 group-hover:bg-white group-hover:shadow-lg">
                                        <page.icon className="h-5 w-5 text-blue-400 group-hover:text-blue-500 transition-colors" />
                                      </div>
                                      <div className="flex-1">
                                        <h4 className="font-semibold text-white mb-1 group-hover:text-white">
                                          {page.name}
                                        </h4>
                                        <p className="text-sm text-blue-100">
                                          {page.description}
                                        </p>
                                      </div>
                                    </a>
                                  ) : (
                                    <Link
                                      key={page.name}
                                      to={page.href}
                                      className="group flex items-start gap-4 p-4 rounded-lg transition-all hover:bg-white/20"
                                      onMouseEnter={() => setHoveredCompanyPage(page)}
                                    >
                                      <div className="p-2 rounded-lg transition-colors bg-white/60 group-hover:bg-white group-hover:shadow-lg">
                                        <page.icon className="h-5 w-5 text-blue-400 group-hover:text-blue-500 transition-colors" />
                                      </div>
                                      <div className="flex-1">
                                        <h4 className="font-semibold text-white mb-1 group-hover:text-white">
                                          {page.name}
                                        </h4>
                                        <p className="text-sm text-blue-100">
                                          {page.description}
                                        </p>
                                      </div>
                                    </Link>
                                  )
                                ))}
                              </div>
                            </div>

                            {/* Right Column - Featured Content */}
                            <div className="col-span-2 p-8 bg-gradient-to-br from-blue-500/50 to-transparent">
                              <div className="flex items-start gap-4 mb-6">
                                <div className="p-3 rounded-xl bg-white shadow-lg">
                                  <hoveredCompanyPage.icon className="h-8 w-8 text-blue-500" />
                                </div>
                                <div>
                                  <h3 className="text-xl font-bold text-white mb-2">
                                    {hoveredCompanyPage.name}
                                  </h3>
                                  <p className="text-blue-100 text-sm leading-relaxed">
                                    {hoveredCompanyPage.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
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
                      Accounting Memos
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
