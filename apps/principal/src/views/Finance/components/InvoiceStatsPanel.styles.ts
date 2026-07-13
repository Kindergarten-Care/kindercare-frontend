import styled from 'styled-components';

export const StatsLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(260px, 340px) 1fr;
  gap: 20px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const SideColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
`;

export const MainColumn = styled.div`
  min-width: 0;
`;

export const KPIGrid2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  min-width: 0;
`;

export const KPICardSm = styled.div<{ $accent: string }>`
  position: relative;
  background: white;
  border-radius: 12px;
  padding: 14px 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border-left: 4px solid ${({ $accent }) => $accent};
  box-sizing: border-box;
  min-width: 0;
  overflow: hidden;
`;

export const KPIIconBadge = styled.div<{ $bg: string; $color: string }>`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};

  svg {
    width: 13px;
    height: 13px;
  }
`;

export const KPIValueSm = styled.div`
  font-size: 1.05rem;
  font-weight: 700;
  color: #111827;
  padding-right: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const KPILabelSm = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 4px;
`;

export const ListCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  box-sizing: border-box;
  min-width: 0;
`;

export const ListHeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

export const ListTitleIcon = styled.span`
  display: inline-flex;
  color: #374151;

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const ListTitle = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
`;

export const DetailButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  font-size: 0.78rem;
  font-weight: 500;
  padding: 4px 8px;

  &:hover {
    color: #047857;
  }
`;
