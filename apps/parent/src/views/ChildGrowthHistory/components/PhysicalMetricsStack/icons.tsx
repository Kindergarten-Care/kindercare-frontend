import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
}

export const IconWeight: React.FC<IconProps> = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h12v4a6 6 0 0 1-12 0zM6 21h12v-4a6 6 0 0 0-12 0zM8 3v4M16 3v4" />
  </svg>
);

export const IconHeight: React.FC<IconProps> = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20M9 5l3-3 3 3M9 19l3 3 3-3M12 8h4M12 12H8M12 16h4" />
  </svg>
);

export const IconBmi: React.FC<IconProps> = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 15.5 15.5 8.5M9.5 9.5h.01M14.5 14.5h.01" />
  </svg>
);
