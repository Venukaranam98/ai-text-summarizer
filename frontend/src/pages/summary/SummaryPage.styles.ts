import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { colors, spacing, rounded, typography, transitions } from '../../app/App.styles';

export const PageLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 32px;
  height: 100%;
  position: relative;
`;

export const LeftColumn = styled.div`
  padding: ${spacing.xl};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: ${spacing.xl};
`;

export const FormCard = styled.div`
  background-color: #ffffff;
  border: 1px solid ${colors.border};
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
`;

export const GenerateButton = styled.button`
  width: 100%;
  height: 56px;
  background-color: ${colors.primary};
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  margin-top: 16px;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: ${colors.primaryHover};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(80, 70, 229, 0.2);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const PageTitle = styled.h1`
  ${typography.heading1}
  color: ${colors.ink};
  margin: 0 0 ${spacing.xs};
`;

export const PageSubtitle = styled.p`
  ${typography.body}
  color: ${colors.grayText};
  margin: 0 0 ${spacing.xl};
`;

export const TextAreaWrapper = styled.div`
  position: relative;
  margin-bottom: ${spacing.xl};
`;

export const TextAreaLabel = styled.label`
  ${typography.uiLabel}
  color: ${colors.ink};
  display: block;
  font-weight: 600;
  margin-bottom: ${spacing.sm};
`;

export const StyledTextArea = styled.textarea`
  width: 100%;
  height: 300px;
  box-sizing: border-box;
  border: 1px solid ${colors.border};
  border-radius: ${rounded.md};
  padding: ${spacing.md};
  ${typography.body}
  resize: none;
  background-color: #ffffff;
  color: ${colors.ink};
  transition: all ${transitions.fast};

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 2px rgba(80, 70, 229, 0.15);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const TextFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${spacing.sm};
`;

export const CharCount = styled.span`
  ${typography.bodySm}
  color: ${colors.grayText};
`;

export const ClearButton = styled.button`
  color: ${colors.grayText};
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color ${transitions.fast};

  &:hover {
    color: #ef4444;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const ModeSection = styled.div`
  margin-bottom: ${spacing.xl};
`;

export const ModeCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${spacing.md};
`;

export const ModeCard = styled.div<{ active?: boolean }>`
  border: 1px solid ${({ active }) => (active ? colors.primary : colors.border)};
  border-radius: ${rounded.lg};
  padding: ${spacing.lg} ${spacing.md};
  text-align: center;
  cursor: pointer;
  background-color: ${({ active }) => (active ? colors.primaryLight : '#ffffff')};
  transition: all ${transitions.fast};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.sm};

  &:hover {
    border-color: ${colors.primary};
  }

  svg {
    color: ${({ active }) => (active ? colors.primary : colors.primaryHover)};
    width: 24px;
    height: 24px;
  }
`;

export const ModeCardTitle = styled.h4`
  ${typography.heading3}
  color: ${colors.ink};
  margin: 0;
`;

export const ModeCardDesc = styled.p`
  ${typography.bodySm}
  color: ${colors.grayText};
  margin: 0;
  line-height: 1.4;
`;

export const ModeCheck = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: ${colors.primary};
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 12px;
    height: 12px;
    color: white;
  }
`;

export const SecurityNote = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.xs};
  color: ${colors.grayText};
  ${typography.bodySm}
  margin-top: ${spacing.lg};

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const RightPaneHeader = styled.div`
  padding: ${spacing.lg};
  border-bottom: 1px solid ${colors.border};
`;

export const PaneTitle = styled.h3`
  ${typography.heading2}
  color: ${colors.ink};
  margin: 0 0 ${spacing.md};
`;

export const SearchRow = styled.div`
  display: flex;
  gap: ${spacing.sm};
`;

export const SearchInputWrapper = styled.div`
  flex: 1;
  position: relative;
  
  svg {
    position: absolute;
    left: ${spacing.sm};
    top: 50%;
    transform: translateY(-50%);
    color: ${colors.grayText};
    width: 16px;
    height: 16px;
  }
  
  input {
    width: 100%;
    height: 36px;
    padding-left: 36px;
    padding-right: ${spacing.sm};
    border: 1px solid ${colors.border};
    border-radius: ${rounded.md};
    ${typography.bodySm}
    outline: none;

    background-color: #ffffff;

    &:focus {
      border-color: ${colors.primary};
    }
  }
`;

export const FilterButton = styled.button`
  width: 36px;
  height: 36px;
  border: 1px solid ${colors.border};
  border-radius: ${rounded.md};
  background-color: #ffffff;
  color: ${colors.grayText};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: ${colors.surfaceHover};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const SummaryList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${spacing.md} ${spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

export const SummaryListItem = styled.div`
  border: 1px solid ${colors.border};
  border-radius: ${rounded.md};
  padding: 10px 14px;
  box-sizing: border-box;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
  transition: all ${transitions.fast};

  &:hover {
    border-color: ${colors.primary};
    background-color: ${colors.surfaceHover};
  }
`;

export const ListItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

export const ListDesc = styled.div`
  ${typography.bodySm}
  color: ${colors.grayText};
  line-height: 1.3;
  margin-top: 2px;
`;



export const ListContent = styled.div`
  flex: 1;
  overflow: hidden;
`;

export const ListTitle = styled.h5`
  ${typography.body}
  font-weight: 600;
  color: ${colors.ink};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  svg {
    color: ${colors.primary};
  }
`;

export const ListMeta = styled.div`
  ${typography.bodySm}
  color: ${colors.grayText};
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ListBadge = styled.span<{ mode: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 9999px; /* pill shape */
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
  background-color: ${({ mode }) => {
    switch(mode) {
      case 'brief': return '#f3e8ff';
      case 'detailed': return '#dbeafe';
      case 'bullet_points': return '#dcfce3';
      default: return colors.primaryLight;
    }
  }};
  color: ${({ mode }) => {
    switch(mode) {
      case 'brief': return '#7e22ce';
      case 'detailed': return '#1d4ed8';
      case 'bullet_points': return '#15803d';
      default: return colors.primary;
    }
  }};
`;

export const ViewHistoryLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.xs};
  color: ${colors.primary};
  ${typography.bodySm}
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  margin-top: ${spacing.md};

  &:hover {
    text-decoration: underline;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

export const SummaryDetailOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 500px;
  max-width: 100vw;
  background-color: #ffffff;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
  border-left: 1px solid ${colors.border};
  z-index: 100;
  display: flex;
  flex-direction: column;
  animation: ${slideIn} 0.25s ease-out;
`;

export const CloseOverlayButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: ${colors.grayText};
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${rounded.full};
  transition: all ${transitions.fast};

  &:hover {
    background-color: ${colors.surfaceHover};
    color: ${colors.ink};
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const DetailHeader = styled.div`
  padding: ${spacing.lg};
  border-bottom: 1px solid ${colors.border};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const DetailTitle = styled.h2`
  ${typography.heading2}
  color: ${colors.ink};
  margin: 0 0 ${spacing.sm};
  padding-right: 24px; /* leave room for close button */
`;

export const DetailMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`;

export const Badge = styled.span`
  background-color: ${colors.primaryLight};
  color: ${colors.primary};
  padding: 2px ${spacing.sm};
  border-radius: ${rounded.sm};
  ${typography.bodySm}
  font-weight: 500;
`;

export const DateText = styled.span`
  color: ${colors.grayText};
  ${typography.bodySm}
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const DetailActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  justify-content: flex-start;
`;

export const DetailFooter = styled.div`
  padding: ${spacing.lg};
  border-top: 1px solid ${colors.border};
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  background-color: ${colors.canvas};
`;

export const ActionButton = styled.button<{ danger?: boolean }>`
  height: 40px;
  padding: 0 ${spacing.md};
  border: 1px solid ${colors.border};
  border-radius: ${rounded.md};
  background-color: #ffffff;
  color: ${colors.ink};
  ${typography.bodySm}
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  cursor: pointer;
  transition: all ${transitions.fast};

  &:hover {
    background-color: ${({ danger }) => (danger ? '#ef4444' : colors.surfaceHover)};
    border-color: ${({ danger }) => (danger ? '#dc2626' : colors.border)};
    color: ${({ danger }) => (danger ? '#ffffff' : colors.primary)};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const DetailContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${spacing.lg};
`;

export const SectionTitle = styled.h4`
  ${typography.uiLabel}
  color: ${colors.ink};
  font-weight: 600;
  margin: 0;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.sm};
`;

export const TextBlock = styled.div<{ highlight?: boolean }>`
  ${typography.body}
  color: ${colors.ink};
  line-height: 1.6;
  background-color: ${({ highlight }) => (highlight ? colors.primaryLight : '#ffffff')};
  border-radius: ${rounded.md};
  padding: ${({ highlight }) => (highlight ? spacing.xl : spacing.md)};
  margin-bottom: ${spacing.xl};
  border: ${({ highlight }) => (highlight ? 'none' : `1px solid ${colors.border}`)};
`;

export const OriginalTextBlock = styled(TextBlock)`
  max-height: 180px;
  overflow-y: auto;
  white-space: pre-wrap;
`;
