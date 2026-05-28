import React from 'react';

interface LogoMarkProps {
  size?: number;
  variant?: 'light' | 'dark';
}

export function LogoMark({ size = 40, variant = 'light' }: LogoMarkProps): React.ReactElement {
  const isDark = variant === 'dark';
  const stroke = isDark ? '#5a9e44' : '#3d7225';
  const stemLeafDark = isDark ? '#5a9e44' : '#3d7225';
  const leafLight = isDark ? '#7bc46a' : '#5a9e44';
  const soil = isDark ? '#e8a830' : '#e8a830';
  const circleFill = isDark ? 'rgba(255,255,255,.05)' : '#f5fbf2';
  const soilOpacity = isDark ? 0.8 : 1;

  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18.5" stroke={stroke} strokeWidth="2.5" fill={circleFill} />
      <ellipse cx="20" cy="28" rx="10" ry="5" fill={soil} opacity={soilOpacity} />
      <line x1="20" y1="28" x2="20" y2="16" stroke={stemLeafDark} strokeWidth="2" strokeLinecap="round" />
      <path d="M20 22 Q14 18 13 12 Q18 14 20 18" fill={stemLeafDark} />
      <path d="M20 20 Q26 16 27 10 Q22 12 20 16" fill={leafLight} />
    </svg>
  );
}
