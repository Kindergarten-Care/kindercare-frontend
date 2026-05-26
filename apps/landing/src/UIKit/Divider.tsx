'use client';

import styled from 'styled-components';

export const Divider = styled.div`
  width: 48px;
  height: 3px;
  border-radius: 3px;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.green}, ${({ theme }) => theme.colors.amber});
  margin-bottom: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-left: auto;
    margin-right: auto;
  }
`;
