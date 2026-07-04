'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { kcToast } from '@kindercare/ui';
import * as S from './styles';
import { useExtracurricular } from './hooks/useExtracurricular';
import { formatVND, formatBillingMonth } from '@/utils/Billing/format';
import { getPendingDeadline } from '@/utils/Billing/extracurricular';
import { IconWave, IconClose } from '@/assets/icons/dashboard';
import { EnrollmentStatus } from '@/config/types/extracurricular';

function statusBadgeVariant(status: EnrollmentStatus): 'pending' | 'active' | 'cancelled' {
  if (status === 'Active') return 'active';
  if (status === 'Cancelled') return 'cancelled';
  return 'pending';
}

function statusLabel(status: EnrollmentStatus): string {
  if (status === 'Active') return 'Đang tham gia';
  if (status === 'Cancelled') return 'Đã hủy';
  return 'Chờ thanh toán';
}

export function Extracurricular() {
  const locale = useLocale();
  const router = useRouter();
  const [confirmCancelId, setConfirmCancelId] = useState<number | null>(null);
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
      await cancelEnrollment(enrollmentId);
      kcToast.success('Đã hủy đăng ký. Hoạt động sẽ không được gia hạn từ tháng sau.');
    } catch (err: any) {
      kcToast.error(err?.message || 'Hủy đăng ký thất bại');
    } finally {
      setConfirmCancelId(null);
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
          {activeStudent ? `Đăng ký cho ${activeStudent.fullName} · ${formatBillingMonth(currentMonth)}` : 'Đăng ký hoạt động ngoại khóa'}
        </S.PageSub>
      </S.PageHeader>

      {error && <S.EmptyState>{error}</S.EmptyState>}

      <S.Section>
        <S.SectionTitle>Đăng ký của tháng này</S.SectionTitle>
        {currentMonthEnrollments.length === 0 ? (
          <S.EmptyState>Chưa đăng ký hoạt động nào trong tháng này.</S.EmptyState>
        ) : (
          <S.EnrollList>
            {currentMonthEnrollments.map(en => {
              const deadline = en.status === 'Pending' ? getPendingDeadline(en.createdAt) : null;
              return (
                <S.EnrollCard key={en.enrollmentId}>
                  <S.EnrollBody>
                    <S.EnrollName>
                      {en.activityName}
                      <S.Badge $variant={statusBadgeVariant(en.status)}>{statusLabel(en.status)}</S.Badge>
                    </S.EnrollName>
                    <S.EnrollMeta>{formatVND(en.monthlyFee)}/tháng</S.EnrollMeta>
                    {deadline && <S.EnrollDeadline $expired={deadline.expired}>{deadline.label}</S.EnrollDeadline>}
                  </S.EnrollBody>
                  {en.status !== 'Cancelled' && (
                    <S.EnrollActions>
                      {confirmCancelId === en.enrollmentId ? (
                        <div style={{ display: 'flex', gap: 6 }}>
                          <S.Btn $variant="ghost" onClick={() => setConfirmCancelId(null)}>Không</S.Btn>
                          <S.Btn
                            $variant="danger"
                            onClick={() => handleCancel(en.enrollmentId)}
                            disabled={cancellingId === en.enrollmentId}
                          >
                            {cancellingId === en.enrollmentId ? '...' : 'Xác nhận'}
                          </S.Btn>
                        </div>
                      ) : (
                        <S.Btn $variant="ghost" onClick={() => setConfirmCancelId(en.enrollmentId)}>
                          <IconClose size={14} /> Hủy đăng ký
                        </S.Btn>
                      )}
                    </S.EnrollActions>
                  )}
                </S.EnrollCard>
              );
            })}
          </S.EnrollList>
        )}
      </S.Section>

      <S.Section>
        <S.SectionTitle>Danh mục hoạt động</S.SectionTitle>
        {activities.length === 0 ? (
          <S.EmptyState>Chưa có hoạt động ngoại khóa nào được mở.</S.EmptyState>
        ) : (
          <S.ActivityGrid>
            {activities.map(act => {
              const alreadyEnrolled = enrolledActivityIds.has(act.activityId);
              return (
                <S.ActivityCard key={act.activityId}>
                  <S.ActivityIcon>
                    <IconWave size={20} />
                  </S.ActivityIcon>
                  <S.ActivityName>{act.activityName}</S.ActivityName>
                  {act.description && <S.ActivityDesc>{act.description}</S.ActivityDesc>}
                  <S.ActivityFee>
                    {formatVND(act.monthlyFee)} <S.ActivityFeeUnit>/tháng</S.ActivityFeeUnit>
                  </S.ActivityFee>
                  <S.Btn
                    $variant={alreadyEnrolled ? 'ghost' : 'brand'}
                    disabled={alreadyEnrolled || enrollingId === act.activityId}
                    onClick={() => handleEnroll(act.activityId)}
                  >
                    {alreadyEnrolled ? 'Đã đăng ký tháng này' : enrollingId === act.activityId ? 'Đang đăng ký...' : 'Đăng ký'}
                  </S.Btn>
                </S.ActivityCard>
              );
            })}
          </S.ActivityGrid>
        )}
      </S.Section>
    </S.PageWrap>
  );
}
