'use client';

import React, { useState } from 'react';
import {
  PageWrapper,
  MainContent,
  Container,
  PageHeader,
  PageTitle,
  PageSubtitle,
  MetricCardsGrid,
  MetricCard,
  CardHeader,
  CardIconWrapper,
  CardLabel,
  CardValueRow,
  CardValue,
  CardBadge,
  LiveDot,
  TrendArrow,
  ChartsGrid,
  ChartCard,
  ChartCardHeader,
  ChartTitle,
  MoreButton,
  PieChartWrapper,
  PieChartSvg,
  LegendList,
  LegendItem,
  LegendLeft,
  LegendDot,
  LegendLabel,
  LegendValue,
  BarChartCard,
  BarChartHeader,
  BarChartTitleGroup,
  BarChartSubtitle,
  ToggleGroup,
  ToggleButton,
  BarChartArea,
  GridLines,
  GridLine,
  BarsContainer,
  Bar,
  BarTooltip,
  XAxisLabels,
  XAxisLabel,
} from './styles';
import ITAdminSideNavBar from '@/layout/ITAdminSideNavBar';
import ITAdminTopAppBar from '@/layout/ITAdminTopAppBar';

/* ─── SVG Icons ─── */
const AccountIcon: React.FC = () => (
  <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 15v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="8" cy="4" r="3.5" stroke="#16a34a" strokeWidth="1.8" />
    <path d="M21 15v-2a4 4 0 00-3-3.87M14.5 0.13a4 4 0 010 7.75" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const OnlineIcon: React.FC = () => (
  <svg width="24" height="17" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1c4.5 3 9 5 11 5s6.5-2 11-5" stroke="#0284c7" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="12" r="4" stroke="#0284c7" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="1" fill="#0284c7" />
  </svg>
);

const WarningIcon: React.FC = () => (
  <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 1L1 18h20L11 1z" stroke="#ca8a04" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M11 7v4M11 14v1" stroke="#ca8a04" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const ArrowUpIcon: React.FC = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 9V2M2 5l3.5-3.5L9 5" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MoreDotsIcon: React.FC = () => (
  <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="2" cy="2" r="1.5" fill="currentColor" />
    <circle cx="2" cy="8" r="1.5" fill="currentColor" />
    <circle cx="2" cy="14" r="1.5" fill="currentColor" />
  </svg>
);

/* ─── Data Types ─── */
interface MetricData {
  label: string;
  value: string;
  badge: React.ReactNode;
  iconBg: string;
  icon: React.ReactNode;
}

interface PieLegendData {
  label: string;
  value: string;
  color: string;
  percent: number;
}

interface BarData {
  label: string;
  value: number;
  displayValue: string;
  active?: boolean;
}

/* ─── Static Data ─── */
const metricsData: MetricData[] = [
  {
    label: 'TỔNG TÀI KHOẢN',
    value: '12,458',
    badge: (
      <CardBadge $variant="success">
        <TrendArrow><ArrowUpIcon /></TrendArrow>
        4.2%
      </CardBadge>
    ),
    iconBg: '#dcfce7',
    icon: <AccountIcon />,
  },
  {
    label: 'TÀI KHOẢN ĐANG ONLINE',
    value: '1,842',
    badge: (
      <CardBadge $variant="info">
        <LiveDot />
        Live
      </CardBadge>
    ),
    iconBg: '#e0f2fe',
    icon: <OnlineIcon />,
  },
  {
    label: 'CẢNH BÁO LỖI SYSTEM LOG',
    value: '24',
    badge: <CardBadge $variant="warning">trong 24h qua</CardBadge>,
    iconBg: '#fef9c3',
    icon: <WarningIcon />,
  },
];

const pieData: PieLegendData[] = [
  { label: 'Giáo viên', value: '65%', color: '#86efac', percent: 65 },
  { label: 'Hiệu trưởng', value: '25%', color: '#7dd3fc', percent: 25 },
  { label: 'Admin', value: '10%', color: '#fde047', percent: 10 },
];

const barData: BarData[] = [
  { label: 'T2', value: 1200, displayValue: '1.2k' },
  { label: 'T3', value: 1650, displayValue: '1.7k' },
  { label: 'T4', value: 1050, displayValue: '1.1k' },
  { label: 'T5', value: 2400, displayValue: '2.4k' },
  { label: 'T6', value: 1950, displayValue: '2.0k' },
  { label: 'T7', value: 3800, displayValue: '3.8k', active: true },
  { label: 'CN', value: 2100, displayValue: '2.1k' },
];

/* ─── Donut Pie Chart ─── */
function DonutChart({ data }: { data: PieLegendData[] }): React.ReactElement {
  const radius = 90;
  const strokeWidth = 28;
  const center = 112;
  const circumference = 2 * Math.PI * radius;
  let cumulativePercent = 0;

  return (
    <PieChartSvg>
      <svg width="224" height="224" viewBox="0 0 224 224">
        <circle cx={center} cy={center} r={radius} fill="none" stroke="#f8fafc" strokeWidth={strokeWidth} />
        {data.map((segment, index) => {
          const segmentLength = (segment.percent / 100) * circumference;
          const offset = circumference - (cumulativePercent / 100) * circumference;
          cumulativePercent += segment.percent;
          return (
            <circle
              key={index}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform={`rotate(-90 ${center} ${center})`}
              style={{ transition: 'stroke-dasharray 0.8s ease, stroke-dashoffset 0.8s ease', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.05))' }}
            />
          );
        })}
        <circle cx={center} cy={center} r={radius - strokeWidth / 2 - 2} fill="white" />
      </svg>
    </PieChartSvg>
  );
}

/* ─── Main View Component ─── */
export default function ITAdminSystemOverview(): React.ReactElement {
  const [chartPeriod, setChartPeriod] = useState<'day' | 'week'>('week');

  const maxBarValue = Math.max(...barData.map((d) => d.value));
  const maxBarHeight = 295;

  return (
    <PageWrapper>
      <ITAdminSideNavBar />
      <ITAdminTopAppBar />

      <MainContent>
        <Container>
          {/* ── Page Header ── */}
          <PageHeader>
            <PageTitle>Tổng quan Hệ thống</PageTitle>
            <PageSubtitle>
              Giám sát hoạt động và tài nguyên hệ thống theo thời gian thực.
            </PageSubtitle>
          </PageHeader>

          {/* ── Metric Cards ── */}
          <MetricCardsGrid>
            {metricsData.map((metric) => (
              <MetricCard key={metric.label}>
                <CardHeader>
                  <CardIconWrapper $bg={metric.iconBg}>{metric.icon}</CardIconWrapper>
                  <CardLabel>{metric.label}</CardLabel>
                </CardHeader>
                <CardValueRow>
                  <CardValue>{metric.value}</CardValue>
                  {metric.badge}
                </CardValueRow>
              </MetricCard>
            ))}
          </MetricCardsGrid>

          {/* ── Charts ── */}
          <ChartsGrid>
            {/* Pie Chart */}
            <ChartCard>
              <ChartCardHeader>
                <ChartTitle>Tỷ lệ Role</ChartTitle>
                <MoreButton aria-label="More options">
                  <MoreDotsIcon />
                </MoreButton>
              </ChartCardHeader>
              <PieChartWrapper>
                <DonutChart data={pieData} />
                <LegendList>
                  {pieData.map((item) => (
                    <LegendItem key={item.label}>
                      <LegendLeft>
                        <LegendDot $color={item.color} />
                        <LegendLabel>{item.label}</LegendLabel>
                      </LegendLeft>
                      <LegendValue>{item.value}</LegendValue>
                    </LegendItem>
                  ))}
                </LegendList>
              </PieChartWrapper>
            </ChartCard>

            {/* Bar Chart */}
            <BarChartCard>
              <BarChartHeader>
                <BarChartTitleGroup>
                  <ChartTitle>Tải lượng truy cập hệ thống</ChartTitle>
                  <BarChartSubtitle>Lưu lượng request / giây (7 ngày qua)</BarChartSubtitle>
                </BarChartTitleGroup>
                <ToggleGroup>
                  <ToggleButton $active={chartPeriod === 'day'} onClick={() => setChartPeriod('day')}>
                    Ngày
                  </ToggleButton>
                  <ToggleButton $active={chartPeriod === 'week'} onClick={() => setChartPeriod('week')}>
                    Tuần
                  </ToggleButton>
                </ToggleGroup>
              </BarChartHeader>

              <BarChartArea>
                <GridLines>
                  <GridLine />
                  <GridLine />
                  <GridLine />
                  <GridLine />
                </GridLines>
                <BarsContainer>
                  {barData.map((bar, index) => (
                    <Bar
                      key={bar.label}
                      $height={Math.round((bar.value / maxBarValue) * maxBarHeight)}
                      $active={bar.active}
                      $delay={index * 0.08}
                    >
                      <BarTooltip>{bar.displayValue}</BarTooltip>
                    </Bar>
                  ))}
                </BarsContainer>
                <XAxisLabels>
                  {barData.map((bar) => (
                    <XAxisLabel key={bar.label} $active={bar.active}>
                      {bar.label}
                    </XAxisLabel>
                  ))}
                </XAxisLabels>
              </BarChartArea>
            </BarChartCard>
          </ChartsGrid>
        </Container>
      </MainContent>
    </PageWrapper>
  );
}
