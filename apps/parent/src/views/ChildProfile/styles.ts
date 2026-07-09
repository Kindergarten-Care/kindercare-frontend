'use client';

import styled from 'styled-components';

export const PageWrap = styled.div`
  padding: 24px 32px 56px;
  @media (max-width: 860px) { padding: 18px 18px 48px; }
  @media (max-width: 768px) { padding: 16px 0 48px; }
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

export const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 24px;
  align-items: start;
  @media (max-width: 980px) { grid-template-columns: minmax(0, 1fr); }
`;

export const ColLeft = styled.div`
  min-width: 0;
`;

export const ColRight = styled.div`
  min-width: 0;
`;