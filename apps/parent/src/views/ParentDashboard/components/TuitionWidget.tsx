import React from 'react';
import styled from 'styled-components';
import { WidgetCard } from '../styles';
import { TuitionStatus } from '@/config/types/dashboard';

const TuitionCard = styled(WidgetCard)`
  background: linear-gradient(157.773deg, rgb(255, 255, 255) 0%, rgb(240, 245, 236) 100%);
  border-left: 4px solid #006495;
`;

const LabelTop = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #3f493f;
  margin-bottom: 4px;
`;

const LabelMid = styled.div`
  font-size: 16px;
  color: #181d18;
  margin-bottom: 4px;
`;

const Amount = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #006495;
  margin-bottom: 20px;
`;

const PayButton = styled.button`
  background: #006495;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
`;

export const TuitionWidget = ({ data }: { data: TuitionStatus }) => {
  return (
    <TuitionCard>
      <LabelTop>HỌC PHÍ & LỆ PHÍ</LabelTop>
      <LabelMid>Cần thanh toán tháng {data.month}:</LabelMid>
      <Amount>{data.amountDue.toLocaleString('vi-VN')}đ</Amount>
      <PayButton>Đóng phí ngay</PayButton>
    </TuitionCard>
  );
};
