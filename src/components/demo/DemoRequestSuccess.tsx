
import { Button } from "@/components/ui/button";
import { Check, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function DemoRequestSuccess() {
  const navigate = useNavigate();
  
  return (
    <div className="text-center py-12">
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <Check className="h-8 w-8 text-primary" />
        </div>
      </div>
      
      <h1 className="text-3xl font-bold mb-4">Thank You for Your Request!</h1>
      
      <p className="text-muted-foreground max-w-md mx-auto mb-6">
        We've received your demo request. Schedule a time below, or our team will be in touch shortly.
      </p>
      
      <div className="mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Calendar className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Schedule Your Demo Now</h2>
        </div>
        <p className="text-muted-foreground text-sm mb-4">
          Pick a time that works best for you.
        </p>
        <div className="w-full max-w-3xl mx-auto rounded-lg overflow-hidden border border-border">
          <iframe 
            src="https://outlook.office.com/book/GaapioSales@gaapio.com/?ismsaljsauthenabled" 
            width="100%" 
            height="600" 
            scrolling="yes" 
            style={{ border: 0 }}
            title="Schedule a demo with Gaapio"
          />
        </div>
      </div>
      
      <Button 
        onClick={() => navigate("/")} 
        size="lg"
        variant="outline"
      >
        Return to Homepage
      </Button>
    </div>
  );
}
