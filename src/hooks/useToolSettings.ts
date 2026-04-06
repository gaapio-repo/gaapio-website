import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface ToolSetting {
  id: string;
  tool_slug: string;
  tool_name: string;
  description: string | null;
  enabled: boolean;
  require_email: boolean;
  email_gate_hard: boolean;
  email_gate_page_threshold: number;
  internal_domains: string[];
  base_route: string | null;
  created_at: string;
  updated_at: string;
}

export function useToolSettings() {
  return useQuery({
    queryKey: ['tool-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tool_settings')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data as ToolSetting[];
    },
  });
}

export function useToolSetting(slug: string) {
  return useQuery({
    queryKey: ['tool-setting', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tool_settings')
        .select('*')
        .eq('tool_slug', slug)
        .single();

      if (error) throw error;
      return data as ToolSetting;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!slug,
  });
}

export function useUpdateToolSetting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<ToolSetting> & { id: string }) => {
      const { data, error } = await supabase
        .from('tool_settings')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as ToolSetting;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tool-settings'] });
      queryClient.invalidateQueries({ queryKey: ['tool-setting'] });
      toast.success('Tool settings updated');
    },
    onError: (error) => {
      console.error('Error updating tool setting:', error);
      toast.error('Failed to update tool settings');
    },
  });
}
