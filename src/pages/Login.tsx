import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, ArrowLeft, Mail, KeyRound } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { SEO } from "@/components/SEO";

type LoginMode = 'login' | 'forgot-password' | 'magic-link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<LoginMode>('login');
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/admin');
      }
    };
    checkSession();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      if (data.user) {
        const { data: isAdmin, error: roleError } = await supabase.rpc('has_role', {
          user_id: data.user.id,
          role: 'admin'
        });

        if (roleError) throw roleError;

        if (!isAdmin) {
          await supabase.auth.signOut();
          throw new Error('You do not have permission to access the admin area.');
        }

        toast({ title: "Login Successful", description: "Welcome to the admin area!" });
        navigate('/admin');
      }
    } catch (error: any) {
      let errorMessage = "Unable to login. Please try again.";
      if (error.message?.includes('Invalid login credentials')) {
        errorMessage = "Incorrect email or password. Please try again.";
      } else if (error.message?.includes('permission')) {
        errorMessage = error.message;
      }
      toast({ title: "Login Failed", description: errorMessage, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({ title: "Email required", description: "Please enter your email address.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });
      if (error) throw error;
      setEmailSent(true);
      toast({ title: "Email Sent", description: "Check your inbox for the password reset link." });
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to send reset email.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({ title: "Email required", description: "Please enter your email address.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      setEmailSent(true);
      toast({ title: "Magic Link Sent", description: "Check your inbox for the login link." });
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to send magic link.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMicrosoftLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'azure',
        options: {
          redirectTo: window.location.origin + '/admin',
          scopes: 'email',
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast({ title: "Login Failed", description: error.message || "Failed to sign in with Microsoft.", variant: "destructive" });
      setIsLoading(false);
    }
  };

  const switchMode = (newMode: LoginMode) => {
    setMode(newMode);
    setEmailSent(false);
    setPassword('');
  };

  const renderTitle = () => {
    switch (mode) {
      case 'forgot-password': return 'Reset Password';
      case 'magic-link': return 'Magic Link Login';
      default: return 'Admin Login';
    }
  };

  const renderDescription = () => {
    switch (mode) {
      case 'forgot-password': return "Enter your email and we'll send you a reset link";
      case 'magic-link': return "Enter your email and we'll send you a login link";
      default: return 'Enter your credentials to access the admin panel';
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title="Admin Login - Gaapio"
        description="Secure login portal for Gaapio administrators and team members."
        canonical="/login"
        noindex={true}
      />
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
        <ResponsiveContainer>
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle>{renderTitle()}</CardTitle>
              <CardDescription>{renderDescription()}</CardDescription>
            </CardHeader>
            <CardContent>
              {emailSent ? (
                <div className="text-center space-y-4">
                  <Mail className="h-12 w-12 mx-auto text-primary" />
                  <p className="text-sm text-muted-foreground">
                    We've sent an email to <strong>{email}</strong>.
                    {mode === 'forgot-password'
                      ? ' Click the link in the email to reset your password.'
                      : ' Click the link in the email to log in.'}
                  </p>
                  <Button variant="outline" className="w-full" onClick={() => switchMode('login')}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login
                  </Button>
                </div>
              ) : mode === 'login' ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="admin@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <button type="button" className="text-xs text-primary hover:underline" onClick={() => switchMode('forgot-password')}>
                        Forgot password?
                      </button>
                    </div>
                    <Input id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Logging in...</>) : "Login"}
                  </Button>
                  <div className="relative my-2">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">or</span></div>
                  </div>
                   <Button type="button" variant="outline" className="w-full" onClick={() => switchMode('magic-link')}>
                    <KeyRound className="mr-2 h-4 w-4" />
                    Send Magic Link
                  </Button>
                  <div className="relative my-2">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">or</span></div>
                  </div>
                  <Button type="button" variant="outline" className="w-full" onClick={handleMicrosoftLogin} disabled={isLoading}>
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 21 21" fill="none"><rect x="1" y="1" width="9" height="9" fill="#F25022"/><rect x="11" y="1" width="9" height="9" fill="#7FBA00"/><rect x="1" y="11" width="9" height="9" fill="#00A4EF"/><rect x="11" y="11" width="9" height="9" fill="#FFB900"/></svg>
                    Sign in with Microsoft
                  </Button>
                </form>
              ) : (
                <form onSubmit={mode === 'forgot-password' ? handleForgotPassword : handleMagicLink} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reset-email">Email</Label>
                    <Input id="reset-email" type="email" placeholder="admin@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending...</>) : mode === 'forgot-password' ? 'Send Reset Link' : 'Send Magic Link'}
                  </Button>
                  <Button type="button" variant="ghost" className="w-full" onClick={() => switchMode('login')}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </ResponsiveContainer>
      </main>
      <Footer />
    </div>
  );
}
