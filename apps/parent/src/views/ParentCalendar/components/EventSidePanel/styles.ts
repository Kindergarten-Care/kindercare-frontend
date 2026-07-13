'use client';

import styled from 'styled-components';

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  min-width: 0;
`;

export const Card = styled.div`
  background: #fff;
  border: 1px solid #E6EEE9;
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
  padding: 18px;
  overflow: hidden;
  min-width: 0;

  @media (max-width: 480px) {
    padding: 14px;
  }
`;

export const CardHead = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
`;

export const CardIcon = styled.div<{ $bg: string; $fg: string }>`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: ${p => p.$bg};
  color: ${p => p.$fg};
  flex-shrink: 0;
`;

export const CardTitle = styled.div`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 14.5px;
  font-weight: 800;
  letter-spacing: -.01em;
  color: #1F2937;
`;

export const CardSub = styled.div`
  font-size: 11.5px;
  color: #9CA3AF;
  font-weight: 500;
  margin-top: 1px;
`;

export const EventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// ─── Selected-day event card ────────────────────────────────────────────────

export const EventItem = styled.div<{ $c: string; $tint: string }>`
  border: 1px solid #EEF3F0;
  border-left: 3px solid ${p => p.$c};
  background: ${p => p.$tint};
  border-radius: 12px;
  padding: 12px 13px;
`;

export const EventItemHead = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`;

export const EventItemIcon = styled.span<{ $c: string }>`
  color: ${p => p.$c};
  display: inline-flex;
  flex-shrink: 0;
`;

export const EventItemTitle = styled.div`
  font-size: 13.5px;
  font-weight: 700;
  color: #1F2937;
  line-height: 1.3;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const EventItemBadge = styled.span<{ $c: string }>`
  margin-left: auto;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .03em;
  text-transform: uppercase;
  color: ${p => p.$c};
  white-space: nowrap;
  flex-shrink: 0;
`;

export const EventItemMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px 14px;
  margin-top: 7px;
`;

export const EventItemMetaRow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 500;
  color: #6B7280;
`;

export const EventItemDesc = styled.p`
  margin: 8px 0 0;
  font-size: 12.5px;
  line-height: 1.55;
  color: #4B5563;
`;

// ─── Holiday banner (from Holidays table — distinct from category 'holiday' events) ────

export const HolidayBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #FBCEA0;
  background: #FFF7ED;
  color: #C2410C;
  border-radius: 12px;
  padding: 10px 12px;
  margin-bottom: 10px;
  font-size: 12.5px;
  font-weight: 600;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 22px 12px;
  color: #9CA3AF;
  font-size: 12.5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

// ─── Upcoming event row ─────────────────────────────────────────────────────

export const UpcomingRow = styled.button<{ $active?: boolean }>`
  font: inherit;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-width: 0;
  padding: 9px 10px;
  border-radius: 12px;
  border: 1px solid ${p => p.$active ? '#BBDAC8' : 'transparent'};
  background: ${p => p.$active ? '#F4F8F5' : 'transparent'};
  cursor: pointer;
  transition: all .15s;

  &:hover { background: #F4F8F5; }
`;

export const UpcomingDate = styled.div<{ $c: string; $tint: string }>`
  width: 44px;
  height: 44px;
  border-radius: 11px;
  background: ${p => p.$tint};
  color: ${p => p.$c};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const UpcomingDay = styled.span`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 16px;
  font-weight: 800;
  line-height: 1;
`;

export const UpcomingMonth = styled.span`
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: .04em;
  text-transform: uppercase;
  margin-top: 2px;
`;

export const UpcomingInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const UpcomingTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #1F2937;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UpcomingMeta = styled.div`
  font-size: 11.5px;
  color: #9CA3AF;
  font-weight: 500;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
