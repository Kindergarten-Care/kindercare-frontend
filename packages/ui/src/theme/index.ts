export const theme = {
  colors: {
    primary: '#6366f1',
    secondary: '#a855f7',
    accent: '#ec4899',
    background: '#f8fafc',
    text: '#1e293b',
    textSecondary: '#64748b',
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
