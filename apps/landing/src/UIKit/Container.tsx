'use client';

import styled from 'styled-components';

export const Container = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 1.5rem;
  width: 100%;
`;

export const Section = styled.section`
  padding: 5rem 1.5rem;
  scroll-margin-top: ${({ theme }) => theme.layout.navHeight};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    scroll-margin-top: ${({ theme }) => theme.layout.navHeightMobile};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 3.5rem 1.25rem;
  }
`;

export const SectionInner = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
`;
