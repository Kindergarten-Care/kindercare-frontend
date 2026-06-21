import styled, { css } from 'styled-components';

export const WidgetContainer = styled.section`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radius.lg};
  box-shadow: ${props => props.theme.shadows.soft};
  padding: 22px;
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
  justify-content: space-between;
  margin-bottom: 18px;
`;

export const WidgetTitle = styled.span`
  font-family: ${props => props.theme.fonts.display};
  font-weight: 700;
  font-size: 16px;
  color: ${props => props.theme.colors.fg};
  letter-spacing: -0.01em;
`;

export const StatusPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.theme.colors.green};
  background: ${props => props.theme.colors.greenLight};
  padding: 5px 12px;
  border-radius: 8px;
`;

export const StatusDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${props => props.theme.colors.green};
`;

export const TimelineList = styled.div`
  position: relative;
  flex: 1;
`;

export const TimelineItem = styled.div`
  position: relative;
  display: flex;
  gap: 16px;
  padding-bottom: 18px;
`;

export const TimeLabel = styled.div<{ $isNext?: boolean }>`
  flex: none;
  width: 56px;
  text-align: right;
  font-size: 13px;
  font-weight: 700;
  color: ${props => props.$isNext ? props.theme.colors.muted : props.theme.colors.green};
  font-variant-numeric: tabular-nums;
  padding-top: 1px;
  font-family: ${props => props.theme.fonts.display};
`;

export const DotCol = styled.div`
  flex: none;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CircleDot = styled.span<{ $dotColor: string }>`
  position: relative;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${props => props.$dotColor};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

export const PulseCircle = styled.span`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: ${props => props.theme.colors.green};
  animation: pulseRing 1.8s ease-out infinite;

  @keyframes pulseRing {
    0% {
      transform: scale(0.8);
      opacity: 0.7;
    }
    100% {
      transform: scale(2.4);
      opacity: 0;
    }
  }
`;

export const VerticalLine = styled.span`
  position: absolute;
  top: 16px;
  bottom: -18px;
  width: 2px;
  background: #E6EEE9;
`;

export const ActivityContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding-bottom: 2px;
`;

export const InfoBlock = styled.div``;

export const ActivityTitle = styled.div<{ $isNext?: boolean }>`
  font-size: 14.5px;
  font-weight: 700;
  color: ${props => props.$isNext ? props.theme.colors.muted : props.theme.colors.fg};
`;

export const ActivitySub = styled.div`
  font-size: 12.5px;
  color: ${props => props.theme.colors.muted};
  margin-top: 1px;
`;

export const PillBadge = styled.span<{ $pillStyle: 'done' | 'current' | 'next' }>`
  flex: none;
  font-size: 11px;
  padding: 4px 11px;
  border-radius: 8px;

  ${props => props.$pillStyle === 'done' && css`
    font-weight: 600;
    color: ${props => props.theme.colors.muted};
    background: #F1F4F1;
  `}

  ${props => props.$pillStyle === 'current' && css`
    font-weight: 700;
    color: ${props => props.theme.colors.white};
    background: ${props => props.theme.colors.green};
  `}

  ${props => props.$pillStyle === 'next' && css`
    font-weight: 600;
    color: #92400E;
    background: #FEF3C7;
  `}
`;
