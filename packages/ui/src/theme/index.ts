import type { AppTheme } from './types';
import { BREAKPOINTS } from './constants';

export const theme: AppTheme = {
  colors: {
    primary: '#046E1E',         // Brand green
    secondary: '#a855f7',
    accent: '#006494',          // Link blue
    background: '#F7FAFC',      // Page background
    text: '#181C1E',            // Main text
    textSecondary: '#3F493D',   // Muted body text
    neutralLight: '#EBEEF0',    // Tab select background
    neutralLighter: '#F1F4F6',  // Input grey background
    border: '#cbd5e1',          // Border line color
    borderMuted: '#BFCAB9',     // Soft border for metrics cards
    successLight: 'rgba(118, 210, 117, 0.50)', // Status badge bg
    success: '#76D275',         // Status badge text & border
    white: '#ffffff',           // Base white

    // Backward-compatible shared theme keys used by existing UI components.
    surface: '#ffffff',
    fg: '#181C1E',
    muted: '#3F493D',
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
