'use client';

import React from 'react';
import { useRouter } from '@/i18n/routing';
import { kcToast } from '@kindercare/ui';
import * as S from './styles';
import { useExtracurricular } from './hooks/useExtracurricular';
import { formatBillingMonth } from '@/utils/Billing/format';
import { EnrollmentCard } from './components/EnrollmentCard';
import { ActivityCardRow } from './components/ActivityCard';

export function Extracurricular() {
  const router = useRouter();
  const {
    loading,
    error,
    activeStudent,
    activities,
    currentMonth,
    currentMonthEnrollments,
    enrolledActivityIds,
    enrollingId,
    cancellingId,
    enroll,
    cancelEnrollment,
  } = useExtracurricular();

  const handleEnroll = async (activityId: number): Promise<void> => {
    try {
      const result = await enroll(activityId);
      if (!result) return;
      kcToast.success('Đăng ký thành công! Vui lòng thanh toán để giữ chỗ.');
      router.push(`/billing/${result.invoiceId}`);
    } catch (err: any) {
      kcToast.error(err?.message || 'Đăng ký thất bại');
    }
  };

  const handleCancel = async (enrollmentId: number): Promise<void> => {
    try {
      const result = await cancelEnrollment(enrollmentId);
      if (!result?.activatedAt) {
        kcToast.success('Đã hủy đăng ký.');
      } else if (result.feeRefunded) {
        kcToast.success('Đã hủy, phí đã được hoàn.');
      } else {
        kcToast.success('Đã hủy, không hoàn phí (đã quá 48 giờ kể từ lúc thanh toán).');
      }
    } catch (err: any) {
      kcToast.error(err?.message || 'Hủy đăng ký thất bại');
    }
  };

  if (loading) {
    return (
      <S.PageWrap>
        <S.LoadingState>Đang tải hoạt động ngoại khóa...</S.LoadingState>
      </S.PageWrap>
    );
  }

  return (
    <S.PageWrap>
      <S.PageHeader>
        <S.PageTitle>Hoạt động ngoại khóa</S.PageTitle>
        <S.PageSub>
          {activeStudent
            ? `Đăng ký cho ${activeStudent.fullName} · ${formatBillingMonth(currentMonth)}`
            : 'Đăng ký hoạt động ngoại khóa'}
        </S.PageSub>
      </S.PageHeader>

      {error && <S.EmptyState>{error}</S.EmptyState>}

      <S.Section>
        <S.SectionTitle>Đăng ký của tháng này</S.SectionTitle>
        {currentMonthEnrollments.length === 0 ? (
          <S.EmptyState>Chưa đăng ký hoạt động nào trong tháng này.</S.EmptyState>
        ) : (
          <S.EnrollList>
            {currentMonthEnrollments.map(en => (
              <EnrollmentCard
                key={en.enrollmentId}
                enrollment={en}
                cancellingId={cancellingId}
                onCancel={handleCancel}
              />
            ))}
          </S.EnrollList>
        )}
      </S.Section>

      <S.Section>
        <S.SectionTitle>Danh mục hoạt động</S.SectionTitle>
        {activities.length === 0 ? (
          <S.EmptyState>Chưa có hoạt động ngoại khóa nào được mở.</S.EmptyState>
        ) : (
          <S.ActivityGrid>
            {activities.map(act => (
              <ActivityCardRow
                key={act.activityId}
                activity={act}
                alreadyEnrolled={enrolledActivityIds.has(act.activityId)}
                enrolling={enrollingId === act.activityId}
                onEnroll={() => handleEnroll(act.activityId)}
              />
            ))}
          </S.ActivityGrid>
        )}
      </S.Section>
    </S.PageWrap>
  );
}