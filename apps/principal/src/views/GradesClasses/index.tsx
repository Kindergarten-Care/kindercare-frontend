'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { GradeDomainModel } from '@/config/types/grade';
import { gradeService } from '@/services/grade/GradeService';
import { CreateGradeClassModal } from './components/CreateGradeClassModal';
import {
  Container,
  PageHeader,
  Title,
  StatBadge,
  PageSubtitle,
  PrimaryButton,
  TreeCard,
  TreeHeader,
  TreeTitle,
  TreeBody,
  GradeItem,
  GradeRow,
  GradeIcon,
  GradeInfo,
  GradeName,
  GradeMeta,
  ChevronIcon,
  ClassListWrapper,
  ClassList,
  ClassRow,
  ClassIcon,
  ClassInfo,
  ClassName,
  ClassYear,
  ArrowIcon,
  EmptyClass,
  LoadingText,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptySubtitle,
} from './styles';

export default function GradesClassesView() {
  const [grades, setGrades] = useState<GradeDomainModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [expandedGrades, setExpandedGrades] = useState<Record<number, boolean>>({});
  const router = useRouter();

  const fetchGradesAndClasses = async () => {
    try {
      setLoading(true);
      const data = await gradeService.getGradesAndClasses();
      setGrades(data);
      const initial: Record<number, boolean> = {};
      data.forEach(g => { initial[g.gradeId] = true; });
      setExpandedGrades(initial);
      setError(null);
    } catch (err: unknown) {
      setError((err as Error)?.message ?? 'Lỗi khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchGradesAndClasses(); }, []);

  const toggleExpand = (gradeId: number) => {
    setExpandedGrades(prev => ({ ...prev, [gradeId]: !prev[gradeId] }));
  };

  const totalGrades = grades.length;
  const totalClasses = grades.reduce((sum, g) => sum + g.classes.length, 0);

  return (
    <Container>
      <PageHeader>
        <div>
          <Title>
            Khối học & Lớp học
            {totalGrades > 0 && (
              <StatBadge>{totalGrades} khối • {totalClasses} lớp</StatBadge>
            )}
          </Title>
          <PageSubtitle>Xem cấu trúc khối - lớp của trường</PageSubtitle>
        </div>
        <PrimaryButton onClick={() => setShowCreateModal(true)}>
          + Thêm Khối / Lớp
        </PrimaryButton>
      </PageHeader>

      <TreeCard>
        <TreeHeader>
          <TreeTitle>Cấu trúc Khối - Lớp</TreeTitle>
        </TreeHeader>

        <TreeBody>
          {loading ? (
            <LoadingText>Đang tải dữ liệu...</LoadingText>
          ) : error ? (
            <EmptyState>
              <EmptyIcon>⚠️</EmptyIcon>
              <EmptyTitle>Đã xảy ra lỗi</EmptyTitle>
              <EmptySubtitle>{error}</EmptySubtitle>
            </EmptyState>
          ) : grades.length === 0 ? (
            <EmptyState>
              <EmptyIcon>🏫</EmptyIcon>
              <EmptyTitle>Chưa có dữ liệu</EmptyTitle>
              <EmptySubtitle>Nhấn "Thêm Khối / Lớp" để bắt đầu.</EmptySubtitle>
            </EmptyState>
          ) : (
            grades.map(grade => (
              <GradeItem key={grade.gradeId}>
                <GradeRow onClick={() => toggleExpand(grade.gradeId)}>
                  <ChevronIcon $expanded={!!expandedGrades[grade.gradeId]}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </ChevronIcon>
                  <GradeIcon>🏫</GradeIcon>
                  <GradeInfo>
                    <GradeName>{grade.gradeName}</GradeName>
                    <GradeMeta>{grade.classes.length} lớp học</GradeMeta>
                  </GradeInfo>
                </GradeRow>

                <ClassListWrapper $expanded={!!expandedGrades[grade.gradeId]}>
                  <ClassList>
                    {grade.classes.length > 0 ? (
                      grade.classes.map(cls => (
                        <ClassRow
                          key={cls.classId}
                          onClick={() => router.push(`/classes/${cls.classId}`)}
                        >
                          <ClassIcon>📚</ClassIcon>
                          <ClassInfo>
                            <ClassName>{cls.className}</ClassName>
                            {cls.yearName && <ClassYear>{cls.yearName}</ClassYear>}
                          </ClassInfo>
                          <ArrowIcon>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </ArrowIcon>
                        </ClassRow>
                      ))
                    ) : (
                      <EmptyClass>Chưa có lớp học nào</EmptyClass>
                    )}
                  </ClassList>
                </ClassListWrapper>
              </GradeItem>
            ))
          )}
        </TreeBody>
      </TreeCard>

      {showCreateModal && (
        <CreateGradeClassModal
          existingGrades={grades}
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => { setShowCreateModal(false); fetchGradesAndClasses(); }}
        />
      )}
    </Container>
  );
}
