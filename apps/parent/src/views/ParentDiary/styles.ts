'use client';

import styled from 'styled-components';

// ─── Page layout ──────────────────────────────────────────────────────────────

export const PageWrap = styled.div`
  padding: 24px 32px 56px;
  @media (max-width: 860px) { padding: 18px 18px 48px; }
`;

export const JournalGrid = styled.div`
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 24px;
  align-items: start;
  @media (max-width: 980px) { grid-template-columns: 1fr; }
`;

export const ColRight = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 820px) { grid-template-columns: 1fr; }
`;
