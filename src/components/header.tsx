import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { Logo } from "@/components/logo";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [enableSelfSignup, setEnableSelfSignup] = useState(true);

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
          <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-6">
              <Link 
                to="/accounting-memos" 
                className="text-gray-700 dark:text-gray-200 text-base font-medium hover:text-gray-900 dark:hover:text-white hover:underline transition-colors"
              >
                Products
              </Link>
              <Link 
                to="/about-us" 
                className="text-gray-700 dark:text-gray-200 text-base font-medium hover:text-gray-900 dark:hover:text-white hover:underline transition-colors"
              >
                Company
              </Link>
              <Link 
                to="/faq" 
                className="text-gray-700 dark:text-gray-200 text-base font-medium hover:text-gray-900 dark:hover:text-white hover:underline transition-colors"
              >
                FAQ
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 dark:text-gray-200 text-base font-medium hover:text-gray-900 dark:hover:text-white hover:underline transition-colors"
              >
                Contact
              </Link>
            </div>
          </nav>

          {/* Action Buttons - Right Aligned */}
          <div className="hidden md:flex items-center space-x-4">
            <ModeToggle />
            <Link to="/request-demo">
              <Button variant="default" size="sm">
                Request a Demo
              </Button>
            </Link>
            <Link to="/login" className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white font-medium">
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ModeToggle />
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
              <Link
                to="/accounting-memos"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={closeMenu}
              >
                Products
              </Link>
              <Link
                to="/about-us"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={closeMenu}
              >
                Company
              </Link>
              <Link
                to="/faq"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={closeMenu}
              >
                FAQ
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={closeMenu}
              >
                Contact
              </Link>
              <Link
                to="/request-demo"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={closeMenu}
              >
                Request a Demo
              </Link>
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={closeMenu}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
