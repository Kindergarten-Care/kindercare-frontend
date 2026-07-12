'use client';

import styled from 'styled-components';

export const PageWrap = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: 24px 32px 56px;
  @media (max-width: 860px) { padding: 18px 18px 48px; }
  @media (max-width: 768px) { padding: 16px 0 48px; }
`;

export const PageHeader = styled.div`
  margin-bottom: 22px;
`;

export const PageTitle = styled.h1`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 21px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #1f2937;
`;

export const PageSub = styled.p`
  font-size: 13px;
  color: #6b7280;
  margin-top: 3px;
`;

export const Section = styled.div`
  margin-bottom: 32px;
`;

export const SectionTitle = styled.h2`
  font-size: 15px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 14px;
  display: flex;
  align-items: center;
  gap: 9px;

  &::before {
    content: '';
    width: 4px;
    height: 15px;
    border-radius: 3px;
    background: var(--brand, #005a36);
  }
`;

export const EnrollList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ActivityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
`;

export const EmptyState = styled.div`
  padding: 32px 24px;
  text-align: center;
  color: #6b7280;
  background: #fff;
  border-radius: 16px;
  border: 1px solid var(--border, #e6eee9);
  font-size: 13.5px;
`;

export const LoadingState = styled.div`
  padding: 48px 24px;
  text-align: center;
  color: #6b7280;
`;