import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 24px;
`;

export const SplitView = styled.div`
  display: flex;
  gap: 24px;
  flex: 1;
  overflow: hidden;
`;

export const Panel = styled.div`
  flex: 1;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const PanelHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.95rem;
  outline: none;
  
  &:focus {
    border-color: #0284c7;
    box-shadow: 0 0 0 1px #0284c7;
  }
`;

export const ActionCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
`;

export const MoveButton = styled.button`
  background: #0ea5e9;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(14, 165, 233, 0.3);
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #0284c7;
    transform: scale(1.05);
  }
  
  &:disabled {
    background: #e5e7eb;
    color: #9ca3af;
    cursor: not-allowed;
    box-shadow: none;
  }
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
  padding: 12px;
  border: 1px solid ${props => props.$selected ? '#bae6fd' : '#f3f4f6'};
  background: ${props => props.$selected ? '#f0f9ff' : 'white'};
  border-radius: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${props => props.$selected ? '#bae6fd' : '#e5e7eb'};
    background: ${props => props.$selected ? '#f0f9ff' : '#f9fafb'};
  }
`;

export const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;

export const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #9ca3af;
  font-size: 0.95rem;
`;
