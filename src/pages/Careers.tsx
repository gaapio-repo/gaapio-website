import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Briefcase, Users, Heart, Zap, TrendingUp, Coffee, Mail, Code, DollarSign, Building, ChevronDown, ChevronUp, MapPin, Clock, Target, Award, Rocket, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GradientBackground } from "@/components/home/GradientBackground";

interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  icon: React.ElementType;
}

const jobListings: JobListing[] = [
  {
    id: "dev-manager",
    title: "Development Manager",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Lead our talented engineering team in building the future of AI-powered accounting tools. Shape our technical architecture, mentor developers, and turn vision into reality.",
    responsibilities: [
      "Lead and mentor a team of talented developers, fostering growth and technical excellence",
      "Oversee technical architecture decisions and ensure scalable, maintainable code",
      "Bridge the gap between product vision and technical implementation",
      "Collaborate with leadership to define engineering roadmap and priorities",
      "Establish best practices for code quality, testing, and deployment"
    ],
    qualifications: [
      "5+ years of software engineering experience with modern web technologies",
      "2+ years in a technical leadership or management role",
      "Strong expertise in React, TypeScript, and full-stack development",
      "Experience with AI/ML integrations and cloud platforms (AWS, Supabase, etc.)",
      "Proven track record of building and shipping production-grade applications",
      "Excellent communication skills and ability to mentor developers"
    ],
    icon: Users
  },
  {
    id: "developer",
    title: "Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Build cutting-edge AI features that transform how accountants work. Work with React, TypeScript, and the latest AI technologies to create tools that make a real difference.",
    responsibilities: [
      "Develop and maintain our React/TypeScript frontend application",
      "Build AI-powered features including document analysis and intelligent automation",
      "Integrate with APIs (OpenAI, Anthropic) and accounting platforms",
      "Write clean, maintainable, well-tested code",
      "Collaborate with designers and product team to implement new features",
      "Participate in code reviews and contribute to technical decisions"
    ],
    qualifications: [
      "2+ years of professional experience with React and TypeScript",
      "Strong understanding of modern web development (hooks, state management, etc.)",
      "Experience with REST APIs and asynchronous JavaScript",
      "Familiarity with AI/LLM integrations is a plus",
      "Passion for building products that solve real problems",
      "Self-motivated with strong problem-solving skills"
    ],
    icon: Code
  },
  {
    id: "senior-ae",
    title: "Senior Account Executive",
    department: "Sales",
    location: "Remote",
    type: "Full-time",
    description: "Drive revenue growth by bringing Gaapio to accounting firms and finance teams. Own the full sales cycle with enterprise clients and become a trusted advisor to accounting leaders.",
    responsibilities: [
      "Drive revenue growth by closing deals with mid-market and enterprise accounting firms",
      "Build and nurture relationships with CFOs, controllers, and accounting partners",
      "Own the full sales cycle from prospecting through contract negotiation",
      "Conduct product demos that showcase Gaapio's value proposition",
      "Collaborate with customer success to ensure smooth onboarding and expansion",
      "Provide market feedback to shape product roadmap and positioning"
    ],
    qualifications: [
      "5+ years of B2B SaaS sales experience with proven track record of exceeding quota",
      "Experience selling to accounting firms, finance teams, or professional services",
      "Strong understanding of accounting workflows and pain points (preferred)",
      "Excellent presentation and communication skills",
      "Consultative selling approach with ability to understand complex business needs",
      "Self-starter who thrives in a fast-paced startup environment"
    ],
    icon: TrendingUp
  },
  {
    id: "account-executive",
    title: "Account Executive",
    department: "Sales",
    location: "Remote",
    type: "Full-time",
    description: "Join our sales team and help accounting firms discover how AI can transform their work. Identify opportunities, conduct demos, and be part of our growth story.",
    responsibilities: [
      "Identify and qualify new business opportunities through outbound prospecting",
      "Conduct compelling product demonstrations to accounting firms and finance teams",
      "Guide prospects through the sales process from initial contact to close",
      "Collaborate with prospects to deeply understand their workflows and challenges",
      "Maintain accurate pipeline and forecast data in our CRM",
      "Work closely with senior sales team members to develop your skills"
    ],
    qualifications: [
      "2+ years of sales experience (B2B SaaS preferred)",
      "Hunger to learn, grow, and exceed targets",
      "Strong communication and presentation skills",
      "Interest in accounting, finance, or professional services industries",
      "Competitive drive with collaborative team mindset",
      "Comfortable with technology and learning new software quickly"
    ],
    icon: Briefcase
  }
];

const JobCard = ({ job }: { job: JobListing }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = job.icon;
  
  // Department-specific styling
  const departmentStyles = job.department === "Engineering" 
    ? {
        gradient: "from-primary/5 via-primary/10 to-primary/5",
        iconBg: "bg-gradient-to-br from-primary to-primary/80",
        badgeBg: "bg-primary/20 text-primary border-primary/30",
        borderColor: "border-l-primary"
      }
    : {
        gradient: "from-primary/5 via-primary/10 to-primary/5",
        iconBg: "bg-gradient-to-br from-primary to-primary/80",
        badgeBg: "bg-primary/20 text-primary border-primary/30",
        borderColor: "border-l-primary"
      };

  return (
    <Card className={`group border-l-4 ${departmentStyles.borderColor} bg-gradient-to-r ${departmentStyles.gradient} hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 animate-fade-in`}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className={`p-4 rounded-2xl ${departmentStyles.iconBg} w-fit shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <Icon className="h-8 w-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl mb-3 group-hover:text-primary transition-colors">{job.title}</CardTitle>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge className={`${departmentStyles.badgeBg} border`}>{job.department}</Badge>
                <Badge variant="outline" className="gap-1">
                  <MapPin className="h-3 w-3" />
                  {job.location}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Clock className="h-3 w-3" />
                  {job.type}
                </Badge>
              </div>
              <CardDescription className="text-base leading-relaxed">{job.description}</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-0 space-y-6 animate-accordion-down">
          <div>
            <h4 className="font-semibold text-base mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Key Responsibilities
            </h4>
            <ul className="space-y-3">
              {job.responsibilities.map((resp, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-3 pl-2">
                  <span className="text-primary mt-1 text-lg">•</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-base mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              What We're Looking For
            </h4>
            <ul className="space-y-3">
              {job.qualifications.map((qual, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-3 pl-2">
                  <span className="text-primary mt-1 text-lg">•</span>
                  <span>{qual}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="pt-4">
            <Button asChild className="w-full sm:w-auto shadow-lg hover:shadow-xl" size="lg">
              <Link to="/contact" state={{ role: job.title }}>
                Apply for This Role
              </Link>
            </Button>
          </div>
        </CardContent>
      )}
      
      <CardContent className="pt-0">
        <Button
          variant="ghost"
          className="w-full justify-center gap-2 hover:bg-primary/10"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              Show Less <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              View Details <ChevronDown className="h-4 w-4" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

const Careers = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[38vh] flex items-center pt-16 pb-10 overflow-hidden">
          {/* Gradient Background */}
          <GradientBackground />
          
          {/* Content */}
          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white mb-6 animate-fade-in">
                <Rocket className="h-4 w-4" />
                <span className="text-sm font-medium">We're Hiring!</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white animate-fade-in leading-[1.1]">
                Build the Future of{" "}
                <span className="block mt-2">Accounting with AI</span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed mb-8 animate-fade-in max-w-3xl mx-auto" style={{ animationDelay: "100ms" }}>
                Join a team of accountants and engineers transforming a trillion-dollar industry. 
                We're combining cutting-edge AI with deep accounting expertise to give professionals their time back.
              </p>
              
              {/* Stats Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 max-w-xl mx-auto animate-fade-in" style={{ animationDelay: "200ms" }}>
                <div className="text-center p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="text-3xl font-bold text-white mb-1">Remote-First</div>
                  <div className="text-sm text-white/80">Work From Anywhere</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="text-3xl font-bold text-white mb-1">AI-Powered</div>
                  <div className="text-sm text-white/80">Latest Technology</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Open Positions Section - MOVED TO SECOND */}
        <section className="py-16 px-4 bg-background">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Open Positions</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              We're actively hiring across engineering and sales. Join us in building the future of accounting.
            </p>
            <div className="space-y-4">
              {jobListings.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        </section>

        {/* Why Join Us Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-background via-primary/5 to-background">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
              Why Join Gaapio?
            </h2>
            <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto text-lg">
              Be part of something bigger. Join a team that's revolutionizing how accountants work, 
              backed by real traction and fueled by purpose.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="group border-2 border-transparent bg-gradient-to-br from-primary/5 via-background to-primary/10 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-primary/80 w-fit mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-primary/30">
                    <Target className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl">Mission-Driven Work</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    Build tools that give accountants their time back and help them focus on strategic, 
                    meaningful work. Your code makes a real difference every day.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="group border-2 border-transparent bg-gradient-to-br from-primary/5 via-background to-primary/10 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-primary/80 w-fit mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-primary/30">
                    <TrendingUp className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl">Rapid Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    Join at the perfect inflection point—early enough to have massive impact on direction, 
                    established enough to have clear product-market fit and customer traction.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="group border-2 border-transparent bg-gradient-to-br from-primary/5 via-background to-primary/10 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-primary/80 w-fit mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-primary/30">
                    <Zap className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl">Cutting-Edge Tech</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    Work with GPT-4, Claude, and the latest AI models. Modern stack including React, 
                    TypeScript, Supabase, and innovative AI integrations you won't find elsewhere.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="group border-2 border-transparent bg-gradient-to-br from-primary/5 via-background to-primary/10 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-primary/80 w-fit mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-primary/30">
                    <Heart className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl">True Flexibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    Remote-first from day one. Work from anywhere with flexible hours.
                    We measure results, not hours. Take time off when you need it—unlimited PTO.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="group border-2 border-transparent bg-gradient-to-br from-primary/5 via-background to-primary/10 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-primary/80 w-fit mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-primary/30">
                    <Coffee className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl">Growth & Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    Professional development budget for courses, conferences, and books. 
                    Work directly with founders. Learn from experts in both accounting and engineering.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="group border-2 border-transparent bg-gradient-to-br from-primary/5 via-background to-primary/10 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-primary/80 w-fit mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-primary/30">
                    <Rocket className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl">Ownership & Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    Your work directly shapes the product. No layers of bureaucracy. 
                    Ship features that reach thousands of users. Plus equity—you'll own part of what we build.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Perks & Benefits Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-muted/30 to-primary/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">
              Perks & Benefits
            </h2>
            <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto text-lg">
              We take care of our team so you can focus on doing your best work
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="group border-2 border-transparent bg-gradient-to-br from-primary/5 to-primary/10 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/80 w-fit mb-3 group-hover:rotate-6 transition-transform shadow-md">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Competitive Salary + Equity</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">Top of market compensation with meaningful equity ownership</CardDescription>
                </CardContent>
              </Card>
              
              <Card className="group border-2 border-transparent bg-gradient-to-br from-primary/5 to-primary/10 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/80 w-fit mb-3 group-hover:rotate-6 transition-transform shadow-md">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Health Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">Premium health, dental, and vision insurance for you and your family</CardDescription>
                </CardContent>
              </Card>
              
              <Card className="group border-2 border-transparent bg-gradient-to-br from-primary/5 to-primary/10 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/80 w-fit mb-3 group-hover:rotate-6 transition-transform shadow-md">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Unlimited PTO</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">Take the time you need to recharge. We trust you to manage your time</CardDescription>
                </CardContent>
              </Card>
              
              <Card className="group border-2 border-transparent bg-gradient-to-br from-primary/5 to-primary/10 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/80 w-fit mb-3 group-hover:rotate-6 transition-transform shadow-md">
                    <Building className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Home Office Stipend</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">Budget to create your perfect remote workspace</CardDescription>
                </CardContent>
              </Card>
              
              <Card className="group border-2 border-transparent bg-gradient-to-br from-primary/5 to-primary/10 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/80 w-fit mb-3 group-hover:rotate-6 transition-transform shadow-md">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">401(k) Matching</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">We match your retirement contributions to help secure your future</CardDescription>
                </CardContent>
              </Card>
              
              <Card className="group border-2 border-transparent bg-gradient-to-br from-primary/5 to-primary/10 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/80 w-fit mb-3 group-hover:rotate-6 transition-transform shadow-md">
                    <Coffee className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Learning Budget</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">Annual budget for courses, conferences, books, and professional growth</CardDescription>
                </CardContent>
              </Card>
              
              <Card className="group border-2 border-transparent bg-gradient-to-br from-primary/5 to-primary/10 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/80 w-fit mb-3 group-hover:rotate-6 transition-transform shadow-md">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Latest Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">Access to premium software, tools, and AI services you need to excel</CardDescription>
                </CardContent>
              </Card>
              
              <Card className="group border-2 border-transparent bg-gradient-to-br from-primary/5 to-primary/10 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/80 w-fit mb-3 group-hover:rotate-6 transition-transform shadow-md">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Team Retreats</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">Annual in-person gatherings to connect, collaborate, and celebrate</CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-background via-primary/5 to-background">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">
              Our Values
            </h2>
            <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto text-lg">
              These principles guide how we work, make decisions, and treat each other
            </p>
            <div className="space-y-6">
              <Card className="group border-l-[6px] border-l-primary bg-gradient-to-r from-primary/5 to-transparent hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02]">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg group-hover:rotate-12 transition-transform">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2">Customer Obsession</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        Every feature, every decision starts with understanding accountants' pain points. 
                        We don't build what's easy—we build what matters.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              
              <Card className="group border-l-[6px] border-l-primary bg-gradient-to-r from-primary/5 to-transparent hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02]">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg group-hover:rotate-12 transition-transform">
                      <Rocket className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2">Bias for Action</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        Speed matters. We make decisions quickly, ship iteratively, and learn from real users. 
                        Perfect is the enemy of done.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              
              <Card className="group border-l-[6px] border-l-primary bg-gradient-to-r from-primary/5 to-transparent hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02]">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg group-hover:rotate-12 transition-transform">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2">Intellectual Curiosity</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        We ask "why?" constantly. We dive deep into problems, explore new technologies, 
                        and always look for better ways to do things.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              
              <Card className="group border-l-[6px] border-l-primary bg-gradient-to-r from-primary/5 to-transparent hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02]">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg group-hover:rotate-12 transition-transform">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2">Radical Transparency</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        Open communication, honest feedback, and shared context. We trust our team with the full picture—
                        financials, strategy, challenges, and wins.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              
              <Card className="group border-l-[6px] border-l-primary bg-gradient-to-r from-primary/5 to-transparent hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02]">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg group-hover:rotate-12 transition-transform">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2">Sustainable Excellence</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        We're here for the long game. High performance shouldn't mean burnout. 
                        We build a pace we can maintain while delivering exceptional results.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        

        {/* CTA Section */}
        <section className="py-24 px-4 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-purple-600 mb-8 shadow-2xl shadow-primary/50 animate-pulse">
              <Mail className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Ready to Make an Impact?
            </h2>
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              Whether you see a role that fits or want to start a conversation about future opportunities, 
              we'd love to hear from you.
            </p>
            <p className="text-base text-muted-foreground mb-10 leading-relaxed">
              We're committed to building a diverse and inclusive team. If you're passionate about transforming 
              accounting with AI, we want to talk—regardless of your background or where you see yourself above.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-10 py-6 shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40">
                <Link to="/contact">Apply Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-10 py-6 border-2 hover:bg-primary/10">
                <Link to="/about-us">Learn More About Gaapio</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-10 px-4">
              <strong className="text-foreground">Equal Opportunity:</strong> Gaapio is an equal opportunity employer. We celebrate diversity 
              and are committed to creating an inclusive environment for all employees.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;
