import styled, { keyframes } from 'styled-components';

export const kcLaser = keyframes`
  0% { top: 8%; opacity: 0; }
  15% { opacity: 0.9; }
  85% { opacity: 0.9; }
  100% { top: 88%; opacity: 0; }
`;

export const kcCorner = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
`;

export const kcShimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

export const kcAlertPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(244, 63, 94, 0); }
  45% { box-shadow: 0 0 0 5px rgba(244, 63, 94, 0.28); }
`;

export const kcToastIn = keyframes`
  from { opacity: 0; transform: translateX(60px) scale(0.9); }
  to { opacity: 1; transform: none; }
`;

export const kcFloat = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-7px); }
`;

export const kcRipple = keyframes`
  0% { transform: scale(0.6); opacity: 0.55; }
  100% { transform: scale(2.4); opacity: 0; }
`;

export const kcRing = keyframes`
  0%, 100% { transform: rotate(0); }
  20% { transform: rotate(14deg); }
  40% { transform: rotate(-12deg); }
  60% { transform: rotate(8deg); }
  80% { transform: rotate(-4deg); }
`;

export const kcPop = keyframes`
  from { opacity: 0; transform: scale(0.85) translateY(10px); }
  to { opacity: 1; transform: none; }
`;

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  animation: ${kcPop} 0.35s cubic-bezier(0.16, 1, 0.3, 1);
`;

export const GreetingHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const GreetingTitle = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: #1F2937;
  letter-spacing: -0.02em;
  margin: 0;
  font-family: 'Be Vietnam Pro', system-ui, sans-serif;
`;

export const GreetingSubtitle = styled.p`
  font-size: 13px;
  color: #9CA3AF;
  font-weight: 500;
  margin: 0;
  text-transform: capitalize;
  font-family: 'Be Vietnam Pro', system-ui, sans-serif;
`;

export const DashboardGrid3Col = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1.35fr;
  gap: 24px;
  width: 100%;
  align-items: start;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
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

export const ToastsContainer = styled.div`
  position: fixed;
  top: 84px;
  right: 28px;
  z-index: 9000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
  pointer-events: none;
`;

export const Toast = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 13px 18px;
  border-radius: 14px;
  background: #1F2937;
  color: #fff;
  font-size: 13.5px;
  font-weight: 600;
  box-shadow: 0 12px 32px rgba(16, 24, 40, 0.3);
  animation: ${kcToastIn} 0.3s cubic-bezier(0.2, 0.8, 0.3, 1);
  max-width: 340px;
  pointer-events: auto;
`;
