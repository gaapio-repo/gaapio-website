
import { Button } from "@/components/ui/button";
import { Check, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function DemoRequestSuccess() {
  const navigate = useNavigate();
  
  return (
    <div className="text-center py-4">
      <div className="flex justify-center">
        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
          <Check className="h-7 w-7 text-white" strokeWidth={3} />
        </div>
      </div>
      
      <h1 className="text-3xl font-bold mb-3 text-white">Thank You for Your Request!</h1>
      
      <p className="text-white/90 max-w-md mx-auto mb-6 text-base font-medium">
        We've received your demo request. Schedule a time below, and our team will be in touch shortly.
      </p>
      
      <div className="mb-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Calendar className="h-5 w-5 text-white" />
          <h2 className="text-xl font-semibold text-white">Schedule Your Demo Now</h2>
        </div>
        <p className="text-white/80 text-sm mb-4 font-medium">
          Pick a time that works best for you.
        </p>
        <div className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden border border-white/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]">
          <iframe 
            src="https://outlook.office.com/book/GaapioSales@gaapio.com/?ismsaljsauthenabled" 
            width="100%" 
            height="550" 
            scrolling="yes" 
            style={{ border: 0 }}
            title="Schedule a demo with Gaapio"
            className="bg-background"
          />
        </div>
      </div>
      
      <Button 
        onClick={() => navigate("/")} 
        size="lg"
        className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 font-semibold"
      >
        Return to Homepage
      </Button>
    </div>
  );
}
