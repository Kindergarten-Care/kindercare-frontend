'use client';

import styled, { keyframes } from 'styled-components';

const rise = keyframes`
  from { opacity: 0; transform: translateY(14px) scale(0.96); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

export const Fab = styled.button<{ $hidden: boolean }>`
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 90;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: var(--brand);
  color: #fff;
  border: none;
  cursor: pointer;
  display: ${p => p.$hidden ? 'none' : 'grid'};
  place-items: center;
  font-size: 24px;
  box-shadow: 0 10px 28px -8px rgba(0, 90, 54, 0.55);
  transition: transform 0.15s, box-shadow 0.15s;

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 14px 34px -8px rgba(0, 90, 54, 0.65);
  }

  @media (max-width: 860px) {
    bottom: 76px;
  }
`;

export const FabBadge = styled.span`
  position: absolute;
  top: -3px;
  right: -3px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #dc2626;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  display: grid;
  place-items: center;
  border: 2px solid #fff;
`;

export const Panel = styled.div`
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 90;
  width: 380px;
  max-height: 520px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 18px 56px -12px rgba(0, 0, 0, 0.22);
  display: flex;
  flex-direction: column;
  animation: ${rise} 0.22s cubic-bezier(0.2, 0.8, 0.3, 1);

  @media (max-width: 860px) {
    bottom: 76px;
    right: 12px;
    left: 12px;
    width: auto;
    max-height: 70vh;
  }
`;

export const PanelHead = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  border-bottom: 1px solid #f3f4f6;
`;

export const TeacherAv = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--brand-tint);
  display: grid;
  place-items: center;
  font-size: 20px;
  flex-shrink: 0;
`;

export const TeacherInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const TeacherName = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: var(--fg);
`;

export const TeacherStatus = styled.div`
  font-size: 12px;
  color: #16a34a;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;

  &::before {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #16a34a;
    display: inline-block;
  }
`;

export const CloseBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: #f3f4f6;
  border: none;
  color: #6b7280;
  cursor: pointer;
  display: grid;
  place-items: center;
  font-size: 16px;
  flex-shrink: 0;
  transition: background 0.15s;

  &:hover { background: #e5e7eb; color: #374151; }
`;

export const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  scrollbar-width: thin;
  scrollbar-color: #e5e7eb transparent;
`;

export const Bubble = styled.div<{ $me: boolean }>`
  max-width: 78%;
  align-self: ${p => p.$me ? 'flex-end' : 'flex-start'};
`;

export const BubbleText = styled.div<{ $me: boolean }>`
  padding: 10px 13px;
  border-radius: ${p => p.$me ? '16px 16px 4px 16px' : '16px 16px 16px 4px'};
  background: ${p => p.$me ? 'var(--brand)' : '#f3f4f6'};
  color: ${p => p.$me ? '#fff' : 'var(--fg)'};
  font-size: 13.5px;
  line-height: 1.5;
`;

export const BubbleMeta = styled.div<{ $me: boolean }>`
  font-size: 11px;
  color: var(--muted-2);
  margin-top: 4px;
  text-align: ${p => p.$me ? 'right' : 'left'};
  font-weight: 500;
`;

export const InputRow = styled.div`
  display: flex;
  gap: 8px;
  padding: 12px 14px;
  border-top: 1px solid #f3f4f6;
`;

export const Input = styled.input`
  flex: 1;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 9px 13px;
  font: inherit;
  font-size: 13.5px;
  color: var(--fg);
  background: #f9fafb;
  outline: none;
  transition: border-color 0.15s;

  &:focus {
    border-color: var(--brand);
    background: #fff;
  }

  &::placeholder { color: #9ca3af; }
`;

export const SendBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--brand);
  color: #fff;
  border: none;
  cursor: pointer;
  display: grid;
  place-items: center;
  font-size: 16px;
  flex-shrink: 0;
  transition: background 0.15s, transform 0.12s;

  &:hover { background: var(--brand-hover); transform: scale(1.05); }
  &:disabled { background: #9ca3af; cursor: not-allowed; transform: none; }
`;
