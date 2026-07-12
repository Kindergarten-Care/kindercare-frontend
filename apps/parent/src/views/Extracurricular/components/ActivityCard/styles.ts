'use client';

import styled from 'styled-components';

import { Btn } from '../shared/atoms';

export const ActivityCard = styled.div`
  background: #fff;
  border: 1px solid var(--border, #e6eee9);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ActivityIcon = styled.span`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: #f1ecfe;
  color: #8b5cf6;
  display: grid;
  place-items: center;
`;

export const ActivityName = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #1f2937;
`;

export const ActivityDesc = styled.p`
  font-size: 12.5px;
  color: #6b7280;
  line-height: 1.5;
  flex: 1;
`;

export const ActivityFee = styled.div`
  font-size: 15px;
  font-weight: 800;
  color: var(--brand, #005a36);
`;

export const ActivityFeeUnit = styled.span`
  font-size: 11.5px;
  font-weight: 500;
  color: #9ca3af;
`;

export { Btn };