'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import * as S from './styles';
import { IconChart } from '@/assets/icons/dashboard';
import { useGrowthData } from './hooks/useGrowthData';
import { getDiffLabel } from '@/utils/Student/Health';

const GrowthWidget: React.FC = () => {
  const t = useTranslations('Dashboard');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const {
    loading,
    chartData,
    latest,
    weightDiff,
    heightDiff,
    bmiStatus,
    formattedLatestUpdate,
    xCoords,
    bounds,
    weightPoints,
    heightPoints,
    weightPolylinePoints,
    heightPolylinePoints,
    weightGlowPath,
    heightGlowPath,
    hoverWidth,
  } = useGrowthData();

  if (loading) {
    return (
      <S.Card>
        <S.CardHead>
          <S.CardTitle>
            <IconChart size={18} color="var(--brand)" />
            {t('growth.title')}
          </S.CardTitle>
        </S.CardHead>
        <div style={{ padding: '60px 40px', textAlign: 'center', color: 'var(--muted)' }}>
          {t('growth.loading')}
        </div>
      </S.Card>
    );
  }

  if (!latest || chartData.length === 0) {
    return (
      <S.Card>
        <S.CardHead>
          <S.CardTitle>
            <IconChart size={18} color="var(--brand)" />
            {t('growth.title')}
          </S.CardTitle>
        </S.CardHead>
        <div style={{ padding: '60px 40px', textAlign: 'center', color: 'var(--muted)' }}>
          {t('growth.empty')}
        </div>
      </S.Card>
    );
  }

  const {
    weightMin,
    weightMax,
    weightRange,
    heightMin,
    heightMax,
    heightRange,
  } = bounds;

  // Active Tooltip Coordinate calculations
  const activeTooltipX = hoveredIdx !== null ? xCoords[hoveredIdx] : null;
  const activeTooltipY = hoveredIdx !== null 
    ? Math.min(weightPoints[hoveredIdx].y, heightPoints[hoveredIdx].y) 
    : null;

  return (
    <S.Card>
      <S.CardHead>
        <S.CardTitle>
          <IconChart size={18} color="var(--brand)" />
          {t('growth.title')} <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 'normal', marginLeft: '6px' }}>{t('growth.updatedOn', { date: formattedLatestUpdate })}</span>
        </S.CardTitle>
        <S.LegendRow>
          <S.LegendItem $color="var(--brand)">{t('growth.weight')}</S.LegendItem>
          <S.LegendItem $color="#2563eb">{t('growth.height')}</S.LegendItem>
        </S.LegendRow>
      </S.CardHead>

      {/* Stats Summary Card Row */}
      <S.StatsGrid>
        <S.StatCard $type="green">
          <S.StatLabel>{t('growth.weight')}</S.StatLabel>
          <S.StatValue>
            {latest.weight} <span>{t('growth.kgAxis')}</span>
          </S.StatValue>
          <S.StatBadge $type={weightDiff === null || weightDiff >= 0 ? 'success' : 'warn'}>
            {getDiffLabel(weightDiff, true, latest.shortMonth)}
          </S.StatBadge>
        </S.StatCard>

        <S.StatCard $type="blue">
          <S.StatLabel>{t('growth.height')}</S.StatLabel>
          <S.StatValue>
            {latest.height} <span>{t('growth.cmAxis')}</span>
          </S.StatValue>
          <S.StatBadge $type={heightDiff === null || heightDiff >= 0 ? 'success' : 'warn'}>
            {getDiffLabel(heightDiff, false, latest.shortMonth)}
          </S.StatBadge>
        </S.StatCard>

        <S.StatCard $type="purple">
          <S.StatLabel>{t('growth.bmi')}</S.StatLabel>
          <S.StatValue>{latest.bmi}</S.StatValue>
          <S.StatBadge $type={bmiStatus.type}>{bmiStatus.label}</S.StatBadge>
        </S.StatCard>
      </S.StatsGrid>

      {/* SVG Interactive Line Chart with Dual-Axes */}
      <S.ChartWrapper>
        <S.ChartSvg viewBox="0 0 300 90">
          <defs>
            <linearGradient id="weight_glow" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="rgba(0, 90, 54, 0.12)" offset="0%" />
              <stop stopColor="rgba(0, 90, 54, 0)" offset="100%" />
            </linearGradient>
            <linearGradient id="height_glow" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="rgba(37, 99, 235, 0.1)" offset="0%" />
              <stop stopColor="rgba(37, 99, 235, 0)" offset="100%" />
            </linearGradient>
          </defs>

          {/* Dotted Horizontal Grid lines */}
          <line x1="26" y1="15" x2="274" y2="15" stroke="#e2e8f0" strokeWidth="0.8" strokeDasharray="3 3" />
          <line x1="26" y1="45" x2="274" y2="45" stroke="#e2e8f0" strokeWidth="0.8" strokeDasharray="3 3" />
          <line x1="26" y1="75" x2="274" y2="75" stroke="#e2e8f0" strokeWidth="1" />

          {/* Left Y-axis labels (Weight - Green) */}
          <S.AxisLabel x="20" y="8" textAnchor="end" style={{ fill: 'var(--brand)', fontSize: '7.5px' }}>{t('growth.kgAxis')}</S.AxisLabel>
          <S.AxisLabel x="20" y="18" textAnchor="end" style={{ fill: '#4b5563', fontSize: '8px' }}>{(weightMin + weightRange).toFixed(1)}</S.AxisLabel>
          <S.AxisLabel x="20" y="48" textAnchor="end" style={{ fill: '#4b5563', fontSize: '8px' }}>{(weightMin + weightRange / 2).toFixed(1)}</S.AxisLabel>
          <S.AxisLabel x="20" y="78" textAnchor="end" style={{ fill: '#4b5563', fontSize: '8px' }}>{weightMin.toFixed(1)}</S.AxisLabel>

          {/* Right Y-axis labels (Height - Blue) */}
          <S.AxisLabel x="280" y="8" textAnchor="start" style={{ fill: '#2563eb', fontSize: '7.5px' }}>{t('growth.cmAxis')}</S.AxisLabel>
          <S.AxisLabel x="280" y="18" textAnchor="start" style={{ fill: '#4b5563', fontSize: '8px' }}>{Math.round(heightMin + heightRange)}</S.AxisLabel>
          <S.AxisLabel x="280" y="48" textAnchor="start" style={{ fill: '#4b5563', fontSize: '8px' }}>{Math.round(heightMin + heightRange / 2)}</S.AxisLabel>
          <S.AxisLabel x="280" y="78" textAnchor="start" style={{ fill: '#4b5563', fontSize: '8px' }}>{Math.round(heightMin)}</S.AxisLabel>

          {/* Glow fills below lines */}
          {weightGlowPath && <path d={weightGlowPath} fill="url(#weight_glow)" />}
          {heightGlowPath && <path d={heightGlowPath} fill="url(#height_glow)" />}

          {/* Line paths representation */}
          {weightPolylinePoints && (
            <polyline
              fill="none"
              stroke="var(--brand)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={weightPolylinePoints}
            />
          )}
          {heightPolylinePoints && (
            <polyline
              fill="none"
              stroke="#2563eb"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={heightPolylinePoints}
            />
          )}

          {/* Chart Labels for Months */}
          {chartData.map((d, idx) => (
            <S.AxisLabel key={idx} x={xCoords[idx]} y="88" textAnchor="middle">
              {d.shortMonth}
            </S.AxisLabel>
          ))}

          {/* Active Hover Lines */}
          {hoveredIdx !== null && (
            <line
              x1={xCoords[hoveredIdx]}
              y1="10"
              x2={xCoords[hoveredIdx]}
              y2="75"
              stroke="#cbd5e1"
              strokeWidth="1"
              strokeDasharray="2 2"
              style={{ pointerEvents: 'none' }}
            />
          )}

          {/* Data Dots (circles) - Weight */}
          {weightPoints.map((point, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <circle
                key={`w-${idx}`}
                cx={point.x}
                cy={point.y}
                r={isHovered ? '4' : '2.8'}
                fill="#ffffff"
                stroke="var(--brand)"
                strokeWidth={isHovered ? '2.2' : '1.5'}
                style={{ transition: 'all 0.12s ease', pointerEvents: 'none' }}
              />
            );
          })}

          {/* Data Dots (circles) - Height */}
          {heightPoints.map((point, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <circle
                key={`h-${idx}`}
                cx={point.x}
                cy={point.y}
                r={isHovered ? '4' : '2.8'}
                fill="#ffffff"
                stroke="#2563eb"
                strokeWidth={isHovered ? '2.2' : '1.5'}
                style={{ transition: 'all 0.12s ease', pointerEvents: 'none' }}
              />
            );
          })}

          {/* Hidden full-height vertical columns for easy mouse hover detection */}
          {chartData.map((d, idx) => (
            <rect
              key={`h-area-${idx}`}
              x={xCoords[idx] - hoverWidth / 2}
              y="5"
              width={hoverWidth}
              height="72"
              fill="transparent"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            />
          ))}
        </S.ChartSvg>

        {/* Dynamic Responsive Multi-Value Tooltip */}
        {hoveredIdx !== null && activeTooltipX !== null && activeTooltipY !== null && (
          <S.ChartTooltip
            style={{
              left: `calc(${(activeTooltipX / 300) * 100}% - 56px)`,
              top: `calc(${(activeTooltipY / 90) * 100}% - 68px)`,
              textAlign: 'left'
            }}
          >
            <strong style={{ display: 'block', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: 3, marginBottom: 4 }}>
              {chartData[hoveredIdx].month}
            </strong>
            <div style={{ color: '#4ade80', fontSize: '10.5px', fontWeight: 600 }}>
              {t('growth.tooltipWeight', { value: chartData[hoveredIdx].weight })}
            </div>
            <div style={{ color: '#60a5fa', fontSize: '10.5px', fontWeight: 600, marginTop: 2 }}>
              {t('growth.tooltipHeight', { value: chartData[hoveredIdx].height })}
            </div>
          </S.ChartTooltip>
        )}
      </S.ChartWrapper>
    </S.Card>
  );
};

export default GrowthWidget;
