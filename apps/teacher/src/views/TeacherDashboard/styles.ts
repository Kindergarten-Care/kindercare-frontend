import styled, { keyframes, css } from 'styled-components';

export const kcPop = keyframes`
  from { opacity: 0; transform: scale(0.94) translateY(8px); }
  to { opacity: 1; transform: none; }
`;

export const pulseRing = keyframes`
  0% { transform: scale(0.8); opacity: 0.7; }
  100% { transform: scale(2.4); opacity: 0; }
`;

export const ring = keyframes`
  0%, 70%, 100% { transform: rotate(0); }
  75% { transform: rotate(12deg); }
  82% { transform: rotate(-9deg); }
  88% { transform: rotate(5deg); }
`;

export const laserSweep = keyframes`
  0% { top: 0%; }
  50% { top: 100%; }
  100% { top: 0%; }
`;

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  animation: ${kcPop} 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  box-sizing: border-box;
  font-family: ${props => props.theme.fonts.body};
`;

export const GreetingHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
`;

export const HeaderLeft = styled.div`
  flex: 1;
  min-width: 240px;
`;

export const GreetingTitle = styled.h1`
  font-size: 32px;
  font-weight: 800;
  color: ${props => props.theme.colors.fg};
  letter-spacing: -0.03em;
  margin: 0;
  font-family: ${props => props.theme.fonts.display};
`;

export const GreetingSubtitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
  color: ${props => props.theme.colors.muted};
  font-size: 14px;
  font-weight: 500;
`;

export const CalendarIcon = styled.span`
  display: flex;
  width: 17px;
  height: 17px;
  color: ${props => props.theme.colors.green};
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
`;

export const DropdownWrapper = styled.div`
  position: relative;
`;

export const PrimaryActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 9px;
  height: 50px;
  padding: 0 22px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(135deg, ${props => props.theme.colors.greenMid}, ${props => props.theme.colors.green});
  color: ${props => props.theme.colors.white};
  font-family: inherit;
  font-weight: 700;
  font-size: 14.5px;
  cursor: pointer;
  box-shadow: 0 8px 18px -6px rgba(0, 90, 54, 0.45);
  transition: transform 0.15s;

  &:hover {
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.97);
  }
`;

export const QuickActionsMenu = styled.div`
  position: absolute;
  top: 58px;
  right: 0;
  width: 248px;
  background: ${props => props.theme.colors.surface};
  border-radius: 16px;
  border: 1px solid ${props => props.theme.colors.border};
  box-shadow: ${props => props.theme.shadows.lg};
  padding: 7px;
  z-index: 60;
  animation: ${kcPop} 0.18s ease;
`;

export const MenuItemButton = styled.button<{ $tint: string; $color: string }>`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 11px 12px;
  border-radius: 11px;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s;

  &:hover {
    background: #F1F4F1;
  }
`;

export const MenuItemIcon = styled.span<{ $tint: string; $color: string }>`
  flex: none;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$color};
  background: ${props => props.$tint};
`;

export const MenuItemLabel = styled.span`
  font-size: 13.5px;
  font-weight: 600;
  color: ${props => props.theme.colors.fg};
`;

export const NotifIconButton = styled.button`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 14px;
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.surface};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.fg};
  cursor: pointer;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06);
  transition: transform 0.15s;

  &:hover {
    transform: scale(1.04);
  }
`;

export const NotifIconWrapper = styled.span`
  display: flex;
  width: 21px;
  height: 21px;
  animation: ${ring} 4s ease infinite;
`;

export const RedIndicator = styled.span`
  position: absolute;
  top: 11px;
  right: 13px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #DC2626;
  box-shadow: 0 0 0 2px ${props => props.theme.colors.white};
`;

export const NotifMenu = styled.div`
  position: absolute;
  top: 58px;
  right: 0;
  width: 300px;
  background: ${props => props.theme.colors.surface};
  border-radius: 16px;
  border: 1px solid ${props => props.theme.colors.border};
  box-shadow: ${props => props.theme.shadows.lg};
  padding: 8px;
  z-index: 60;
  animation: ${kcPop} 0.18s ease;
`;

export const NotifMenuTitle = styled.div`
  font-family: ${props => props.theme.fonts.display};
  padding: 8px 10px;
  font-weight: 700;
  font-size: 14px;
  color: ${props => props.theme.colors.fg};
`;

export const NotifItem = styled.div`
  display: flex;
  gap: 11px;
  padding: 10px;
  border-radius: 11px;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #F1F4F1;
  }
`;

export const NotifItemIcon = styled.span<{ $bg: string; $color: string }>`
  flex: none;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: ${props => props.$bg};
  color: ${props => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

export const NotifContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NotifText = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${props => props.theme.colors.fg};
`;

export const NotifTime = styled.div`
  font-size: 11.5px;
  color: ${props => props.theme.colors.muted};
  margin-top: 2px;
`;

export const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  width: 100%;

  @media (max-width: 1180px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const GridCol2Span = styled.div`
  grid-column: span 2;

  @media (max-width: 720px) {
    grid-column: auto;
  }
`;

export const GridCol1Span = styled.div`
  grid-column: span 1;

  @media (max-width: 720px) {
    grid-column: auto;
  }
`;

export const GridRow2Span = styled.div`
  grid-row: span 2;

  @media (max-width: 720px) {
    grid-row: auto;
  }
`;

export const QuickActionsColumn = styled.div`
  grid-column: span 1;
  grid-row: span 2;
  display: flex;
  flex-direction: column;
  gap: 14px;

  @media (max-width: 720px) {
    grid-column: auto;
    grid-row: auto;
  }
`;

export const ActionTile = styled.button`
  flex: 1;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 18px;
  box-shadow: ${props => props.theme.shadows.soft};
  padding: 18px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  text-align: left;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s;
  width: 100%;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 18px 48px -12px rgba(0, 90, 54, 0.16), 0 6px 16px -6px rgba(0, 0, 0, 0.06);
  }
`;

export const ActionTileIcon = styled.span<{ $bg: string; $color: string }>`
  width: 46px;
  height: 46px;
  border-radius: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$color};
  background: ${props => props.$bg};
`;

export const ActionTileTitle = styled.div`
  font-family: ${props => props.theme.fonts.display};
  font-size: 14.5px;
  font-weight: 700;
  color: ${props => props.theme.colors.fg};
`;

export const ActionTileDesc = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.muted};
  margin-top: 2px;
`;

export const ToastsContainer = styled.div`
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

export const Toast = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 13px 20px;
  border-radius: 13px;
  background: ${props => props.theme.colors.greenDark};
  color: ${props => props.theme.colors.white};
  font-size: 13.5px;
  font-weight: 600;
  box-shadow: 0 18px 48px -12px rgba(0, 90, 54, 0.4);
  animation: ${kcPop} 0.28s cubic-bezier(0.2, 0.8, 0.3, 1);
  max-width: 380px;
  pointer-events: auto;
  font-family: ${props => props.theme.fonts.display};
`;

export const ScannerOverlay = styled.div<{ $active: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  display: ${props => props.$active ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 9998;
  animation: ${kcPop} 0.25s cubic-bezier(0.16, 1, 0.3, 1);
`;

export const ScannerContent = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: 24px;
  padding: 24px;
  width: 90%;
  max-width: 500px;
  position: relative;
  box-shadow: ${props => props.theme.shadows.lg};
  border: 1px solid ${props => props.theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ScannerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ScannerTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 800;
  color: ${props => props.theme.colors.fg};
  margin: 0;
  font-family: ${props => props.theme.fonts.display};
`;

export const ScannerCloseButton = styled.button`
  border: none;
  background: transparent;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.muted};
  cursor: pointer;
  padding: 4px;
`;

export const ScannerDesc = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.muted};
  margin: 0;
`;

export const VideoWrapper = styled.div`
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  background-color: #0f172a;
  position: relative;
  aspect-ratio: 4/3;
  border: none;

  #reader-dashboard {
    border: none !important;
  }
  #reader-dashboard__scan_region {
    border: none !important;
  }
  #reader-dashboard canvas {
    display: none !important;
  }
`;

export const LaserLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${props => props.theme.colors.greenMid};
  box-shadow: 0 0 8px ${props => props.theme.colors.greenMid};
  position: absolute;
  top: 0;
  left: 0;
  animation: ${laserSweep} 2s linear infinite;
`;

export const ScannerOverlayGuide = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border: 2px dashed ${props => props.theme.colors.greenMid};
  border-radius: 8px;
  box-shadow: 0 0 0 9999px rgba(15, 23, 42, 0.5);
  pointer-events: none;
  z-index: 10;
`;

export const ScannerCancelButton = styled.button`
  padding: 10px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.875rem;
  font-family: inherit;
  transition: background 0.15s;

  &:hover {
    background: #dc2626;
  }
`;

export const SuccessOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${kcPop} 0.25s cubic-bezier(0.16, 1, 0.3, 1);
`;

export const SuccessContent = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: 24px;
  padding: 32px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: ${props => props.theme.shadows.lg};
  border: 1px solid ${props => props.theme.colors.border};
`;

export const SuccessCheckIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #dcfce7;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px auto;
  color: #15803d;
  font-size: 2.5rem;
  box-shadow: 0 4px 10px rgba(21, 128, 61, 0.15);
  font-weight: bold;
`;

export const SuccessTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 800;
  color: ${props => props.theme.colors.fg};
  margin-bottom: 8px;
  font-family: ${props => props.theme.fonts.display};
`;

export const SuccessDesc = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.muted};
  margin-bottom: 24px;
`;

export const SuccessInfoBlock = styled.div`
  background-color: #f8fafc;
  border-radius: 16px;
  padding: 16px;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 1px solid ${props => props.theme.colors.border};
  margin-bottom: 8px;
`;

export const SuccessInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SuccessInfoLabel = styled.span`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.muted};
`;

export const SuccessInfoVal = styled.span<{ $isGreen?: boolean }>`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${props => props.$isGreen ? props.theme.colors.green : props.theme.colors.fg};
`;

export const ConfettiContainer = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 99999;
`;

export const ConfettiPiece = styled.span<{ $x: number; $y: number; $color: string; $dx: number; $dy: number; $angle: number }>`
  position: fixed;
  left: ${props => props.$x}px;
  top: ${props => props.$y}px;
  width: 8px;
  height: 8px;
  border-radius: 2px;
  background: ${props => props.$color};
  pointer-events: none;
  animation: fall 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;

  @keyframes fall {
    0% {
      transform: translate(0, 0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translate(${props => props.$dx}px, ${props => props.$dy}px) rotate(${props => props.$angle}deg);
      opacity: 0;
    }
  }
`;
