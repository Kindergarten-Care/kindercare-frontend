import React from 'react';

interface SvgProps {
  children: React.ReactNode;
  size?: number;
  sw?: number;
}

export function Svg({ children, size = 17, sw = 1.9 }: SvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}
