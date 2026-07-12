'use client';

import React, { useState } from 'react';
import * as S from './styles';
import { ChartDataPoint } from '../../hooks/useChildGrowthHistory';
import { useChartGeometry } from './useChartGeometry';

interface GrowthChartCardProps {
  chartData: ChartDataPoint[];
  selectedTermPeriod?: string;
}

export function GrowthChartCard({ chartData, selectedTermPeriod }: GrowthChartCardProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const {
    xCoords, bounds,
    weightPoints, heightPoints,
    weightPolylinePoints, heightPolylinePoints,
    weightGlowPath, heightGlowPath,
    hoverWidth,
  } = useChartGeometry(chartData);

  const selectedIdx = selectedTermPeriod
    ? chartData.findIndex(d => d.termPeriod === selectedTermPeriod)
    : -1;
  const activeIdx = hoveredIdx !== null ? hoveredIdx : (selectedIdx >= 0 ? selectedIdx : null);

  if (chartData.length === 0) {
    return (
      <S.Card>
        <S.ChartHead>
          <S.ChartTitle>Tăng trưởng theo tháng</S.ChartTitle>
        </S.ChartHead>
        <S.EmptyState>Chưa có dữ liệu biểu đồ tăng trưởng.</S.EmptyState>
      </S.Card>
    );
  }

  const { weightMin, weightRange, heightMin, heightRange } = bounds;

  const activeTooltipX = activeIdx !== null ? xCoords[activeIdx] : null;
  const activeTooltipY = activeIdx !== null
    ? Math.min(weightPoints[activeIdx].y, heightPoints[activeIdx].y)
    : null;

  return (
    <S.Card>
      <S.ChartHead>
        <S.ChartTitle>Tăng trưởng theo tháng</S.ChartTitle>
        <S.LegendRow>
          <S.LegendItem $color="#005A36">Cân nặng (kg)</S.LegendItem>
          <S.LegendItem $color="#2563EB">Chiều cao (cm)</S.LegendItem>
        </S.LegendRow>
      </S.ChartHead>

      <S.ChartWrapper>
        <S.ChartSvg viewBox="0 0 300 90">
          <defs>
            <linearGradient id="growth_weight_glow" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="rgba(0, 90, 54, 0.12)" offset="0%" />
              <stop stopColor="rgba(0, 90, 54, 0)" offset="100%" />
            </linearGradient>
            <linearGradient id="growth_height_glow" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="rgba(37, 99, 235, 0.1)" offset="0%" />
              <stop stopColor="rgba(37, 99, 235, 0)" offset="100%" />
            </linearGradient>
          </defs>

          <line x1="26" y1="15" x2="274" y2="15" stroke="#EEF4F0" strokeWidth="0.8" strokeDasharray="3 3" />
          <line x1="26" y1="45" x2="274" y2="45" stroke="#EEF4F0" strokeWidth="0.8" strokeDasharray="3 3" />
          <line x1="26" y1="75" x2="274" y2="75" stroke="#EEF4F0" strokeWidth="1" />

          <S.AxisLabel x="20" y="8" textAnchor="end" style={{ fill: '#005A36', fontSize: '5px' }}>kg</S.AxisLabel>
          <S.AxisLabel x="20" y="18" textAnchor="end">{(weightMin + weightRange).toFixed(1)}</S.AxisLabel>
          <S.AxisLabel x="20" y="48" textAnchor="end">{(weightMin + weightRange / 2).toFixed(1)}</S.AxisLabel>
          <S.AxisLabel x="20" y="78" textAnchor="end">{weightMin.toFixed(1)}</S.AxisLabel>

          <S.AxisLabel x="280" y="8" textAnchor="start" style={{ fill: '#2563EB', fontSize: '5px' }}>cm</S.AxisLabel>
          <S.AxisLabel x="280" y="18" textAnchor="start">{Math.round(heightMin + heightRange)}</S.AxisLabel>
          <S.AxisLabel x="280" y="48" textAnchor="start">{Math.round(heightMin + heightRange / 2)}</S.AxisLabel>
          <S.AxisLabel x="280" y="78" textAnchor="start">{Math.round(heightMin)}</S.AxisLabel>

          {weightGlowPath && <path d={weightGlowPath} fill="url(#growth_weight_glow)" />}
          {heightGlowPath && <path d={heightGlowPath} fill="url(#growth_height_glow)" />}

          {weightPolylinePoints && (
            <polyline fill="none" stroke="#005A36" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" points={weightPolylinePoints} />
          )}
          {heightPolylinePoints && (
            <polyline fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" points={heightPolylinePoints} />
          )}

          {chartData.map((d, idx) => (
            <S.AxisLabel key={idx} x={xCoords[idx]} y="88" textAnchor="middle">{d.shortMonth}</S.AxisLabel>
          ))}

          {activeIdx !== null && (
            <line x1={xCoords[activeIdx]} y1="10" x2={xCoords[activeIdx]} y2="75" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="2 2" style={{ pointerEvents: 'none' }} />
          )}

          {weightPoints.map((point, idx) => (
            <circle
              key={`w-${idx}`}
              cx={point.x} cy={point.y}
              r={activeIdx === idx ? '4' : '2.8'}
              fill="#fff" stroke="#005A36"
              strokeWidth={activeIdx === idx ? '2.2' : '1.5'}
              style={{ transition: 'all 0.12s ease', pointerEvents: 'none' }}
            />
          ))}

          {heightPoints.map((point, idx) => (
            <circle
              key={`h-${idx}`}
              cx={point.x} cy={point.y}
              r={activeIdx === idx ? '4' : '2.8'}
              fill="#fff" stroke="#2563EB"
              strokeWidth={activeIdx === idx ? '2.2' : '1.5'}
              style={{ transition: 'all 0.12s ease', pointerEvents: 'none' }}
            />
          ))}

          {chartData.map((d, idx) => (
            <rect
              key={`area-${idx}`}
              x={xCoords[idx] - hoverWidth / 2} y="5"
              width={hoverWidth} height="72"
              fill="transparent"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            />
          ))}
        </S.ChartSvg>

        {activeIdx !== null && activeTooltipX !== null && activeTooltipY !== null && (
          <S.ChartTooltip
            style={{
              left: `calc(${(activeTooltipX / 300) * 100}% - 56px)`,
              top: `calc(${(activeTooltipY / 90) * 100}% - 68px)`,
              textAlign: 'left',
            }}
          >
            <strong style={{ display: 'block', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: 3, marginBottom: 4 }}>
              {chartData[activeIdx].month}
            </strong>
            <div style={{ color: '#4ade80', fontSize: '10.5px', fontWeight: 600 }}>
              Cân nặng: {chartData[activeIdx].weight} kg
            </div>
            <div style={{ color: '#60a5fa', fontSize: '10.5px', fontWeight: 600, marginTop: 2 }}>
              Chiều cao: {chartData[activeIdx].height} cm
            </div>
          </S.ChartTooltip>
        )}
      </S.ChartWrapper>
    </S.Card>
  );
}
