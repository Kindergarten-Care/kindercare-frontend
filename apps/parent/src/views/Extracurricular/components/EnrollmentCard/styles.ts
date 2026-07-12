'use client';

import styled from 'styled-components';

import { Btn, Badge } from '../shared/atoms';

export const EnrollCard = styled.div`
  background: #fff;
  border: 1px solid var(--border, #e6eee9);
  border-radius: 16px;
  padding: 18px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const EnrollBody = styled.div`
  flex: 1;
  min-width: 0;
`;

export const EnrollName = styled.div`
  font-size: 14.5px;
  font-weight: 700;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const EnrollMeta = styled.div`
  font-size: 12.5px;
  color: #6b7280;
  margin-top: 3px;
`;

export const EnrollDeadline = styled.div<{ $expired?: boolean }>`
  font-size: 12px;
  font-weight: 600;
  margin-top: 4px;
  color: ${p => (p.$expired ? '#dc2626' : '#d97706')};
`;

export const EnrollActions = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export { Btn, Badge };