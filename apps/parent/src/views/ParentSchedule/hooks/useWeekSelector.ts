'use client';

import { useState, useCallback, useMemo } from 'react';

export interface UseWeekSelectorReturn {
  anchorDate: Date;
  weekOffset: number;
  goPrevWeek: () => void;
  goNextWeek: () => void;
  goCurrentWeek: () => void;
  weekLabel: string;
}

const startOfDay = (d: Date): Date => new Date(d.getFullYear(), d.getMonth(), d.getDate());

export function useWeekSelector(): UseWeekSelectorReturn {
  const [weekOffset, setWeekOffset] = useState(0);

  const goPrevWeek = useCallback(() => setWeekOffset(o => o - 1), []);
  const goNextWeek = useCallback(() => setWeekOffset(o => o + 1), []);
  const goCurrentWeek = useCallback(() => setWeekOffset(0), []);

  const anchorDate = useMemo(() => {
    const d = startOfDay(new Date());
    d.setDate(d.getDate() + weekOffset * 7);
    return d;
  }, [weekOffset]);

  const weekLabel = useMemo(() => {
    if (weekOffset === 0) return 'Tuần này';
    if (weekOffset < 0) return `${Math.abs(weekOffset)} tuần trước`;
    return `${weekOffset} tuần sau`;
  }, [weekOffset]);

  return { anchorDate, weekOffset, goPrevWeek, goNextWeek, goCurrentWeek, weekLabel };
}
