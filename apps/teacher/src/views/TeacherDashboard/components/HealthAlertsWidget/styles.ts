import styled, { css } from 'styled-components';

export const WidgetContainer = styled.section`
  background: ${props => props.theme.colors.surface};
  border: 1px solid #FCA5A5;
  border-radius: ${props => props.theme.radius.lg};
  box-shadow: ${props => props.theme.shadows.soft};
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 18px 48px -12px rgba(0, 90, 54, 0.16), 0 6px 16px -6px rgba(0, 0, 0, 0.06);
  }
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 14px;
`;

export const HeaderIconWrapper = styled.span`
  flex: none;
  width: 32px;
  height: 32px;
  border-radius: ${props => props.theme.radius.md};
  background: #FEE2E2;
  color: #DC2626;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const WidgetTitle = styled.span`
  font-family: ${props => props.theme.fonts.display};
  font-weight: 700;
  font-size: 15px;
  color: ${props => props.theme.colors.fg};
  flex: 1;
`;

export const CounterBadge = styled.span`
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: ${props => props.theme.radius.pill};
  background: #DC2626;
  color: ${props => props.theme.colors.white};
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  flex: 1;
  overflow: auto;
  max-height: 430px;
  padding-right: 2px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cfe0d6;
    border-radius: 4px;
  }
`;

export const MedRow = styled.div<{ $done?: boolean }>`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 11px;
  border-radius: 13px;
  background: #FEF2F2;
  border: 1px solid #FECDD3;
  transition: all 0.25s ease;

  ${props => props.$done && css`
    opacity: 0.6;
    background: #F9FAF9;
    border-color: #E2E8F0;
  `}
`;

export const EmojiIcon = styled.span`
  flex: none;
  font-size: 16px;
`;

export const InfoCol = styled.div`
  flex: 1;
  min-width: 0;
`;

export const MedName = styled.div<{ $done?: boolean }>`
  font-size: 13px;
  font-weight: 700;
  color: ${props => props.theme.colors.fg};
  line-height: 1.4;

  ${props => props.$done && css`
    text-decoration: line-through;
    color: ${props => props.theme.colors.muted};
  `}
`;

export const MedDose = styled.div`
  font-size: 11.5px;
  color: #B91C1C;
  margin-top: 2px;
  font-weight: 500;
`;

export const CheckBox = styled.button<{ $done?: boolean }>`
  flex: none;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 1.5px solid #FCA5A5;
  background: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
  padding: 0;
  align-self: center;

  &:hover {
    border-color: #DC2626;
    transform: scale(1.05);
  }

  ${props => props.$done && css`
    background: #DC2626;
    border-color: #DC2626;
  `}
`;

export const CheckIcon = styled.span`
  color: #ffffff;
  font-size: 13px;
  line-height: 1;
  font-weight: bold;
`;
