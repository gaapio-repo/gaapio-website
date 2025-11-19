import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

export default function TermsOfService() {
  const [showTableOfContents, setShowTableOfContents] = useState(false);

  const sections = [
    { id: "agreement", title: "1. Agreement to Terms" },
    { id: "company-info", title: "2. Company Information" },
    { id: "intellectual-property", title: "3. Intellectual Property" },
    { id: "user-accounts", title: "4. User Accounts & Responsibilities" },
    { id: "fees-billing", title: "5. Fees, Billing & Subscriptions" },
    { id: "cancellation", title: "6. Cancellation" },
    { id: "prohibited", title: "7. Prohibited Activities" },
    { id: "user-content", title: "8. User Content" },
    { id: "feedback", title: "9. Feedback & Submissions" },
    { id: "government", title: "10. U.S. Government Use" },
    { id: "service-management", title: "11. Service Management" },
    { id: "term-termination", title: "12. Term & Termination" },
    { id: "service-availability", title: "13. Service Availability" },
    { id: "governing-law", title: "14. Governing Law" },
    { id: "dispute-resolution", title: "15. Dispute Resolution" },
    { id: "corrections", title: "16. Corrections" },
    { id: "disclaimer", title: "17. Disclaimer of Warranties" },
    { id: "limitation", title: "18. Limitation of Liability" },
    { id: "indemnification", title: "19. Indemnification" },
    { id: "user-data", title: "20. User Data & Backups" },
    { id: "electronic-communications", title: "21. Electronic Communications & Signatures" },
    { id: "miscellaneous", title: "22. Miscellaneous" },
    { id: "contact", title: "23. Contact Us" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto py-20">
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground text-center">
              Terms of Service
            </h1>
            <p className="text-lg text-muted-foreground mb-6 text-center">
              Effective Date: September 5, 2025
            </p>

            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => setShowTableOfContents(!showTableOfContents)}
                className="mb-6"
              >
                {showTableOfContents ? "Hide" : "Show"} Table of Contents
              </Button>
            </div>

            {showTableOfContents && (
              <div className="bg-muted/50 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4 text-foreground">Table of Contents</h2>
                <nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="text-left text-sm text-muted-foreground hover:text-primary hover:underline py-1"
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            )}
          </div>

          <div className="space-y-12 text-left">
            <section id="agreement">
              <h2 className="text-3xl font-bold mb-4 text-foreground">1. AGREEMENT TO TERMS</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These Terms of Service ("Terms") form a legally binding agreement between you ("Customer," "you," or "your") and Gaapio, Inc., a Utah corporation ("Gaapio," "we," "us," or "our"), governing your use of:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                <li>The Gaapio website (gaapio.com),</li>
                <li>The Gaapio SaaS platform and dashboard,</li>
                <li>All Gaapio tools, APIs, AI features, and integrations, and</li>
                <li>Any related products, services, content, or materials (collectively, the "Services").</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By accessing or using the Services, you agree to these Terms. If you do not agree, you must discontinue use immediately.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Gaapio may update these Terms at any time. Updated Terms become effective when posted to the site. Continued use constitutes acceptance.
              </p>
            </section>

            <section id="company-info">
              <h2 className="text-3xl font-bold mb-4 text-foreground">2. COMPANY INFORMATION</h2>
              <div className="bg-muted/30 p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground">Gaapio, Inc.</p>
                <p className="text-muted-foreground">A Utah Corporation</p>
                <p className="text-muted-foreground">Address: 7533 S CENTER VIEW CT STE R WEST JORDAN, UT 84084</p>
                <p className="text-muted-foreground">Email: support@gaapio.com</p>
              </div>
            </section>

            <section id="intellectual-property">
              <h2 className="text-3xl font-bold mb-4 text-foreground">3. INTELLECTUAL PROPERTY</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Gaapio owns all rights, title, and interest in:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                <li>The Services and underlying software</li>
                <li>AI models, prompts, datasets, and outputs</li>
                <li>Platform UI, workflows, dashboards, and documentation</li>
                <li>Gaapio trademarks, logos, branding, and designs</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                All rights are reserved except those expressly granted.
              </p>
              <h3 className="text-2xl font-semibold mt-6 mb-3 text-foreground">Customer License</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Gaapio grants you a limited, revocable, non-transferable, non-exclusive license to access and use the Services during your active subscription.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">You may not:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                <li>Copy, modify, reverse engineer, or create derivative works of the Services</li>
                <li>Use Gaapio content or output to build a competing product</li>
                <li>Scrape, extract, or harvest platform data</li>
                <li>Remove or modify any proprietary notices</li>
                <li>Use Gaapio's models or prompts to train any AI system</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Unauthorized use terminates your license immediately.
              </p>
            </section>

            <section id="user-accounts">
              <h2 className="text-3xl font-bold mb-4 text-foreground">4. USER ACCOUNTS & RESPONSIBILITIES</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">You agree to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                <li>Provide accurate, current information</li>
                <li>Maintain the security of your login credentials</li>
                <li>Accept responsibility for all actions taken under your account</li>
                <li>Notify Gaapio of any unauthorized access</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Gaapio may suspend or terminate accounts for inaccurate information or misuse.
              </p>
            </section>

            <section id="fees-billing">
              <h2 className="text-3xl font-bold mb-4 text-foreground">5. FEES, BILLING & SUBSCRIPTIONS</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                All paid Services require valid payment information.
              </p>
              <h3 className="text-2xl font-semibold mt-6 mb-3 text-foreground">Billing Terms</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                <li>All fees are billed in U.S. Dollars</li>
                <li>Subscriptions automatically renew unless canceled</li>
                <li>Prices may change with notice</li>
                <li>Applicable taxes may be added</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You authorize Gaapio to charge your payment method on a recurring basis until cancellation.
              </p>
              <h3 className="text-2xl font-semibold mt-6 mb-3 text-foreground">Refunds</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                All payments are non-refundable, except where required by law.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Late or failed payments may result in suspension of access.
              </p>
            </section>

            <section id="cancellation">
              <h2 className="text-3xl font-bold mb-4 text-foreground">6. CANCELLATION</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may cancel at any time by contacting support@gaapio.com.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Cancellation becomes effective at the end of the current billing term. Gaapio does not issue refunds for partial billing periods.
              </p>
            </section>

            <section id="prohibited">
              <h2 className="text-3xl font-bold mb-4 text-foreground">7. PROHIBITED ACTIVITIES</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                <li>Use the Services for any unlawful purpose</li>
                <li>Attempt unauthorized access to Gaapio systems or data</li>
                <li>Upload or transmit malware, harmful code, or automated scripts</li>
                <li>Interfere with platform functionality or security</li>
                <li>Scrape, crawl, or harvest content</li>
                <li>Use Gaapio outputs to violate accounting standards or regulations</li>
                <li>Use Gaapio to train any machine learning or AI models</li>
                <li>Misrepresent identity or create fraudulent accounts</li>
                <li>Use the Services for a competing product</li>
                <li>Abuse customer support channels or harass Gaapio staff</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Violations may result in suspension or termination.
              </p>
            </section>

            <section id="user-content">
              <h2 className="text-3xl font-bold mb-4 text-foreground">8. USER CONTENT</h2>
              <h3 className="text-2xl font-semibold mt-4 mb-3 text-foreground">Ownership</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You retain ownership of documents, data, and materials you upload ("Customer Content").
              </p>
              <h3 className="text-2xl font-semibold mt-6 mb-3 text-foreground">License to Gaapio</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You grant Gaapio a limited license to store, process, and analyze Customer Content solely to provide and improve the Services.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Gaapio does not use Customer Content to train public AI models.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                You represent that you have lawful rights to all uploaded content.
              </p>
            </section>

            <section id="feedback">
              <h2 className="text-3xl font-bold mb-4 text-foreground">9. FEEDBACK & SUBMISSIONS</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Any suggestions, feedback, ideas, or improvements submitted to Gaapio become Gaapio's property.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Gaapio may use such submissions without restriction or compensation.
              </p>
            </section>

            <section id="government">
              <h2 className="text-3xl font-bold mb-4 text-foreground">10. U.S. GOVERNMENT USE</h2>
              <p className="text-muted-foreground leading-relaxed">
                Gaapio software is provided as "commercial items" under FAR 2.101 and is subject to limited rights applicable to commercial software.
              </p>
            </section>

            <section id="service-management">
              <h2 className="text-3xl font-bold mb-4 text-foreground">11. SERVICE MANAGEMENT</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">Gaapio may:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                <li>Monitor use for compliance</li>
                <li>Restrict, suspend, or terminate access to protect the platform</li>
                <li>Remove harmful or unlawful content</li>
                <li>Modify or discontinue parts of the Services</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Gaapio provides updates and enhancements at its sole discretion.
              </p>
            </section>

            <section id="term-termination">
              <h2 className="text-3xl font-bold mb-4 text-foreground">12. TERM & TERMINATION</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These Terms remain in effect while you use the Services.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Gaapio may suspend or terminate your account immediately for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                <li>Violation of these Terms</li>
                <li>Fraudulent or unlawful activity</li>
                <li>Threats to platform security</li>
                <li>Failure to pay subscription fees</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                After termination, you may not create a new account without Gaapio's permission.
              </p>
            </section>

            <section id="service-availability">
              <h2 className="text-3xl font-bold mb-4 text-foreground">13. SERVICE AVAILABILITY</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Gaapio strives for high uptime but does not guarantee:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                <li>Uninterrupted service</li>
                <li>Error-free functionality</li>
                <li>Continuous availability</li>
                <li>Immediate issue resolution</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Gaapio is not responsible for downtime caused by maintenance, outages, third-party failures, or events beyond our control.
              </p>
            </section>

            <section id="governing-law">
              <h2 className="text-3xl font-bold mb-4 text-foreground">14. GOVERNING LAW</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These Terms are governed by the laws of the State of Utah, without regard to conflict-of-law principles.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Subject to the Arbitration section, all disputes must be brought exclusively in the state or federal courts located in Salt Lake County, Utah.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                You consent to personal jurisdiction in Utah.
              </p>
            </section>

            <section id="dispute-resolution">
              <h2 className="text-3xl font-bold mb-4 text-foreground">15. DISPUTE RESOLUTION</h2>
              <h3 className="text-2xl font-semibold mt-4 mb-3 text-foreground">Informal Negotiations</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Before initiating arbitration, parties must attempt to resolve disputes informally for 30 days.
              </p>
              <h3 className="text-2xl font-semibold mt-6 mb-3 text-foreground">Binding Arbitration</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If not resolved, disputes shall be submitted to binding arbitration administered by the American Arbitration Association (AAA) under its Commercial Rules.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Location: Salt Lake County, Utah (unless mutually agreed otherwise).
              </p>
              <h3 className="text-2xl font-semibold mt-6 mb-3 text-foreground">Class Action Waiver</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">You agree that:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                <li>Arbitration will be on an individual basis only</li>
                <li>No class actions or class arbitrations</li>
                <li>No representative or collective actions</li>
              </ul>
              <h3 className="text-2xl font-semibold mt-6 mb-3 text-foreground">Exceptions</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The following may be brought directly in court:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                <li>Intellectual property disputes</li>
                <li>Claims involving unauthorized access or misuse</li>
                <li>Requests for injunctive or equitable relief</li>
              </ul>
            </section>

            <section id="corrections">
              <h2 className="text-3xl font-bold mb-4 text-foreground">16. CORRECTIONS</h2>
              <p className="text-muted-foreground leading-relaxed">
                Gaapio may correct errors, update content, or revise information without notice.
              </p>
            </section>

            <section id="disclaimer">
              <h2 className="text-3xl font-bold mb-4 text-foreground">17. DISCLAIMER OF WARRANTIES</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE." GAAPIO DISCLAIMS ALL WARRANTIES, INCLUDING:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                <li>Merchantability</li>
                <li>Fitness for a particular purpose</li>
                <li>Non-infringement</li>
                <li>Accuracy or reliability of AI-generated output</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                AI may produce incomplete or inaccurate information. You are solely responsible for verifying accounting conclusions or regulatory compliance.
              </p>
            </section>

            <section id="limitation">
              <h2 className="text-3xl font-bold mb-4 text-foreground">18. LIMITATION OF LIABILITY</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To the fullest extent permitted by law:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                <li>Gaapio's total liability will not exceed the fees paid by you in the 12 months prior to the claim</li>
                <li>Gaapio is not liable for indirect, incidental, consequential, or special damages</li>
                <li>Gaapio is not responsible for decisions made using AI-generated content</li>
              </ul>
            </section>

            <section id="indemnification">
              <h2 className="text-3xl font-bold mb-4 text-foreground">19. INDEMNIFICATION</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You agree to indemnify and hold harmless Gaapio from claims arising out of:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                <li>Your use of the Services</li>
                <li>Violation of these Terms</li>
                <li>Misuse of AI-generated content</li>
                <li>Infringement of third-party rights</li>
                <li>Unauthorized or unlawful actions</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Gaapio may assume exclusive defense at your expense.
              </p>
            </section>

            <section id="user-data">
              <h2 className="text-3xl font-bold mb-4 text-foreground">20. USER DATA & BACKUPS</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Gaapio may store data as needed to operate the Services.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                You are responsible for backing up your data. Gaapio is not liable for loss or corruption of data.
              </p>
            </section>

            <section id="electronic-communications">
              <h2 className="text-3xl font-bold mb-4 text-foreground">21. ELECTRONIC COMMUNICATIONS & SIGNATURES</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By using the Services, you consent to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                <li>Receiving electronic communications</li>
                <li>Electronic agreements and signatures</li>
                <li>Electronic delivery of notices, policies, and records</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                These have the same legal effect as physical documents.
              </p>
            </section>

            <section id="miscellaneous">
              <h2 className="text-3xl font-bold mb-4 text-foreground">22. MISCELLANEOUS</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                <li>These Terms constitute the entire agreement between you and Gaapio.</li>
                <li>Gaapio may assign rights and obligations freely.</li>
                <li>Invalid provisions do not affect the remainder.</li>
                <li>No joint venture, partnership, or agency relationship is created.</li>
                <li>You waive any rule that construes ambiguities against the drafter.</li>
              </ul>
            </section>

            <section id="contact">
              <h2 className="text-3xl font-bold mb-4 text-foreground">23. CONTACT US</h2>
              <div className="bg-muted/30 p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground">Gaapio, Inc.</p>
                <p className="text-muted-foreground">Email: support@gaapio.com</p>
                <p className="text-muted-foreground">Address: 7533 S CENTER VIEW CT STE R</p>
                <p className="text-muted-foreground">WEST JORDAN, UT 84084</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
