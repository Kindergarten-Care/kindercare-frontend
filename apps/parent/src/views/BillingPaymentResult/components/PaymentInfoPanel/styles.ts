'use client';

import styled from 'styled-components';

export const InfoPanel = styled.div`
  background: #f8faf9;
  border: 1px solid var(--border, #e6eee9);
  border-radius: 14px;
  padding: 6px 18px;
  margin-bottom: 24px;
  text-align: left;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border, #e6eee9);

  &:last-child {
    border-bottom: none;
  }
`;

export const InfoLabel = styled.span`
  font-size: 13px;
  color: #6b7280;
  flex-shrink: 0;
`;

export const InfoValue = styled.span`
  font-size: 13.5px;
  font-weight: 700;
  color: #1f2937;
  text-align: right;
  word-break: break-word;
`;