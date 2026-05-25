export const theme = {
  colors: {
    primary: '#046E1E',        // Brand green
    secondary: '#a855f7',
    accent: '#006494',         // Link blue
    background: '#F7FAFC',     // Page background
    text: '#181C1E',           // Main text
    textSecondary: '#3F493D',  // Muted body text
    neutralLight: '#EBEEF0',   // Tab select background
    border: '#cbd5e1',         // Border line color
    white: '#ffffff',          // Base white
  },
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  spacing: (val: number) => `${val * 4}px`,
};

export type ThemeType = typeof theme;
