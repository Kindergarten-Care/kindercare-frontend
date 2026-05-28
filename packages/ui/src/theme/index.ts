import type { AppTheme } from './types';
import { BREAKPOINTS } from './constants';

export const theme: AppTheme & { spacing: (val: number) => string } = {
  colors: {
    // Required AppThemeColors
    bg: '#faf8f4',
    surface: '#ffffff',
    fg: '#1c2218',
    muted: '#68736a',
    border: '#cbd5e1',

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

    // UI legacy theme colors
    primary: '#046E1E',
    secondary: '#a855f7',
    accent: '#006494',
    background: '#F7FAFC',
    text: '#181C1E',
    textSecondary: '#3F493D',
    neutralLight: '#EBEEF0',
    neutralLighter: '#F1F4F6',
    borderMuted: '#BFCAB9',
    successLight: 'rgba(118, 210, 117, 0.50)',
    success: '#76D275',
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
  spacing: (val: number) => `${val * 4}px`,
};

export type {
  AppTheme,
  AppThemeColors,
  AppThemeFonts,
  AppThemeRadius,
  AppThemeShadows,
  AppThemeLayout,
  AppThemeBreakpoints,
} from './types';

export { BREAKPOINTS } from './constants';
export type { BreakpointKey } from './constants';
