'use client';

import styled from 'styled-components';

export const DashboardContainer = styled.div`
  max-width: 1640px;
  width: 100%;
  margin: 0 auto;
  padding: 26px 40px 60px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 860px) {
    padding: 18px 18px 96px;
  }
`;

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 384px;
  gap: 26px;
  width: 100%;
  align-items: start;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
  min-width: 0;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
  min-width: 0;
`;
