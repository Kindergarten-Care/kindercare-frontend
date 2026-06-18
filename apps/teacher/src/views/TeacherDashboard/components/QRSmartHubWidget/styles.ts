import styled, { css, keyframes } from 'styled-components';
import { kcLaser, kcCorner, kcRipple } from '../../styles';

export const WidgetContainer = styled.section`
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 4px 20px rgba(16, 24, 40, 0.04);
  padding: 24px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(16, 24, 40, 0.03);
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
`;

export const IconBlock = styled.span`
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: #ECFDF5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
`;

export const Title = styled.h3`
  font-size: 18px;
  font-weight: 800;
  color: #1F2937;
  letter-spacing: -0.01em;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
`;

export const Subtitle = styled.p`
  font-size: 13px;
  color: #9CA3AF;
  font-weight: 500;
  margin: 2px 0 0 0;
  font-family: 'Montserrat', sans-serif;
`;

export const AttendanceCounter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 18px;
  border-radius: 999px;
  background: #ECFDF5;
  border: 1px solid #A7F3D0;
`;

export const CounterDot = styled.span`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #10B981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.18);
`;

export const CounterText = styled.span`
  font-weight: 800;
  font-size: 15px;
  color: #059669;
  font-family: 'Montserrat', sans-serif;

  span {
    color: #6EE7B7;
    font-weight: 700;
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 26px;
  align-items: start;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

export const ScannerColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
`;

export const CameraContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 18px;
  overflow: hidden;
  background: radial-gradient(120% 120% at 30% 20%, #e0f2fe 0%, #ede9fe 45%, #dcfce7 100%);
  border: 1.5px solid #E3F0E8;

  #reader-dashboard {
    border: none !important;
  }
  #reader-dashboard__scan_region {
    border: none !important;
  }
  #reader-dashboard canvas {
    display: none !important;
  }
  #reader-dashboard video {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    border-radius: 18px !important;
  }
`;

export const GridOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(115deg, rgba(255, 255, 255, 0.06) 0 14px, rgba(0, 0, 0, 0.03) 14px 28px);
`;

export const LiveBadge = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(17, 24, 39, 0.55);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  font-family: 'Montserrat', sans-serif;
  z-index: 5;
`;

export const PulseDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #F43F5E;
  animation: ${kcCorner} 1.2s infinite;
`;

export const CornerGuide = styled.span<{ $pos: 'tl' | 'tr' | 'bl' | 'br' }>`
  position: absolute;
  width: 34px;
  height: 34px;
  border-color: #10B981;
  border-style: solid;
  border-width: 0;
  z-index: 2;
  
  ${props => props.$pos === 'tl' && css`
    top: 48px;
    left: 48px;
    border-top-width: 3px;
    border-left-width: 3px;
    border-top-left-radius: 5px;
    animation: ${kcCorner} 1.6s infinite;
  `}

  ${props => props.$pos === 'tr' && css`
    top: 48px;
    right: 48px;
    border-top-width: 3px;
    border-right-width: 3px;
    border-top-right-radius: 5px;
    animation: ${kcCorner} 1.6s infinite 0.2s;
  `}

  ${props => props.$pos === 'bl' && css`
    bottom: 48px;
    left: 48px;
    border-bottom-width: 3px;
    border-left-width: 3px;
    border-bottom-left-radius: 5px;
    animation: ${kcCorner} 1.6s infinite 0.4s;
  `}

  ${props => props.$pos === 'br' && css`
    bottom: 48px;
    right: 48px;
    border-bottom-width: 3px;
    border-right-width: 3px;
    border-bottom-right-radius: 5px;
    animation: ${kcCorner} 1.6s infinite 0.6s;
  `}
`;

const scannerLaser = keyframes`
  0% { top: 48px; opacity: 0; }
  15% { opacity: 0.9; }
  85% { opacity: 0.9; }
  100% { top: 332px; opacity: 0; }
`;

export const LaserLine = styled.span`
  position: absolute;
  left: 48px;
  right: 48px;
  height: 2.5px;
  background: linear-gradient(90deg, transparent, #10B981, transparent);
  box-shadow: 0 0 14px 2px rgba(16, 185, 129, 0.7);
  animation: ${scannerLaser} 2.6s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  z-index: 2;
`;

export const CenterInfo = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: #0f766e;
  font-family: 'Montserrat', sans-serif;
`;

export const BoxIcon = styled.span`
  font-size: 40px;
  opacity: 0.85;
`;

export const HelpText = styled.span`
  font-size: 12px;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.6);
  padding: 4px 12px;
  border-radius: 999px;
`;

export const TriggerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  height: 52px;
  border-radius: 15px;
  border: none;
  background: linear-gradient(135deg, #10B981, #059669);
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  weight: 800;
  font-size: 15px;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
  transition: transform 0.15s, box-shadow 0.15s;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 10px 26px rgba(16, 185, 129, 0.4);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

export const ActionButton = styled.button`
  flex: 1;
  height: 44px;
  border-radius: 13px;
  border: 1px solid #E3F0E8;
  background: #F7FBF8;
  color: #374151;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #ECFDF5;
  }
`;

export const FeedColumn = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 0;
  width: 100%;
`;

export const FeedHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const FeedTitle = styled.h4`
  font-size: 15px;
  font-weight: 800;
  color: #1F2937;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
`;

export const FeedBadge = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: #059669;
  background: #ECFDF5;
  padding: 4px 11px;
  border-radius: 999px;
  font-family: 'Montserrat', sans-serif;
`;

export const FeedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 380px;
  overflow-y: auto;
  padding-right: 6px;
`;

export const FeedItem = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 18px;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid rgba(16, 24, 40, 0.05);
  box-shadow: 0 4px 14px rgba(16, 24, 40, 0.02);
  transition: transform 0.22s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.22s;
  animation: slideIn 0.3s cubic-bezier(0.2, 0.8, 0.3, 1) forwards;

  &:hover {
    transform: scale(1.01) translateY(-2px);
    box-shadow: 0 8px 24px rgba(16, 24, 40, 0.05);
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
`;

export const FeedAvatar = styled.span<{ $color: string }>`
  flex: none;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 17px;
  color: #374151;
  background: ${props => props.$color};
  font-family: 'Montserrat', sans-serif;
`;

export const FeedInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const FeedNameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const FeedName = styled.span`
  font-weight: 800;
  font-size: 15px;
  color: #1F2937;
  font-family: 'Montserrat', sans-serif;
`;

export const FeedTimeBadge = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: #059669;
  background: #fff;
  border: 1px solid #A7F3D0;
  padding: 2px 8px;
  border-radius: 999px;
  font-family: 'Montserrat', sans-serif;
`;

export const FeedWarning = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 5px;
  font-size: 12.5px;
  font-weight: 600;
  color: #E11D48;
  font-family: 'Montserrat', sans-serif;
`;

export const WaitingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 13px 15px;
  border-radius: 16px;
  border: 1.5px dashed #D1E7DB;
  color: #9CA3AF;
  background: transparent;
`;

export const RippleWrapper = styled.span`
  position: relative;
  flex: none;
  width: 14px;
  height: 14px;
`;

export const RippleDot = styled.span`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: #10B981;
`;

export const Ripples = styled.span`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: #10B981;
  animation: ${kcRipple} 1.8s ease-out infinite;
`;

export const WaitingText = styled.span`
  font-size: 13px;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
`;

export const FlashOverlay = styled.div<{ $active: boolean }>`
  position: absolute;
  inset: 0;
  background: #ffffff;
  z-index: 10;
  pointer-events: none;
  opacity: 0;
  ${props => props.$active && css`
    animation: flashAnim 0.5s ease-out forwards;
  `}

  @keyframes flashAnim {
    0% { opacity: 0; }
    25% { opacity: 1; }
    100% { opacity: 0; }
  }
`;
