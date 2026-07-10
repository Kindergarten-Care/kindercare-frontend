'use client';

import styled, { keyframes } from 'styled-components';

const fade = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Panel = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  min-height: 600px;
  max-height: inherit;
  overflow: hidden;
  min-width: 0;

  @media (max-width: 767px) {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto 1fr;
    height: 85vh;
    max-height: 85vh;
  }
`;

/* ---- left rail ---- */

export const Rail = styled.aside`
  background: linear-gradient(180deg, #f1faf4, #f7fbf8);
  border-right: 1px solid var(--border, #e6eee9);
  padding: 26px 18px;
  display: flex;
  flex-direction: column;

  @media (max-width: 767px) {
    padding: 12px 14px;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    min-width: 0;
    overflow: hidden;
  }
`;

export const RailHead = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 0 8px 22px;

  @media (max-width: 767px) {
    display: none;
  }
`;

export const RailMark = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: var(--brand, #005a36);
  display: grid;
  place-items: center;
  color: #fff;
  flex-shrink: 0;
  box-shadow: 0 6px 14px -4px rgba(0, 90, 54, 0.45);
`;

export const RailTitle = styled.div`
  font-weight: 800;
  font-size: 15px;
  letter-spacing: -0.02em;
  color: var(--fg, #1f2937);
`;

export const RailSub = styled.div`
  font-size: 11px;
  color: var(--muted-2, #9ca3af);
  font-weight: 500;
  margin-top: 1px;
`;

export const RailUser = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  border: 1px solid #eef4f0;
  border-radius: 14px;
  padding: 13px;
  margin-bottom: 20px;

  @media (max-width: 767px) {
    display: none;
  }
`;

export const RailAv = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 13px;
  display: grid;
  place-items: center;
  color: #fff;
  flex-shrink: 0;
  font-weight: 700;
  font-size: 16px;
  background: linear-gradient(140deg, #0a7a4c, var(--brand, #005a36));
  overflow: hidden;
`;

export const RailUserName = styled.div`
  font-size: 14px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--fg, #1f2937);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RailUserMail = styled.div`
  font-size: 11.5px;
  color: var(--muted-2, #9ca3af);
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RailNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 767px) {
    flex: 1;
    flex-direction: row;
    gap: 6px;
    overflow-x: auto;
    min-width: 0;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  }
`;

export const RailItem = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 13px;
  border-radius: 12px;
  color: ${p => (p.$active ? '#fff' : 'var(--muted, #6b7280)')};
  font-weight: ${p => (p.$active ? 600 : 500)};
  font-size: 14px;
  cursor: pointer;
  border: none;
  background: ${p => (p.$active ? 'var(--brand, #005a36)' : 'none')};
  width: 100%;
  text-align: left;
  font: inherit;
  transition: all 0.15s;
  box-shadow: ${p => (p.$active ? '0 6px 14px -6px rgba(0, 90, 54, 0.5)' : 'none')};
  white-space: nowrap;

  &:hover {
    background: ${p => (p.$active ? 'var(--brand, #005a36)' : '#eaf4ee')};
    color: ${p => (p.$active ? '#fff' : 'var(--fg, #1f2937)')};
  }

  svg { flex-shrink: 0; }

  @media (max-width: 767px) {
    flex-shrink: 0;
    width: auto;
    padding: 9px 14px;
    font-size: 13px;
    background: ${p => (p.$active ? 'var(--brand, #005a36)' : '#eef4f0')};
  }
`;

export const RailFoot = styled.div`
  margin-top: auto;
  padding-top: 16px;

  @media (max-width: 767px) {
    margin-top: 0;
    padding-top: 0;
    padding-left: 10px;
    margin-left: 4px;
    border-left: 1px solid var(--border, #e6eee9);
    flex-shrink: 0;
  }
`;

export const RailLogout = styled.button`
  display: flex;
  align-items: center;
  gap: 11px;
  width: 100%;
  padding: 11px 13px;
  border-radius: 12px;
  border: 1px solid var(--border, #e6eee9);
  background: #fff;
  color: var(--red, #dc2626);
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;

  &:hover {
    background: var(--red-tint, #fee2e2);
    border-color: var(--red-border, #fca5a5);
  }

  @media (max-width: 767px) {
    width: auto;
    padding: 10px;
    gap: 0;

    span { display: none; }
  }
`;

/* ---- right content ---- */

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 22px 26px;
  border-bottom: 1px solid #eef4f0;
`;

export const TopTitle = styled.h1`
  font-size: 19px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--fg, #1f2937);
`;

export const TopDesc = styled.p`
  font-size: 12.5px;
  color: var(--muted, #6b7280);
  margin-top: 2px;
`;

export const CloseBtn = styled.button`
  margin-left: auto;
  width: 38px;
  height: 38px;
  border-radius: 11px;
  border: 1px solid var(--border, #e6eee9);
  background: #fff;
  color: var(--muted, #6b7280);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all 0.15s;
  flex-shrink: 0;

  &:hover {
    background: #f4f8f5;
    color: var(--fg, #1f2937);
    border-color: #cfe0d5;
  }
`;

export const Scroll = styled.div`
  padding: 24px 26px 26px;
  overflow-y: auto;
  flex: 1;
`;

export const Pane = styled.div`
  animation: ${fade} 0.2s ease;
`;

/* avatar editor */

export const AvatarEdit = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 18px;
  background: #f7faf8;
  border: 1px solid #eef4f0;
  border-radius: 14px;
  margin-bottom: 24px;
`;

export const AeAv = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 20px;
  display: grid;
  place-items: center;
  color: #fff;
  flex-shrink: 0;
  position: relative;
  font-weight: 700;
  font-size: 26px;
  background: linear-gradient(140deg, #0a7a4c, var(--brand, #005a36));
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
  overflow: hidden;
`;

export const AeBody = styled.div`
  flex: 1;
  min-width: 0;

  h3 { font-size: 15px; font-weight: 700; color: var(--fg, #1f2937); }
  p { font-size: 12.5px; color: var(--muted-2, #9ca3af); margin-top: 3px; }
`;

export const AeActions = styled.div`
  display: flex;
  gap: 9px;
  margin-top: 11px;
`;

/* form */

export const SectionTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  margin: 4px 0 15px;
  display: flex;
  align-items: center;
  gap: 9px;
  color: var(--fg, #1f2937);

  &::before {
    content: '';
    width: 4px;
    height: 15px;
    border-radius: 3px;
    background: var(--brand, #005a36);
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 16px 18px;

  @media (max-width: 600px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Field = styled.div<{ $full?: boolean }>`
  display: flex;
  flex-direction: column;
  grid-column: ${p => (p.$full ? '1 / -1' : 'auto')};
  min-width: 0;
`;

export const FieldLabel = styled.label`
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 7px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--fg, #1f2937);

  .req { color: var(--red, #dc2626); }
`;

export const InputWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  > svg {
    position: absolute;
    left: 13px;
    color: var(--muted-2, #9ca3af);
    pointer-events: none;
  }
`;

export const TextInput = styled.input<{ $plain?: boolean }>`
  width: 100%;
  font: inherit;
  font-size: 14px;
  padding: 11px 13px 11px ${p => (p.$plain ? '13px' : '40px')};
  border: 1px solid var(--border, #e6eee9);
  border-radius: 11px;
  background: #fff;
  color: var(--fg, #1f2937);
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:focus {
    border-color: var(--brand, #005a36);
    box-shadow: 0 0 0 3px var(--brand-tint, #e6f3ed);
  }

  &:disabled {
    background: #f7faf8;
    color: var(--muted, #6b7280);
    cursor: not-allowed;
  }
`;

export const Hint = styled.div`
  font-size: 11.5px;
  color: var(--muted-2, #9ca3af);
  margin-top: 6px;
`;

export const EyeBtn = styled.button`
  position: absolute;
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: none;
  background: none;
  color: var(--muted-2, #9ca3af);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: color 0.15s;

  &:hover { color: var(--fg, #1f2937); }
`;

export const Divider = styled.div`
  height: 1px;
  background: #eef4f0;
  margin: 24px 0;
`;

/* password strength */

export const Strength = styled.div`
  margin-top: 9px;
`;

export const StrengthBars = styled.div`
  display: flex;
  gap: 5px;
`;

export const StrengthBar = styled.i<{ $active?: boolean; $color?: string }>`
  flex: 1;
  height: 5px;
  border-radius: 3px;
  background: ${p => (p.$active ? p.$color : '#eef2ee')};
  transition: background 0.2s;
`;

export const StrengthLabel = styled.div<{ $color?: string }>`
  font-size: 11.5px;
  font-weight: 600;
  margin-top: 6px;
  color: ${p => p.$color || 'var(--muted-2, #9ca3af)'};
`;

export const ReqList = styled.ul`
  list-style: none;
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 7px;
`;

export const ReqItem = styled.li<{ $ok?: boolean }>`
  font-size: 12px;
  color: ${p => (p.$ok ? 'var(--green-ok, #16803d)' : 'var(--muted-2, #9ca3af)')};
  display: flex;
  align-items: center;
  gap: 7px;
  transition: color 0.15s;
`;

export const ReqIcon = styled.span<{ $ok?: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 5px;
  background: ${p => (p.$ok ? 'var(--brand, #005a36)' : '#eef2ee')};
  color: #fff;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  transition: all 0.15s;
`;

/* notifications */

export const NotifyRow = styled.div<{ $bordered?: boolean }>`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 15px 0;
  border-bottom: ${p => (p.$bordered ? '1px solid #eef4f0' : 'none')};
`;

export const NotifyIcon = styled.span`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--brand-tint, #e6f3ed);
  color: var(--brand, #005a36);
  display: grid;
  place-items: center;
  flex-shrink: 0;
`;

export const NotifyBody = styled.div`
  flex: 1;
  min-width: 0;

  strong { font-size: 14px; font-weight: 700; color: var(--fg, #1f2937); }
  span { display: block; font-size: 12.5px; color: var(--muted-2, #9ca3af); margin-top: 2px; }
`;

export const NotifyToggle = styled.button<{ $on?: boolean }>`
  width: 46px;
  height: 27px;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  position: relative;
  transition: background 0.2s;
  background: ${p => (p.$on ? 'var(--brand, #005a36)' : '#d5ddd8')};
  flex-shrink: 0;
`;

export const NotifyToggleDot = styled.span<{ $on?: boolean }>`
  position: absolute;
  top: 3px;
  left: ${p => (p.$on ? '22px' : '3px')};
  width: 21px;
  height: 21px;
  border-radius: 50%;
  background: #fff;
  transition: left 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

/* footer */

export const Foot = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 26px;
  border-top: 1px solid #eef4f0;
  background: #fbfdfc;

  @media (max-width: 640px) {
    padding: 14px 16px;
  }
`;

export const FootNote = styled.span`
  font-size: 12.5px;
  color: var(--muted-2, #9ca3af);
  display: flex;
  align-items: center;
  gap: 7px;

  @media (max-width: 640px) {
    display: none;
  }
`;

export const FootActions = styled.div`
  margin-left: auto;
  display: flex;
  gap: 10px;

  @media (max-width: 640px) {
    margin-left: 0;
    width: 100%;

    & > * { flex: 1; }
  }
`;

export const Btn = styled.button<{ $variant?: 'brand' | 'ghost' }>`
  font: inherit;
  font-weight: 600;
  border: none;
  cursor: pointer;
  border-radius: 11px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;
  transition: transform 0.12s, box-shadow 0.15s, background 0.15s;
  font-size: 13.5px;
  padding: 11px 20px;

  ${p =>
    p.$variant === 'ghost'
      ? `
    background: #fff;
    color: var(--fg, #1f2937);
    border: 1px solid var(--border, #e6eee9);
    &:hover { border-color: #cfe0d5; }
  `
      : `
    background: var(--brand, #005a36);
    color: #fff;
    box-shadow: 0 8px 18px -7px rgba(0, 90, 54, 0.5);
    &:hover { background: var(--brand-hover, #004428); }
  `}

  &:active { transform: scale(0.97); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;
