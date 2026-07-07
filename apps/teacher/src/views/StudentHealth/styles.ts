'use client';

import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: ${fadeIn} 220ms ease-out;
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;

  h1 {
    margin: 0;
    font-size: 22px;
    font-weight: 700;
    color: ${({ theme }) => theme?.colors?.green?.[800] ?? '#005A36'};
  }

  p {
    margin: 4px 0 0;
    font-size: 13px;
    color: ${({ theme }) => theme?.colors?.muted ?? '#5b6b66'};
  }
`;

export const EditToggleWrapper = styled.button<{ $locked: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid ${({ $locked }) => ($locked ? '#fca5a5' : '#86efac')};
  background: ${({ $locked }) => ($locked ? '#fef2f2' : '#f0fdf4')};
  color: ${({ $locked }) => ($locked ? '#b91c1c' : '#15803d')};
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 160ms ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  }
`;

export const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const StudentRail = styled.aside`
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid ${({ theme }) => theme?.colors?.border ?? '#E6EEE9'};
  padding: 16px;
  height: fit-content;
  position: sticky;
  top: 16px;
`;

export const StudentRailTitle = styled.h3`
  margin: 0 0 12px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: ${({ theme }) => theme?.colors?.muted ?? '#5b6b66'};
`;

export const StudentList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const StudentItem = styled.li<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  cursor: pointer;
  background: ${({ $active }) => ($active ? '#00794A' : 'transparent')};
  color: ${({ $active }) => ($active ? '#fff' : 'inherit')};
  transition: background 140ms ease;

  &:hover {
    background: ${({ $active }) => ($active ? '#00794A' : '#f1f5f3')};
  }

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 999px;
    background: #cce8d8;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: #005a36;
    flex-shrink: 0;
    font-size: 13px;
  }

  .name {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.2;
  }
`;

export const HealthBoard = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CardsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div<{ $accent?: 'red' | 'amber' | 'green' | 'none' }>`
  background: #ffffff;
  border-radius: 18px;
  border: 2px solid
    ${({ $accent }) => {
      switch ($accent) {
        case 'red':
          return '#FCA5A5';
        case 'amber':
          return '#FCD34D';
        case 'green':
          return '#86EFAC';
        default:
          return '#E6EEE9';
      }
    }};
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    color: #005a36;
  }
`;

export const Tabs = styled.div`
  display: inline-flex;
  background: #f1f5f3;
  border-radius: 999px;
  padding: 4px;
  gap: 4px;
`;

export const TabButton = styled.button<{ $active: boolean }>`
  padding: 6px 14px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 12px;
  background: ${({ $active }) => ($active ? '#00794A' : 'transparent')};
  color: ${({ $active }) => ($active ? '#fff' : '#3b5247')};
  transition: background 140ms ease;
`;

export const ItemList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ItemRow = styled.li<{ $severity?: 'Mild' | 'Moderate' | 'Severe' | 'Normal' }>`
  border: 1px solid #e6eee9;
  border-radius: 14px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: #fff;
  border-left: 4px solid
    ${({ $severity }) => {
      switch ($severity) {
        case 'Severe':
          return '#DC2626';
        case 'Moderate':
          return '#F59E0B';
        case 'Mild':
          return '#FCD34D';
        case 'Normal':
          return '#10B981';
        default:
          return '#94a3b8';
      }
    }};

  .row1 {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    align-items: baseline;
  }

  .row2 {
    font-size: 13px;
    color: #4b5563;
    line-height: 1.45;
  }

  .row3 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }
`;

export const SeverityPill = styled.span<{ $severity?: string }>`
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 999px;
  background: ${({ $severity }) => {
    switch ($severity) {
      case 'Severe':
        return '#FEE2E2';
      case 'Moderate':
        return '#FEF3C7';
      case 'Mild':
        return '#FEFCE8';
      case 'Done':
        return '#DCFCE7';
      case 'Pending':
        return '#DBEAFE';
      case 'Skipped':
        return '#F3F4F6';
      case 'Normal':
        return '#DCFCE7';
      default:
        return '#F3F4F6';
    }
  }};
  color: ${({ $severity }) => {
    switch ($severity) {
      case 'Severe':
        return '#B91C1C';
      case 'Moderate':
        return '#B45309';
      case 'Mild':
        return '#854D0E';
      case 'Done':
        return '#166534';
      case 'Pending':
        return '#1E40AF';
      case 'Skipped':
        return '#374151';
      case 'Normal':
        return '#166534';
      default:
        return '#1f2937';
    }
  }};
`;

export const ActionButton = styled.button<{ $variant?: 'primary' | 'ghost' | 'danger' }>`
  border: 1px solid
    ${({ $variant }) =>
      $variant === 'danger'
        ? '#fca5a5'
        : $variant === 'ghost'
        ? '#d1d5db'
        : '#00794A'};
  background: ${({ $variant }) =>
    $variant === 'danger' ? '#fff' : $variant === 'ghost' ? '#fff' : '#00794A'};
  color: ${({ $variant }) =>
    $variant === 'danger' ? '#b91c1c' : $variant === 'ghost' ? '#1f2937' : '#fff'};
  padding: 6px 12px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
  transition: opacity 140ms ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;

export const AddButton = styled.button`
  background: #00794A;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 8px 14px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const EmptyStateBox = styled.div`
  border: 1px dashed #cbd5e1;
  border-radius: 14px;
  padding: 24px;
  text-align: center;
  color: #64748b;
  font-size: 13px;
  background: #f8fafc;
`;

export const TableCard = styled.div`
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid #e6eee9;
  padding: 16px;
`;

export const TableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;

  h2 {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    color: #005a36;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;

  th,
  td {
    text-align: left;
    padding: 10px 12px;
    border-bottom: 1px solid #f1f5f3;
  }

  th {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #5b6b66;
    font-weight: 700;
  }

  tbody tr:hover {
    background: #f8fafc;
  }
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
`;

export const ModalCard = styled.div`
  background: #ffffff;
  border-radius: 18px;
  padding: 22px;
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.18);

  h3 {
    margin: 0;
    font-size: 17px;
    color: #005a36;
  }
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #3b5247;

  input,
  select,
  textarea {
    font: inherit;
    font-size: 13px;
    padding: 8px 10px;
    border-radius: 10px;
    border: 1px solid #d1d5db;
    background: #fff;
    color: #111827;

    &:focus {
      outline: none;
      border-color: #00794A;
      box-shadow: 0 0 0 3px rgba(0, 121, 74, 0.12);
    }
  }

  textarea {
    resize: vertical;
    min-height: 64px;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 6px;
`;

export const ToastStack = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 1100;
`;

export const ToastBubble = styled.div<{ $variant?: ToastVariant }>`
  background: ${({ $variant }) => {
    switch ($variant) {
      case 'error':
        return '#7F1D1D';
      case 'warning':
        return '#92400E';
      case 'info':
        return '#1E3A8A';
      default:
        return '#14532D';
    }
  }};
  color: #fff;
  padding: 10px 16px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 500;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.2);
  max-width: 360px;
  white-space: pre-wrap;
`;

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export const SpinnerOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: #5b6b66;
  font-size: 13px;
`;

export const ErrorBox = styled.div`
  background: #fef2f2;
  border: 1px solid #fca5a5;
  color: #b91c1c;
  padding: 12px 14px;
  border-radius: 12px;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  button {
    background: #b91c1c;
    color: #fff;
    border: none;
    padding: 6px 10px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
  }
`;