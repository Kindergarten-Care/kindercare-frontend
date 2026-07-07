'use client';

import styled from 'styled-components';

export {
  ModalHeader,
  ModalTitle,
  CloseBtn,
  BtnBackToList,
  BtnCancelDetail,
} from '../modal-styles/modal';

export const SelectionGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 16px;

  @media (max-width: 360px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const SelectionCard = styled.button`
  background: var(--surface, #fff);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  min-width: 0;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: inherit;
  outline: none;

  &:hover {
    border-color: #a9cfba;
    background: #f8fafc;
    transform: translateY(-3px);
    box-shadow: 0 10px 18px -3px rgba(0, 0, 0, 0.05);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    padding: 18px 10px;
  }
`;

export const CardIconCircle = styled.div<{ $bg: string; $color: string }>`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${p => p.$bg};
  color: ${p => p.$color};
  display: grid;
  place-items: center;
  margin-bottom: 14px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
`;

export const SelectionCardTitle = styled.h4`
  font-size: 15px;
  font-weight: 700;
  color: var(--fg);
  margin: 0 0 6px 0;
`;

export const SelectionCardSub = styled.p`
  font-size: 12px;
  color: var(--muted, #64748b);
  margin: 0;
  line-height: 1.45;
`;