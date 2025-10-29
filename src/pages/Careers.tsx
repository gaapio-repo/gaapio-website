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

  return (
    <Card className="border-2 hover:border-primary/50 transition-all duration-300 animate-fade-in">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10 w-fit">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="secondary">{job.department}</Badge>
                <Badge variant="outline" className="gap-1">
                  <MapPin className="h-3 w-3" />
                  {job.location}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Clock className="h-3 w-3" />
                  {job.type}
                </Badge>
              </div>
              <CardDescription className="text-base">{job.description}</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-0 space-y-6 animate-accordion-down">
          <div>
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Key Responsibilities
            </h4>
            <ul className="space-y-2">
              {job.responsibilities.map((resp, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              What We're Looking For
            </h4>
            <ul className="space-y-2">
              {job.qualifications.map((qual, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{qual}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="pt-4">
            <Button asChild className="w-full sm:w-auto">
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
          className="w-full justify-center gap-2"
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
        <section className="relative min-h-[70vh] flex items-center pt-32 pb-20 overflow-hidden">
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
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Why Join Gaapio?</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Be part of something bigger. Join a team that's revolutionizing how accountants work, 
              backed by real traction and fueled by purpose.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <CardHeader>
                  <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Mission-Driven Work</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Build tools that give accountants their time back and help them focus on strategic, 
                    meaningful work. Your code makes a real difference every day.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <CardHeader>
                  <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Rapid Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Join at the perfect inflection point—early enough to have massive impact on direction, 
                    established enough to have clear product-market fit and customer traction.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <CardHeader>
                  <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Cutting-Edge Tech</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Work with GPT-4, Claude, and the latest AI models. Modern stack including React, 
                    TypeScript, Supabase, and innovative AI integrations you won't find elsewhere.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <CardHeader>
                  <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>True Flexibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Remote-first from day one. Work from anywhere with flexible hours. 
                    We measure results, not hours. Take time off when you need it—unlimited PTO.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <CardHeader>
                  <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                    <Coffee className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Growth & Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Professional development budget for courses, conferences, and books. 
                    Work directly with founders. Learn from experts in both accounting and engineering.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <CardHeader>
                  <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                    <Rocket className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Ownership & Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Your work directly shapes the product. No layers of bureaucracy. 
                    Ship features that reach thousands of users. Plus equity—you'll own part of what we build.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Perks & Benefits Section */}
        <section className="py-16 px-4 bg-secondary/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Perks & Benefits</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              We take care of our team so you can focus on doing your best work
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border hover:border-primary/50 transition-all">
                <CardHeader>
                  <div className="p-2 rounded-lg bg-primary/10 w-fit mb-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Competitive Salary + Equity</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Top of market compensation with meaningful equity ownership</CardDescription>
                </CardContent>
              </Card>
              
              <Card className="border hover:border-primary/50 transition-all">
                <CardHeader>
                  <div className="p-2 rounded-lg bg-primary/10 w-fit mb-2">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Health Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Premium health, dental, and vision insurance for you and your family</CardDescription>
                </CardContent>
              </Card>
              
              <Card className="border hover:border-primary/50 transition-all">
                <CardHeader>
                  <div className="p-2 rounded-lg bg-primary/10 w-fit mb-2">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Unlimited PTO</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Take the time you need to recharge. We trust you to manage your time</CardDescription>
                </CardContent>
              </Card>
              
              <Card className="border hover:border-primary/50 transition-all">
                <CardHeader>
                  <div className="p-2 rounded-lg bg-primary/10 w-fit mb-2">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Home Office Stipend</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Budget to create your perfect remote workspace</CardDescription>
                </CardContent>
              </Card>
              
              <Card className="border hover:border-primary/50 transition-all">
                <CardHeader>
                  <div className="p-2 rounded-lg bg-primary/10 w-fit mb-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">401(k) Matching</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>We match your retirement contributions to help secure your future</CardDescription>
                </CardContent>
              </Card>
              
              <Card className="border hover:border-primary/50 transition-all">
                <CardHeader>
                  <div className="p-2 rounded-lg bg-primary/10 w-fit mb-2">
                    <Coffee className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Learning Budget</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Annual budget for courses, conferences, books, and professional growth</CardDescription>
                </CardContent>
              </Card>
              
              <Card className="border hover:border-primary/50 transition-all">
                <CardHeader>
                  <div className="p-2 rounded-lg bg-primary/10 w-fit mb-2">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Latest Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Access to premium software, tools, and AI services you need to excel</CardDescription>
                </CardContent>
              </Card>
              
              <Card className="border hover:border-primary/50 transition-all">
                <CardHeader>
                  <div className="p-2 rounded-lg bg-primary/10 w-fit mb-2">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Team Retreats</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Annual in-person gatherings to connect, collaborate, and celebrate</CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Our Values</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              These principles guide how we work, make decisions, and treat each other
            </p>
            <div className="space-y-4">
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="text-lg">🎯 Customer Obsession</CardTitle>
                  <CardDescription className="text-base">
                    Every feature, every decision starts with understanding accountants' pain points. 
                    We don't build what's easy—we build what matters.
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="text-lg">🚀 Bias for Action</CardTitle>
                  <CardDescription className="text-base">
                    Speed matters. We make decisions quickly, ship iteratively, and learn from real users. 
                    Perfect is the enemy of done.
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="text-lg">💡 Intellectual Curiosity</CardTitle>
                  <CardDescription className="text-base">
                    We ask "why?" constantly. We dive deep into problems, explore new technologies, 
                    and always look for better ways to do things.
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="text-lg">🤝 Radical Transparency</CardTitle>
                  <CardDescription className="text-base">
                    Open communication, honest feedback, and shared context. We trust our team with the full picture—
                    financials, strategy, challenges, and wins.
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="text-lg">🌱 Sustainable Excellence</CardTitle>
                  <CardDescription className="text-base">
                    We're here for the long game. High performance shouldn't mean burnout. 
                    We build a pace we can maintain while delivering exceptional results.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        
        {/* What to Expect Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">What to Expect</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Our hiring process is designed to be respectful of your time while ensuring mutual fit
            </p>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold mb-2">Apply</h3>
                <p className="text-sm text-muted-foreground">Submit your application and tell us why you're excited about Gaapio</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold mb-2">Initial Chat</h3>
                <p className="text-sm text-muted-foreground">30-minute conversation to learn about each other</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold mb-2">Deep Dive</h3>
                <p className="text-sm text-muted-foreground">Technical interview or case study relevant to the role</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">4</span>
                </div>
                <h3 className="font-semibold mb-2">Team Meet</h3>
                <p className="text-sm text-muted-foreground">Chat with team members and founders to ensure cultural fit</p>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-8">
              Timeline: We aim to complete the process in 1-2 weeks and provide feedback at every stage
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-6">Ready to Make an Impact?</h2>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              Whether you see a role that fits or want to start a conversation about future opportunities, 
              we'd love to hear from you.
            </p>
            <p className="text-base text-muted-foreground mb-8">
              We're committed to building a diverse and inclusive team. If you're passionate about transforming 
              accounting with AI, we want to talk—regardless of your background or where you see yourself above.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/contact">Apply Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8">
                <Link to="/about-us">Learn More About Gaapio</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-8">
              <strong>Equal Opportunity:</strong> Gaapio is an equal opportunity employer. We celebrate diversity 
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
