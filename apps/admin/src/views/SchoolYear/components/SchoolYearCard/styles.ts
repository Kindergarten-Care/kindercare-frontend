import styled, { css } from 'styled-components';

export const CardContainer = styled.div<{ $status: 'active' | 'past' }>`
  background-color: #ffffff;
  border-radius: 24px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  ${props => props.$status === 'active' && css`
    border: 1px solid transparent;
    box-shadow: 0px 20px 40px 0px rgba(118, 210, 117, 0.05);
    
    /* Overlay decoration */
    &::before {
      content: '';
      position: absolute;
      top: -64px;
      right: -64px;
      width: 128px;
      height: 128px;
      background-color: rgba(118, 210, 117, 0.1);
      border-bottom-left-radius: 9999px;
    }
  `}

  ${props => props.$status === 'past' && css`
    border: 1px solid rgba(224, 227, 229, 0.5);
    box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.02);
    opacity: 0.8;
  `}
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  position: relative; /* Above overlay */
`;

export const CardTitle = styled.h3<{ $status: 'active' | 'past' }>`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: ${props => props.$status === 'active' ? '#181c1e' : '#3f493d'};
  margin: 0;
`;

export const StatusBadge = styled.div<{ $status: 'active' | 'past' }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 13px;
  border-radius: 9999px;
  font-family: 'Lexend', sans-serif;
  font-size: 16px;

  ${props => props.$status === 'active' && css`
    background-color: rgba(118, 210, 117, 0.15);
    border: 1px solid rgba(118, 210, 117, 0.3);
    box-shadow: 0px 0px 15px 0px rgba(118, 210, 117, 0.2);
    color: #76d275;
  `}

  ${props => props.$status === 'past' && css`
    background-color: #e0e3e5;
    border: 1px solid #bfcab9;
    color: #3f493d;
  `}
`;

export const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  background-color: #76d275;
`;

export const DateBox = styled.div<{ $status: 'active' | 'past' }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 16px;
  background-color: ${props => props.$status === 'active' ? '#f7fafc' : '#f1f4f6'};
  
  font-family: 'Lexend', sans-serif;
  font-size: ${props => props.$status === 'active' ? '16px' : '14px'};
  color: #3f493d;
  
  svg {
    color: #3f493d;
  }
`;

export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

export const StatBox = styled.div<{ $status: 'active' | 'past' }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 13px;
  border-radius: 12px;
  background-color: ${props => props.$status === 'active' ? '#f7fafc' : '#f1f4f6'};
`;

export const StatLabel = styled.div<{ $status: 'active' | 'past' }>`
  font-family: 'Lexend', sans-serif;
  font-size: 16px;
  color: ${props => props.$status === 'active' ? '#3f493d' : '#6f7a6c'};
`;

export const StatValue = styled.div<{ $status: 'active' | 'past' }>`
  font-family: 'Lexend', sans-serif;
  font-size: 16px;
  color: ${props => props.$status === 'active' ? '#181c1e' : '#3f493d'};
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 24px;
  padding-top: 17px;
  border-top: 1px solid #e0e3e5;
  gap: 12px;
`;

export const IconButton = styled.button`
  background-color: #f7fafc;
  border: none;
  border-radius: 9999px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #3f493d;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e2e8f0;
  }
`;

export const TextButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: 'Lexend', sans-serif;
  font-size: 14px;
  color: #006494;
  cursor: pointer;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;
