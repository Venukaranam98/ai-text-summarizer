import styled from '@emotion/styled';
import { colors, spacing, rounded, typography, transitions } from '../app/App.styles';

export const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${colors.canvas};
  color: ${colors.ink};
  overflow: hidden;
`;

export const TopNavBar = styled.header`
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${spacing.xxl};
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03);
  flex-shrink: 0;
  z-index: 20;
`;

export const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
`;

export const IconButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${colors.border};
  background-color: #ffffff;
  color: ${colors.grayText};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${transitions.fast};

  &:hover {
    background-color: ${colors.surfaceHover};
    color: ${colors.ink};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  padding: ${spacing.sm} ${spacing.md};
  border-radius: ${rounded.full};
  cursor: pointer;
  transition: all ${transitions.fast};
  border: 1px solid transparent;
  color: ${colors.ink};

  &:hover {
    background-color: ${colors.surfaceHover};
    border-color: ${colors.border};
  }
`;

export const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const UserName = styled.span`
  ${typography.bodySm}
  font-weight: 600;
  color: inherit;
`;

export const BodyContainer = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

export const Sidebar = styled.aside<{ isOpen: boolean }>`
  width: ${({ isOpen }) => (isOpen ? '260px' : '0px')};
  border-right: ${({ isOpen }) => (isOpen ? `1px solid ${colors.border}` : 'none')};
  padding: ${({ isOpen }) => (isOpen ? `${spacing.xl} ${spacing.md}` : '0')};
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  transition: all ${transitions.normal} ease-in-out;
  overflow: hidden;
  white-space: nowrap;
  flex-shrink: 0;
`;

export const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  flex: 1;
`;

export const NavItem = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  padding: ${spacing.sm} ${spacing.md};
  border-radius: ${rounded.md};
  color: ${({ active }) => (active ? colors.primary : colors.grayText)};
  background-color: ${({ active }) => (active ? colors.primaryLight : 'transparent')};
  ${typography.bodySm}
  font-weight: ${({ active }) => (active ? '600' : '500')};
  cursor: pointer;
  transition: all ${transitions.fast};

  &:hover {
    background-color: ${({ active }) => (active ? colors.primaryLight : colors.surfaceHover)};
    color: ${({ active }) => (active ? colors.primary : colors.ink)};
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const UpgradeCard = styled.div`
  background-color: ${colors.canvas};
  border: 1px solid ${colors.border};
  border-radius: ${rounded.lg};
  padding: ${spacing.lg};
  text-align: left;
  margin-bottom: ${spacing.xl};
`;

export const UpgradeIcon = styled.div`
  width: 32px;
  height: 32px;
  background-color: ${colors.primaryLight};
  color: ${colors.primary};
  border-radius: ${rounded.md};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${spacing.md};

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const UpgradeTitle = styled.h4`
  ${typography.body}
  font-weight: 600;
  color: ${colors.primary};
  margin: 0 0 ${spacing.xs};
`;

export const UpgradeDesc = styled.p`
  ${typography.bodySm}
  color: ${colors.grayText};
  margin: 0 0 ${spacing.md};
  line-height: 1.5;
`;

export const UpgradeButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm};
  padding: ${spacing.sm};
  background-color: #ffffff;
  border: 1px solid ${colors.border};
  border-radius: ${rounded.md};
  color: ${colors.primary};
  ${typography.bodySm}
  font-weight: 600;
  cursor: pointer;
  transition: all ${transitions.fast};

  &:hover {
    background-color: ${colors.surfaceHover};
    border-color: ${colors.primary};
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

export const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  background-color: ${colors.canvas};
  position: relative;
`;
