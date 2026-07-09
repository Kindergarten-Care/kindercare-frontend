import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 24px;
`;

export const Layout = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;
`;

export const LeftPanel = styled.div`
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  max-width: 300px;
`;

export const RightPanel = styled.div`
  flex: 3;
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

export const ClassItem = styled.div<{ $active?: boolean }>`
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  background: ${props => props.$active ? '#e0f2fe' : 'transparent'};
  color: ${props => props.$active ? '#0369a1' : '#374151'};
  font-weight: ${props => props.$active ? '600' : '400'};
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.$active ? '#e0f2fe' : '#f3f4f6'};
  }
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 12px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  text-align: left;
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
  color: #6b7280;
  font-weight: 500;
`;

export const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #f3f4f6;
  color: #1f2937;
`;

export const ActionButton = styled.button`
  background: #0284c7;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #0369a1;
  }
`;

export const TeacherRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;
