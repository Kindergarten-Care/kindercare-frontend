import styled, { keyframes } from 'styled-components';

const cardIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`;

const popIn = keyframes`
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
`;

const modalIn = keyframes`
  from { opacity: 0; transform: translateY(12px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Inter', system-ui, sans-serif;
  color: #1F2937;
`;

export const HeroSection = styled.section`
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  background: linear-gradient(120deg, #005A36 0%, #00794A 60%, #0A8A57 100%);
  box-shadow: 0 18px 44px -18px rgba(0, 90, 54, 0.5);
  padding: 28px 32px;
`;

export const HeroBgOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(420px 280px at 90% 130%, rgba(255, 255, 255, 0.12), transparent 60%);
`;

export const HeroContent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
`;

export const HeroText = styled.div`
  min-width: 240px;
`;

export const HeroSubtitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: #A7E0C6;
  text-transform: uppercase;
`;

export const HeroTitle = styled.h1`
  margin: 6px 0 0;
  font-size: 27px;
  font-weight: 800;
  color: #fff;
  line-height: 1.15;
  letter-spacing: -0.02em;
`;

export const HeroStats = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 14px;
  flex-wrap: wrap;
`;

export const HeroCount = styled.span`
  font-size: 30px;
  font-weight: 800;
  color: #fff;
  line-height: 1;
`;

export const HeroCountLabel = styled.span`
  font-size: 12.5px;
  color: #CDEBDC;
  font-weight: 600;
`;

export const HeroDivider = styled.span`
  width: 1px;
  height: 30px;
  background: rgba(255, 255, 255, 0.25);
`;

export const HeroWeekLabel = styled.span`
  font-size: 13.5px;
  color: #E2F3EA;
  font-weight: 600;
`;

export const ProgressTrack = styled.div`
  height: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
  margin-top: 14px;
  max-width: 360px;
  overflow: hidden;
`;

export const ProgressFill = styled.span<{ $pct: number }>`
  display: block;
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: #FBBF24;
  border-radius: 999px;
  transition: width 0.5s ease;
`;

export const HeroActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: none;
`;

export const PrimaryBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  height: 48px;
  padding: 0 22px;
  border-radius: 14px;
  border: none;
  background: #fff;
  color: #005A36;
  font-family: inherit;
  font-weight: 800;
  font-size: 14.5px;
  cursor: pointer;
  box-shadow: 0 10px 24px -10px rgba(0, 0, 0, 0.4);
  transition: transform 0.15s;

  &:hover { transform: scale(1.03); }
  &:active { transform: scale(0.97); }
`;

export const SecondaryBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 44px;
  padding: 0 18px;
  border-radius: 13px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  font-family: inherit;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.15s;

  &:hover { background: rgba(255, 255, 255, 0.22); }
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const WeekNav = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  border: 1px solid #E6EEE9;
  border-radius: 13px;
  padding: 7px;
  box-shadow: 0 4px 18px -8px rgba(0, 90, 54, 0.08);
`;

export const WeekNavBtn = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 9px;
  border: none;
  background: #F1F4F1;
  color: #6B7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;

  &:hover {
    background: #E6F3ED;
    color: #005A36;
  }
`;

export const WeekNavLabel = styled.span`
  font-weight: 700;
  font-size: 13.5px;
  color: #1F2937;
  min-width: 120px;
  text-align: center;
`;

export const ToolbarSpacer = styled.div`
  flex: 1;
`;

export const LegendRow = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  flex-wrap: wrap;
`;

export const LegendChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #4B5563;
  background: #fff;
  border: 1px solid #E6EEE9;
  padding: 5px 11px;
  border-radius: 999px;
`;

export const LegendDot = styled.span<{ $color: string }>`
  width: 9px;
  height: 9px;
  border-radius: 3px;
  background: ${({ $color }) => $color};
`;

export const BoardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;
  align-items: start;

  @media (max-width: 1100px) {
    overflow-x: auto;
    min-width: 920px;
  }

  @media (max-width: 760px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const DayCol = styled.div<{ $isToday?: boolean }>`
  background: ${({ $isToday }) => ($isToday ? '#F1F8F3' : '#fff')};
  border: 1px solid ${({ $isToday }) => ($isToday ? '#C7E3D5' : '#E6EEE9')};
  border-radius: 16px;
  box-shadow: 0 4px 18px -8px rgba(0, 90, 54, 0.08);
  padding: 16px 13px;
`;

export const DayColHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 2px 12px;
`;

export const DayName = styled.div<{ $isToday?: boolean }>`
  font-weight: 800;
  font-size: 15px;
  color: ${({ $isToday }) => ($isToday ? '#005A36' : '#1F2937')};
`;

export const DayDate = styled.div`
  font-size: 11.5px;
  color: #9CA3AF;
  font-weight: 500;
`;

export const TodayTag = styled.span`
  font-size: 10px;
  font-weight: 800;
  color: #fff;
  background: #005A36;
  padding: 3px 8px;
  border-radius: 7px;
`;

export const LessonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const LessonCard = styled.div<{ $done?: boolean; $accent: string }>`
  background: #fff;
  border: 1px solid ${({ $done }) => ($done ? '#C7E3D5' : '#EEF4F0')};
  border-left: 3px solid ${({ $accent }) => $accent};
  border-radius: 13px;
  padding: 13px;
  cursor: default;
  animation: ${cardIn} 0.25s ease;
  transition: transform 0.18s, box-shadow 0.18s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 26px -12px rgba(0, 90, 54, 0.22);
  }
`;

export const LessonTop = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

export const LessonIcon = styled.span<{ $tint: string; $color: string }>`
  flex: none;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: ${({ $tint }) => $tint};
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`;

export const LessonSubject = styled.span<{ $color: string }>`
  flex: 1;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: ${({ $color }) => $color};
`;

export const LessonTime = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #9CA3AF;
  font-variant-numeric: tabular-nums;
`;

export const LessonTitle = styled.div`
  font-size: 13.5px;
  font-weight: 700;
  color: #1F2937;
  line-height: 1.35;
`;

export const LessonNote = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
  line-height: 1.45;
`;

export const LessonActions = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  margin-top: 11px;
`;

export const StatusBtn = styled.button<{ $done?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 26px;
  padding: 0 10px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-weight: 700;
  font-size: 11px;
  background: ${({ $done }) => ($done ? '#E6F3ED' : '#FEF3C7')};
  color: ${({ $done }) => ($done ? '#005A36' : '#B45309')};
`;

export const ActionSpacer = styled.div`
  flex: 1;
`;

export const IconBtn = styled.button<{ $danger?: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: 1px solid ${({ $danger }) => ($danger ? '#FECDD3' : '#E6EEE9')};
  background: #fff;
  color: ${({ $danger }) => ($danger ? '#DC2626' : '#6B7280')};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;

  &:hover {
    background: ${({ $danger }) => ($danger ? '#FEE2E2' : '#F6FAF7')};
    color: ${({ $danger }) => ($danger ? '#DC2626' : '#005A36')};
  }
`;

export const AddLessonBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  height: 42px;
  border-radius: 12px;
  border: 1.5px dashed #D7E2DB;
  background: #fff;
  color: #9CA3AF;
  font-family: inherit;
  font-weight: 700;
  font-size: 12.5px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: #005A36;
    color: #005A36;
    background: #F6FAF7;
  }
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9300;
  background: rgba(15, 30, 22, 0.5);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: ${popIn} 0.2s ease;
`;

export const ModalBox = styled.div`
  width: min(500px, 100%);
  max-height: 92vh;
  overflow: auto;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 32px 80px -20px rgba(0, 0, 0, 0.4);
  animation: ${modalIn} 0.24s cubic-bezier(0.2, 0.8, 0.3, 1);
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 22px;
  border-bottom: 1px solid #EEF4F0;
`;

export const ModalIcon = styled.span`
  flex: none;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: #E6F3ED;
  color: #005A36;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalTitle = styled.div`
  flex: 1;
  font-size: 17px;
  font-weight: 700;
`;

export const ModalSubtitle = styled.div`
  font-size: 12.5px;
  color: #9CA3AF;
`;

export const ModalCloseBtn = styled.button`
  flex: none;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid #E6EEE9;
  background: #fff;
  color: #6B7280;
  font-size: 17px;
  cursor: pointer;

  &:hover {
    background: #F6FAF7;
    color: #DC2626;
  }
`;

export const ModalBody = styled.div`
  padding: 18px 22px 22px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const FieldLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #9CA3AF;
  margin-bottom: 7px;
`;

export const SubjectGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const SubjectBtn = styled.button<{ $active?: boolean; $color: string; $tint: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  padding: 0 13px;
  border-radius: 10px;
  border: 1px solid ${({ $active, $color }) => ($active ? $color : '#E6EEE9')};
  background: ${({ $active, $tint }) => ($active ? $tint : '#fff')};
  color: ${({ $active, $color }) => ($active ? $color : '#6B7280')};
  font-family: inherit;
  font-weight: 700;
  font-size: 12.5px;
  cursor: pointer;
  transition: all 0.15s;
`;

export const TextInput = styled.input`
  width: 100%;
  height: 46px;
  border: 1px solid #E6EEE9;
  border-radius: 12px;
  padding: 0 14px;
  font-family: inherit;
  font-size: 14px;
  color: #1F2937;
  outline: none;
  background: #F8FBF9;

  &:focus {
    border-color: #005A36;
    background: #fff;
  }
`;

export const TimeRow = styled.div`
  display: flex;
  gap: 12px;
`;

export const TimeField = styled.div`
  flex: none;
  width: 140px;
`;

export const DayField = styled.div`
  flex: 1;
`;

export const DayBtnRow = styled.div`
  display: flex;
  gap: 5px;
`;

export const DayBtn = styled.button<{ $active?: boolean }>`
  flex: 1;
  height: 46px;
  border-radius: 11px;
  border: 1px solid ${({ $active }) => ($active ? '#005A36' : '#E6EEE9')};
  background: ${({ $active }) => ($active ? '#005A36' : '#fff')};
  color: ${({ $active }) => ($active ? '#fff' : '#6B7280')};
  font-family: inherit;
  font-weight: 700;
  font-size: 12.5px;
  cursor: pointer;
  transition: all 0.15s;
`;

export const NoteTextarea = styled.textarea`
  width: 100%;
  min-height: 80px;
  resize: vertical;
  border: 1px solid #E6EEE9;
  border-radius: 12px;
  padding: 12px 14px;
  font-family: inherit;
  font-size: 13.5px;
  color: #1F2937;
  outline: none;
  background: #F8FBF9;
  line-height: 1.5;

  &:focus {
    border-color: #005A36;
    background: #fff;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  gap: 9px;
`;

export const CancelBtn = styled.button`
  flex: none;
  height: 46px;
  padding: 0 18px;
  border-radius: 12px;
  border: 1px solid #E6EEE9;
  background: #fff;
  color: #6B7280;
  font-family: inherit;
  font-weight: 700;
  font-size: 13.5px;
  cursor: pointer;

  &:hover { background: #F6FAF7; }
`;

export const SaveBtn = styled.button`
  flex: 1;
  height: 46px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #00794A, #005A36);
  color: #fff;
  font-family: inherit;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 8px 18px -6px rgba(0, 90, 54, 0.45);
  transition: transform 0.15s;

  &:hover { transform: scale(1.02); }
  &:active { transform: scale(0.98); }
`;

export const ToastStack = styled.div`
  position: fixed;
  left: 50%;
  bottom: 28px;
  transform: translateX(-50%);
  z-index: 9500;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  pointer-events: none;
`;

export const ToastItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 13px 20px;
  border-radius: 13px;
  background: #005A36;
  color: #fff;
  font-size: 13.5px;
  font-weight: 600;
  box-shadow: 0 18px 48px -12px rgba(0, 90, 54, 0.4);
  animation: ${popIn} 0.28s cubic-bezier(0.2, 0.8, 0.3, 1);
  max-width: 380px;
`;

// =================================================
// Modal "rich" - form soạn giáo án chi tiết
// =================================================

export const ModalWideBox = styled.div`
  width: min(680px, 100%);
  max-height: 92vh;
  overflow: auto;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 32px 80px -20px rgba(0, 0, 0, 0.4);
  animation: ${modalIn} 0.24s cubic-bezier(0.2, 0.8, 0.3, 1);
`;

export const ModalWideHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 22px;
  border-bottom: 1px solid #EEF4F0;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 1;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 88px;
  resize: vertical;
  border: 1px solid #E6EEE9;
  border-radius: 12px;
  padding: 12px 14px;
  font-family: inherit;
  font-size: 13.5px;
  color: #1F2937;
  outline: none;
  background: #F8FBF9;
  line-height: 1.55;

  &:focus {
    border-color: #005A36;
    background: #fff;
  }

  &::placeholder {
    color: #B7C2BD;
  }
`;

// =================================================
// Status Badge + Workflow controls
// =================================================

export const StatusBadge = styled.span<{ $color: string; $bg: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 30px;
  padding: 0 12px;
  border-radius: 999px;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
`;

export const StatusDot = styled.span<{ $color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: ${({ $color }) => $color};
`;

export const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const FilterChip = styled.button<{ $active?: boolean }>`
  height: 32px;
  padding: 0 13px;
  border-radius: 999px;
  border: 1px solid ${({ $active }) => ($active ? '#005A36' : '#E6EEE9')};
  background: ${({ $active }) => ($active ? '#E6F3ED' : '#fff')};
  color: ${({ $active }) => ($active ? '#005A36' : '#6B7280')};
  font-family: inherit;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: #005A36;
    color: #005A36;
  }
`;

export const SubmitBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 0 20px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #00794A, #005A36);
  color: #fff;
  font-family: inherit;
  font-weight: 700;
  font-size: 13.5px;
  cursor: pointer;
  box-shadow: 0 8px 18px -6px rgba(0, 90, 54, 0.45);
  transition: transform 0.15s;

  &:hover { transform: scale(1.03); }
  &:active { transform: scale(0.97); }
`;

export const WithdrawBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 0 20px;
  border-radius: 12px;
  border: 1px solid #FECDD3;
  background: #FFF1F2;
  color: #BE123C;
  font-family: inherit;
  font-weight: 700;
  font-size: 13.5px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover { background: #FFE4E6; }
`;

export const ReviewNote = styled.div`
  padding: 13px 16px;
  border-radius: 12px;
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  color: #92400E;
  font-size: 13px;
  line-height: 1.5;
  margin-top: 4px;

  & strong {
    color: #78350F;
    margin-right: 6px;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 24px;
  background: #fff;
  border: 2px dashed #D7E2DB;
  border-radius: 18px;
  color: #6B7280;

  & h3 {
    color: #1F2937;
    font-size: 17px;
    margin: 0 0 6px;
  }

  & p {
    font-size: 13.5px;
    margin: 0 0 14px;
  }
`;

export const ReadOnlyBanner = styled.div`
  padding: 10px 14px;
  border-radius: 10px;
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  color: #92400E;
  font-size: 12.5px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
`;
