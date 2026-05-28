import React from 'react';

export function EnvIllustration(): React.ReactElement {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <rect width="80" height="80" rx="16" fill="#c8e8c0" />
      <rect x="10" y="30" width="60" height="35" rx="4" fill="#3d7225" opacity=".3" />
      <rect x="20" y="20" width="40" height="30" rx="4" fill="#3d7225" opacity=".5" />
      <circle cx="40" cy="35" r="8" fill="#3d7225" opacity=".6" />
      <rect x="15" y="55" width="12" height="10" rx="2" fill="#2d6a22" opacity=".6" />
      <rect x="35" y="50" width="10" height="15" rx="2" fill="#2d6a22" opacity=".6" />
      <rect x="55" y="53" width="10" height="12" rx="2" fill="#2d6a22" opacity=".6" />
    </svg>
  );
}
