'use client';

import React, { useState } from 'react';
import * as S from './styles';
import { IconChart } from '@/assets/icons/dashboard';

interface DataPoint {
  month: string;
  weight: number;
  height: number;
}

const GROWTH_DATA: DataPoint[] = [
  { month: 'Tháng 1', weight: 15.2, height: 101.5 },
  { month: 'Tháng 2', weight: 15.5, height: 102.0 },
  { month: 'Tháng 3', weight: 15.8, height: 102.6 },
  { month: 'Tháng 4', weight: 16.0, height: 103.1 },
  { month: 'Tháng 5', weight: 16.2, height: 103.5 },
  { month: 'Tháng 6', weight: 16.5, height: 104.0 },
];

const GrowthWidget: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const currentMonthData = GROWTH_DATA[GROWTH_DATA.length - 1];

  // Calculate BMI = weight (kg) / (height (m) ^ 2)
  const heightInMeters = currentMonthData.height / 100;
  const bmi = parseFloat((currentMonthData.weight / (heightInMeters * heightInMeters)).toFixed(1));

  // Determine BMI status
  const getBmiStatus = (bmiValue: number) => {
    if (bmiValue < 14) return { label: 'Thiếu cân', type: 'warn' as const };
    if (bmiValue > 17) return { label: 'Thừa cân', type: 'warn' as const };
    return { label: 'Cân đối', type: 'success' as const };
  };

  const bmiStatus = getBmiStatus(bmi);

  // SVG Coordinates calculations (viewBox="0 0 300 90")
  // Horizontal margins left (26px) and right (274px) to leave space for Y-axis labels
  const xCoords = [26, 75.6, 125.2, 174.8, 224.4, 274];

  // Y-axis scaling (bounds between y=15 and y=75)
  const getWeightY = (w: number) => 75 - ((w - 15.0) / 2.0) * 60;
  const getHeightY = (h: number) => 75 - ((h - 101.0) / 4.0) * 60;

  const weightPoints = GROWTH_DATA.map((d, idx) => ({
    x: xCoords[idx],
    y: getWeightY(d.weight),
    value: d.weight
  }));

  const heightPoints = GROWTH_DATA.map((d, idx) => ({
    x: xCoords[idx],
    y: getHeightY(d.height),
    value: d.height
  }));

  const weightPolylinePoints = weightPoints.map(p => `${p.x},${p.y}`).join(' ');
  const heightPolylinePoints = heightPoints.map(p => `${p.x},${p.y}`).join(' ');

  const weightGlowPath = `M26,${weightPoints[0].y} ` + 
    weightPoints.map(p => `L${p.x},${p.y}`).join(' ') + 
    ` L274,75 L26,75 Z`;

  const heightGlowPath = `M26,${heightPoints[0].y} ` + 
    heightPoints.map(p => `L${p.x},${p.y}`).join(' ') + 
    ` L274,75 L26,75 Z`;

  // Get active hovered coordinates
  const activeTooltipX = hoveredIdx !== null ? xCoords[hoveredIdx] : null;
  const activeTooltipY = hoveredIdx !== null 
    ? Math.min(weightPoints[hoveredIdx].y, heightPoints[hoveredIdx].y) 
    : null;

  return (
    <S.Card>
      <S.CardHead>
        <S.CardTitle>
          <IconChart size={18} color="var(--brand)" />
          Chỉ số phát triển
        </S.CardTitle>
        <S.LegendRow>
          <S.LegendItem $color="var(--brand)">Cân nặng</S.LegendItem>
          <S.LegendItem $color="#2563eb">Chiều cao</S.LegendItem>
        </S.LegendRow>
      </S.CardHead>

      {/* Stats Summary Card Row */}
      <S.StatsGrid>
        <S.StatCard $type="green">
          <S.StatLabel>Cân nặng</S.StatLabel>
          <S.StatValue>
            16.5 <span>kg</span>
          </S.StatValue>
          <S.StatBadge $type="success">+0.3 kg (T5)</S.StatBadge>
        </S.StatCard>

        <S.StatCard $type="blue">
          <S.StatLabel>Chiều cao</S.StatLabel>
          <S.StatValue>
            104 <span>cm</span>
          </S.StatValue>
          <S.StatBadge $type="success">+0.5 cm (T5)</S.StatBadge>
        </S.StatCard>

        <S.StatCard $type="purple">
          <S.StatLabel>Chỉ số BMI</S.StatLabel>
          <S.StatValue>{bmi}</S.StatValue>
          <S.StatBadge $type={bmiStatus.type}>{bmiStatus.label}</S.StatBadge>
        </S.StatCard>
      </S.StatsGrid>

      {/* SVG Interactive Line Chart with Dual-Axes */}
      <S.ChartWrapper>
        <S.ChartSvg viewBox="0 0 300 90">
          <defs>
            {/* Glow definitions */}
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
          <S.AxisLabel x="20" y="8" textAnchor="end" style={{ fill: 'var(--brand)', fontSize: '7.5px' }}>kg</S.AxisLabel>
          <S.AxisLabel x="20" y="18" textAnchor="end" style={{ fill: '#4b5563', fontSize: '8px' }}>17.0</S.AxisLabel>
          <S.AxisLabel x="20" y="48" textAnchor="end" style={{ fill: '#4b5563', fontSize: '8px' }}>16.0</S.AxisLabel>
          <S.AxisLabel x="20" y="78" textAnchor="end" style={{ fill: '#4b5563', fontSize: '8px' }}>15.0</S.AxisLabel>

          {/* Right Y-axis labels (Height - Blue) */}
          <S.AxisLabel x="280" y="8" textAnchor="start" style={{ fill: '#2563eb', fontSize: '7.5px' }}>cm</S.AxisLabel>
          <S.AxisLabel x="280" y="18" textAnchor="start" style={{ fill: '#4b5563', fontSize: '8px' }}>105</S.AxisLabel>
          <S.AxisLabel x="280" y="48" textAnchor="start" style={{ fill: '#4b5563', fontSize: '8px' }}>103</S.AxisLabel>
          <S.AxisLabel x="280" y="78" textAnchor="start" style={{ fill: '#4b5563', fontSize: '8px' }}>101</S.AxisLabel>

          {/* Glow fills below lines */}
          <path d={weightGlowPath} fill="url(#weight_glow)" />
          <path d={heightGlowPath} fill="url(#height_glow)" />

          {/* Line paths representation */}
          <polyline
            fill="none"
            stroke="var(--brand)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={weightPolylinePoints}
          />
          <polyline
            fill="none"
            stroke="#2563eb"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={heightPolylinePoints}
          />

          {/* Chart Labels for Months */}
          {xCoords.map((x, idx) => (
            <S.AxisLabel key={idx} x={x} y="88" textAnchor="middle">
              T{idx + 1}
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
          {xCoords.map((x, idx) => (
            <rect
              key={`h-area-${idx}`}
              x={x - 24}
              y="5"
              width="48"
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
              {GROWTH_DATA[hoveredIdx].month}
            </strong>
            <div style={{ color: '#4ade80', fontSize: '10.5px', fontWeight: 600 }}>
              Cân nặng: {GROWTH_DATA[hoveredIdx].weight} kg
            </div>
            <div style={{ color: '#60a5fa', fontSize: '10.5px', fontWeight: 600, marginTop: 2 }}>
              Chiều cao: {GROWTH_DATA[hoveredIdx].height} cm
            </div>
          </S.ChartTooltip>
        )}
      </S.ChartWrapper>
    </S.Card>
  );
};

export default GrowthWidget;
