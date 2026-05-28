import React from 'react';

interface HeroLeafProps {
  size?: number;
}

export function HeroLeaf({ size = 260 }: HeroLeafProps): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      <path
        d="M100 20 Q160 60 160 100 Q160 160 100 180 Q40 160 40 100 Q40 60 100 20Z"
        fill="white"
        opacity=".18"
      />
      <path
        d="M100 40 Q148 72 148 100 Q148 148 100 164 Q52 148 52 100 Q52 72 100 40Z"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        opacity=".3"
      />
      <line x1="100" y1="20" x2="100" y2="180" stroke="white" strokeWidth="1" opacity=".2" />
      <path d="M100 60 Q120 80 130 100" stroke="white" strokeWidth="1" opacity=".2" />
      <path d="M100 60 Q80 80 70 100" stroke="white" strokeWidth="1" opacity=".2" />
    </svg>
  );
}
