import { useToolSetting } from '@/hooks/useToolSettings';
import { useToolPageTracking } from '@/hooks/useToolPageTracking';
import { useABVariantAssignment } from '@/hooks/useToolABTest';
import { EmailGate } from '@/components/tools/EmailGate';
import { ToolComingSoon } from '@/components/tools/ToolComingSoon';

interface ToolPageWrapperProps {
  toolSlug: string;
  children: React.ReactNode;
}

export function ToolPageWrapper({ toolSlug, children }: ToolPageWrapperProps) {
  const { data: setting, isLoading, isError } = useToolSetting(toolSlug);
  const internalDomains = setting?.internal_domains ?? [];
  useToolPageTracking(toolSlug, internalDomains);
  const { variantId, variantConfig } = useABVariantAssignment(toolSlug);

  // Loading state — render nothing to avoid flash
  if (isLoading) return null;

  // Graceful fallback if setting not found or query errored
  if (isError || !setting) {
    return <>{children}</>;
  }

  // Tool is disabled — show coming soon page
  if (!setting.enabled) {
    return (
      <ToolComingSoon
        toolName={setting.tool_name}
        toolDescription={setting.description ?? undefined}
        toolSlug={toolSlug}
      />
    );
  }

  // Tool is enabled — wrap with email gate
  return (
    <EmailGate
      toolSlug={toolSlug}
      toolConfig={{
        require_email: setting.require_email,
        email_gate_hard: setting.email_gate_hard,
        email_gate_page_threshold: setting.email_gate_page_threshold,
        internal_domains: internalDomains,
      }}
      variantConfig={variantConfig}
      abVariantId={variantId}
    >
      {children}
    </EmailGate>
  );
}
