'use client';

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.theme.colors.background};
  overflow: hidden;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
    overflow-y: auto;
  }
`;

export const InteractionPane = styled.div`
  width: 40%;
  background-color: ${props => props.theme.colors.white};
  box-shadow: 10px 0 30px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 48px;
  box-sizing: border-box;
  z-index: 10;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    width: 45%;
    padding: 32px;
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

export const BrandHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 48px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-bottom: 24px;
  }
`;

export const BrandText = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  letter-spacing: -0.5px;
  font-family: 'Montserrat', sans-serif;
`;

export const TabGroup = styled.div`
  display: flex;
  background-color: ${props => props.theme.colors.neutralLight};
  border-radius: 9999px;
  padding: 4px;
  margin-bottom: 32px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.03);
`;

export const TabButtonWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

export const FormTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin: 0 0 8px 0;
  line-height: 1.2;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 24px;
  }
`;

export const FormSubtitle = styled.p`
  font-size: 14px;
  color: ${props => props.theme.colors.textSecondary};
  margin: 0 0 24px 0;
  line-height: 1.5;
`;

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

export const ForgotPasswordLink = styled.a`
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.theme.colors.accent};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const FooterLinks = styled.div`
  display: flex;
  gap: 24px;
  border-top: 1px solid ${props => props.theme.colors.neutralLight};
  padding-top: 24px;
  margin-top: 48px;
  font-size: 12px;

  a {
    color: ${props => props.theme.colors.textSecondary};
    text-decoration: none;
    font-weight: 500;

    &:hover {
      color: ${props => props.theme.colors.text};
      text-decoration: underline;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-top: 24px;
    justify-content: center;
  }
`;

export const VisualizationPane = styled.div`
  width: 60%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(134, 239, 172, 0.25) 0%,
    rgba(147, 197, 253, 0.2) 50%,
    rgba(253, 224, 71, 0.25) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
  box-sizing: border-box;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    width: 55%;
    padding: 32px;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    height: auto;
    min-height: 400px;
    padding: 48px 24px;
  }
`;

export const GlassCard = styled.div`
  background-color: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.04), 
              inset 0 1px 0 rgba(255, 255, 255, 0.6);
  padding: 40px;
  max-width: 480px;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.06);
  }
`;

export const GlassTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin: 0 0 6px 0;
  letter-spacing: -0.5px;
`;

export const GlassSubtitle = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin: 0 0 24px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const GlassItem = styled.div`
  background-color: rgba(255, 255, 255, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.01);
  margin-bottom: 16px;
  transition: all 0.2s ease;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.55);
    border-color: rgba(255, 255, 255, 0.7);
  }
`;

export const GlassItemTitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin: 0 0 4px 0;
`;

export const GlassItemDesc = styled.p`
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
  margin: 0;
  line-height: 1.5;
`;
