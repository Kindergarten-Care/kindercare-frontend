'use client';

import { useState, useCallback, useMemo } from 'react';

export interface UseWeekSelectorReturn {
  anchorDate: Date;
  weekOffset: number;
  goPrevWeek: () => void;
  goNextWeek: () => void;
  goCurrentWeek: () => void;
  setAnchorDate: (date: Date) => void;
  weekLabel: string;
}

const startOfDay = (d: Date): Date => new Date(d.getFullYear(), d.getMonth(), d.getDate());

export function useWeekSelector(): UseWeekSelectorReturn {
  const [anchorDate, setAnchorDateState] = useState<Date>(() => {
    const today = startOfDay(new Date());
    const dow = today.getDay();
    const diffToMonday = (dow + 6) % 7;
    const monday = new Date(today);
    monday.setDate(monday.getDate() - diffToMonday);
    return monday;
  });

  const goPrevWeek = useCallback(() => {
    setAnchorDateState(prev => {
      const d = new Date(prev);
      d.setDate(prev.getDate() - 7);
      return d;
    });
  }, []);

  const goNextWeek = useCallback(() => {
    setAnchorDateState(prev => {
      const d = new Date(prev);
      d.setDate(prev.getDate() + 7);
      return d;
    });
  }, []);

  const goCurrentWeek = useCallback(() => {
    setAnchorDateState(() => {
      const today = startOfDay(new Date());
      const dow = today.getDay();
      const diffToMonday = (dow + 6) % 7;
      const monday = new Date(today);
      monday.setDate(monday.getDate() - diffToMonday);
      return monday;
    });
  }, []);

  const setAnchorDate = useCallback((date: Date) => {
    setAnchorDateState(startOfDay(date));
  }, []);

  const weekOffset = useMemo(() => {
    const today = startOfDay(new Date());
    const todayDow = today.getDay();
    const todayDiff = (todayDow + 6) % 7;
    const todayMonday = new Date(today);
    todayMonday.setDate(today.getDate() - todayDiff);

    const anchorDow = anchorDate.getDay();
    const anchorDiff = (anchorDow + 6) % 7;
    const anchorMonday = new Date(anchorDate);
    anchorMonday.setDate(anchorDate.getDate() - anchorDiff);

    const msDiff = anchorMonday.getTime() - todayMonday.getTime();
    return Math.round(msDiff / (7 * 24 * 3600 * 1000));
  }, [anchorDate]);

  const weekLabel = useMemo(() => {
    if (weekOffset === 0) return 'Tuần này';
    if (weekOffset < 0) return `${Math.abs(weekOffset)} tuần trước`;
    return `${weekOffset} tuần sau`;
  }, [weekOffset]);

  return { anchorDate, weekOffset, goPrevWeek, goNextWeek, goCurrentWeek, setAnchorDate, weekLabel };
}
