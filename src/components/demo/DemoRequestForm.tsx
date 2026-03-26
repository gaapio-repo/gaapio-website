
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useDemoRequestForm } from "./hooks/useDemoRequestForm";
import { DemoRequestFormFields } from "./components/DemoRequestFormFields";

interface DemoRequestFormProps {
  onSuccess?: () => void;
}

export function DemoRequestForm({ onSuccess }: DemoRequestFormProps) {
  const { form, isLoading, onSubmit } = useDemoRequestForm(onSuccess);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        <DemoRequestFormFields form={form} />
        <Button 
          type="submit" 
          className="w-full text-base font-semibold dark:text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:brightness-110 transition-all duration-200" 
          size="lg"
          variant="blue"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Show Me Gaapio"}
        </Button>
      </form>
    </Form>
  );
}
