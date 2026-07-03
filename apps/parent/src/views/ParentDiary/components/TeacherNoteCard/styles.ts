'use client';

import styled from 'styled-components';

export const Sec = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SecHead = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
`;

export const SecIco = styled.span`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: var(--brand-tint, #E6F3ED);
  color: var(--brand, #005A36);
  display: grid;
  place-items: center;
  flex-shrink: 0;
`;

export const SecTitle = styled.h2`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--fg, #1F2937);
`;

export const NoteCard = styled.div`
  background: var(--surface, #fff);
  border: 1px solid var(--border, #E6EEE9);
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0,90,54,0.06), 0 2px 6px -1px rgba(0,0,0,0.03);
  padding: 20px 22px;
`;

export const NoteFrom = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  margin-bottom: 13px;
`;

export const NoteAv = styled.span`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: linear-gradient(140deg, #0a7a4c, #005A36);
  color: #fff;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 15px;
  font-weight: 700;
`;

export const NoteName = styled.div`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #1F2937;
`;

export const NoteRole = styled.div`
  font-size: 12px;
  color: var(--muted-2, #9CA3AF);
  margin-top: 2px;
`;

export const NoteTime = styled.span`
  margin-left: auto;
  font-size: 11.5px;
  color: var(--muted-2, #9CA3AF);
  font-family: var(--font-jetbrains-mono, 'JetBrains Mono'), ui-monospace, monospace;
`;

export const NoteQuote = styled.blockquote`
  position: relative;
  background: #F7FAF8;
  border: 1px solid #EEF4F0;
  border-radius: 13px;
  padding: 15px 17px 15px 30px;
  font-size: 14px;
  color: #374151;
  line-height: 1.6;

  &::before {
    content: '\\201C';
    position: absolute;
    top: 4px;
    left: 10px;
    font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), Georgia, serif;
    font-size: 34px;
    color: #CFE0D5;
    line-height: 1;
  }
`;

export const ActionRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 14px;
`;

const BaseBtn = styled.button`
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  border-radius: 11px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 10px 16px;
  flex: 1;
  transition: transform 0.12s, background 0.15s, border-color 0.15s, color 0.15s;
  &:active { transform: scale(0.97); }
`;

export const HeartBtn = styled(BaseBtn)<{ $liked: boolean }>`
  background: ${p => p.$liked ? '#FCE7F2' : '#F4F8F5'};
  color: ${p => p.$liked ? '#DB2777' : 'var(--fg, #1F2937)'};
  border: 1px solid ${p => p.$liked ? '#DB2777' : 'var(--border, #E6EEE9)'};
  svg { fill: ${p => p.$liked ? '#DB2777' : 'none'}; }
  &:hover {
    background: ${p => p.$liked ? '#FCE7F2' : '#fff'};
    border-color: #DB2777;
    color: #DB2777;
  }
`;

export const ReplyBtn = styled(BaseBtn)`
  background: var(--brand, #005A36);
  color: #fff;
  box-shadow: 0 8px 18px -7px rgba(0, 90, 54, 0.5);
  &:hover { background: #004428; }
`;
