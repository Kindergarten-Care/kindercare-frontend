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

export const HeaderText = styled.div``;

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

export const HeaderActions = styled.div`
  display: flex;
  gap: 10px;
  flex-shrink: 0;
`;

export const BtnGhost = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #fff0d8;
  color: #92400e;
  border: 1px solid #f6e2a8;
  padding: 11px 16px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 13.5px;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;

  &:hover {
    background: #fdebb4;
  }
`;

export const BtnBrand = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #237a3c;
  color: #fff;
  border: none;
  padding: 11px 16px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 13.5px;
  cursor: pointer;
  transition: all 0.15s ease;
  box-shadow: 0 8px 18px -8px rgba(35, 122, 60, 0.45);
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

// ── Action bar ───────────────────────────────────────────────
export const ActionBar = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 22px;
  flex-wrap: wrap;
`;

export const MonthPicker = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  border: 1px solid #e6eee9;
  border-radius: 12px;
  padding: 6px 8px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
`;

export const NavBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 9px;
  border: none;
  background: #f4f8f5;
  color: #6b7280;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #e8f5ed;
    color: #237a3c;
  }
`;

export const MonthLabel = styled.span`
  font-weight: 700;
  font-size: 14px;
  font-variant-numeric: tabular-nums;
  min-width: 130px;
  text-align: center;
  color: #1f2937;
`;

export const LegendGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

export const FilterGroup = styled.div`
  margin-left: auto;
  display: flex;
  gap: 10px;
`;

// ── Type / status chips ──────────────────────────────────────
export const TypeChip = styled.button<{ $type: 'Class' | 'School' | 'Student' | 'Holiday'; $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  opacity: ${({ $active }) => ($active === false ? 0.4 : 1)};
  transition: opacity 0.15s;

  ${({ $type }) => {
    switch ($type) {
      case 'Class':
        return 'color: #2563eb; background: #e3edfd;';
      case 'School':
        return 'color: #8b5cf6; background: #f1ecfe;';
      case 'Student':
        return 'color: #f97316; background: #ffeedf;';
      case 'Holiday':
        return 'color: #92400e; background: #fff0d8;';
    }
  }}
`;

export const StatusChip = styled.span<{ $status: 'upcoming' | 'ongoing' | 'done' }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;

  ${({ $status }) => {
    switch ($status) {
      case 'ongoing':
        return 'color: #2563eb; background: #e3edfd;';
      case 'done':
        return 'color: #9ca3af; background: #f1f3f5;';
      default:
        return 'color: #237a3c; background: #e8f5ed;';
    }
  }}
`;

export const ChipDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
`;

// ── Two-column lists ─────────────────────────────────────────
export const Lists = styled.div`
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 20px;
  align-items: start;

  @media (max-width: 1050px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e6eee9;
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
  padding: 22px;
`;

export const CardHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  gap: 12px;
`;

export const CardTitle = styled.span`
  font-weight: 700;
  font-size: 16px;
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #1f2937;
`;

export const TitleIcon = styled.span<{ $variant?: 'brand' | 'amber' }>`
  width: 30px;
  height: 30px;
  border-radius: 9px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  background: ${({ $variant }) => ($variant === 'amber' ? '#fff0d8' : '#e8f5ed')};
  color: ${({ $variant }) => ($variant === 'amber' ? '#92400e' : '#237a3c')};
`;

export const CountChip = styled.span<{ $variant?: 'brand' | 'amber' }>`
  font-size: 12px;
  font-weight: 700;
  padding: 2px 10px;
  border-radius: 20px;
  margin-left: 2px;
  background: ${({ $variant }) => ($variant === 'amber' ? '#fff0d8' : '#e8f5ed')};
  color: ${({ $variant }) => ($variant === 'amber' ? '#92400e' : '#237a3c')};
`;

// ── Event row ────────────────────────────────────────────────
export const EvList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Ev = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px 4px;
  border-bottom: 1px solid #eef4f0;

  &:last-child {
    border-bottom: none;
  }
`;

export const EvDate = styled.div<{ $done?: boolean }>`
  width: 58px;
  flex-shrink: 0;
  text-align: center;
  border-radius: 13px;
  padding: 9px 0;
  background: ${({ $done }) => ($done ? '#f1f3f5' : '#f7fbf9')};
  border: 1px solid #eef4f0;
`;

export const EvDateDay = styled.div<{ $done?: boolean }>`
  font-weight: 800;
  font-size: 22px;
  line-height: 1;
  color: ${({ $done }) => ($done ? '#9ca3af' : '#1f2937')};
`;

export const EvDateMonth = styled.div`
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #9ca3af;
  margin-top: 3px;
`;

export const EvMain = styled.div`
  flex: 1;
  min-width: 0;
`;

export const EvTopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  flex-wrap: wrap;
`;

export const EvTitle = styled.span`
  font-weight: 700;
  font-size: 14.5px;
  color: #1f2937;
`;

export const EvDesc = styled.div`
  font-size: 12.5px;
  color: #6b7280;
  margin-top: 5px;
  line-height: 1.5;
`;

export const EvMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 9px;
  flex-wrap: wrap;
`;

export const EvMetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #9ca3af;
  font-weight: 500;

  svg { color: #9ca3af; flex-shrink: 0; }
`;

export const EvActions = styled.div`
  display: flex;
  gap: 6px;
  align-items: flex-start;
`;

export const MiniBtn = styled.button<{ $danger?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 9px;
  border: 1px solid #e6eee9;
  background: #fff;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all 0.15s;
  color: #6b7280;

  &:hover {
    ${({ $danger }) =>
      $danger
        ? 'color: #dc2626; border-color: #fca5a5; background: #fee2e2;'
        : 'color: #237a3c; border-color: #cfe0d5; background: #f7fbf8;'}
  }
`;

// ── Holiday item ─────────────────────────────────────────────
export const Hol = styled.div`
  display: flex;
  gap: 14px;
  padding: 15px 4px;
  border-bottom: 1px solid #eef4f0;
  align-items: flex-start;

  &:last-child {
    border-bottom: none;
  }
`;

export const HolIco = styled.span`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  background: #fff0d8;
  color: #92400e;
`;

export const HolMain = styled.div`
  flex: 1;
  min-width: 0;
`;

export const HolTitle = styled.div`
  font-weight: 700;
  font-size: 14px;
  color: #1f2937;
`;

export const HolRange = styled.div`
  font-size: 12.5px;
  color: #6b7280;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-variant-numeric: tabular-nums;

  svg { color: #9ca3af; flex-shrink: 0; }
`;

export const HolDays = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: #92400e;
  background: #fff0d8;
  padding: 2px 9px;
  border-radius: 20px;
  margin-top: 8px;
  display: inline-block;
`;

export const EmptyText = styled.div`
  text-align: center;
  padding: 32px;
  color: #9ca3af;
  font-size: 13.5px;
`;

export const LoadingText = styled.div`
  text-align: center;
  padding: 40px;
  color: #6b7280;
`;

// ── Create modal specifics ───────────────────────────────────
export const Row2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

export const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  max-height: 240px;
  overflow-y: auto;
  border: 1px solid #e6eee9;
  border-radius: 11px;
  padding: 10px;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const StudentFilterRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 160px;
  gap: 8px;
  margin-bottom: 8px;
`;

export const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #1f2937;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 6px;

  &:hover {
    background: #f7fbf8;
  }

  input {
    accent-color: #237a3c;
  }
`;
