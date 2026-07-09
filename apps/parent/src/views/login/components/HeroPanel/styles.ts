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

export const HeroPatternOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.055) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
  z-index: 0;
`;

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