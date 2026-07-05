'use client';

import styled from 'styled-components';

export const PageWrap = styled.div`
  padding: 24px 32px 56px;
  @media (max-width: 860px) { padding: 18px 18px 48px; }
  @media (max-width: 768px) { padding: 16px 0 48px; }
`;

// ─── Week picker bar ────────────────────────────────────────────────────────

export const WeekBar = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  background: #fff;
  border: 1px solid #E6EEE9;
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
  padding: 14px 18px;
  margin-bottom: 22px;
  flex-wrap: wrap;
`;

export const WeekNav = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const WeekNavBtn = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 11px;
  border: 1px solid #E6EEE9;
  background: #fff;
  color: #6B7280;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all .15s;

  &:hover { border-color: #CFE0D5; color: #005A36; background: #F4F8F5; }
`;

export const WeekCurrent = styled.div`
  flex: 1 1 210px;
  min-width: 0;

  @media (max-width: 480px) {
    flex-basis: 100%;
  }
`;

export const WeekPickLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .05em;
  text-transform: uppercase;
  color: #9CA3AF;
`;

export const WeekRange = styled.div`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 17px;
  font-weight: 800;
  letter-spacing: -.01em;
  margin-top: 2px;
  color: #1F2937;
`;

export const WeekTodayBtn = styled.button`
  font: inherit;
  font-size: 12.5px;
  font-weight: 600;
  padding: 9px 14px;
  border-radius: 11px;
  border: 1px solid #E6EEE9;
  background: #fff;
  color: #005A36;
  cursor: pointer;
  transition: all .15s;

  &:hover { background: #E6F3ED; }
`;

export const WeekDayTabs = styled.div`
  margin-left: auto;
  display: flex;
  gap: 7px;

  @media (max-width: 960px) { display: none; }
`;

export const WeekDayTab = styled.div<{ $today?: boolean }>`
  min-width: 54px;
  padding: 7px 8px;
  border-radius: 11px;
  border: 1px solid ${p => p.$today ? '#BBDAC8' : '#E6EEE9'};
  background: ${p => p.$today ? '#E6F3ED' : '#fff'};
  text-align: center;
`;

export const WeekDayTabDow = styled.div`
  font-size: 10.5px;
  font-weight: 700;
  color: #9CA3AF;
  text-transform: uppercase;
`;

export const WeekDayTabNum = styled.div<{ $today?: boolean }>`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 15px;
  font-weight: 800;
  margin-top: 2px;
  color: ${p => p.$today ? '#005A36' : '#1F2937'};
`;

// ─── Sections ───────────────────────────────────────────────────────────────

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

export const MockBadge = styled.span`
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: .02em;
  color: #92400E;
  background: #FEF3C7;
  border: 1px solid #FDE68A;
  padding: 3px 9px;
  border-radius: 7px;
  margin-left: 8px;
`;

// ─── Weekly columns (menu / lessons) ────────────────────────────────────────

export const WeekCols = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;

  @media (max-width: 1180px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 620px) { grid-template-columns: 1fr; }
`;

export const DayCol = styled.div<{ $today?: boolean }>`
  background: #fff;
  border: 1px solid ${p => p.$today ? '#BBDAC8' : '#E6EEE9'};
  border-radius: 15px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow .15s, border-color .15s;

  &:hover { box-shadow: 0 18px 48px -12px rgba(0, 90, 54, 0.16), 0 6px 16px -6px rgba(0, 0, 0, 0.06); border-color: #DCE7DF; }
`;

export const DayColHead = styled.div<{ $today?: boolean }>`
  padding: 12px 15px;
  border-bottom: 1px solid #EEF4F0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${p => p.$today ? '#E6F3ED' : '#FBFDFC'};
`;

export const DayColDow = styled.div<{ $today?: boolean }>`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: -.01em;
  color: ${p => p.$today ? '#005A36' : '#1F2937'};
`;

export const DayColDate = styled.div`
  font-family: var(--font-jetbrains-mono, 'JetBrains Mono'), monospace;
  font-size: 11px;
  color: #9CA3AF;
`;

export const DayColTodayTag = styled.span`
  font-size: 9.5px;
  font-weight: 700;
  color: #005A36;
  background: #fff;
  border: 1px solid #BBDAC8;
  padding: 2px 7px;
  border-radius: 6px;
`;

// ─── Meal blocks (inside DayCol) ────────────────────────────────────────────

export const Meal = styled.div<{ $c: string; $tint: string }>`
  padding: 12px 15px;
  --c: ${p => p.$c};
  --c-tint: ${p => p.$tint};

  & + & { border-top: 1px solid #EEF4F0; }
`;

export const MealLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .03em;
  text-transform: uppercase;
  color: var(--c);
  margin-bottom: 8px;
`;

export const MealLabelIcon = styled.span`
  width: 22px;
  height: 22px;
  border-radius: 7px;
  background: var(--c-tint);
  color: var(--c);
  display: grid;
  place-items: center;
  flex-shrink: 0;
`;

export const Dish = styled.div<{ $c: string }>`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  color: #374151;
  line-height: 1.45;
  padding: 3px 0;

  &::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: ${p => p.$c};
    margin-top: 7px;
    flex-shrink: 0;
  }
`;

export const MealEmpty = styled.div`
  padding: 12px 15px;
  font-size: 12.5px;
  color: #9CA3AF;
`;

// ─── Lesson blocks (inside DayCol) ──────────────────────────────────────────

export const LessonBody = styled.div`
  padding: 13px 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Lesson = styled.div<{ $c: string; $tint: string }>`
  display: flex;
  gap: 11px;
  align-items: flex-start;
  --c: ${p => p.$c};
  --c-tint: ${p => p.$tint};
`;

export const LessonIcon = styled.span`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: var(--c-tint);
  color: var(--c);
  flex-shrink: 0;
`;

export const LessonSubject = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: var(--c);
  letter-spacing: .02em;
  text-transform: uppercase;
`;

export const LessonTitle = styled.div`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 13.5px;
  font-weight: 700;
  margin-top: 2px;
  line-height: 1.3;
  color: #1F2937;
`;

export const LessonDesc = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 3px;
  line-height: 1.45;
`;

// ─── Theme banner (month / week topic) ─────────────────────────────────────

export const ThemeBar = styled.div`
  display: flex;
  align-items: stretch;
  gap: 0;
  background: linear-gradient(105deg, #EBF6F0 0%, #FFFFFF 92%);
  border: 1px solid #CFE7D8;
  border-radius: 16px;
  box-shadow: 0 6px 22px -10px rgba(0, 90, 54, .18);
  padding: 16px 22px;
  margin-bottom: 22px;

  @media (max-width: 720px) { flex-direction: column; gap: 16px; }
`;

export const ThemeItem = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
  min-width: 0;
`;

export const ThemeIcon = styled.span<{ $variant: 'month' | 'week' }>`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  color: #fff;
  ${p => p.$variant === 'month'
    ? 'background: #005A36; box-shadow: 0 8px 18px -6px rgba(0,90,54,.5);'
    : 'background: #DB2777; box-shadow: 0 8px 18px -6px rgba(219,39,119,.45);'}
`;

export const ThemeLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .05em;
  text-transform: uppercase;
  color: #9CA3AF;
`;

export const ThemeValue = styled.div`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 19px;
  font-weight: 800;
  letter-spacing: -.02em;
  margin-top: 3px;
  color: #1F2937;
`;

export const ThemeDivider = styled.div`
  width: 1px;
  background: #E6EEE9;
  margin: 0 22px;

  @media (max-width: 720px) { width: auto; height: 1px; margin: 0; }
`;

// ─── Weekly routine timetable (grid: time col × 5 weekday cols) ────────────

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

export const EmptyState = styled.div`
  padding: 34px 16px;
  text-align: center;
  color: #9CA3AF;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9px;

  p { font-size: 12.5px; font-weight: 500; }
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
