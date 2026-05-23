'use client';

import styled from 'styled-components';

export const StatsBarRoot = styled.div`
  background: ${({ theme }) => theme.colors.green};
  color: #fff;
  padding: 1.3rem 1.5rem;
`;

export const StatsInner = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const StatItemRoot = styled.div`
  text-align: center;
  padding: 0.25rem;
`;

export const StatNum = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.5rem, 2.8vw, 2.1rem);
  font-weight: 700;
  line-height: 1;
  color: #fff;
  margin-bottom: 0.2rem;

  sup {
    font-size: 55%;
    vertical-align: super;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;

export const StatLabel = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.4;
`;
