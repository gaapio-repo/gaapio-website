
import { useState, memo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const WaitlistForm = memo(function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Clean form data
      const trimmedEmail = email.trim();
      const trimmedName = name.trim();
      const trimmedCompany = company.trim();
      
      // Validate form data
      if (!trimmedEmail || !trimmedName) {
        toast({
          title: "Missing information",
          description: "Please provide your name and email.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Submit to Supabase table (waitlist_submissions)
      await supabase
        .from("waitlist_submissions")
        .insert([
          {
            email: trimmedEmail,
            name: trimmedName,
            company: trimmedCompany,
            date: new Date().toISOString(),
          },
        ]);

      // Format data with exact field names for Zapier (URL and destination email are set server-side via env vars)
      const zapierData = {
        "Email": trimmedEmail,
        "Name": trimmedName,
        "Company": trimmedCompany,
        "Source": "Waitlist Form",
        "Submission Date": new Date().toISOString(),
      };

      // Queue webhook via edge function (ZAPIER_WEBHOOK_URL and ZAPIER_DESTINATION_EMAIL are configured in Supabase)
      await supabase.functions.invoke('queue-webhook', {
        body: {
          payload: zapierData,
          target_url: '' // Edge function uses ZAPIER_WEBHOOK_URL from env when Source is "Waitlist Form"
        }
      }).catch(err => {
        console.error("Error queuing webhook:", err);
        // Don't block the form submission if the webhook fails
      });

      // Sync to CRM via secure edge function
      try {
        const domain = trimmedCompany ? trimmedCompany.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0] : '';
        const { data: crmResult, error: crmError } = await supabase.functions.invoke('sync-lead-to-crm', {
          body: {
            company_name: trimmedCompany,
            domain: domain,
            website: trimmedCompany,
            first_name: trimmedName.split(' ')[0],
            last_name: trimmedName.split(' ').slice(1).join(' ') || trimmedName.split(' ')[0],
            email: trimmedEmail,
            notes: 'Waitlist signup',
            source: 'Waitlist'
          }
        });

        if (crmError) {
          console.error('Failed to sync to CRM:', crmError);
        } else {
          console.log('Lead synced to CRM:', crmResult);
        }
      } catch (error) {
        console.error('CRM sync error:', error);
      }

      toast({
        title: "You're on the list!",
        description: "Thanks for joining our waitlist. We'll be in touch soon.",
      });

      setEmail("");
      setName("");
      setCompany("");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full"
          disabled={isLoading}
        />
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full"
          disabled={isLoading}
        />
        <Input
          type="text"
          placeholder="Your company (optional)"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Joining..." : "Join Waitlist"}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </form>
  );
});
