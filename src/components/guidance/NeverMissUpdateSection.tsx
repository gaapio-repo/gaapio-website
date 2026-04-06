
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Bell, Mail, Smartphone } from "lucide-react";

export function NeverMissUpdateSection() {
  return (
    <section className="py-20 bg-blue-50 dark:bg-blue-950/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Stay Ahead of the Standards
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Whether it's a minor clarification or a major overhaul, Gaapio alerts you the moment guidance is issued — so you're never caught off guard.
            </p>
            <Button size="lg" variant="blue" asChild>
              <Link to="/request-demo">
                <Bell className="w-5 h-5 mr-2" />
                Enable Alerts
              </Link>
            </Button>
          </div>

          {/* Right side - Visual mockup */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8">
              <div className="space-y-4">
                {/* Email alert mockup */}
                <div className="bg-background rounded-lg shadow-lg p-4 border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <Mail className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-medium text-foreground">New Alert</span>
                    <span className="text-xs text-muted-foreground">2 min ago</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">ASC 606 Revenue Recognition Update</h4>
                  <p className="text-sm text-muted-foreground">New guidance on contract modifications...</p>
                </div>

                {/* Mobile alert mockup */}
                <div className="bg-background rounded-lg shadow-lg p-4 border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <Smartphone className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium text-foreground">Push Notification</span>
                    <span className="text-xs text-muted-foreground">1 hour ago</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">IFRS 16 Amendment</h4>
                  <p className="text-sm text-muted-foreground">Clarification on lease liability calculations...</p>
                </div>

                {/* Dashboard feed mockup */}
                <div className="bg-background rounded-lg shadow-lg p-4 border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <Bell className="w-5 h-5 text-orange-500" />
                    <span className="text-sm font-medium text-foreground">Dashboard Update</span>
                    <span className="text-xs text-muted-foreground">Today</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">3 New Updates Available</h4>
                  <p className="text-sm text-muted-foreground">ASC 842, ASC 326, and PCAOB updates...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
