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
  color: #1f2937;
`;

export const PageSub = styled.p`
  font-size: 13px;
  color: #6b7280;
  margin-top: 3px;
`;

export const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 14px;
  margin-bottom: 18px;
`;

export const FilterDropdownWrap = styled.div`
  flex: 1 1 210px;
  min-width: 0;

  @media (max-width: 480px) {
    flex-basis: 100%;
  }
`;

export const FilterLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 6px;
`;

export const EmptyState = styled.div`
  padding: 48px 24px;
  text-align: center;
  color: #6b7280;
  background: #fff;
  border-radius: 16px;
  border: 1px solid var(--border, #e6eee9);
`;

export const LoadingState = styled.div`
  padding: 48px 24px;
  text-align: center;
  color: #6b7280;
`;