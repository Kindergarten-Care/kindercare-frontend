import styled from 'styled-components';

export const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

export const StatusTabs = styled.div`
  display: flex;
  gap: 4px;
  background: #f3f4f6;
  border-radius: 10px;
  padding: 4px;
`;

export const StatusTabButton = styled.button<{ $active?: boolean }>`
  padding: 8px 14px;
  border: none;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  background: ${({ $active }) => ($active ? '#ffffff' : 'transparent')};
  color: ${({ $active }) => ($active ? '#047857' : '#6b7280')};
  box-shadow: ${({ $active }) => ($active ? '0 1px 2px rgba(0,0,0,0.08)' : 'none')};
`;

export const BulkActionBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-bottom: 16px;
`;

export const BulkPublishButton = styled.button`
  padding: 10px 18px;
  background-color: #047857;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background-color: #065f46;
  }

  &:disabled {
    background-color: #d1d5db;
    cursor: not-allowed;
  }
`;

export const RowActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const PublishRowButton = styled.button`
  padding: 6px 12px;
  background: none;
  border: 1px solid #047857;
  color: #047857;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: #047857;
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ExpandButton = styled.button`
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

export const EmptyState = styled.div`
  text-align: center;
  padding: 48px 20px;
  color: #6b7280;
`;

export const EmptyIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 8px;
`;

export const BulkSelectToggle = styled.button<{ $active?: boolean }>`
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
  border: 1px solid ${({ $active }) => ($active ? '#047857' : '#d1d5db')};
  background: ${({ $active }) => ($active ? '#047857' : 'white')};
  color: ${({ $active }) => ($active ? 'white' : '#374151')};

  &:hover {
    border-color: #047857;
    ${({ $active }) => !$active && 'color: #047857;'}
  }
`;

export const CheckboxCell = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #047857;
`;

export const RunManualButton = styled.button`
  margin-left: auto;
  padding: 8px 14px;
  background: none;
  border: 1px dashed #9ca3af;
  color: #6b7280;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;

  &:hover {
    border-color: #047857;
    color: #047857;
  }
`;

export const EmptyHint = styled.button`
  margin-top: 16px;
  padding: 10px 18px;
  background-color: #047857;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.85rem;
  cursor: pointer;

  &:hover {
    background-color: #065f46;
  }
`;
