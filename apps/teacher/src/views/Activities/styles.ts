import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: -24px; /* Phủ kín layout */
  padding: 24px 40px 44px;
  min-height: calc(100vh - 80px); /* Chiều cao trừ đi header */
  background: #eff6f1;
  font-family: 'Inter', system-ui, sans-serif;
`;

export const TopHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

export const HeaderSubtitle = styled.div`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: #9ca3af;
`;

export const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -0.03em;
  margin-top: 4px;
  color: #1f2937;
`;

export const CurrentStatusBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid #e6eee9;
  border-radius: 11px;
  padding: 9px 16px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06);
`;

export const DotPulse = styled.span`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #005a36;
  box-shadow: 0 0 0 3px rgba(0, 90, 54, 0.15);
`;

export const StatusText = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #374151;

  strong {
    color: #005a36;
    font-weight: 700;
  }
`;

export const SplitContainer = styled.div`
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 18px;
  align-items: start;

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

// --- LEFT COLUMN: TIMELINE ---

export const TimelineColumn = styled.div`
  position: sticky;
  top: 24px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(16px);
  border: 1px solid #e6eee9;
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
  padding: 20px;
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  
  /* Tùy chỉnh thanh cuộn cho mượt mà */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cfe0d6;
    border-radius: 6px;
  }
`;

export const TimelineHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const TimelineTitle = styled.span`
  font-weight: 700;
  font-size: 16px;
  color: #1f2937;
`;

export const TimelineProgress = styled.span`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #9ca3af;
`;

export const TimelineList = styled.div`
  position: relative;
`;

export const TimelineItemWrapper = styled.div`
  position: relative;
  display: flex;
  gap: 14px;
  padding-bottom: 12px;
`;

export const TimelineDotCol = styled.div`
  flex: none;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 14px;
`;

export const DotNode = styled.span<{ $bg: string; $isCur?: boolean }>`
  position: relative;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: ${props => props.$bg};
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const VerticalLine = styled.span`
  position: absolute;
  top: 21px;
  bottom: -12px;
  width: 2px;
  background: #e6eee9;
`;

export const TimelineCard = styled.button<{ $bg: string; $borderColor: string; $isDone?: boolean; $isCur?: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 10px 12px;
  border-radius: 14px;
  border: 1.5px solid ${props => props.$borderColor};
  background: ${props => props.$bg};
  cursor: pointer;
  opacity: ${props => props.$isDone ? 0.62 : 1};
  transition: all 0.25s;
  text-align: left;
  outline: none;

  ${props => props.$isCur && `
    transform: scale(1.02);
    box-shadow: 0 0 0 2px ${props.$borderColor}, 0 8px 20px -8px rgba(0,90,54,.3);
  `}

  &:hover {
    background: #f6faf7;
  }
`;

export const TimelineIconBox = styled.span<{ $color: string; $bg: string }>`
  flex: none;
  width: 38px;
  height: 38px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$color};
  background: ${props => props.$bg};
`;

export const TimelineCardContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const TimelineTimeText = styled.div<{ $color: string }>`
  font-size: 13px;
  font-weight: 700;
  color: ${props => props.$color};
  font-variant-numeric: tabular-nums;
`;

export const TimelineNameText = styled.div<{ $color: string }>`
  font-size: 13.5px;
  font-weight: 600;
  color: ${props => props.$color};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TimelineDoneIcon = styled.span`
  flex: none;
  color: #005a36;
  display: flex;
`;

export const TimelineLiveBadge = styled.span`
  flex: none;
  font-size: 10px;
  font-weight: 700;
  color: #fff;
  background: #005a36;
  padding: 3px 8px;
  border-radius: 7px;
`;


// --- RIGHT COLUMN: LOGGING & MATRIX ---

export const RightCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const SectionCard = styled.section`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(16px);
  border: 1px solid #e6eee9;
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
  padding: 22px;
`;

export const MatrixHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

export const MatrixIconBox = styled.span<{ $color: string; $bg: string }>`
  flex: none;
  width: 46px;
  height: 46px;
  border-radius: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$color};
  background: ${props => props.$bg};
  font-size: 22px;
`;

export const MatrixTitleArea = styled.div`
  flex: 1;
  min-width: 0;
`;

export const MatrixTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: #1f2937;
`;

export const MatrixDesc = styled.div`
  font-size: 13px;
  color: #6b7280;
`;

export const BatchBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 0 18px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #00794a, #005a36);
  color: #fff;
  font-family: inherit;
  font-weight: 700;
  font-size: 13.5px;
  cursor: pointer;
  box-shadow: 0 8px 18px -6px rgba(0, 90, 54, 0.45);
  transition: transform 0.15s;

  &:hover {
    transform: scale(1.03);
  }
  &:active {
    transform: scale(0.97);
  }
`;

export const slidePanel = keyframes`
  from { opacity: 0; transform: translateX(14px); }
  to { opacity: 1; transform: none; }
`;

export const MatrixList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  animation: ${slidePanel} 0.3s ease;
`;

export const MatrixRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 9px 12px;
  border-radius: 13px;
  transition: background 0.2s;

  &:hover {
    background: #f6faf7 !important;
  }
`;

export const AvatarNode = styled.span<{ $bg: string; $imgUrl?: string }>`
  flex: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.$imgUrl ? `url('${props.$imgUrl}') center/cover no-repeat` : props.$bg};
  color: ${props => props.$imgUrl ? 'transparent' : '#fff'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
`;

export const StudentNameNode = styled.span`
  flex: 1;
  min-width: 0;
  font-weight: 600;
  font-size: 14px;
  color: #1f2937;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const EditNoteBtn = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ $active }) => $active ? '#f59e0b' : '#9ca3af'};
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  margin-left: 8px;

  &:hover {
    color: #f59e0b;
    background: #fef3c7;
  }
`;

export const NoteAccordion = styled.div<{ $expanded: boolean }>`
  display: grid;
  grid-template-rows: ${({ $expanded }) => $expanded ? '1fr' : '0fr'};
  transition: grid-template-rows 0.3s ease;
  overflow: hidden;
  background: #f9fafb;
  border-radius: 0 0 12px 12px;
`;

export const AccordionContent = styled.div`
  min-height: 0;
  padding: 0 16px;
  display: flex;
  flex-direction: column;

  /* This extra wrapper handles the padding animation gracefully */
  > div {
    padding: 16px 0;
    border-top: 1px dashed #e5e7eb;
    display: flex;
    gap: 16px;
  }
`;

export const NoteTextarea = styled.textarea`
  flex: 1;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 12px;
  font-family: inherit;
  font-size: 0.9rem;
  resize: none;
  min-height: 80px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #f59e0b;
  }
`;

export const PhotoUploadBox = styled.label`
  width: 100px;
  height: 100px;
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  color: #6b7280;
  transition: all 0.2s;
  background: #fff;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #f59e0b;
    color: #f59e0b;
    background: #fef3c7;
  }

  input {
    display: none;
  }
`;

export const PhotoPreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

export const OptionsGroup = styled.div<{ $width?: string }>`
  flex: none;
  position: relative;
  display: flex;
  background: #f1f4f1;
  border: 1px solid #e6eee9;
  border-radius: 12px;
  padding: 4px;
  width: ${props => props.$width}px;
`;

export const OptionBtn = styled.button<{ $active: boolean }>`
  position: relative;
  z-index: 2;
  flex: 1;
  padding: 8px 0;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background: transparent;
  color: #6b7280;
  transition: all 0.2s;
  font-family: inherit;
  text-align: center;

  ${props => props.$active && `
    color: #1f2937;
  `}
  
  &:hover {
    color: #1f2937;
  }
`;

export const ActiveHighlight = styled.span<{ $index: number; $total: number; $color: string }>`
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: calc(4px + ${props => (props.$index / props.$total) * 100}%);
  width: calc(100% / ${props => props.$total} - 8px);
  background: #fff;
  border-radius: 9px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.04);
  border: 1px solid #e5e7eb;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
  opacity: ${props => props.$index >= 0 ? 1 : 0};
`;

export const EmptyMatrixCard = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 20px;
  border-radius: 14px;
  background: #f4f8f5;
  border: 1px dashed #c7dbcf;
  animation: ${slidePanel} 0.3s ease;
`;

export const EmptyMatrixTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #1f2937;
`;

export const EmptyMatrixDesc = styled.div`
  font-size: 13px;
  color: #6b7280;
  margin-top: 2px;
`;

// --- LESSON LOG SECTION ---

export const LessonHeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 14px;
`;

export const LessonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const LessonCard = styled.div<{ $bg: string; $borderColor: string }>`
  position: relative;
  overflow: hidden;
  background: ${props => props.$bg};
  border: 1px solid ${props => props.$borderColor};
  border-radius: 16px;
  padding: 18px;
  min-height: 128px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const LessonWatermark = styled.span<{ $color: string }>`
  position: absolute;
  right: -12px;
  top: -12px;
  color: ${props => props.$color};
  opacity: 0.5;
`;

export const LessonSubject = styled.div<{ $color: string }>`
  position: relative;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${props => props.$color};
`;

export const LessonTitle = styled.div`
  position: relative;
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  margin-top: 4px;
  line-height: 1.3;
`;

export const LessonNote = styled.div`
  position: relative;
  font-size: 12.5px;
  color: #6b7280;
  margin-top: 4px;
`;

// --- TOAST NOTIFICATIONS ---

export const toastin = keyframes`
  0% { transform: translateY(100%) scale(0.9); opacity: 0; }
  100% { transform: translateY(0) scale(1); opacity: 1; }
`;

export const ToastContainer = styled.div`
  position: fixed;
  bottom: 32px;
  right: 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 9999;
  pointer-events: none;
`;

export const ToastMsg = styled.div`
  background: rgba(31, 41, 55, 0.95);
  backdrop-filter: blur(12px);
  color: #fff;
  padding: 14px 20px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  animation: ${toastin} 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

// --- MENU SECTION ---

export const MenuSection = styled.div`
  margin-bottom: 24px;
  background: #fdfbf7;
  border: 1px solid #f0ead6;
  border-radius: 14px;
  padding: 16px 20px;
  box-shadow: 0 2px 8px -2px rgba(217, 119, 6, 0.05);
`;

export const MenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`;

export const MenuTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #92400e;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const EditMenuBtn = styled.button`
  background: #fff;
  border: 1px solid #d97706;
  color: #d97706;
  font-weight: 600;
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #fef3c7;
  }
`;

export const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const MenuMealBox = styled.div`
  background: #fff;
  border: 1px dashed #fcd34d;
  border-radius: 10px;
  padding: 10px 12px;
`;

export const MenuMealLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: #b45309;
  text-transform: uppercase;
  margin-bottom: 4px;
`;

export const MenuMealText = styled.div`
  font-size: 13.5px;
  color: #4b5563;
  line-height: 1.4;
`;

export const MenuInput = styled.textarea`
  width: 100%;
  border: 1px solid #fde68a;
  border-radius: 6px;
  padding: 8px;
  font-size: 13.5px;
  font-family: inherit;
  color: #1f2937;
  resize: vertical;
  min-height: 60px;
  background: #fffbeb;

  &:focus {
    outline: none;
    border-color: #f59e0b;
    background: #fff;
  }
`;
