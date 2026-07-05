import styled from '@emotion/styled';

export const colors = {
  primary: '#e91d2a',
  onPrimary: '#ffffff',
  canvas: '#ffffff',
  surface: '#ffffff',
  ink: '#000000',
  frameInk: '#000000',
  yellowSticker: '#fcc20f',
  purpleStripe: '#6a26a4',
  link: '#0000ee',
  tintOlive: '#8e8a25',
  tintSage: '#b3bd95',
  tintSalmon: '#d77a7a',
  tintPeach: '#e6915d',
  tintLime: '#c0d4a7',
  tintSky: '#9ab6c8',
  tintSteel: '#a5b8c0',
  tintPeriwinkle: '#8c9ae0',
};

export const typography = {
  display: `
    font-family: "Arial Black", Helvetica, system-ui, sans-serif;
    font-size: 36px;
    font-weight: 900;
    line-height: 1.0;
    letter-spacing: 0;
    text-transform: uppercase;
  `,
  heading1: `
    font-family: "Arial Black", Helvetica, system-ui, sans-serif;
    font-size: 24px;
    font-weight: 900;
    line-height: 1.05;
    letter-spacing: 0;
  `,
  heading2: `
    font-family: Helvetica, Arial, system-ui, sans-serif;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: 0;
    text-transform: uppercase;
  `,
  heading3: `
    font-family: Helvetica, Arial, system-ui, sans-serif;
    font-size: 14px;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: 0;
    text-transform: uppercase;
  `,
  body: `
    font-family: "Times New Roman", Times, serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: 0;
  `,
  bodySm: `
    font-family: "Times New Roman", Times, serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: 0;
  `,
  caption: `
    font-family: "Times New Roman", Times, serif;
    font-size: 11px;
    font-weight: 400;
    line-height: 1.35;
    letter-spacing: 0;
  `,
  button: `
    font-family: Helvetica, Arial, system-ui, sans-serif;
    font-size: 12px;
    font-weight: 700;
    line-height: 1.0;
    letter-spacing: 0;
    text-transform: uppercase;
  `,
  link: `
    font-family: "Times New Roman", Times, serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: 0;
    text-decoration: underline;
  `,
  uiLabel: `
    font-family: Helvetica, Arial, system-ui, sans-serif;
    font-size: 12px;
    font-weight: 700;
    line-height: 1.0;
    letter-spacing: 0;
    text-transform: uppercase;
  `,
};

export const rounded = {
  none: '0px',
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
  sectionLg: '48px',
};

export const PageFrame = styled.div`
  background-color: ${colors.frameInk};
  color: ${colors.canvas};
  border-radius: ${rounded.none};
  padding: 8px;
  min-height: 100vh;
  box-sizing: border-box;
`;

export const TopBanner = styled.div`
  background-color: ${colors.frameInk};
  color: ${colors.canvas};
  ${typography.heading2}
  border-radius: ${rounded.none};
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SectionEyebrowOlive = styled.div`
  background-color: ${colors.tintOlive};
  color: ${colors.ink};
  ${typography.display}
  border-radius: ${rounded.none};
  padding: 24px 16px;
`;

export const SectionEyebrowSalmon = styled.div`
  background-color: ${colors.tintSalmon};
  color: ${colors.ink};
  ${typography.display}
  border-radius: ${rounded.none};
  padding: 24px 16px;
`;

export const RibbonCardTitle = styled.div`
  background-color: ${colors.canvas};
  color: ${colors.ink};
  border-bottom: 1px solid ${colors.frameInk};
  ${typography.heading3}
  border-radius: ${rounded.none};
  padding: 6px 12px;
`;

export const RibbonCardBody = styled.div<{ tintColor?: string }>`
  background-color: ${({ tintColor }) => tintColor || colors.tintSage};
  color: ${colors.ink};
  border: 1px solid ${colors.frameInk};
  ${typography.body}
  border-radius: ${rounded.none};
  padding: 12px 16px;
  position: relative; /* For product notch */
`;

export const CtaBlockRed = styled.div`
  background-color: ${colors.primary};
  color: ${colors.onPrimary};
  border: 1px solid ${colors.frameInk};
  ${typography.body}
  border-radius: ${rounded.none};
  padding: 16px;
`;

export const PhoneCallout = styled.div`
  background-color: ${colors.frameInk};
  color: ${colors.primary};
  ${typography.heading2}
  border-radius: ${rounded.none};
  padding: 4px 8px;
`;

export const BuyADellSticker = styled.div`
  background-color: ${colors.yellowSticker};
  color: ${colors.ink};
  border: 1px solid ${colors.frameInk};
  ${typography.button}
  border-radius: ${rounded.none};
  padding: 4px 8px;
  display: inline-block;
  box-shadow: 1px 1px 0 ${colors.frameInk}, inset 1px 1px 0 rgba(255, 255, 255, 0.6); /* hard edge bevel */
`;

export const NewBurstSticker = styled.div`
  background-color: ${colors.yellowSticker};
  color: ${colors.ink};
  ${typography.button}
  border-radius: ${rounded.none};
  padding: 4px 8px;
  display: inline-block;
  transform: rotate(-15deg);
  box-shadow: 1px 1px 0 ${colors.frameInk}, inset 1px 1px 0 rgba(255, 255, 255, 0.6);
`;

export const CertSeal = styled.div`
  background-color: ${colors.primary};
  color: ${colors.canvas};
  ${typography.button}
  border-radius: ${rounded.full};
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 2px solid ${colors.onPrimary};
  box-shadow: 0 0 0 2px ${colors.primary}, 1px 1px 0 ${colors.frameInk};
`;

export const IconLabelNav = styled.nav`
  background-color: ${colors.canvas};
  color: ${colors.ink};
  ${typography.uiLabel}
  border-radius: ${rounded.none};
  padding: 8px;
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const TextInput = styled.input`
  background-color: ${colors.canvas};
  color: ${colors.ink};
  border: 1px solid ${colors.frameInk};
  ${typography.body}
  border-radius: ${rounded.none};
  padding: 4px 6px;
  outline: none;

  &:focus {
    box-shadow: 0 0 0 1px ${colors.frameInk};
  }
`;

export const ButtonPrimary = styled.button`
  background-color: ${colors.frameInk};
  color: ${colors.onPrimary};
  border: 1px solid ${colors.frameInk};
  ${typography.button}
  border-radius: ${rounded.none};
  padding: 6px 16px;
  cursor: pointer;
  
  &:active {
    background-color: ${colors.ink};
  }
`;

export const ButtonSecondary = styled.button`
  background-color: ${colors.canvas};
  color: ${colors.ink};
  border: 1px solid ${colors.frameInk};
  ${typography.button}
  border-radius: ${rounded.none};
  padding: 6px 16px;
  cursor: pointer;
  
  &:active {
    background-color: #f0f0f0;
  }
`;

export const ButtonTextLink = styled.button`
  background-color: transparent;
  color: ${colors.link};
  ${typography.link}
  border-radius: ${rounded.none};
  border: none;
  padding: 0;
  cursor: pointer;
`;

export const FooterBand = styled.footer`
  background-color: ${colors.canvas};
  color: ${colors.ink};
  border-top: 1px solid ${colors.frameInk};
  ${typography.bodySm}
  padding: 16px;
  margin-top: ${spacing.section};
`;
