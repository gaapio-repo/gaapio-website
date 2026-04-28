
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface ContactFormData {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

export function useContactForm(onSuccess?: (data: any) => void) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      company: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    console.log("Contact form submitted with data:", data);
    
    try {
      console.log("Saving to database...");
      // Save to database - simple insert like demo requests
      const { error } = await supabase
        .from("contact_submissions")
        .insert({
          firstname: data.firstName,
          lastname: data.lastName,
          email: data.email,
          company: data.company,
          phone: data.phone,
          message: data.message,
        });

      if (error) {
        console.error("Database error:", error);
        throw error;
      }

      // Sync to CRM via secure edge function — this is the source of truth
      // for lead notifications now (CRM webhook fans out to email/tasks/etc.)
      try {
        const domain = data.company.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
        const { data: crmResult, error: crmError } = await supabase.functions.invoke('sync-lead-to-crm', {
          body: {
            company_name: data.company,
            domain: domain,
            website: data.company,
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            phone: data.phone,
            notes: data.message,
            source: 'Contact Form'
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

      console.log("Contact request saved successfully");
      toast({
        title: "Message sent",
        description: "Thank you for your message! We'll be in touch soon.",
      });
      
      form.reset();
      
      // Call the success callback if provided
      if (onSuccess) {
        onSuccess(data);
      }
    } catch (error: any) {
      console.error("Contact form submission error:", error);
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
