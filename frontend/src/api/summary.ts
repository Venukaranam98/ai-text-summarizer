import { apiClient } from '../clients/apiClient';
import type { SummaryCreateRequest, SummaryResponse, PaginatedSummaryResponse } from '../types/summary';

export const createSummary = async (data: SummaryCreateRequest): Promise<SummaryResponse> => {
  return apiClient('/summary/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const getSummaries = async (page = 1, pageSize = 10): Promise<PaginatedSummaryResponse> => {
  return apiClient(`/summary/?page=${page}&page_size=${pageSize}`, {
    method: 'GET',
  });
};
