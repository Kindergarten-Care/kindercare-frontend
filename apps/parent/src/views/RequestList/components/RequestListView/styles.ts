'use client';

import styled from 'styled-components';

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
`;

export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: var(--fg);
  letter-spacing: -0.02em;
  margin: 0;
`;

export const PageSub = styled.p`
  font-size: 14px;
  color: var(--muted, #6b7280);
  margin: 0;
  font-weight: 500;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--surface, #fff);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 8px 14px;
  min-width: 280px;
  box-shadow: var(--shadow-sm);

  svg {
    color: var(--muted-2, #9ca3af);
  }

  @media (max-width: 480px) {
    min-width: 100%;
  }
`;

export const SearchInput = styled.input`
  border: none;
  background: none;
  font: inherit;
  font-size: 13.5px;
  color: var(--fg);
  width: 100%;
  outline: none;

  &::placeholder {
    color: var(--muted-2, #9ca3af);
  }
`;

export const BellBtn = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--surface, #fff);
  color: var(--fg);
  cursor: pointer;
  display: grid;
  place-items: center;
  box-shadow: var(--shadow-sm);
  transition: all 0.15s ease;

  &:hover {
    background: var(--brand-tint, #eaf7f0);
    color: var(--brand, #005a36);
    border-color: #a9cfba;
  }
`;

export const TitleSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  background: var(--surface, #fff);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 20px 24px;
  box-shadow: var(--shadow);
`;

export const TitleText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: var(--fg);
  margin: 0;
  letter-spacing: -0.01em;
`;

export const SectionSub = styled.p`
  font-size: 13.5px;
  color: var(--muted, #6b7280);
  margin: 0;
  font-weight: 500;
`;

export const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const BtnAction = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--fg);
  background: var(--surface, #fff);
  border: 1px solid var(--border);
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: all 0.15s ease;

  &:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
  }
`;

export const BtnPrimary = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  color: #fff;
  background: var(--brand, #005a36);
  border: none;
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 90, 54, 0.2);
  transition: all 0.15s ease;

  &:hover {
    background: #004428;
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 90, 54, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const StatsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const StatPill = styled.div<{ $color: 'orange' | 'green' | 'blue' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 10px;
  border: 1px solid ${p => {
    if (p.$color === 'orange') return '#fed7aa';
    if (p.$color === 'green') return '#bbf7d0';
    return '#bfdbfe';
  }};
  background: ${p => {
    if (p.$color === 'orange') return '#fff7ed';
    if (p.$color === 'green') return '#f0fdf4';
    return '#eff6ff';
  }};
  color: ${p => {
    if (p.$color === 'orange') return '#c2410c';
    if (p.$color === 'green') return '#15803d';
    return '#1d4ed8';
  }};
`;

export const StatDot = styled.span<{ $color: 'orange' | 'green' | 'blue' }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${p => {
    if (p.$color === 'orange') return '#ea580c';
    if (p.$color === 'green') return '#16a34a';
    return '#3b82f6';
  }};
`;

export const FilterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  width: 100%;
`;

export const FilterTabs = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f1f5f9;
  padding: 4px;
  border-radius: 12px;
  width: fit-content;
  max-width: 100%;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

export const TabBtn = styled.button<{ $active: boolean; $isMedication?: boolean }>`
  background: ${p => p.$active ? '#fff' : 'none'};
  border: none;
  font: inherit;
  font-size: 13px;
  font-weight: ${p => p.$active ? '700' : '600'};
  color: ${p => {
    if (p.$active && p.$isMedication) return '#dc2626';
    if (p.$active) return 'var(--brand, #005a36)';
    return 'var(--muted, #64748b)';
  }};
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  white-space: nowrap;
  box-shadow: ${p => p.$active ? '0 1px 3px rgba(0,0,0,0.05)' : 'none'};
  transition: all 0.15s ease;

  span {
    font-size: 11px;
    font-weight: 700;
    background: ${p => {
      if (p.$active && p.$isMedication) return '#fee2e2';
      if (p.$active) return 'var(--brand-tint, #eaf7f0)';
      return '#e2e8f0';
    }};
    color: ${p => {
      if (p.$active && p.$isMedication) return '#dc2626';
      if (p.$active) return 'var(--brand, #005a36)';
      return 'var(--muted, #64748b)';
    }};
    padding: 2px 6px;
    border-radius: 6px;
  }
`;

export const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const RequestCard = styled.div<{ $color: string }>`
  background: var(--surface, #fff);
  border: 1px solid var(--border);
  border-left: 5px solid ${p => p.$color};
  border-radius: 14px;
  padding: 20px 24px;
  display: flex;
  gap: 20px;
  box-shadow: var(--shadow-sm);
  transition: transform 0.16s ease, box-shadow 0.16s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 16px;
    gap: 14px;
  }
`;

export const CardIconWrapper = styled.div<{ $bg: string; $color: string }>`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: ${p => p.$bg};
  color: ${p => p.$color};
  display: grid;
  place-items: center;
  flex-shrink: 0;
`;

export const CardMiddle = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

export const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: var(--fg);
  margin: 0;
`;

export const CardDetail = styled.div`
  font-size: 14px;
  color: #374151;
  font-weight: 500;

  strong {
    color: var(--fg);
    font-weight: 600;
  }
`;

export const CardPills = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 2px;
`;

export const DosagePill = styled.span`
  font-size: 11.5px;
  font-weight: 700;
  background: #fef3c7;
  color: #b45309;
  padding: 3px 8px;
  border-radius: 6px;
`;

export const TimePill = styled.span`
  font-size: 11.5px;
  font-weight: 700;
  background: #dbeafe;
  color: #1e40af;
  padding: 3px 8px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

export const CardTimeMeta = styled.div`
  font-size: 12.5px;
  color: var(--muted, #6b7280);
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const CardNote = styled.div`
  font-size: 12.5px;
  color: var(--muted, #6b7280);
  background: #f8fafc;
  padding: 6px 10px;
  border-radius: 8px;
  border-left: 3px solid #cbd5e1;
  margin-top: 4px;
`;

export const CardRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    align-items: flex-start;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    border-top: 1px solid var(--border-soft);
    padding-top: 12px;
    margin-top: 4px;
  }
`;

export const StatusBadge = styled.span<{ $status: 'pending' | 'approved' | 'completed' | 'cancelled' | 'rejected' }>`
  font-size: 11.5px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 8px;
  letter-spacing: 0.01em;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  ${p => {
    switch (p.$status) {
      case 'pending':
        return 'background: #fff7ed; color: #c2410c;';
      case 'approved':
      case 'completed':
        return 'background: #f0fdf4; color: #15803d;';
      case 'cancelled':
        return 'background: #f1f5f9; color: #64748b;';
      case 'rejected':
        return 'background: #fef2f2; color: #dc2626;';
    }
  }}
`;

export const CardActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const BtnDetail = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font: inherit;
  font-size: 12.5px;
  font-weight: 600;
  color: #374151;
  background: #f1f5f9;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #e2e8f0;
  }
`;

export const BtnCancel = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font: inherit;
  font-size: 12.5px;
  font-weight: 600;
  color: #dc2626;
  background: #fff;
  border: 1px solid #fca5a5;
  padding: 7px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #fef2f2;
    border-color: #ef4444;
  }
`;

export const EmptyState = styled.div`
  background: var(--surface, #fff);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 60px 40px;
  text-align: center;
  color: var(--muted, #6b7280);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  svg {
    opacity: 0.6;
  }
`;

export const MedicinesListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
  width: 100%;
`;

export const NestedMedicineRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fffdfa;
  border: 1px solid #fef3c7;
  border-radius: 10px;
  padding: 8px 14px;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

export const NestedLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const NestedIndexBadge = styled.span`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #ea580c;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  display: grid;
  place-items: center;
  flex-shrink: 0;
`;

export const NestedName = styled.span`
  font-size: 13.5px;
  font-weight: 600;
  color: var(--fg, #1e293b);
`;

export const NestedRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DropdownWrapper = styled.div`
  width: 220px;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const LoadingContainer = styled.div`
  text-align: center;
  padding: 60px 40px;
  color: var(--muted, #6b7280);
  font-size: 14px;
  font-weight: 500;
`;

export const LoadingIcon = styled.span`
  display: inline-block;
  animation: spin 1s linear infinite;
  margin-right: 8px;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;