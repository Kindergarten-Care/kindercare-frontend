import type { AppTheme } from '@kindercare/ui';
import { BREAKPOINTS } from '@kindercare/ui';

export const theme: AppTheme = {
  colors: {
    bg: '#f8fffe',
    surface: '#ffffff',
    fg: '#111827',
    muted: '#6b7280',
    border: '#e5e7eb',

    green: '#237A3C',
    greenMid: '#2f9e4f',
    greenDark: '#1a5c2d',
    greenLight: '#e8f5ed',
    greenXLight: '#f0faf4',

    amber: '#d97706',
    amberLight: '#fff0d8',
    amberMid: '#f2a33c',

    footerBg: '#0f1a0b',
    techBg: '#111d0d',
    white: '#ffffff',

    // UI legacy theme colors (required by shared UI Kit components)
    primary: '#237A3C',
    secondary: '#2f9e4f',
    accent: '#2f9e4f',
    background: '#f8fffe',
    text: '#111827',
    textSecondary: '#6b7280',
    neutralLight: '#f3f4f6',
    neutralLighter: '#f9fafb',
    borderMuted: '#e5e7eb',
    successLight: '#dcfce7',
    success: '#15803d',
  },
  fonts: {
    display: "'Baloo 2', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    pill: '50px',
  },
  shadows: {
    soft: '0 4px 24px rgba(35, 122, 60, 0.09)',
    lg: '0 12px 48px rgba(35, 122, 60, 0.14)',
  },
  layout: {
    navHeight: '64px',
    navHeightMobile: '56px',
    maxWidth: '1280px',
  },
  breakpoints: BREAKPOINTS,
};
