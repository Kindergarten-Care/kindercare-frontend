import styled from 'styled-components';

export const WidgetContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0px 4px 10px rgba(14, 121, 60, 0.05);
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const WidgetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const WidgetTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #181d18;
  margin: 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
`;

export const MoreIcon = styled.div`
  color: #6f7a6e;
  cursor: pointer;
  font-weight: bold;
`;

export const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
`;

export const ChartCircle = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 12px solid #0e793c;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ChartNumber = styled.span`
  font-size: 30px;
  font-weight: bold;
  color: #005e2c;
  font-family: 'Plus Jakarta Sans', sans-serif;
`;

export const ChartLabel = styled.span`
  font-size: 10px;
  font-weight: bold;
  color: #6f7a6e;
  letter-spacing: 1px;
`;

export const StatsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StatItem = styled.div<{ variant: string }>`
  background-color: #f0f5ec;
  border: 1px solid rgba(190, 202, 188, 0.1);
  border-radius: 8px;
  padding: 9px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StatInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Dot = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

export const StatName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #181d18;
  font-family: 'Plus Jakarta Sans', sans-serif;
`;

export const StatValue = styled.div<{ bg: string; color: string }>`
  background-color: ${props => props.bg};
  color: ${props => props.color};
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
`;

export const ActionButton = styled.button`
  border: 2px solid #005e2c;
  background: white;
  color: #005e2c;
  font-size: 16px;
  font-weight: bold;
  padding: 14px 2px;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Plus Jakarta Sans', sans-serif;
  transition: all 0.2s;
  
  &:hover {
    background: #005e2c;
    color: white;
  }
`;
