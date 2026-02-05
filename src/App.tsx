import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ProtectedLayout } from "./components/layout/ProtectedLayout";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { UnderConstructionPage } from "./components/UnderConstructionPage";
import { supabase } from "@/integrations/supabase/client";

// Pages
import Index from "./pages/Index";
import IndexAlt from "./pages/IndexAlt";
import AccountingMemos from "./pages/AccountingMemos";
import FootnoteDisclosures from "./pages/FootnoteDisclosures";
import ContractAnalysis from "./pages/ContractAnalysis";
import GuidanceUpdates from "./pages/GuidanceUpdates";
import ResearchGPT from "./pages/ResearchGPT";
import InternalGPT from "./pages/InternalGPT";
import SOXControls from "./pages/SOXControls";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import WhyWeBuiltThis from "./pages/WhyWeBuiltThis";
import Careers from "./pages/Careers";
import Resources from "./pages/Resources";
import FAQ from "./pages/FAQ";
import SignUp from "./pages/SignUp";
import SignupSelect from "./pages/SignupSelect";
import FirmSignup from "./pages/FirmSignup";
import RequestDemo from "./pages/RequestDemo";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import OnePager from "./pages/OnePager";
import Admin from "./pages/Admin";
import AdminUsers from "./pages/AdminUsers";
import PolicyDetail from "./pages/PolicyDetail";
import Status from "./pages/Status";
import Privacy from "./pages/Privacy";
import SSA from "./pages/SSA";
import TermsOfService from "./pages/TermsOfService";
import PrivateCompany from "./pages/solutions/PrivateCompany";
import PublicCompany from "./pages/solutions/PublicCompany";
import AccountingFirm from "./pages/solutions/AccountingFirm";

function App() {
  console.log("[App] Starting...");
  
  // Completely disable construction mode check - causing loading issues
  const isUnderConstruction = false;
  
  console.log("[App] Rendering routes...");

  return (
    <Router>
      <ScrollToTop />
      <ErrorBoundary fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center p-8 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Something went wrong</h2>
            <p className="mb-4">We're sorry, but an error has occurred.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
            >
              Reload page
            </button>
          </div>
        </div>
      }>
        <ProtectedLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home-alt" element={<IndexAlt />} />
            <Route path="/solutions/private" element={<PrivateCompany />} />
            <Route path="/solutions/public" element={<PublicCompany />} />
            <Route path="/solutions/firm" element={<AccountingFirm />} />
            <Route path="/accounting-memos" element={<AccountingMemos />} />
            <Route path="/footnote-disclosures" element={<FootnoteDisclosures />} />
            <Route path="/contract-analysis" element={<ContractAnalysis />} />
            <Route path="/guidance-updates" element={<GuidanceUpdates />} />
            <Route path="/research-gpt" element={<ResearchGPT />} />
            <Route path="/internal-gpt" element={<InternalGPT />} />
            <Route path="/sox-controls" element={<SOXControls />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/why-we-built-this" element={<WhyWeBuiltThis />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signup-select" element={<SignupSelect />} />
            <Route path="/firm-signup" element={<FirmSignup />} />
            <Route path="/request-demo" element={<RequestDemo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/one-pager" element={<OnePager />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/policy-detail" element={<PolicyDetail />} />
            <Route path="/status" element={<Status />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/dpa" element={<Privacy />} />
            <Route path="/ssa" element={<SSA />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ProtectedLayout>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
