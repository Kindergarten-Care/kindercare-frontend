'use client';

import styled from 'styled-components';

export const Card = styled.div`
  background: var(--surface, #fff);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px 22px;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  box-sizing: border-box;
`;

export const CardHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

export const CardTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--fg);
`;

export const AvgBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11.5px;
  font-weight: 700;
  color: var(--brand, #005a36);
  background: var(--brand-tint, #eaf7f0);
  padding: 3px 9px;
  border-radius: 8px;
  letter-spacing: 0.02em;
`;

export const DetailLink = styled.button`
  background: none;
  border: none;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  color: var(--brand, #005a36);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.15s ease;

  &:hover {
    background: var(--brand-tint, #eaf7f0);
    gap: 6px;
  }
`;

export const DomainsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const DomainCard = styled.div<{ $color: string }>`
  background: var(--surface, #fff);
  border: 1px solid var(--border);
  border-top: 4px solid ${p => p.$color};
  border-radius: 12px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
  transition: transform 0.16s ease, box-shadow 0.16s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }
`;

export const DomainHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const DomainIcon = styled.div<{ $bg: string; $color: string }>`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${p => p.$bg};
  color: ${p => p.$color};
  display: grid;
  place-items: center;
  flex-shrink: 0;
`;

export const TrendBadge = styled.span<{ $trend: 'up' | 'down' }>`
  font-size: 11px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  background: ${p => p.$trend === 'up' ? '#f0fdf4' : '#fef2f2'};
  color: ${p => p.$trend === 'up' ? '#16a34a' : '#dc2626'};
`;

export const DomainLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: var(--muted, #6b7280);
  line-height: 1.2;
`;

export const ScoreRow = styled.div`
  display: flex;
  align-items: baseline;
  margin-top: 4px;
`;

export const ScoreValue = styled.span`
  font-size: 24px;
  font-weight: 800;
  color: var(--fg);
  line-height: 1;
`;

export const ScoreMax = styled.span`
  font-size: 12px;
  color: var(--muted, #9ca3af);
  margin-left: 2px;
  font-weight: 500;
`;

export const ProgressWrapper = styled.div`
  width: 100%;
  height: 5px;
  background: #f1f5f9;
  border-radius: 3px;
  overflow: hidden;
  margin-top: auto;
`;

export const ProgressFill = styled.div<{ $pct: number; $color: string }>`
  height: 100%;
  border-radius: 3px;
  background: ${p => p.$color};
  width: ${p => p.$pct}%;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 28px 16px;
  text-align: center;
`;

export const EmptyIcon = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: var(--brand-tint, #eaf7f0);
  color: var(--brand, #005a36);
  display: grid;
  place-items: center;
`;

export const EmptyTitle = styled.div`
  font-size: 13.5px;
  font-weight: 600;
  color: var(--fg);
`;

export const EmptySub = styled.div`
  font-size: 12px;
  color: var(--muted);
  line-height: 1.5;
`;

export const TeacherComment = styled.p`
  font-size: 13px;
  color: var(--muted, #6b7280);
  line-height: 1.5;
  margin: 0;
  padding: 12px 14px;
  background: var(--surface-alt, #f8f9fa);
  border-left: 3px solid var(--brand, #005a36);
  border-radius: 0 6px 6px 0;
`;
