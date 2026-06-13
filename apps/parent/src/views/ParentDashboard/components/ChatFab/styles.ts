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
  max-height: 560px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 12px 40px -8px rgba(0, 0, 0, 0.16);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${rise} 0.22s cubic-bezier(0.2, 0.8, 0.3, 1);

  @media (max-width: 860px) {
    bottom: 76px;
    right: 12px;
    left: 12px;
    width: auto;
    max-height: 75vh;
  }
`;

export const PanelHead = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  background: var(--brand);
  color: #fff;
`;

export const TeacherAv = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
  display: grid;
  place-items: center;
  font-size: 15px;
  font-weight: 700;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const TeacherInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const TeacherName = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
`;

export const TeacherStatus = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 3px;

  &::before {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #4ade80;
    display: inline-block;
    box-shadow: 0 0 0 1.5px rgba(255, 255, 255, 0.2);
  }
`;

export const CloseBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.12);
  border: none;
  color: #ffffff;
  cursor: pointer;
  display: grid;
  place-items: center;
  font-size: 16px;
  flex-shrink: 0;
  transition: background 0.15s, transform 0.1s;

  &:hover {
    background: rgba(255, 255, 255, 0.22);
    transform: scale(1.05);
  }
`;

export const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #f8fafc;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
`;

export const Bubble = styled.div<{ $me: boolean }>`
  max-width: 80%;
  align-self: ${p => p.$me ? 'flex-end' : 'flex-start'};
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const BubbleText = styled.div<{ $me: boolean }>`
  padding: 10px 14px;
  border-radius: ${p => p.$me ? '16px 16px 4px 16px' : '16px 16px 16px 4px'};
  background: ${p => p.$me ? 'var(--brand)' : '#ffffff'};
  color: ${p => p.$me ? '#ffffff' : '#1f2937'};
  font-size: 13.5px;
  line-height: 1.5;
  box-shadow: ${p => p.$me ? 'none' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)'};
  border: ${p => p.$me ? 'none' : '1px solid #e2e8f0'};
  word-break: break-word;
`;

export const BubbleMeta = styled.div<{ $me: boolean }>`
  font-size: 11px;
  color: #9ca3af;
  margin-top: 2px;
  text-align: ${p => p.$me ? 'right' : 'left'};
  font-weight: 500;
  padding: 0 4px;
`;

export const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-top: 1px solid #e5e7eb;
  background: #ffffff;
`;

export const Input = styled.input`
  flex: 1;
  border: 1px solid transparent;
  border-radius: 24px;
  padding: 10px 16px;
  font: inherit;
  font-size: 13.5px;
  color: #1f2937;
  background: #f1f5f9;
  outline: none;
  transition: background-color 0.15s;

  &:focus {
    background: #e2e8f0;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const SendBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--brand);
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
  transition: background 0.15s, transform 0.12s;

  &:hover:not(:disabled) {
    background: var(--brand-hover);
    transform: scale(1.05);
  }
  &:active:not(:disabled) {
    transform: scale(0.95);
  }
  &:disabled {
    background: #cbd5e1;
    color: #94a3b8;
    cursor: not-allowed;
  }
`;
