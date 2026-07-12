'use client';

import React from 'react';
import { useRouter } from '@/i18n/routing';
import { IconClose } from '@/assets/icons/dashboard';
import { Card, Icon, Title, Desc, Actions, Btn } from '../shared/atoms';

interface FailedCardProps {
  onRetry: () => void;
}

export const FailedCard: React.FC<FailedCardProps> = ({ onRetry }) => {
  const router = useRouter();
  return (
    <Card>
      <Icon $variant="fail">
        <IconClose size={30} />
      </Icon>
      <Title>Thanh toán không thành công</Title>
      <Desc>Giao dịch đã bị hủy hoặc thất bại. Bạn có thể thử thanh toán lại.</Desc>
      <Actions>
        <Btn $variant="ghost" onClick={() => router.push('/billing')}>Về danh sách</Btn>
        <Btn $variant="brand" onClick={onRetry}>Thử lại</Btn>
      </Actions>
    </Card>
  );
};