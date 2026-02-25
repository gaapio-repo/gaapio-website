
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ErrorBoundary } from "@/components/ErrorBoundary";

interface AdminPageGuardProps {
  children: React.ReactNode;
}

export function AdminPageGuard({ children }: AdminPageGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is logged in and has admin role
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        console.log('AdminPageGuard: Checking session');
        const { data } = await supabase.auth.getSession();
        const session = data?.session;

        if (!session) {
          console.log('AdminPageGuard: No session found');
          setIsAuthenticated(false);
          setIsAuthorized(false);
          setIsLoading(false);
          return;
        }

        console.log('AdminPageGuard: Session found, user ID:', session.user.id);
        setIsAuthenticated(true);

        // Check if user has admin role - simplified approach
        try {
          const { data: isAdmin, error: roleError } = await supabase.rpc('has_role', {
            user_id: session.user.id,
            role: 'admin'
          });

          console.log('AdminPageGuard: Admin role check result:', { isAdmin, roleError });

          if (roleError) {
            console.error('AdminPageGuard: Error checking admin role:', roleError);
            setIsAuthorized(false);
          } else {
            // If isAdmin is truthy, the user has admin role
            setIsAuthorized(!!isAdmin);

            if (!isAdmin) {
              console.log('AdminPageGuard: User is not an admin');
            } else {
              console.log('AdminPageGuard: User is authorized as admin');
              localStorage.setItem("admin_authenticated", "true"); // For optional use in UI components
            }
          }
        } catch (authCheckError) {
          console.error('AdminPageGuard: Error in admin role check:', authCheckError);
          setIsAuthorized(false);
        }
      } catch (err) {
        console.error("AdminPageGuard: Error checking admin status:", err);
        setIsAuthenticated(false);
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      console.log('AdminPageGuard: Auth state changed:', event);
      if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setIsAuthorized(false);
        localStorage.removeItem("admin_authenticated");
      } else if (event === 'SIGNED_IN') {
        // Re-check admin status when user signs in
        checkAdminStatus();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      setIsAuthorized(false);
      localStorage.removeItem("admin_authenticated");
      navigate("/login");
    } catch (err) {
      console.error("AdminPageGuard: Logout error:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span>Verifying admin access...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  if (!isAuthorized) {
    return (
      <div className="container mx-auto py-8">
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            You don't have permission to access the admin area. Please contact an administrator if you believe this is an error.
          </AlertDescription>
        </Alert>
        <div className="flex justify-center">
          <Button onClick={() => navigate("/")} className="mr-4">Return to Home</Button>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={
      <div className="container mx-auto py-8">
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>
            There was an error loading the admin portal. Please try refreshing the page or contact support.
          </AlertDescription>
        </Alert>
        <div className="flex justify-center">
          <Button onClick={() => navigate("/")} className="mr-4">Return to Home</Button>
          <Button variant="outline" onClick={() => window.location.reload()}>Refresh Page</Button>
        </div>
      </div>
    }>
      {children}
    </ErrorBoundary>
  );
}
