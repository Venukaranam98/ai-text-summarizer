import React, { useState } from 'react';
import { DashboardLayout } from '../../shared/DashboardLayout';
import { useSummariesQuery } from '../../hooks/api/useSummariesQuery';
import type { SummaryResponse } from '../../types/summary';
import { toast } from 'sonner';

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);
const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);
const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
import * as S from './HistoryPage.styles';
import * as SummaryStyles from '../summary/SummaryPage.styles';

export const HistoryPage = () => {
  const { data: summariesData, isLoading } = useSummariesQuery();
  const [activeSummary, setActiveSummary] = useState<SummaryResponse | null>(null);

  const formatRelativeTime = (isoString: string) => {
    const d = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return 'Yesterday';
    return `${d.getDate()} ${d.toLocaleString('default', { month: 'short' })}`;
  };

  const getModeLabel = (mode: string) => {
    switch(mode) {
      case 'brief': return '🟣 Brief';
      case 'detailed': return '🔵 Detailed';
      case 'bullet_points': return '🟢 Bullet Points';
      default: return mode;
    }
  };

  const copyToClipboard = (content: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard');
  };

  return (
    <DashboardLayout>
      <S.PageContainer>
        <S.Header>
          <div>
            <S.Title>History</S.Title>
            <S.Subtitle>Browse all your generated summaries.</S.Subtitle>
          </div>
        </S.Header>

        {isLoading && <div style={{ color: '#6b7280' }}>Loading summaries...</div>}

        {!isLoading && summariesData?.items && summariesData.items.length === 0 && (
          <div style={{ color: '#6b7280' }}>No summaries found. Create one to see it here!</div>
        )}

        <S.GridContainer>
          {summariesData?.items.map((summary) => {
            const title = summary.original_text.length > 40
              ? summary.original_text.slice(0, 40) + "..." 
              : summary.original_text;

            return (
              <S.SummaryCard key={summary.id} onClick={() => setActiveSummary(summary)}>
                <S.CardHeader>
                  <S.CardTitle>{title}</S.CardTitle>
                </S.CardHeader>
                <S.CardDate>
                  {getModeLabel(summary.mode)} • {formatRelativeTime(summary.created_at)}
                </S.CardDate>
                <S.CardBody>{summary.summary_text}</S.CardBody>
                
                <S.CardFooter>
                  <S.IconButton 
                    onClick={(e) => copyToClipboard(summary.summary_text, e)}
                    title="Copy Summary"
                  >
                    <CopyIcon style={{ width: 14, height: 14 }} />
                  </S.IconButton>
                </S.CardFooter>
              </S.SummaryCard>
            );
          })}
        </S.GridContainer>
      </S.PageContainer>

      {/* Detail Drawer (re-using styles from SummaryPage) */}
      {activeSummary && (
        <SummaryStyles.SummaryDetailOverlay>
          <SummaryStyles.CloseOverlayButton onClick={() => setActiveSummary(null)}>
            <CloseIcon />
          </SummaryStyles.CloseOverlayButton>
          
          <SummaryStyles.DetailHeader>
            <div>
              <SummaryStyles.DetailTitle>
                {activeSummary.original_text.length > 35 
                  ? activeSummary.original_text.slice(0, 35) + "..." 
                  : activeSummary.original_text}
              </SummaryStyles.DetailTitle>
              <SummaryStyles.DetailMeta>
                <SummaryStyles.Badge>{getModeLabel(activeSummary.mode)}</SummaryStyles.Badge>
                <SummaryStyles.DateText>{formatRelativeTime(activeSummary.created_at)}</SummaryStyles.DateText>
              </SummaryStyles.DetailMeta>
            </div>
          </SummaryStyles.DetailHeader>

          <SummaryStyles.DetailContent>
            <SummaryStyles.SectionHeader>
              <SummaryStyles.SectionTitle>Original Text</SummaryStyles.SectionTitle>
            </SummaryStyles.SectionHeader>
            <SummaryStyles.OriginalTextBlock>{activeSummary.original_text}</SummaryStyles.OriginalTextBlock>
            
            <SummaryStyles.SectionHeader>
              <SummaryStyles.SectionTitle>✨ Summary</SummaryStyles.SectionTitle>
              <SummaryStyles.ActionButton 
                onClick={() => copyToClipboard(activeSummary.summary_text)} 
                aria-label="Copy"
                style={{ height: '32px', padding: '0 12px', fontSize: '13px' }}
              >
                <CopyIcon style={{ width: 14, height: 14 }} /> Copy
              </SummaryStyles.ActionButton>
            </SummaryStyles.SectionHeader>
            <SummaryStyles.TextBlock highlight>{activeSummary.summary_text}</SummaryStyles.TextBlock>
          </SummaryStyles.DetailContent>

          <SummaryStyles.DetailFooter>
            <SummaryStyles.DetailActions>
              <SummaryStyles.ActionButton 
                onClick={() => copyToClipboard(activeSummary.summary_text)} 
                aria-label="Copy Summary"
              >
                <CopyIcon /> Copy Summary
              </SummaryStyles.ActionButton>
              <SummaryStyles.ActionButton 
                onClick={() => {
                  const element = document.createElement("a");
                  const file = new Blob([activeSummary.summary_text], {type: 'text/plain'});
                  element.href = URL.createObjectURL(file);
                  element.download = `summary_${activeSummary.id}.txt`;
                  document.body.appendChild(element);
                  element.click();
                  toast.success("Download started");
                }} 
                aria-label="Download"
              >
                <DownloadIcon /> Download
              </SummaryStyles.ActionButton>
              <SummaryStyles.ActionButton danger onClick={() => {
                setActiveSummary(null);
                // Would add actual delete logic here
                toast.success("Summary deleted");
              }} aria-label="Delete">
                <TrashIcon /> Delete
              </SummaryStyles.ActionButton>
            </SummaryStyles.DetailActions>
          </SummaryStyles.DetailFooter>
        </SummaryStyles.SummaryDetailOverlay>
      )}
    </DashboardLayout>
  );
};
