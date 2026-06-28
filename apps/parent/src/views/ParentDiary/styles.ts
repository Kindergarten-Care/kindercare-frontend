'use client';

import styled from 'styled-components';

export const PageWrap = styled.div`
  padding: 32px 40px 60px;
  @media (max-width: 860px) { padding: 18px 18px 60px; }
`;

// ─── Page header ──────────────────────────────────────────────────────────────

export const PageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 22px;
  flex-wrap: wrap;
`;

export const PageTitle = styled.h1`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.2;
  color: var(--fg, #1F2937);
`;

export const PageCrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--muted, #6B7280);
  margin-top: 4px;
  b { color: var(--fg, #1F2937); font-weight: 600; }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const DateChip = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  border: 1px solid var(--border, #E6EEE9);
  border-radius: 11px;
  padding: 9px 14px;
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--fg, #1F2937);
  cursor: pointer;
  transition: border-color 0.15s;
  svg { color: var(--brand, #005A36); }
  &:hover { border-color: #CFE0D5; }
`;

export const IconAction = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  border: 1px solid var(--border, #E6EEE9);
  background: #fff;
  color: var(--muted, #6B7280);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
  &:hover { border-color: #CFE0D5; color: var(--fg, #1F2937); }
`;

// ─── Summary ──────────────────────────────────────────────────────────────────

export const Summary = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  border-radius: 16px;
  padding: 18px 22px;
  margin-bottom: 22px;
  background: linear-gradient(105deg, #EBF6F0 0%, #FFFFFF 88%);
  border: 1px solid #CFE7D8;
  box-shadow: 0 6px 22px -10px rgba(0, 90, 54, 0.18);
  flex-wrap: wrap;
`;

export const SummaryIco = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 14px;
  background: var(--brand, #005A36);
  color: #fff;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  box-shadow: 0 8px 18px -6px rgba(0, 90, 54, 0.5);
`;

export const SummaryBody = styled.div`
  flex: 1;
  min-width: 180px;
`;

export const SummaryLabel = styled.div`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--brand, #005A36);
  margin-bottom: 4px;
`;

export const SummaryText = styled.p`
  font-size: 14px;
  color: #374151;
  line-height: 1.55;
  b { font-weight: 700; color: #1F2937; }
`;

export const Stats = styled.div`
  display: flex;
  gap: 10px;
  flex-shrink: 0;
  flex-wrap: wrap;
`;

export const StatChip = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  border: 1px solid #EEF4F0;
  border-radius: 12px;
  padding: 9px 14px;
  svg { color: var(--brand, #005A36); }
`;

export const StatVal = styled.div`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 16px;
  font-weight: 800;
  line-height: 1;
  color: #1F2937;
`;

export const StatLbl = styled.div`
  font-size: 11px;
  color: var(--muted-2, #9CA3AF);
  font-weight: 500;
  margin-top: 3px;
`;

// ─── Layout grid ──────────────────────────────────────────────────────────────

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 20px;
  align-items: start;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

export const SideCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// ─── Card ─────────────────────────────────────────────────────────────────────

export const Card = styled.div`
  background: var(--surface, #fff);
  border: 1px solid var(--border, #E6EEE9);
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0,90,54,0.06), 0 2px 6px -1px rgba(0,0,0,0.03);
`;

export const CardHead = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px 22px 0;
`;

export const CardHeadIco = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 9px;
  background: var(--brand-tint, #E6F3ED);
  color: var(--brand, #005A36);
  display: grid;
  place-items: center;
  flex-shrink: 0;
`;

export const CardTitle = styled.span`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.01em;
`;

export const CardSub = styled.span`
  font-size: 12px;
  color: var(--muted-2, #9CA3AF);
  margin-left: auto;
`;

// ─── Timeline ─────────────────────────────────────────────────────────────────

export const TlWrap = styled.div`
  padding: 14px 20px 18px;
`;

export const Tl = styled.div`
  position: relative;
  padding-left: 44px;
  display: flex;
  flex-direction: column;
`;

export const TlItem = styled.div<{ $isLast: boolean }>`
  position: relative;
  padding-bottom: ${p => p.$isLast ? '0' : '10px'};

  &::before {
    content: '';
    position: absolute;
    left: -30px;
    top: 30px;
    bottom: ${p => p.$isLast ? '0' : '-2px'};
    width: 2px;
    background: var(--border, #E6EEE9);
    display: ${p => p.$isLast ? 'none' : 'block'};
  }
`;

export const TlNode = styled.span<{ $color: string; $tint: string }>`
  position: absolute;
  left: -44px;
  top: 0;
  width: 30px;
  height: 30px;
  border-radius: 9px;
  display: grid;
  place-items: center;
  background: ${p => p.$tint};
  color: ${p => p.$color};
  border: 2px solid #fff;
  box-shadow: 0 2px 8px -2px rgba(0,0,0,0.12);
  z-index: 1;
`;

export const TlCard = styled.div`
  background: #FBFDFC;
  border: 1px solid #EEF4F0;
  border-radius: 11px;
  padding: 8px 12px;
`;

export const TlTop = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 3px;
  flex-wrap: wrap;
`;

export const TlTime = styled.span`
  font-family: var(--font-jetbrains-mono, 'JetBrains Mono'), ui-monospace, monospace;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--muted-2, #9CA3AF);
  font-variant-numeric: tabular-nums;
`;

export const TlName = styled.span<{ $color: string; $tint: string }>`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.01em;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: 8px;
  background: ${p => p.$tint};
  color: ${p => p.$color};
`;

export const TlDetail = styled.div`
  font-size: 13.5px;
  color: #4B5563;
  line-height: 1.55;
  b { color: #1F2937; font-weight: 600; }
`;

export const TlEmpty = styled.div`
  text-align: center;
  padding: 32px 0;
  font-size: 13.5px;
  color: var(--muted, #6B7280);
`;

// ─── Photos ───────────────────────────────────────────────────────────────────

export const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 11px;
  padding: 16px 22px 22px;
`;

export const Photo = styled.div`
  position: relative;
  border-radius: 13px;
  overflow: hidden;
  aspect-ratio: 1/1;
  border: 1px solid #EEF4F0;
  background: repeating-linear-gradient(45deg, #EEF4F0, #EEF4F0 11px, #E6EEE9 11px, #E6EEE9 22px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  cursor: pointer;
  transition: transform 0.16s;
  color: var(--muted-2, #9CA3AF);
  &:hover { transform: scale(1.02); }

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const PhotoCap = styled.span`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 14px 10px 8px;
  font-size: 11.5px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(transparent, rgba(0,0,0,0.55));
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: var(--font-jetbrains-mono, 'JetBrains Mono'), ui-monospace, monospace;
`;

export const PhotoMore = styled.button`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  color: var(--brand, #005A36);
  padding: 11px;
  border: 1.5px dashed #CFE0D5;
  border-radius: 12px;
  background: none;
  cursor: pointer;
  transition: background 0.15s;
  &:hover { background: var(--brand-tint, #E6F3ED); }
`;

// ─── Lessons ──────────────────────────────────────────────────────────────────

export const LsnList = styled.div`
  padding: 14px 22px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const LsnItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

export const LsnSubjectBadge = styled.span<{ $color: string; $tint: string }>`
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: ${p => p.$tint};
  color: ${p => p.$color};
  display: grid;
  place-items: center;
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: -0.01em;
`;

export const LsnContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const LsnSubjectTag = styled.span<{ $color: string }>`
  display: block;
  font-size: 10.5px;
  font-weight: 700;
  color: ${p => p.$color};
  text-transform: uppercase;
  letter-spacing: 0.07em;
  margin-bottom: 2px;
`;

export const LsnTitle = styled.div`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 13.5px;
  font-weight: 700;
  color: #1F2937;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LsnDetail = styled.div`
  font-size: 12.5px;
  color: #6B7280;
  line-height: 1.5;
  margin-top: 3px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const LsnEmpty = styled.div`
  text-align: center;
  padding: 24px 0;
  font-size: 13.5px;
  color: var(--muted, #6B7280);
`;

// ─── Teacher message ──────────────────────────────────────────────────────────

export const MsgBody = styled.div`
  padding: 16px 22px 20px;
`;

export const MsgFrom = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  margin-bottom: 13px;
`;

export const MsgAvatar = styled.span`
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

export const MsgFromName = styled.div`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 14px;
  font-weight: 700;
`;

export const MsgFromRole = styled.div`
  font-size: 12px;
  color: var(--muted-2, #9CA3AF);
  margin-top: 2px;
`;

export const MsgQuote = styled.blockquote`
  position: relative;
  background: #F7FAF8;
  border: 1px solid #EEF4F0;
  border-radius: 13px;
  padding: 15px 17px 15px 26px;
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  font-style: italic;

  &::before {
    content: '\\201C';
    position: absolute;
    top: 0px;
    left: 9px;
    font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), Georgia, serif;
    font-size: 36px;
    color: #CFE0D5;
    line-height: 1.1;
    font-style: normal;
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
