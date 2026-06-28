'use client';

import styled from 'styled-components';

export const DashboardContainer = styled.div`
  max-width: 1640px;
  width: 100%;
  margin: 0 auto;
  padding: 32px 40px 60px;
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (max-width: 860px) {
    padding: 18px 18px 96px;
  }
`;

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 384px;
  gap: 32px;
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
  gap: 32px;
  min-width: 0;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  min-width: 0;
`;

export const LeftTopGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.8fr) minmax(0, 1fr);
  gap: 32px;
  align-items: stretch;
  width: 100%;

  @media (max-width: 960px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const ColumnStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const BottomGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

