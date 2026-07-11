import styled from 'styled-components';

export const Container = styled.div`
  padding: 32px;
  width: 100%;
  box-sizing: border-box;
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

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 20px;
  align-items: start;
`;

export const Sidebar = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  border: 1px solid #f3f4f6;
  overflow: hidden;
  position: sticky;
  top: 24px;
`;

export const SidebarHeader = styled.div`
  padding: 16px 18px;
  border-bottom: 1px solid #f3f4f6;
  background: #fafafa;
`;

export const SidebarTitle = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const SidebarBody = styled.div`
  padding: 12px;
`;

export const GradeSection = styled.div`
  margin-bottom: 12px;

  &:last-child { margin-bottom: 0; }
`;

export const GradeLabel = styled.div<{ $muted?: boolean }>`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ $muted }) => ($muted ? '#9ca3af' : '#6b7280')};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
  padding: 0 8px;
`;

export const ClassItem = styled.button<{ $active?: boolean }>`
  width: 100%;
  text-align: left;
  padding: 10px 12px;
  border-radius: 8px;
  border: none;
  font-size: 0.875rem;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  cursor: pointer;
  transition: all 0.15s;
  background: ${({ $active }) => ($active ? '#f0fdf4' : 'transparent')};
  color: ${({ $active }) => ($active ? '#047857' : '#374151')};
  margin-bottom: 2px;

  &:hover {
    background: ${({ $active }) => ($active ? '#f0fdf4' : '#f3f4f6')};
  }
`;

export const MainPanel = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  border: 1px solid #f3f4f6;
  overflow: hidden;
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #f3f4f6;
  gap: 16px;
`;

export const ClassInfo = styled.div``;

export const ClassName = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const YearBadge = styled.span`
  font-size: 0.8125rem;
  font-weight: 500;
  color: #6b7280;
  background: #f3f4f6;
  padding: 2px 10px;
  border-radius: 20px;
`;

export const ClassMeta = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
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
  white-space: nowrap;

  &:hover { background: #065f46; }
  &:active { transform: translateY(1px); }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  background: #fafafa;
  padding: 12px 20px;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 2px solid #f3f4f6;
`;

export const Td = styled.td`
  padding: 16px 20px;
  font-size: 0.875rem;
  color: #374151;
  border-bottom: 1px solid #f9fafb;
  vertical-align: middle;
`;

export const Tr = styled.tr`
  &:last-child td { border-bottom: none; }
  &:hover td { background: #fafbfb; }
`;

export const TeacherRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const TeacherName = styled.div`
  font-weight: 600;
  color: #111827;
  font-size: 0.875rem;
`;

export const RoleBadge = styled.span<{ $isMain?: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;

  ${({ $isMain }) =>
    $isMain
      ? `
        background: #dbeafe;
        color: #1d4ed8;
      `
      : `
        background: #f3f4f6;
        color: #6b7280;
      `}
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
  text-align: center;
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

export const TeacherCount = styled.span`
  font-size: 0.8125rem;
  color: #6b7280;
  font-weight: 400;
  margin-left: 6px;
`;
