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
  gap: 16px;
  margin-bottom: 22px;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #1f2937;
  margin: 0 0 4px 0;
`;

export const PageSubtitle = styled.p`
  font-size: 13.5px;
  color: #6b7280;
  margin: 0;
`;

export const BtnImport = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #237a3c;
  color: #fff;
  border: none;
  padding: 11px 18px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s ease;
  box-shadow: 0 8px 18px -6px rgba(0, 90, 54, 0.45);
  white-space: nowrap;

  &:hover {
    background: #1a5c2d;
    transform: scale(1.02);
  }
`;

export const ErrorBanner = styled.div`
  background: #fee2e2;
  border: 1px solid #fca5a5;
  color: #991b1b;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 13.5px;
  margin-bottom: 16px;
`;

export const FilterBar = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

export const FGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FLabel = styled.label`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #9ca3af;
`;

export const SearchBox = styled.div`
  position: relative;
  min-width: 220px;
`;

export const SearchInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  font: inherit;
  font-size: 13.5px;
  padding: 10px 13px 10px 36px;
  border-radius: 11px;
  border: 1px solid #e6eee9;
  background: #fff;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:focus {
    border-color: #237a3c;
    box-shadow: 0 0 0 3px rgba(35, 122, 60, 0.12);
  }
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  display: flex;
`;

export const TableCard = styled.div`
  background: #ffffff;
  border: 1px solid #e6eee9;
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
  padding: 8px 8px 0;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th<{ $align?: 'left' | 'center' | 'right' }>`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #9ca3af;
  text-align: ${({ $align }) => $align || 'left'};
  padding: 0 14px 13px;
  border-bottom: 1px solid #eef4f0;
`;

export const Tr = styled.tr`
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #f7fbf8;
  }

  &:last-child td {
    border-bottom: none;
  }
`;

export const Td = styled.td<{ $align?: 'left' | 'center' | 'right' }>`
  padding: 15px 14px;
  border-bottom: 1px solid #eef4f0;
  font-size: 13.5px;
  vertical-align: middle;
  text-align: ${({ $align }) => $align || 'left'};
`;

export const ClsCell = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
`;

export const ClsAv = styled.span<{ $bg: string }>`
  width: 36px;
  height: 36px;
  border-radius: 11px;
  display: grid;
  place-items: center;
  color: #fff;
  flex-shrink: 0;
  background: ${({ $bg }) => $bg};
`;

export const ClsName = styled.span`
  font-weight: 600;
  color: #1f2937;
`;

export const WeekPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  font-weight: 600;
  color: #237a3c;
  background: #e8f5ed;
  padding: 4px 11px;
  border-radius: 20px;
  font-variant-numeric: tabular-nums;
`;

export const MenuName = styled.div`
  font-weight: 500;
  color: #1f2937;
  max-width: 340px;
`;

export const Updated = styled.span`
  color: #9ca3af;
  font-size: 12.5px;
  font-variant-numeric: tabular-nums;
`;

export const DelBtn = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 9px;
  border: 1px solid #e6eee9;
  background: #fff;
  color: #9ca3af;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #fee2e2;
    color: #dc2626;
    border-color: #fca5a5;
  }
`;

export const LoadingText = styled.div`
  text-align: center;
  padding: 40px;
  color: #6b7280;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 56px 20px;
  color: #9ca3af;
`;

export const EmptyIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: #f1f6f3;
  color: #9ca3af;
  display: grid;
  place-items: center;
  margin: 0 auto 14px;
`;

export const EmptyTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #6b7280;
  margin: 0 0 5px;
`;

export const EmptyDesc = styled.p`
  font-size: 13px;
  margin: 0;
`;
