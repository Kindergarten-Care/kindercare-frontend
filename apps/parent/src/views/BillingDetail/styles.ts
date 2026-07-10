'use client';

import styled from 'styled-components';

export const PageWrap = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 32px 56px;
  @media (max-width: 860px) { padding: 18px 18px 48px; }
  @media (max-width: 768px) { padding: 16px 0 48px; }
`;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 440px;
  align-items: start;
  gap: 24px;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

export const MainColumn = styled.div`
  min-width: 0;
`;

export const SideColumn = styled.div`
  position: sticky;
  top: 24px;

  @media (max-width: 1000px) {
    position: static;
  }
`;

export const BackLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--muted, #6b7280);
  text-decoration: none;
  margin-bottom: 16px;

  &:hover { color: var(--fg, #1f2937); }
`;

export const LoadingState = styled.div`
  padding: 48px 24px;
  text-align: center;
  color: #6b7280;
`;

export const CardBody = styled.div`
  padding: 22px 24px;
`;