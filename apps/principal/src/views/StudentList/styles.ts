import styled from 'styled-components';

export const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 24px;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 24px;
`;

export const HeaderActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;
  flex-wrap: wrap;
`;

export const SearchContainer = styled.div`
  display: flex;
  gap: 12px;
  flex: 1;
  max-width: 600px;
`;

export const SearchInput = styled.input`
  flex: 1;
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

export const Select = styled.select`
  padding: 10px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  outline: none;
  background-color: white;
  min-width: 180px;

  &:focus {
    border-color: #047857;
  }
`;

export const TableCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  overflow: hidden;
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
  background-color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const AvatarText = styled.span`
  font-weight: 600;
  color: #4b5563;
  font-size: 1rem;
`;

export const IconBtn = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: #f3f4f6;
    color: #111827;
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
