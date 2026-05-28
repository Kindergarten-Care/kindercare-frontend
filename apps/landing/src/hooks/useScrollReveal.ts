'use client';

import { useEffect, useRef, useState } from 'react';

interface UseScrollRevealResult<T extends HTMLElement> {
  ref: React.RefObject<T | null>;
  visible: boolean;
}

export function useScrollReveal<T extends HTMLElement>(threshold = 0.12): UseScrollRevealResult<T> {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}
