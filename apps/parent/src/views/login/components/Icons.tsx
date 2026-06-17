'use client';

import React from 'react';

/* ─── CDN Assets ─── */
export const LOGO_URL =
  'https://media.kindercare.app/KinderCare%20Logo/KinderCare_LogoTextHorizontal.png';

/* ─── Premium SVG Icons (Zero Dependencies) ─── */
export const SproutIcon = ({ size = 42 }: { size?: number }): React.ReactElement => (
  <svg
    viewBox="460 200 280 280"
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="600" cy="330" r="120" fill="#ffffff" />
    <path
      d="M600 450V360"
      stroke="#237a3c"
      strokeWidth="22"
      strokeLinecap="round"
    />
    <path
      d="M600 380c0-46 38-82 92-82 0 46-38 82-92 82Z"
      fill="#7cc24f"
    />
    <path
      d="M600 350c0-42-36-74-84-74 0 42 36 74 84 74Z"
      fill="#226a33"
    />
    <circle cx="690" cy="278" r="22" fill="#f2a33c" />
  </svg>
);

export const PhoneIcon = (): React.ReactElement => (
  <svg
    width="1.1em"
    height="1.1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const EmailIcon = (): React.ReactElement => (
  <svg
    width="1.1em"
    height="1.1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

export const LockIcon = (): React.ReactElement => (
  <svg
    width="1.1em"
    height="1.1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export const EyeIcon = (): React.ReactElement => (
  <svg
    width="1.1em"
    height="1.1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const EyeOffIcon = (): React.ReactElement => (
  <svg
    width="1.1em"
    height="1.1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export const HeadsetIcon = (): React.ReactElement => (
  <svg
    width="1.1em"
    height="1.1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

export const UploadIcon = (): React.ReactElement => (
  <svg
    width="2em"
    height="2em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgba(255, 255, 255, 0.85)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

export const UserIcon = (): React.ReactElement => (
  <svg
    width="1.1em"
    height="1.1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

