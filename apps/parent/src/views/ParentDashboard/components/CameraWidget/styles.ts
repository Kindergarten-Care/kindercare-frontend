'use client';

import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
  100% { opacity: 1; transform: scale(1); }
`;

export const Card = styled.div`
  background: var(--surface, #fff);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px 18px;
  box-shadow: var(--shadow);
  height: 276px;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;

  @media (max-width: 960px) {
    height: auto;
  }
`;

export const CardHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
`;

export const CamFeed = styled.button`
  position: relative;
  height: 174px;
  border-radius: 12px;
  overflow: hidden;
  display: grid;
  place-items: center;
  background: repeating-linear-gradient(48deg, #243a30 0 16px, #20342b 16px 32px);
  width: 100%;
  border: none;
  cursor: pointer;
  padding: 0;

  &:hover > .play { transform: scale(1.09); }
`;

export const CamGrain = styled.div`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 50% 38%, rgba(255,255,255,.07), transparent 62%),
    linear-gradient(180deg, rgba(0,0,0,.05), rgba(0,0,0,.35));
  pointer-events: none;
`;

export const CamLive = styled.div`
  position: absolute;
  top: 11px;
  left: 11px;
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(220, 38, 38, 0.94);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 4px 9px;
  border-radius: 8px;
  z-index: 2;
`;

export const LiveDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #fff;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

export const CamTime = styled.div`
  position: absolute;
  top: 11px;
  right: 11px;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 9px;
  border-radius: 8px;
  font-variant-numeric: tabular-nums;
  backdrop-filter: blur(2px);
  z-index: 2;
`;

export const CamPlay = styled.div`
  position: relative;
  z-index: 2;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.94);
  display: grid;
  place-items: center;
  color: var(--brand);
  font-size: 22px;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.35);
  transition: transform 0.15s;
  padding-left: 3px;
`;

export const CamLabel = styled.div`
  position: absolute;
  bottom: 11px;
  left: 11px;
  z-index: 2;
  color: #fff;
  font-family: ui-monospace, Menlo, monospace;
  font-size: 10.5px;
  letter-spacing: 0.03em;
  background: rgba(0, 0, 0, 0.4);
  padding: 3px 8px;
  border-radius: 6px;
  backdrop-filter: blur(2px);
`;

export const CamFoot = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  font-size: 12.5px;
  color: var(--muted);
  font-weight: 500;
`;

export const OnlineDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #16a34a;
  flex-shrink: 0;
  box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.16);
`;
