import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SEO } from "@/components/SEO";

export default function Privacy() {
  const [showToc, setShowToc] = useState(false);

  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "dpo", title: "Data Protection Officer" },
    { id: "collection", title: "How We Collect and Use Your Personal Information" },
    { id: "website", title: "Use of the Gaapio.com Website" },
    { id: "cookies", title: "Cookies and Tracking Technologies" },
    { id: "services", title: "Use of the Gaapio Services" },
    { id: "sharing", title: "Sharing Information with Third Parties" },
    { id: "transfers", title: "Transferring Personal Data to the U.S." },
    { id: "rights", title: "Data Subject Rights" },
    { id: "security", title: "Security of Your Information" },
    { id: "storage", title: "Data Storage and Retention" },
    { id: "children", title: "Children's Data" },
    { id: "contact", title: "Questions, Concerns, or Complaints" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setShowToc(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SEO 
        title="Privacy Policy - Gaapio Data Protection"
        description="Learn how Gaapio protects your data. Our privacy policy covers data collection, usage, security, and your rights under GDPR."
        canonical="/privacy"
        keywords={['privacy policy', 'data protection', 'GDPR compliance', 'data security']}
      />
      <Header />
      
      <main className="flex-1 py-20">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Privacy Policy</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Effective Date: September 5, 2025
            </p>
            <Button 
              onClick={() => setShowToc(!showToc)}
              variant="outline"
              className="mb-6"
            >
              {showToc ? "Hide" : "Show"} Table of Contents
            </Button>
            
            {showToc && (
              <div className="bg-muted/50 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
                <nav className="space-y-2">
                  {sections.map((section, index) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="block text-left hover:text-primary transition-colors text-muted-foreground hover:underline"
                    >
                      {index + 1}. {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            )}
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-12">
            <section id="introduction">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Gaapio, Inc. ("Gaapio") is a provider of AI-powered accounting automation, technical accounting tools, and related professional software services.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We understand that you care about your personal privacy, and we take that responsibility seriously. This Privacy Policy describes Gaapio's practices regarding the collection, use, and protection of personal data, and outlines your privacy rights. Because privacy is an ongoing responsibility, we may update this policy from time to time as we implement new practices or adopt new policies.
              </p>
            </section>

            <Separator />

            <section id="dpo">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Data Protection Officer</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Gaapio, Inc. is headquartered in the United States.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Gaapio has appointed an internal Data Protection Officer to address any questions, concerns, or requests related to Gaapio's personal data handling practices. If you wish to exercise any of your privacy rights, please contact:
              </p>
              <div className="bg-muted/30 rounded-lg p-6">
                <p className="font-semibold mb-2">Data Protection Officer</p>
                <p className="text-muted-foreground">Gaapio, Inc.</p>
                <p className="text-muted-foreground">7533 S CENTER VIEW CT STE R</p>
                <p className="text-muted-foreground">WEST JORDAN, UT 84084</p>
                <p className="text-muted-foreground">privacy@gaapio.com</p>
              </div>
            </section>

            <Separator />

            <section id="collection">
              <h2 className="text-3xl font-bold mb-4 text-foreground">How We Collect and Use Your Personal Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Gaapio collects personal information from website visitors, prospects, and customers. This information typically includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                <li>Name</li>
                <li>Job title</li>
                <li>Employer name</li>
                <li>Work address</li>
                <li>Work email</li>
                <li>Work phone number</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use this information to deliver services, communicate with customers, and operate our business.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We do not sell personal information and share it only with third parties who help us deliver Gaapio services.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From time to time, Gaapio may also receive personal data from third-party sources, such as LinkedIn or data providers, typically relating to professional details about your employer or industry.
              </p>
            </section>

            <Separator />

            <section id="website">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Use of the gaapio.com Website</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Like most websites, Gaapio collects certain information automatically and stores it in log files. This may include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                <li>IP address</li>
                <li>Region or general location of your device</li>
                <li>Browser type</li>
                <li>Operating system</li>
                <li>Pages viewed and site interactions</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use this data to improve site performance, diagnose issues, analyze trends, and better understand user needs.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Gaapio has a legitimate interest in understanding how customers and visitors use our website so we can provide relevant services and appropriate resources.
              </p>
            </section>

            <Separator />

            <section id="cookies">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Cookies and Tracking Technologies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Gaapio uses cookies and similar technologies to support website functionality, analytics, and user preferences.
              </p>
            </section>

            <Separator />

            <section id="services">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Use of Gaapio Services</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When you use the Gaapio platform or related tools, we may collect additional data required for account management, service delivery, analytics, and security. This information may include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                <li>Account credentials</li>
                <li>Usage data within the platform</li>
                <li>Customer support interactions</li>
                <li>Configuration and integration details</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Gaapio uses this information solely to operate and improve the service and to support your account.
              </p>
            </section>

            <Separator />

            <section id="sharing">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Sharing Information with Third Parties</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Personal information collected by Gaapio is stored in databases hosted by third-party service providers in the United States. These providers do not access or use your information except to provide storage, infrastructure, or operational support.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Gaapio may also use third parties to send communications about products, services, and events.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A current list of Gaapio's sub-processors is available here:{" "}
                <a href="https://security.gaapio.com/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  https://security.gaapio.com/
                </a>
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Gaapio does not disclose personal data to external parties except in the following cases:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                <li>You request or authorize it</li>
                <li>It is necessary for Gaapio-hosted or co-sponsored events</li>
                <li>Compliance with law enforcement requests or legal obligations</li>
                <li>To enforce agreements or protect the rights and safety of Gaapio and others</li>
                <li>Emergencies or force majeure events</li>
                <li>To resolve disputes or respond to legally authorized representatives</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Aggregated, non-identifiable data may also be shared with partners for analytics or marketing purposes.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Gaapio's website may link to third-party platforms (e.g., LinkedIn, Twitter). Interactions with these services are governed by their respective privacy policies.
              </p>
            </section>

            <Separator />

            <section id="transfers">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Transferring Personal Data to the U.S.</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Gaapio is based in the United States, and information collected through our services is processed in the U.S.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By using Gaapio's website or services, you acknowledge that your information will be transferred to and processed in the United States.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The U.S. has not received an EU "adequacy" determination; however, Gaapio uses:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                <li>Standard contractual clauses (SCCs)</li>
                <li>Vendor data processing agreements</li>
                <li>Enhanced safeguards directed by the European Data Protection Board</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Gaapio has received zero government requests for user data since our founding.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                For questions, contact: privacy@gaapio.com
              </p>
            </section>

            <Separator />

            <section id="rights">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Data Subject Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Where applicable under GDPR or similar laws, you have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                <li>Be informed</li>
                <li>Access your data</li>
                <li>Request correction</li>
                <li>Request deletion</li>
                <li>Restrict processing</li>
                <li>Data portability</li>
                <li>Object to processing</li>
                <li>Avoid automated decision making and profiling</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may request:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                <li>The purpose of processing</li>
                <li>Categories of personal data</li>
                <li>Third parties who received your data</li>
                <li>Data source (if not provided directly by you)</li>
                <li>Storage duration</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Gaapio will provide reasonable access at no cost. If access must be delayed, Gaapio will provide a timeline. If access is denied, we will explain the reason.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Residents of the EU may also contact their national Data Protection Authority.
              </p>
            </section>

            <Separator />

            <section id="security">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Security of Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                Gaapio implements appropriate technical and organizational measures to secure personal data against loss, misuse, or unauthorized access.
              </p>
            </section>

            <Separator />

            <section id="storage">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Data Storage and Retention</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Personal data is stored on Gaapio-managed servers and cloud-based systems located in the United States.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Customer service data is retained for the duration of the business relationship and for a period thereafter for operations, analytics, and archiving.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Prospect data is retained until it is no longer valuable to Gaapio and is then purged.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                All personal data may be deleted upon verified request, subject to legal exceptions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                For inquiries, email: privacy@gaapio.com
              </p>
            </section>

            <Separator />

            <section id="children">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Children's Data</h2>
              <p className="text-muted-foreground leading-relaxed">
                Gaapio does not knowingly collect or solicit personal information from children. Our services are intended for business and professional users only.
              </p>
            </section>

            <Separator />

            <section id="contact">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Questions, Concerns, or Complaints</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions, concerns, or would like to exercise your data rights, please contact:
              </p>
              <div className="bg-muted/30 rounded-lg p-6">
                <p className="font-semibold mb-2">Gaapio, Inc.</p>
                <p className="text-muted-foreground">Attn: Data Protection Officer</p>
                <p className="text-muted-foreground">7533 S CENTER VIEW CT STE R</p>
                <p className="text-muted-foreground">WEST JORDAN, UT 84084</p>
                <p className="text-muted-foreground">privacy@gaapio.com</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
