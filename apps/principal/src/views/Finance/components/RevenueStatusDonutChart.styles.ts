import styled from 'styled-components';

export const DonutCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  box-sizing: border-box;
  min-width: 0;
  width: 100%;
  overflow: hidden;
`;

export const DonutSubtitle = styled.div`
  font-size: 0.78rem;
  color: #9ca3af;
  margin-bottom: 12px;
`;

export const DonutWrap = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  box-sizing: border-box;
`;

export const DonutCenter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
`;

export const DonutCenterValue = styled.div`
  font-size: 1.6rem;
  font-weight: 800;
  color: #111827;
  line-height: 1.1;
`;

export const DonutCenterLabel = styled.div`
  font-size: 0.72rem;
  color: #9ca3af;
  margin-top: 2px;
`;

export const DonutLegend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
`;

export const DonutLegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DonutLegendDot = styled.span<{ $color: string }>`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  flex-shrink: 0;
`;

export const DonutLegendText = styled.span`
  font-size: 0.82rem;
  color: #6b7280;
  flex: 1;
`;

export const DonutLegendAmount = styled.span`
  font-size: 0.85rem;
  font-weight: 700;
  color: #111827;
`;
