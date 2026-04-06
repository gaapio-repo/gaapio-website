import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ResponsiveContainer } from '@/components/layout/ResponsiveContainer';

interface SoftCTAProps {
  context?: string; // e.g. "ASC 842" for topic-specific copy
}

export function SoftCTA({ context }: SoftCTAProps) {
  const heading = context
    ? `Apply ${context} to your company's situation`
    : 'Go beyond browsing — apply comment letters to your situation';

  const description = context
    ? `Gaapio's AI connects SEC comment letter insights on ${context} to your specific facts and circumstances. Search across the Codification, comment letters, and Big 4 guidance in one place.`
    : "Gaapio's AI lets you search comment letters alongside the Codification and Big 4 guidance, then apply the findings to your company's specific facts and circumstances.";

  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 cta-gradient-bg" />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      <ResponsiveContainer className="relative z-10 text-center max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          {heading}
        </h2>
        <p className="text-white/80 text-lg mb-8 leading-relaxed">
          {description}
        </p>
        <Button asChild size="lg" variant="secondary" className="group">
          <Link to="/request-demo">
            Request a Demo
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </ResponsiveContainer>
    </section>
  );
}
