'use client';

import styled, { css, keyframes } from 'styled-components';
import type { HeroSlideVariant } from '@/config/types';

const variantBackgrounds: Record<HeroSlideVariant, string> = {
  forest: 'linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url("/carousel/carousel(1).png") center/cover no-repeat',
  spring: 'linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url("/carousel/carousel(2).png") center/cover no-repeat',
  amber: 'linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url("/carousel/carousel(3).png") center/cover no-repeat',
};

const forestBlobs = css`
  &::before {
    content: '';
    position: absolute;
    width: 500px;
    height: 500px;
    top: -100px;
    right: -80px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(90, 158, 68, 0.25) 0%, transparent 70%);
    pointer-events: none;
  }
  &::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    bottom: -60px;
    left: 10%;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(196, 136, 10, 0.2) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const springBlobs = css`
  &::before {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    top: -150px;
    right: -100px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const amberBlobs = css`
  &::before {
    content: '';
    position: absolute;
    width: 450px;
    height: 450px;
    top: -80px;
    right: 5%;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(196, 136, 10, 0.3) 0%, transparent 70%);
    pointer-events: none;
  }
  &::after {
    content: '';
    position: absolute;
    width: 250px;
    height: 250px;
    bottom: 10%;
    left: 5%;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.06) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const blobByVariant = (variant: HeroSlideVariant) => {
  if (variant === 'forest') return forestBlobs;
  if (variant === 'spring') return springBlobs;
  return amberBlobs;
};

export const HeroSection = styled.section`
  position: relative;
  height: clamp(
    480px,
    calc(100svh - ${({ theme }) => theme.layout.navHeight} - 110px),
    820px
  );
  overflow: hidden;
  margin-top: ${({ theme }) => theme.layout.navHeight};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-top: ${({ theme }) => theme.layout.navHeightMobile};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: clamp(
      460px,
      calc(100svh - ${({ theme }) => theme.layout.navHeightMobile} - 100px),
      720px
    );
  }
`;

export const SlidesWrap = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

export const Slide = styled.div<{ $variant: HeroSlideVariant; $active: boolean }>`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  pointer-events: ${({ $active }) => ($active ? 'auto' : 'none')};
  transition: opacity 0.9s ease;
  background: ${({ $variant }) => variantBackgrounds[$variant]};
  ${({ $variant }) => blobByVariant($variant)}
`;

export const SlideContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
`;

export const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  padding: 0.35rem 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  margin-bottom: 1.5rem;
  text-transform: uppercase;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.amberMid};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: flex;
    width: fit-content;
    margin: 0 auto 1.5rem;
  }
`;

export const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.2rem, 5.5vw, 4rem);
  color: ${({ theme }) => theme.colors.white};
  line-height: 1.15;
  margin-bottom: 1.25rem;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.6), 0 8px 24px rgba(0, 0, 0, 0.4);
  max-width: 700px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const Description = styled.p`
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
  max-width: 520px;
  margin-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 0.95rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 0.75rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    justify-content: center;
  }
`;

const Arrow = styled.button`
  position: absolute;
  top: 50%;
  z-index: 10;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  backdrop-filter: blur(4px);

  &:hover {
    background: rgba(255, 255, 255, 0.28);
    transform: translateY(-50%) scale(1.08);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const ArrowPrev = styled(Arrow)`
  left: 1.5rem;
`;
export const ArrowNext = styled(Arrow)`
  right: 1.5rem;
`;

export const Dots = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.6rem;
  z-index: 10;
`;

export const Dot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? '24px' : '8px')};
  height: 8px;
  border-radius: ${({ $active }) => ($active ? '4px' : '50%')};
  background: ${({ $active, theme }) => ($active ? theme.colors.white : 'rgba(255,255,255,0.4)')};
  transition: all 0.3s;
`;

const progressAnim = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

export const ProgressBar = styled.div<{ $duration: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  z-index: 10;
  background: rgba(255, 255, 255, 0.8);
  width: 0;
  animation: ${progressAnim} ${({ $duration }) => $duration}ms linear forwards;
`;

export const LeafWrap = styled.div`
  position: absolute;
  right: 8%;
  bottom: 15%;
  opacity: 0.18;
  pointer-events: none;
  z-index: 1;
`;
