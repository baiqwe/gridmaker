import { getCurrentPlan } from '@/api/payment';
import { useQuery } from '@tanstack/react-query';

export function useCurrentPlan(userId: string | undefined) {
  return useQuery({
    queryKey: ['currentPlan', userId],
    queryFn: async () => {
      if (!userId) throw new Error('userId required');
      return getCurrentPlan({ data: { userId } });
    },
    enabled: !!userId,
    refetchOnWindowFocus: true,
  });
}
