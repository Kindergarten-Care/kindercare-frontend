'use client';

import React from 'react';
import { ThemeProvider as StyledThemeProvider, DefaultTheme } from 'styled-components';
import { BREAKPOINTS } from '@kindercare/ui';

export const portalTheme: DefaultTheme = {
  colors: {
    bg: '#F8FAFC',
    surface: '#FFFFFF',
    fg: '#1E293B',
    muted: '#64748B',
    border: '#E2E8F0',
    green: '#15803D',
    greenMid: '#166534',
    greenDark: '#14532D',
    greenLight: '#DCFCE7',
    greenXLight: '#F0FDF4',
    amber: '#D97706',
    amberLight: '#FEF3C7',
    amberMid: '#B45309',
    footerBg: '#0F172A',
    techBg: '#1E293B',
    white: '#FFFFFF',
    // Custom portal colors
    primary: '#15803D',
    text: '#1E293B',
    background: '#F8FAFC',
  },
  fonts: {
    display: "'Inter', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
  },
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    pill: '50px',
  },
  shadows: {
    soft: '0 4px 24px rgba(0, 0, 0, 0.05)',
    lg: '0 12px 48px rgba(0, 0, 0, 0.08)',
  },
  layout: {
    navHeight: '72px',
    navHeightMobile: '60px',
    maxWidth: '1200px',
  },
  breakpoints: BREAKPOINTS,
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <StyledThemeProvider theme={portalTheme}>{children}</StyledThemeProvider>;
}
