import 'styled-components';

export interface AppThemeColors {
  bg: string;
  surface: string;
  fg: string;
  muted: string;
  border: string;
  green: string;
  greenMid: string;
  greenDark: string;
  greenLight: string;
  greenXLight: string;
  amber: string;
  amberLight: string;
  amberMid: string;
  red?: string;
  redLight?: string;
  redMid?: string;
  redDark?: string;
  footerBg: string;
  techBg: string;
  white: string;

  // UI legacy theme colors
  primary?: string;
  secondary?: string;
  accent?: string;
  background?: string;
  text?: string;
  textSecondary?: string;
  neutralLight?: string;
  neutralLighter?: string;
  borderMuted?: string;
  successLight?: string;
  success?: string;
}

export interface AppThemeFonts {
  display: string;
  body: string;
}

export interface AppThemeRadius {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  pill: string;
}

export interface AppThemeShadows {
  soft: string;
  lg: string;
}

export interface AppThemeLayout {
  navHeight: string;
  navHeightMobile: string;
  maxWidth: string;
}

export interface AppThemeBreakpoints {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface AppTheme {
  colors: AppThemeColors;
  fonts: AppThemeFonts;
  radius: AppThemeRadius;
  shadows: AppThemeShadows;
  layout: AppThemeLayout;
  breakpoints: AppThemeBreakpoints;
}

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
