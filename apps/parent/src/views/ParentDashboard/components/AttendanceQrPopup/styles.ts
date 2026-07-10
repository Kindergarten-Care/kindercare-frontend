'use client';

import styled, { keyframes } from 'styled-components';

const scan = keyframes`
  0% { top: 0%; }
  50% { top: 100%; }
  100% { top: 0%; }
`;

export const HeadRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #f1f5f9;
`;

export const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const IconBox = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: var(--brand-tint);
  color: var(--brand);
  display: grid;
  place-items: center;
  flex-shrink: 0;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  color: #0f172a;
`;

export const CloseBtn = styled.button`
  border: none;
  background: #f1f5f9;
  color: #64748b;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: #e2e8f0;
    color: #0f172a;
  }
`;

export const ContentBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const QrOuterContainer = styled.div`
  position: relative;
  background: #ffffff;
  padding: 16px;
  border-radius: 20px;
  border: 1.5px solid #e2e8f0;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.03);
  overflow: hidden;
`;

export const ScannerArea = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
`;

export const LaserLine = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 3px;
  background: #22c55e;
  box-shadow: 0 0 12px 4px rgba(34, 197, 94, 0.6);
  z-index: 10;
  pointer-events: none;
  animation: ${scan} 3s linear infinite;
`;

export const RefreshTimerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
  margin-top: -4px;
`;

export const RefreshIconWrap = styled.span<{ $refreshing: boolean }>`
  display: inline-block;
  cursor: pointer;
  transition: transform 0.5s ease-in-out;
  transform: ${p => p.$refreshing ? 'rotate(360deg)' : 'none'};
  color: var(--brand);
`;

export const InfoCard = styled.div`
  width: 100%;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13.5px;
  line-height: 1.4;
`;

export const InfoLabel = styled.span`
  color: #64748b;
  font-weight: 500;
`;

export const InfoValue = styled.span`
  color: #0f172a;
  font-weight: 600;
  text-align: right;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px 24px 24px;
`;

export const DownloadBtn = styled.button`
  flex: 1;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  background: var(--brand);
  border: none;
  padding: 12px 18px;
  border-radius: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.15s, transform 0.1s;
  box-shadow: 0 6px 20px -4px rgba(0, 90, 54, 0.35);

  &:hover {
    background: var(--brand-hover);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
  }
`;
