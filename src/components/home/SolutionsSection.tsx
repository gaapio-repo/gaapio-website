import { useRef, type MouseEvent as ReactMouseEvent } from "react";
import { Link } from "react-router-dom";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { ArrowRight, Building2, Landmark, Briefcase, ClipboardCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type SubCard = {
  title: string;
  description: string;
  href: string;
  Icon: typeof Building2;
};

type Panel = {
  eyebrow: string;
  headline: string;
  subCards: SubCard[];
};

const panels: Panel[] = [
  {
    eyebrow: "For Companies",
    headline: "Modern technical accounting infrastructure.",
    subCards: [
      {
        title: "Private Companies",
        description:
          "Audit-ready memos, disclosures, and accounting support without Big 4 overhead.",
        href: "/solutions/private",
        Icon: Building2,
      },
      {
        title: "Public Companies",
        description:
          "SEC reporting, SOX, and technical accounting outputs built for scale.",
        href: "/solutions/public",
        Icon: Landmark,
      },
    ],
  },
  {
    eyebrow: "For Firms",
    headline: "Scale expert output across clients.",
    subCards: [
      {
        title: "Advisory & Consulting",
        description:
          "Deliver senior-level accounting work faster across every client.",
        href: "/solutions/advisory",
        Icon: Briefcase,
      },
      {
        title: "Audit",
        description:
          "Scale technical accounting expertise across every engagement. Reviewer-ready memos, disclosures, and complex accounting support faster — while staff level up.",
        href: "/solutions/audit",
        Icon: ClipboardCheck,
      },
    ],
  },
];

function SolutionCard({ card, index }: { card: SubCard; index: number }) {
  const { Icon } = card;
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <Link
      ref={cardRef}
      to={card.href}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative flex flex-col p-7 lg:p-8 rounded-2xl overflow-hidden isolate",
        // Layered glass surface
        "bg-white/70 dark:bg-white/[0.03]",
        "backdrop-blur-xl",
        "border border-white/80 dark:border-white/10",
        // Baseline depth
        "shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-8px_rgba(15,23,42,0.08)]",
        "dark:shadow-[0_1px_2px_rgba(0,0,0,0.4),0_8px_24px_-8px_rgba(0,0,0,0.5)]",
        // Hover transitions
        "transition-[transform,box-shadow,border-color] duration-500 ease-out",
        "hover:-translate-y-1.5",
        "hover:border-[#0099FF]/40 dark:hover:border-[#0099FF]/50",
        "hover:shadow-[0_0_0_1px_rgba(0,153,255,0.2),0_32px_64px_-16px_rgba(0,153,255,0.3)]",
        "dark:hover:shadow-[0_0_0_1px_rgba(0,153,255,0.35),0_32px_64px_-16px_rgba(0,153,255,0.5)]"
      )}
    >
      {/* Mouse-tracking spotlight — signature premium touch */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
        style={{
          background:
            "radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgba(0,153,255,0.12), transparent 45%)",
        }}
      />

      {/* Top edge gradient highlight — pulses in on hover */}
      <div
        className="pointer-events-none absolute inset-x-6 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(0,153,255,0.6), transparent)",
        }}
      />

      {/* Subtle aurora in bottom-right corner */}
      <div
        className="pointer-events-none absolute -bottom-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle, rgba(0,153,255,0.15), transparent 70%)",
        }}
      />

      {/* Numbered index label */}
      <div className="absolute top-5 right-6 text-[10px] font-mono tracking-[0.15em] text-foreground/30 group-hover:text-[#0099FF]/60 transition-colors duration-300">
        / {String(index + 1).padStart(2, "0")}
      </div>

      {/* Icon — layered, depth, glow */}
      <div className="relative mb-7">
        {/* Outer ring glow (ambient) */}
        <div
          className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(circle, rgba(0,153,255,0.4), transparent 70%)",
            transform: "scale(1.4)",
          }}
        />
        {/* Icon tile */}
        <div
          className={cn(
            "relative w-12 h-12 rounded-xl flex items-center justify-center",
            "bg-gradient-to-br from-white to-[#f0f8ff]",
            "dark:from-white/[0.08] dark:to-white/[0.02]",
            "border border-[#0099FF]/20",
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_2px_8px_-2px_rgba(0,153,255,0.15)]",
            "dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_2px_8px_-2px_rgba(0,153,255,0.25)]",
            "transition-all duration-500 ease-out",
            "group-hover:border-[#0099FF]/50",
            "group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_24px_-4px_rgba(0,153,255,0.4)]",
            "group-hover:dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_8px_24px_-4px_rgba(0,153,255,0.5)]"
          )}
        >
          <Icon
            className="w-[22px] h-[22px] text-[#0099FF] transition-transform duration-500 ease-out group-hover:scale-110"
            strokeWidth={1.5}
          />
        </div>
      </div>

      {/* Title */}
      <h4 className="relative text-xl lg:text-[1.4rem] font-bold text-foreground mb-3 tracking-tight leading-[1.15]">
        {card.title}
      </h4>

      {/* Description */}
      <p className="relative text-[0.9375rem] text-muted-foreground leading-relaxed mb-7 flex-1">
        {card.description}
      </p>

      {/* Divider line with blue accent */}
      <div className="relative mb-5 h-px bg-gradient-to-r from-foreground/10 via-foreground/5 to-transparent group-hover:from-[#0099FF]/40 group-hover:via-[#0099FF]/15 transition-all duration-500" />

      {/* CTA row */}
      <div className="relative flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-[#0099FF] transition-colors duration-300">
          Learn more
          <span className="relative flex items-center justify-center w-6 h-6 rounded-full border border-foreground/15 group-hover:border-[#0099FF]/50 group-hover:bg-[#0099FF] transition-all duration-300">
            <ArrowRight className="w-3 h-3 text-foreground group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5" strokeWidth={2.5} />
          </span>
        </span>
      </div>
    </Link>
  );
}

function SolutionPanel({ panel }: { panel: Panel }) {
  return (
    <div
      className={cn(
        "relative flex flex-col p-8 lg:p-10 rounded-3xl",
        // Panel glass surface — slightly lighter to "contain" the sub-cards visually
        "bg-white/40 dark:bg-white/[0.02]",
        "backdrop-blur-2xl",
        "border border-white/60 dark:border-white/[0.06]",
        "shadow-[0_4px_16px_-4px_rgba(15,23,42,0.06)]",
        "dark:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.4)]"
      )}
    >
      {/* Panel header */}
      <div className="mb-8">
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.02] mb-4">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #0099FF 0%, #00B8FF 55%, #0099FF 100%)",
            }}
          >
            {panel.eyebrow}
          </span>
        </h3>
        <p className="text-lg md:text-xl font-medium text-foreground/80 leading-snug">
          {panel.headline}
        </p>
      </div>

      {/* Sub-cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 flex-1">
        {panel.subCards.map((card, i) => (
          <SolutionCard key={card.title} card={card} index={i} />
        ))}
      </div>
    </div>
  );
}

export function SolutionsSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Base gradient background: white → soft blue haze → white */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f0f8ff] to-white dark:from-background dark:via-[#0a1220] dark:to-background" />

      {/* Faint grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0099FF 1px, transparent 1px), linear-gradient(to bottom, #0099FF 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* Soft radial glow behind the panels */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-[#0099FF]/5 dark:bg-[#0099FF]/10 blur-[120px] pointer-events-none" />

      <ResponsiveContainer className="relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#0099FF] mb-4">
            Solutions
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.05] mb-5">
            Built for how you work.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Two ways to run on Gaapio — whether you're in-house or serving clients.
          </p>
        </div>

        {/* Two-panel layout with subtle center divider */}
        <div className="relative max-w-7xl mx-auto">
          {/* Center divider — visible on desktop only, a thin vertical gradient line with a soft glow */}
          <div
            className="hidden lg:block absolute top-8 bottom-8 left-1/2 -translate-x-1/2 w-px pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(0,153,255,0.25), transparent)",
            }}
          />
          <div
            className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-24 blur-2xl pointer-events-none"
            style={{ background: "rgba(0,153,255,0.2)" }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {panels.map((panel) => (
              <SolutionPanel key={panel.eyebrow} panel={panel} />
            ))}
          </div>
        </div>

      </ResponsiveContainer>
    </section>
  );
}
