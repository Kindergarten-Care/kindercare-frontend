import styled, { keyframes } from 'styled-components';

export const kcPop = keyframes`
  from { opacity: 0; transform: scale(0.94) translateY(8px); }
  to { opacity: 1; transform: none; }
`;

export const kcFadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  width: 100%;
  font-family: 'Inter', sans-serif;
  color: #1F2937;
  -webkit-font-smoothing: antialiased;
`;

export const HeroSection = styled.div`
  position: relative;
  background: #00794A;
  border-radius: 28px;
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 12px 32px -12px rgba(0, 90, 54, 0.4);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    right: -5%;
    top: -50%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%);
    border-radius: 50%;
    pointer-events: none;
  }
`;

export const HeroLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
  z-index: 1;
`;

export const HeroTitle = styled.h1`
  font-size: 28px;
  font-weight: 800;
  color: #fff;
  margin: 0;
  letter-spacing: -0.02em;
`;

export const HeroSubtitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #A7C9B6;
`;

export const HeroRight = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  position: relative;
  z-index: 1;
`;

export const QrBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #fff;
  color: #00794A;
  border: none;
  border-radius: 14px;
  height: 46px;
  padding: 0 20px;
  font-weight: 700;
  font-size: 14.5px;
  cursor: pointer;
  box-shadow: 0 8px 24px -8px rgba(0,0,0,0.2);
  transition: transform 0.15s;
  font-family: inherit;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const LeaveBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: rgba(255,255,255,0.15);
  color: #fff;
  border: none;
  border-radius: 14px;
  height: 46px;
  padding: 0 20px;
  font-weight: 700;
  font-size: 14.5px;
  cursor: pointer;
  transition: background 0.15s;
  font-family: inherit;

  &:hover {
    background: rgba(255,255,255,0.25);
  }
`;

export const LeaveBadge = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FBBF24;
  color: #005A36;
  font-size: 12px;
  font-weight: 800;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  border-radius: 999px;
`;

export const ChartCard = styled.section`
  background: #fff;
  border-radius: 20px;
  border: 1px solid #E6EEE9;
  padding: 24px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.05);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ChartTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: #1F2937;
  margin: 0;
`;

export const DonutRow = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  flex-wrap: wrap;
`;

export const DonutWrapper = styled.div<{ $bg: string }>`
  position: relative;
  flex: none;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: ${props => props.$bg};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DonutInner = styled.div`
  position: absolute;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 2px 8px rgba(0,90,54,0.06);
`;

export const DonutRate = styled.span`
  font-size: 34px;
  font-weight: 800;
  color: #005A36;
  letter-spacing: -0.02em;
  line-height: 1;
`;

export const DonutLabel = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 4px;
`;

export const LegendList = styled.div`
  flex: 1;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const LegendDot = styled.span<{ $bg: string }>`
  width: 12px;
  height: 12px;
  border-radius: 4px;
  background: ${props => props.$bg};
`;

export const LegendText = styled.span`
  flex: 1;
  font-size: 13.5px;
  color: #4B5563;
  font-weight: 600;
`;

export const LegendCount = styled.span<{ $color: string }>`
  font-size: 16px;
  font-weight: 800;
  color: ${props => props.$color};
`;

export const LegendPct = styled.span`
  font-size: 12px;
  color: #9CA3AF;
  width: 42px;
  text-align: right;
  font-weight: 600;
`;

export const CalLegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  font-weight: 600;
  color: #6B7280;
`;

export const CalLegendDot = styled.span<{ $color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.$color};
`;

export const ListSection = styled.section`
  background: #fff;
  border-radius: 20px;
  border: 1px solid #E6EEE9;
  padding: 8px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.05);
`;

export const ListHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 16px;
  flex-wrap: wrap;
`;

export const ListTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: #1F2937;
  margin: 0;
`;

export const FilterGroup = styled.div`
  display: flex;
  background: #F1F4F1;
  border: 1px solid #E6EEE9;
  border-radius: 12px;
  padding: 3px;
  gap: 3px;
`;

export const FilterBtn = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  padding: 0 14px;
  border-radius: 10px;
  border: none;
  background: ${props => props.$active ? '#fff' : 'transparent'};
  color: ${props => props.$active ? '#005A36' : '#6B7280'};
  font-weight: ${props => props.$active ? 700 : 600};
  font-size: 13px;
  font-family: inherit;
  cursor: pointer;
  box-shadow: ${props => props.$active ? '0 2px 8px rgba(0,90,54,0.08)' : 'none'};
  transition: all 0.2s;
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 42px;
  padding: 0 14px;
  border-radius: 12px;
  background: #F8FBF9;
  border: 1px solid #E6EEE9;
  min-width: 220px;

  input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-family: inherit;
    font-size: 13.5px;
    color: #1F2937;

    &::placeholder {
      color: #9CA3AF;
    }
  }
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1fr 1.5fr 2fr;
  gap: 16px;
  padding: 12px 20px;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #6B7280;
  border-bottom: 1px solid #EEF4F0;

  @media (max-width: 768px) {
    grid-template-columns: 2fr 1fr 1.5fr;
    & > :last-child { display: none; }
  }
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1fr 1.5fr 2fr;
  gap: 16px;
  align-items: center;
  padding: 14px 20px;
  border-bottom: 1px solid #F8FBF9;
  border-radius: 14px;
  transition: background 0.15s;

  &:hover {
    background: #F8FBF9;
  }

  @media (max-width: 768px) {
    grid-template-columns: 2fr 1fr 1.5fr;
    & > :last-child { display: none; }
  }
`;

export const StudentAvatar = styled.div<{ $grad: string }>`
  flex: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${props => props.$grad};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  position: relative;
`;

export const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export const StudentName = styled.div`
  font-size: 14.5px;
  font-weight: 700;
  color: #1F2937;
`;

export const StudentCode = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #9CA3AF;
  font-variant-numeric: tabular-nums;
`;

export const StatusBadgeBtn = styled.button<{ $bg: string; $color: string; $bd: string }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  background: ${props => props.$bg};
  color: ${props => props.$color};
  border: 1px solid ${props => props.$bd};
  font-family: inherit;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: transform 0.15s;

  &:hover {
    transform: translateY(-1px);
  }
`;

export const StatusDot = styled.span<{ $color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.$color};
`;

export const ToastContainer = styled.div`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 9999;
  pointer-events: none;
`;

export const ToastMsg = styled.div`
  background: #005A36;
  color: #fff;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  box-shadow: 0 8px 24px rgba(0, 90, 54, 0.3);
  animation: ${kcFadeIn} 0.3s ease;
`;

export const PopoverOverlay = styled.div`
  position: absolute;
  z-index: 100;
  background: #fff;
  border-radius: 16px;
  border: 1px solid #E6EEE9;
  box-shadow: 0 12px 32px rgba(16, 24, 40, 0.12);
  width: 200px;
  right: 0;
  top: calc(100% + 8px);
  padding: 6px;
`;

export const PopoverItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 10px;
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 600;
  color: #1F2937;
  cursor: pointer;
  text-align: left;

  &:hover {
    background: #F8FBF9;
  }
`;

export const PopoverReasonContainer = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const PopoverInput = styled.input`
  width: 100%;
  height: 42px;
  border: 1px solid #E6EEE9;
  border-radius: 10px;
  padding: 0 12px;
  font-family: inherit;
  font-size: 13.5px;
  outline: none;
`;

export const PopoverSaveButton = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  border: none;
  background: #00794A;
  color: #fff;
  font-family: inherit;
  font-weight: 700;
  font-size: 13.5px;
  cursor: pointer;

  &:disabled {
    background: #E6EEE9;
    color: #9CA3AF;
  }
`;

export const ModalTitle = styled.div`
  font-size: 16px;
  font-weight: 800;
  color: ${props => props.theme.colors.fg};
  margin-bottom: 16px;
  font-family: inherit;
`;

export const ModalMetaRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
`;

export const ModalMetaField = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.muted};
`;

export const ModalLabel = styled.strong`
  color: ${props => props.theme.colors.fg};
`;

export const ModalValue = styled.span<{ $status?: 'APPROVED' | 'REJECTED' | 'PENDING' }>`
  font-weight: 600;
  color: ${props => {
    if (props.$status === 'APPROVED') return props.theme.colors.green;
    if (props.$status === 'REJECTED') return props.theme.colors.red || '#dc2626';
    if (props.$status === 'PENDING') return props.theme.colors.amber;
    return props.theme.colors.fg;
  }};
`;

export const ModalReasonBox = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.fg};
  background: ${props => props.theme.colors.bg};
  border: 1px solid ${props => props.theme.colors.border};
  padding: 12px;
  border-radius: ${props => props.theme.radius.md};
  min-height: 80px;
  margin-bottom: 20px;
`;

export const ModalActionRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const ModalApproveBtn = styled.button`
  padding: 8px 20px;
  background: ${props => props.theme.colors.green};
  color: ${props => props.theme.colors.white};
  font-weight: 600;
  border: none;
  border-radius: ${props => props.theme.radius.md};
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.9;
  }
`;

export const ModalRejectBtn = styled.button`
  padding: 8px 20px;
  background: ${props => props.theme.colors.redLight};
  color: ${props => props.theme.colors.red || '#dc2626'};
  font-weight: 600;
  border: 1px solid rgba(220, 38, 38, 0.2);
  border-radius: ${props => props.theme.radius.md};
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.9;
  }
`;

export const ModalCloseBtn = styled.button`
  padding: 8px 20px;
  background: ${props => props.theme.colors.bg};
  color: ${props => props.theme.colors.muted};
  font-weight: 600;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radius.md};
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  transition: background 0.15s;

  &:hover {
    background: ${props => props.theme.colors.border};
  }
`;

// Responsive Grid View support:
export const GridContainer = styled.div`
  padding: 22px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(132px, 1fr));
  gap: 16px;
`;

export const GridCard = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9px;
  padding: 18px 10px;
  border-radius: ${props => props.theme.radius.lg};
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.surface};
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
  width: 100%;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

interface GridAvatarProps {
  $color: string;
  $ring: string;
  $dim?: boolean;
}
export const GridAvatar = styled.span<GridAvatarProps>`
  position: relative;
  width: 62px;
  height: 62px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 22px;
  color: ${props => props.theme.colors.fg};
  background: ${props => props.$color};
  box-shadow: 0 0 0 3px ${props => props.$ring};
  opacity: ${props => props.$dim ? 0.6 : 1};
  filter: ${props => props.$dim ? 'grayscale(0.8)' : 'none'};
`;

export const SummaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radius.md};
  font-size: 13.5px;
  font-weight: 700;
  color: ${props => props.theme.colors.fg};
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);

  &:hover {
    background: #FEF3C7;
    border-color: ${props => props.theme.colors.amber};
    color: #B45309;
  }
`;

export const SummaryModalContent = styled.div`
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.radius.lg};
  padding: 24px;
  width: 90%;
  max-width: 720px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  animation: ${kcPop} 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  max-height: 85vh;
`;

export const TabRow = styled.div`
  display: flex;
  gap: 8px;
  border-bottom: 1.5px solid ${props => props.theme.colors.border};
  margin-bottom: 16px;
  padding-bottom: 2px;
`;

export const TabBtn = styled.button<{ $active: boolean }>`
  background: transparent;
  border: none;
  border-bottom: 3px solid ${props => props.$active ? props.theme.colors.green : 'transparent'};
  color: ${props => props.$active ? props.theme.colors.green : props.theme.colors.muted};
  font-weight: 700;
  font-size: 13.5px;
  padding: 8px 14px;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: -3.5px;

  &:hover {
    color: ${props => props.theme.colors.green};
  }
`;

export const SummaryTableWrapper = styled.div`
  flex: 1;
  overflow: auto;
  min-height: 250px;
  max-height: 480px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radius.md};
  background: ${props => props.theme.colors.bg};
`;

export const SummaryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 13px;
`;

export const SummaryTh = styled.th`
  background: ${props => props.theme.colors.surface};
  padding: 12px 14px;
  font-weight: 700;
  color: ${props => props.theme.colors.fg};
  border-bottom: 1.5px solid ${props => props.theme.colors.border};
  position: sticky;
  top: 0;
  z-index: 2;
`;

export const SummaryTr = styled.tr`
  border-bottom: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.surface};
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #F8FBF9;
  }
`;

export const SummaryTd = styled.td`
  padding: 12px 14px;
  color: ${props => props.theme.colors.fg};
`;

export const StudentAvatarImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export const KpiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 750px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

interface KpiCardProps {
  $borderColor?: string;
}
export const KpiCard = styled.div<KpiCardProps>`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.$borderColor || props.theme.colors.border};
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06);
  padding: 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 48px -12px rgba(0, 90, 54, 0.14), 0 6px 16px -6px rgba(0, 0, 0, 0.05);
  }
`;

export const KpiIconBlock = styled.span<{ $bg: string; $color: string }>`
  flex: none;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: ${props => props.$bg};
  color: ${props => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const KpiMeta = styled.div`
  display: flex;
  flex-direction: column;
`;

export const KpiLabel = styled.div`
  font-size: 12.5px;
  color: ${props => props.theme.colors.muted};
  font-weight: 600;
`;

export const KpiValue = styled.div<{ $color?: string }>`
  font-family: ${props => props.theme.fonts.display};
  font-size: 28px;
  font-weight: 800;
  color: ${props => props.$color || props.theme.colors.fg};
  line-height: 1;
  font-variant-numeric: tabular-nums;
`;

export const ChartCalendarGrid = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 18px;
  align-items: start;

  @media (max-width: 1140px) {
    grid-template-columns: 1fr;
  }
`;

export const WeeklyTrendContainer = styled.div`
  margin-top: 22px;
  border-top: 1px solid #EEF4F0;
  padding-top: 18px;
`;

export const WeeklyTrendHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`;

export const WeeklyTrendTitle = styled.span`
  font-family: ${props => props.theme.fonts.display};
  font-weight: 700;
  font-size: 14px;
  color: ${props => props.theme.colors.fg};
`;

export const WeeklyTrendSubtitle = styled.span`
  font-size: 12px;
  color: ${props => props.theme.colors.muted};
`;

export const WeeklyTrendBars = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;
  height: 110px;
`;

export const WeeklyBarCol = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  height: 100%;
  justify-content: flex-end;
`;

export const WeeklyBarVal = styled.span<{ $active: boolean }>`
  font-family: ${props => props.theme.fonts.display};
  font-size: 11px;
  font-weight: 700;
  color: ${props => props.$active ? props.theme.colors.green : props.theme.colors.muted};
  font-variant-numeric: tabular-nums;
`;

export const WeeklyBarGraphic = styled.div<{ $h: number; $bg: string }>`
  width: 100%;
  max-width: 34px;
  height: ${props => props.$h}px;
  border-radius: 8px 8px 4px 4px;
  background: ${props => props.$bg};
  transform-origin: bottom;
  animation: ${keyframes`from{transform:scaleY(0);}to{transform:scaleY(1);}`} 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const WeeklyBarLabel = styled.span<{ $active: boolean }>`
  font-size: 11px;
  font-weight: 600;
  color: ${props => props.$active ? props.theme.colors.green : props.theme.colors.muted};
`;

export const CalendarCard = styled.section`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06);
  padding: 22px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 48px -12px rgba(0, 90, 54, 0.14), 0 6px 16px -6px rgba(0, 0, 0, 0.05);
  }
`;

export const CalendarHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const CalendarMonthLabel = styled.span`
  font-family: ${props => props.theme.fonts.display};
  font-weight: 700;
  font-size: 16px;
  color: ${props => props.theme.colors.fg};
`;

export const CalendarNavButtons = styled.div`
  display: flex;
  gap: 6px;
`;

export const CalendarNavBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 9px;
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.muted};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;

  &:hover {
    background: ${props => props.theme.colors.bg};
  }
`;

export const CalendarDowsHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  margin-bottom: 6px;
`;

export const CalendarDowLabel = styled.span`
  text-align: center;
  font-size: 11px;
  font-weight: 700;
  color: ${props => props.theme.colors.muted};
`;

export const CalendarDaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
`;

export const CalendarDayCell = styled.div<{ $isToday?: boolean; $isFuture?: boolean; $weekend?: boolean }>`
  position: relative;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12.5px;
  font-weight: ${props => props.$isToday ? '800' : '600'};
  border-radius: 9px;
  background: ${props => props.$isToday ? props.theme.colors.green : props.theme.colors.surface};
  color: ${props => {
    if (props.$isToday) return props.theme.colors.white;
    if (props.$isFuture) return '#D1D5DB';
    if (props.$weekend) return '#C7CFCA';
    return '#374151';
  }};
  font-variant-numeric: tabular-nums;
  cursor: ${props => props.$isFuture ? 'default' : 'pointer'};
  transition: background 0.15s;

  &:hover {
    background: ${props => {
      if (props.$isToday) return props.theme.colors.greenDark;
      if (props.$isFuture) return props.theme.colors.surface;
      return props.theme.colors.bg;
    }};
  }
`;

export const CalendarDayDot = styled.span<{ $color: string }>`
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${props => props.$color};
`;

export const CalendarLegend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 11px;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid #EEF4F0;
  font-size: 11px;
  font-weight: 600;
  color: ${props => props.theme.colors.muted};
`;

export const CalendarLegendItem = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const CalendarLegendDot = styled.span<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.$color};
`;

export const DrawerOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9000;
  background: rgba(15, 23, 42, 0.3);
  animation: ${kcFadeIn} 0.25s ease;
`;

export const DrawerContainer = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9001;
  width: 480px;
  max-width: 100%;
  background: ${props => props.theme.colors.surface};
  border-left: 1px solid ${props => props.theme.colors.border};
  box-shadow: -24px 0 64px -24px rgba(0, 90, 54, 0.22);
  display: flex;
  flex-direction: column;
  animation: ${keyframes`from{transform:translateX(100%);}to{transform:translateX(0);}`} 0.32s cubic-bezier(0.32, 0.72, 0, 1);
`;

export const DrawerHeader = styled.div`
  flex: none;
  padding: 22px 24px 16px;
  border-bottom: 1px solid #EEF4F0;
  display: flex;
  align-items: center;
  gap: 13px;
`;

export const DrawerHeaderIconBlock = styled.span`
  flex: none;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: #FEF3C7;
  color: #D97706;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DrawerHeaderMeta = styled.div`
  flex: 1;
`;

export const DrawerCloseBtn = styled.button`
  flex: none;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: none;
  background: #F1F4F1;
  color: #6B7280;
  font-size: 17px;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #E6EEE9;
  }
`;

export const DrawerContentList = styled.div`
  flex: 1;
  overflow: auto;
  padding: 18px 24px 28px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  background: ${props => props.theme.colors.bg};
`;

export const LeaveCard = styled.div<{ $isPending: boolean }>`
  border: 1px solid ${props => props.$isPending ? '#FDE68A' : props.theme.colors.border};
  background: ${props => props.$isPending ? '#FFFBEB' : props.theme.colors.surface};
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

export const LeaveCardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 13px;
`;

export const LeaveStudentAvatar = styled.span<{ $grad: string }>`
  flex: none;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: ${props => props.$grad};
  color: ${props => props.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
`;

export const LeaveStudentAvatarImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export const LeaveStudentMeta = styled.div`
  flex: 1;
  min-width: 0;
`;

export const LeaveStudentNameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const LeaveStudentName = styled.span`
  font-weight: 700;
  font-size: 15px;
  color: ${props => props.theme.colors.fg};
`;

export const LeaveStatusPill = styled.span<{ $status: 'PENDING' | 'APPROVED' | 'REJECTED' }>`
  font-size: 10.5px;
  font-weight: 700;
  padding: 2px 9px;
  border-radius: 7px;
  color: ${props => {
    if (props.$status === 'APPROVED') return '#005A36';
    if (props.$status === 'REJECTED') return '#DC2626';
    return '#B45309';
  }};
  background: ${props => {
    if (props.$status === 'APPROVED') return '#E6F3ED';
    if (props.$status === 'REJECTED') return '#FEE2E2';
    return '#FEF3C7';
  }};
`;

export const LeaveSubDetail = styled.div`
  font-size: 12.5px;
  color: ${props => props.theme.colors.muted};
  margin-top: 2px;
`;

export const LeaveDetailsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  margin-top: 13px;
`;

export const LeaveDetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 8px 6px;
`;

export const LeaveDetailIconBlock = styled.span<{ $bg: string; $color: string }>`
  flex: none;
  width: 30px;
  height: 30px;
  border-radius: 9px;
  background: ${props => props.$bg};
  color: ${props => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LeaveDetailLabel = styled.span`
  flex: 1;
  font-size: 12px;
  color: ${props => props.theme.colors.muted};
  font-weight: 500;
`;

export const LeaveDetailValue = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${props => props.theme.colors.fg};
  text-align: right;
`;

export const LeaveEvidenceBlock = styled.div`
  margin-top: 10px;
`;

export const LeaveEvidenceTitle = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${props => props.theme.colors.muted};
  margin-bottom: 7px;
`;

export const LeaveEvidenceBtn = styled.button<{ $bg: string }>`
  position: relative;
  width: 100%;
  height: 96px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.$bg};
  transition: transform 0.15s;

  &:hover {
    transform: scale(1.02);
  }
`;

export const LeaveEvidenceLabelBlock = styled.span`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${props => props.theme.colors.white};
  font-size: 12.5px;
  font-weight: 700;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(2px);
  padding: 6px 12px;
  border-radius: 9px;
`;

export const LeaveActionButtons = styled.div`
  display: flex;
  gap: 9px;
  margin-top: 13px;
`;

export const LeaveActionApproveBtn = styled.button`
  flex: 1;
  height: 42px;
  border-radius: 11px;
  border: none;
  background: ${props => props.theme.colors.green};
  color: ${props => props.theme.colors.white};
  font-family: inherit;
  font-weight: 700;
  font-size: 13.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  transition: transform 0.15s, background 0.15s;

  &:hover {
    transform: scale(1.02);
    background: ${props => props.theme.colors.greenDark};
  }
`;

export const LeaveActionRejectBtn = styled.button`
  flex: 1;
  height: 42px;
  border-radius: 11px;
  border: 1px solid #FCA5A5;
  background: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.red || '#DC2626'};
  font-family: inherit;
  font-weight: 700;
  font-size: 13.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  transition: transform 0.15s, background 0.15s;

  &:hover {
    transform: scale(1.02);
    background: #FEE2E2;
  }
`;

export const LightboxOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9600;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  animation: ${kcFadeIn} 0.2s ease;
`;

export const LightboxContainer = styled.div`
  max-width: 520px;
  width: 100%;
  background: ${props => props.theme.colors.surface};
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(15, 23, 42, 0.4);
  animation: ${kcPop} 0.22s ease;
`;

export const LightboxMediaBox = styled.div<{ $bg: string }>`
  height: 380px;
  background: ${props => props.$bg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  color: ${props => props.theme.colors.white};
  position: relative;
`;

export const LightboxStripeOverlay = styled.span`
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0 18px, rgba(0, 0, 0, 0.03) 18px 36px);
`;

export const LightboxImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: relative;
  z-index: 1;
`;

export const LightboxFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: ${props => props.theme.colors.surface};
`;

export const LightboxCaption = styled.span`
  font-size: 13px;
  color: ${props => props.theme.colors.muted};
`;

export const LightboxCloseBtn = styled.button`
  height: 40px;
  padding: 0 18px;
  border-radius: 11px;
  border: none;
  background: ${props => props.theme.colors.green};
  color: ${props => props.theme.colors.white};
  font-family: inherit;
  font-weight: 700;
  font-size: 13.5px;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: ${props => props.theme.colors.greenDark};
  }
`;