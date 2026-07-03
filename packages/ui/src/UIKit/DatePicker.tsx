'use client';

import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import '../theme/types';

export interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  /** Renders the trigger — receives an onClick to toggle the panel open/closed */
  children: (props: { onClick: () => void; open: boolean }) => React.ReactNode;
  disabled?: boolean;
  id?: string;
  ariaLabel?: string;
  /** Disallow navigating/selecting dates after this date, if provided */
  maxDate?: Date;
  /** Disallow navigating/selecting dates before this date, if provided */
  minDate?: Date;
  showTodayShortcut?: boolean;
  showClearShortcut?: boolean;
  onClear?: () => void;
}

const WEEKDAYS = ['H', 'B', 'T', 'N', 'S', 'B', 'C'];
const MONTH_LABELS = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
];

const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const startOfDay = (d: Date): Date => new Date(d.getFullYear(), d.getMonth(), d.getDate());

const Root = styled.div`
  position: relative;
  display: inline-flex;
`;

const panelFade = keyframes`
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Panel = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 80;
  width: 296px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: 14px;
  animation: ${panelFade} 0.16s ease-out;
`;

const PanelHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const MonthLabelBtn = styled.button`
  font: inherit;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 14.5px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.fg};
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover { background: ${({ theme }) => theme.colors.greenXLight}; }
`;

const ArrowBtn = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.muted};
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: background .15s, color .15s;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.greenXLight};
    color: ${({ theme }) => theme.colors.fg};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const WeekRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  margin-bottom: 4px;
`;

const WeekdayCell = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;
  padding: 4px 0;
`;

const DayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

const DayCell = styled.button<{ $selected: boolean; $today: boolean; $outside: boolean; $disabled?: boolean }>`
  font: inherit;
  font-size: 12.5px;
  font-weight: ${({ $selected }) => ($selected ? 700 : 500)};
  padding: 8px 0;
  border-radius: 9px;
  border: ${({ $today, $selected, theme }) => ($today && !$selected ? `1.5px solid ${theme.colors.green}` : 'none')};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  color: ${({ theme, $selected, $outside, $disabled }) => {
    if ($disabled) return theme.colors.muted;
    if ($selected) return theme.colors.white ?? '#fff';
    if ($outside) return theme.colors.muted;
    return theme.colors.fg;
  }};
  background: ${({ theme, $selected }) => ($selected ? theme.colors.green : 'transparent')};
  opacity: ${({ $disabled }) => ($disabled ? 0.4 : 1)};
  transition: background .12s, color .12s;

  &:hover:not(:disabled) {
    background: ${({ theme, $selected }) => ($selected ? theme.colors.green : theme.colors.greenXLight)};
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const FooterLink = styled.button`
  font: inherit;
  font-size: 12.5px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.green};
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 6px;

  &:hover { background: ${({ theme }) => theme.colors.greenXLight}; }
`;

function ChevronLeftGlyph(): React.ReactElement {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightGlyph(): React.ReactElement {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export function DatePicker({
  value,
  onChange,
  children,
  disabled = false,
  id,
  ariaLabel = 'Chọn ngày',
  maxDate,
  minDate,
  showTodayShortcut = true,
  showClearShortcut = false,
  onClear,
}: DatePickerProps): React.ReactElement {
  const reactId = useId();
  const panelId = id ?? `date-picker-${reactId}`;

  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(value.getFullYear());
  const [viewMonth, setViewMonth] = useState(value.getMonth());
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) {
      setViewYear(value.getFullYear());
      setViewMonth(value.getMonth());
    }
  }, [open, value]);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const handler = (event: MouseEvent): void => {
      const root = rootRef.current;
      if (root && !root.contains(event.target as Node)) close();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const handler = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, close]);

  const isDateDisabled = (d: Date): boolean => {
    if (maxDate && startOfDay(d) > startOfDay(maxDate)) return true;
    if (minDate && startOfDay(d) < startOfDay(minDate)) return true;
    return false;
  };

  const goPrevMonth = (): void => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };

  const goNextMonth = (): void => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const selectDate = (d: Date): void => {
    if (isDateDisabled(d)) return;
    onChange(d);
    close();
  };

  const goToday = (): void => {
    const today = new Date();
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    selectDate(startOfDay(today));
  };

  const cells: Array<{ date: Date; outside: boolean }> = [];
  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const firstDow = firstOfMonth.getDay();
  const leadingBlanks = firstDow === 0 ? 6 : firstDow - 1;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  for (let i = leadingBlanks - 1; i >= 0; i--) {
    cells.push({ date: new Date(viewYear, viewMonth - 1, daysInPrevMonth - i), outside: true });
  }
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ date: new Date(viewYear, viewMonth, day), outside: false });
  }
  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1].date;
    cells.push({ date: new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1), outside: true });
  }

  const today = new Date();

  return (
    <Root ref={rootRef}>
      {children({ onClick: () => !disabled && setOpen(o => !o), open })}

      {open && (
        <Panel role="dialog" aria-label={ariaLabel} id={panelId}>
          <PanelHead>
            <ArrowBtn type="button" onClick={goPrevMonth} aria-label="Tháng trước">
              <ChevronLeftGlyph />
            </ArrowBtn>
            <MonthLabelBtn type="button" tabIndex={-1}>
              {MONTH_LABELS[viewMonth]} {viewYear}
            </MonthLabelBtn>
            <ArrowBtn type="button" onClick={goNextMonth} aria-label="Tháng sau">
              <ChevronRightGlyph />
            </ArrowBtn>
          </PanelHead>

          <WeekRow>
            {WEEKDAYS.map((w, idx) => <WeekdayCell key={`${w}-${idx}`}>{w}</WeekdayCell>)}
          </WeekRow>

          <DayGrid>
            {cells.map(({ date, outside }) => {
              const selected = isSameDay(date, value);
              const isToday = isSameDay(date, today);
              const disabledDay = isDateDisabled(date);
              return (
                <DayCell
                  key={date.toISOString()}
                  type="button"
                  $selected={selected}
                  $today={isToday}
                  $outside={outside}
                  $disabled={disabledDay}
                  disabled={disabledDay}
                  onClick={() => selectDate(date)}
                >
                  {date.getDate()}
                </DayCell>
              );
            })}
          </DayGrid>

          {(showTodayShortcut || showClearShortcut) && (
            <Footer>
              {showClearShortcut ? (
                <FooterLink type="button" onClick={() => { onClear?.(); close(); }}>Xóa</FooterLink>
              ) : <span />}
              {showTodayShortcut && (
                <FooterLink type="button" onClick={goToday}>Hôm nay</FooterLink>
              )}
            </Footer>
          )}
        </Panel>
      )}
    </Root>
  );
}
