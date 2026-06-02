'use client';

import React from 'react';
import { ThemeProvider as StyledThemeProvider, DefaultTheme } from 'styled-components';

export const portalTheme: DefaultTheme = {
  colors: {
    surface: '#FFFFFF',
    primary: '#15803D',
    text: '#1E293B',
    background: '#F8FAFC',
  },
  fonts: {
    display: "'Montserrat', sans-serif",
    body: "'Montserrat', sans-serif",
  },
  breakpoints: {
    lg: '1024px',
  }
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <StyledThemeProvider theme={portalTheme}>{children}</StyledThemeProvider>;
}
