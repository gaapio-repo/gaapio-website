import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ResponsiveContainer } from '@/components/layout/ResponsiveContainer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ToolComingSoonProps {
  toolName: string;
  toolDescription?: string;
  toolSlug: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function ToolComingSoon({ toolName, toolDescription, toolSlug }: ToolComingSoonProps) {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setSubmitting(true);
    try {
      const { error: insertError } = await supabase.from('tool_email_captures').insert({
        tool_slug: toolSlug,
        email,
        page_path: window.location.pathname,
      });

      if (insertError) {
        console.error('Email capture insert failed:', insertError);
        toast.error('Something went wrong. Please try again.');
        return;
      }

      toast.success('You\'ll be notified when this tool is available!');
      setEmail('');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-20">
        <ResponsiveContainer>
          <div className="max-w-lg mx-auto text-center space-y-6">
            <Badge variant="secondary" className="text-sm">
              Coming Soon
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight">{toolName}</h1>
            {toolDescription && (
              <p className="text-lg text-muted-foreground">{toolDescription}</p>
            )}
            <div className="pt-4 space-y-3">
              <p className="text-sm text-muted-foreground">
                Get notified when this tool is available
              </p>
              <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm mx-auto">
                <Input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" disabled={submitting}>
                  {submitting ? 'Sending...' : 'Notify Me'}
                </Button>
              </form>
            </div>
          </div>
        </ResponsiveContainer>
      </main>
      <Footer />
    </div>
  );
}
