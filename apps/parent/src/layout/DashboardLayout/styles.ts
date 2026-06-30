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
  isolation: isolate;
  background: linear-gradient(168deg, #E9F4EE 0%, #F1F8F4 52%, var(--canvas) 100%);
  border-bottom: 1px solid var(--border);
`;

export const HeaderBgDecorations = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    top: -160px;
    right: -30px;
    width: 360px;
    height: 360px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 90, 54, 0.08), transparent 64%);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -120px;
    left: 14%;
    width: 240px;
    height: 240px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 90, 54, 0.05), transparent 66%);
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
    padding: 13px 16px;
    gap: 12px;
  }
`;

export const Greet = styled.div`
  flex: 1;
  min-width: 0;
`;

export const GreetName = styled.h1<{ $collapsed: boolean }>`
  font-size: ${p => p.$collapsed ? '24px' : '19px'};
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--fg);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: font-size 0.22s ease;
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
  top: 6px;
  right: 6px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 999px;
  background: var(--red);
  border: 2px solid var(--surface);
  color: #fff;
  font-size: 9px;
  font-weight: 700;
  line-height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  margin: 0 86.5px;
`;

export const SettingsWrapper = styled.div`
  position: relative;
`;

export const SettingsDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 290px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  box-shadow: 
    0 10px 30px -5px rgba(0, 90, 54, 0.12),
    0 4px 12px -3px rgba(0, 0, 0, 0.05);
  padding: 16px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-8px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

export const DropdownTitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: var(--fg);
  margin: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 6px 0;

  &:not(:last-child) {
    border-bottom: 1px solid #f1f5f9;
    padding-bottom: 10px;
  }
`;

export const DropdownLabel = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #334155;
`;

export const ToggleSwitch = styled.div`
  width: 38px;
  height: 20px;
  background: #cbd5e1;
  border-radius: 100px;
  padding: 2px;
  display: flex;
  align-items: center;
  cursor: not-allowed;
  opacity: 0.7;
  transition: background 0.2s;
`;

export const ToggleSlider = styled.div`
  width: 16px;
  height: 16px;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0,0,0,0.15);
`;
