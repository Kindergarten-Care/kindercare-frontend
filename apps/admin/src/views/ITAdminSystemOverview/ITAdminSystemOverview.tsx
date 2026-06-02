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
import { Sidebar, AccountIcon, OnlineIcon, WarningIcon, ArrowUpIcon, MoreDotsIcon } from '@kindercare/ui';
import ITAdminTopAppBar from '@/layout/ITAdminTopAppBar';

/* ─── Role Colors Mapping ─── */
const roleColors: Record<string, string> = {
  'Giáo viên': '#86efac',
  'Hiệu trưởng': '#7dd3fc',
  'Admin': '#fde047',
};

/* ─── Helper function for formatting numbers ─── */
const formatNumber = (num: number) => new Intl.NumberFormat('en-US').format(num);
const formatK = (num: number) => num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num.toString();

/* ─── Donut Pie Chart ─── */
function DonutChart({ data }: { data: { percent: number; color: string }[] }): React.ReactElement {
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

/* ─── Loading Skeleton ─── */
const LoadingSpinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
    <div style={{ width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #16a34a', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    <style>{`
      @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    `}</style>
  </div>
);

import { useEffect } from 'react';
import { ITAdminService } from '@/services/ITAdminService';
import { SystemOverviewResponse } from '@/config/types/admin';

/* ─── Main View Component ─── */
export default function ITAdminSystemOverview(): React.ReactElement {
  const [chartPeriod, setChartPeriod] = useState<'day' | 'week'>('week');
  const [data, setData] = useState<SystemOverviewResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    ITAdminService.getSystemOverview()
      .then((res) => {
        if (isMounted) {
          setData(res);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch system overview:', err);
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Show loading spinner if data is not yet fetched
  if (isLoading || !data) {
    return (
      <PageWrapper>
        <Sidebar />
        <ITAdminTopAppBar />
        <MainContent>
          <Container>
            <PageHeader>
              <PageTitle>Tổng quan Hệ thống</PageTitle>
              <PageSubtitle>Đang tải dữ liệu thời gian thực...</PageSubtitle>
            </PageHeader>
            <LoadingSpinner />
          </Container>
        </MainContent>
      </PageWrapper>
    );
  }

  // Map raw data to UI models
  const maxBarValue = Math.max(...data.traffic.map((d) => d.requests));
  const maxBarHeight = 295;

  return (
    <PageWrapper>
      <Sidebar />
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
            {/* Total Accounts */}
            <MetricCard>
              <CardHeader>
                <CardIconWrapper $bg="#dcfce7"><AccountIcon /></CardIconWrapper>
                <CardLabel>TỔNG TÀI KHOẢN</CardLabel>
              </CardHeader>
              <CardValueRow>
                <CardValue>{formatNumber(data.metrics.totalAccounts)}</CardValue>
                <CardBadge $variant="success">
                  <TrendArrow><ArrowUpIcon /></TrendArrow>
                  {data.metrics.totalAccountsGrowth}%
                </CardBadge>
              </CardValueRow>
            </MetricCard>

            {/* Online Accounts */}
            <MetricCard>
              <CardHeader>
                <CardIconWrapper $bg="#e0f2fe"><OnlineIcon /></CardIconWrapper>
                <CardLabel>TÀI KHOẢN ĐANG ONLINE</CardLabel>
              </CardHeader>
              <CardValueRow>
                <CardValue>{formatNumber(data.metrics.onlineAccounts)}</CardValue>
                <CardBadge $variant="info">
                  <LiveDot />
                  Live
                </CardBadge>
              </CardValueRow>
            </MetricCard>

            {/* System Warnings */}
            <MetricCard>
              <CardHeader>
                <CardIconWrapper $bg="#fef9c3"><WarningIcon /></CardIconWrapper>
                <CardLabel>CẢNH BÁO LỖI SYSTEM LOG</CardLabel>
              </CardHeader>
              <CardValueRow>
                <CardValue>{data.metrics.systemWarnings24h}</CardValue>
                <CardBadge $variant="warning">trong 24h qua</CardBadge>
              </CardValueRow>
            </MetricCard>
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
                <DonutChart data={data.roles.map(r => ({ percent: r.percentage, color: roleColors[r.role] || '#ccc' }))} />
                <LegendList>
                  {data.roles.map((item) => (
                    <LegendItem key={item.role}>
                      <LegendLeft>
                        <LegendDot $color={roleColors[item.role] || '#ccc'} />
                        <LegendLabel>{item.role}</LegendLabel>
                      </LegendLeft>
                      <LegendValue>{item.percentage}%</LegendValue>
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
                  {data.traffic.map((bar, index) => {
                    const isActive = index === data.traffic.length - 2; // Default mock active bar
                    return (
                      <Bar
                        key={bar.day}
                        $height={Math.round((bar.requests / maxBarValue) * maxBarHeight)}
                        $active={isActive}
                        $delay={index * 0.08}
                      >
                        <BarTooltip>{formatK(bar.requests)}</BarTooltip>
                      </Bar>
                    );
                  })}
                </BarsContainer>
                <XAxisLabels>
                  {data.traffic.map((bar, index) => {
                    const isActive = index === data.traffic.length - 2;
                    return (
                      <XAxisLabel key={bar.day} $active={isActive}>
                        {bar.day}
                      </XAxisLabel>
                    );
                  })}
                </XAxisLabels>
              </BarChartArea>
            </BarChartCard>
          </ChartsGrid>
        </Container>
      </MainContent>
    </PageWrapper>
  );
}
