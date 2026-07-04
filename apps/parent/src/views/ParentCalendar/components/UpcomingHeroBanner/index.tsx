'use client';

import React from 'react';
import * as S from './styles';
import { CalendarEventModel, formatFullDate, daysFromToday } from '../../utils';
import { IconCalendar } from '../../icons';

interface UpcomingHeroBannerProps {
  nextEvent: CalendarEventModel;
  holidayCount: number;
}

const UpcomingHeroBanner: React.FC<UpcomingHeroBannerProps> = ({ nextEvent, holidayCount }) => {
  const daysUntil = Math.max(0, daysFromToday(nextEvent.startDate));
  const weeksUntil = Math.floor(daysUntil / 7);
  const startTime = nextEvent.time?.split(' - ')[0];

  return (
    <S.Banner>
      <S.BannerIcon><IconCalendar size={21} /></S.BannerIcon>
      <S.BannerInfo>
        <S.BannerLabel>Sự kiện sắp tới</S.BannerLabel>
        <S.BannerTitle>{nextEvent.title}</S.BannerTitle>
        <S.BannerMeta>
          <IconCalendar size={13} />
          {formatFullDate(nextEvent.startDate)}{startTime ? ` · ${startTime}` : ''}
        </S.BannerMeta>
      </S.BannerInfo>

      <S.StatTiles>
        <S.StatTile>
          <S.StatValue>{daysUntil}</S.StatValue>
          <S.StatLabel>{daysUntil === 0 ? 'Hôm nay' : 'Ngày nữa'}</S.StatLabel>
        </S.StatTile>
        <S.StatTile>
          <S.StatValue>{weeksUntil}</S.StatValue>
          <S.StatLabel>Tuần</S.StatLabel>
        </S.StatTile>
        <S.StatTile>
          <S.StatValue>{holidayCount}</S.StatValue>
          <S.StatLabel>Ngày lễ</S.StatLabel>
        </S.StatTile>
      </S.StatTiles>
    </S.Banner>
  );
};

export default UpcomingHeroBanner;
