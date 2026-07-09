'use client';

import React from 'react';
import { Card, Spinner, Title, Desc } from '../shared/atoms';

export const CheckingCard: React.FC = () => (
  <Card>
    <Spinner />
    <Title>Đang xác nhận thanh toán...</Title>
    <Desc>
      Vui lòng đợi trong giây lát, chúng tôi đang kiểm tra kết quả giao dịch từ MoMo.
    </Desc>
  </Card>
);