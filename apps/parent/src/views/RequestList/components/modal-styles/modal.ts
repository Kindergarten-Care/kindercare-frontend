'use client';

import styled from 'styled-components';

/**
 * Shared modal primitives reused by ConfirmCancelModal and SelectRequestTypeModal.
 * Co-located here so each modal stays self-contained while avoiding duplication.
 */
export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const ModalTitle = styled.h3`
  font-size: 19px;
  font-weight: 800;
  color: var(--fg);
  margin: 0;
  letter-spacing: -0.01em;
`;

export const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  color: var(--muted, #64748b);
  cursor: pointer;
  padding: 4px;
  transition: color 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: var(--fg);
  }
`;

export const BtnBackToList = styled.button`
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  color: #374151;
  background: #f1f5f9;
  border: none;
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #e2e8f0;
  }
`;

export const BtnCancelDetail = styled.button`
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  color: #dc2626;
  background: #fff;
  border: 1px solid #fca5a5;
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #fef2f2;
    border-color: #ef4444;
  }
`;