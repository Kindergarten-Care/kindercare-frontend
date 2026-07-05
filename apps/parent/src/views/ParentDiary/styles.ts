'use client';

import styled from 'styled-components';

// ─── Page layout ──────────────────────────────────────────────────────────────

export const PageWrap = styled.div`
  padding: 24px 32px 56px;
  @media (max-width: 860px) { padding: 18px 18px 48px; }
  @media (max-width: 768px) { padding: 16px 0 48px; }
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

  @media (max-width: 980px) { order: 1; }
`;

export const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 820px) { grid-template-columns: 1fr; }
`;

export const WeekendCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 10px;
  padding: 56px 24px;
  border-radius: 16px;
  background: linear-gradient(105deg, #EBF6F0 0%, #FFFFFF 90%);
  border: 1px solid #CFE7D8;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06);
`;

export const WeekendEmoji = styled.div`
  font-size: 48px;
  line-height: 1;
`;

export const WeekendTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: var(--fg);
`;

export const WeekendDesc = styled.p`
  font-size: 14px;
  color: var(--muted);
  max-width: 380px;
`;
