import React from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import * as S from '../styles';
import { calKindColor, CalendarCell } from '../utils';

interface StatsSidebarProps {
  stTotal: number;
  cPresent: number;
  cExcused: number;
  cUnexcused: number;
  rate: number;
  donutGradient: string;
  weekTrend: ReturnType<typeof import('../utils').buildWeekTrend>;
  calendarYear: number;
  calendarMonth: number;
  calendarCells: CalendarCell[];
  monthOffset: number;
  setMonthOffset: React.Dispatch<React.SetStateAction<number>>;
}

export const StatsSidebar: React.FC<StatsSidebarProps> = ({
  stTotal,
  cPresent,
  cExcused,
  cUnexcused,
  rate,
  donutGradient,
  weekTrend,
  calendarYear,
  calendarMonth,
  calendarCells,
  monthOffset,
  setMonthOffset,
}) => {
  return (
    <S.LeftSidebar>
      <S.LeftKpiGrid>
        <S.KpiCard>
          <S.KpiIconBlock $bg="#EEF2FF" $color="#4F46E5">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path></svg>
          </S.KpiIconBlock>
          <S.KpiMeta>
            <S.KpiLabel>Sĩ số lớp</S.KpiLabel>
            <S.KpiValue>{stTotal}</S.KpiValue>
          </S.KpiMeta>
        </S.KpiCard>

        <S.KpiCard>
          <S.KpiIconBlock $bg="#E6F3ED" $color="#005A36">
            <CheckCircle2 size={22} />
          </S.KpiIconBlock>
          <S.KpiMeta>
            <S.KpiLabel>Có mặt</S.KpiLabel>
            <S.KpiValue $color="#005A36">{cPresent}</S.KpiValue>
          </S.KpiMeta>
        </S.KpiCard>

        <S.KpiCard>
          <S.KpiIconBlock $bg="#F1F4F1" $color="#4B5563">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          </S.KpiIconBlock>
          <S.KpiMeta>
            <S.KpiLabel>Có phép</S.KpiLabel>
            <S.KpiValue $color="#4B5563">{cExcused}</S.KpiValue>
          </S.KpiMeta>
        </S.KpiCard>

        <S.KpiCard>
          <S.KpiIconBlock $bg="#FEE2E2" $color="#DC2626">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"></path></svg>
          </S.KpiIconBlock>
          <S.KpiMeta>
            <S.KpiLabel>Vắng</S.KpiLabel>
            <S.KpiValue>{cUnexcused}</S.KpiValue>
          </S.KpiMeta>
        </S.KpiCard>
      </S.LeftKpiGrid>

      <S.ChartCard>
        <S.ChartTitle>Tỷ lệ chuyên cần</S.ChartTitle>
        <S.DonutRow style={{ gap: '20px', justifyContent: 'center' }}>
          <S.DonutWrapper $bg={donutGradient} style={{ width: '130px', height: '130px' }}>
            <S.DonutInner style={{ width: '90px', height: '90px' }}>
              <S.DonutRate style={{ fontSize: '24px' }}>{rate}%</S.DonutRate>
              <S.DonutLabel style={{ fontSize: '9px' }}>Hôm nay</S.DonutLabel>
            </S.DonutInner>
          </S.DonutWrapper>

          <S.LegendList style={{ gap: '8px', minWidth: '150px' }}>
            <S.LegendItem style={{ gap: '8px' }}>
              <S.LegendDot $bg="#005A36" style={{ width: '10px', height: '10px' }} />
              <S.LegendText style={{ fontSize: '12px' }}>Có mặt</S.LegendText>
              <S.LegendCount $color="#005A36" style={{ fontSize: '13px' }}>{cPresent}</S.LegendCount>
            </S.LegendItem>
            <S.LegendItem style={{ gap: '8px' }}>
              <S.LegendDot $bg="#9CA3AF" style={{ width: '10px', height: '10px' }} />
              <S.LegendText style={{ fontSize: '12px' }}>Có phép</S.LegendText>
              <S.LegendCount $color="#4B5563" style={{ fontSize: '13px' }}>{cExcused}</S.LegendCount>
            </S.LegendItem>
            <S.LegendItem style={{ gap: '8px' }}>
              <S.LegendDot $bg="#DC2626" style={{ width: '10px', height: '10px' }} />
              <S.LegendText style={{ fontSize: '12px' }}>Vắng</S.LegendText>
              <S.LegendCount $color="#DC2626" style={{ fontSize: '13px' }}>{cUnexcused}</S.LegendCount>
            </S.LegendItem>
          </S.LegendList>
        </S.DonutRow>

        <S.WeeklyTrendContainer>
          <S.WeeklyTrendHeader>
            <S.WeeklyTrendTitle>Xu hướng tuần này</S.WeeklyTrendTitle>
            <S.WeeklyTrendSubtitle>% có mặt</S.WeeklyTrendSubtitle>
          </S.WeeklyTrendHeader>
          <S.WeeklyTrendBars style={{ height: '100px' }}>
            {weekTrend.map((w, index) => (
              <S.WeeklyBarCol key={index}>
                <S.WeeklyBarVal $active={w.activeDay} style={{ fontSize: '10px' }}>{w.pctText}</S.WeeklyBarVal>
                <S.WeeklyBarGraphic $h={w.h} $bg={w.barBg} style={{ width: '14px' }} />
                <S.WeeklyBarLabel $active={w.activeDay} style={{ fontSize: '10px' }}>{w.dow}</S.WeeklyBarLabel>
              </S.WeeklyBarCol>
            ))}
          </S.WeeklyTrendBars>
        </S.WeeklyTrendContainer>
      </S.ChartCard>

      <S.CalendarCard>
        <S.CalendarHeaderRow>
          <S.CalendarMonthLabel>Tháng {calendarMonth + 1} / {calendarYear}</S.CalendarMonthLabel>
          <S.CalendarNavButtons>
            <S.CalendarNavBtn onClick={() => setMonthOffset(prev => prev - 1)}><ChevronLeft size={16} /></S.CalendarNavBtn>
            <S.CalendarNavBtn onClick={() => setMonthOffset(prev => prev + 1)}><ChevronRight size={16} /></S.CalendarNavBtn>
          </S.CalendarNavButtons>
        </S.CalendarHeaderRow>

        <S.CalendarDowsHeader>
          {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((d, index) => (
            <S.CalendarDowLabel key={index}>{d}</S.CalendarDowLabel>
          ))}
        </S.CalendarDowsHeader>

        <S.CalendarDaysGrid>
          {calendarCells.map((c, index) => {
            if (!c) return <div key={index} style={{ aspectRatio: '1' }} />;
            return (
              <S.CalendarDayCell
                key={index}
                $isToday={c.isToday}
                $isFuture={c.isFuture}
                $weekend={c.weekend}
              >
                {c.day}
                {c.kind !== 'none' && !c.isToday && <S.CalendarDayDot $color={calKindColor[c.kind]} />}
              </S.CalendarDayCell>
            );
          })}
        </S.CalendarDaysGrid>

        <S.CalendarLegend>
          <S.CalLegendItem><S.CalLegendDot $color="#005A36" /> Đầy đủ</S.CalLegendItem>
          <S.CalLegendItem><S.CalLegendDot $color="#D97706" /> Có vắng</S.CalLegendItem>
          <S.CalLegendItem><S.CalLegendDot $color="#DC2626" /> Vắng nhiều</S.CalLegendItem>
        </S.CalendarLegend>
      </S.CalendarCard>
    </S.LeftSidebar>
  );
};
