import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Brain, Search, FileText, Zap, Shield, Users } from "lucide-react";

export default function ResearchGPT() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <ResponsiveContainer>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
              <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">AI-Powered Research Assistant</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Your Firm's Internal GPT
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Unlock instant access to your firm's collective knowledge. Ask questions naturally and get accurate answers from your internal documents and resources.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="blue" size="lg" asChild>
                <Link to="/request-demo">Request a Demo</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </ResponsiveContainer>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <ResponsiveContainer>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              How Research/Internal GPT Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Transform your firm's knowledge into actionable insights with AI
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center">
                <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">1. Upload Your Knowledge</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Securely upload your firm's documents, templates, guides, and reference materials to create your custom knowledge base.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center">
                <Search className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">2. Ask Questions Naturally</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Use natural language to query your knowledge base. No complex search syntax required—just ask like you're talking to a colleague.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center">
                <Zap className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">3. Get Instant Answers</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Receive contextual, accurate answers with citations to source documents. Save hours of manual searching and reference checking.
              </p>
            </div>
          </div>
        </ResponsiveContainer>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <ResponsiveContainer>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to make your firm's knowledge instantly accessible
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm">
              <Shield className="h-10 w-10 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Secure & Private
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your firm's data stays private and secure. Enterprise-grade encryption ensures your sensitive information never leaves your control.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm">
              <Brain className="h-10 w-10 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Context-Aware Responses
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get answers that understand your firm's unique context, terminology, and procedures. Not just generic responses.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm">
              <FileText className="h-10 w-10 text-green-600 dark:text-green-400 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Source Citations
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Every answer includes references to the source documents, so you can verify and dive deeper when needed.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm">
              <Users className="h-10 w-10 text-orange-600 dark:text-orange-400 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Team Collaboration
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Share insights across your team. Make your firm's institutional knowledge accessible to everyone who needs it.
              </p>
            </div>
          </div>
        </ResponsiveContainer>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <ResponsiveContainer>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Firm's Research?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join leading accounting firms using Gaapio's Research/Internal GPT to save time and improve accuracy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="default" size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
                <Link to="/request-demo">Request a Demo</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </ResponsiveContainer>
      </section>

      <Footer />
    </div>
  );
}
