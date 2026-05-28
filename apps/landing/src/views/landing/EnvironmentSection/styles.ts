'use client';

import styled from 'styled-components';

export const EnvIntro = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 4rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const EnvText = styled.div``;

export const Checklist = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-width: max-content;
    margin: 2rem auto 0;
  }

  li {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.fg};
  }

  li::before {
    content: '';
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.greenLight};
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%232d6a22'%3E%3Cpath fill-rule='evenodd' d='M16.707 5.293a1 1 0 010 1.414L8.414 15 3.293 9.879a1 1 0 111.414-1.414L8.414 12.172l6.879-6.879a1 1 0 011.414 0z' clip-rule='evenodd'/%3E%3C/svg%3E");
    background-size: 12px;
    background-repeat: no-repeat;
    background-position: center;
    margin-top: 2px;
  }
`;

export const EnvImageWrap = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.greenLight} 0%, #c8e8c0 100%);
  aspect-ratio: 4 / 3;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-width: 560px;
    margin: 0 auto;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 480px;
    margin: 0 auto;
  }
`;

export const EnvImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.greenMid};

  svg {
    opacity: 0.45;
  }

  p {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

export const AwardBadge = styled.div`
  position: absolute;
  bottom: 1.2rem;
  left: 1.2rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  padding: 0.7rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.fg};
`;

export const BadgeIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.amberLight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;

export const BadgeTitle = styled.div`
  font-weight: 700;
  font-size: 0.85rem;
`;

export const BadgeSub = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.muted};
`;

export const EnvCards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const EnvCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 16px;
  padding: 1.8rem 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: box-shadow 0.25s, transform 0.25s;
  height: 100%;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateY(-4px);
  }
`;

export const EnvCardIcon = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.greenXLight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const EnvCardTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

export const EnvCardText = styled.p`
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.6;
`;

export const CtaWrap = styled.div`
  margin-top: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: flex;
    justify-content: center;
  }
`;
