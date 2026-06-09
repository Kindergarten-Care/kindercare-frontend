import styled, { css } from 'styled-components';

export const WidgetContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0px 4px 20px rgba(14, 121, 60, 0.05);
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const WidgetHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Icon = styled.span`
  font-size: 20px;
`;

export const WidgetTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #181d18;
  margin: 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
`;

export const AlertsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const AlertCard = styled.div<{ severity: string }>`
  background-color: #fef2f2;
  border-radius: 12px;
  padding: 18px;
  display: flex;
  gap: 12px;
  align-items: flex-start;

  ${props => props.severity === 'high' && css`
    border: 2px solid #fecaca;
  `}

  ${props => props.severity === 'medium' && css`
    border: 1px solid #fee2e2;
  `}
`;

export const AlertIcon = styled.div<{ severity: string }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 12px;

  ${props => props.severity === 'high' && css`
    background-color: #ba1a1a;
  `}

  ${props => props.severity === 'medium' && css`
    background-color: #f59e0b;
  `}
`;

export const AlertContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AlertName = styled.span<{ severity: string }>`
  font-size: 16px;
  font-weight: bold;
  font-family: 'Plus Jakarta Sans', sans-serif;

  ${props => props.severity === 'high' && css`
    color: #ba1a1a;
  `}

  ${props => props.severity === 'medium' && css`
    color: #181d18;
  `}
`;

export const AlertDesc = styled.span<{ severity: string }>`
  font-size: 14px;
  font-family: 'Plus Jakarta Sans', sans-serif;

  ${props => props.severity === 'high' && css`
    color: #7f1d1d;
    font-weight: 500;
  `}

  ${props => props.severity === 'medium' && css`
    color: #3f493f;
  `}
`;
