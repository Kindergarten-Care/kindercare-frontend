'use client';

import React from 'react';
import { IconWave } from '@/assets/icons/dashboard';
import { formatVND } from '@/utils/Billing/format';
import { ExtracurricularActivityDomainModel } from '@/config/types/extracurricular';
import * as S from './styles';

interface ActivityCardProps {
  activity: ExtracurricularActivityDomainModel;
  alreadyEnrolled: boolean;
  enrolling: boolean;
  onEnroll: () => void;
}

export const ActivityCardRow: React.FC<ActivityCardProps> = ({
  activity: act,
  alreadyEnrolled,
  enrolling,
  onEnroll,
}) => (
  <S.ActivityCard>
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
      disabled={alreadyEnrolled || enrolling}
      onClick={onEnroll}
    >
      {alreadyEnrolled ? 'Đã đăng ký tháng này' : enrolling ? 'Đang đăng ký...' : 'Đăng ký'}
    </S.Btn>
  </S.ActivityCard>
);