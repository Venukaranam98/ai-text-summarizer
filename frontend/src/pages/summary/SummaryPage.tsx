import React, { useState } from 'react';
import { toast } from 'sonner';
import { DashboardLayout } from '../../shared/DashboardLayout';
import { useCreateSummaryMutation } from '../../hooks/api/useCreateSummaryMutation';
import { useSummariesQuery } from '../../hooks/api/useSummariesQuery';
import type { SummaryMode, SummaryResponse } from '../../types/summary';
import * as S from './SummaryPage.styles';
import { ButtonPrimary } from '../../app/App.styles';

// -- Icons --
const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);
const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);
const FilterIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);
const BriefIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line>
  </svg>
);
const BulletPointsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line>
  </svg>
);
const DetailedIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);
const DocumentIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
    <path d="M14 2v6h6" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);
const ChevronRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);
const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>
);
const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const SparklesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
  </svg>
);
const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);
const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

export const SummaryPage = () => {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<SummaryMode>('brief');
  const [activeSummary, setActiveSummary] = useState<SummaryResponse | null>(null);
  const MAX_CHARS = 10000;

  const { mutate: createSummary, isPending } = useCreateSummaryMutation();
  const { data: summariesData, isLoading: isLoadingSummaries } = useSummariesQuery(1, 10);

  const handleClear = () => {
    setText('');
  };

  const handleGenerate = () => {
    if (!text.trim()) {
      toast.error('Please enter some text to summarize.');
      return;
    }
    createSummary(
      { text, mode },
      {
        onSuccess: (data) => {
          console.log('API Response (Create Summary):', data);
          toast.success('Summary generated successfully!');
          setActiveSummary(data);
          setText('');
        },
        onError: (err) => {
          console.error('API Error (Create Summary):', err);
          toast.error(err.message || 'Failed to generate summary.');
        }
      }
    );
  };

  const formatRelativeTime = (isoString: string) => {
    const d = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return 'Yesterday';
    return `${d.getDate()} ${d.toLocaleString('default', { month: 'short' })}`;
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard');
  };

  return (
    <DashboardLayout>
      <S.PageLayout>
        {/* Left Column: Editor */}
        <S.LeftColumn>
          <S.FormCard>
            <S.PageTitle>Create Summary</S.PageTitle>
            <S.PageSubtitle>Paste your text below to get an AI-generated summary.</S.PageSubtitle>

            <S.TextAreaWrapper>
              <S.TextAreaLabel>Original Text</S.TextAreaLabel>
              <S.StyledTextArea
                placeholder="Enter or paste your text here (up to 10,000 characters)..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={MAX_CHARS}
              />
              <S.TextFooter>
                <S.CharCount>
                  {text.length.toLocaleString()} / {MAX_CHARS.toLocaleString()}
                </S.CharCount>
                {text.length > 0 && (
                  <S.ClearButton onClick={() => setText('')} title="Clear text">
                    <TrashIcon />
                  </S.ClearButton>
                )}
              </S.TextFooter>
            </S.TextAreaWrapper>

            <S.ModeSection>
              <S.TextAreaLabel>Summary Mode</S.TextAreaLabel>
              <S.ModeCards>
                <S.ModeCard
                  active={mode === 'brief'}
                  onClick={() => setMode('brief')}
                >
                  {mode === 'brief' && (
                    <S.ModeCheck>
                      <CheckIcon />
                    </S.ModeCheck>
                  )}
                  <BriefIcon />
                  <div>
                    <S.ModeCardTitle>Brief</S.ModeCardTitle>
                    <S.ModeCardDesc>A concise 1-2 sentence overview.</S.ModeCardDesc>
                  </div>
                </S.ModeCard>

                <S.ModeCard
                  active={mode === 'detailed'}
                  onClick={() => setMode('detailed')}
                >
                  {mode === 'detailed' && (
                    <S.ModeCheck>
                      <CheckIcon />
                    </S.ModeCheck>
                  )}
                  <DetailedIcon />
                  <div>
                    <S.ModeCardTitle>Detailed</S.ModeCardTitle>
                    <S.ModeCardDesc>A comprehensive, in-depth summary.</S.ModeCardDesc>
                  </div>
                </S.ModeCard>

                <S.ModeCard
                  active={mode === 'bullet_points'}
                  onClick={() => setMode('bullet_points')}
                >
                  {mode === 'bullet_points' && (
                    <S.ModeCheck>
                      <CheckIcon />
                    </S.ModeCheck>
                  )}
                  <BulletPointsIcon />
                  <div>
                    <S.ModeCardTitle>Bullet Points</S.ModeCardTitle>
                    <S.ModeCardDesc>Key takeaways as a list.</S.ModeCardDesc>
                  </div>
                </S.ModeCard>
              </S.ModeCards>
            </S.ModeSection>

            <S.GenerateButton 
              onClick={handleGenerate} 
              disabled={text.trim().length === 0 || isPending}
            >
              {isPending ? (
                <>
                  <SparklesIcon />
                  Generating...
                </>
              ) : (
                <>
                  <SparklesIcon />
                  Generate Summary
                </>
              )}
            </S.GenerateButton>
          </S.FormCard>
        </S.LeftColumn>

        {/* Right Column: Recent / Detail */}
        <S.RightColumn>
          <S.RightPaneHeader>
            <S.PaneTitle>Recent Summaries</S.PaneTitle>
            <S.SearchRow>
              <S.SearchInputWrapper>
                <SearchIcon />
                <input type="text" placeholder="Search summaries..." />
              </S.SearchInputWrapper>
              <S.FilterButton>
                <FilterIcon />
              </S.FilterButton>
            </S.SearchRow>
          </S.RightPaneHeader>

          <S.SummaryList>
                {isLoadingSummaries && <div style={{ padding: '20px', color: '#6b7280' }}>Loading...</div>}
                
                {summariesData?.items.slice(0, 5).map((summary) => {
                  const title = summary.original_text.length > 35 
                    ? summary.original_text.slice(0, 35) + "..." 
                    : summary.original_text;
                  const desc = summary.summary_text.length > 70
                    ? summary.summary_text.slice(0, 70) + "..."
                    : summary.summary_text;

                  return (
                    <S.SummaryListItem key={summary.id} onClick={() => setActiveSummary(summary)}>
                      <S.ListItemHeader>
                        <S.ListTitle>
                          <DocumentIcon style={{ width: 14, height: 14 }} />
                          {title}
                        </S.ListTitle>
                        <ChevronRightIcon style={{ color: '#9ca3af', width: 20, height: 20, flexShrink: 0 }} />
                      </S.ListItemHeader>
                      <S.ListMeta>
                        <S.ListBadge mode={summary.mode}>
                          {summary.mode === 'brief' && '🟣'}
                          {summary.mode === 'detailed' && '🔵'}
                          {summary.mode === 'bullet_points' && '🟢'}
                          {' '}
                          {summary.mode.replace('_', ' ')}
                        </S.ListBadge>
                        <span>{formatRelativeTime(summary.created_at)}</span>
                      </S.ListMeta>
                      <S.ListDesc>{desc}</S.ListDesc>
                    </S.SummaryListItem>
                  );
                })}

                {!isLoadingSummaries && summariesData?.items.length === 0 && (
                  <div style={{ padding: '20px', color: '#6b7280', textAlign: 'center' }}>
                    No recent summaries.
                  </div>
                )}
                
              {!isLoadingSummaries && summariesData && summariesData.items.length > 0 && (
                <S.ViewHistoryLink href="#">
                  View all history <ArrowRightIcon />
                </S.ViewHistoryLink>
              )}
          </S.SummaryList>

          {activeSummary && (
            <S.SummaryDetailOverlay>
              <S.CloseOverlayButton onClick={() => setActiveSummary(null)} aria-label="Close">
                <CloseIcon />
              </S.CloseOverlayButton>
              <S.DetailHeader>
                <div>
                  <S.DetailTitle>
                    {activeSummary.original_text.length > 35 
                      ? activeSummary.original_text.slice(0, 35) + "..." 
                      : activeSummary.original_text}
                  </S.DetailTitle>
                  <S.DetailMeta>
                    <S.Badge>{activeSummary.mode}</S.Badge>
                    <S.DateText>
                      <CalendarIcon />
                      {formatRelativeTime(activeSummary.created_at)}
                    </S.DateText>
                  </S.DetailMeta>
                </div>
              </S.DetailHeader>

              <S.DetailContent>
                <S.SectionHeader>
                  <S.SectionTitle>Original Text</S.SectionTitle>
                </S.SectionHeader>
                <S.OriginalTextBlock>{activeSummary.original_text}</S.OriginalTextBlock>
                
                <S.SectionHeader>
                  <S.SectionTitle>✨ Summary</S.SectionTitle>
                  <S.ActionButton 
                    onClick={() => {
                      copyToClipboard(activeSummary.summary_text);
                      toast.success("Copied to clipboard");
                    }} 
                    aria-label="Copy"
                    style={{ height: '32px', padding: '0 12px', fontSize: '13px' }}
                  >
                    <CopyIcon style={{ width: 14, height: 14 }} /> Copy
                  </S.ActionButton>
                </S.SectionHeader>
                <S.TextBlock highlight>{activeSummary.summary_text}</S.TextBlock>
              </S.DetailContent>

              <S.DetailFooter>
                <S.DetailActions>
                  <S.ActionButton 
                    onClick={() => {
                      copyToClipboard(activeSummary.summary_text);
                      toast.success("Copied to clipboard");
                    }} 
                    aria-label="Copy Summary"
                  >
                    <CopyIcon /> Copy Summary
                  </S.ActionButton>
                  <S.ActionButton 
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
                  </S.ActionButton>
                  <S.ActionButton danger onClick={() => {
                    setActiveSummary(null);
                  }} aria-label="Delete">
                    <TrashIcon /> Delete
                  </S.ActionButton>
                </S.DetailActions>
              </S.DetailFooter>
            </S.SummaryDetailOverlay>
          )}
        </S.RightColumn>
      </S.PageLayout>
    </DashboardLayout>
  );
};
