import styled from 'styled-components';

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 0.75fr 1fr 0.75fr;
  gap: 24px;
  width: 100%;
  align-items: start;
`;

export const Column1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Column2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Column3 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
