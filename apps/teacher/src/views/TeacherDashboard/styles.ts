import styled from 'styled-components';

export const DashboardGrid3Col = styled.div`
  display: grid;
  grid-template-columns: 0.75fr 1fr 0.75fr;
  gap: 24px;
  width: 100%;
  align-items: start;
`;

export const DashboardGrid2Col = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  width: 100%;
  align-items: start;
`;

export const DashboardGrid1Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

// Backward compatibility fallbacks
export const DashboardGrid = DashboardGrid3Col;
export const Column1 = Column;
export const Column2 = Column;
export const Column3 = Column;

