'use client';

import styled, { keyframes, css } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors?: {
      primary?: string;
    };
  }
}

/* ─── Keyframe Animations ─── */
export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const float = keyframes`
  0%   { transform: translateY(0px) rotate(0deg); }
  50%  { transform: translateY(-10px) rotate(3deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

export const floatReverse = keyframes`
  0%   { transform: translateY(0px) rotate(0deg); }
  50%  { transform: translateY(8px) rotate(-3deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

export const pulseGlow = keyframes`
  0%   { box-shadow: 0 0 0 0 rgba(35, 122, 60, 0.4); }
  70%  { box-shadow: 0 0 0 10px rgba(35, 122, 60, 0); }
  100% { box-shadow: 0 0 0 0 rgba(35, 122, 60, 0); }
`;

/* ─── Core Layouts ─── */
export const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  font-family: 'Baloo 2', 'Inter', system-ui, -apple-system, sans-serif;
  background-color: #ffffff;
  overflow-x: hidden;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

/* ─── Left Branding Panel (Green Side) ─── */
export const HeroSide = styled.div`
  flex: 1.15;
  background: ${props => props.theme.colors?.primary || '#237A3C'};
  padding: 3rem 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  color: #ffffff;
  min-height: 100vh;

  @media (max-width: 1024px) {
    flex: none;
    min-height: auto;
    padding: 2.5rem 1.5rem;
    gap: 2.5rem;
  }
`;

/* Decorative floating elements in Green Side */
export const FloatingOrangeCircle = styled.div`
  position: absolute;
  top: 5%;
  right: 15%;
  width: 16px;
  height: 16px;
  background-color: #f2a33c;
  border-radius: 50%;
  opacity: 0.8;
  animation: ${float} 6s ease-in-out infinite;
  pointer-events: none;
`;

export const FloatingCyanRing = styled.div`
  position: absolute;
  top: 45%;
  right: -20px;
  width: 40px;
  height: 40px;
  border: 5px solid #00acc1;
  border-radius: 50%;
  opacity: 0.7;
  animation: ${floatReverse} 8s ease-in-out infinite;
  pointer-events: none;
  z-index: 1;

  @media (max-width: 1024px) {
    right: 10px;
    top: 30%;
    width: 25px;
    height: 25px;
    border-width: 3.5px;
  }
`;

/* ─── Sprout Brand Header (Logo and Name) ─── */
export const BrandHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  animation: ${fadeIn} 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 2;
`;

export const BrandName = styled.span`
  font-size: 1.6rem;
  font-weight: 800;
  font-family: 'Baloo 2', sans-serif;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #ffffff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

/* ─── Hero Content Area ─── */
export const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 580px;
  margin-top: auto;
  margin-bottom: auto;
  z-index: 2;

  @media (max-width: 1024px) {
    margin: 1.5rem 0;
  }
`;

export const BadgeCapsule = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  align-self: flex-start;
  background-color: #fff0d8;
  color: #d97706;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 50px;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  animation: ${fadeIn} 0.8s 0.1s cubic-bezier(0.16, 1, 0.3, 1) both;

  &::before {
    content: '•';
    color: #f2a33c;
    font-size: 1.2rem;
  }
`;

export const HeroTitle = styled.h1`
  font-size: 2.8rem;
  font-weight: 800;
  line-height: 1.25;
  font-family: 'Baloo 2', sans-serif;
  animation: ${fadeIn} 0.8s 0.2s cubic-bezier(0.16, 1, 0.3, 1) both;

  span {
    color: #facc15;
    position: relative;
    display: inline-block;
  }

  @media (max-width: 1200px) {
    font-size: 2.4rem;
  }

  @media (max-width: 640px) {
    font-size: 2rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.05rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
  font-family: 'Inter', sans-serif;
  animation: ${fadeIn} 0.8s 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;

  @media (max-width: 640px) {
    font-size: 0.95rem;
  }
`;

/* ─── Drag & Drop / Stats Section ─── */
export const StatsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 2;
  animation: ${fadeIn} 0.8s 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
  width: 100%;
  max-width: 580px;
`;

export const StatsContainerOuter = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 0.75rem;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

/* Drag and Drop Container */
export const UploadDropZone = styled.div<{ $isDragActive?: boolean; $hasImage?: boolean }>`
  border: 2px dashed ${props => (props.$isDragActive ? '#facc15' : 'rgba(255, 255, 255, 0.4)')};
  border-radius: 14px;
  background-color: ${props => (props.$isDragActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent')};
  padding: 2.2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  position: relative;
  overflow: hidden;

  /* Image preview styling */
  ${props =>
    props.$hasImage &&
    css`
      border-style: solid;
      border-color: rgba(255, 255, 255, 0.6);
      background-size: cover;
      background-position: center;
      min-height: 140px;

      &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.2) 70%);
      }
    `}

  &:hover {
    border-color: #facc15;
    background-color: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
  }

  svg, img {
    font-size: 1.8rem;
    z-index: 2;
    transition: transform 0.3s;
  }

  &:hover svg {
    transform: scale(1.1);
  }
`;

export const UploadText = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  z-index: 2;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

/* Bottom Stats Row */
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  width: 100%;
`;

export const StatCard = styled.div<{ $borderBottomColor: string }>`
  background-color: #ffffff;
  color: #111827;
  padding: 0.9rem 0.5rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border-bottom: 4px solid ${props => props.$borderBottomColor};
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

export const StatVal = styled.span<{ $textColor?: string }>`
  font-size: 1.4rem;
  font-weight: 800;
  font-family: 'Baloo 2', sans-serif;
  color: ${props => props.$textColor || '#111827'};
  line-height: 1.2;
`;

export const StatLabel = styled.span`
  font-size: 0.72rem;
  font-weight: 600;
  color: #6b7280;
  margin-top: 2px;
  line-height: 1.3;
  font-family: 'Inter', sans-serif;
`;

/* ─── Right Form Panel (White Side) ─── */
export const FormSide = styled.div`
  flex: 0.85;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 2.5rem 3rem;
  position: relative;
  overflow: hidden;
  min-height: 100vh;

  @media (max-width: 1024px) {
    flex: none;
    min-height: auto;
    padding: 2.5rem 1.5rem;
    gap: 3rem;
  }
`;

/* Floating childhood shapes in Form Side */
export const FloatingYellowStar = styled.div`
  position: absolute;
  top: 15%;
  left: 8%;
  color: #facc15;
  font-size: 1.6rem;
  opacity: 0.65;
  animation: ${float} 5s ease-in-out infinite;
  pointer-events: none;

  @media (max-width: 1024px) {
    top: 5%;
    left: 5%;
    font-size: 1.2rem;
  }
`;

export const FloatingRedRing = styled.div`
  position: absolute;
  bottom: 25%;
  left: 5%;
  width: 20px;
  height: 20px;
  border: 4.5px solid #f87171;
  border-radius: 50%;
  opacity: 0.65;
  animation: ${floatReverse} 7s ease-in-out infinite;
  pointer-events: none;

  @media (max-width: 1024px) {
    bottom: 5%;
    left: 2%;
    width: 14px;
    height: 14px;
    border-width: 3px;
  }
`;

export const FloatingBlueCircle = styled.div`
  position: absolute;
  bottom: 15%;
  right: 8%;
  width: 18px;
  height: 18px;
  background-color: #60a5fa;
  border-radius: 50%;
  opacity: 0.7;
  animation: ${float} 6s ease-in-out infinite;
  pointer-events: none;

  @media (max-width: 1024px) {
    bottom: 12%;
    right: 3%;
    width: 12px;
    height: 12px;
  }
`;

export const FloatingSoftRedCircle = styled.div`
  position: absolute;
  top: 8%;
  left: 45%;
  width: 12px;
  height: 12px;
  background-color: #fca5a5;
  border-radius: 50%;
  opacity: 0.5;
  animation: ${floatReverse} 7.5s ease-in-out infinite;
  pointer-events: none;
`;

/* ─── Top Header (Links & Language) ─── */
export const HeaderRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1.5rem;
  z-index: 10;

  @media (max-width: 640px) {
    flex-direction: column-reverse;
    align-items: flex-end;
    gap: 0.75rem;
  }
`;

export const TeacherPathText = styled.span`
  font-size: 0.88rem;
  font-weight: 500;
  color: #4b5563;
  font-family: 'Inter', sans-serif;

  a {
    color: ${props => props.theme.colors?.primary || '#237A3C'};
    font-weight: 700;
    text-decoration: none;
    margin-left: 4px;
    transition: color 0.2s, text-decoration 0.2s;

    &:hover {
      color: #1a5c2d;
      text-decoration: underline;
    }
  }
`;

/* Language Switcher Capsule */
export const InlineLangSwitcher = styled.div`
  display: flex;
  gap: 4px;
  background-color: #f3f4f6;
  padding: 4px;
  border-radius: 50px;
  border: 1px solid #e5e7eb;
`;

export const InlineLangButton = styled.button<{ $isActive: boolean }>`
  border: none;
  background-color: ${props => (props.$isActive ? '#ffffff' : 'transparent')};
  color: ${props => (props.$isActive ? '#111827' : '#6b7280')};
  font-size: 0.78rem;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 40px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  box-shadow: ${props => (props.$isActive ? '0 2px 6px rgba(0, 0, 0, 0.08)' : 'none')};

  &:hover {
    color: #111827;
  }
`;

/* ─── Centered Login Form Card ─── */
export const LoginCard = styled.div`
  width: 100%;
  max-width: 440px;
  background-color: #ffffff;
  border-radius: 28px;
  padding: 2.2rem 2.2rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.06), 0 0 1px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: auto;
  z-index: 5;
  animation: ${fadeIn} 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;

  @media (max-width: 640px) {
    padding: 1.75rem 1.25rem;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
  }
`;

export const CardHeaderArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  gap: 0.4rem;
`;

export const CDNLogo = styled.img`
  height: 48px;
  width: auto;
  object-fit: contain;
  margin-bottom: 0.5rem;
  align-self: center;
`;

export const FormTitle = styled.h2`
  font-size: 1.85rem;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.02em;
  font-family: 'Baloo 2', sans-serif;
  line-height: 1.2;
`;

export const FormSubtitle = styled.p`
  font-size: 0.92rem;
  line-height: 1.5;
  color: #6b7280;
  font-family: 'Inter', sans-serif;
`;

/* Form Tab Capsules */
export const TabCapsuleContainer = styled.div`
  display: flex;
  background-color: #f3f4f6;
  padding: 5px;
  border-radius: 14px;
  margin-bottom: 1.5rem;
  border: 1px solid #e5e7eb;
`;

export const TabCapsuleButton = styled.button<{ $isActive: boolean }>`
  flex: 1;
  border: none;
  background-color: ${props => (props.$isActive ? '#ffffff' : 'transparent')};
  color: ${props => (props.$isActive ? (props.theme.colors?.primary || '#237A3C') : '#6b7280')};
  font-size: 0.9rem;
  font-weight: 700;
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-family: 'Inter', sans-serif;
  box-shadow: ${props => (props.$isActive ? '0 4px 10px rgba(0, 0, 0, 0.05)' : 'none')};

  &:hover {
    color: ${props => (props.$isActive ? (props.theme.colors?.primary || '#237A3C') : '#111827')};
  }
`;

/* Input Group Styles */
export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;
`;

export const FieldLabel = styled.label`
  font-size: 0.88rem;
  font-weight: 700;
  color: #374151;
  margin-bottom: 0.5rem;
  font-family: 'Inter', sans-serif;
`;

export const FieldInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const FieldIconLeft = styled.div`
  position: absolute;
  left: 16px;
  color: #9ca3af;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  pointer-events: none;
  transition: color 0.3s;
`;

export const StyledTextInput = styled.input`
  width: 100%;
  padding: 0.95rem 1rem 0.95rem 2.85rem;
  background-color: #f9fafb;
  border: 1.5px solid #e5e7eb;
  border-radius: 14px;
  font-size: 0.95rem;
  font-weight: 500;
  color: #111827;
  outline: none;
  font-family: 'Inter', sans-serif;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &::placeholder {
    color: #9ca3af;
    font-weight: 400;
  }

  &:focus {
    background-color: #ffffff;
    border-color: ${props => props.theme.colors?.primary || '#237A3C'};
    box-shadow: 0 0 0 4px rgba(35, 122, 60, 0.08);
  }

  &:focus ~ ${FieldIconLeft} {
    color: ${props => props.theme.colors?.primary || '#237A3C'};
  }
`;

export const TogglePasswordBtn = styled.button`
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  font-size: 1.1rem;
  transition: color 0.2s;

  &:hover {
    color: ${props => props.theme.colors?.primary || '#237A3C'};
  }
`;

/* Checkbox and Forgot Row */
export const ControlRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.25rem;
  margin-bottom: 1.75rem;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.88rem;
  font-weight: 600;
  color: #4b5563;
  cursor: pointer;
  user-select: none;
  font-family: 'Inter', sans-serif;
`;

export const CustomCheckbox = styled.input.attrs({ type: 'checkbox' })`
  width: 18px;
  height: 18px;
  accent-color: ${props => props.theme.colors?.primary || '#237A3C'};
  cursor: pointer;
  border-radius: 6px;
  border: 1.5px solid #d1d5db;
`;

export const ForgotLink = styled.a`
  font-size: 0.88rem;
  font-weight: 700;
  color: ${props => props.theme.colors?.primary || '#237A3C'};
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  transition: color 0.2s;

  &:hover {
    color: #1a5c2d;
    text-decoration: underline;
  }
`;

/* Custom Form Buttons */
export const SolidSubmitButton = styled.button`
  width: 100%;
  padding: 0.95rem;
  background: linear-gradient(135deg, ${props => props.theme.colors?.primary || '#237A3C'} 0%, #2f9e4f 100%);
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 6px 20px rgba(35, 122, 60, 0.15);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(35, 122, 60, 0.25);
    filter: brightness(1.05);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const DividerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin: 1.35rem 0;
  color: #9ca3af;
  font-size: 0.82rem;
  font-weight: 500;
  font-family: 'Inter', sans-serif;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: #e5e7eb;
  }
`;

export const OutlineSecondaryButton = styled.button`
  width: 100%;
  padding: 0.9rem;
  background-color: #ffffff;
  border: 1.5px solid #e5e7eb;
  color: #374151;
  font-size: 0.95rem;
  font-weight: 700;
  border-radius: 14px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    border-color: ${props => props.theme.colors?.primary || '#237A3C'};
    color: ${props => props.theme.colors?.primary || '#237A3C'};
    background-color: rgba(35, 122, 60, 0.02);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  }

  &:active {
    transform: translateY(0);
  }
`;

/* Demo warning box */
export const AlertDemoBox = styled.div`
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 0.9rem 1.1rem;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  text-align: left;
`;

export const AlertText = styled.p`
  font-size: 0.78rem;
  line-height: 1.45;
  color: #4b5563;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
`;

/* Under Card Footer Info */
export const BottomCenterFooter = styled.div`
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  margin-top: auto;
  z-index: 5;
  animation: ${fadeIn} 0.9s 0.1s cubic-bezier(0.16, 1, 0.3, 1) both;

  @media (max-width: 1024px) {
    margin-top: 2rem;
  }
`;

export const FooterHelpLink = styled.span`
  font-size: 0.88rem;
  font-weight: 500;
  color: #4b5563;
  font-family: 'Inter', sans-serif;

  a {
    color: ${props => props.theme.colors?.primary || '#237A3C'};
    font-weight: 700;
    text-decoration: none;
    margin-left: 4px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const SupportHotline = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.88rem;
  font-weight: 700;
  color: #111827;
  font-family: 'Inter', sans-serif;
  padding: 6px 16px;
  border-radius: 50px;
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;

  svg {
    font-size: 1.05rem;
    color: ${props => props.theme.colors?.primary || '#237A3C'};
  }
`;
