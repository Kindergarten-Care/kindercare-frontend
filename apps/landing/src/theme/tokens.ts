import type { AppTheme } from '@kindercare/ui';
import { BREAKPOINTS } from '@kindercare/ui';

export const theme: AppTheme = {
  colors: {
    bg: '#faf8f4',
    surface: '#ffffff',
    fg: '#1c2218',
    muted: '#68736a',
    border: '#e4e0d8',

    green: '#2d6a22',
    greenMid: '#3d7a2e',
    greenDark: '#1a4214',
    greenLight: '#e6f4e2',
    greenXLight: '#f2faf0',

    amber: '#c4880a',
    amberLight: '#fef5db',
    amberMid: '#e09b10',

    footerBg: '#0f1a0b',
    techBg: '#111d0d',
    white: '#ffffff',
  },
  fonts: {
    display: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    body: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    pill: '50px',
  },
  shadows: {
    soft: '0 4px 24px rgba(30,50,28,.09)',
    lg: '0 12px 48px rgba(30,50,28,.14)',
  },
  layout: {
    navHeight: '72px',
    navHeightMobile: '60px',
    maxWidth: '1200px',
  },
  breakpoints: BREAKPOINTS,
};
