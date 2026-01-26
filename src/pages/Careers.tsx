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
    id: "head-of-growth",
    title: "Head of Growth & Marketing Operations",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    description: "We're hiring an accountant who can run point on marketing execution, lead generation, and managing our AI agents that support outbound + marketing workflows. You'll sit at the center of growth operations: running campaigns, coordinating events, testing outbound approaches, managing CRM hygiene, and improving processes using AI and automation.",
    responsibilities: [
      "Own day-to-day execution of lead generation campaigns (email, LinkedIn, events, partner outreach)",
      "Build and manage prospect lists (ICP targeting, firm/company filtering, contact enrichment)",
      "Maintain clean workflows in our CRM (lead stages, routing, follow-ups, reporting)",
      "Track conversion metrics: meetings booked, response rates, pipeline created, event ROI",
      "Manage and improve our AI SDR agents and automation tools used in outbound workflows",
      "Test messaging variations and prompts to increase replies + booked meetings",
      "Set up workflows between tools (CRM + email platform + enrichment + scheduling)",
      "Own execution of industry events and local meetups: planning, logistics, booth setup, and attendee follow-up",
      "Help build marketing assets: one-pagers, event flyers, LinkedIn posts, customer proof points",
      "Coordinate website updates or landing page experiments with the team"
    ],
    qualifications: [
      "Accounting background (degree in accounting/finance OR relevant work experience)",
      "Interest in AI workflows, prompt iteration, automation",
      "Comfortable in ambiguous, fast-moving startup environments",
      "Strong writing skills (you'll be involved in outbound messaging + positioning)",
      "High ownership and follow-through (you're the type who finishes the job)",
      "Organized and systems-oriented (you like workflows, dashboards, and clean data)",
      "Nice-to-have: Experience with marketing execution, events, or outbound sales support",
      "Nice-to-have: Familiarity with CRMs and outbound platforms",
      "Nice-to-have: Experience at a CPA firm, advisory, or working with controllers/CFOs"
    ],
    icon: TrendingUp
  },
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
    description: "Are you an accountant who wants to sell? Leverage your Big 4, controller, or accounting firm experience to help other firms discover Gaapio. Your accounting expertise is your superpower in sales.",
    responsibilities: [
      "Drive revenue growth by closing deals with mid-market and enterprise accounting firms",
      "Build and nurture relationships with CFOs, controllers, and accounting partners",
      "Own the full sales cycle from prospecting through contract negotiation",
      "Conduct product demos that showcase Gaapio's value proposition—speaking accountant-to-accountant",
      "Collaborate with customer success to ensure smooth onboarding and expansion",
      "Provide market feedback to shape product roadmap and positioning"
    ],
    qualifications: [
      "Accounting background (Big 4, controller, or accounting firm experience strongly preferred)",
      "CPA or working toward CPA certification is a plus",
      "3-5+ years of professional accounting experience with desire to transition into sales",
      "Deep understanding of accounting workflows, pain points, and industry challenges",
      "Excellent presentation and communication skills—able to speak the language of accountants",
      "Consultative approach with ability to understand complex business needs",
      "Self-starter who thrives in a fast-paced startup environment"
    ],
    icon: DollarSign
  },
  {
    id: "account-executive",
    title: "Account Executive",
    department: "Sales",
    location: "Remote",
    type: "Full-time",
    description: "Accountant ready to try sales? Your Big 4, controller, or accounting firm experience makes you the perfect person to help other accountants discover Gaapio. Use your expertise to drive impact and revenue.",
    responsibilities: [
      "Identify and qualify new business opportunities through outbound prospecting",
      "Conduct compelling product demonstrations to accounting firms and finance teams",
      "Guide prospects through the sales process from initial contact to close",
      "Leverage your accounting background to deeply understand workflows and challenges",
      "Maintain accurate pipeline and forecast data in our CRM",
      "Work closely with senior sales team members to develop your skills"
    ],
    qualifications: [
      "Accounting background (Big 4, controller, or accounting firm experience strongly preferred)",
      "2-4+ years of professional accounting experience with interest in sales",
      "CPA or working toward CPA certification is a plus",
      "Strong understanding of accounting workflows and industry pain points",
      "Hunger to learn, grow, and exceed targets in a sales role",
      "Excellent communication and presentation skills",
      "Competitive drive with collaborative team mindset"
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
        gradient: "from-accent/30 via-accent/40 to-accent/30",
        iconBg: "bg-[#339CFF]",
        badgeBg: "bg-primary/20 text-primary border-primary/30",
        borderColor: "border-l-primary"
      }
    : {
        gradient: "from-accent/30 via-accent/40 to-accent/30",
        iconBg: "bg-[#339CFF]",
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
            <Button size="lg" variant="blue" className="w-full sm:w-auto" asChild>
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
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in leading-[1.1]">
                <span className="text-black">Build</span>{" "}
                <span className="text-white">the Future of</span>
                <span className="block mt-2 text-white">Accounting with AI</span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-white leading-relaxed mb-8 animate-fade-in max-w-3xl mx-auto" style={{ animationDelay: "100ms" }}>
                Join a team of accountants and engineers transforming a trillion-dollar industry. 
                We're combining cutting-edge AI with deep accounting expertise to give professionals their time back.
              </p>
              
              {/* Stats Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 max-w-xl mx-auto animate-fade-in" style={{ animationDelay: "200ms" }}>
                <div className="text-center p-4 rounded-xl bg-white/30 backdrop-blur-sm border border-white/40">
                  <div className="text-3xl font-bold text-white mb-1">Remote-First</div>
                  <div className="text-sm text-white/90">Work From Anywhere</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/30 backdrop-blur-sm border border-white/40">
                  <div className="text-3xl font-bold text-white mb-1">AI-Powered</div>
                  <div className="text-sm text-white/90">Latest Technology</div>
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

        {/* CTA Section */}
        <section className="py-20 px-4 bg-primary/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Ready to Make an Impact?
            </h2>
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed max-w-2xl mx-auto">
              Whether you see a role that fits or want to start a conversation about future opportunities, 
              we'd love to hear from you.
            </p>
            <p className="text-base text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
              We're committed to building a diverse and inclusive team. If you're passionate about transforming 
              accounting with AI, we want to talk—regardless of your background or where you see yourself above.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Button size="lg" variant="blue" className="text-base px-8 py-6 h-auto font-semibold" asChild>
                <Link to="/contact">Apply Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary/10 text-base px-8 py-6 h-auto font-semibold" asChild>
                <Link to="/about-us">Learn More About Gaapio</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
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
