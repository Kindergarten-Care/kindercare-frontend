import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
`;

export const Tabs = styled.div`
  display: flex;
  gap: 8px;
  border-bottom: 1px solid #e5e7eb;
`;

export const TabButton = styled.button<{ $active?: boolean }>`
  padding: 10px 16px;
  background: none;
  border: none;
  border-bottom: 2px solid ${({ $active }) => ($active ? '#047857' : 'transparent')};
  color: ${({ $active }) => ($active ? '#047857' : '#6b7280')};
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #047857;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.1rem;
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
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
`;

export const KPILabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 4px;
`;

export const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
`;

export const ChartCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-width: 0;
  width: 100%;
  overflow: hidden;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
`;

export const PackageCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border-top: 4px solid #047857;
`;

export const PackageName = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;

  &:hover {
    background-color: #f3f4f6;
    color: #047857;
  }
`;

export const PackageMeta = styled.div`
  font-size: 0.85rem;
  color: #6b7280;
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
`;

export const DiscountBadge = styled.span`
  display: inline-block;
  margin-top: 12px;
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: #fff0d8;
  color: #d97706;
`;

export const TableCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  overflow: hidden;
`;

export const TableScroll = styled.div`
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  text-align: left;
  padding: 16px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f9fafb;
  white-space: nowrap;
`;

export const Tr = styled.tr`
  border-bottom: 1px solid #e5e7eb;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f9fafb;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const Td = styled.td`
  padding: 16px;
  font-size: 0.875rem;
  color: #111827;
  vertical-align: middle;
  white-space: nowrap;
`;

export const StatusBadge = styled.span<{ $status: 'paid' | 'unpaid' | 'overdue' | 'other' }>`
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${({ $status }) =>
    $status === 'paid' ? '#DEF7EC' : $status === 'overdue' ? '#FEE2E2' : $status === 'unpaid' ? '#FDE8E8' : '#f3f4f6'};
  color: ${({ $status }) =>
    $status === 'paid' ? '#03543F' : $status === 'overdue' ? '#B91C1C' : $status === 'unpaid' ? '#9B1C1C' : '#374151'};
`;

export const TypeBadge = styled.span<{ $type: 'monthly' | 'extracurricular' | 'other' }>`
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${({ $type }) => ($type === 'monthly' ? '#e8f5ed' : $type === 'extracurricular' ? '#fff0d8' : '#f3f4f6')};
  color: ${({ $type }) => ($type === 'monthly' ? '#237A3C' : $type === 'extracurricular' ? '#d97706' : '#374151')};
`;

export const HeaderActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

export const FilterBar = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const SearchInput = styled.input`
  flex: 1;
  min-width: 220px;
  padding: 10px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: #047857;
    box-shadow: 0 0 0 2px rgba(4, 120, 87, 0.1);
  }
`;

export const LoadingText = styled.div`
  text-align: center;
  padding: 40px;
  color: #6b7280;
`;

export const ErrorText = styled.div`
  text-align: center;
  padding: 40px;
  color: #ef4444;
`;

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-top: 1px solid #e5e7eb;
`;

export const PaginationText = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

export const PaginationGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const PageButton = styled.button`
  padding: 6px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  color: #374151;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #f3f4f6;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const InactiveTag = styled.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 500;
  background-color: #f3f4f6;
  color: #9ca3af;
`;

export const ActiveTag = styled.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 500;
  background-color: #DEF7EC;
  color: #03543F;
`;
