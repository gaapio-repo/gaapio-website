import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';

export interface ABTest {
  id: string;
  tool_slug: string;
  test_name: string;
  status: 'draft' | 'running' | 'paused' | 'completed';
  traffic_split: number;
  variant_a_config: Record<string, any>;
  variant_b_config: Record<string, any>;
  winner: string | null;
  started_at: string | null;
  ended_at: string | null;
  created_at: string;
  updated_at: string;
}

export function useToolABTests(toolSlug: string) {
  return useQuery({
    queryKey: ['tool-ab-tests', toolSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tool_ab_tests' )
        .select('*')
        .eq('tool_slug', toolSlug)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as unknown as ABTest[];
    },
    enabled: !!toolSlug,
  });
}

export function useActiveABTest(toolSlug: string) {
  return useQuery({
    queryKey: ['tool-ab-test-active', toolSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tool_ab_tests' )
        .select('*')
        .eq('tool_slug', toolSlug)
        .eq('status', 'running')
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data as unknown as ABTest | null;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!toolSlug,
  });
}

export function useCreateABTest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (test: Omit<ABTest, 'id' | 'created_at' | 'updated_at' | 'started_at' | 'ended_at' | 'winner'>) => {
      const { data, error } = await supabase
        .from('tool_ab_tests' )
        .insert(test)
        .select()
        .single();

      if (error) throw error;
      return data as unknown as ABTest;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tool-ab-tests', data.tool_slug] });
      queryClient.invalidateQueries({ queryKey: ['tool-ab-test-active', data.tool_slug] });
      toast.success('A/B test created');
    },
    onError: () => toast.error('Failed to create A/B test'),
  });
}

export function useUpdateABTest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<ABTest> & { id: string }) => {
      const { data, error } = await supabase
        .from('tool_ab_tests' )
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as unknown as ABTest;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tool-ab-tests', data.tool_slug] });
      queryClient.invalidateQueries({ queryKey: ['tool-ab-test-active', data.tool_slug] });
      toast.success('A/B test updated');
    },
    onError: () => toast.error('Failed to update A/B test'),
  });
}

interface VariantAssignment {
  variantId: string | null;
  variantConfig: Record<string, any> | null;
  isInTest: boolean;
}

export function useABVariantAssignment(toolSlug: string): VariantAssignment {
  const { data: activeTest } = useActiveABTest(toolSlug);
  const [assignment, setAssignment] = useState<VariantAssignment>({
    variantId: null,
    variantConfig: null,
    isInTest: false,
  });

  useEffect(() => {
    if (!activeTest) {
      setAssignment({ variantId: null, variantConfig: null, isInTest: false });
      return;
    }

    const storageKey = `ab_variant_${toolSlug}`;
    const existingVariant = sessionStorage.getItem(storageKey);

    if (existingVariant) {
      // Already assigned — determine which variant
      const isB = existingVariant === activeTest.id + '_b';
      setAssignment({
        variantId: existingVariant,
        variantConfig: isB ? activeTest.variant_b_config : activeTest.variant_a_config,
        isInTest: true,
      });
      return;
    }

    // New assignment — randomly assign based on traffic split
    const random = Math.random() * 100;
    const isB = random < activeTest.traffic_split;
    const variantId = activeTest.id + (isB ? '_b' : '_a');

    sessionStorage.setItem(storageKey, variantId);

    setAssignment({
      variantId,
      variantConfig: isB ? activeTest.variant_b_config : activeTest.variant_a_config,
      isInTest: true,
    });
  }, [activeTest, toolSlug]);

  return assignment;
}
