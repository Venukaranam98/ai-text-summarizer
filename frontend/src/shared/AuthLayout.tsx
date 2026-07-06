import React from "react";
import {
  PageFrame,
  BackgroundDecorations,
  TopBanner,
  Logo,
  ButtonPrimary,
} from "../app/App.styles";
import * as S from './AuthComponnets.styles';
import {
  LogoIcon,
  DocumentIcon,
  HistoryIcon,
  ShieldIcon,
} from "./AuthComponents";

interface AuthLayoutProps {
  children: React.ReactNode;
  eyebrowText: string;
  heroTitle: React.ReactNode;
  heroSubtitle: string;
  topBannerText: string;
  topBannerButtonText: string;
  topBannerButtonAction: () => void;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  eyebrowText,
  heroTitle,
  heroSubtitle,
  topBannerText,
  topBannerButtonText,
  topBannerButtonAction,
}) => {
  return (
    <PageFrame>
      <BackgroundDecorations>
        <svg className="shape-1" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <svg
          className="shape-2"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <circle cx="12" cy="12" r="10" />
        </svg>
        <svg className="shape-3" viewBox="0 0 24 24" fill="currentColor">
          <rect x="10" y="2" width="4" height="20" rx="2" />
          <rect x="2" y="10" width="20" height="4" rx="2" />
        </svg>
        <svg
          className="shape-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 4l16 16m0-16L4 20" />
        </svg>
      </BackgroundDecorations>

      <S.PageContainer>
        {/* ── Left: Features Hero ── */}
        <S.LeftSection>
          <S.Eyebrow>{eyebrowText}</S.Eyebrow>
          <S.HeroTitle>{heroTitle}</S.HeroTitle>
          <S.HeroSubtitle>{heroSubtitle}</S.HeroSubtitle>

          <S.FeatureList>
            <S.FeatureItem>
              <S.FeatureIconBox>
                <DocumentIcon />
              </S.FeatureIconBox>
              <S.FeatureText>
                <S.FeatureTitle>Smart Summaries</S.FeatureTitle>
                <S.FeatureDescription>
                  Get key insights from any content
                </S.FeatureDescription>
              </S.FeatureText>
            </S.FeatureItem>

            <S.FeatureItem>
              <S.FeatureIconBox>
                <HistoryIcon />
              </S.FeatureIconBox>
              <S.FeatureText>
                <S.FeatureTitle>History & Organize</S.FeatureTitle>
                <S.FeatureDescription>
                  Access and organize your past summaries
                </S.FeatureDescription>
              </S.FeatureText>
            </S.FeatureItem>

            <S.FeatureItem>
              <S.FeatureIconBox>
                <ShieldIcon />
              </S.FeatureIconBox>
              <S.FeatureText>
                <S.FeatureTitle>Private & Secure</S.FeatureTitle>
                <S.FeatureDescription>
                  Your data is safe with us.
                </S.FeatureDescription>
              </S.FeatureText>
            </S.FeatureItem>
          </S.FeatureList>
        </S.LeftSection>

        {/* ── Right: Form ── */}
        {children}
      </S.PageContainer>
    </PageFrame>
  );
};
