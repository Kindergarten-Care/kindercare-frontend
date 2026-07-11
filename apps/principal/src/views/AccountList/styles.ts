import styled from 'styled-components';

export const Container = styled.div`
  padding: 32px 100px;
  box-sizing: border-box;
  width: 100%;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 28px;
  gap: 16px;
`;

export const TitleBlock = styled.div``;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px 0;
`;

export const StatBadge = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 400;
  margin-left: 8px;
`;

export const PageSubtitle = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
`;

export const ActionGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #047857;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 1px 3px rgba(4, 120, 87, 0.3);

  &:hover { background: #065f46; }
  &:active { transform: translateY(1px); }
`;

export const FilterBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  align-items: center;
  flex-wrap: wrap;
`;

export const SearchWrapper = styled.div`
  position: relative;
  flex: 1;
  min-width: 240px;
  max-width: 400px;
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  display: flex;
  pointer-events: none;
`;

export const SearchInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px 10px 40px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.875rem;
  outline: none;
  transition: all 0.2s;
  background: white;

  &:focus {
    border-color: #047857;
    box-shadow: 0 0 0 3px rgba(4, 120, 87, 0.1);
  }

  &::placeholder { color: #9ca3af; }
`;

export const FilterSelect = styled.select`
  padding: 10px 36px 10px 14px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.875rem;
  outline: none;
  background: white url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 12px center;
  appearance: none;
  cursor: pointer;
  transition: border-color 0.2s;

  &:focus { border-color: #047857; }
`;

export const TableCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  border: 1px solid #f3f4f6;
  overflow: hidden;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  background: #fafafa;
  padding: 14px 16px;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 2px solid #f3f4f6;
  white-space: nowrap;
`;

export const Tr = styled.tr`
  border-bottom: 1px solid #f9fafb;
  transition: background 0.15s;

  &:hover { background: #fafbfb; }
  &:last-child { border-bottom: none; }
`;

export const Td = styled.td`
  padding: 14px 16px;
  font-size: 0.875rem;
  color: #374151;
  vertical-align: middle;
`;

export const UserInfoCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const AvatarWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, #e8f5ed 0%, #dcfce7 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const AvatarText = styled.span`
  color: #047857;
  font-weight: 700;
  font-size: 0.8125rem;
`;

export const FullName = styled.div`
  font-weight: 600;
  color: #111827;
  font-size: 0.875rem;
`;

export const StatusBadge = styled.span<{ $status?: 'active' | 'inactive' }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;

  ${({ $status }) =>
    $status === 'active'
      ? `
        background: #dcfce7;
        color: #15803d;
      `
      : `
        background: #fee2e2;
        color: #b91c1c;
      `}
`;

export const ActionGroupBtns = styled.div`
  display: flex;
  gap: 6px;
`;

export const IconBtn = styled.button`
  background: transparent;
  border: 1.5px solid #e5e7eb;
  color: #6b7280;
  cursor: pointer;
  padding: 7px;
  border-radius: 7px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: #f0fdf4;
    border-color: #047857;
    color: #047857;
  }
`;

export const LoadingText = styled.div`
  text-align: center;
  padding: 60px;
  color: #9ca3af;
  font-size: 0.9rem;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 40px;
  color: #9ca3af;
`;

export const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 12px;
  opacity: 0.5;
`;

export const EmptyTitle = styled.div`
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 4px;
`;

export const EmptySubtitle = styled.div`
  font-size: 0.875rem;
  color: #9ca3af;
`;

export const PaginationBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-top: 1px solid #f3f4f6;
  background: #fafafa;
`;

export const PaginationInfo = styled.span`
  font-size: 0.8125rem;
  color: #6b7280;
`;

export const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const PageBtn = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
  padding: 0 10px;
  border-radius: 7px;
  border: 1.5px solid ${({ $active }) => ($active ? '#047857' : '#e5e7eb')};
  background: ${({ $active }) => ($active ? '#047857' : 'white')};
  color: ${({ $active }) => ($active ? 'white' : '#374151')};
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: ${({ $active }) => ($active ? '#065f46' : '#f3f4f6')};
    border-color: ${({ $active }) => ($active ? '#065f46' : '#d1d5db')};
  }
`;
