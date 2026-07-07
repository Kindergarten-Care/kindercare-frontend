'use client';

import React, { useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { IconReceipt, IconClose } from '@/assets/icons/dashboard';
import { formatVND } from '@/utils/Billing/format';
import { canStillCancelActive, getPendingDeadline } from '@/utils/Billing/extracurricular';
import { ExtracurricularEnrollmentDomainModel } from '@/config/types/extracurricular';
import { statusBadgeVariant, statusLabel } from '../../utils/enrollmentStatus';
import * as S from './styles';

interface EnrollmentCardProps {
  enrollment: ExtracurricularEnrollmentDomainModel;
  cancellingId: number | null;
  onCancel: (enrollmentId: number) => Promise<void>;
}

export const EnrollmentCard: React.FC<EnrollmentCardProps> = ({
  enrollment: en,
  cancellingId,
  onCancel,
}) => {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const deadline = en.status === 'Pending' ? getPendingDeadline(en.createdAt) : null;
  const showCancelButton =
    en.status !== 'Cancelled' &&
    en.status !== 'Expired' &&
    (en.status !== 'Active' || canStillCancelActive(en.activatedAt));

  const handleViewInvoice = () => {
    if (en.invoiceId) {
      router.push(`/billing/${en.invoiceId}`);
    } else {
      router.push('/billing?type=EXTRACURRICULAR');
    }
  };

  const handleConfirm = async () => {
    await onCancel(en.enrollmentId);
    setConfirming(false);
  };

  return (
    <S.EnrollCard>
      <S.EnrollBody>
        <S.EnrollName>
          {en.activityName}
          <S.Badge $variant={statusBadgeVariant(en)}>{statusLabel(en)}</S.Badge>
        </S.EnrollName>
        <S.EnrollMeta>{formatVND(en.monthlyFee)}/tháng</S.EnrollMeta>
        {deadline && <S.EnrollDeadline $expired={deadline.expired}>{deadline.label}</S.EnrollDeadline>}
      </S.EnrollBody>
      <S.EnrollActions>
        <S.Btn $variant="brand" onClick={handleViewInvoice}>
          <IconReceipt size={14} /> {en.status === 'Pending' ? 'Thanh toán ngay' : 'Xem hóa đơn'}
        </S.Btn>
        {showCancelButton && (
          confirming ? (
            <div style={{ display: 'flex', gap: 6 }}>
              <S.Btn $variant="ghost" onClick={() => setConfirming(false)}>Không</S.Btn>
              <S.Btn
                $variant="danger"
                onClick={handleConfirm}
                disabled={cancellingId === en.enrollmentId}
              >
                {cancellingId === en.enrollmentId ? '...' : 'Xác nhận'}
              </S.Btn>
            </div>
          ) : (
            <S.Btn $variant="danger" onClick={() => setConfirming(true)}>
              <IconClose size={14} /> Hủy đăng ký
            </S.Btn>
          )
        )}
      </S.EnrollActions>
    </S.EnrollCard>
  );
};