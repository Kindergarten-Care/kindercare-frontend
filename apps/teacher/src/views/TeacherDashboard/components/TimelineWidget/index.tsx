'use client';

import React from 'react';
import * as S from './styles';
import { useRouter } from '@/i18n/routing';

export const TimelineWidget: React.FC = () => {
  const router = useRouter();

  return (
    <S.WidgetContainer>
      <S.WidgetTitle>Lịch trình trong ngày</S.WidgetTitle>
      
      <S.TimelineList>
        {/* Completed Activity */}
        <S.TimelineItem>
          <S.TimeLabel>08:00</S.TimeLabel>
          <S.ActivityText $completed>Thể dục sáng</S.ActivityText>
          <S.CircleIcon variant="completed">
            <S.CheckIcon />
          </S.CircleIcon>
        </S.TimelineItem>

        {/* Active Activity */}
        <S.TimelineItem>
          <S.ActiveActivityCard>
            <S.ActiveHeader>
              <S.ActiveStatus>ĐANG DIỄN RA | 10:30</S.ActiveStatus>
              <S.ActiveBadge>GIỜ ĂN</S.ActiveBadge>
            </S.ActiveHeader>
            <S.ActiveTitle>Hoạt động: Ăn trưa</S.ActiveTitle>
            <S.ActiveDesc>
              Thực đơn: Cơm trắng, Thịt viên sốt cà chua, Canh bí đỏ, Chuối tráng miệng.
            </S.ActiveDesc>
            <S.UpdateButton onClick={() => router.push('/activities')}>
              <S.UpdateIcon>🍽</S.UpdateIcon>
              Cập nhật khẩu phần ăn
            </S.UpdateButton>
          </S.ActiveActivityCard>
          <S.CircleIcon variant="active" />
        </S.TimelineItem>

        {/* Upcoming Activity */}
        <S.TimelineItem>
          <S.TimeLabel>11:30</S.TimeLabel>
          <S.ActivityText>Ngủ trưa</S.ActivityText>
          <S.CircleIcon variant="upcoming" />
        </S.TimelineItem>
      </S.TimelineList>
    </S.WidgetContainer>
  );
};
