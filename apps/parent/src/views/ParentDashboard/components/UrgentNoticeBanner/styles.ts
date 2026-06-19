'use client';

import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% { transform: scale(0.7); opacity: 0.6; }
  100% { transform: scale(1.5); opacity: 0; }
`;

const marquee = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

export const Banner = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  background: linear-gradient(100deg, #e11d2e, #b91c1c);
  color: #fff;
  border-radius: 14px;
  padding: 11px 12px 11px 15px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 12px 28px -12px rgba(220, 38, 38, 0.6);
  margin-bottom: 0;
`;

export const Tag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.26);
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 0.07em;
  padding: 6px 11px;
  border-radius: 8px;
  flex-shrink: 0;
`;

export const PulseDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #fff;
  display: inline-block;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    border: 2px solid #fff;
    opacity: 0.6;
    animation: ${pulse} 1.8s ease-out infinite;
  }
`;

export const Track = styled.div`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  cursor: pointer;
  -webkit-mask: linear-gradient(90deg, transparent, #000 4%, #000 95%, transparent);
  mask: linear-gradient(90deg, transparent, #000 4%, #000 95%, transparent);

  &:hover > div {
    animation-play-state: paused;
  }
`;

export const Marquee = styled.div<{ $paused?: boolean }>`
  display: inline-flex;
  gap: 46px;
  white-space: nowrap;
  width: max-content;
  animation: ${marquee} 36s linear infinite;
  animation-play-state: ${p => p.$paused ? 'paused' : 'running'};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Item = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  font-weight: 600;
`;

export const AllBtn = styled.button`
  flex-shrink: 0;
  background: #fff;
  color: #b91c1c;
  border: none;
  font: inherit;
  font-size: 12.5px;
  font-weight: 700;
  padding: 7px 13px;
  border-radius: 9px;
  cursor: pointer;
  transition: transform 0.12s;
  white-space: nowrap;

  &:hover {
    transform: scale(1.04);
  }
`;

export const CloseBtn = styled.button`
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.16);
  border: none;
  color: #fff;
  cursor: pointer;
  display: grid;
  place-items: center;
  font-size: 16px;
  transition: background 0.15s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const Modal = styled.div`
  background: #fff;
  border-radius: 20px;
  width: min(560px, 94vw);
  max-height: 88vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 18px 48px -12px rgba(0, 0, 0, 0.2);
`;

export const ModalHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 22px;
  border-bottom: 1px solid #f3f4f6;
`;

export const ModalTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
`;

export const ModalBody = styled.div`
  padding: 18px 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
`;

export const NoticeRow = styled.div<{ $severity: 'urgent' | 'important' | 'info' }>`
  display: flex;
  gap: 13px;
  padding: 14px 15px;
  border: 1px solid #e5e7eb;
  border-left: 3px solid ${p =>
    p.$severity === 'urgent' ? '#dc2626' : p.$severity === 'important' ? '#d97706' : '#2563eb'};
  border-radius: 13px;
  background: #fff;
`;

export const NoticeIco = styled.div<{ $severity: 'urgent' | 'important' | 'info' }>`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  font-size: 20px;
  background: ${p =>
    p.$severity === 'urgent' ? '#fee2e2' : p.$severity === 'important' ? '#fef3c7' : '#dbeafe'};
`;

export const NoticeContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const NoticeTop = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 4px;
`;

export const NoticeSev = styled.span<{ $severity: 'urgent' | 'important' | 'info' }>`
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 6px;
  background: ${p =>
    p.$severity === 'urgent' ? '#fee2e2' : p.$severity === 'important' ? '#fef3c7' : '#dbeafe'};
  color: ${p =>
    p.$severity === 'urgent' ? '#dc2626' : p.$severity === 'important' ? '#92400e' : '#1d4ed8'};
`;

export const NoticeWhen = styled.span`
  font-size: 11.5px;
  font-weight: 600;
  color: #9ca3af;
  margin-left: auto;
`;

export const NoticeTitle = styled.div`
  font-size: 14.5px;
  font-weight: 700;
  line-height: 1.35;
`;

export const NoticeDetail = styled.div`
  font-size: 13px;
  color: #4b5563;
  margin-top: 4px;
  line-height: 1.55;
`;
