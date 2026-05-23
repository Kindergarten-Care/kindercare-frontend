'use client';

import styled, { css } from 'styled-components';
import { Section } from '@/UIKit';

export const EnrollSection = styled(Section)`
  background: ${({ theme }) => theme.colors.greenXLight};
`;

export const EnrollInner = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
`;

export const EnrollGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

export const Rows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-width: max-content;
    margin: 0 auto;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

export const RowIcon = styled.div`
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.greenLight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;

export const RowText = styled.div`
  strong {
    display: block;
    font-size: 0.9rem;
    margin-bottom: 0.1rem;
  }

  span {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

export const CtaNote = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: ${({ theme }) => theme.colors.amberLight};
  border: 1px solid rgba(196, 136, 10, 0.2);
  border-radius: 12px;
  padding: 1rem 1.2rem;
  margin-top: 1.5rem;
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.fg};

  span:first-child {
    font-size: 1.2rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-width: 560px;
    margin: 1.5rem auto 0;
  }
`;

export const PricingCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const PricingCard = styled.div<{ $featured?: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 16px;
  padding: 1.5rem 1.8rem;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  position: relative;
  transition: box-shadow 0.25s;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.soft};
  }

  ${({ $featured, theme }) =>
    $featured &&
    css`
      border-color: ${theme.colors.green};
      box-shadow: 0 0 0 4px rgba(45, 106, 34, 0.08);
    `}
`;

export const PricingBadge = styled.span`
  position: absolute;
  top: -12px;
  right: 1.5rem;
  background: ${({ theme }) => theme.colors.green};
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 0.2rem 0.75rem;
  border-radius: 50px;
  text-transform: uppercase;
`;

export const PricingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

export const PricingName = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.2rem;
  font-weight: 700;
`;

export const PricingTag = styled.span<{ $featured?: boolean }>`
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.2rem 0.65rem;
  border-radius: 50px;
  background: ${({ $featured, theme }) => ($featured ? theme.colors.green : theme.colors.greenLight)};
  color: ${({ $featured, theme }) => ($featured ? theme.colors.white : theme.colors.green)};
`;

export const PricingDesc = styled.p`
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 1rem;
`;

export const Features = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  li {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.85rem;
  }

  li::before {
    content: '';
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.greenLight};
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%232d6a22'%3E%3Cpath fill-rule='evenodd' d='M16.707 5.293a1 1 0 010 1.414L8.414 15 3.293 9.879a1 1 0 111.414-1.414L8.414 12.172l6.879-6.879a1 1 0 011.414 0z' clip-rule='evenodd'/%3E%3C/svg%3E");
    background-size: 10px;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

export const PricingCtaWrap = styled.div`
  margin-top: 1.2rem;
`;
