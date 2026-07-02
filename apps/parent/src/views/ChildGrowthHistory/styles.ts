'use client';

import styled from 'styled-components';

export const PageWrap = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: 24px 32px 56px;
  @media (max-width: 860px) { padding: 18px 18px 48px; }
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 22px;
`;

export const PageTitle = styled.h1`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 21px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #1F2937;
`;

export const PageSub = styled.p`
  font-size: 13px;
  color: #6B7280;
  margin-top: 3px;
`;

export const HeaderActions = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Section = styled.div`
  margin-bottom: 24px;
`;

export const SecHead = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  margin-bottom: 14px;
`;

export const SecIcon = styled.span<{ $bg?: string; $fg?: string }>`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  background: ${p => p.$bg ?? '#E6F3ED'};
  color: ${p => p.$fg ?? '#005A36'};
`;

export const SecTitle = styled.h2`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: #1F2937;
`;

export const GrowthGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: start;
  @media (max-width: 920px) { grid-template-columns: 1fr; }
`;
