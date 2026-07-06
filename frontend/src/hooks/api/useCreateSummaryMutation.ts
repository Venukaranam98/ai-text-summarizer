import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSummary } from '../../api/summary';
import type { SummaryCreateRequest, SummaryResponse } from '../../types/summary';

export const useCreateSummaryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<SummaryResponse, Error, SummaryCreateRequest>({
    mutationFn: createSummary,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['summaries'] });
    },
  });
};
