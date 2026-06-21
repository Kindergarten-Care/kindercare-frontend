import styled from 'styled-components';

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
  margin-bottom: 6px;
`;

export const WidgetTitle = styled.span`
  font-family: ${props => props.theme.fonts.display};
  font-weight: 700;
  font-size: 16px;
  color: ${props => props.theme.colors.fg};
  letter-spacing: -0.01em;
`;

export const DetailLink = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  font-weight: 600;
  color: ${props => props.theme.colors.green};
  cursor: pointer;
  transition: color 0.15s;

  &:hover {
    color: ${props => props.theme.colors.greenDark};
  }
`;

export const LayoutGrid = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
  flex-wrap: wrap;
  margin-top: 8px;
`;

export const DonutOuter = styled.div<{ $donutGradient: string }>`
  position: relative;
  flex: none;
  width: 158px;
  height: 158px;
  border-radius: 50%;
  background: ${props => props.$donutGradient};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DonutInner = styled.div`
  width: 112px;
  height: 112px;
  border-radius: 50%;
  background: ${props => props.theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 2px 6px rgba(0, 90, 54, 0.05);
`;

export const DonutRate = styled.span`
  font-family: ${props => props.theme.fonts.display};
  font-size: 34px;
  font-weight: 800;
  color: ${props => props.theme.colors.green};
  letter-spacing: -0.02em;
  line-height: 1;
`;

export const DonutLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${props => props.theme.colors.muted};
  text-transform: uppercase;
  letter-spacing: 0.07em;
  margin-top: 3px;
`;

export const StatsBlock = styled.div`
  flex: 1;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ClassTotalRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid #EEF4F0;
`;

export const TotalLabel = styled.span`
  font-size: 13px;
  color: ${props => props.theme.colors.muted};
  font-weight: 500;
`;

export const TotalNumber = styled.span`
  font-family: ${props => props.theme.fonts.display};
  font-size: 26px;
  font-weight: 800;
  color: ${props => props.theme.colors.fg};
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
`;

export const StatRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ColorDot = styled.span<{ $color: string }>`
  width: 11px;
  height: 11px;
  border-radius: 3px;
  background: ${props => props.$color};
`;

export const StatName = styled.span`
  flex: 1;
  font-size: 13.5px;
  color: #374151;
  font-weight: 500;
`;

export const StatCount = styled.span<{ $color: string }>`
  font-family: ${props => props.theme.fonts.display};
  font-size: 18px;
  font-weight: 800;
  color: ${props => props.$color};
  font-variant-numeric: tabular-nums;
`;
