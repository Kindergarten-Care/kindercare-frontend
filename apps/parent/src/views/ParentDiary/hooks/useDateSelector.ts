'use client';

import { useState, useMemo } from 'react';

export interface UseDateSelectorReturn {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedDateStr: string;
}

export function useDateSelector(): UseDateSelectorReturn {
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());

  const selectedDateStr = useMemo(() => {
    const today = new Date();
    const d = selectedDate;
    const isToday =
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear();

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const isYesterday =
      d.getDate() === yesterday.getDate() &&
      d.getMonth() === yesterday.getMonth() &&
      d.getFullYear() === yesterday.getFullYear();

    const dateFormatted = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
    if (isToday) return `Hôm nay, ${dateFormatted}`;
    if (isYesterday) return `Hôm qua, ${dateFormatted}`;
    return dateFormatted;
  }, [selectedDate]);

  return { selectedDate, setSelectedDate, selectedDateStr };
}
