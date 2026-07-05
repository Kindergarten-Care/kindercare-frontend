'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import * as S from './styles';
import { FeeInfo } from '@/config/types/dashboard';
import { IconCreditCard, IconClose } from '@/assets/icons/dashboard';

interface FeeAlertWidgetProps {
  fee: FeeInfo;
}

const FeeAlertWidget: React.FC<FeeAlertWidgetProps> = ({ fee }) => {
  const t = useTranslations('Dashboard');
  const [dismissed, setDismissed] = useState<boolean>(false);

  if (dismissed) return null;

  const isUrgent = fee.daysLeft <= 7;

  return (
    <S.FeeCard>
      <S.Glow />
      <S.Ico><IconCreditCard size={22} color="#d97706" /></S.Ico>
      <S.Body>
        <S.Title>{fee.title}</S.Title>
        <S.Sub>
          {t('feeAlert.deadlinePrefix', { deadline: fee.deadline })}{' '}
          <strong style={{ color: isUrgent ? '#dc2626' : '#92400e' }}>
            {t('feeAlert.daysLeft', { days: fee.daysLeft })}
          </strong>
        </S.Sub>
      </S.Body>
      <S.AmtBlock>
        <S.Amt>{fee.amount.toLocaleString('vi-VN')} {t('feeAlert.currencySuffix')}</S.Amt>
        <S.AmtSub>{t('feeAlert.needsPaymentBadge')}</S.AmtSub>
      </S.AmtBlock>
      <S.PayBtn onClick={() => alert(t('feeAlert.redirectingAlert'))}>
        {t('feeAlert.payNowArrow')}
      </S.PayBtn>
      <S.CloseBtn onClick={() => setDismissed(true)}><IconClose size={14} /></S.CloseBtn>
    </S.FeeCard>
  );
};

export default FeeAlertWidget;
