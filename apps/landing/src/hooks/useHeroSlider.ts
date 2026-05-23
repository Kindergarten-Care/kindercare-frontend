'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseHeroSliderArgs {
  total: number;
  autoplayMs: number;
}

interface UseHeroSliderResult {
  current: number;
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
  progressKey: number;
}

export function useHeroSlider({ total, autoplayMs }: UseHeroSliderArgs): UseHeroSliderResult {
  const [current, setCurrent] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      const normalized = ((index % total) + total) % total;
      setCurrent(normalized);
      setProgressKey((key) => key + 1);
    },
    [total],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setCurrent((value) => (value + 1) % total);
      setProgressKey((key) => key + 1);
    }, autoplayMs);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, total, autoplayMs]);

  return { current, goTo, next, prev, progressKey };
}
