'use client';

import styled from 'styled-components';

export const Card = styled.div`
  background: #fff;
  border: 1px solid var(--border, #e6eee9);
  border-radius: 18px;
  overflow: hidden;
  margin-bottom: 20px;
`;

export const CardHead = styled.div`
  padding: 22px 24px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const HeadTitle = styled.h1`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 16px;
  font-weight: 800;
  color: #1f2937;
`;

export const CardBody = styled.div`
  padding: 22px 24px;
`;

export const Timeline = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid #f8fafc;

  &:last-child { border-bottom: none; }
`;

export const TxIcon = styled.span<{ $status: 'Success' | 'Pending' | 'Failed' }>`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  background: #fff;
  border: 1px solid var(--border, #e6eee9);
  overflow: hidden;
  ${p => {
    if (p.$status === 'Success') return 'border-color:#bbf7d0;';
    if (p.$status === 'Failed') return 'border-color:#fecaca;';
    return 'border-color:#fde68a;';
  }}
`;

export const TxLogo = styled.img`
  width: 22px;
  height: 22px;
  object-fit: contain;
  display: block;
`;

export const TxBody = styled.div`
  flex: 1;
  min-width: 0;
`;

export const TxMethod = styled.div`
  font-size: 13.5px;
  font-weight: 700;
  color: #1f2937;
`;

export const TxMeta = styled.div`
  font-size: 12px;
  color: #9ca3af;
  margin-top: 2px;
`;

export const TxAmount = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #1f2937;
  flex-shrink: 0;
`;

export const EmptyTx = styled.div`
  padding: 24px;
  text-align: center;
  color: #9ca3af;
  font-size: 13px;
`;