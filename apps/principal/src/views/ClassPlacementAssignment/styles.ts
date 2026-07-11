import styled from 'styled-components';

export const Container = styled.div`
  padding: 32px;
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
`;

export const PageHeader = styled.div`
  margin-bottom: 28px;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px 0;
`;

export const PageSubtitle = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
`;

export const SplitView = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0;
  flex: 1;
  align-items: stretch;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  border: 1px solid #f3f4f6;
  overflow: hidden;
`;

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 500px;
`;

export const PanelHeader = styled.div`
  padding: 18px 20px;
  border-bottom: 1px solid #f3f4f6;
  background: #fafafa;
`;

export const PanelLabel = styled.div<{ $muted?: boolean }>`
  font-size: 0.75rem;
  font-weight: ${({ $muted }) => ($muted ? 400 : 700)};
  color: ${({ $muted }) => ($muted ? '#6b7280' : '#111827')};
  margin-bottom: ${({ $muted }) => ($muted ? '2px' : '8px')};
  text-transform: ${({ $muted }) => ($muted ? 'uppercase' : 'none')};
  letter-spacing: ${({ $muted }) => ($muted ? '0.05em' : 'normal')};
`;

export const PanelSelect = styled.select`
  width: 100%;
  padding: 10px 36px 10px 14px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.875rem;
  outline: none;
  background: white url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 12px center;
  appearance: none;
  cursor: pointer;
  transition: border-color 0.2s;
  box-sizing: border-box;

  &:focus { border-color: #047857; }
`;

export const PanelMeta = styled.div`
  margin-top: 10px;
  font-size: 0.8125rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SelectionCount = styled.span<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${({ $active }) => ($active ? '#dcfce7' : '#f3f4f6')};
  color: ${({ $active }) => ($active ? '#15803d' : '#6b7280')};
`;

export const ListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
`;

export const StudentItem = styled.div<{ $selected?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: 1.5px solid ${({ $selected }) => ($selected ? '#047857' : '#f3f4f6')};
  background: ${({ $selected }) => ($selected ? '#f0fdf4' : 'white')};
  border-radius: 10px;
  margin-bottom: 8px;
  cursor: ${({ $selected }) => ($selected ? 'pointer' : 'pointer')};
  transition: all 0.15s;
  box-shadow: ${({ $selected }) => ($selected ? '0 0 0 2px rgba(4, 120, 87, 0.1)' : 'none')};

  &:hover {
    border-color: ${({ $selected }) => ($selected ? '#047857' : '#d1d5db')};
    background: ${({ $selected }) => ($selected ? '#f0fdf4' : '#fafafa')};
  }
`;

export const StudentInfo = styled.div``;

export const StudentName = styled.div`
  font-weight: 600;
  color: #111827;
  font-size: 0.875rem;
`;

export const StudentMeta = styled.div`
  font-size: 0.75rem;
  color: #9ca3af;
  margin-top: 2px;
`;

export const Checkbox = styled.div<{ $checked?: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 5px;
  border: 2px solid ${({ $checked }) => ($checked ? '#047857' : '#d1d5db')};
  background: ${({ $checked }) => ($checked ? '#047857' : 'white')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.15s;
`;

export const ActionCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
`;

export const MoveButton = styled.button`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: none;
  background: #047857;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(4, 120, 87, 0.4);
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #065f46;
    transform: scale(1.08);
    box-shadow: 0 6px 16px rgba(4, 120, 87, 0.5);
  }

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:disabled {
    background: #e5e7eb;
    color: #9ca3af;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 40px 20px;
  text-align: center;
`;

export const EmptyIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 10px;
  opacity: 0.5;
`;

export const EmptyText = styled.div`
  font-size: 0.875rem;
  color: #9ca3af;
  line-height: 1.5;
`;
