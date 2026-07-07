'use client';

import React from 'react';
import { useRouter } from '@/i18n/routing';
import * as S from './styles';
import { usePaymentResult } from './hooks/usePaymentResult';
import { CheckingCard } from './components/CheckingCard';
import { SuccessCard } from './components/SuccessCard';
import { FailedCard } from './components/FailedCard';
import { PendingCard } from './components/PendingCard';

export function BillingPaymentResult() {
  const router = useRouter();
  const { state, invoice, invoiceId } = usePaymentResult();

  const goToInvoice = (): void => {
    if (invoiceId) router.push(`/billing/${invoiceId}`);
    else router.push('/billing');
  };

  return (
    <S.PageWrap>
      {state === 'checking' && <CheckingCard />}
      {state === 'success' && (
        <SuccessCard invoice={invoice} invoiceId={invoiceId} onGoToInvoice={goToInvoice} />
      )}
      {state === 'failed' && <FailedCard onRetry={goToInvoice} />}
      {state === 'pending' && <PendingCard onRecheck={goToInvoice} />}
    </S.PageWrap>
  );
}