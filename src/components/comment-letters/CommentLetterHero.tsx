import { GradientBackground } from '@/components/home/GradientBackground';
import { ResponsiveContainer } from '@/components/layout/ResponsiveContainer';

interface CommentLetterHeroProps {
  title: string;
  description: string;
  subtitle?: string;
}

export function CommentLetterHero({ title, description, subtitle }: CommentLetterHeroProps) {
  return (
    <section className="relative pt-24 pb-8 md:pb-10 overflow-hidden">
      <GradientBackground />
      <ResponsiveContainer className="relative z-10 text-center max-w-3xl">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 tracking-tight">
          {title}
        </h1>
        <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto">
          {description}
        </p>
        {subtitle && (
          <p className="text-sm text-white/70 mt-2">
            {subtitle}
          </p>
        )}
      </ResponsiveContainer>
    </section>
  );
}
