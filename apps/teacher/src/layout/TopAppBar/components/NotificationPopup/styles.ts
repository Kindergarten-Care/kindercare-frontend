'use client';

import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

const slideOut = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(100%); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

export const Overlay = styled.div<{ $isClosing?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.35);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
  animation: ${p => p.$isClosing ? fadeOut : fadeIn} 0.25s ease-out forwards;
`;

export const ModalContainer = styled.div<{ $isClosing?: boolean }>`
  background: #ffffff;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  box-shadow: -10px 0 30px -5px rgba(0, 0, 0, 0.1);
  animation: ${p => p.$isClosing ? slideOut : slideIn} 0.32s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #e5e7eb;

  @media (min-width: 640px) {
    border-radius: 24px 0 0 24px;
  }
`;

export const HeadRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 20px 24px;
  border-bottom: 1px solid #e5e7eb;
`;

export const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #eff6ff;
  color: #2563eb;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  font-family: 'Inter', sans-serif;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  line-height: 1.3;
  font-family: 'Inter', sans-serif;
`;

export const CloseBtn = styled.button`
  border: none;
  background: #f1f5f9;
  color: #64748b;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: all 0.15s ease;
  font-family: 'Inter', sans-serif;

  &:hover {
    background: #e2e8f0;
    color: #111827;
    transform: rotate(90deg);
  }

  &:active {
    transform: rotate(90deg) scale(0.92);
  }
`;

export const ContentArea = styled.div`
  flex: 1;
  padding: 40px 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
`;

export const SvgWrapper = styled.div`
  width: 140px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  animation: ${float} 4s ease-in-out infinite;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const EmptyTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 10px;
  font-family: 'Inter', sans-serif;
`;

export const EmptyDesc = styled.p`
  font-size: 13px;
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 32px;
  max-width: 280px;
  font-family: 'Inter', sans-serif;
`;

export const ConfirmBtn = styled.button`
  font-family: 'Inter', sans-serif;
  font-size: 13.5px;
  font-weight: 600;
  color: #ffffff;
  background: #2563eb;
  border: none;
  padding: 10px 32px;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s, box-shadow 0.15s;
  box-shadow: 0 4px 12px -2px rgba(37, 99, 235, 0.3);

  &:hover {
    background: #1d4ed8;
    box-shadow: 0 6px 16px -2px rgba(37, 99, 235, 0.4);
  }

  &:active {
    transform: scale(0.98);
  }
`;

// ─── Header actions ───────────────────────────────────────────────────────────

export const HeadActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const MarkAllBtn = styled.button`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #2563eb;
  background: #eff6ff;
  border: none;
  padding: 5px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s;

  &:hover { background: #dbeafe; }
`;

// ─── Notification list ────────────────────────────────────────────────────────

export const NotiList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
`;

export const NotiItem = styled.div<{ $unread: boolean; $critical: boolean }>`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px;
  cursor: pointer;
  border-radius: 16px;
  border: 1px solid ${p => p.$unread ? 'rgba(37, 99, 235, 0.15)' : '#e5e7eb'};
  background: ${p => p.$unread ? '#f8fafc' : '#ffffff'};
  box-shadow: ${p => p.$unread ? '0 2px 8px -2px rgba(37, 99, 235, 0.08)' : 'none'};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: #f9fafb;
    border-color: #d1d5db;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.08);
  }

  ${p => p.$critical && `
    border-left: 4px solid #dc2626;
  `}
`;

export const IconContainer = styled.div`
  position: relative;
  flex-shrink: 0;
`;

export const IconWrapper = styled.div<{ $type: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  transition: all 0.2s ease;

  ${p => {
    switch (p.$type) {
      case 'ATTENDANCE':
        return `
          background: #dcfce7;
          color: #16a34a;
        `;
      case 'LEAVE_REQUEST':
        return `
          background: #fef3c7;
          color: #d97706;
        `;
      case 'HEALTH_ALERT':
        return `
          background: #fee2e2;
          color: #dc2626;
        `;
      case 'MEDICAL_REQUEST':
        return `
          background: #dbeafe;
          color: #2563eb;
        `;
      default:
        return `
          background: #f3e8ff;
          color: #7c3aed;
        `;
    }
  }}
`;

export const UnreadDot = styled.span`
  position: absolute;
  top: -2px;
  right: -2px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #dc2626;
  border: 2px solid #ffffff;
  box-shadow: 0 0 0 1.5px rgba(220, 38, 38, 0.15);
`;

export const NotiMeta = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const NotiHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const NotiTitle = styled.span<{ $critical: boolean }>`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: ${p => p.$critical ? '#dc2626' : '#111827'};
  line-height: 1.4;
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TypeTag = styled.span<{ $type: string }>`
  flex-shrink: 0;
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 20px;
  letter-spacing: 0.02em;
  text-transform: uppercase;

  ${p => {
    switch (p.$type) {
      case 'ATTENDANCE':
        return `
          color: #15803d;
          background: #dcfce7;
          border: 1px solid #bbf7d0;
        `;
      case 'LEAVE_REQUEST':
        return `
          color: #b45309;
          background: #fef3c7;
          border: 1px solid #fde68a;
        `;
      case 'HEALTH_ALERT':
        return `
          color: #dc2626;
          background: #fee2e2;
          border: 1px solid #fecaca;
        `;
      case 'MEDICAL_REQUEST':
        return `
          color: #1d4ed8;
          background: #dbeafe;
          border: 1px solid #bfdbfe;
        `;
      default:
        return `
          color: #6d28d9;
          background: #f3e8ff;
          border: 1px solid #e9d5ff;
        `;
    }
  }}
`;

export const NotiMsg = styled.p`
  font-family: 'Inter', sans-serif;
  margin: 0;
  font-size: 13px;
  color: #6b7280;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const NotiTime = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: #9ca3af;
  margin-top: 2px;
`;

// ─── Empty state ──────────────────────────────────────────────────────────────

export const EmptyWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 28px;
  text-align: center;
`;

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const shimmer = keyframes`
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

export const SkeletonItem = styled.div`
  height: 88px;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  background: linear-gradient(90deg, #f9fafb 25%, #f3f4f6 50%, #f9fafb 75%);
  background-size: 800px 100%;
  animation: ${shimmer} 1.4s infinite linear;
`;
