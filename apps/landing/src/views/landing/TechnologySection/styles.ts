'use client';

import styled from 'styled-components';
import { Section } from '@/UIKit';

export const TechSectionRoot = styled(Section)`
  background: ${({ theme }) => theme.colors.techBg};
  color: ${({ theme }) => theme.colors.white};
`;

export const TechInner = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
`;

export const TechHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  span.section-label {
    color: ${({ theme }) => theme.colors.amberMid};
  }
`;

export const TechTitle = styled.h2`
  color: ${({ theme }) => theme.colors.white};
`;

export const TechSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.6);
  margin: 1rem auto 0;
  font-size: 1.05rem;
  max-width: 560px;
`;

export const CenteredDivider = styled.div`
  width: 48px;
  height: 3px;
  border-radius: 3px;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.green}, ${({ theme }) => theme.colors.amber});
  margin: 0 auto 1rem;
`;

export const CarouselWrap = styled.div`
  position: relative;
  overflow: hidden;
  margin-top: 2.25rem;
  padding: 12px 0;
`;

export const CarouselTrack = styled.div<{ $offset: number }>`
  display: flex;
  gap: 1.5rem;
  transition: transform 0.5s ease;
  will-change: transform;
  transform: translateX(${({ $offset }) => `${$offset}px`});
`;

export const TechCard = styled.div`
  flex-shrink: 0;
  width: 220px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  transition: transform 0.25s, border-color 0.25s;

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(255, 255, 255, 0.25);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 180px;
  }
`;

export const TechCardScreen = styled.div`
  height: 360px;
  overflow: hidden;
  background: #1c2f18;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 300px;
  }
`;

export const TechCardInfo = styled.div`
  padding: 1rem 1.1rem;

  h3 {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.white};
    margin-bottom: 0.25rem;
  }

  p {
    font-size: 0.78rem;
    color: rgba(255, 255, 255, 0.5);
    line-height: 1.5;
  }
`;

export const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1.75rem;
`;

export const ControlButton = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: ${({ theme }) => theme.colors.white};
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.4);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;
