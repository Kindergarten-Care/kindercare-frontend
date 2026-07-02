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
  box-shadow: -10px 0 30px -5px rgba(0, 50, 30, 0.08), -20px 0 50px -10px rgba(15, 23, 42, 0.15);
  animation: ${p => p.$isClosing ? slideOut : slideIn} 0.32s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--border);
  
  @media (min-width: 640px) {
    border-radius: 24px 0 0 24px;
  }
`;

export const HeadRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 20px 24px;
  border-bottom: 1px solid var(--border-soft);
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
  background: var(--brand-tint);
  color: var(--brand);
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: var(--fg);
  line-height: 1.3;
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

  &:hover {
    background: #e2e8f0;
    color: var(--fg);
    transform: rotate(90deg);
  }

  &:active {
    transform: rotate(90deg) scale(0.92);
  }
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
  color: var(--fg);
  margin-bottom: 10px;
`;

export const EmptyDesc = styled.p`
  font-size: 13px;
  color: var(--muted);
  line-height: 1.5;
  margin-bottom: 32px;
  max-width: 280px;
`;

export const HeadActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const MarkAllBtn = styled.button`
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  color: var(--brand);
  background: var(--brand-tint);
  border: none;
  padding: 5px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s;

  &:hover { background: #c6e6d8; }
`;

export const DeleteAllBtn = styled.button`
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  color: #ef4444;
  background: #fef2f2;
  border: none;
  padding: 5px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s;

  &:hover { background: #fee2e2; }
`;

export const ActionBar = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 8px 16px;
  background: #f8fafc;
  border-bottom: 1px solid var(--border-soft);
`;

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

export const EmptyWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 28px;
  text-align: center;
`;

const shimmer = keyframes`
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

export const SkeletonItem = styled.div`
  height: 88px;
  border-radius: 16px;
  border: 1px solid var(--border-soft);
  background: linear-gradient(90deg, #f8fafc 25%, #f1f5f9 50%, #f8fafc 75%);
  background-size: 800px 100%;
  animation: ${shimmer} 1.4s infinite linear;
`;

export const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-bottom: 1px solid var(--border-soft);
  background: #fafafa;
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const TabButton = styled.button<{ $active: boolean }>`
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  color: ${p => p.$active ? 'var(--brand)' : 'var(--muted)'};
  background: ${p => p.$active ? 'var(--brand-tint)' : '#ffffff'};
  border: 1px solid ${p => p.$active ? 'rgba(0, 90, 54, 0.15)' : 'var(--border-soft)'};
  padding: 6px 16px;
  border-radius: 99px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  box-shadow: ${p => p.$active ? '0 2px 6px -1px rgba(0, 90, 54, 0.08)' : 'none'};

  &:hover {
    background: ${p => p.$active ? 'var(--brand-tint)' : '#f1f5f9'};
    color: ${p => p.$active ? 'var(--brand)' : 'var(--fg)'};
    border-color: ${p => p.$active ? 'rgba(0, 90, 54, 0.25)' : '#cbd5e1'};
  }
  
  &:active {
    transform: scale(0.96);
  }
`;
