'use client';

import styled from 'styled-components';

export const Card = styled.div`
  background: var(--surface, #fff);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px 22px;
  box-shadow: var(--shadow);
`;

export const CardHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
`;

export const LessonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const LessonRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 13px;
  background: #f8faf8;
  border: 1px solid var(--border-soft);
`;

export const LessonIco = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${p => p.$color}22;
  color: ${p => p.$color};
  display: grid;
  place-items: center;
  font-size: 20px;
  flex-shrink: 0;
`;

export const LessonBody = styled.div`
  flex: 1;
  min-width: 0;
`;

export const LessonSubject = styled.div<{ $color: string }>`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${p => p.$color};
  margin-bottom: 3px;
`;

export const LessonTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--fg);
  line-height: 1.3;
`;

export const LessonDesc = styled.div`
  font-size: 12.5px;
  color: var(--muted);
  margin-top: 3px;
  line-height: 1.45;
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
