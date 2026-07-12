import styled from 'styled-components';

export const OverviewContainer = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 16px;
`;

export const KPIGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

export const KPICard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border-left: 4px solid #16a34a;
`;

export const KPIValue = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
`;

export const KPILabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 4px;
`;

export const KPISubtext = styled.div`
  font-size: 0.75rem;
  color: #9ca3af;
  margin-top: 8px;
`;

export const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
`;

export const ChartCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ActionableGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const ActionCard = styled.div<{ $warning?: boolean }>`
  background: ${({ $warning }) => ($warning ? '#fef2f2' : 'white')};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border: ${({ $warning }) => ($warning ? '1px solid #fca5a5' : '1px solid #e5e7eb')};
`;

export const ActionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ActionItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #f9fafb;
  border-radius: 6px;
  border: 1px solid #f3f4f6;
`;

export const ActionTitle = styled.div`
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
`;

export const ActionSubtext = styled.div`
  font-size: 0.8rem;
  color: #6b7280;
  margin-top: 4px;
`;

export const ActionButton = styled.button<{ $danger?: boolean }>`
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  background-color: ${({ $danger }) => ($danger ? '#fee2e2' : '#dcfce7')};
  color: ${({ $danger }) => ($danger ? '#b91c1c' : '#166534')};

  &:hover {
    background-color: ${({ $danger }) => ($danger ? '#fecaca' : '#bbf7d0')};
  }
`;

export const BroadcastInput = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  resize: none;
  margin-bottom: 12px;
  font-family: inherit;
  font-size: 0.9rem;
`;
