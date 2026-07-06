import { useQuery } from '@tanstack/react-query';
import { getSummaries } from '../../api/summary';
import type { PaginatedSummaryResponse } from '../../types/summary';

export const useSummariesQuery = (page = 1, pageSize = 10) => {
  return useQuery<PaginatedSummaryResponse, Error>({
    queryKey: ['summaries', page, pageSize],
    queryFn: async () => {
      const response = await getSummaries(page, pageSize);
      console.log('API Response (Fetch Summaries):', response);
      return response;
    },
  });
};
