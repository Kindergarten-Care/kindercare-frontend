import styled, { css, keyframes } from 'styled-components';

export const fadeOut = keyframes`
  to {
    opacity: 0;
    transform: scale(0.92) translateX(16px);
    height: 0;
    margin: 0;
    padding: 0;
  }
`;

export const WidgetContainer = styled.section`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
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
  background: ${props => props.theme.colors.amberLight};
  color: ${props => props.theme.colors.amberMid};
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
  background: ${props => props.theme.colors.amberMid};
  color: ${props => props.theme.colors.white};
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RequestList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

export const RequestRow = styled.div<{ $removing?: boolean }>`
  padding: 13px;
  border-radius: 14px;
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  gap: 10px;

  ${props => props.$removing && css`
    animation: ${fadeOut} 0.3s forwards;
    pointer-events: none;
  `}
`;

export const StudentRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const AvatarCircle = styled.span<{ $background: string }>`
  flex: none;
  width: 36px;
  height: 36px;
  border-radius: ${props => props.theme.radius.pill};
  background: ${props => props.$background};
  color: ${props => props.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 13px;
  font-family: ${props => props.theme.fonts.display};
`;

export const InfoCol = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ChildName = styled.div`
  font-size: 13.5px;
  font-weight: 700;
  color: ${props => props.theme.colors.fg};
`;

export const RequestDetails = styled.div`
  font-size: 11.5px;
  color: #92400E;
  margin-top: 1px;
  font-weight: 500;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const ApproveButton = styled.button`
  flex: 1;
  height: 36px;
  border-radius: 10px;
  border: none;
  background: ${props => props.theme.colors.green};
  color: ${props => props.theme.colors.white};
  font-family: inherit;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: transform 0.15s, background 0.15s;

  &:hover {
    transform: scale(1.03);
    background: ${props => props.theme.colors.greenDark};
  }
`;

export const RejectButton = styled.button`
  flex: none;
  width: 42px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid #FCA5A5;
  background: ${props => props.theme.colors.white};
  color: #DC2626;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s, background 0.15s;

  &:hover {
    transform: scale(1.03);
    background: #FEE2E2;
  }
`;
