import { useNavigate } from "react-router-dom";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { SEO } from "@/components/SEO";

export default function SignupSelect() {
  const navigate = useNavigate();

  const accountTypes = [
    {
      id: "company",
      title: "Company",
      description: "I represent a company looking for accounting memo or disclosure solutions for internal use",
      icon: Building2,
      route: "/signup"
    },
    {
      id: "firm",
      title: "CPA Firm",
      description: "I represent an accounting firm looking to use Gaapio to serve my clients",
      icon: Briefcase,
      route: "/firm-signup"
    }
  ];

  const handleSelect = (route: string) => {
    navigate(route);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SEO 
        title="Choose Your Account Type - Gaapio"
        description="Select whether you're signing up as a company or a CPA firm to get started with Gaapio."
        canonical="/signup-select"
      />
      <Header />
      <main className="flex-1 pt-32 pb-16">
        <ResponsiveContainer>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Choose Your Account Type
              </h1>
              <p className="text-lg text-muted-foreground">
                Select the option that best describes how you'll use Gaapio
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {accountTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <Card 
                    key={type.id} 
                    className={cn(
                      "cursor-pointer transition-all h-full flex flex-col group",
                      "hover:border-primary hover:shadow-xl hover:-translate-y-1"
                    )}
                    onClick={() => handleSelect(type.route)}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "p-3 rounded-full transition-colors",
                          "bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground"
                        )}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-xl">{type.title}</CardTitle>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground">{type.description}</p>
                    </CardContent>
                    
                    <CardFooter className="mt-auto pt-4">
                      <Button 
                        variant="outline" 
                        className="w-full h-11 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelect(type.route);
                        }}
                      >
                        Continue
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </ResponsiveContainer>
      </main>
      <Footer />
    </div>
  );
}
