import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
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
  grid-template-columns: 340px 1fr;
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
    background: #f6faf7;
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

export const OptionsGroup = styled.div`
  flex: none;
  position: relative;
  display: flex;
  background: #f1f4f1;
  border: 1px solid #e6eee9;
  border-radius: 12px;
  padding: 4px;
  gap: 4px;
`;

export const OptionBtn = styled.button<{ $active: boolean; $activeColor: string }>`
  position: relative;
  z-index: 2;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background: ${props => props.$active ? props.$activeColor : 'transparent'};
  color: ${props => props.$active ? '#fff' : '#6b7280'};
  transition: all 0.2s;
  font-family: inherit;
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
