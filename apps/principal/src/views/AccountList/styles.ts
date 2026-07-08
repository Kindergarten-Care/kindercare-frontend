import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 24px;
`;

export const TableCard = styled.div`
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  padding: 24px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  padding: 16px 8px;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 700;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #F3F4F6;
`;

export const Td = styled.td`
  padding: 16px 8px;
  font-size: 0.875rem;
  color: #374151;
  border-bottom: 1px solid #F3F4F6;
  vertical-align: middle;
`;

export const Tr = styled.tr`
  &:last-child td {
    border-bottom: none;
  }
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
  background-color: #E0E7FF;
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
  color: #4F46E5;
  font-weight: 600;
  font-size: 0.875rem;
`;

export const ActionGroup = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

export const IconBtn = styled.button`
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6B7280;
  transition: all 0.2s;

  &:hover {
    border-color: #D1D5DB;
    color: #374151;
    background-color: #F9FAFB;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #F3F4F6;
`;

export const PaginationText = styled.span`
  font-size: 0.875rem;
  color: #6B7280;
`;

export const PaginationGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid ${({ $active }) => ($active ? '#047857' : '#E5E7EB')};
  background-color: ${({ $active }) => ($active ? '#047857' : 'white')};
  color: ${({ $active }) => ($active ? 'white' : '#374151')};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ $active }) => ($active ? '#065f46' : '#F9FAFB')};
  }
`;

export const LoadingText = styled.div`
  font-size: 1rem;
  color: #6b7280;
  padding: 40px 0;
  text-align: center;
`;

export const ErrorText = styled.div`
  font-size: 1rem;
  color: #ef4444;
  padding: 40px 0;
  text-align: center;
`;

export const SearchContainer = styled.div`
  display: flex;
  gap: 12px;
`;

export const SearchInput = styled.input`
  padding: 10px 16px;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  width: 320px;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #047857;
  }
  
  &::placeholder {
    color: #9CA3AF;
  }
`;

export const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #047857;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #065F46;
  }
`;

export const StatusBadge = styled.span<{ $status: 'active' | 'inactive' }>`
  padding: 4px 8px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${({ $status }) => ($status === 'active' ? '#DEF7EC' : '#FDE8E8')};
  color: ${({ $status }) => ($status === 'active' ? '#03543F' : '#9B1C1C')};
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

export const CreateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${({ theme }) => theme.colors?.primary || '#047857'};
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-left: auto;

  &:hover {
    background-color: #065F46;
  }
`;
