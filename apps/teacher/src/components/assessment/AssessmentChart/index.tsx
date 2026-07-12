import React, { useMemo } from 'react';
import styled, { useTheme } from 'styled-components';
import {
  ASSESSMENT_CRITERIA,
  ASSESSMENT_SCORE_MAX,
  ASSESSMENT_SCORE_MIN,
  AssessmentCriterionKey,
} from '@/config/types/assessment';

/**
 * Radar chart inline-SVG (no recharts dependency).
 * - Trục: 6 tiêu chí đánh giá định kỳ.
 * - 2 polygon: tháng hiện tại (đậm) và lịch sử gần nhất (nhạt) nếu cung cấp.
 * - Score min..max ánh xạ radial 0..1.
 */

export interface RadarChartSeries {
  label: string;
  values: Partial<Record<AssessmentCriterionKey, number>>;
  color: string;
  fillOpacity?: number;
  dashed?: boolean;
}

export interface AssessmentChartProps {
  current: Partial<Record<AssessmentCriterionKey, number>>;
  previous?: RadarChartSeries;
  size?: number;
}

const Wrap = styled.div`
  width: 100%;
  max-width: 320px; /* Thu gọn biểu đồ lại để không bị phình to */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
`;

const LegendItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: ${props => props.theme.colors.fg || props.theme.colors.text};
  opacity: 0.85;
`;

const Swatch = styled.span<{ $color: string; $dashed?: boolean }>`
  display: inline-block;
  width: 18px;
  height: 3px;
  background: ${p => (p.$dashed ? 'transparent' : p.$color)};
  border-top: ${p => (p.$dashed ? `2px dashed ${p.$color}` : 'none')};
  border-radius: 2px;
`;

const axes = ASSESSMENT_CRITERIA; // 6 tiêu chí, cố định thứ tự

function polar(i: number, total: number, radius: number) {
  // Bắt đầu từ góc -90deg (đỉnh trên) và xoay theo chiều kim đồng hồ.
  const angle = (-Math.PI / 2) + (2 * Math.PI * i) / total;
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  };
}

const pointsFor = (
  values: Partial<Record<AssessmentCriterionKey, number>>,
  cx: number,
  cy: number,
  r: number
): string => {
  return axes
    .map((a, i) => {
      const v = values[a.key];
      const norm = v == null
        ? 0
        : Math.max(0, Math.min(1, (v - ASSESSMENT_SCORE_MIN) / (ASSESSMENT_SCORE_MAX - ASSESSMENT_SCORE_MIN)));
      const { x, y } = polar(i, axes.length, r * norm);
      return `${cx + x},${cy + y}`;
    })
    .join(' ');
};

export const AssessmentChart: React.FC<AssessmentChartProps> = ({
  current,
  previous,
  size = 320,
}) => {
  const theme = useTheme();
  const accent = theme.colors?.primary || '#046E1E';

  const cx = size / 2;
  const cy = size / 2;
  // Thu nhỏ bán kính biểu đồ (từ 0.78 xuống 0.65)
  const r = (size / 2) * 0.65;

  const levels = useMemo(
    () => [0.25, 0.5, 0.75, 1].map(scale => scale * r),
    [r]
  );

  const currentPoints = pointsFor(current, cx, cy, r);
  const previousPoints = previous
    ? pointsFor(previous.values, cx, cy, r)
    : '';

  return (
    <Wrap>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width="100%"
        height="auto"
        role="img"
        aria-label="Biểu đồ radar đánh giá định kỳ"
      >
        {/* Concentric polygons (grid) */}
        {levels.map((rr, idx) => (
          <polygon
            key={idx}
            points={axes.map((_, i) => {
              const { x, y } = polar(i, axes.length, rr);
              return `${cx + x},${cy + y}`;
            }).join(' ')}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth={1}
          />
        ))}

        {/* Axis lines + labels */}
        {axes.map((a, i) => {
          const { x, y } = polar(i, axes.length, r);
          const lx = cx + x * 1.18;
          const ly = cy + y * 1.18;
          
          return (
            <g key={a.key}>
              <line
                x1={cx}
                y1={cy}
                x2={cx + x}
                y2={cy + y}
                stroke="#CBD5E1"
                strokeDasharray="3 3"
              />
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={9}
                fontWeight={600}
                fill={a.accent}
              >
                {a.emoji} {a.shortLabel}
              </text>
            </g>
          );
        })}

        {/* Previous polygon (lighter, dashed) */}
        {previous && (
          <>
            <polygon
              points={previousPoints}
              fill={previous.color}
              fillOpacity={previous.fillOpacity ?? 0.12}
              stroke={previous.color}
              strokeWidth={1.5}
              strokeDasharray="4 4"
            />
            {axes.map((a, i) => {
              const v = previous.values[a.key];
              if (v == null) return null;
              const norm =
                (Math.max(0, Math.min(1, (v - ASSESSMENT_SCORE_MIN) / (ASSESSMENT_SCORE_MAX - ASSESSMENT_SCORE_MIN))));
              const { x, y } = polar(i, axes.length, r * norm);
              return (
                <circle
                  key={`prev-${a.key}`}
                  cx={cx + x}
                  cy={cy + y}
                  r={3}
                  fill={previous.color}
                />
              );
            })}
          </>
        )}

        {/* Current polygon (filled, bold) */}
        <polygon
          points={currentPoints}
          fill={accent}
          fillOpacity={0.25}
          stroke={accent}
          strokeWidth={2.5}
        />
        {axes.map((a, i) => {
          const v = current[a.key];
          if (v == null) return null;
          const norm =
            (Math.max(0, Math.min(1, (v - ASSESSMENT_SCORE_MIN) / (ASSESSMENT_SCORE_MAX - ASSESSMENT_SCORE_MIN))));
          const { x, y } = polar(i, axes.length, r * norm);
          return (
            <g key={`cur-${a.key}`}>
              <circle
                cx={cx + x}
                cy={cy + y}
                r={4.5}
                fill={accent}
                stroke="#fff"
                strokeWidth={2}
              />
            </g>
          );
        })}

        {/* Center label */}
        <text
          x={cx}
          y={cy - (size < 250 ? 4 : 6)}
          textAnchor="middle"
          fontSize={size < 250 ? 8 : 10}
          fill="#94A3B8"
        >
          Thang điểm
        </text>
        <text
          x={cx}
          y={cy + (size < 250 ? 6 : 8)}
          textAnchor="middle"
          fontSize={size < 250 ? 9 : 11}
          fontWeight={700}
          fill={accent}
        >
          {ASSESSMENT_SCORE_MIN}-{ASSESSMENT_SCORE_MAX}
        </text>
      </svg>

      <Legend>
        <LegendItem>
          <Swatch $color={accent} />
          Tháng này
        </LegendItem>
        {previous && (
          <LegendItem>
            <Swatch $color={previous.color} $dashed />
            {previous.label}
          </LegendItem>
        )}
      </Legend>
    </Wrap>
  );
};
