'use client';

import React from 'react';
import { useRouter } from '@/i18n/routing';
import { IconCheck } from '@/assets/icons/dashboard';
import { InvoiceDetailDomainModel } from '@/config/types/invoice';
import { formatVND } from '@/utils/Billing/format';
import { Card, Icon, Title, Desc, Actions, Btn } from '../shared/atoms';
import { PaymentInfoPanel } from '../PaymentInfoPanel';

interface SuccessCardProps {
  invoice: InvoiceDetailDomainModel | null;
  invoiceId: string | null;
  onGoToInvoice: () => void;
}

export const SuccessCard: React.FC<SuccessCardProps> = ({ invoice, onGoToInvoice }) => (
  <Card $wide={!!invoice}>
    <Icon $variant="success">
      <IconCheck size={30} />
    </Icon>
    <Title>Thanh toán thành công!</Title>
    <Desc>
      {invoice
        ? `Đã ghi nhận thanh toán ${formatVND(invoice.totalAmount)}.`
        : 'Hóa đơn của bạn đã được ghi nhận thanh toán đầy đủ.'}
    </Desc>

    {invoice && <PaymentInfoPanel invoice={invoice} />}

    <Actions>
      <Btn $variant="brand" onClick={onGoToInvoice}>Xem hóa đơn</Btn>
    </Actions>
  </Card>
);