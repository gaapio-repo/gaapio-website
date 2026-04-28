
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { DemoRequestFormData } from "../types/demoRequestTypes";

export function useDemoRequestForm(onSuccess?: () => void) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<DemoRequestFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      company: "",
      email: "",
      phone: "",
      notes: "",
    },
  });

  const onSubmit = async (data: DemoRequestFormData) => {
    setIsLoading(true);
    console.log("Form submitted with data:", data);
    
    try {
      console.log("Saving to database...");
      // Save to database first
      const { error } = await supabase
        .from("demo_requests")
        .insert({
          first_name: data.firstName,
          last_name: data.lastName,
          company: data.company,
          email: data.email,
          phone: data.phone,
          notes: data.notes,
        });

      if (error) {
        console.error("Database error:", error);
        throw error;
      }

      // Sync to CRM via secure edge function — this is the source of truth
      // for lead notifications now (CRM webhook fans out to email/tasks/etc.)
      try {
        const { data: crmResult, error: crmError } = await supabase.functions.invoke('sync-lead-to-crm', {
          body: {
            first_name: data.firstName,
            last_name: data.lastName,
            company: data.company,
            email: data.email,
            phone: data.phone,
            notes: data.notes,
            source: 'Demo Request'
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

      console.log("Demo request saved successfully");
      toast({
        title: "Demo request submitted",
        description: "Thank you for your interest! We'll be in touch soon.",
      });
      
      form.reset();
      
      // Call the success callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
