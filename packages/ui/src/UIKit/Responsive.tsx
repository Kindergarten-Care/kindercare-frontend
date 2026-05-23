import React from 'react';
import styled, { css } from 'styled-components';
import type { AppThemeBreakpoints } from '../theme/types';

export interface ResponsiveProps {
  /**
   * Breakpoint at which the component starts being visible (inclusive).
   * E.g., from="md" means it is visible starting from 'md' width (>= 768px).
   */
  from?: keyof AppThemeBreakpoints;

  /**
   * Breakpoint up to which the component remains visible.
   * E.g., to="lg" means it is visible up to 'lg' width, and hidden from 'lg' onwards (>= 1024px).
   */
  to?: keyof AppThemeBreakpoints;

  /**
   * Custom CSS display property when visible.
   * Defaults to 'block'. Use 'contents' if you don't want a wrapper box affecting your layouts.
   */
  display?: string;

  /**
   * Custom HTML tag to render as.
   * Defaults to 'div'.
   */
  as?: React.ElementType;

  children: React.ReactNode;
}

interface ResponsiveWrapProps {
  $from?: keyof AppThemeBreakpoints;
  $to?: keyof AppThemeBreakpoints;
  $display?: string;
}

const ResponsiveWrap = styled.div<ResponsiveWrapProps>`
  display: ${({ $display }) => $display ?? 'block'};

  ${({ $from, theme }) => {
    if (!$from) return null;
    const minWidth = theme.breakpoints?.[$from];
    if (!minWidth) return null;
    return css`
      @media (max-width: calc(${minWidth} - 0.02px)) {
        display: none !important;
      }
    `;
  }}

  ${({ $to, theme }) => {
    if (!$to) return null;
    const maxWidth = theme.breakpoints?.[$to];
    if (!maxWidth) return null;
    return css`
      @media (min-width: ${maxWidth}) {
        display: none !important;
      }
    `;
  }}
`;

export function Responsive({
  from,
  to,
  display,
  as,
  children,
}: ResponsiveProps): React.ReactElement {
  return (
    <ResponsiveWrap $from={from} $to={to} $display={display} as={as}>
      {children}
    </ResponsiveWrap>
  );
}
