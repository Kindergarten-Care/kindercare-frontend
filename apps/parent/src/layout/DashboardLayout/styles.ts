'use client';

import styled from 'styled-components';

export const DashboardWrapper = styled.div<{ $collapsed: boolean }>`
  display: grid;
  grid-template-columns: ${p => p.$collapsed ? '84px' : '260px'} 1fr;
  min-height: 100vh;
  background: var(--canvas);
  color: var(--fg);
  font-size: 14px;
  transition: grid-template-columns 0.22s ease;
`;

export const MainContent = styled.main`
  min-width: 0;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

export const HeaderBand = styled.header`
  position: sticky;
  top: 0;
  z-index: 30;
  overflow: hidden;
  isolation: isolate;
  background: linear-gradient(168deg, #E9F4EE 0%, #F1F8F4 52%, var(--canvas) 100%);
  border-bottom: 1px solid var(--border);

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    top: -160px;
    right: -30px;
    width: 360px;
    height: 360px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 90, 54, 0.08), transparent 64%);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    bottom: -120px;
    left: 14%;
    width: 240px;
    height: 240px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 90, 54, 0.05), transparent 66%);
    pointer-events: none;
  }
`;

export const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 40px;
  max-width: 1640px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 860px) {
    padding: 13px 18px;
    gap: 12px;
  }
`;

export const Greet = styled.div`
  flex: 1;
  min-width: 0;
`;

export const GreetName = styled.h1`
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--fg);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const GreetDate = styled.p`
  font-size: 13px;
  color: var(--muted);
  margin-top: 4px;
  font-weight: 500;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 0 13px;
  height: 42px;
  width: 240px;
  color: var(--muted-2);
  transition: border-color 0.15s, box-shadow 0.15s;

  &:focus-within {
    border-color: var(--brand);
    box-shadow: 0 0 0 3px var(--brand-tint);
  }

  input {
    border: none;
    outline: none;
    background: none;
    font: inherit;
    font-size: 13.5px;
    color: var(--fg);
    width: 100%;

    &::placeholder { color: var(--muted-2); }
  }

  @media (max-width: 1080px) {
    width: 42px;
    padding: 0;
    justify-content: center;

    input { display: none; }
  }
`;

export const IconBtn = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  display: grid;
  place-items: center;
  color: var(--muted);
  cursor: pointer;
  position: relative;
  transition: background 0.15s, color 0.15s, border-color 0.15s;

  &:hover {
    color: var(--fg);
    border-color: #CFE0D5;
    background: #fff;
  }
`;

export const NotifDot = styled.span`
  position: absolute;
  top: 9px;
  right: 9px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--red);
  border: 2px solid var(--surface);
`;

export const AvatarWrap = styled.div`
  position: relative;
  margin-left: 4px;
`;

export const Avatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(140deg, #0a7a4c, var(--brand));
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  display: grid;
  place-items: center;
  border: 2px solid #fff;
  box-shadow: 0 3px 10px -2px rgba(0, 90, 54, 0.28);
`;

export const AvatarOnline = styled.span`
  position: absolute;
  bottom: 1px;
  right: 1px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #22c55e;
  border: 2.5px solid #EEF6F1;
`;

export const PageArea = styled.div`
  flex: 1;
`;
