'use client';

import styled from 'styled-components';
export const NotiItem = styled.div<{ $unread: boolean; $critical: boolean }>`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px 36px 16px 16px;
  cursor: pointer;
  border-radius: 16px;
  border: 1px solid ${p => p.$unread ? 'rgba(0, 90, 54, 0.08)' : 'var(--border-soft)'};
  background: ${p => p.$unread ? 'rgba(0, 90, 54, 0.02)' : '#ffffff'};
  box-shadow: ${p => p.$unread ? '0 2px 8px -2px rgba(0, 90, 54, 0.04)' : 'none'};
  opacity: ${p => p.$unread ? '1' : '0.6'};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: ${p => p.$unread ? 'rgba(0, 90, 54, 0.05)' : '#f8fafc'};
    border-color: ${p => p.$unread ? 'rgba(0, 90, 54, 0.15)' : '#cbd5e1'};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px -2px rgba(15, 23, 42, 0.06);
    opacity: ${p => p.$unread ? '1' : '0.85'};
  }

  ${p => p.$critical && `
    border-left: 4px solid #ef4444;
  `}
`;

export const IconContainer = styled.div`
  position: relative;
  flex-shrink: 0;
`;

export const UnreadDot = styled.span`
  position: absolute;
  top: -2px;
  right: -2px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ef4444;
  border: 2px solid #ffffff;
  box-shadow: 0 0 0 1.5px rgba(239, 68, 68, 0.15);
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
  font-size: 14px;
  font-weight: 600;
  color: ${p => p.$critical ? '#dc2626' : 'var(--fg)'};
  line-height: 1.4;
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TypeTag = styled.span<{ $type: string }>`
  flex-shrink: 0;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 20px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  
  ${p => {
    switch (p.$type) {
      case 'ATTENDANCE':
      case 'CHECKIN':
      case 'CHECKOUT':
        return `
          color: #166534;
          background: #f0fdf4;
          border: 1px solid #dcfce7;
        `;
      case 'LEAVE_REQUEST':
      case 'MEDICATION':
      case 'MEDICATION_REQUEST':
      case 'MEDICINE':
      case 'MEDICINE_REQUEST':
        return `
          color: #9a3412;
          background: #fff7ed;
          border: 1px solid #ffedd5;
        `;
      case 'HEALTH_ALERT':
        return `
          color: #991b1b;
          background: #fef2f2;
          border: 1px solid #fee2e2;
        `;
      default:
        return `
          color: #1e40af;
          background: #eff6ff;
          border: 1px solid #dbeafe;
        `;
    }
  }}
`;

export const NotiMsg = styled.p`
  margin: 0;
  font-size: 13px;
  color: var(--muted);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const NotiTime = styled.span`
  font-size: 11px;
  color: #94a3b8;
  margin-top: 2px;
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  opacity: 0.3;
  transition: all 0.2s;
  z-index: 10;
  
  &:hover {
    color: #ef4444;
    background: #fee2e2;
    opacity: 1 !important;
  }
  
  ${NotiItem}:hover & {
    opacity: 0.8;
  }
`;

