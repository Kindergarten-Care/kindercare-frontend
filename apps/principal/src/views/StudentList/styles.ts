import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px;
  width: 100%;
  box-sizing: border-box;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 22px;
  gap: 16px;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #1f2937;
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
  gap: 8px;
  background: #237a3c;
  color: white;
  border: none;
  padding: 11px 18px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 13.5px;
  cursor: pointer;
  transition: all 0.15s ease;
  box-shadow: 0 8px 18px -8px rgba(35, 122, 60, 0.45);

  &:hover {
    background: #1a5c2d;
    transform: scale(1.02);
  }
`;

export const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #f4f8f5;
  color: #1f2937;
  border: 1px solid #e6eee9;
  padding: 11px 18px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 13.5px;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #fff;
    border-color: #cfe0d5;
    transform: scale(1.02);
  }
`;

// ── KPI strip ────────────────────────────────────────────────
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 24px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const StatCard = styled.div`
  background: white;
  border: 1px solid #e6eee9;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const StatIconWrap = styled.div<{ $variant?: 'green' | 'blue' | 'amber' | 'default' }>`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  ${({ $variant }) => {
    switch ($variant) {
      case 'green':
        return `background: #e8f5ed; color: #237a3c;`;
      case 'blue':
        return `background: #e3edfd; color: #2563eb;`;
      case 'amber':
        return `background: #fff0d8; color: #92400e;`;
      default:
        return `background: #f1ecfe; color: #8b5cf6;`;
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
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
  font-size: 1.625rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #1f2937;
  line-height: 1;
`;

export const StatLabel = styled.div`
  font-size: 12.5px;
  color: #6b7280;
  font-weight: 500;
  margin-top: 5px;
`;

// ── Toolbar ──────────────────────────────────────────────────
export const FilterBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 18px;
  flex-wrap: wrap;
  align-items: center;
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  background: white;
  border: 1px solid #e6eee9;
  border-radius: 12px;
  padding: 0 13px;
  height: 42px;
  flex: 1;
  min-width: 220px;
  color: #9ca3af;
`;

export const SearchIcon = styled.div`
  display: flex;
  flex-shrink: 0;
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  font: inherit;
  font-size: 13.5px;
  color: #1f2937;
  width: 100%;
  background: none;

  &::placeholder { color: #9ca3af; }
`;

// ── Table ────────────────────────────────────────────────────
export const TableCard = styled.div`
  background: white;
  border: 1px solid #e6eee9;
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
  padding: 22px 22px 6px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #9ca3af;
  text-align: left;
  padding: 0 14px 13px;
  border-bottom: 1px solid #eef4f0;
  white-space: nowrap;
`;

export const Tr = styled.tr`
  transition: background 0.15s;

  &:hover { background: #f7fbf8; }
  &:last-child td { border-bottom: none; }
`;

export const Td = styled.td`
  padding: 13px 14px;
  border-bottom: 1px solid #eef4f0;
  font-size: 13.5px;
  vertical-align: middle;
  color: #1f2937;
`;

export const RowNum = styled.span`
  color: #9ca3af;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
`;

export const IconBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 9px;
  border: 1px solid #e6eee9;
  background: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;
  color: #6b7280;

  &:hover {
    border-color: #cfe0d5;
    color: #237a3c;
    background: #f7fbf8;
  }
`;

export const LoadingText = styled.div`
  text-align: center;
  padding: 60px;
  color: #9ca3af;
  font-size: 0.9rem;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 40px;
  color: #9ca3af;
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

// ── Pagination ───────────────────────────────────────────────
export const PaginationBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 14px 18px;
  font-size: 13px;
  color: #6b7280;
`;

export const PaginationInfo = styled.span`
  font-size: 13px;
  color: #6b7280;

  strong { color: #1f2937; }
`;

export const PaginationControls = styled.div`
  display: flex;
  gap: 6px;
`;

export const PageBtn = styled.button<{ $active?: boolean; $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border-radius: 9px;
  border: 1px solid ${({ $active }) => ($active ? '#237a3c' : '#e6eee9')};
  background: ${({ $active }) => ($active ? '#237a3c' : 'white')};
  color: ${({ $active }) => ($active ? 'white' : '#6b7280')};
  font-size: 13px;
  font-weight: 600;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.4 : 1)};
  transition: all 0.15s;

  &:hover:not(:disabled) {
    background: ${({ $active }) => ($active ? '#1a5c2d' : '#f7fbf8')};
    border-color: ${({ $active }) => ($active ? '#1a5c2d' : '#cfe0d5')};
  }
`;

export const PageNavBtn = styled.button<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0 14px;
  height: 32px;
  border-radius: 9px;
  border: 1px solid #e6eee9;
  background: white;
  color: #1f2937;
  font-size: 13px;
  font-weight: 600;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.4 : 1)};
  transition: all 0.15s;

  &:hover:not(:disabled) {
    background: #f7fbf8;
    border-color: #cfe0d5;
  }
`;

// ── Class status chip ───────────────────────────────────────
export const StatusBadge = styled.span<{ $variant?: 'active' | 'muted' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 11px;
  border-radius: 20px;
  font-size: 12.5px;
  font-weight: 600;

  ${({ $variant }) =>
    $variant === 'active'
      ? `background: #e8f5ed; color: #237a3c;`
      : `background: #fff0d8; color: #92400e;`}
`;

export const Cdot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
  display: inline-block;
`;

// ── Gender chip ──────────────────────────────────────────────
export const GenderBadge = styled.span<{ $gender: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 12.5px;
  font-weight: 600;

  ${({ $gender }) =>
    $gender === 'Nam'
      ? `background: #e3edfd; color: #2563eb;`
      : `background: #fce7f3; color: #db2777;`}
`;

// ── Student avatar row in table ─────────────────────────────
export const StudentRowCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StudentAvatar = styled.span<{ $bg: string }>`
  width: 38px;
  height: 38px;
  font-size: 13px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #fff;
  font-weight: 700;
  flex-shrink: 0;
  overflow: hidden;
  background: ${({ $bg }) => $bg};
`;

export const StudentAvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const StudentNameGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

export const StudentName = styled.span`
  font-weight: 600;
  font-size: 13.5px;
  color: #1f2937;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StudentMeta = styled.span`
  font-size: 12px;
  color: #6b7280;
`;
