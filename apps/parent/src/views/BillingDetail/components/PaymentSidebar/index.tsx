'use client';

import React from 'react';
import { IconShieldInfo } from '@/assets/icons/dashboard';
import { formatVND } from '@/utils/Billing/format';
import { PaymentMethod, PAYMENT_METHODS, paymentMethodDisplayName } from '../../utils/paymentMethods';
import * as S from './styles';

interface PaymentSidebarProps {
  totalAmount: number;
  paying: boolean;
  selectedMethod: PaymentMethod;
  onSelectMethod: (method: PaymentMethod) => void;
  onSubmit: () => void;
}

export const PaymentSidebar: React.FC<PaymentSidebarProps> = ({
  totalAmount,
  paying,
  selectedMethod,
  onSelectMethod,
  onSubmit,
}) => (
  <S.Card>
    <S.CardHead>
      <S.HeadTitle>Chọn phương thức thanh toán</S.HeadTitle>
    </S.CardHead>

    <S.PaymentAmountRow>
      <S.PaymentAmountLabel>Số tiền cần thanh toán</S.PaymentAmountLabel>
      <S.PaymentAmountValue>{formatVND(totalAmount)}</S.PaymentAmountValue>
    </S.PaymentAmountRow>

    <S.MethodList role="radiogroup" aria-label="Phương thức thanh toán">
      {PAYMENT_METHODS.map(method => (
        <S.MethodOption key={method.key} $active={selectedMethod === method.key} $disabled={paying}>
          <S.MethodRadio
            type="radio"
            name="payment-method"
            value={method.key}
            checked={selectedMethod === method.key}
            disabled={paying}
            onChange={() => onSelectMethod(method.key)}
          />
          <S.MethodLogo src={method.logo} alt={method.label} />
          <S.MethodName>{method.label}</S.MethodName>
        </S.MethodOption>
      ))}
    </S.MethodList>

    <S.SecurityNote>
      <IconShieldInfo size={14} /> Trang sẽ tự xác nhận lại trạng thái hóa đơn sau khi thanh toán.
    </S.SecurityNote>

    <S.SubmitPayBtn onClick={onSubmit} disabled={paying}>
      {paying
        ? `Đang chuyển tới ${paymentMethodDisplayName(selectedMethod)}...`
        : 'Tiến hành thanh toán'}
    </S.SubmitPayBtn>
  </S.Card>
);