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

export const PaymentAmountRow = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #f1f5f9;
`;

export const PaymentAmountLabel = styled.div`
  font-size: 12.5px;
  color: #6b7280;
  margin-bottom: 4px;
`;

export const PaymentAmountValue = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: var(--brand, #005a36);
`;

export const MethodList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 24px;
`;

export const MethodOption = styled.label<{ $active: boolean; $disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 14px;
  border-radius: 12px;
  border: 1.5px solid ${p => (p.$active ? 'var(--brand, #005a36)' : 'var(--border, #e6eee9)')};
  background: ${p => (p.$active ? '#f0f8f3' : '#fff')};
  cursor: ${p => (p.$disabled ? 'not-allowed' : 'pointer')};
  opacity: ${p => (p.$disabled ? 0.6 : 1)};
  transition: border-color 0.15s, background 0.15s;

  &:hover {
    border-color: ${p => (p.$disabled ? undefined : 'var(--brand, #005a36)')};
  }
`;

export const MethodRadio = styled.input`
  appearance: none;
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  margin: 0;
  border-radius: 50%;
  border: 1.5px solid var(--border, #d1d9d5);
  background: #fff;
  cursor: inherit;
  flex-shrink: 0;
  position: relative;
  transition: border-color 0.15s;

  &:checked {
    border-color: var(--brand, #005a36);
  }

  &:checked::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--brand, #005a36);
    transform: translate(-50%, -50%);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const MethodLogo = styled.img`
  height: 22px;
  width: 44px;
  object-fit: contain;
  flex-shrink: 0;
`;

export const MethodName = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #1f2937;
  flex: 1;
  text-align: left;
`;

export const SubmitPayBtn = styled.button`
  font: inherit;
  font-weight: 700;
  border: none;
  cursor: pointer;
  border-radius: 12px;
  width: calc(100% - 48px);
  margin: 16px 24px 24px;
  padding: 14px 20px;
  font-size: 14.5px;
  background: var(--brand, #005a36);
  color: #fff;
  box-shadow: 0 8px 18px -7px rgba(0, 90, 54, 0.5);
  transition: transform 0.12s, background 0.15s;

  &:hover { background: var(--brand-hover, #004428); }
  &:active { transform: scale(0.98); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

export const SecurityNote = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #9ca3af;
  padding: 4px 24px 0;
`;