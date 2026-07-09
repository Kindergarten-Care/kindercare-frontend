'use client';

import styled, { keyframes } from 'styled-components';

/**
 * Shared keyframes + decorative atoms used by HeroPanel, MobileHeroBannerPanel,
 * and LoginFormPanel. These travel together because the visual identity of the
 * login screen (cloud/letters/stars) is one design language.
 */

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