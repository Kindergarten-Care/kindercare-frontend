'use client';

import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background: ${props => props.theme.colors.background};
  font-family: 'Montserrat', sans-serif;
  overflow: hidden;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    height: auto;
    overflow-y: auto;
  }
`;

export const LeftSection = styled.div`
  flex: 0 0 40%;
  min-width: 480px;
  background: ${props => props.theme.colors.white};
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;
  box-shadow: 20px 0px 50px -10px rgba(0, 0, 0, 0.03);
  z-index: 10;
  box-sizing: border-box;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    flex: 0 0 45%;
    min-width: 400px;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    flex: none;
    min-width: 100%;
    min-height: 100vh;
    padding: 96px 24px 48px;
  }
`;

export const RightSection = styled.div`
  flex: 1;
  position: relative;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.015) 3%, rgba(0, 0, 0, 0) 3%), 
              linear-gradient(180deg, rgba(0, 0, 0, 0.015) 3%, rgba(0, 0, 0, 0) 3%), 
              ${props => props.theme.colors.neutralLighter};
  background-size: 24px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 64px;
  overflow: hidden;
  box-sizing: border-box;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: 32px;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    flex: none;
    min-height: auto;
    padding: 48px 24px;
  }
`;

export const LogoHeader = styled.div`
  position: absolute;
  top: 48px;
  left: 48px;
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    top: 32px;
    left: 32px;
  }
`;

export const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${props => props.theme.colors.primary};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AppName = styled.div`
  color: ${props => props.theme.colors.text};
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.5px;
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 384px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  text-align: left;
`;

export const FormTitle = styled.h1`
  color: ${props => props.theme.colors.text};
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 16px 0;
  line-height: 1.2;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 26px;
  }
`;

export const FormSubtitle = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  color: ${props => props.theme.colors.text};
  font-size: 12px;
  font-weight: 600;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const InputIcon = styled.div`
  position: absolute;
  left: 18px;
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.textSecondary};
`;

export const StyledInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  height: 56px;
  background: ${props => props.theme.colors.neutralLighter};
  border-radius: 8px;
  border: 1px solid ${props => (props.$hasError ? 'red' : 'transparent')};
  padding: 0 16px 0 48px;
  font-size: 14px;
  font-family: inherit;
  color: ${props => props.theme.colors.text};
  outline: none;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.white};
    box-shadow: 0 0 0 3px rgba(4, 110, 30, 0.1);
  }
`;

export const ErrorText = styled.span`
  font-size: 11px;
  color: red;
  margin-top: -4px;
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 56px;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border-radius: 8px;
  border: none;
  font-size: 14px;
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  box-shadow: 0px 4px 12px rgba(4, 110, 30, 0.15);
  margin-top: 8px;
  transition: all 0.2s ease-in-out;

  &:hover:not(:disabled) {
    background-color: #035216;
    box-shadow: 0px 6px 16px rgba(4, 110, 30, 0.25);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const BackLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${props => props.theme.colors.primary};
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  align-self: flex-start;

  &:hover {
    text-decoration: underline;
  }
`;

export const GlassCardsContainer = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
  z-index: 2;
`;

export const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 16px;
  border: 1px solid ${props => props.theme.colors.borderMuted};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02),
              inset 0 1px 0 rgba(255, 255, 255, 0.6);
  padding: 32px;
  text-align: left;
`;

export const GlassCardCenter = styled(GlassCard)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 16px;
  padding: 24px;
`;

export const FlexRowBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

export const FlexRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StatusBadge = styled.div`
  padding: 6px 16px;
  background: ${props => props.theme.colors.successLight};
  border-radius: 9999px;
  border: 1px solid ${props => props.theme.colors.success};
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  letter-spacing: 0.5px;
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 32px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const MetricBox = styled.div`
  background: rgba(235, 238, 240, 0.45);
  border-radius: 12px;
  border: 1px solid ${props => props.theme.colors.borderMuted};
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(235, 238, 240, 0.7);
    border-color: rgba(4, 110, 30, 0.2);
  }
`;

export const MetricTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 700;
  color: ${props => props.theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const MetricValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
`;

export const MetricDesc = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
`;

export const DecorativeBlur = styled.div<{ 
  $bg: string; 
  $top?: string; 
  $left?: string; 
  $bottom?: string; 
  $right?: string; 
  $width: string; 
  $height: string 
}>`
  position: absolute;
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  background: ${(props) => props.$bg};
  border-radius: 50%;
  filter: blur(80px);
  z-index: 1;
  top: ${(props) => props.$top || 'auto'};
  left: ${(props) => props.$left || 'auto'};
  bottom: ${(props) => props.$bottom || 'auto'};
  right: ${(props) => props.$right || 'auto'};
  opacity: 0.75;
  pointer-events: none;
`;

export const ProgressBarContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
  margin: 16px 0;
`;

export const ProgressSegment = styled.div<{ $opacity: number; $bg: string }>`
  flex: 1;
  height: 8px;
  border-radius: 9999px;
  background: ${(props) => props.$bg};
  opacity: ${(props) => props.$opacity};
`;

export const ProgressLabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 11px;
  font-weight: 700;
  color: ${props => props.theme.colors.textSecondary};
`;
