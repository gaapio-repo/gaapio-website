import React from "react";
import { Navigate } from "react-router-dom";
import { useSiteConfig } from "@/hooks/useSiteConfig";

export function SignupGuard({ children }: { children: React.ReactNode }) {
  const { siteConfig, loading } = useSiteConfig();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  if (siteConfig && !siteConfig.enable_self_signup) {
    return <Navigate to="/contact" replace />;
  }

  return <>{children}</>;
}
