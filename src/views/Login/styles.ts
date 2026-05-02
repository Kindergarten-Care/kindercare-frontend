import styled, { createGlobalStyle, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const openGlowup = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.85) translateY(30px);
    box-shadow: 0px 0px 0px 0px rgba(43, 105, 77, 0);
  }
  50% {
    box-shadow: 0px 0px 50px 20px rgba(43, 105, 77, 0.25);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
    box-shadow: 0px 32px 64px -16px rgba(43, 105, 77, 0.12);
  }
`;

export const LoginGlobalStyle = createGlobalStyle`
  html, body {
    overflow: hidden !important;
    height: 100vh !important;
    max-height: 100vh !important;
  }

  @media (max-width: 768px) {
    html, body {
      overflow: auto !important;
      height: auto !important;
      max-height: none !important;
    }
  }
`;

export const LoginWrapper = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  background-color: rgba(25, 28, 29, 0.6);
  backdrop-filter: blur(8px);
  padding: 20px;
  z-index: 9999;
  overflow: hidden;
  animation: ${fadeIn} 0.3s ease-out forwards;

  @media (max-width: 768px) {
    padding: 10px;
    overflow-y: auto;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(191, 201, 193, 0.4);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.bgWhite};
    transform: scale(1.05);
  }

  @media (max-width: 992px) {
    top: 16px;
    right: 16px;
  }
`;

export const LoginCard = styled.div`
  display: flex;
  max-width: 1000px;
  width: 100%;
  max-height: 90vh;
  position: relative;
  background-color: ${props => props.theme.colors.bgWhite};
  border-radius: 32px;
  overflow: hidden;
  box-shadow: 0px 32px 64px -16px rgba(43, 105, 77, 0.12);
  animation: ${openGlowup} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;

  @media (max-width: 992px) {
    flex-direction: column;
    max-width: 450px;
    max-height: none;
  }
`;

export const LeftColumn = styled.div`
  flex: 1;
  position: relative;
  min-height: 600px;
  background-image: url('/images/login/family_hero.png');
  background-size: cover;
  background-position: center;

  @media (max-width: 992px) {
    min-height: 300px;
  }
`;

export const LeftOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(65deg, rgba(43, 105, 77, 0.85) 0%, rgba(43, 105, 77, 0.3) 60%, rgba(43, 105, 77, 0) 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 48px;

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

export const Badge = styled.div`
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
  color: ${props => props.theme.colors.bgWhite};
  font-size: 12px;
  font-weight: ${props => props.theme.fontWeights.medium};
  letter-spacing: 0.05em;
`;

export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const LeftTitle = styled.h2`
  font-size: 36px;
  font-weight: ${props => props.theme.fontWeights.semiBold};
  color: ${props => props.theme.colors.bgWhite};
  line-height: 1.25;
`;

export const TitleLine = styled.div`
  width: 80px;
  height: 4px;
  background-color: ${props => props.theme.colors.accentMint};
  border-radius: 9999px;
`;

export const LeftSubtitle = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  max-width: 400px;
`;

export const RightColumn = styled.div`
  flex: 1;
  padding: 32px 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 1200px) {
    padding: 24px 32px;
  }

  @media (max-width: 768px) {
    padding: 24px 20px;
  }
`;

export const BrandSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

export const BrandLogoWrapper = styled.div`
  width: 44px;
  height: 44px;
  background-color: rgba(43, 105, 77, 0.1);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const BrandName = styled.span`
  font-size: 24px;
  font-weight: ${props => props.theme.fontWeights.semiBold};
  color: ${props => props.theme.colors.textDark};
  letter-spacing: -0.025em;
`;

export const GreetingSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
`;

export const GreetingTitle = styled.h1`
  font-size: 36px;
  font-weight: ${props => props.theme.fontWeights.semiBold};
  color: ${props => props.theme.colors.textDark};
  line-height: 1.25;
  letter-spacing: -0.025em;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const GreetingSubtitle = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${props => props.theme.colors.textGray};
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: ${props => props.theme.fontWeights.medium};
  color: rgba(25, 28, 29, 0.7);
`;

export const ForgotPasswordLink = styled.a`
  font-size: 12px;
  font-weight: ${props => props.theme.fontWeights.semiBold};
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  padding: 16px 16px 16px 48px;
  border: 1px solid rgba(191, 201, 193, 0.6);
  border-radius: 24px;
  font-size: 16px;
  color: ${props => props.theme.colors.textDark};
  background-color: ${props => props.theme.colors.bgWhite};
  transition: all 0.3s ease;
  box-shadow: 0px 4px 20px -2px rgba(0, 0, 0, 0.05);

  &::placeholder {
    color: rgba(112, 121, 114, 0.5);
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

export const InputIcon = styled.div`
  position: absolute;
  left: 16px;
  display: flex;
  align-items: center;
  color: #707972;
`;

export const InputRightIcon = styled.button`
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  color: #707972;
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 16px 0;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.bgWhite};
  font-size: 16px;
  font-weight: ${props => props.theme.fontWeights.semiBold};
  border: none;
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;

  &:hover {
    background-color: ${props => props.theme.colors.accentDarkGreen};
  }
`;

export const DividerSection = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0 16px;
  gap: 16px;
`;

export const DividerLine = styled.div`
  flex: 1;
  height: 1px;
  background-color: rgba(191, 201, 193, 0.4);
`;

export const DividerText = styled.span`
  font-size: 12px;
  font-weight: ${props => props.theme.fontWeights.medium};
  color: rgba(112, 121, 114, 0.6);
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

export const SocialLogins = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const SocialButton = styled.button<{ $provider: 'google' | 'zalo' }>`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 14px 0;
  border-radius: 24px;
  font-size: 14px;
  font-weight: ${props => props.theme.fontWeights.semiBold};
  cursor: pointer;
  transition: all 0.3s ease;

  ${props =>
    props.$provider === 'google'
      ? `
    background-color: ${props.theme.colors.bgWhite};
    color: ${props.theme.colors.textDark};
    border: 1px solid rgba(191, 201, 193, 0.6);
    box-shadow: 0px 4px 20px -2px rgba(0, 0, 0, 0.05);
    
    &:hover {
      background-color: ${props.theme.colors.bgLight};
    }
  `
      : `
    background-color: #0068FF;
    color: ${props.theme.colors.bgWhite};
    border: none;
    
    &:hover {
      background-color: #0056d2;
    }
  `}
`;

export const FooterSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-top: 20px;
  font-size: 14px;
`;

export const FooterText = styled.span`
  color: ${props => props.theme.colors.textGray};
`;

export const FooterLink = styled.a`
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
