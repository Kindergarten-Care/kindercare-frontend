import React from 'react';
import * as S from './styles';
import { FeeInfo } from '@/config/types/dashboard';

interface FeeAlertWidgetProps {
  fee: FeeInfo;
}

const FeeAlertWidget: React.FC<FeeAlertWidgetProps> = ({ fee }) => {
  return (
    <S.FeeCard>
      <S.Row>
        <S.TitleWrap>
          <S.Ico>💳</S.Ico>
          <S.TextWrap>
            <strong>{fee.title}</strong>
            <span>Hạn: {fee.deadline}</span>
          </S.TextWrap>
        </S.TitleWrap>
        <S.Amount>
          <strong>{fee.amount.toLocaleString('vi-VN')} đ</strong>
          <span>Còn {fee.daysLeft} ngày</span>
        </S.Amount>
      </S.Row>
      <S.PayBtn onClick={() => alert('Đang chuyển hướng thanh toán...')}>
        Thanh toán ngay &rarr;
      </S.PayBtn>
    </S.FeeCard>
  );
};

export default FeeAlertWidget;
