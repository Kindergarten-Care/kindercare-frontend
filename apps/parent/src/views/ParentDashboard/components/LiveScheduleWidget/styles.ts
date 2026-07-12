'use client';

import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.45; transform: scale(0.7); }
`;

// ─── Card ─────────────────────────────────────────────────────────────────────

export const Card = styled.div`
  container-type: inline-size;
  container-name: live-schedule-card;
  min-width: 0;
  background: var(--surface, #fff);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 14px 14px 12px;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 340px;
  width: 100%;
  box-sizing: border-box;
`;

// ─── Header ───────────────────────────────────────────────────────────────────

export const CardHead = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 0 4px 2px;
  flex-shrink: 0;
`;

export const HeadIco = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 9px;
  background: var(--brand-tint, #E6F3ED);
  color: var(--brand, #005A36);
  display: grid;
  place-items: center;
  flex-shrink: 0;
`;

export const HeadText = styled.div`
  flex: 1;
  min-width: 0;
`;

export const CardTitle = styled.div`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 14.5px;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @container live-schedule-card (max-width: 220px) {
    font-size: 13px;
  }
`;

export const CardSub = styled.div`
  font-size: 11px;
  color: var(--muted-2, #9CA3AF);
  margin-top: 1px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ClockBadge = styled.span`
  font-family: var(--font-jetbrains-mono, 'JetBrains Mono'), ui-monospace, Menlo, monospace;
  font-size: 12px;
  font-weight: 600;
  color: var(--brand, #005A36);
  background: var(--brand-tint, #E6F3ED);
  padding: 4px 9px;
  border-radius: 8px;
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;
`;

// ─── 3D Wheel ─────────────────────────────────────────────────────────────────

export const StageWrap = styled.div`
  position: relative;
  flex: 1;
  min-height: 200px;
  margin-top: 6px;
`;

export const Stage = styled.div`
  position: absolute;
  inset: 0;
  perspective: 820px;
  perspective-origin: 50% 50%;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(180deg, transparent 0%, #000 26%, #000 74%, transparent 100%);
  mask-image: linear-gradient(180deg, transparent 0%, #000 26%, #000 74%, transparent 100%);
`;

export const DoneBanner = styled.div`
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--muted-2, #9CA3AF);
  background: #F3F4F6;
  padding: 4px 10px;
  border-radius: 20px;
  white-space: nowrap;
  pointer-events: none;
`;

export const FocusFrame = styled.div<{ $dim?: boolean }>`
  position: absolute;
  left: 4px;
  right: 4px;
  top: 50%;
  height: 70px;
  transform: translateY(-50%);
  border-radius: 14px;
  background: ${p => p.$dim ? '#F9FAFB' : 'linear-gradient(120deg, #F1FAF4, #FFFFFF 70%)'};
  border: 1.5px solid ${p => p.$dim ? '#E5E7EB' : '#C9E6D5'};
  z-index: 1;
  box-shadow: ${p => p.$dim ? 'none' : '0 8px 22px -12px rgba(0, 90, 54, 0.22)'};
  pointer-events: none;
  transition: background 0.3s, border-color 0.3s;
`;

export const Wheel = styled.div`
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  z-index: 2;
`;

// ─── Slot ─────────────────────────────────────────────────────────────────────

export const Slot = styled.div<{ $active: boolean }>`
  position: absolute;
  left: 4px;
  right: 4px;
  top: 50%;
  height: 60px;
  margin-top: -30px;
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 0 12px;
  border-radius: 13px;
  will-change: transform, opacity;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease;
  transform-style: preserve-3d;
  backface-visibility: hidden;
`;

export const SlotTime = styled.span<{ $active: boolean }>`
  font-family: var(--font-jetbrains-mono, 'JetBrains Mono'), ui-monospace, Menlo, monospace;
  font-size: 12px;
  font-weight: 600;
  color: ${p => p.$active ? 'var(--brand, #005A36)' : 'var(--muted-2, #9CA3AF)'};
  width: 40px;
  flex-shrink: 0;
  text-align: right;
  font-variant-numeric: tabular-nums;
`;

export const SlotIco = styled.span<{ $color: string; $tint: string; $active: boolean }>`
  width: ${p => p.$active ? '42px' : '38px'};
  height: ${p => p.$active ? '42px' : '38px'};
  border-radius: 11px;
  background: ${p => p.$tint};
  color: ${p => p.$color};
  display: grid;
  place-items: center;
  flex-shrink: 0;
  transition: width 0.3s, height 0.3s, box-shadow 0.3s;
  box-shadow: ${p => p.$active ? '0 8px 18px -6px rgba(0,0,0,0.18)' : 'none'};
`;

export const SlotBody = styled.span`
  flex: 1;
  min-width: 0;
`;

export const SlotName = styled.span<{ $active: boolean }>`
  display: block;
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: ${p => p.$active ? '15px' : '14px'};
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: font-size 0.3s;
`;

export const SlotDesc = styled.span`
  display: block;
  font-size: 11.5px;
  color: var(--muted, #6B7280);
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// ─── Slot tags ────────────────────────────────────────────────────────────────

export const LiveBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 9.5px;
  font-weight: 800;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #fff;
  background: var(--brand, #005A36);
  padding: 4px 9px;
  border-radius: 7px;
  flex-shrink: 0;
  box-shadow: 0 6px 14px -5px rgba(0, 90, 54, 0.6);
`;

export const LiveDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fff;
  animation: ${pulse} 1.4s ease-in-out infinite;
  display: inline-block;
`;

export const Tag = styled.span<{ $type: 'done' | 'next' | 'soon' }>`
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.03em;
  padding: 3px 8px;
  border-radius: 7px;
  flex-shrink: 0;
  ${p => p.$type === 'done'
    ? 'background: #F1F4F1; color: var(--muted-2, #9CA3AF);'
    : p.$type === 'soon'
    ? 'background: #EDE9FE; color: #6D28D9;'
    : 'background: #FEF3C7; color: #92400E;'}
`;

// ─── Footer button ────────────────────────────────────────────────────────────

export const ViewBtn = styled.button`
  flex-shrink: 0;
  margin-top: 10px;
  width: 100%;
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 11px;
  border-radius: 12px;
  border: 1px solid var(--border, #E6EEE9);
  background: #F4F8F5;
  color: var(--brand, #005A36);
  cursor: pointer;
  transition: transform 0.12s, box-shadow 0.15s, background 0.15s, border-color 0.15s;

  svg { transition: transform 0.15s; }

  &:hover {
    background: #fff;
    border-color: #CFE0D5;
    box-shadow: var(--shadow);
    svg { transform: translateX(2px); }
  }

  &:active { transform: scale(0.985); }
`;

// ─── Empty state ──────────────────────────────────────────────────────────────

export const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 28px 16px;
  text-align: center;
`;

export const EmptyIcon = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: var(--brand-tint, #E6F3ED);
  color: var(--brand, #005A36);
  display: grid;
  place-items: center;
`;

export const EmptyTitle = styled.div`
  font-size: 13.5px;
  font-weight: 600;
  color: var(--fg);
`;

export const EmptySub = styled.div`
  font-size: 12px;
  color: var(--muted);
  line-height: 1.5;
`;
