/**
 * Global standardized breakpoint constants for the entire monorepo.
 * These can be used in styled-components theme config, media queries, or JavaScript responsive logic.
 */
export const BREAKPOINTS = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  xxl: '1536px',

  // Legacy fallback breakpoints for backwards compatibility
  mobile: '479px',
  tablet: '767px',
  desktop: '1023px',
} as const;

export type BreakpointKey = keyof typeof BREAKPOINTS;
