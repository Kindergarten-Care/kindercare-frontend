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

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border-radius: 8px;
  /* Remove overflow: hidden so dropdowns can overflow the table */
  overflow: visible;
`;

export const Th = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 600;
  color: #4b5563;
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
`;

export const Td = styled.td`
  padding: 12px 16px;
  font-size: 0.875rem;
  color: #1f2937;
  border-bottom: 1px solid #e5e7eb;
`;

export const Tr = styled.tr`
  &:hover {
    background-color: #f3f4f6;
  }
`;

export const LoadingText = styled.div`
  font-size: 1rem;
  color: #6b7280;
  padding: 20px 0;
`;

export const ErrorText = styled.div`
  font-size: 1rem;
  color: #ef4444;
  padding: 20px 0;
`;

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  color: #4b5563;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #e5e7eb;
    color: #111827;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 4px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  min-width: 150px;
  z-index: 50;
  overflow: hidden;
`;

export const DropdownItem = styled.button<{ $danger?: boolean }>`
  display: block;
  width: 100%;
  text-align: left;
  padding: 10px 16px;
  background: none;
  border: none;
  font-size: 0.875rem;
  cursor: pointer;
  color: ${({ $danger }) => ($danger ? '#dc2626' : '#374151')};

  &:hover {
    background-color: ${({ $danger }) => ($danger ? '#fef2f2' : '#f3f4f6')};
  }
`;
