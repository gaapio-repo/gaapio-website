import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useRef, type MouseEvent as ReactMouseEvent } from "react";
import { GradientBackground } from "@/components/home/GradientBackground";
import { TrustBarSection } from "@/components/home/TrustBarSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { FirmModulesSection } from "@/components/solutions/FirmModulesSection";
import { FirmTiersSection } from "@/components/solutions/FirmTiersSection";
import { ClipboardCheck, FileCheck, BookOpen, GraduationCap, TrendingUp, Lock, Shield, Database, FileLock } from "lucide-react";
import { SEO } from "@/components/SEO";
import { ServiceSchema } from "@/components/StructuredData";
import { cn } from "@/lib/utils";

// Audit-specific hero mockup — engagement workpaper view with reviewer comment
const HeroScreenshotMockup = () => (
  <div className="w-full max-w-xl mx-auto relative">
    {/* Floating reviewer-ready badge */}
    <div className="absolute -top-4 -right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500 text-white text-[11px] font-semibold shadow-lg shadow-green-500/30">
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      Reviewer Ready
    </div>

    <div className="bg-white rounded-xl border border-gray-200 shadow-2xl overflow-hidden">
      {/* Window chrome */}
      <div className="bg-gray-50 px-4 py-2.5 flex items-center gap-3 border-b border-gray-200">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 text-[11px] font-medium text-gray-500 truncate">
          Acme Holdings — Q4 Audit / Revenue Memo
        </div>
        <div className="w-4 h-4 rounded bg-gray-200" />
      </div>

      {/* App content */}
      <div className="flex">
        {/* Left rail — engagement phases */}
        <div className="w-2/5 border-r border-gray-200 p-4 bg-gray-50/50 text-[10px]">
          <div className="text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-3">
            Engagement
          </div>
          <div className="space-y-2.5">
            {[
              { label: "Planning", state: "done" },
              { label: "Fieldwork", state: "done" },
              { label: "Technical Review", state: "active" },
              { label: "Partner Sign-Off", state: "todo" },
            ].map((step) => (
              <div key={step.label} className="flex items-center gap-2">
                {step.state === "done" && (
                  <div className="w-3.5 h-3.5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                {step.state === "active" && (
                  <div className="w-3.5 h-3.5 rounded-full bg-[#0099FF] border-2 border-white shadow-[0_0_0_2px_rgba(0,153,255,0.4)] flex-shrink-0" />
                )}
                {step.state === "todo" && (
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300 flex-shrink-0" />
                )}
                <span className={step.state === "active" ? "font-semibold text-gray-900" : step.state === "done" ? "text-gray-500 line-through" : "text-gray-400"}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          {/* Mini stats */}
          <div className="mt-5 pt-4 border-t border-gray-200 grid grid-cols-2 gap-2 text-[9px]">
            <div>
              <div className="font-bold text-gray-900 text-sm">12</div>
              <div className="text-gray-500">memos</div>
            </div>
            <div>
              <div className="font-bold text-gray-900 text-sm">48</div>
              <div className="text-gray-500">citations</div>
            </div>
          </div>
        </div>

        {/* Right — memo content */}
        <div className="flex-1 p-4 space-y-3 text-[10px]">
          {/* Memo header */}
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#0099FF]">
                ASC 606 Memo
              </span>
            </div>
            <div className="text-[9px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-medium">
              Draft v3
            </div>
          </div>

          {/* Memo paragraphs with citation highlight */}
          <div className="space-y-1.5">
            <div className="h-1.5 bg-gray-200 rounded w-full" />
            <div className="h-1.5 bg-gray-200 rounded w-11/12" />
            <div className="h-1.5 bg-gray-200 rounded w-4/5" />
            {/* Highlighted citation */}
            <div className="my-2 inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#0099FF]/10 border border-[#0099FF]/30 text-[9px]">
              <span className="font-mono font-semibold text-[#0099FF]">ASC 606-10-25-1</span>
              <span className="text-gray-600">· Contract existence</span>
            </div>
            <div className="h-1.5 bg-gray-200 rounded w-full" />
            <div className="h-1.5 bg-gray-200 rounded w-10/12" />
            <div className="h-1.5 bg-gray-200 rounded w-9/12" />
          </div>

          {/* Reviewer comment bubble */}
          <div className="mt-3 p-2.5 rounded-lg bg-[#0099FF]/5 border border-[#0099FF]/20">
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="w-4 h-4 rounded-full bg-[#0099FF] flex items-center justify-center text-white text-[8px] font-bold">
                K
              </div>
              <span className="text-[9px] font-semibold text-gray-700">Partner · Review</span>
            </div>
            <div className="space-y-1">
              <div className="h-1 bg-gray-300 rounded w-full" />
              <div className="h-1 bg-gray-300 rounded w-4/5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Primary "hero" pillar — the main value statement
const heroPillar = {
  category: "Technical Accounting at Scale",
  headline: "The work only your best seniors can do — now running across every engagement.",
  description:
    "Complex technical accounting used to bottleneck on a handful of experts. Gaapio embeds that judgment into every memo, every engagement, every client — so the hard work gets done faster without losing depth.",
  topics: [
    "Revenue recognition (ASC 606)",
    "Lease accounting (ASC 842)",
    "Debt & equity analysis",
    "Business combinations",
    "Stock compensation",
    "Going concern support",
    "Impairment analyses",
    "Complex consultations",
  ],
};

// Supporting pillars — 4 in a 2x2 grid below the hero pillar
const supportingPillars = [
  {
    icon: FileCheck,
    title: "Reviewer-Ready Memos & Workpapers",
    description:
      "Cleaner first drafts. Stronger documentation. Consistent outputs firmwide — so partners spend review time on judgment, not rewriting.",
  },
  {
    icon: BookOpen,
    title: "Footnote Disclosure Support",
    description:
      "Turn disclosure prep from annual scramble into managed process — checklists, benchmarking, and drafting for every client, every year.",
  },
  {
    icon: GraduationCap,
    title: "Upskill Staff Faster",
    description:
      "A system that teaches while your people work — embedded citations, structured outputs, and defensible conclusions that level up associates engagement by engagement.",
  },
  {
    icon: TrendingUp,
    title: "Expand Advisory Revenue",
    description:
      "Profitably deliver technical accounting advisory services that previously required scarce senior experts. Scale what was unscalable.",
  },
];

const securityItems = [
  {
    icon: Shield,
    title: "Private by Design",
    description: "Your client data never trains public AI models. Isolated workspaces per firm.",
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "TLS in transit, AES-256 at rest. Keys managed, rotated, and audited.",
  },
  {
    icon: FileLock,
    title: "Access Controls",
    description: "Role-based permissions, SSO, and complete audit logs for every action.",
  },
  {
    icon: Database,
    title: "SOC 2–Aligned",
    description: "Infrastructure and controls built to SOC 2 standards — ready for your vendor review.",
  },
];

// Premium card with mouse-tracking spotlight
const PillarCard = ({
  pillar,
  index,
}: {
  pillar: { icon: typeof Shield; title: string; description: string };
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = pillar.icon;

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative flex flex-col p-8 lg:p-10 rounded-2xl overflow-hidden isolate",
        "bg-background/80 backdrop-blur-xl",
        "border border-border/80",
        "shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-8px_rgba(15,23,42,0.08)]",
        "dark:shadow-[0_1px_2px_rgba(0,0,0,0.4),0_8px_24px_-8px_rgba(0,0,0,0.5)]",
        "transition-[transform,box-shadow,border-color] duration-500 ease-out",
        "hover:-translate-y-1.5",
        "hover:border-[#0099FF]/40",
        "hover:shadow-[0_0_0_1px_rgba(0,153,255,0.2),0_32px_64px_-16px_rgba(0,153,255,0.3)]",
        "dark:hover:shadow-[0_0_0_1px_rgba(0,153,255,0.35),0_32px_64px_-16px_rgba(0,153,255,0.5)]"
      )}
    >
      {/* Mouse-tracking spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
        style={{
          background:
            "radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgba(0,153,255,0.10), transparent 45%)",
        }}
      />

      {/* Top edge gradient highlight */}
      <div
        className="pointer-events-none absolute inset-x-6 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(0,153,255,0.6), transparent)",
        }}
      />

      {/* Corner aurora */}
      <div
        className="pointer-events-none absolute -bottom-16 -right-16 w-56 h-56 rounded-full blur-3xl opacity-30 group-hover:opacity-70 transition-opacity duration-500"
        style={{ background: "radial-gradient(circle, rgba(0,153,255,0.2), transparent 70%)" }}
      />

      {/* Numbered index label */}
      <div className="absolute top-5 right-6 text-[10px] font-mono tracking-[0.15em] text-foreground/30 group-hover:text-[#0099FF]/60 transition-colors duration-300">
        / {String(index + 2).padStart(2, "0")}
      </div>

      {/* Icon with layered depth */}
      <div className="relative mb-6">
        <div
          className="absolute inset-0 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "radial-gradient(circle, rgba(0,153,255,0.4), transparent 70%)",
            transform: "scale(1.4)",
          }}
        />
        <div className="relative w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-white to-[#f0f8ff] dark:from-white/[0.08] dark:to-white/[0.02] border border-[#0099FF]/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_2px_8px_-2px_rgba(0,153,255,0.15)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_2px_8px_-2px_rgba(0,153,255,0.25)] transition-all duration-500 group-hover:border-[#0099FF]/50 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_24px_-4px_rgba(0,153,255,0.4)]">
          <Icon className="w-[22px] h-[22px] text-[#0099FF] transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
        </div>
      </div>

      <h3 className="relative text-xl lg:text-[1.4rem] font-bold text-foreground mb-3 tracking-tight leading-[1.2]">
        {pillar.title}
      </h3>
      <p className="relative text-[0.9375rem] text-muted-foreground leading-relaxed">
        {pillar.description}
      </p>
    </div>
  );
};

export default function AuditPractice() {
  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title="The Technical Accounting Force Multiplier for Firms - Gaapio"
        description="Scale technical accounting expertise across every engagement. Gaapio helps CPA and audit firms deliver reviewer-ready memos, disclosures, and complex accounting support faster — while helping staff level up."
        canonical="/solutions/audit"
        keywords={['CPA firm technical accounting', 'audit firm AI', 'reviewer-ready memos', 'footnote disclosure support', 'upskill audit staff', 'advisory revenue growth']}
      />
      <ServiceSchema
        name="Gaapio for CPA & Audit Firms"
        description="The technical accounting force multiplier for CPA and audit firms — senior-level memos, disclosure support, and staff enablement across every engagement."
        url="/solutions/audit"
        audience="Audit Partners, CPA Firm Partners, Audit Managers, Technical Accounting Reviewers, Advisory Practice Leaders"
      />
      <Header />
      
      {/* Hero Section - Split Layout */}
      <section className="relative min-h-[70vh] flex items-center pt-24 pb-16 overflow-hidden">
        <GradientBackground />
        
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Text Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                <ClipboardCheck className="h-5 w-5 text-gray-900" />
                <span className="text-sm font-medium text-gray-900">For CPA &amp; Audit Firms</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
                <span className="text-gray-900">The Technical Accounting</span>{" "}
                <span className="text-white">Force Multiplier.</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-900/90 max-w-xl mb-8 leading-relaxed mx-auto lg:mx-0">
                Scale technical accounting expertise across every engagement. Deliver reviewer-ready memos, disclosures, and complex accounting support faster — while helping staff level up.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" variant="black" className="text-base px-8 py-6 h-auto font-semibold" asChild>
                  <Link to="/firm-signup">Sign Up Now</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-gray-900 text-gray-900 bg-white hover:bg-gray-100 text-base px-8 py-6 h-auto font-semibold" asChild>
                  <Link to="/request-demo">Request a Demo</Link>
                </Button>
              </div>
            </div>
            
            {/* Right - Product Screenshot */}
            <div className="hidden lg:block">
              <HeroScreenshotMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBarSection />

      {/* Why Firms Section — premium background */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f0f8ff] to-white dark:from-background dark:via-[#0a1220] dark:to-background" />

        {/* Faint grid texture, radially masked */}
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #0099FF 1px, transparent 1px), linear-gradient(to bottom, #0099FF 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
          }}
        />

        {/* Soft radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-[#0099FF]/5 dark:bg-[#0099FF]/10 blur-[120px] pointer-events-none" />


        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="text-xs font-bold tracking-[0.18em] uppercase text-[#0099FF] mb-4">
              Why Firms Run on Gaapio
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 tracking-tight leading-[1.05]">
              Five ways firms turn Gaapio into a force multiplier.
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Technical accounting work that used to bottleneck on a few senior experts — now running across every engagement, every client, every staff level.
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-6 lg:space-y-8">
            {/* Hero pillar — full-width feature card with premium treatment */}
            <div className="group relative overflow-hidden rounded-3xl bg-background/80 backdrop-blur-xl border border-border/80 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_32px_-8px_rgba(15,23,42,0.1)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.4),0_8px_32px_-8px_rgba(0,0,0,0.5)] p-10 lg:p-14 transition-all duration-500 hover:-translate-y-1 hover:border-[#0099FF]/40 hover:shadow-[0_0_0_1px_rgba(0,153,255,0.2),0_40px_80px_-16px_rgba(0,153,255,0.3)]">
              {/* Decorative auroras */}
              <div
                className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-40 group-hover:opacity-80 transition-opacity duration-700"
                style={{ background: "radial-gradient(circle, rgba(0,153,255,0.25), transparent 65%)" }}
              />
              <div
                className="pointer-events-none absolute -bottom-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"
                style={{ background: "radial-gradient(circle, rgba(0,153,255,0.2), transparent 70%)" }}
              />

              {/* Top edge highlight */}
              <div
                className="pointer-events-none absolute inset-x-12 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(to right, transparent, rgba(0,153,255,0.6), transparent)" }}
              />

              {/* Numbered index */}
              <div className="absolute top-6 right-8 text-[10px] font-mono tracking-[0.15em] text-foreground/30 group-hover:text-[#0099FF]/60 transition-colors duration-300">
                / 01
              </div>

              <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
                <div className="lg:col-span-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0099FF]/10 border border-[#0099FF]/20 mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0099FF] animate-pulse" />
                    <span className="text-xs font-bold tracking-[0.12em] uppercase text-[#0099FF]">
                      {heroPillar.category}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground mb-6 leading-[1.08] tracking-tight">
                    {heroPillar.headline}
                  </h3>
                  <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                    {heroPillar.description}
                  </p>
                </div>

                {/* Topic chips — elevated treatment */}
                <div className="lg:col-span-2">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-5 flex items-center gap-3">
                    <span>Coverage</span>
                    <span className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {heroPillar.topics.map((topic, i) => (
                      <span
                        key={topic}
                        className="inline-flex items-center px-3.5 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-white/5 text-foreground border border-border shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-[#0099FF]/50 hover:bg-[#0099FF]/5 hover:text-[#0099FF] hover:-translate-y-0.5 transition-all duration-200"
                        style={{ transitionDelay: `${i * 20}ms` }}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 2x2 supporting pillars — premium card treatment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {supportingPillars.map((pillar, index) => (
                <PillarCard key={index} pillar={pillar} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Firm Tiers Section - Package pricing */}
      <FirmTiersSection />

      {/* Modules Section - Using the tabbed layout */}
      <FirmModulesSection />

      {/* Security & Trust Section — premium icon-card grid */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-[#f0f8ff]/40 to-muted/50 dark:from-background dark:via-[#0a1220] dark:to-background" />

        {/* Faint grid */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #0099FF 1px, transparent 1px), linear-gradient(to bottom, #0099FF 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
          }}
        />

        {/* Soft glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#0099FF]/5 dark:bg-[#0099FF]/10 blur-[120px] pointer-events-none" />

        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#0099FF] mb-4">
              Security &amp; Trust
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 tracking-tight leading-[1.05]">
              Built for the security expectations of audit teams.
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Your client data is sensitive. Our infrastructure reflects that.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 max-w-6xl mx-auto">
            {securityItems.map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl p-7 bg-background/80 backdrop-blur-xl border border-border/80 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-8px_rgba(15,23,42,0.08)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.4),0_8px_24px_-8px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-1 hover:border-[#0099FF]/40 hover:shadow-[0_0_0_1px_rgba(0,153,255,0.15),0_24px_48px_-12px_rgba(0,153,255,0.25)]"
                >
                  {/* Corner aurora */}
                  <div
                    className="pointer-events-none absolute -bottom-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-60 transition-opacity duration-500"
                    style={{ background: "radial-gradient(circle, rgba(0,153,255,0.25), transparent 70%)" }}
                  />

                  <div className="relative">
                    {/* Icon with shield treatment */}
                    <div className="mb-5 w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-white to-[#f0f8ff] dark:from-white/[0.08] dark:to-white/[0.02] border border-[#0099FF]/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-500 group-hover:border-[#0099FF]/50">
                      <ItemIcon className="w-5 h-5 text-[#0099FF]" strokeWidth={1.5} />
                    </div>

                    <h3 className="text-base font-bold text-foreground mb-2 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <FinalCtaSection />
      
      <Footer />
    </div>
  );
}