'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseTechCarouselArgs {
  cardCount: number;
  stepPx: number;
}

interface UseTechCarouselResult {
  trackRef: React.RefObject<HTMLDivElement | null>;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  offset: number;
  move: (direction: 1 | -1) => void;
  isAtStart: boolean;
  isAtEnd: boolean;
}

export function useTechCarousel({ cardCount, stepPx }: UseTechCarouselArgs): UseTechCarouselResult {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);

  const recomputeMax = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const wrapperWidth = wrapper.offsetWidth;
    const trackWidth = cardCount * stepPx;
    setMaxOffset(Math.min(0, wrapperWidth - trackWidth));
  }, [cardCount, stepPx]);

  useEffect(() => {
    recomputeMax();
    window.addEventListener('resize', recomputeMax);
    return () => window.removeEventListener('resize', recomputeMax);
  }, [recomputeMax]);

  const move = useCallback(
    (direction: 1 | -1) => {
      setOffset((current) => {
        const candidate = current + -direction * stepPx;
        return Math.max(maxOffset, Math.min(0, candidate));
      });
    },
    [maxOffset, stepPx],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let startX = 0;
    let dragging = false;

    const onStart = (event: TouchEvent): void => {
      const touch = event.touches[0];
      if (!touch) return;
      startX = touch.clientX;
      dragging = true;
    };
    const onMove = (event: TouchEvent): void => {
      if (!dragging) return;
      const touch = event.touches[0];
      if (!touch) return;
      const dx = touch.clientX - startX;
      if (Math.abs(dx) > 30) {
        move(dx > 0 ? -1 : 1);
        dragging = false;
      }
    };
    const onEnd = (): void => {
      dragging = false;
    };

    track.addEventListener('touchstart', onStart, { passive: true });
    track.addEventListener('touchmove', onMove, { passive: true });
    track.addEventListener('touchend', onEnd);
    return () => {
      track.removeEventListener('touchstart', onStart);
      track.removeEventListener('touchmove', onMove);
      track.removeEventListener('touchend', onEnd);
    };
  }, [move]);

  return {
    trackRef,
    wrapperRef,
    offset,
    move,
    isAtStart: offset >= 0,
    isAtEnd: offset <= maxOffset,
  };
}
