import styled, { keyframes } from 'styled-components';

export const WidgetContainer = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radius.xl};
  padding: 24px;
  display: flex;
  flex-direction: column;
  box-shadow: ${props => props.theme.shadows.soft};
  height: 100%;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 4px;
    background: linear-gradient(90deg, ${props => props.theme.colors.amberMid}, ${props => props.theme.colors.greenMid});
  }
`;

export const WidgetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.radius.lg};
  background: ${props => props.theme.colors.amberLight};
  color: ${props => props.theme.colors.amberMid};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const WidgetTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: ${props => props.theme.colors.fg};
`;

export const WidgetSubtitle = styled.span`
  font-size: 12px;
  color: ${props => props.theme.colors.muted};
  font-weight: 500;
`;

export const ProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 16px;
`;

export const ProgressCircle = styled.div<{ $percent: number }>`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: conic-gradient(
    ${props => props.theme.colors.greenMid} ${props => props.$percent}%,
    ${props => props.theme.colors.greenXLight} ${props => props.$percent}% 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 90px;
    height: 90px;
    background: ${props => props.theme.colors.surface};
    border-radius: 50%;
  }
`;

export const ProgressContent = styled.div`
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProgressValue = styled.span`
  font-size: 24px;
  font-weight: 800;
  color: ${props => props.theme.colors.greenDark};
  line-height: 1;
`;

export const ProgressLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${props => props.theme.colors.muted};
  margin-top: 4px;
`;

export const ActionButton = styled.button`
  margin-top: auto;
  width: 100%;
  padding: 12px;
  background: ${props => props.theme.colors.greenMid};
  color: white;
  border: none;
  border-radius: ${props => props.theme.radius.md};
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;

  &:hover {
    background: ${props => props.theme.colors.greenDark};
    transform: translateY(-2px);
  }
`;

// --- MODAL STYLES ---

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  background: ${props => props.theme.colors.surface};
  width: 95%;
  max-width: 1000px;
  height: 85vh;
  border-radius: ${props => props.theme.radius.xl};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3);
  position: relative;
`;

export const ModalHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${props => props.theme.colors.amberLight};
`;

export const ModalTitleInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: ${props => props.theme.colors.amberMid};
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ModalSubtitle = styled.span`
  font-size: 14px;
  color: ${props => props.theme.colors.amber};
  font-weight: 500;
  margin-top: 4px;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const BatchAwardButton = styled.button`
  padding: 10px 20px;
  background: linear-gradient(135deg, ${props => props.theme.colors.amberMid}, ${props => props.theme.colors.amber});
  color: white;
  border: none;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 6px 16px rgba(245, 158, 11, 0.4);
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }
`;

export const CloseButton = styled.button`
  background: white;
  border: 1px solid ${props => props.theme.colors.border};
  font-size: 16px;
  color: ${props => props.theme.colors.fg};
  cursor: pointer;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.theme.colors.bg};
    color: #E11D48;
  }
`;

export const ModalBody = styled.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
  background: ${props => props.theme.colors.bg};
`;

export const SectionTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 15px;
  font-weight: 700;
  color: ${props => props.theme.colors.fg};
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    background: ${props => props.theme.colors.amberLight};
    color: ${props => props.theme.colors.amberMid};
    padding: 2px 8px;
    border-radius: 9999px;
    font-size: 12px;
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

// 3D TILT CARD

export const CardWrapper = styled.div`
  perspective: 1000px;
  width: 100%;
`;

export const TiltCardInner = styled.div<{ $isAwarded: boolean }>`
  background: ${props => props.$isAwarded ? props.theme.colors.amberLight : props.theme.colors.surface};
  border: 2px solid ${props => props.$isAwarded ? props.theme.colors.amberMid : props.theme.colors.border};
  border-radius: ${props => props.theme.radius.lg};
  padding: 16px;
  display: flex;
  flex-direction: column;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
  transform-style: preserve-3d;
  box-shadow: ${props => props.$isAwarded ? '0 10px 25px -5px rgba(245, 158, 11, 0.15)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)'};
  position: relative;
  overflow: visible;

  &:hover {
    z-index: 10;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  transform: translateZ(20px);
`;

export const Avatar = styled.div<{ $bg: string }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${props => props.$bg};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 800;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
`;

export const StudentName = styled.h4`
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: ${props => props.theme.colors.fg};
`;

export const EligibilityTag = styled.div<{ $eligible: boolean }>`
  font-size: 11px;
  font-weight: 600;
  color: ${props => props.$eligible ? props.theme.colors.greenDark : props.theme.colors.redDark};
  background: ${props => props.$eligible ? props.theme.colors.greenLight : props.theme.colors.redLight};
  padding: 2px 8px;
  border-radius: 4px;
  margin-top: 4px;
  display: inline-block;
`;

export const AwardBadge = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  width: 32px;
  height: 32px;
  background: ${props => props.theme.colors.amberMid};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  box-shadow: 0 4px 8px rgba(245, 158, 11, 0.3);
  transform: translateZ(30px);
  border: 2px solid white;
  z-index: 5;
`;

export const CardBody = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transform: translateZ(15px);
`;

export const CriteriaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: ${props => props.theme.colors.muted};
`;

export const CriteriaLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ProgressBarBg = styled.div`
  width: 100px;
  height: 6px;
  background: ${props => props.theme.colors.border};
  border-radius: 3px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div<{ $percent: number, $color: string }>`
  height: 100%;
  width: ${props => props.$percent}%;
  background: ${props => props.$color};
  border-radius: 3px;
`;

export const QuickPraiseBox = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px dashed ${props => props.theme.colors.border};
  transform: translateZ(25px);
`;

export const QuickPraiseTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.theme.colors.muted};
  margin-bottom: 8px;
`;

export const ChipGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const PraiseChip = styled.button<{ $active: boolean }>`
  background: ${props => props.$active ? props.theme.colors.greenLight : props.theme.colors.bg};
  color: ${props => props.$active ? props.theme.colors.greenDark : props.theme.colors.muted};
  border: 1px solid ${props => props.$active ? props.theme.colors.greenMid : props.theme.colors.border};
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.$active ? props.theme.colors.greenXLight : '#F1F5F9'};
  }
`;

// CONFETTI LAYER OVERLAY
export const ConfettiContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 10000;
  overflow: hidden;
`;

const fall = keyframes`
  0% { transform: translateY(-50px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
`;

export const ConfettiPiece = styled.div<{ $x: number, $color: string, $delay: number, $duration: number }>`
  position: absolute;
  top: -20px;
  left: ${props => props.$x}%;
  width: 10px;
  height: 20px;
  background: ${props => props.$color};
  opacity: 0;
  animation: ${fall} ${props => props.$duration}s ease-in forwards;
  animation-delay: ${props => props.$delay}s;
  border-radius: 2px;
`;
