import styled, { css } from 'styled-components';

export const WidgetContainer = styled.section`
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 4px 20px rgba(16, 24, 40, 0.04);
  border-top: 4px solid #F59E0B;
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
  font-family: 'Montserrat', sans-serif;
`;

export const CounterBadge = styled.span`
  font-size: 11px;
  font-weight: 800;
  color: #B45309;
  background: #FFFBEB;
  padding: 4px 10px;
  border-radius: 999px;
  font-family: 'Montserrat', sans-serif;
`;

export const RequestList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const RequestRow = styled.div<{ $removing?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 16px;
  background: #FDFDFD;
  border: 1px solid rgba(16, 24, 40, 0.03);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  ${props => props.$removing && css`
    opacity: 0;
    transform: scale(0.9) translateX(20px);
    pointer-events: none;
    height: 0;
    padding-top: 0;
    padding-bottom: 0;
    margin-top: -12px;
    overflow: hidden;
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
  font-family: 'Montserrat', sans-serif;
`;

export const InfoCol = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ChildName = styled.div`
  font-weight: 700;
  font-size: 13.5px;
  color: #1F2937;
  font-family: 'Montserrat', sans-serif;
`;

export const RequestDetails = styled.div`
  font-size: 11.5px;
  color: #92400E;
  font-weight: 500;
  margin-top: 2px;
  font-family: 'Montserrat', sans-serif;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 7px;
  flex-shrink: 0;
`;

export const ApproveButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 11px;
  border: none;
  background: #10B981;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s;

  &:hover {
    transform: scale(1.08);
  }
`;

export const RejectButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 11px;
  border: 1px solid #FECDD3;
  background: #fff;
  color: #F43F5E;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s, background 0.15s;

  &:hover {
    transform: scale(1.08);
    background: #FFF1F2;
  }
`;
