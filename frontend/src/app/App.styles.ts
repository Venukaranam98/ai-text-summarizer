import styled from '@emotion/styled';

export const colors = {
  primary: '#5046e5', // vibrant purple from mockup
  primaryHover: '#4338ca',
  primaryLight: '#eeefff', // light purple for icon backgrounds
  onPrimary: '#ffffff',
  canvas: '#fafcff', // very light off-white/blue background
  surface: '#ffffff',
  surfaceHover: '#f3f4f6',
  ink: '#111827', // dark slate for headings
  grayText: '#6b7280', // gray for body/labels
  border: '#e5e7eb',
  inputBg: '#ffffff',
};

export const typography = {
  sans: `
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
  `,
  display: `
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    font-size: 42px;
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.02em;
  `,
  heading1: `
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    font-size: 24px;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.01em;
  `,
  heading2: `
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.3;
  `,
  heading3: `
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.4;
  `,
  body: `
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
  `,
  bodySm: `
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.5;
  `,
  button: `
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
  `,
  uiLabel: `
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    font-size: 13px;
    font-weight: 500;
    line-height: 1.2;
  `,
};

export const rounded = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
};

export const spacing = {
  xxs: '2px',
  xs: '4px',
  s: '6px',
  sm: '8px',
  m: '10px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  xxl: '24px',
  sectionSm: '32px',
  section: '40px',
  sectionLg: '64px',
};

export const sizes = {
  inputHeight: '42px',
  buttonHeight: '42px',
  buttonHeightSm: '36px',
  navHeight: '72px',
};

export const transitions = {
  fast: '150ms ease',
  normal: '200ms ease',
  smooth: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
};

/* ─── Shared Components ─── */

export const PageFrame = styled.div`
  background-color: ${colors.canvas};
  color: ${colors.ink};
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  /* Subtle background abstract shapes */
  &::before {
    content: '';
    position: absolute;
    bottom: -20vh;
    left: -10vw;
    width: 60vw;
    height: 60vw;
    max-width: 600px;
    max-height: 600px;
    background-color: #f3f0ff;
    border-radius: 50%;
    filter: blur(80px);
    z-index: 0;
  }
`;

export const Container = styled.div`
  width: 100%;
  padding-right: 24px;
  padding-left: 24px;
  margin-right: auto;
  margin-left: auto;
  box-sizing: border-box;

  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;

export const BackgroundDecorations = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;

  svg {
    position: absolute;
    color: ${colors.primary};
    opacity: 0.05;
  }

  .shape-1 {
    top: 15%;
    left: 8%;
    width: 64px;
    height: 64px;
    transform: rotate(-15deg);
  }

  .shape-2 {
    top: 60%;
    right: 12%;
    width: 120px;
    height: 120px;
    transform: rotate(10deg);
  }

  .shape-3 {
    bottom: 20%;
    left: 45%;
    width: 48px;
    height: 48px;
    transform: rotate(45deg);
  }
  
  .shape-4 {
    top: 10%;
    right: 25%;
    width: 32px;
    height: 32px;
  }
`;

export const TopBanner = styled.header`
  background-color: transparent;
  color: ${colors.ink};
  padding: 0 ${spacing.section};
  height: ${sizes.navHeight};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 10;
  border-bottom: 1px solid rgba(0,0,0,0.04);
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  ${typography.heading2}
  font-weight: 700;
  color: ${colors.ink};
  letter-spacing: -0.01em;
  
  svg {
    color: ${colors.primary};
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    left: ${spacing.md};
    color: ${colors.grayText};
    width: 18px;
    height: 18px;
  }
  
  /* Eye icon right */
  .right-icon {
    left: auto;
    right: ${spacing.md};
    cursor: pointer;
    &:hover {
      color: ${colors.ink};
    }
  }
`;

export const TextInput = styled.input<{ hasIcon?: boolean; hasRightIcon?: boolean }>`
  appearance: none;
  background-color: ${colors.inputBg};
  color: ${colors.ink};
  border: 1px solid ${colors.border};
  ${typography.body}
  border-radius: ${rounded.md};
  padding: 0 ${spacing.md};
  padding-left: ${({ hasIcon }) => (hasIcon ? '40px' : spacing.md)};
  padding-right: ${({ hasRightIcon }) => (hasRightIcon ? '40px' : spacing.md)};
  height: ${sizes.inputHeight};
  outline: none;
  box-shadow: none;
  transition: border-color ${transitions.fast}, box-shadow ${transitions.fast};
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: #9ca3af;
  }

  &:hover {
    border-color: #d1d5db;
  }

  &:focus {
    border-color: ${colors.primary};
    box-shadow: 0 0 0 2px rgba(80, 70, 229, 0.15);
  }
`;

export const ButtonPrimary = styled.button`
  background-color: ${colors.primary};
  color: ${colors.onPrimary};
  border: none;
  ${typography.button}
  border-radius: ${rounded.md};
  padding: 0 ${spacing.xl};
  height: ${sizes.buttonHeight};
  cursor: pointer;
  transition: background-color ${transitions.fast}, transform ${transitions.fast};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm};

  &:hover {
    background-color: ${colors.primaryHover};
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ButtonSecondary = styled.button`
  background-color: ${colors.canvas};
  color: ${colors.ink};
  border: 1px solid ${colors.border};
  ${typography.button}
  border-radius: ${rounded.md};
  padding: 0 ${spacing.xl};
  height: ${sizes.buttonHeight};
  cursor: pointer;
  transition: border-color ${transitions.fast}, background-color ${transitions.fast};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f9fafb;
    border-color: #d1d5db;
  }

  &:active {
    background-color: #f3f4f6;
  }
`;

export const ButtonTextLink = styled.button`
  background-color: transparent;
  color: ${colors.primary};
  ${typography.bodySm}
  font-weight: 500;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: color ${transitions.fast};

  &:hover {
    color: ${colors.primaryHover};
    text-decoration: underline;
  }
`;
