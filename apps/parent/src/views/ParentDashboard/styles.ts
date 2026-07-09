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
    padding: 18px 0 96px;
  }

  @media (max-width: 768px) {
    padding: 16px 0 96px;
  }
`;

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 384px;
  gap: 32px;
  width: 100%;
  align-items: start;

  @container dashboard-main (max-width: 1100px) {
    display: flex;
    flex-direction: column;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  min-width: 0;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  min-width: 0;
`;

export const LeftTopGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.8fr) minmax(0, 1fr);
  gap: 32px;
  align-items: stretch;
  width: 100%;

  @container dashboard-main (max-width: 1100px) {
    display: flex;
    flex-direction: column;
  }
`;

export const ColumnStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  min-width: 0;
`;

export const BottomGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 32px;
  align-items: stretch;

  @container dashboard-main (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

