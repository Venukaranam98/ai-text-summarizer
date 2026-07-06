import styled from '@emotion/styled';
import { colors, spacing, rounded, typography, transitions } from '../../app/App.styles';

export const PageContainer = styled.div`
  padding: ${spacing.xl};
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.xl};
`;

export const Title = styled.h1`
  ${typography.heading1}
  color: ${colors.ink};
  margin: 0;
`;

export const Subtitle = styled.p`
  ${typography.body}
  color: ${colors.grayText};
  margin: ${spacing.xs} 0 0 0;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${spacing.lg};
`;

export const SummaryCard = styled.div`
  background-color: #ffffff;
  border: 1px solid ${colors.border};
  border-radius: ${rounded.md};
  padding: ${spacing.lg};
  display: flex;
  flex-direction: column;
  transition: all ${transitions.normal};
  cursor: pointer;

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
    border-color: ${colors.primary};
    transform: translateY(-2px);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${spacing.sm};
`;

export const CardTitle = styled.h3`
  ${typography.uiLabel}
  font-weight: 600;
  color: ${colors.ink};
  margin: 0;
  flex: 1;
`;

export const ModeBadge = styled.span`
  background-color: ${colors.surfaceHover};
  color: ${colors.primary};
  padding: 4px 8px;
  border-radius: ${rounded.full};
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  margin-left: ${spacing.sm};
`;

export const CardDate = styled.div`
  ${typography.bodySm}
  color: ${colors.grayText};
  margin-bottom: ${spacing.md};
`;

export const CardBody = styled.p`
  ${typography.body}
  color: ${colors.grayText};
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
`;

export const CardFooter = styled.div`
  margin-top: ${spacing.md};
  padding-top: ${spacing.md};
  border-top: 1px solid ${colors.border};
  display: flex;
  justify-content: flex-end;
  gap: ${spacing.sm};
`;

export const IconButton = styled.button<{ danger?: boolean }>`
  background: none;
  border: none;
  color: ${({ danger }) => (danger ? colors.grayText : colors.grayText)};
  cursor: pointer;
  padding: 4px;
  border-radius: ${rounded.sm};
  transition: all ${transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ danger }) => (danger ? '#fef2f2' : colors.surfaceHover)};
    color: ${({ danger }) => (danger ? '#ef4444' : colors.primary)};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;
