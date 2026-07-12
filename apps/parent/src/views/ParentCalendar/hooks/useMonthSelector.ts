'use client';

import { useState, useCallback, useMemo } from 'react';

export interface UseMonthSelectorReturn {
  viewYear: number;
  viewMonth: number;
  isCurrentMonth: boolean;
  monthLabel: string;
  goPrevMonth: () => void;
  goNextMonth: () => void;
  goCurrentMonth: () => void;
  goToMonth: (year: number, month: number) => void;
}

export function useMonthSelector(): UseMonthSelectorReturn {
  const [view, setView] = useState<{ year: number; month: number }>(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  const goPrevMonth = useCallback(() => {
    setView(prev => {
      const d = new Date(prev.year, prev.month - 1, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  }, []);

  const goNextMonth = useCallback(() => {
    setView(prev => {
      const d = new Date(prev.year, prev.month + 1, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  }, []);

  const goCurrentMonth = useCallback(() => {
    const now = new Date();
    setView({ year: now.getFullYear(), month: now.getMonth() });
  }, []);

  const goToMonth = useCallback((year: number, month: number) => {
    const d = new Date(year, month, 1);
    setView({ year: d.getFullYear(), month: d.getMonth() });
  }, []);

  const isCurrentMonth = useMemo(() => {
    const now = new Date();
    return view.year === now.getFullYear() && view.month === now.getMonth();
  }, [view]);

  const monthLabel = `Tháng ${view.month + 1}, ${view.year}`;

  return {
    viewYear: view.year,
    viewMonth: view.month,
    isCurrentMonth,
    monthLabel,
    goPrevMonth,
    goNextMonth,
    goCurrentMonth,
    goToMonth,
  };
}
