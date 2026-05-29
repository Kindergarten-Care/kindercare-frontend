'use client';

import styled, { css, keyframes } from 'styled-components';

/* ─── Animations ─── */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
`;

/* ─── Layout ─── */
export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.theme.colors.background};
  overflow: hidden;
  font-family: ${props => props.theme.fonts.body};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
    overflow-y: auto;
  }
`;

export const InteractionPane = styled.div`
  width: 42%;
  background-color: ${props => props.theme.colors.white};
  box-shadow: 8px 0 40px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 48px;
  box-sizing: border-box;
  z-index: 10;
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    width: 48%;
    padding: 36px;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    min-height: 100vh;
    padding: 32px 24px;
    justify-content: center;
    gap: 32px;
  }
`;

export const InteractionContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
`;

/* ─── Brand ─── */
export const BrandHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-bottom: 24px;
  }
`;

export const BrandLogo = styled.img`
  height: 38px;
  object-fit: contain;
`;

/* ─── Role Tabs ─── */
export const TabGroup = styled.div`
  display: flex;
  background-color: ${props => props.theme.colors.neutralLight};
  border-radius: 9999px;
  padding: 4px;
  margin-bottom: 32px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.04);
`;

export const TabButtonWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

/* ─── Form Titles ─── */
export const FormTitleBlock = styled.div`
  margin-bottom: 28px;
  animation: ${fadeIn} 0.35s ease-out;
`;

export const FormTitle = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin: 0 0 6px 0;
  line-height: 1.25;
  letter-spacing: -0.3px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 22px;
  }
`;

export const FormSubtitle = styled.p`
  font-size: 14px;
  color: ${props => props.theme.colors.textSecondary};
  margin: 0;
  line-height: 1.5;
`;

/* ─── Form ─── */
export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const FormOptionsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 4px;
`;

export const PasswordLabel = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

export const ForgotPasswordLink = styled.a`
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.theme.colors.accent};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    text-decoration: underline;
    color: #004d73;
  }
`;

/* ─── Footer ─── */
export const FooterLinks = styled.div`
  display: flex;
  gap: 24px;
  border-top: 1px solid ${props => props.theme.colors.neutralLight};
  padding-top: 20px;
  margin-top: 40px;
  font-size: 12px;

  a {
    color: ${props => props.theme.colors.textSecondary};
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;

    &:hover {
      color: ${props => props.theme.colors.text};
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-top: 24px;
    justify-content: center;
  }
`;

/* ─── Right Pane (Visualization) ─── */
export const VisualizationPane = styled.div`
  width: 58%;
  height: 100%;
  background: linear-gradient(
    145deg,
    rgba(45, 106, 34, 0.08) 0%,
    rgba(134, 239, 172, 0.18) 30%,
    rgba(147, 197, 253, 0.12) 60%,
    rgba(253, 224, 71, 0.15) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(4, 110, 30, 0.06) 0%, transparent 70%);
    top: -100px;
    right: -100px;
    border-radius: 50%;
    animation: ${float} 8s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(253, 224, 71, 0.08) 0%, transparent 70%);
    bottom: -80px;
    left: -60px;
    border-radius: 50%;
    animation: ${float} 10s ease-in-out infinite reverse;
  }

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    width: 52%;
    padding: 32px;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

/* ─── Glass Card ─── */
export const GlassCard = styled.div`
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  padding: 40px;
  max-width: 460px;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 0.6s ease-out 0.2s both;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow:
      0 24px 64px rgba(0, 0, 0, 0.07),
      inset 0 1px 0 rgba(255, 255, 255, 0.6);
  }
`;

export const GlassTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin: 0 0 4px 0;
  letter-spacing: -0.4px;
`;

export const GlassSubtitle = styled.p`
  font-size: 11px;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin: 0 0 28px 0;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

export const GlassItem = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 16px;
  padding: 16px 18px;
  margin-bottom: 12px;
  transition: all 0.25s ease;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
    transform: translateX(4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
  }
`;

export const GlassItemIcon = styled.span`
  font-size: 18px;
  margin-right: 10px;
`;

export const GlassItemTitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin: 0 0 3px 0;
  display: flex;
  align-items: center;
`;

export const GlassItemDesc = styled.p`
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
  margin: 0;
  line-height: 1.55;
  padding-left: 28px;
`;

/* ─── Loading Shimmer ─── */
export const SubmitButtonShimmer = styled.div`
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.2) 50%,
      transparent 100%
    );
    background-size: 200% 100%;
    animation: ${shimmer} 1.5s infinite;
  }
`;
