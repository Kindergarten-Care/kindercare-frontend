import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => (theme.colors as any)?.text || '#111827'};
  margin-bottom: 24px;
`;

export const TreeContainer = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  border: 1px solid #f3f4f6;
`;

export const TreeList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const TreeItem = styled.li`
  margin: 12px 0;
`;

export const GradeNode = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  color: #0f172a;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
  }
`;

export const ChevronIcon = styled.span<{ $isExpanded: boolean }>`
  font-size: 0.8rem;
  color: #94a3b8;
  margin-right: -4px;
  width: 12px;
  display: inline-block;
  transition: transform 0.3s ease-in-out;
  transform: ${({ $isExpanded }) => ($isExpanded ? 'rotate(90deg)' : 'rotate(0deg)')};
`;

export const ClassListWrapper = styled.div<{ $isExpanded: boolean }>`
  display: grid;
  grid-template-rows: ${({ $isExpanded }) => ($isExpanded ? '1fr' : '0fr')};
  transition: grid-template-rows 0.3s ease-in-out;
`;

export const ClassListInner = styled.div`
  overflow: hidden;
`;

export const ClassList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 16px 24px;
  border-left: 2px dashed #cbd5e1;
`;

export const ClassNode = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px 10px 32px;
  color: #334155;
  font-size: 0.95rem;
  font-weight: 500;
  position: relative;
  transition: background 0.2s;
  border-radius: 0 8px 8px 0;
  
  &:hover {
    background: #f8fafc;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 24px;
    height: 0;
    border-bottom: 2px dashed #cbd5e1;
  }
`;

export const FolderIcon = styled.span`
  font-size: 1.25rem;
`;

export const FileIcon = styled.span`
  font-size: 1.1rem;
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

export const EmptyText = styled.div`
  font-size: 1rem;
  color: #6b7280;
  padding: 40px 0;
  text-align: center;
  font-style: italic;
`;
