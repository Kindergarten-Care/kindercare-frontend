'use client';

import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import '../theme/types';

export interface MonthYearPickerProps {
  /** 0-indexed month (0 = January) */
  month: number;
  year: number;
  onChange: (month: number, year: number) => void;
  monthLabels?: string[];
  disabled?: boolean;
  id?: string;
  ariaLabel?: string;
  /** Disallow navigating/selecting months after this (year, month) pair, if provided */
  maxDate?: { year: number; month: number };
}

const DEFAULT_MONTH_LABELS = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
];

const SHORT_MONTH_LABELS = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];

const Root = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

const Pick = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 11px;
  padding: 4px;
`;

const ArrowBtn = styled.button`
  width: 32px;
  height: 32px;
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

const LabelBtn = styled.button<{ $open: boolean }>`
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.fg};
  background: ${({ $open, theme }) => ($open ? theme.colors.greenXLight : 'transparent')};
  border: none;
  border-radius: 8px;
  padding: 6px 10px;
  min-width: 96px;
  text-align: center;
  cursor: pointer;
  transition: background .15s;

  &:hover {
    background: ${({ theme }) => theme.colors.greenXLight};
  }
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
  width: 268px;
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

const PanelYear = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.fg};
`;

const MonthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
`;

const MonthCell = styled.button<{ $selected: boolean; $disabled?: boolean }>`
  font: inherit;
  font-size: 12.5px;
  font-weight: ${({ $selected }) => ($selected ? 700 : 500)};
  padding: 9px 4px;
  border-radius: 9px;
  border: none;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  color: ${({ theme, $selected, $disabled }) => {
    if ($disabled) return theme.colors.muted;
    if ($selected) return theme.colors.white ?? '#fff';
    return theme.colors.fg;
  }};
  background: ${({ theme, $selected }) => ($selected ? theme.colors.green : 'transparent')};
  opacity: ${({ $disabled }) => ($disabled ? 0.4 : 1)};
  transition: background .12s, color .12s;

  &:hover:not(:disabled) {
    background: ${({ theme, $selected }) => ($selected ? theme.colors.green : theme.colors.greenXLight)};
  }
`;

function ChevronLeftGlyph(): React.ReactElement {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightGlyph(): React.ReactElement {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export function MonthYearPicker({
  month,
  year,
  onChange,
  monthLabels = DEFAULT_MONTH_LABELS,
  disabled = false,
  id,
  ariaLabel = 'Chọn tháng',
  maxDate,
}: MonthYearPickerProps): React.ReactElement {
  const reactId = useId();
  const triggerId = id ?? `month-year-picker-${reactId}`;

  const [open, setOpen] = useState(false);
  const [panelYear, setPanelYear] = useState(year);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) setPanelYear(year);
  }, [open, year]);

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

  const isMonthDisabled = (m: number): boolean => {
    if (!maxDate) return false;
    return panelYear > maxDate.year || (panelYear === maxDate.year && m > maxDate.month);
  };

  const goPrevMonth = (): void => {
    if (month === 0) onChange(11, year - 1);
    else onChange(month - 1, year);
  };

  const goNextMonth = (): void => {
    if (maxDate && year === maxDate.year && month === maxDate.month) return;
    if (month === 11) onChange(0, year + 1);
    else onChange(month + 1, year);
  };

  const isNextDisabled = !!maxDate && year === maxDate.year && month === maxDate.month;

  const selectMonth = (m: number): void => {
    if (isMonthDisabled(m)) return;
    onChange(m, panelYear);
    close();
  };

  return (
    <Root ref={rootRef}>
      <Pick>
        <ArrowBtn type="button" onClick={goPrevMonth} disabled={disabled} aria-label="Tháng trước">
          <ChevronLeftGlyph />
        </ArrowBtn>
        <LabelBtn
          type="button"
          id={triggerId}
          $open={open}
          disabled={disabled}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label={ariaLabel}
          onClick={() => setOpen(o => !o)}
        >
          {monthLabels[month]}, {year}
        </LabelBtn>
        <ArrowBtn type="button" onClick={goNextMonth} disabled={disabled || isNextDisabled} aria-label="Tháng sau">
          <ChevronRightGlyph />
        </ArrowBtn>
      </Pick>

      {open && (
        <Panel role="dialog" aria-labelledby={triggerId}>
          <PanelHead>
            <ArrowBtn type="button" onClick={() => setPanelYear(y => y - 1)} aria-label="Năm trước">
              <ChevronLeftGlyph />
            </ArrowBtn>
            <PanelYear>{panelYear}</PanelYear>
            <ArrowBtn
              type="button"
              onClick={() => setPanelYear(y => y + 1)}
              disabled={!!maxDate && panelYear >= maxDate.year}
              aria-label="Năm sau"
            >
              <ChevronRightGlyph />
            </ArrowBtn>
          </PanelHead>
          <MonthGrid>
            {SHORT_MONTH_LABELS.map((label, idx) => {
              const isSelected = idx === month && panelYear === year;
              const isDisabled = isMonthDisabled(idx);
              return (
                <MonthCell
                  key={label}
                  type="button"
                  $selected={isSelected}
                  $disabled={isDisabled}
                  disabled={isDisabled}
                  onClick={() => selectMonth(idx)}
                >
                  {label}
                </MonthCell>
              );
            })}
          </MonthGrid>
        </Panel>
      )}
    </Root>
  );
}
