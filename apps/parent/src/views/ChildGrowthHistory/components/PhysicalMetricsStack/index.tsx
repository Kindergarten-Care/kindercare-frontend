'use client';

import React from 'react';
import * as S from './styles';
import { IconWeight, IconHeight, IconBmi } from './icons';
import { getDiffLabel } from '@/utils/Student/Health';
import { ChartDataPoint } from '../../hooks/useChildGrowthHistory';

interface PhysicalMetricsStackProps {
  latest: ChartDataPoint | null;
  weightDiff: number | null;
  heightDiff: number | null;
  bmiStatus: { label: string; type: 'success' | 'warn' };
}

export function PhysicalMetricsStack({ latest, weightDiff, heightDiff, bmiStatus }: PhysicalMetricsStackProps) {
  if (!latest) {
    return <S.EmptyState>Chưa có dữ liệu chỉ số thể chất cho bé.</S.EmptyState>;
  }

  return (
    <S.Stack>
      <S.Metric $c="#F97316" $tint="#FFEEDF">
        <S.MetricIcon><IconWeight size={23} /></S.MetricIcon>
        <S.MetricBody>
          <S.MetricKey>Cân nặng</S.MetricKey>
          <S.MetricValue>{latest.weight}<small>kg</small></S.MetricValue>
        </S.MetricBody>
        <S.MetricDelta $variant={weightDiff === null || weightDiff >= 0 ? 'up' : 'warn'}>
          {getDiffLabel(weightDiff, true)}
        </S.MetricDelta>
      </S.Metric>

      <S.Metric $c="#8B5CF6" $tint="#F1ECFE">
        <S.MetricIcon><IconHeight size={23} /></S.MetricIcon>
        <S.MetricBody>
          <S.MetricKey>Chiều cao</S.MetricKey>
          <S.MetricValue>{latest.height}<small>cm</small></S.MetricValue>
        </S.MetricBody>
        <S.MetricDelta $variant={heightDiff === null || heightDiff >= 0 ? 'up' : 'warn'}>
          {getDiffLabel(heightDiff, false)}
        </S.MetricDelta>
      </S.Metric>

      <S.Metric $c="#0E8A7D" $tint="#D7F0EC">
        <S.MetricIcon><IconBmi size={23} /></S.MetricIcon>
        <S.MetricBody>
          <S.MetricKey>Chỉ số BMI</S.MetricKey>
          <S.MetricValue>{latest.bmi} <small style={{ color: '#005A36' }}>· {bmiStatus.label}</small></S.MetricValue>
        </S.MetricBody>
        <S.MetricDelta $variant="flat">{bmiStatus.type === 'success' ? 'Ổn định' : bmiStatus.label}</S.MetricDelta>
      </S.Metric>
    </S.Stack>
  );
}
