'use client';

import styled from 'styled-components';

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