'use client';

import React from 'react';
import { IconCheck } from '@/assets/icons/dashboard';
import { formatVND, formatUnixDateTime } from '@/utils/Billing/format';
import { InvoiceDetailDomainModel } from '@/config/types/invoice';
import { txStatusLabel } from '../../utils/invoiceStatus';
import { paymentMethodLogo, paymentMethodDisplayName, PaymentMethod } from '../../utils/paymentMethods';
import * as S from './styles';

interface TransactionListProps {
  transactions: InvoiceDetailDomainModel['transactions'];
}

const isKnownMethod = (m: string): m is PaymentMethod => m === 'momo' || m === 'vnpay';

export const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => (
  <S.Card>
    <S.CardHead>
      <S.HeadTitle>Lịch sử giao dịch</S.HeadTitle>
    </S.CardHead>
    {transactions.length === 0 ? (
      <S.EmptyTx>Chưa có giao dịch nào cho hóa đơn này.</S.EmptyTx>
    ) : (
      <S.CardBody>
        <S.Timeline>
          {transactions.map(tx => {
            const logo = paymentMethodLogo(tx.paymentMethod);
            const methodLabel = isKnownMethod(tx.paymentMethod)
              ? paymentMethodDisplayName(tx.paymentMethod)
              : tx.paymentMethod;
            return (
              <S.TxRow key={tx.transactionId}>
                <S.TxIcon $status={tx.status}>
                  {logo ? (
                    <S.TxLogo src={logo} alt={methodLabel} />
                  ) : (
                    <IconCheck size={16} />
                  )}
                </S.TxIcon>
                <S.TxBody>
                  <S.TxMethod>{methodLabel}</S.TxMethod>
                  <S.TxMeta>
                    {formatUnixDateTime(tx.transactionDate)} · {txStatusLabel(tx.status)}
                    {tx.transactionCode ? ` · ${tx.transactionCode}` : ''}
                  </S.TxMeta>
                </S.TxBody>
                <S.TxAmount>{formatVND(tx.amountPaid)}</S.TxAmount>
              </S.TxRow>
            );
          })}
        </S.Timeline>
      </S.CardBody>
    )}
  </S.Card>
);