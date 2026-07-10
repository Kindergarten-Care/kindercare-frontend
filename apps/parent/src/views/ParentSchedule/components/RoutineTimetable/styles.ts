'use client';

import styled from 'styled-components';

export const Section = styled.div`
  margin-bottom: 26px;
`;

export const SecHead = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  margin-bottom: 14px;
`;

export const SecIcon = styled.span<{ $bg?: string; $fg?: string }>`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  background: ${p => p.$bg ?? '#E6F3ED'};
  color: ${p => p.$fg ?? '#005A36'};
`;

export const SecTitle = styled.h2`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -.015em;
  color: #1F2937;
`;

export const SecSub = styled.span`
  font-size: 12.5px;
  color: #9CA3AF;
  margin-left: auto;
  font-weight: 500;
`;

export const ExportPdfBtn = styled.button`
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  font-size: 12.5px;
  font-weight: 600;
  color: #005A36;
  background: #E6F3ED;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #d1e7dd;
  }
`;

export const TimetableWrap = styled.div`
  background: #fff;
  border: 1px solid #cbd5e1;
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
  overflow-x: auto;
`;

export const Timetable = styled.div`
  min-width: 760px;
  display: grid;
  grid-template-columns: 132px repeat(5, 1fr);
  background: #cbd5e1;
  gap: 1px;
`;

export const TtCell = styled.div`
  padding: 11px 12px;
  background: #ffffff;
`;

export const TtHead = styled(TtCell)<{ $today?: boolean; $corner?: boolean }>`
  background: ${p => p.$today ? '#005A36' : '#FBFDFC'};
  color: ${p => p.$today ? '#ffffff' : 'inherit'};
  position: sticky;
  top: 0;
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-weight: 800;
  font-size: 13.5px;
  text-align: center;
  padding: 13px 8px;
  ${p => p.$corner ? 'font-size: 12px; color: #9CA3AF; font-weight: 700; text-transform: uppercase; letter-spacing: .04em;' : ''}
`;

export const TtHeadDate = styled.div<{ $today?: boolean }>`
  font-family: var(--font-jetbrains-mono, 'JetBrains Mono'), monospace;
  font-size: 10.5px;
  font-weight: 500;
  margin-top: 2px;
  color: ${p => p.$today ? '#ffffff' : '#9CA3AF'};
`;

export const TtPeriod = styled.div<{ $c: string; $tint: string }>`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 9px 14px;
  background: ${p => p.$tint};
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-weight: 700;
  font-size: 12.5px;
  color: ${p => p.$c};
  letter-spacing: .02em;
  position: sticky;
  left: 0;
`;

export const TtPeriodIcon = styled.span`
  width: 22px;
  height: 22px;
  border-radius: 7px;
  background: #fff;
  color: inherit;
  display: grid;
  place-items: center;
  flex-shrink: 0;
`;

export const TtTime = styled(TtCell)`
  display: flex;
  align-items: center;
  gap: 7px;
  font-family: var(--font-jetbrains-mono, 'JetBrains Mono'), monospace;
  font-size: 11.5px;
  font-weight: 600;
  color: #6B7280;
  background: #FBFDFC;
  font-variant-numeric: tabular-nums;

  svg { color: #9CA3AF; flex-shrink: 0; }
`;

export const TtAct = styled(TtCell)<{ $c: string; $tint: string; $today?: boolean }>`
  display: flex;
  align-items: center;
  gap: 9px;
  min-height: 56px;
  background: ${p => p.$today ? '#F4FBF6' : '#ffffff'};
`;

export const TtActIcon = styled.span<{ $c: string; $tint: string }>`
  width: 30px;
  height: 30px;
  border-radius: 9px;
  display: grid;
  place-items: center;
  background: ${p => p.$tint};
  color: ${p => p.$c};
  flex-shrink: 0;
`;

export const TtActName = styled.span`
  font-size: 12.5px;
  font-weight: 600;
  color: #1F2937;
  line-height: 1.3;
`;

export const TtActMeta = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const TtActDetails = styled.div`
  font-size: 11px;
  color: #6B7280;
  margin-top: 3px;
  font-weight: normal;
  line-height: 1.3;
`;

export const TimetableEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #6B7280;
  background: #FFFFFF;
  border: 1px dashed #E5E7EB;
  border-radius: 12px;
  text-align: center;
  gap: 8px;
  margin: 0 10px;
`;

export const TimetableEmptyTitle = styled.div`
  font-weight: 600;
  font-size: 15px;
  color: #374151;
`;

export const TimetableEmptyDesc = styled.div`
  font-size: 13px;
  color: #9CA3AF;
`;