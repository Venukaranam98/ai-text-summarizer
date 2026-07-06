import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Logo } from '../app/App.styles';
import { LogoIcon, HistoryIcon } from './AuthComponents';
import * as S from './DashboardLayout.styles';

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="4.22" x2="19.78" y2="5.64" />
  </svg>
);



const LogOutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);



interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('ai-text-summarizer-tokens');
    navigate('/login');
  };

  return (
    <S.DashboardWrapper>
      <S.TopNavBar>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <S.IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)} aria-label="Toggle Sidebar">
            <MenuIcon />
          </S.IconButton>
          <Logo style={{ margin: 0 }}>
            <LogoIcon />
            <span>AI SUMMARIZER</span>
          </Logo>
        </div>

        <S.NavActions>
          <S.UserMenu onClick={handleLogout} title="Log out">
            <S.Avatar>
              <LogOutIcon />
            </S.Avatar>
            <S.UserName>Logout</S.UserName>
          </S.UserMenu>
        </S.NavActions>
      </S.TopNavBar>

      <S.BodyContainer>
        <S.Sidebar isOpen={isSidebarOpen}>
          <S.SidebarNav>
            <S.NavItem active={location.pathname === '/'} onClick={() => navigate('/')}>
              <HomeIcon />
              New Summary
            </S.NavItem>
            <S.NavItem active={location.pathname === '/history'} onClick={() => navigate('/history')}>
              <HistoryIcon />
              History
            </S.NavItem>
          </S.SidebarNav>


        </S.Sidebar>

        <S.MainContent>
          {children}
        </S.MainContent>
      </S.BodyContainer>
    </S.DashboardWrapper>
  );
};
