'use client';

import styled, { keyframes, css } from 'styled-components';

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

export const twinkle = keyframes`
  0%, 100% { opacity: 0.2; transform: scale(0.85) rotate(0deg); }
  50%       { opacity: 0.7; transform: scale(1.2)  rotate(15deg); }
`;

/* ─── Kindergarten Decorative Components ─── */

export const HeroPatternOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.055) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
  z-index: 0;
`;

/* CSS cloud shape — scale via font-size */
export const CloudDecor = styled.div<{
  $size?: string;
  $top?: string;
  $left?: string;
  $right?: string;
  $bottom?: string;
  $opacity?: string;
  $speed?: string;
  $reverse?: boolean;
}>`
  position: absolute;
  font-size: ${p => p.$size || '11px'};
  width: 8em;
  height: 2.4em;
  background: rgba(255, 255, 255, ${p => p.$opacity || '0.13'});
  border-radius: 3em;
  pointer-events: none;
  z-index: 1;
  top: ${p => p.$top || 'auto'};
  left: ${p => p.$left || 'auto'};
  right: ${p => p.$right || 'auto'};
  bottom: ${p => p.$bottom || 'auto'};
  animation: ${p => p.$reverse ? floatReverse : float} ${p => p.$speed || '8s'} ease-in-out infinite;

  &::before, &::after {
    content: '';
    position: absolute;
    background: inherit;
    border-radius: 50%;
  }
  &::before {
    width: 2.8em; height: 2.8em;
    top: -1.3em; left: 1em;
  }
  &::after {
    width: 2em; height: 2em;
    top: -0.9em; right: 1.4em;
  }
`;

/* Floating ABC / 123 letter */
export const KidLetter = styled.span<{
  $top?: string;
  $left?: string;
  $right?: string;
  $bottom?: string;
  $size?: string;
  $color?: string;
  $speed?: string;
  $reverse?: boolean;
}>`
  position: absolute;
  font-size: ${p => p.$size || '2.5rem'};
  font-weight: 900;
  font-family: 'Baloo 2', sans-serif;
  color: ${p => p.$color || 'rgba(255, 255, 255, 0.15)'};
  line-height: 1;
  pointer-events: none;
  z-index: 1;
  user-select: none;
  top: ${p => p.$top || 'auto'};
  left: ${p => p.$left || 'auto'};
  right: ${p => p.$right || 'auto'};
  bottom: ${p => p.$bottom || 'auto'};
  animation: ${p => p.$reverse ? floatReverse : float} ${p => p.$speed || '9s'} ease-in-out infinite;
`;

/* Sparkle dot */
export const SparkDot = styled.div<{
  $size?: string;
  $top?: string;
  $left?: string;
  $right?: string;
  $bottom?: string;
  $color?: string;
  $speed?: string;
  $reverse?: boolean;
}>`
  position: absolute;
  width: ${p => p.$size || '7px'};
  height: ${p => p.$size || '7px'};
  border-radius: 50%;
  background: ${p => p.$color || 'rgba(255, 255, 255, 0.35)'};
  pointer-events: none;
  z-index: 1;
  top: ${p => p.$top || 'auto'};
  left: ${p => p.$left || 'auto'};
  right: ${p => p.$right || 'auto'};
  bottom: ${p => p.$bottom || 'auto'};
  animation: ${p => p.$reverse ? floatReverse : float} ${p => p.$speed || '5s'} ease-in-out infinite;
`;

/* Twinkling star (★ shape via clip-path) */
export const TwinkleStar = styled.div<{
  $size?: string;
  $top?: string;
  $left?: string;
  $right?: string;
  $bottom?: string;
  $color?: string;
  $speed?: string;
}>`
  position: absolute;
  font-size: ${p => p.$size || '1.2rem'};
  color: ${p => p.$color || 'rgba(250, 204, 21, 0.55)'};
  pointer-events: none;
  z-index: 1;
  user-select: none;
  line-height: 1;
  top: ${p => p.$top || 'auto'};
  left: ${p => p.$left || 'auto'};
  right: ${p => p.$right || 'auto'};
  bottom: ${p => p.$bottom || 'auto'};
  animation: ${twinkle} ${p => p.$speed || '3s'} ease-in-out infinite;
`;

/* Rainbow stripe at the top of the login card */
export const CardRainbowAccent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg,
    #ef4444 0%,
    #f97316 16%,
    #facc15 33%,
    #4ade80 50%,
    #60a5fa 67%,
    #c084fc 83%,
    #f472b6 100%
  );
  z-index: 10;
`;

/* ─── Mobile Hero Banner (< lg) ─── */
export const MobileHeroBanner = styled.div`
  width: 100%;
  background: linear-gradient(160deg, #1e6b34 0%, #237A3C 50%, #2a8f48 100%);
  padding: 1.1rem 1.25rem 1.6rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  position: relative;
  overflow: hidden;
  color: #ffffff;
  gap: 0.5rem;
  border-radius: 0 0 24px 24px;
  box-shadow: 0 6px 24px rgba(35, 122, 60, 0.22);
  z-index: 2;
  flex-shrink: 0;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.055) 1px, transparent 1px);
    background-size: 20px 20px;
    pointer-events: none;
  }
`;

export const MobileBannerTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  z-index: 1;
  gap: 0.75rem;
`;

export const MobileHeroTitle = styled.h2`
  font-size: 1.35rem;
  font-weight: 800;
  line-height: 1.25;
  font-family: 'Baloo 2', sans-serif;
  color: #ffffff;
  margin: 0;
  z-index: 1;

  span {
    color: #facc15;
  }
`;

/* ─── Core Layouts ─── */
export const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  font-family: 'Baloo 2', 'Inter', system-ui, -apple-system, sans-serif;
  background-color: #ffffff;
  overflow: hidden;

  @media (max-width: 1024px) {
    flex-direction: column;
    height: 100svh;
    min-height: -webkit-fill-available;
    overflow-y: auto;
    overflow-x: hidden;
  }
`;

/* ─── Left Branding Panel (Green Side) ─── */
export const HeroSide = styled.div`
  flex: 1.15;
  background: linear-gradient(160deg, #1e6b34 0%, ${props => props.theme.colors?.green || '#237A3C'} 40%, #2a8f48 100%);
  padding: 2.5rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  position: relative;
  overflow: hidden;
  color: #ffffff;

  @media (max-width: 1024px) {
    flex: none;
    min-height: auto;
    padding: 2rem 1.5rem;
    gap: 1.5rem;
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
  margin-bottom: 0.5rem;
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
  gap: 1.25rem;
  max-width: 600px;
  z-index: 2;

  @media (max-width: 1024px) {
    margin: 0;
  }
`;

export const BadgeCapsule = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  align-self: flex-start;
  background-color: #fff0d8;
  color: #d97706;
  font-size: 0.88rem;
  font-weight: 700;
  padding: 6px 18px;
  border-radius: 50px;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  animation: ${fadeIn} 0.8s 0.1s cubic-bezier(0.16, 1, 0.3, 1) both;

  &::before {
    content: '•';
    color: #f2a33c;
    font-size: 1.3rem;
  }
`;

export const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.15;
  font-family: 'Baloo 2', sans-serif;
  letter-spacing: -0.5px;
  animation: ${fadeIn} 0.8s 0.2s cubic-bezier(0.16, 1, 0.3, 1) both;

  span {
    color: #facc15;
    position: relative;
    display: inline-block;
  }

  @media (max-width: 1280px) {
    font-size: 3rem;
  }

  @media (max-width: 1024px) {
    font-size: 2.6rem;
  }

  @media (max-width: 640px) {
    font-size: 2.2rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.1rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.88);
  font-weight: 400;
  font-family: 'Inter', sans-serif;
  max-width: 520px;
  animation: ${fadeIn} 0.8s 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;

  @media (max-width: 1024px) {
    font-size: 1rem;
  }

  @media (max-width: 640px) {
    font-size: 0.95rem;
  }
`;

/* ─── Drag & Drop / Stats Section ─── */
export const StatsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 2;
  animation: ${fadeIn} 0.8s 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
  width: 100%;
  max-width: 580px;
`;

export const StatsContainerOuter = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 0.65rem;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  width: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

/* Drag and Drop Container */
export const UploadDropZone = styled.div<{ $isDragActive?: boolean; $hasImage?: boolean }>`
  border: 2px dashed ${props => (props.$isDragActive ? '#facc15' : 'rgba(255, 255, 255, 0.4)')};
  border-radius: 14px;
  background-color: ${props => (props.$isDragActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent')};
  padding: 1.2rem 1rem;
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
  padding: 0.6rem 0.5rem;
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
  font-size: 1.2rem;
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
  flex: 1;
  background: linear-gradient(155deg, #ffffff 0%, #f8fffe 40%, #edf7f1 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1.75rem 3rem;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: 1280px) {
    padding: 1.75rem 2.25rem;
  }

  @media (max-width: 1024px) {
    flex: 1;
    min-height: 0;
    padding: 1.75rem 1.5rem 2rem;
    gap: 1.5rem;
    background: #ffffff;
  }

  @media (max-width: 640px) {
    padding: 1.5rem 1rem 2rem;
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
  max-width: 560px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  z-index: 10;

  @media (max-width: 1024px) {
    max-width: 100%;
  }

  @media (max-width: 640px) {
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const TeacherPathText = styled.span`
  font-size: 0.88rem;
  font-weight: 500;
  color: #4b5563;
  font-family: 'Inter', sans-serif;

  a {
    color: ${props => props.theme.colors?.green || '#237A3C'};
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


/* ─── Centered Login Form Card ─── */
export const LoginCard = styled.div`
  position: relative;
  width: 100%;
  max-width: 560px;
  min-height: 520px;
  background-color: #ffffff;
  border-radius: 24px;
  padding: 2rem 3rem 3.5rem 3rem;
  box-shadow:
    0 4px 6px rgba(35, 122, 60, 0.04),
    0 12px 32px rgba(35, 122, 60, 0.10),
    0 32px 64px rgba(0, 0, 0, 0.07);
  border: 1px solid rgba(35, 122, 60, 0.10);
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  margin-top: auto;
  margin-bottom: auto;
  z-index: 5;
  animation: ${fadeIn} 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;

  @media (max-width: 640px) {
    max-width: 100%;
    min-height: auto;
    padding: 1.25rem 1.25rem;
    border-radius: 18px;
    box-shadow: 0 8px 24px rgba(35, 122, 60, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);
  }
`;

export const CardHeaderArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 1.5rem;
  gap: 0.75rem;
`;

export const CDNLogo = styled.img`
  height: 55px;
  width: auto;
  object-fit: contain;
  margin-bottom: 0.4rem;
  align-self: center;
`;

export const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.02em;
  font-family: 'Baloo 2', sans-serif;
  line-height: 1.2;
`;

export const FormSubtitle = styled.p`
  font-size: 0.82rem;
  line-height: 1.4;
  color: #6b7280;
  font-family: 'Inter', sans-serif;
`;

/* Form Tab Capsules */
export const TabCapsuleContainer = styled.div`
  display: flex;
  background-color: #f3f4f6;
  padding: 4px;
  border-radius: 12px;
  margin-bottom: 1rem;
  border: 1px solid #e5e7eb;
`;

export const TabCapsuleButton = styled.button<{ $isActive: boolean }>`
  flex: 1;
  border: none;
  background-color: ${props => (props.$isActive ? '#ffffff' : 'transparent')};
  color: ${props => (props.$isActive ? (props.theme.colors?.green || '#237A3C') : '#6b7280')};
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
    color: ${props => (props.$isActive ? (props.theme.colors?.green || '#237A3C') : '#111827')};
  }
`;

/* Input Group Styles */
export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.85rem;
`;

export const FieldLabel = styled.label`
  font-size: 0.82rem;
  font-weight: 700;
  color: #374151;
  margin-bottom: 0.35rem;
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
  padding: 0.75rem 1rem 0.75rem 2.85rem;
  background-color: #f9fafb;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  font-size: 0.88rem;
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
    border-color: ${props => props.theme.colors?.green || '#237A3C'};
    box-shadow: 0 0 0 4px rgba(35, 122, 60, 0.08);
  }

  &:focus ~ ${FieldIconLeft} {
    color: ${props => props.theme.colors?.green || '#237A3C'};
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
    color: ${props => props.theme.colors?.green || '#237A3C'};
  }
`;

/* Checkbox and Forgot Row */
export const ControlRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.15rem;
  margin-bottom: 1rem;
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
  accent-color: ${props => props.theme.colors?.green || '#237A3C'};
  cursor: pointer;
  border-radius: 6px;
  border: 1.5px solid #d1d5db;
`;

export const ForgotLink = styled.a`
  font-size: 0.88rem;
  font-weight: 700;
  color: ${props => props.theme.colors?.green || '#237A3C'};
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
  padding: 0.75rem;
  background: linear-gradient(135deg, ${props => props.theme.colors?.green || '#237A3C'} 0%, #2f9e4f 100%);
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
  margin: 0.5rem 0;
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
  padding: 0.75rem;
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
    border-color: ${props => props.theme.colors?.green || '#237A3C'};
    color: ${props => props.theme.colors?.green || '#237A3C'};
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
  border-radius: 12px;
  padding: 0.5rem 0.75rem;
  margin-top: 0.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
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
  max-width: 460px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  z-index: 5;
  animation: ${fadeIn} 0.9s 0.1s cubic-bezier(0.16, 1, 0.3, 1) both;

  @media (max-width: 1024px) {
    max-width: 100%;
    margin-top: 0.5rem;
  }
`;

export const FooterHelpLink = styled.span`
  font-size: 0.88rem;
  font-weight: 500;
  color: #4b5563;
  font-family: 'Inter', sans-serif;

  a {
    color: ${props => props.theme.colors?.green || '#237A3C'};
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
  padding: 4px 14px;
  border-radius: 50px;
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;

  svg {
    font-size: 1.05rem;
    color: ${props => props.theme.colors?.green || '#237A3C'};
  }
`;
