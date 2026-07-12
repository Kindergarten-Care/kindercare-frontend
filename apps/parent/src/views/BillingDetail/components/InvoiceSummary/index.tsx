'use client';

import React from 'react';
import { IconClose } from '@/assets/icons/dashboard';
import { formatVND, formatBillingMonth } from '@/utils/Billing/format';
import { InvoiceDetailDomainModel } from '@/config/types/invoice';
import {
  statusBadgeVariant,
  statusLabel,
  itemBadgeVariant,
  itemStatusLabel,
} from '../../utils/invoiceStatus';
import * as S from './styles';

interface InvoiceSummaryProps {
  invoice: InvoiceDetailDomainModel;
  cancellingItemId: number | null;
  onCancelItem: (enrollmentId: number) => Promise<void>;
}

function invoiceTitle(invoice: InvoiceDetailDomainModel): string {
  if (invoice.invoiceType === 'TUITION') {
    return `Học phí ${invoice.periodRange ?? formatBillingMonth(invoice.billingMonth)}`;
  }
  if (invoice.invoiceType === 'EXTRACURRICULAR') {
    return `Ngoại khóa ${formatBillingMonth(invoice.billingMonth)}`;
  }
  return `Hóa đơn tiền ăn ${formatBillingMonth(invoice.billingMonth)}`;
}

export const InvoiceSummary: React.FC<InvoiceSummaryProps> = ({
  invoice,
  cancellingItemId,
  onCancelItem,
}) => (
  <S.Card>
    <S.CardHead>
      <div style={{ flex: 1 }}>
        <S.HeadTitle>{invoiceTitle(invoice)}</S.HeadTitle>
      </div>
      <S.Badge $variant={statusBadgeVariant(invoice)}>{statusLabel(invoice)}</S.Badge>
    </S.CardHead>

    <S.CardBody>
      {invoice.tuitionFee > 0 && (
        <S.LineRow>
          <S.LineLabel>Học phí</S.LineLabel>
          <S.LineValue>{formatVND(invoice.tuitionFee)}</S.LineValue>
        </S.LineRow>
      )}
      {invoice.expectedMealFee > 0 && (
        <S.LineRow>
          <S.LineLabel>Tiền ăn</S.LineLabel>
          <S.LineValue>{formatVND(invoice.expectedMealFee)}</S.LineValue>
        </S.LineRow>
      )}
      {invoice.invoiceType === 'EXTRACURRICULAR' && invoice.extracurricularItems ? (
        invoice.extracurricularItems
          .filter(item => item.status !== 'Cancelled' && item.status !== 'Expired')
          .map(item => {
            const struck = item.status === 'Cancelled' || item.status === 'Expired';
            const canCancelItem = item.status === 'Pending';
            return (
              <S.ItemRow key={item.enrollmentId} $struck={struck}>
                <S.ItemInfo>
                  <S.ItemName $struck={struck}>{item.activityName}</S.ItemName>
                  <S.ItemBadge $variant={itemBadgeVariant(item)}>{itemStatusLabel(item)}</S.ItemBadge>
                </S.ItemInfo>
                <S.ItemRight>
                  <S.ItemFee $struck={struck}>{formatVND(item.monthlyFee)}</S.ItemFee>
                  {canCancelItem && (
                    <S.ItemCancelBtn
                      onClick={() => onCancelItem(item.enrollmentId)}
                      disabled={cancellingItemId === item.enrollmentId}
                    >
                      <IconClose size={12} /> Hủy
                    </S.ItemCancelBtn>
                  )}
                </S.ItemRight>
              </S.ItemRow>
            );
          })
      ) : (
        invoice.extracurricularFee > 0 && (
          <S.LineRow>
            <S.LineLabel>Ngoại khóa</S.LineLabel>
            <S.LineValue>{formatVND(invoice.extracurricularFee)}</S.LineValue>
          </S.LineRow>
        )
      )}
      {invoice.surcharge > 0 && (
        <S.LineRow>
          <S.LineLabel>Phụ thu</S.LineLabel>
          <S.LineValue>{formatVND(invoice.surcharge)}</S.LineValue>
        </S.LineRow>
      )}
      {invoice.discountAmount > 0 && (
        <S.LineRow>
          <S.LineLabel>Chiết khấu</S.LineLabel>
          <S.LineValue $negative>-{formatVND(invoice.discountAmount)}</S.LineValue>
        </S.LineRow>
      )}
      {invoice.refundAmount > 0 && (
        <S.LineRow>
          <S.LineLabel>Hoàn tiền ăn tháng trước</S.LineLabel>
          <S.LineValue $negative>-{formatVND(invoice.refundAmount)}</S.LineValue>
        </S.LineRow>
      )}

      <S.TotalRow>
        <S.TotalLabel>Tổng cộng</S.TotalLabel>
        <S.TotalValue>{formatVND(invoice.totalAmount)}</S.TotalValue>
      </S.TotalRow>
    </S.CardBody>
  </S.Card>
);