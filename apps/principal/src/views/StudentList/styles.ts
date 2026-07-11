import styled from 'styled-components';

export const Container = styled.div`
  padding: 32px;
  width: 100%;
  box-sizing: border-box;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 28px;
  gap: 16px;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

export const StatBadge = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 400;
  margin-left: 8px;
`;

export const ActionGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: ${({ theme }) => theme.colors.primary || '#047857'};
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 1px 3px rgba(4, 120, 87, 0.3);

  &:hover { background: ${({ theme }) => theme.colors.primary ? '#1a5c2d' : '#065f46'}; }
  &:active { background: ${({ theme }) => theme.colors.primary || '#047857'}; transform: translateY(1px); }
`;

export const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: white;
  color: ${({ theme }) => theme.colors.textSecondary || '#374151'};
  border: 1.5px solid ${({ theme }) => theme.colors.border || '#e5e7eb'};
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.neutralLight || '#f9fafb'};
    border-color: ${({ theme }) => theme.colors.borderMuted || '#d1d5db'};
  }
  &:active { transform: translateY(1px); }
`;

export const FilterBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  align-items: center;
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
  color: ${({ theme }) => theme.colors.muted || '#9ca3af'};
  display: flex;
  pointer-events: none;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 12px 10px 40px;
  border: 1.5px solid ${({ theme }) => theme.colors.border || '#e5e7eb'};
  border-radius: 8px;
  font-size: 0.875rem;
  outline: none;
  transition: all 0.2s;
  background: white;
  color: ${({ theme }) => theme.colors.fg || '#111827'};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary || '#047857'};
    box-shadow: 0 0 0 3px rgba(35, 122, 60, 0.1);
  }

  &::placeholder { color: ${({ theme }) => theme.colors.muted || '#9ca3af'}; }
`;

export const Select = styled.select`
  padding: 10px 36px 10px 14px;
  border: 1.5px solid ${({ theme }) => theme.colors.border || '#e5e7eb'};
  border-radius: 8px;
  font-size: 0.875rem;
  outline: none;
  background: white url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 12px center;
  appearance: none;
  cursor: pointer;
  transition: border-color 0.2s;
  color: ${({ theme }) => theme.colors.fg || '#374151'};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary || '#047857'};
    box-shadow: 0 0 0 3px rgba(35, 122, 60, 0.1);
  }
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
  text-align: left;
  padding: 14px 16px;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.muted || '#6b7280'};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 2px solid #f3f4f6;
  background: #fafafa;
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
  color: ${({ theme }) => theme.colors.fg || '#374151'};
  vertical-align: middle;
`;

export const StudentNameCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const FullName = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text || '#111827'};
  font-size: 0.875rem;
`;

export const StudentId = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.muted || '#9ca3af'};
`;

export const IconBtn = styled.button`
  background: transparent;
  border: 1.5px solid ${({ theme }) => theme.colors.border || '#e5e7eb'};
  color: ${({ theme }) => theme.colors.muted || '#6b7280'};
  cursor: pointer;
  padding: 7px;
  border-radius: 7px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.greenXLight || '#f0fdf4'};
    border-color: ${({ theme }) => theme.colors.primary || '#047857'};
    color: ${({ theme }) => theme.colors.primary || '#047857'};
  }
`;

export const LoadingText = styled.div`
  text-align: center;
  padding: 60px;
  color: ${({ theme }) => theme.colors.muted || '#9ca3af'};
  font-size: 0.9rem;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 40px;
  color: ${({ theme }) => theme.colors.muted || '#9ca3af'};
`;

export const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 12px;
  opacity: 0.5;
`;

export const EmptyTitle = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.muted || '#6b7280'};
  margin-bottom: 4px;
`;

export const EmptySubtitle = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.muted || '#9ca3af'};
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
  color: ${({ theme }) => theme.colors.muted || '#6b7280'};
`;

export const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const PageBtn = styled.button<{ $active?: boolean; $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
  padding: 0 10px;
  border-radius: 7px;
  border: 1.5px solid ${({ $active, theme }) => ($active ? (theme.colors.primary || '#047857') : (theme.colors.border || '#e5e7eb'))};
  background: ${({ $active, theme }) => ($active ? (theme.colors.primary || '#047857') : 'white')};
  color: ${({ $active }) => ($active ? 'white' : '#374151')};
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.4 : 1)};
  transition: all 0.15s;

  &:hover:not(:disabled) {
    background: ${({ $active, theme }) => ($active ? '#1a5c2d' : '#f3f4f6')};
    border-color: ${({ $active, theme }) => ($active ? '#1a5c2d' : '#d1d5db')};
  }
`;

export const PageNavBtn = styled.button<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0 14px;
  height: 36px;
  border-radius: 7px;
  border: 1.5px solid ${({ theme }) => theme.colors.border || '#e5e7eb'};
  background: white;
  color: ${({ theme }) => theme.colors.fg || '#374151'};
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.4 : 1)};
  transition: all 0.15s;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.neutralLight || '#f3f4f6'};
    border-color: ${({ theme }) => theme.colors.borderMuted || '#d1d5db'};
  }
`;

export const StatusBadge = styled.span<{ $variant?: 'active' | 'muted' }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;

  ${({ $variant, theme }) =>
    $variant === 'active'
      ? `
    background: ${theme.colors.successLight || '#dcfce7'};
    color: ${theme.colors.success || '#15803d'};
  `
      : `
    background: ${theme.colors.neutralLight || '#f3f4f6'};
    color: ${theme.colors.muted || '#6b7280'};
  `}
`;

// ── Breadcrumb ────────────────────────────────────────────────
export const Breadcrumb = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted || '#6b7280'};
`;

export const BreadcrumbLink = styled.a`
  color: ${({ theme }) => theme.colors.muted || '#6b7280'};
  cursor: pointer;
  transition: color 0.15s;
  text-decoration: none;

  &:hover { color: ${({ theme }) => theme.colors.primary || '#047857'}; }
`;

export const BreadcrumbSep = styled.span`
  color: #d1d5db;
`;

export const BreadcrumbCurrent = styled.span`
  color: ${({ theme }) => theme.colors.fg || '#111827'};
  font-weight: 500;
`;

// ── KPI Stats ─────────────────────────────────────────────────
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div<{ $variant?: 'green' | 'blue' | 'amber' | 'default' }>`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border || '#e5e7eb'};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const StatIconWrap = styled.div<{ $variant?: 'green' | 'blue' | 'amber' | 'default' }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.375rem;
  flex-shrink: 0;

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'green':
        return `
          background: ${theme.colors.greenXLight || '#ecfdf5'};
          color: ${theme.colors.green || '#047857'};
        `;
      case 'blue':
        return `
          background: #eff6ff;
          color: #3b82f6;
        `;
      case 'amber':
        return `
          background: ${theme.colors.amberLight || '#fff0d8'};
          color: ${theme.colors.amber || '#d97706'};
        `;
      default:
        return `
          background: ${theme.colors.neutralLight || '#f3f4f6'};
          color: ${theme.colors.muted || '#6b7280'};
        `;
    }
  }}
`;

export const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

export const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text || '#111827'};
  line-height: 1.2;
`;

export const StatLabel = styled.div`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted || '#6b7280'};
`;

// ── Gender Badge ───────────────────────────────────────────────
export const GenderBadge = styled.span<{ $gender: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;

  ${({ $gender, theme }) =>
    $gender === 'Nam'
      ? `
    background: #dbeafe;
    color: #1d4ed8;
  `
      : `
    background: #fce7f3;
    color: #be185d;
  `}
`;

// ── Student avatar row in table ────────────────────────────────
export const StudentRowCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StudentNameGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

export const StudentName = styled.span`
  font-weight: 600;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text || '#111827'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StudentMeta = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.muted || '#6b7280'};
`;
