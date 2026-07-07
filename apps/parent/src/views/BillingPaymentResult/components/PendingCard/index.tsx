'use client';

import React from 'react';
import { useRouter } from '@/i18n/routing';
import { IconSchedule } from '@/assets/icons/dashboard';
import { Card, Icon, Title, Desc, Actions, Btn } from '../shared/atoms';

interface PendingCardProps {
  onRecheck: () => void;
}

export const PendingCard: React.FC<PendingCardProps> = ({ onRecheck }) => {
  const router = useRouter();
  return (
    <Card>
      <Icon $variant="pending">
        <IconSchedule size={28} />
      </Icon>
      <Title>Chưa xác nhận được thanh toán</Title>
      <Desc>
        Giao dịch có thể đang được xử lý. Vui lòng kiểm tra lại sau ít phút hoặc làm mới trang.
      </Desc>
      <Actions>
        <Btn $variant="ghost" onClick={() => router.push('/billing')}>Về danh sách</Btn>
        <Btn $variant="brand" onClick={onRecheck}>Kiểm tra lại</Btn>
      </Actions>
    </Card>
  );
};