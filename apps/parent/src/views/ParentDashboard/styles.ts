'use client';

import styled from 'styled-components';

export const DashboardContainer = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding-top: 32px;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 4fr 3fr 5fr; /* Approximate 30% - 25% - 45% based on Figma */
  gap: 24px;
  align-items: flex-start;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

export const Col1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Col2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Col3 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const WidgetCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0px 4px 10px rgba(14, 121, 60, 0.05);
  display: flex;
  flex-direction: column;
`;

export const WidgetHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const WidgetTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #181d18;
  margin: 0;
`;

export const WidgetLink = styled.a`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #005e2c;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// Shared specific elements
export const IconButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
