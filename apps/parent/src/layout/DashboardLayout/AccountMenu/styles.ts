'use client';

import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-8px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(8px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

export const MenuContainer = styled.div`
  position: relative;
`;

export const MenuPanel = styled.div<{ $dropUp?: boolean }>`
  position: absolute;
  ${p => (p.$dropUp ? 'bottom: calc(100% + 10px);' : 'top: calc(100% + 10px);')}
  right: 0;
  width: 268px;
  background: #ffffff;
  border: 1px solid var(--border, #e6eee9);
  border-radius: 16px;
  box-shadow:
    0 10px 30px -5px rgba(0, 90, 54, 0.12),
    0 4px 12px -3px rgba(0, 0, 0, 0.05);
  padding: 8px;
  z-index: 999;
  animation: ${p => (p.$dropUp ? fadeInUp : fadeIn)} 0.18s cubic-bezier(0.16, 1, 0.3, 1);
`;

export const ProfileBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 10px 12px;
  border-bottom: 1px solid #f1f5f9;
  margin-bottom: 6px;
`;

export const ProfileAv = styled.div`
  flex-shrink: 0;
  display: grid;
  place-items: center;
`;

export const ProfileInfo = styled.div`
  min-width: 0;
  flex: 1;
`;

export const ProfileName = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: var(--fg, #1f2937);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ProfileEmail = styled.div`
  font-size: 12px;
  color: var(--muted-2, #9ca3af);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
`;

export const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const MenuItem = styled.button<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 10px;
  border: none;
  background: none;
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  text-align: left;
  border-radius: 10px;
  cursor: pointer;
  color: ${p => (p.$danger ? '#dc2626' : 'var(--fg, #1f2937)')};
  transition: background 0.15s;

  &:hover {
    background: ${p => (p.$danger ? '#fee2e2' : '#f4f8f5')};
  }

  &:disabled {
    color: var(--muted-2, #9ca3af);
    cursor: not-allowed;

    &:hover { background: none; }
  }
`;

export const MenuDivider = styled.div`
  height: 1px;
  background: #f1f5f9;
  margin: 6px 4px;
`;
