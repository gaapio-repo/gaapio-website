/**
 * Centralized SEO Configuration
 * 
 * This file contains the actual SEO metadata for all pages.
 * The PageEditor reads from this config to show accurate SEO information.
 * 
 * NOTE: This config mirrors the <SEO /> component props used in each page.
 * To change actual SEO, update both this file AND the page's <SEO /> component.
 */

export interface PageSeoData {
  path: string;
  title: string;
  seoTitle: string;
  description: string;
  keywords: string[];
  canonical: string;
  noindex?: boolean;
  structuredData?: string;
}

export const seoConfig: Record<string, PageSeoData> = {
  // ============================================
  // PRODUCT PAGES
  // ============================================
  "/": {
    path: "/",
    title: "Home Page",
    seoTitle: "Gaapio - AI-Powered Technical Accounting Platform",
    description: "AI-powered platform built by CPAs for CPAs. Create technical accounting memos, footnote disclosures, contract analysis, and compliance documentation faster and more accurately.",
    keywords: ["technical accounting software", "AI accounting memos", "CPA tools", "ASC 606", "ASC 842", "footnote disclosures"],
    canonical: "/",
    structuredData: "SoftwareApplicationSchema"
  },
  "/accounting-memos": {
    path: "/accounting-memos",
    title: "Accounting Memos",
    seoTitle: "AI-Powered Technical Accounting Memos - ASC 606, ASC 842 & More",
    description: "Create audit-ready technical accounting memos in minutes. AI-powered drafting for ASC 606, ASC 842, ASC 350, and complex transactions with version history.",
    keywords: ["technical accounting memos", "ASC 606 memo", "ASC 842 memo", "audit-ready documentation", "accounting memo software"],
    canonical: "/accounting-memos",
    structuredData: "ProductSchema"
  },
  "/footnote-disclosures": {
    path: "/footnote-disclosures",
    title: "Footnote Disclosures",
    seoTitle: "AI Footnote Disclosure Generator - Financial Statement Disclosures",
    description: "Generate complete footnote disclosures with AI-trained benchmarking. Requirement checklists, peer comparisons, and SEC-compliant disclosure drafting.",
    keywords: ["footnote disclosures", "financial statement notes", "SEC disclosures", "disclosure checklist", "10-K footnotes"],
    canonical: "/footnote-disclosures",
    structuredData: "ProductSchema"
  },
  "/contract-analysis": {
    path: "/contract-analysis",
    title: "Contract Analysis",
    seoTitle: "AI Contract Analysis for Revenue Recognition & Lease Accounting",
    description: "Automated contract analysis for ASC 606 revenue triggers and ASC 842 embedded lease identification. Upload contracts and get accounting conclusions in minutes.",
    keywords: ["contract analysis", "revenue recognition", "ASC 606 triggers", "embedded lease", "ASC 842 analysis"],
    canonical: "/contract-analysis",
    structuredData: "ProductSchema"
  },
  "/guidance-updates": {
    path: "/guidance-updates",
    title: "Guidance Updates",
    seoTitle: "Real-Time Accounting Guidance Updates - FASB, SEC, Big 4",
    description: "Daily monitoring of FASB, SEC, PCAOB, and Big 4 guidance. Get AI-powered impact summaries and stay ahead of accounting standard changes.",
    keywords: ["FASB updates", "SEC guidance", "accounting standards", "Big 4 guidance", "regulatory updates"],
    canonical: "/guidance-updates",
    structuredData: "ProductSchema"
  },
  "/research-gpt": {
    path: "/research-gpt",
    title: "ResearchGPT",
    seoTitle: "ResearchGPT - AI Accounting Research Assistant",
    description: "AI-powered research assistant for technical accounting questions. Get answers with citations to ASC, SEC guidance, and Big 4 resources.",
    keywords: ["accounting research", "AI research assistant", "ASC guidance", "SEC research", "technical accounting questions"],
    canonical: "/research-gpt",
    structuredData: "ProductSchema"
  },
  "/sox-controls": {
    path: "/sox-controls",
    title: "SOX Controls",
    seoTitle: "SOX Control Documentation - AI-Powered Compliance",
    description: "AI-powered SOX compliance documentation and control management. Streamline control narratives, testing documentation, and deficiency tracking.",
    keywords: ["SOX compliance", "internal controls", "SOX 404", "control documentation", "audit compliance"],
    canonical: "/sox-controls",
    structuredData: "ProductSchema"
  },

  // ============================================
  // SOLUTIONS PAGES
  // ============================================
  "/solutions/private": {
    path: "/solutions/private",
    title: "Private Company Solutions",
    seoTitle: "AI Accounting for Private Companies - Gaapio",
    description: "Technical accounting solutions designed for private companies. Streamline memos, disclosures, and compliance without Big 4 budgets.",
    keywords: ["private company accounting", "small business accounting", "technical accounting", "private company disclosures"],
    canonical: "/solutions/private",
    structuredData: "ProductSchema"
  },
  "/solutions/public": {
    path: "/solutions/public",
    title: "Public Company Solutions",
    seoTitle: "AI Accounting for Public Companies - SEC Compliance",
    description: "Enterprise-grade technical accounting for public companies. SEC-compliant disclosures, 10-K/10-Q support, and SOX documentation.",
    keywords: ["public company accounting", "SEC compliance", "10-K disclosures", "public company audit", "SOX compliance"],
    canonical: "/solutions/public",
    structuredData: "ProductSchema"
  },
  "/solutions/firm": {
    path: "/solutions/firm",
    title: "Accounting Firm Solutions",
    seoTitle: "AI Accounting Tools for CPA Firms - Multi-Client Platform",
    description: "Serve more clients with AI-powered accounting tools. Multi-client dashboards, standardized workflows, and firm-wide collaboration features.",
    keywords: ["CPA firm software", "accounting firm tools", "multi-client accounting", "audit firm software"],
    canonical: "/solutions/firm",
    structuredData: "ProductSchema"
  },

  // ============================================
  // CORE SITE PAGES
  // ============================================
  "/about-us": {
    path: "/about-us",
    title: "About Us",
    seoTitle: "About Gaapio - Built by Big 4 CPAs",
    description: "Gaapio was founded by Big 4 CPAs who experienced the pain of technical accounting firsthand. Meet our team and learn our mission.",
    keywords: ["about Gaapio", "accounting software company", "Big 4 CPAs", "accounting startup"],
    canonical: "/about-us",
    structuredData: "OrganizationSchema"
  },
  "/why-we-built-this": {
    path: "/why-we-built-this",
    title: "Why We Built This",
    seoTitle: "Why We Built Gaapio - Our Story",
    description: "Discover why Big 4 CPAs built Gaapio. From ASC standards adoption to AI innovation, learn about our mission to transform technical accounting.",
    keywords: ["Gaapio story", "accounting innovation", "CPA software origin", "technical accounting mission"],
    canonical: "/why-we-built-this"
  },
  "/contact": {
    path: "/contact",
    title: "Contact",
    seoTitle: "Contact Gaapio - Get in Touch",
    description: "Have questions about Gaapio? Contact our team for sales inquiries, support, or partnership opportunities. We'd love to hear from you.",
    keywords: ["contact Gaapio", "accounting software support", "sales inquiry"],
    canonical: "/contact"
  },
  "/faq": {
    path: "/faq",
    title: "FAQ",
    seoTitle: "Frequently Asked Questions - Gaapio",
    description: "Find answers to common questions about Gaapio's AI-powered accounting platform, pricing, security, and integrations.",
    keywords: ["Gaapio FAQ", "accounting software questions", "technical accounting help"],
    canonical: "/faq",
    structuredData: "FAQPageSchema"
  },
  "/careers": {
    path: "/careers",
    title: "Careers",
    seoTitle: "Careers at Gaapio - Join Our Team",
    description: "Join Gaapio and build the future of AI-powered accounting. We're hiring engineers, sales, and marketing professionals. Remote-first culture.",
    keywords: ["Gaapio careers", "accounting software jobs", "startup jobs", "remote accounting jobs"],
    canonical: "/careers"
  },
  "/resources": {
    path: "/resources",
    title: "Resources",
    seoTitle: "Accounting Resources - FASB, SEC, Big 4 Guidance",
    description: "Access curated accounting resources including SEC EDGAR, FASB Codification, and Big 4 guidance from Deloitte, PwC, EY, and KPMG.",
    keywords: ["accounting resources", "FASB codification", "SEC EDGAR", "Big 4 publications", "accounting guidance"],
    canonical: "/resources"
  },

  // ============================================
  // LEGAL & COMPLIANCE PAGES
  // ============================================
  "/privacy": {
    path: "/privacy",
    title: "Privacy Policy",
    seoTitle: "Privacy Policy - Gaapio Data Protection",
    description: "Learn how Gaapio protects your data. Our privacy policy covers data collection, usage, security, and your rights under GDPR and CCPA.",
    keywords: ["privacy policy", "data protection", "GDPR compliance", "accounting data security"],
    canonical: "/privacy"
  },
  "/terms-of-service": {
    path: "/terms-of-service",
    title: "Terms of Service",
    seoTitle: "Terms of Service - Gaapio",
    description: "Terms and conditions for using Gaapio's AI-powered accounting platform. Read our service terms, billing policies, and user responsibilities.",
    keywords: ["terms of service", "user agreement", "accounting software terms"],
    canonical: "/terms-of-service"
  },
  "/ssa": {
    path: "/ssa",
    title: "Subscription Agreement",
    seoTitle: "Subscription Services Agreement - Gaapio Terms",
    description: "Read the Gaapio Subscription Services Agreement governing access to our AI-powered accounting platform and related services.",
    keywords: ["subscription agreement", "SaaS terms", "software license"],
    canonical: "/ssa"
  },
  "/dpa": {
    path: "/dpa",
    title: "Data Processing Addendum",
    seoTitle: "Data Processing Addendum - GDPR Compliance",
    description: "Gaapio's Data Processing Addendum for GDPR compliance. Understand how we process data on behalf of enterprise customers.",
    keywords: ["DPA", "data processing", "GDPR", "enterprise data compliance"],
    canonical: "/dpa"
  },

  // ============================================
  // USER ACCESS & REGISTRATION PAGES
  // ============================================
  "/login": {
    path: "/login",
    title: "Login",
    seoTitle: "Admin Login - Gaapio",
    description: "Secure login portal for Gaapio administrators and team members.",
    keywords: ["login", "admin portal"],
    canonical: "/login",
    noindex: true
  },
  "/signup": {
    path: "/signup",
    title: "Sign Up",
    seoTitle: "Sign Up for Gaapio - AI Technical Accounting Platform",
    description: "Choose your Gaapio plan and start creating AI-powered accounting memos, disclosures, and compliance documentation today.",
    keywords: ["Gaapio signup", "accounting software trial", "get started"],
    canonical: "/signup"
  },
  "/firm-signup": {
    path: "/firm-signup",
    title: "Firm Signup",
    seoTitle: "CPA Firm Signup - Gaapio for Accounting Firms",
    description: "Get special pricing for your CPA firm. Contact our team to learn about multi-user discounts and enterprise features.",
    keywords: ["CPA firm pricing", "accounting firm signup", "enterprise accounting"],
    canonical: "/firm-signup"
  },

  // ============================================
  // DEMO & SALES PAGES
  // ============================================
  "/request-demo": {
    path: "/request-demo",
    title: "Request Demo",
    seoTitle: "Request a Demo - See Gaapio in Action",
    description: "Schedule a personalized demo of Gaapio's AI-powered accounting platform. See how we can transform your technical accounting workflow.",
    keywords: ["Gaapio demo", "accounting software demo", "product demo"],
    canonical: "/request-demo"
  },
  "/onepager": {
    path: "/onepager",
    title: "One Pager",
    seoTitle: "Gaapio One-Pager - Product Overview PDF",
    description: "Download the Gaapio one-pager for a quick overview of our AI-powered technical accounting platform and key capabilities.",
    keywords: ["Gaapio overview", "product summary", "accounting software PDF"],
    canonical: "/onepager"
  },

  // ============================================
  // FREE TOOLS
  // ============================================
  "/comment-letters": {
    path: "/comment-letters",
    title: "SEC Comment Letter Browser",
    seoTitle: "SEC Comment Letter Search — Free Tool by Gaapio",
    description: "Search and browse SEC comment letters with AI-powered summaries. Filter by ASC topic, year, industry, and letter type. Free, no login required.",
    keywords: ["SEC comment letters", "EDGAR", "SEC correspondence", "ASC topics", "accounting research", "SEC comment letter search tool"],
    canonical: "/comment-letters",
    structuredData: "DatasetSchema"
  },
  "/comment-letters/topics": {
    path: "/comment-letters/topics",
    title: "ASC Topics in SEC Comment Letters",
    seoTitle: "Browse SEC Comment Letters by ASC Topic — Gaapio",
    description: "Explore SEC comment letters organized by ASC Codification topic. See SEC scrutiny patterns across accounting standards.",
    keywords: ["ASC topics", "SEC comment letter topics", "accounting standards", "FASB ASC", "SEC scrutiny by topic"],
    canonical: "/comment-letters/topics"
  },

  // ============================================
  // BLOG & ARTICLES
  // ============================================
  "/blog": {
    path: "/blog",
    title: "Blog",
    seoTitle: "Gaapio Blog - Technical Accounting Insights",
    description: "Expert insights on technical accounting, AI in finance, ASC standards, and best practices for CPAs and accounting professionals.",
    keywords: ["accounting blog", "technical accounting articles", "CPA insights", "ASC standards blog"],
    canonical: "/blog"
  },
  "/blog/5-common-asc-606-pitfalls": {
    path: "/blog/5-common-asc-606-pitfalls",
    title: "ASC 606 Pitfalls",
    seoTitle: "5 Common ASC 606 Revenue Recognition Pitfalls",
    description: "Avoid costly mistakes with ASC 606. Learn the 5 most common revenue recognition pitfalls and how to address them properly.",
    keywords: ["ASC 606 pitfalls", "revenue recognition mistakes", "ASC 606 compliance"],
    canonical: "/blog/5-common-asc-606-pitfalls"
  },

  // ============================================
  // SYSTEM PAGES (noindex)
  // ============================================
  "/status": {
    path: "/status",
    title: "Status",
    seoTitle: "System Status - Gaapio Service Health",
    description: "Check the current operational status of Gaapio services including API, web application, and database systems.",
    keywords: ["system status", "service health"],
    canonical: "/status"
  },
  "/success": {
    path: "/success",
    title: "Success",
    seoTitle: "Subscription Successful - Gaapio",
    description: "Your Gaapio subscription is active. Welcome to AI-powered technical accounting.",
    keywords: [],
    canonical: "/success",
    noindex: true
  },
  "/cancel": {
    path: "/cancel",
    title: "Cancel",
    seoTitle: "Checkout Canceled - Gaapio",
    description: "Your checkout was not completed. Contact support or try again to subscribe to Gaapio.",
    keywords: [],
    canonical: "/cancel",
    noindex: true
  },
  "/404": {
    path: "/404",
    title: "Not Found (404)",
    seoTitle: "Page Not Found - Gaapio",
    description: "The page you're looking for doesn't exist. Return to the Gaapio homepage to explore our AI accounting tools.",
    keywords: [],
    canonical: "/404",
    noindex: true
  }
};

/**
 * Get SEO data for a specific page path
 */
export function getPageSeo(path: string): PageSeoData | undefined {
  return seoConfig[path];
}

/**
 * Get all page SEO entries
 */
export function getAllPageSeo(): PageSeoData[] {
  return Object.values(seoConfig);
}
