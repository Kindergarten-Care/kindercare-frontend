'use client';

import styled from 'styled-components';

export const DashboardContainer = styled.div`
  max-width: 1660px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 32px;
  width: 100%;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
`;

export const LeftColumn = styled.div`
  grid-column: 1 / span 8;
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (max-width: 1200px) {
    grid-column: 1 / span 7;
  }
  
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const RightColumn = styled.div`
  grid-column: 9 / span 4;
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (max-width: 1200px) {
    grid-column: 8 / span 5;
  }

  @media (max-width: 1024px) {
    width: 100%;
  }
`;
