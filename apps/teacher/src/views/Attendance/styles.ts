import styled, { keyframes } from 'styled-components';

export const floaty = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

export const toastin = keyframes`
  from { opacity: 0; transform: translateX(60px) scale(0.9); }
  to { opacity: 1; transform: none; }
`;

export const kcPop = keyframes`
  from { opacity: 0; transform: scale(0.94) translateY(8px); }
  to { opacity: 1; transform: none; }
`;

export const kcFadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
`;

export const kcSlideIn = keyframes`
  from { opacity: 0; max-height: 0; }
  to { opacity: 1; max-height: 120px; }
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  font-family: ${props => props.theme.fonts.body};
  color: ${props => props.theme.colors.fg};
  -webkit-font-smoothing: antialiased;
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const SubTitle = styled.div`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: ${props => props.theme.colors.muted};
`;

export const Title = styled.h1`
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -0.03em;
  margin: 0;
  color: ${props => props.theme.colors.fg};
`;

export const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 9px;
  height: 46px;
  padding: 0 18px;
  border-radius: ${props => props.theme.radius.md};
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.fg};
  font-family: inherit;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  box-shadow: ${props => props.theme.shadows.soft};
  transition: transform 0.15s, box-shadow 0.15s;

  &:hover {
    transform: scale(1.02);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

export const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 18px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const StatsCardBento = styled.section`
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radius.lg};
  box-shadow: ${props => props.theme.shadows.soft};
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  animation: ${kcPop} 0.3s cubic-bezier(0.16, 1, 0.3, 1);
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CardTitle = styled.span`
  font-weight: 700;
  font-size: 16px;
  letter-spacing: -0.01em;
  color: ${props => props.theme.colors.fg};
`;

export const AttendanceRate = styled.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: ${props => props.theme.colors.green};
  background: ${props => props.theme.colors.greenLight};
  padding: 5px 11px;
  border-radius: ${props => props.theme.radius.sm};
  border: 1px solid ${props => props.theme.colors.greenXLight};
`;

export const MiniStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 11px;
`;

interface MiniStatCardProps {
  $statusType: 'total' | 'present' | 'excused' | 'unexcused';
}
export const MiniStatCard = styled.div<MiniStatCardProps>`
  border-radius: ${props => props.theme.radius.lg};
  padding: 14px;
  border: 1px solid ${props => {
    switch (props.$statusType) {
      case 'present': return props.theme.colors.greenXLight;
      case 'excused': return props.theme.colors.border;
      case 'unexcused': return props.theme.colors.redLight;
      default: return props.theme.colors.border;
    }
  }};
  background: ${props => {
    switch (props.$statusType) {
      case 'present': return props.theme.colors.greenLight;
      case 'excused': return props.theme.colors.bg;
      case 'unexcused': return props.theme.colors.redLight;
      default: return props.theme.colors.surface;
    }
  }};
`;

export const MiniStatVal = styled.div<{ $colorType?: 'green' | 'red' | 'muted' | 'fg' }>`
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
  color: ${props => {
    switch (props.$colorType) {
      case 'green': return props.theme.colors.green;
      case 'red': return props.theme.colors.red || '#dc2626';
      case 'muted': return props.theme.colors.muted;
      default: return props.theme.colors.fg;
    }
  }};
`;

export const MiniStatLabel = styled.div`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${props => props.theme.colors.muted};
  margin-top: 3px;
`;

export const ProgressBar = styled.div`
  display: flex;
  height: 8px;
  border-radius: ${props => props.theme.radius.pill};
  overflow: hidden;
  background: ${props => props.theme.colors.border};
`;

interface ProgressSegmentProps {
  $pct: number;
  $color: string;
}
export const ProgressSegment = styled.span<ProgressSegmentProps>`
  width: ${props => props.$pct}%;
  background: ${props => props.$color};
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const FilterCardBento = styled.section`
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radius.lg};
  box-shadow: ${props => props.theme.shadows.soft};
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  justify-content: center;
  animation: ${kcPop} 0.3s cubic-bezier(0.16, 1, 0.3, 1);
`;

export const FilterTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const FilterIcon = styled.span`
  display: flex;
  width: 18px;
  height: 18px;
  color: ${props => props.theme.colors.green};
`;

export const DateLabelText = styled.span`
  font-weight: 700;
  font-size: 15px;
  flex: 1;
  text-transform: capitalize;
  color: ${props => props.theme.colors.fg};
`;

export const DateNavRow = styled.div`
  display: flex;
  gap: 8px;
`;

interface DateNavButtonProps {
  $today?: boolean;
}
export const NavButton = styled.button<DateNavButtonProps>`
  flex: 1;
  height: 38px;
  border-radius: ${props => props.theme.radius.md};
  font-family: inherit;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid ${props => props.$today ? props.theme.colors.greenXLight : props.theme.colors.border};
  background: ${props => props.$today ? props.theme.colors.greenLight : props.theme.colors.surface};
  color: ${props => props.$today ? props.theme.colors.green : props.theme.colors.fg};

  &:hover {
    background: ${props => props.$today ? props.theme.colors.greenXLight : props.theme.colors.bg};
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  height: 48px;
  padding: 0 16px;
  border-radius: ${props => props.theme.radius.md};
  background: rgba(244, 248, 245, 0.7);
  border: 1px solid ${props => props.theme.colors.border};
  transition: box-shadow 0.2s;

  &:focus-within {
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.15);
    background: ${props => props.theme.colors.surface};
  }
`;

export const SearchIcon = styled.span`
  flex: none;
  display: flex;
  width: 18px;
  height: 18px;
  color: ${props => props.theme.colors.muted};
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: 14px;
  color: ${props => props.theme.colors.fg};

  &::placeholder {
    color: ${props => props.theme.colors.muted};
  }
`;

export const ClearSearchButton = styled.button`
  flex: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: none;
  background: ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.muted};
  cursor: pointer;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;

  &:hover {
    background: ${props => props.theme.colors.muted};
    color: ${props => props.theme.colors.surface};
  }
`;

export const RosterSection = styled.section`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radius.lg};
  box-shadow: ${props => props.theme.shadows.soft};
  padding: 14px;
  animation: ${kcPop} 0.35s cubic-bezier(0.16, 1, 0.3, 1);
`;

export const RosterHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 8px 12px 12px;
  flex-wrap: wrap;
`;

export const RosterTitle = styled.span`
  font-weight: 700;
  font-size: 16px;
  flex: 1;
  color: ${props => props.theme.colors.fg};
`;

export const ShownCount = styled.span`
  color: ${props => props.theme.colors.muted};
  font-weight: 600;
  font-size: 14px;
`;

export const LegendContainer = styled.div`
  display: flex;
  gap: 14px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${props => props.theme.colors.muted};
  flex-wrap: wrap;
`;

export const LegendItem = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const LegendDot = styled.span<{ $color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.$color};
`;

export const ToolbarRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 8px 12px 14px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  flex-wrap: wrap;
`;

export const SortControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radius.md};
  padding: 0 14px;
  height: 40px;
`;

export const SortLabel = styled.span`
  font-size: 12px;
  color: ${props => props.theme.colors.muted};
  font-weight: 600;
  white-space: nowrap;
`;

export const SortSelect = styled.select`
  border: none;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-weight: 700;
  font-size: 13px;
  color: ${props => props.theme.colors.fg};
  cursor: pointer;
  padding-right: 4px;
`;

export const ViewToggle = styled.div`
  display: flex;
  background: ${props => props.theme.colors.bg};
  border-radius: ${props => props.theme.radius.md};
  padding: 3px;
  gap: 3px;
`;

interface ToggleBtnProps {
  $active: boolean;
}
export const ToggleBtn = styled.button<ToggleBtnProps>`
  display: flex;
  align-items: center;
  gap: 7px;
  height: 34px;
  padding: 0 14px;
  border-radius: 8px;
  border: none;
  font-family: inherit;
  font-weight: 700;
  font-size: 12.5px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${props => props.$active ? props.theme.colors.surface : 'transparent'};
  color: ${props => props.$active ? props.theme.colors.fg : props.theme.colors.muted};
  box-shadow: ${props => props.$active ? '0 2px 8px rgba(16, 24, 40, 0.06)' : 'none'};
`;

export const ListContainer = styled.div`
  max-height: 540px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #d6e2da;
    border-radius: 8px;
  }
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2.4fr 1fr 1.3fr 2fr;
  gap: 14px;
  padding: 10px 16px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${props => props.theme.colors.muted};
  border-bottom: 1px solid ${props => props.theme.colors.border};

  @media (max-width: 768px) {
    grid-template-columns: 2fr 1fr 1.5fr;
    & > :last-child {
      display: none;
    }
  }
`;

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 4px;
`;

export const Tr = styled.div`
  display: grid;
  grid-template-columns: 2.4fr 1fr 1.3fr 2fr;
  gap: 14px;
  align-items: center;
  padding: 11px 16px;
  border-radius: ${props => props.theme.radius.lg};
  transition: background 0.25s, transform 0.25s, box-shadow 0.25s;

  &:hover {
    background: ${props => props.theme.colors.bg} !important;
    transform: translateX(4px);
  }

  @media (max-width: 768px) {
    grid-template-columns: 2fr 1fr 1.5fr;
  }
`;

export const StudentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  min-width: 0;
`;

interface StudentAvatarProps {
  $grad: string;
  $dim?: boolean;
}
export const StudentAvatar = styled.span<StudentAvatarProps>`
  position: relative;
  flex: none;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: ${props => props.$grad};
  color: ${props => props.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 15px;
  filter: ${props => props.$dim ? 'grayscale(0.55)' : 'none'};
  opacity: ${props => props.$dim ? 0.72 : 1};
`;

export const OnlineDot = styled.span`
  position: absolute;
  right: -1px;
  bottom: -1px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: ${props => props.theme.colors.greenMid};
  box-shadow: 0 0 0 2.5px ${props => props.theme.colors.surface};
`;

export const StudentMeta = styled.div`
  min-width: 0;
`;

export const StudentName = styled.div`
  font-weight: 700;
  font-size: 14.5px;
  color: ${props => props.theme.colors.fg};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StudentCode = styled.div`
  font-size: 11.5px;
  color: ${props => props.theme.colors.muted};
  font-variant-numeric: tabular-nums;
`;

export const TimeText = styled.div<{ $present?: boolean }>`
  font-size: 13.5px;
  font-weight: 600;
  color: ${props => props.$present ? props.theme.colors.fg : props.theme.colors.border};
  font-variant-numeric: tabular-nums;
`;

interface BadgeBtnProps {
  $bg: string;
  $color: string;
  $borderColor: string;
}
export const BadgeBtn = styled.button<BadgeBtnProps>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: ${props => props.theme.radius.pill};
  cursor: pointer;
  font-family: inherit;
  font-weight: 700;
  font-size: 12.5px;
  color: ${props => props.$color};
  background: ${props => props.$bg};
  border: 1px solid ${props => props.$borderColor};
  transition: all 0.3s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  }
`;

export const BadgeDot = styled.span<{ $color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.$color};
`;

export const NotesText = styled.div`
  font-size: 13px;
  color: ${props => props.theme.colors.muted};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ViewFormBtn = styled.button`
  flex-shrink: 0;
  padding: 3px 8px;
  border-radius: ${props => props.theme.radius.sm};
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.bg};
  color: ${props => props.theme.colors.green};
  font-family: inherit;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: ${props => props.theme.colors.greenLight};
    border-color: ${props => props.theme.colors.greenXLight};
  }
`;

export const SuccessBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 11px;
  margin-top: 10px;
  padding: 18px;
  border-radius: ${props => props.theme.radius.lg};
  background: ${props => props.theme.colors.greenLight};
  border: 1px dashed ${props => props.theme.colors.greenXLight};
  animation: ${kcFadeIn} 0.4s ease;
`;

export const FutureState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 60px 20px;
  text-align: center;
  animation: ${kcFadeIn} 0.3s ease;
`;

export const NoResultsState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 56px 20px;
  text-align: center;
  color: ${props => props.theme.colors.muted};
  animation: ${kcFadeIn} 0.3s ease;
`;

export const PopoverOverlay = styled.div<{ $x: number; $y: number }>`
  position: fixed;
  z-index: 8000;
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.radius.lg};
  border: 1px solid ${props => props.theme.colors.border};
  box-shadow: 0 12px 32px rgba(16, 24, 40, 0.12);
  width: 200px;
  overflow: hidden;
  left: ${props => props.$x}px;
  top: ${props => props.$y}px;
  animation: ${kcPop} 0.2s cubic-bezier(0.2, 0.8, 0.3, 1);
`;

export const PopoverItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 8px;
  border-radius: ${props => props.theme.radius.md};
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 600;
  color: ${props => props.theme.colors.fg};
  cursor: pointer;
  text-align: left;

  &:hover {
    background: ${props => props.theme.colors.bg};
  }
`;

export const PopoverItemDot = styled.span<{ $color: string }>`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: ${props => props.$color};
`;

export const PopoverReasonContainer = styled.div`
  overflow: hidden;
  animation: ${kcSlideIn} 0.25s ease;
  padding: 8px 6px 6px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PopoverInput = styled.input`
  width: 100%;
  height: 42px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radius.md};
  padding: 0 13px;
  font-family: inherit;
  font-size: 13.5px;
  outline: none;
  background: ${props => props.theme.colors.bg};
  color: ${props => props.theme.colors.fg};

  &::placeholder {
    color: ${props => props.theme.colors.muted};
  }
`;

export const PopoverSaveButton = styled.button`
  width: 100%;
  height: 38px;
  border-radius: ${props => props.theme.radius.md};
  border: none;
  background: ${props => props.theme.colors.green};
  color: ${props => props.theme.colors.white};
  font-family: inherit;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background: ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.muted};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const ToastContainer = styled.div`
  position: fixed;
  left: 50%;
  bottom: 28px;
  transform: translateX(-50%);
  z-index: 9000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  pointer-events: none;
`;

export const ToastMsg = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 13px 20px;
  border-radius: ${props => props.theme.radius.md};
  background: ${props => props.theme.colors.green};
  color: ${props => props.theme.colors.white};
  font-size: 13.5px;
  font-weight: 600;
  box-shadow: 0 18px 48px -12px rgba(0, 90, 54, 0.4);
  animation: ${kcPop} 0.28s cubic-bezier(0.2, 0.8, 0.3, 1);
  max-width: 380px;
  pointer-events: auto;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  animation: ${kcFadeIn} 0.2s ease;
`;

export const ModalContent = styled.div`
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.radius.lg};
  padding: 24px;
  width: 90%;
  max-width: 440px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  animation: ${kcPop} 0.3s cubic-bezier(0.16, 1, 0.3, 1);
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