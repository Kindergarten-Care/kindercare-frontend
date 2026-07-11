import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px;
  width: 100%;
  box-sizing: border-box;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

export const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e6eee9;
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
`;

// ── Hero ─────────────────────────────────────────────────────
export const Hero = styled(Card)`
  display: flex;
  align-items: center;
  gap: 22px;
  padding: 24px 26px;
  margin-bottom: 22px;
  position: relative;
  overflow: hidden;
`;

export const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, #60a5fa 0%, #2563eb 100%);
  opacity: 0.08;
`;

export const HeroBadge = styled.div<{ $gradient?: string; $shadow?: string }>`
  width: 78px;
  height: 78px;
  border-radius: 20px;
  display: grid;
  place-items: center;
  color: #fff;
  flex-shrink: 0;
  background: ${({ $gradient }) => $gradient || 'linear-gradient(140deg, #60a5fa, #2563eb)'};
  box-shadow: 0 8px 22px -8px ${({ $shadow }) => $shadow || 'rgba(37, 99, 235, 0.55)'};
  position: relative;
  z-index: 1;
`;

export const HeroMain = styled.div`
  flex: 1;
  min-width: 0;
  position: relative;
  z-index: 1;
`;

export const HeroName = styled.div`
  font-weight: 800;
  font-size: 26px;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: #1f2937;
`;

export const HeroYear = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #6b7280;
  margin-left: 8px;
`;

export const HeroMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 11px;
  flex-wrap: wrap;
`;

export const Pill = styled.span<{ $variant?: 'grade' | 'room' }>`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 12.5px;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 20px;
  color: ${({ $variant }) => ($variant === 'grade' ? '#2563eb' : '#6b7280')};
  background: ${({ $variant }) => ($variant === 'grade' ? '#e3edfd' : '#eef4f0')};
`;

export const HeroStat = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 14px 26px;
  border-left: 1px solid #e6eee9;
  flex-shrink: 0;
`;

export const HeroStatValue = styled.div`
  font-weight: 800;
  font-size: 34px;
  color: #237a3c;
  line-height: 1;
`;

export const HeroStatLabel = styled.div`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #9ca3af;
  margin-top: 6px;
`;

// ── Layout ───────────────────────────────────────────────────
export const Layout = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 20px;
  align-items: start;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

export const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CardPad = styled(Card)`
  padding: 22px;
`;

export const CardTitle = styled.span`
  font-weight: 700;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 9px;
  color: #1f2937;
`;

export const TitleIcon = styled.span`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  background: #e8f5ed;
  color: #237a3c;
  flex-shrink: 0;
`;

export const CardHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const CountChip = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: #237a3c;
  background: #e8f5ed;
  padding: 2px 10px;
  border-radius: 20px;
  margin-left: 2px;
`;

// ── Teacher card ─────────────────────────────────────────────
export const TeacherRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 16px;
  padding: 14px;
  border: 1px solid #eef4f0;
  border-radius: 13px;
  background: #f8fbf9;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #f0f7f2;
  }
`;

export const TeacherAvatar = styled.div<{ $bg: string }>`
  width: 52px;
  height: 52px;
  border-radius: 15px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  color: #fff;
  font-weight: 700;
  font-size: 17px;
  background: ${({ $bg }) => $bg};
  overflow: hidden;
`;

export const TeacherAvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const TeacherName = styled.div`
  font-weight: 700;
  font-size: 15px;
  color: #1f2937;
`;

export const TeacherRole = styled.div`
  font-size: 12px;
  color: #9ca3af;
  margin-top: 1px;
`;

export const TeacherContact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-top: 14px;
`;

export const ContactLine = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 13px;
  font-weight: 600;
  color: #1f2937;

  svg { color: #9ca3af; flex-shrink: 0; }
`;

export const EmptyText = styled.div`
  text-align: center;
  padding: 24px;
  color: #9ca3af;
  font-size: 13.5px;
`;

// ── Attendance donut ─────────────────────────────────────────
export const DateText = styled.div`
  font-size: 12px;
  color: #9ca3af;
  margin-top: 4px;
  font-variant-numeric: tabular-nums;
`;

export const DonutWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 18px;
`;

export const DonutChartWrap = styled.div`
  width: 100%;
  height: 180px;
  position: relative;
`;

export const DonutCenter = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

export const DonutPct = styled.span`
  font-weight: 800;
  font-size: 26px;
  color: #237a3c;
  line-height: 1;
`;

export const DonutSub = styled.span`
  font-size: 11px;
  color: #9ca3af;
  font-weight: 600;
  margin-top: 2px;
`;

export const Legend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 18px;
  width: 100%;
`;

export const LegendRow = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 13px;
  color: #1f2937;
`;

export const LegendSwatch = styled.span<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 3px;
  flex-shrink: 0;
  background: ${({ $color }) => $color};
`;

export const LegendValue = styled.span<{ $color?: string }>`
  margin-left: auto;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: ${({ $color }) => $color || '#1f2937'};
`;

// ── Toolbar ──────────────────────────────────────────────────
export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 2px 0 16px;
  flex-wrap: wrap;
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  background: #f8fbf9;
  border: 1px solid #e6eee9;
  border-radius: 11px;
  padding: 0 13px;
  height: 42px;
  flex: 1;
  min-width: 200px;
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

export const SortDropdownWrap = styled.div`
  width: 190px;
  flex-shrink: 0;
`;

// ── Table ────────────────────────────────────────────────────
export const TableScrollArea = styled.div<{ $minRows?: number }>`
  overflow-x: auto;
  min-height: ${({ $minRows = 6 }) => $minRows * 49}px;
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

export const StuCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StuAvatar = styled.div<{ $bg: string }>`
  width: 36px;
  height: 36px;
  font-size: 12px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #fff;
  font-weight: 700;
  flex-shrink: 0;
  overflow: hidden;
  background: ${({ $bg }) => $bg};
`;

export const StuAvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const StuName = styled.div`
  font-weight: 600;
  color: #1f2937;
`;

export const CodeText = styled.span`
  font-variant-numeric: tabular-nums;
  color: #6b7280;
  font-weight: 500;
`;

export const DobText = styled.span`
  font-variant-numeric: tabular-nums;
  color: #6b7280;
`;

export const ViewBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  font-weight: 600;
  color: #237a3c;
  padding: 7px 13px;
  border-radius: 9px;
  border: 1px solid #e6eee9;
  background: #fff;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: #cfe0d5;
    background: #f7fbf8;
  }
`;

// ── Pagination ───────────────────────────────────────────────
export const TableFoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0 2px;
  font-size: 13px;
  color: #6b7280;
`;

export const Pager = styled.div`
  display: flex;
  gap: 6px;
`;

export const PageBtn = styled.button<{ $active?: boolean; $disabled?: boolean }>`
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border-radius: 9px;
  border: 1px solid ${({ $active }) => ($active ? '#237a3c' : '#e6eee9')};
  background: ${({ $active }) => ($active ? '#237a3c' : '#fff')};
  color: ${({ $active }) => ($active ? '#fff' : '#6b7280')};
  font-size: 13px;
  font-weight: 600;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.4 : 1)};
  display: grid;
  place-items: center;
  transition: all 0.15s;

  &:hover:not(:disabled) {
    background: ${({ $active }) => ($active ? '#1a5c2d' : '#f7fbf8')};
    border-color: ${({ $active }) => ($active ? '#1a5c2d' : '#cfe0d5')};
  }
`;

export const LoadingText = styled.div`
  text-align: center;
  padding: 60px;
  color: #9ca3af;
  font-size: 0.9rem;
`;

export const ErrorText = styled.div`
  text-align: center;
  padding: 60px;
  color: #dc2626;
  font-size: 0.9rem;
`;
