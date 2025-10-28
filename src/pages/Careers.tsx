import { Link } from "react-router-dom";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Briefcase, Users, Heart, Zap, TrendingUp, Coffee, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Careers = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Briefcase className="h-4 w-4" />
              <span className="text-sm font-medium">Join Our Team</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Build the Future of Accounting
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We're a team of accountants and engineers on a mission to transform how accounting work gets done. 
              Join us in building tools that matter.
            </p>
          </div>
        </section>

        {/* Why Join Us Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Join Gaapio?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Mission-Driven Work</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Every day, you'll be building tools that give accountants their time back 
                    and help them focus on meaningful work.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Rapid Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    We're at an exciting stage—early enough to make a massive impact, 
                    mature enough to have product-market fit.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Cutting-Edge Tech</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Work with the latest AI models, modern web technologies, 
                    and innovative approaches to complex problems.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Flexible Work</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Remote-first culture with flexible hours. We care about results, 
                    not where or when you work.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                    <Coffee className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Learning Culture</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    We invest in your growth through courses, conferences, 
                    and dedicated learning time.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Small Team Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Your work directly impacts thousands of accountants. 
                    No bureaucracy, just meaningful contributions.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Open Positions Section */}
        <section className="py-16 px-4 bg-background">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Open Positions</h2>
            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                    <Briefcase className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No Open Positions Currently</h3>
                  <p className="text-muted-foreground mb-6">
                    We don't have any open roles at the moment, but we're always interested 
                    in connecting with talented people.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Feel free to reach out if you think you'd be a great fit for our team. 
                    We'd love to hear from you!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-6">Interested in Joining?</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Even if we don't have an open position that matches your background, 
              we'd love to hear from you. Send us your resume and a note about 
              what excites you about Gaapio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/contact">Get in Touch</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8">
                <Link to="/about-us">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;
