import styled from '@emotion/styled';
import { colors, spacing, rounded, typography, sizes, Container } from '../app/App.styles';

export const PageContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(40px, 8vw, 120px);
  min-height: calc(100vh - ${sizes.navHeight});
  position: relative;
  z-index: 10;
  padding-top: ${spacing.sectionLg};
  padding-bottom: ${spacing.sectionLg};

  @media (max-width: 992px) {
    flex-direction: column;
    padding-top: ${spacing.sectionSm};
    padding-bottom: ${spacing.sectionSm};
    align-items: center;
  }
`;

export const LeftSection = styled.div`
  flex: 1;
  max-width: 440px;

  @media (max-width: 900px) {
    max-width: 100%;
    text-align: left;
  }
`;

export const Eyebrow = styled.div`
  ${typography.bodySm}
  color: ${colors.primary};
  font-weight: 500;
  margin-bottom: ${spacing.lg};
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 24px;
    height: 2px;
    background-color: ${colors.primary};
    border-radius: 2px;
  }
`;

export const HeroTitle = styled.h1`
  ${typography.display}
  color: ${colors.ink};
  margin: 0 0 ${spacing.md};
  
  span {
    color: ${colors.primary};
  }
`;

export const HeroSubtitle = styled.p`
  ${typography.body}
  color: ${colors.grayText};
  margin: 0 0 ${spacing.section};
  line-height: 1.6;
`;

export const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xl};
`;

export const FeatureItem = styled.div`
  display: flex;
  gap: ${spacing.md};
  align-items: flex-start;
`;

export const FeatureIconBox = styled.div`
  width: 40px;
  height: 40px;
  background-color: #f3f0ff;
  color: ${colors.primaryHover};
  border-radius: ${rounded.md};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const FeatureText = styled.div`
  flex: 1;
`;

export const FeatureTitle = styled.h3`
  ${typography.heading3}
  color: ${colors.ink};
  margin: 0 0 ${spacing.xs};
`;

export const FeatureDescription = styled.p`
  ${typography.bodySm}
  color: ${colors.grayText};
  margin: 0;
`;

export const FormCard = styled.div`
  width: 100%;
  max-width: 400px;
  padding: ${spacing.section};
  flex-shrink: 0;

  @media (max-width: 900px) {
    max-width: 100%;
    padding: ${spacing.sectionSm} 0;
  }
`;

export const FormTitle = styled.h2`
  ${typography.heading1}
  color: ${colors.ink};
  margin: 0 0 ${spacing.s};
  text-align: center;
`;

export const FormSubtitle = styled.p`
  ${typography.body}
  color: ${colors.grayText};
  text-align: center;
  margin: 0 0 ${spacing.sectionSm};
`;

export const FormGroup = styled.div`
  margin-bottom: ${spacing.xl};
`;

export const Label = styled.label`
  ${typography.uiLabel}
  color: ${colors.ink};
  display: block;
  margin-bottom: ${spacing.sm};
  font-weight: 600;
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.xl};
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${spacing.s};
  ${typography.bodySm}
  color: ${colors.grayText};
  cursor: pointer;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    border-radius: 4px;
    border: 1px solid ${colors.border};
    accent-color: ${colors.primary};
  }
`;

export const ErrorText = styled.div`
  ${typography.bodySm}
  color: #dc2626;
  padding: ${spacing.sm} ${spacing.md};
  background-color: #fef2f2;
  border-radius: ${rounded.md};
  margin-bottom: ${spacing.lg};
`;

export const FieldError = styled.span`
  ${typography.bodySm}
  color: #dc2626;
  display: block;
  margin-top: ${spacing.xs};
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: ${spacing.xl} 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${colors.border};
  }

  span {
    padding: 0 ${spacing.md};
    ${typography.bodySm}
    color: ${colors.grayText};
  }
`;

export const FormFooter = styled.div`
  ${typography.bodySm}
  color: ${colors.grayText};
  text-align: center;
`;
