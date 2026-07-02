'use client';

import React from 'react';
import * as S from './styles';
import { useChildGrowthHistory } from './hooks/useChildGrowthHistory';
import { TeacherNotesTimeline } from './components/TeacherNotesTimeline';
import { PhysicalMetricsStack } from './components/PhysicalMetricsStack';
import { GrowthChartCard } from './components/GrowthChartCard';
import DevelopmentalDomainsWidget from '@/views/ParentDashboard/components/DevelopmentalDomainsWidget';
import { IconChart, IconChat } from '@/assets/icons/dashboard';
import { MonthYearPicker } from '@kindercare/ui';
import { getTeacherHonorific } from '@/utils/Teacher/TeacherDisplay';

export function ChildGrowthHistory() {
  const {
    loading, activeStudent, viewYear, viewMonth, setMonthYear,
    currentAssessment, notes,
    chartData, selectedTermPeriod, latest, weightDiff, heightDiff, bmiStatus,
  } = useChildGrowthHistory();

  if (loading || !activeStudent) {
    return (
      <S.PageWrap>
        <div style={{ padding: 40, color: '#6B7280' }}>Đang tải lịch sử phát triển...</div>
      </S.PageWrap>
    );
  }

  const leadTeacher = activeStudent.teachers?.[0] ?? null;

  return (
    <S.PageWrap>
      <S.PageHeader>
        <div>
          <S.PageTitle>Lịch sử phát triển</S.PageTitle>
          <S.PageSub>Theo dõi sự phát triển của bé {activeStudent.fullName} qua từng tháng</S.PageSub>
        </div>
        <S.HeaderActions>
          <MonthYearPicker
            month={viewMonth}
            year={viewYear}
            onChange={setMonthYear}
            ariaLabel="Chọn tháng xem lịch sử phát triển"
          />
        </S.HeaderActions>
      </S.PageHeader>

      <S.Section>
        <DevelopmentalDomainsWidget assessment={currentAssessment} />
      </S.Section>

      <S.Section>
        <S.SecHead>
          <S.SecIcon $bg="#E3EDFD" $fg="#2563EB"><IconChart size={18} /></S.SecIcon>
          <S.SecTitle>Chỉ số thể chất &amp; biểu đồ tăng trưởng</S.SecTitle>
        </S.SecHead>
        <S.GrowthGrid>
          <PhysicalMetricsStack
            latest={latest}
            weightDiff={weightDiff}
            heightDiff={heightDiff}
            bmiStatus={bmiStatus}
          />
          <GrowthChartCard chartData={chartData} selectedTermPeriod={selectedTermPeriod} />
        </S.GrowthGrid>
      </S.Section>

      <S.Section>
        <S.SecHead>
          <S.SecIcon><IconChat size={18} /></S.SecIcon>
          <S.SecTitle>Nhận xét của {getTeacherHonorific(leadTeacher?.gender).toLowerCase()} theo tháng</S.SecTitle>
        </S.SecHead>
        <TeacherNotesTimeline notes={notes} leadTeacher={leadTeacher} />
      </S.Section>
    </S.PageWrap>
  );
}
