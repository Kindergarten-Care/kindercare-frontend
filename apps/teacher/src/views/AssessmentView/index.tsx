'use client';

import React from 'react';
import { useTheme } from 'styled-components';
import * as S from './styles';
import { DashboardLayout } from '@/layout/DashboardLayout';
import { AssessmentForm } from '@/components/assessment/AssessmentForm';
import { AssessmentChart } from '@/components/assessment/AssessmentChart';
import { AssessmentCriterionKey } from '@/config/types/assessment';
import { Activity, BarChart3 } from 'lucide-react';
import { useAssessmentView } from './hooks/useAssessmentView';
import { StudentSidebar } from './components/StudentSidebar';

export const AssessmentView: React.FC = () => {
  const theme = useTheme();
  const av = useAssessmentView();

  const selectedStudent = av.students.find(s => String(s.id) === String(av.selectedId));

  return (
    <DashboardLayout>
    <S.Container>
      <S.Header>
        <S.HeaderTitle><BarChart3 size={22} /> Đánh giá định kỳ học sinh</S.HeaderTitle>
        <S.HeaderSubtitle>
          Lớp {av.className || '—'} · Tháng {av.termPeriod.replace('-', '/')} · Giáo viên {av.user?.fullName || av.user?.username || ''}
        </S.HeaderSubtitle>
      </S.Header>

      <S.Layout>
        <StudentSidebar
          students={av.students}
          loadingStudents={av.loadingStudents}
          selectedId={av.selectedId}
          onSelectStudent={av.setSelectedId}
          monthRecords={av.monthRecords}
          filterType={av.filterType}
          setFilterType={av.setFilterType}
          termPeriod={av.termPeriod}
          setTermPeriod={av.setTermPeriod}
        />

        <S.Main>
          {selectedStudent ? (
            <AssessmentForm
              key={`${selectedStudent.id}-${av.termPeriod}`}
              studentId={selectedStudent.id}
              studentName={selectedStudent.name}
              studentAvatar={selectedStudent.avatar}
              initial={av.currentRecord
                ? {
                    studentId: av.currentRecord.studentId,
                    physicalScore: av.currentRecord.physicalScore,
                    cognitiveScore: av.currentRecord.cognitiveScore,
                    languageScore: av.currentRecord.languageScore,
                    socioEmotionalScore: av.currentRecord.socioEmotionalScore,
                    aestheticScore: av.currentRecord.aestheticScore,
                    teacherComment: av.currentRecord.teacherComment,
                  }
                : undefined
              }
              onSubmit={av.handleSave}
              disabled={av.loadingMonth || av.submitting || !!av.currentRecord}
            />
          ) : (
            <S.EmptyState>Chọn học sinh để bắt đầu đánh giá.</S.EmptyState>
          )}

          <S.ChartCard>
            <S.ChartHeader>
              <S.ChartTitle><Activity size={18} color={theme.colors?.green || '#15803d'} /> Biểu đồ Radar 5 tiêu chí</S.ChartTitle>
            </S.ChartHeader>
            {av.loadingMonth ? (
              <S.Spinner><Activity size={14} /> Đang tải đánh giá…</S.Spinner>
            ) : (
              <AssessmentChart
                current={av.currentScores as Record<AssessmentCriterionKey, number>}
                previous={av.previousScores}
                size={340}
              />
            )}
          </S.ChartCard>
        </S.Main>
      </S.Layout>

      {av.toast && <S.Toast $type={av.toast.type}>{av.toast.text}</S.Toast>}
    </S.Container>
    </DashboardLayout>
  );
};
