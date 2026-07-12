'use client';

import styled from 'styled-components';

import {
  fadeIn,
  float,
  floatReverse,
} from '../../styles/decorations';

export {
  fadeIn,
  float,
  floatReverse,
  pulseGlow,
  twinkle,
  SparkDot,
  TwinkleStar,
  BadgeCapsule,
  CardRainbowAccent,
  PageContainer,
} from '../../styles/decorations';

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
  appearance: none;
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  background-color: #ffffff;
  border: 2px solid #d1d5db;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:checked {
    background-color: ${props => props.theme.colors?.green || '#237A3C'};
    border-color: ${props => props.theme.colors?.green || '#237A3C'};
  }

  &:checked::after {
    content: '✓';
    color: #ffffff;
    font-size: 12px;
    font-weight: 800;
  }

  &:hover {
    border-color: ${props => props.theme.colors?.green || '#237A3C'};
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px rgba(35, 122, 60, 0.25);
  }
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