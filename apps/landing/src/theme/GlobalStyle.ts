'use client';

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.fg};
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 16px;
    line-height: 1.65;
    overflow-x: hidden;
  }
  img { display: block; max-width: 100%; }
  a { color: inherit; text-decoration: none; }
  ul { list-style: none; }
  button { cursor: pointer; border: none; background: none; font: inherit; }
  h1, h2, h3, h4 { font-family: ${({ theme }) => theme.fonts.display}; line-height: 1.25; }
  h2 { font-size: clamp(1.8rem, 3.5vw, 2.5rem); }
  h3 { font-size: clamp(1.2rem, 2.5vw, 1.5rem); }
`;
