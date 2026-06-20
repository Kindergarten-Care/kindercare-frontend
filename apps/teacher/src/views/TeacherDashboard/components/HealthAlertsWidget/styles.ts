import styled, { css } from 'styled-components';

export const WidgetContainer = styled.section`
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 4px 20px rgba(16, 24, 40, 0.04);
  border-top: 4px solid #F43F5E;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  box-sizing: border-box;
  border-left: 1px solid rgba(16, 24, 40, 0.03);
  border-right: 1px solid rgba(16, 24, 40, 0.03);
  border-bottom: 1px solid rgba(16, 24, 40, 0.03);
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.h3`
  font-size: 16px;
  font-weight: 800;
  color: #1F2937;
  margin: 0;
  font-family: 'Be Vietnam Pro', system-ui, sans-serif;
`;

export const CounterBadge = styled.span`
  font-size: 11px;
  font-weight: 800;
  color: #E11D48;
  background: #FFF1F2;
  padding: 4px 10px;
  border-radius: 999px;
  font-family: 'Be Vietnam Pro', system-ui, sans-serif;
`;

export const MedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const MedRow = styled.div<{ $done?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 16px;
  background: #FDFDFD;
  border: 1px solid rgba(16, 24, 40, 0.03);
  transition: all 0.2s ease;

  ${props => props.$done && css`
    opacity: 0.65;
    background: #F9FAF9;
  `}
`;

export const AvatarCircle = styled.span<{ $color: string }>`
  flex: none;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 15px;
  color: #374151;
  background: ${props => props.$color};
  font-family: 'Be Vietnam Pro', system-ui, sans-serif;
`;

export const InfoCol = styled.div`
  flex: 1;
  min-width: 0;
`;

export const MedName = styled.div<{ $done?: boolean }>`
  font-weight: 700;
  font-size: 13.5px;
  color: #1F2937;
  font-family: 'Be Vietnam Pro', system-ui, sans-serif;
  
  ${props => props.$done && css`
    text-decoration: line-through;
    color: #9CA3AF;
  `}
`;

export const MedDose = styled.div`
  font-size: 11.5px;
  color: #6B7280;
  font-weight: 500;
  margin-top: 2px;
  font-family: 'Be Vietnam Pro', system-ui, sans-serif;
`;

export const CheckBox = styled.button<{ $done?: boolean }>`
  width: 26px;
  height: 26px;
  border-radius: 8px;
  border: 1.5px solid #E2E8F0;
  background: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
  padding: 0;

  &:hover {
    border-color: #F43F5E;
    transform: scale(1.05);
  }

  ${props => props.$done && css`
    background: #F43F5E;
    border-color: #F43F5E;
  `}
`;

export const CheckIcon = styled.span`
  color: #ffffff;
  font-size: 15px;
  line-height: 1;
  font-weight: bold;
`;
