import type { AppTheme } from '@kindercare/ui';
import { BREAKPOINTS } from '@kindercare/ui';

export const theme: AppTheme = {
  colors: {
    bg: '#f8fafc',
    surface: '#ffffff',
    fg: '#1e293b',
    muted: '#64748b',
    border: '#e2e8f0',

    green: '#15803d',
    greenMid: '#22c55e',
    greenDark: '#166534',
    greenLight: '#f0fdf4',
    greenXLight: '#dcfce7',

    amber: '#b45309',
    amberLight: '#fef3c7',
    amberMid: '#f59e0b',

    red: '#dc2626',
    redLight: '#fee2e2',
    redMid: '#ef4444',
    redDark: '#991b1b',

    footerBg: '#0f172a',
    techBg: '#1e293b',
    white: '#ffffff',
  },
  fonts: {
    display: "var(--font-montserrat), 'Montserrat', sans-serif",
    body: "var(--font-montserrat), 'Montserrat', sans-serif",
  },
  radius: {
    sm: '6px',
    md: '10px',
    lg: '16px',
    xl: '24px',
    pill: '9999px',
  },
  shadows: {
    soft: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
    lg: '0 10px 30px -3px rgba(0, 0, 0, 0.1)',
  },
  layout: {
    navHeight: '64px',
    navHeightMobile: '56px',
    maxWidth: '1440px',
  },
  breakpoints: BREAKPOINTS,
};
