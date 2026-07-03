import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Inter', system-ui, sans-serif;
  color: #1F2937;
`;

// --- HERO SECTION ---
const bobAnimation = keyframes`
  0%, 100% { transform: translateY(0) rotate(-4deg); }
  50% { transform: translateY(-9px) rotate(3deg); }
`;

const pulseRing = keyframes`
  0% { transform: scale(0.8); opacity: 0.7; }
  100% { transform: scale(2.5); opacity: 0; }
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
  background: radial-gradient(420px 280px at 90% 130%, rgba(255,255,255,.12), transparent 60%);
`;

export const HeroContent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
`;

export const HeroTextContainer = styled.div`
  min-width: 240px;
`;

export const HeroSubtitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: #A7E0C6;
  text-transform: uppercase;
`;

export const DateNavigator = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 6px;
`;

export const NavBtn = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

export const NavDateText = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  min-width: 130px;
  text-align: center;
  background: rgba(0, 0, 0, 0.2);
  padding: 4px 16px;
  border-radius: 20px;
`;

export const HeroTitle = styled.div`
  font-size: 27px;
  font-weight: 800;
  color: #fff;
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin-top: 6px;
`;

export const HeroLiveBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-top: 14px;
  background: rgba(255,255,255,.14);
  border: 1px solid rgba(255,255,255,.25);
  border-radius: 999px;
  padding: 8px 16px;
`;

export const PulseDotWrapper = styled.span`
  position: relative;
  width: 9px;
  height: 9px;
`;

export const PulseDotInner = styled.span`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: #FBBF24;
`;

export const PulseDotOuter = styled.span`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: #FBBF24;
  animation: ${pulseRing} 1.8s ease-out infinite;
`;

export const HeroLiveText = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  strong {
    font-weight: 800;
  }
`;

export const HeroEmojis = styled.div`
  position: relative;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  line-height: 1;
  filter: drop-shadow(0 12px 18px rgba(0,0,0,.25));

  span:nth-child(1) {
    animation: ${bobAnimation} 4s ease-in-out infinite;
  }
  span:nth-child(2) {
    animation: ${bobAnimation} 4s ease-in-out infinite 0.5s;
    margin-left: -6px;
  }
`;

// --- MENU SECTION ---
export const MenuSection = styled.section`
  background: #fff;
  border: 1px solid #E6EEE9;
  border-radius: 18px;
  box-shadow: 0 4px 18px -4px rgba(0,90,54,.06);
  padding: 22px;
`;

export const MenuHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  margin-bottom: 16px;
`;

export const MenuIconBox = styled.span`
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

export const MenuHeaderText = styled.div`
  flex: 1;
  div:first-child {
    font-weight: 800;
    font-size: 17px;
    letter-spacing: -0.01em;
  }
  div:last-child {
    font-size: 12.5px;
    color: #9CA3AF;
    font-weight: 500;
  }
`;

export const MenuTag = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: #005A36;
  background: #E6F3ED;
  border: 1px solid #C7E3D5;
  padding: 5px 12px;
  border-radius: 999px;
`;

export const EditMenuBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  font-weight: 700;
  color: #005A36;
  background: transparent;
  border: 1px solid #C7E3D5;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: #E6F3ED;
  }
`;

export const MenuTextarea = styled.textarea`
  width: 100%;
  min-height: 70px;
  font-size: 13px;
  font-weight: 500;
  color: #1F2937;
  border: 1px dashed #C7E3D5;
  border-radius: 8px;
  padding: 8px;
  margin-top: 4px;
  background: rgba(255, 255, 255, 0.7);
  outline: none;
  resize: vertical;
  &:focus {
    border-color: #005A36;
    background: #fff;
  }
`;

export const MenuActionRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
`;

export const MenuSaveBtn = styled.button`
  background: linear-gradient(135deg, #00794A, #005A36);
  color: #fff;
  font-size: 12.5px;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  padding: 7px 14px;
  cursor: pointer;
  transition: transform 0.15s;
  &:hover { transform: scale(1.03); }
`;

export const MenuCancelBtn = styled.button`
  background: #fff;
  color: #6B7280;
  font-size: 12.5px;
  font-weight: 700;
  border: 1px solid #E6EEE9;
  border-radius: 8px;
  padding: 7px 14px;
  cursor: pointer;
  &:hover { background: #F6FAF7; }
`;

export const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

export const MenuCard = styled.div<{ $bg: string; $borderColor: string }>`
  background: ${props => props.$bg};
  border: 1.5px solid ${props => props.$borderColor};
  border-radius: 15px;
  padding: 16px;
  transition: transform 0.2s, box-shadow 0.2s;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 38px -14px rgba(0,90,54,.2);
  }
`;

export const MenuCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
`;

export const MenuCardIcon = styled.span`
  flex: none;
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 19px;
  box-shadow: 0 3px 8px -3px rgba(0,0,0,.12);
`;

export const MenuCardTitle = styled.div<{ $timeColor: string }>`
  flex: 1;
  div:first-child {
    font-weight: 800;
    font-size: 14.5px;
    color: #1F2937;
  }
  div:last-child {
    font-size: 11.5px;
    font-weight: 600;
    color: ${props => props.$timeColor};
    font-variant-numeric: tabular-nums;
  }
`;

export const DishItem = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 7px;
  &:last-child {
    margin-bottom: 0;
  }
  
  span:first-child {
    flex: none;
    width: 18px;
    height: 18px;
    border-radius: 6px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
  }
  
  span:last-child {
    flex: 1;
    font-size: 13px;
    font-weight: 600;
    color: #374151;
  }
`;


// --- SPLIT CONTAINER ---
export const SplitContainer = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

// --- WEEKLY GRID ---
export const WeeklyGridSection = styled.div`
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 15px -3px rgba(0,0,0,0.06);
  padding: 24px;
  margin-bottom: 24px;
`;

export const WeeklyGridHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const WeeklyGridTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #1F2937;
`;

export const WeeklyGridTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 6px;
`;

export const WeeklyGridTh = styled.th`
  background: #F3F4F6;
  color: #4B5563;
  padding: 12px 16px;
  font-weight: 700;
  font-size: 13px;
  text-align: center;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const WeeklyGridTd = styled.td<{ $isCur?: boolean; $isDone?: boolean; $bg?: string; $border?: string }>`
  background: ${props => props.$bg || '#F9FAFB'};
  border: 1.5px solid ${props => props.$border || 'transparent'};
  border-radius: 14px;
  padding: 14px;
  vertical-align: top;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  opacity: ${props => props.$isDone ? 0.7 : 1};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px -2px rgba(0,0,0,0.06);
  }
`;

export const GridCellTime = styled.div<{ $color?: string }>`
  font-size: 12px;
  font-weight: 700;
  color: ${props => props.$color || '#6B7280'};
  margin-bottom: 4px;
`;

export const GridCellName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  line-height: 1.4;
`;

export const WeeklyThemeBadge = styled.div`
  background: #FEF3C7;
  color: #D97706;
  font-size: 13px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 12px;
  display: inline-block;
  margin-top: 12px;
`;

export const TimelineColumn = styled.div`
  position: sticky;
  top: 24px;
  background: #fff;
  border: 1px solid #E6EEE9;
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0,90,54,.06);
  padding: 20px;
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
`;

export const TimelineProgress = styled.span`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #9CA3AF;
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

export const DotNode = styled.span<{ $bg: string }>`
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


export const RightCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const SectionCard = styled.section`
  background: #fff;
  border: 1px solid #E6EEE9;
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06);
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

const slidePanel = keyframes`
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

export const AvatarNode = styled.span<{ $bg: string }>`
  flex: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.$bg};
  color: #fff;
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

export const OptionsGroup = styled.div<{ $width?: number }>`
  flex: none;
  position: relative;
  display: flex;
  background: #f1f4f1;
  border: 1px solid #e6eee9;
  border-radius: 12px;
  padding: 4px;
  width: ${props => props.$width ? `${props.$width}px` : 'auto'};
`;

export const OptionBtn = styled.button<{ $active: boolean; $activeColor: string; $activeStyle?: string }>`
  position: relative;
  z-index: 2;
  flex: 1;
  height: 30px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background: ${props => props.$active ? props.$activeColor : 'transparent'};
  color: ${props => props.$active ? '#fff' : '#6b7280'};
  transition: all 0.2s;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  ${props => props.$active ? props.$activeStyle : ''}
`;

export const ActiveHighlight = styled.span<{ $style: string }>`
  position: absolute;
  top: 4px;
  bottom: 4px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px -2px rgba(0,0,0,0.12);
  transition: all 0.2s cubic-bezier(0.2, 0.8, 0.3, 1);
  z-index: 1;
  ${props => props.$style}
`;

export const NoteBtn = styled.button<{ $hasPhoto: boolean }>`
  flex: none;
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: ${props => props.$hasPhoto ? 'none' : '1.5px dashed #C7DBCF'};
  background: ${props => props.$hasPhoto ? 'transparent' : '#F8FBF9'};
  color: #9CA3AF;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;
  &:hover {
    border-color: #005A36;
    color: #005A36;
  }
`;

export const NoteIndicator = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #FBBF24;
  box-shadow: 0 0 0 2px #fff;
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

// --- MODAL & TOASTS ---
const popAnimation = keyframes`
  from { opacity: 0; transform: scale(0.94) translateY(8px); }
  to { opacity: 1; transform: none; }
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9300;
  background: rgba(15,30,22,.5);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: ${popAnimation} 0.2s ease;
`;

export const ModalContainer = styled.div`
  width: min(460px, 100%);
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 32px 80px -20px rgba(0,0,0,.4);
  overflow: hidden;
  animation: ${popAnimation} 0.24s cubic-bezier(0.2, 0.8, 0.3, 1);
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 22px;
  border-bottom: 1px solid #EEF4F0;
`;

export const ModalTitleArea = styled.div`
  flex: 1;
  div:first-child {
    font-size: 16px;
    font-weight: 700;
  }
  div:last-child {
    font-size: 12.5px;
    color: #9CA3AF;
  }
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
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: #F6FAF7;
    color: #DC2626;
  }
`;

export const ModalBody = styled.div`
  padding: 18px 22px 22px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;


export const InputLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #9CA3AF;
  margin-bottom: 7px;
`;

export const NoteTextarea = styled.textarea`
  width: 100%;
  min-height: 92px;
  resize: vertical;
  border: 1px solid #E6EEE9;
  border-radius: 13px;
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

export const PhotoUploadBtn = styled.button`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px;
  border-radius: 13px;
  border: 1.5px dashed #C7DBCF;
  background: #F8FBF9;
  cursor: pointer;
  color: #005A36;
  transition: background 0.15s, border-color 0.15s;
  &:hover {
    background: #E6F3ED;
    border-color: #005A36;
  }
`;

export const ModalActionRow = styled.div`
  display: flex;
  gap: 9px;
  margin-top: 4px;
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
  &:hover {
    background: #F6FAF7;
  }
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
  box-shadow: 0 8px 18px -6px rgba(0,90,54,.45);
  transition: transform 0.15s;
  &:hover { transform: scale(1.02); }
  &:active { transform: scale(0.98); }
`;
