export type SummaryMode = 'brief' | 'detailed' | 'bullet_points';

export interface SummaryResponse {
  id: string;
  original_text: string;
  mode: SummaryMode;
  summary_text: string;
  created_at: string;
}

export interface PaginatedSummaryResponse {
  total: number;
  page: number;
  page_size: number;
  items: SummaryResponse[];
}

export interface SummaryCreateRequest {
  text: string;
  mode: SummaryMode;
}
