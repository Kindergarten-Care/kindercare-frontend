'use client';

import styled from 'styled-components';

export const SectionLabel = styled.span`
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.amber};
  margin-bottom: 0.65rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: block;
    text-align: center;
  }
`;

export const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.fg};
  margin-bottom: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    text-align: center;
  }
`;

export const SectionSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 1.05rem;
  max-width: 560px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
`;
