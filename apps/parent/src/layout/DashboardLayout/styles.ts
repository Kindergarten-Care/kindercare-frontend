'use client';

import styled from 'styled-components';

const SIDEBAR_WIDTH = 240;

export const DashboardWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: var(--bg, #f4f9f1);
  color: var(--fg, #181d18);
  font-size: 14px;
`;

export const MainContent = styled.main`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const TopBar = styled.header`
  background: var(--surface, #ffffff);
  border-bottom: 1px solid var(--border, #dde8d9);
  padding: 0 22px;
  height: 54px;
  display: flex;
  align-items: center;
  gap: 12px;
  position: sticky;
  top: 0;
  z-index: 30;
`;

export const TopbarLeft = styled.div`
  flex: 1;
`;

export const TopbarGreet = styled.div`
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.01em;
`;

export const TopbarDate = styled.div`
  font-size: 11px;
  color: var(--muted, #627062);
  margin-top: 1px;
`;

export const TopbarRight = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--bg, #f4f9f1);
  border: 1px solid var(--border, #dde8d9);
  border-radius: var(--r-md, 12px);
  padding: 6px 12px;
  font-size: 12px;
  color: var(--muted, #627062);
  cursor: text;
  min-width: 180px;
`;

export const IconBtn = styled.button`
  width: 34px;
  height: 34px;
  border: 1px solid var(--border, #dde8d9);
  border-radius: var(--r-sm, 8px);
  background: none;
  cursor: pointer;
  font-size: 15px;
  color: var(--muted, #627062);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover {
    background: var(--accent-xlight, #f0faf3);
    color: var(--accent, #005e2c);
  }
`;

export const NotifDot = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 7px;
  height: 7px;
  background: #ef4444;
  border-radius: 50%;
  border: 1.5px solid var(--surface, #ffffff);
`;

export const PageArea = styled.div`
  padding: 18px 22px;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;
