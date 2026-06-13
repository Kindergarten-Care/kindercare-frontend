'use client';

import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { ScheduleItem } from '@/config/types/dashboard';
import { IconSchedule } from '@/assets/icons/dashboard';

interface LiveScheduleWidgetProps {
  schedule: ScheduleItem[];
}

function toMinutes(t: string): number {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + (m || 0);
}

function getStatus(
  item: ScheduleItem,
  nowMin: number,
  nextId: string | null,
): 'done' | 'now' | 'next' | 'upcoming' {
  const start = toMinutes(item.time);
  const end = toMinutes(item.endTime);
  if (nowMin >= start && nowMin < end) return 'now';
  if (nowMin >= end) return 'done';
  if (item.id === nextId) return 'next';
  return 'upcoming';
}

const LiveScheduleWidget: React.FC<LiveScheduleWidgetProps> = ({ schedule }) => {
  const [nowMin, setNowMin] = useState<number>(() => {
    const d = new Date();
    return d.getHours() * 60 + d.getMinutes();
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const d = new Date();
      setNowMin(d.getHours() * 60 + d.getMinutes());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const currentItem = schedule.find(item => {
    const start = toMinutes(item.time);
    const end = toMinutes(item.endTime);
    return nowMin >= start && nowMin < end;
  });

  const nextItem = schedule.find(item => toMinutes(item.time) > nowMin);
  const nextId = nextItem?.id ?? null;

  const progressPct = currentItem
    ? Math.min(
        100,
        Math.round(
          ((nowMin - toMinutes(currentItem.time)) /
            (toMinutes(currentItem.endTime) - toMinutes(currentItem.time))) *
            100,
        ),
      )
    : 0;

  return (
    <S.Card>
      <S.CardHead>
        <S.CardTitle><IconSchedule size={16} /> Thời khóa biểu hôm nay</S.CardTitle>
      </S.CardHead>

      <S.LiveNow $active={!!currentItem}>
        <S.LiveIco $color={currentItem?.color ?? '#e5e7eb'}>
          {currentItem?.icon ?? <IconSchedule size={18} color="#9ca3af" />}
        </S.LiveIco>
        <S.LiveBody>
          {currentItem ? (
            <>
              <S.LiveBadge $active>
                <S.LiveDot />
                Đang diễn ra
              </S.LiveBadge>
              <S.LiveTitle>{currentItem.title}</S.LiveTitle>
              <S.LiveMeta>{currentItem.time} – {currentItem.endTime} · {currentItem.note}</S.LiveMeta>
              <S.ProgressBar>
                <S.ProgressFill $pct={progressPct} />
              </S.ProgressBar>
              {nextItem && (
                <S.NextUp>Tiếp theo: <b>{nextItem.title}</b> lúc {nextItem.time}</S.NextUp>
              )}
            </>
          ) : (
            <>
              <S.LiveBadge $active={false}>Ngoài giờ học</S.LiveBadge>
              <S.LiveTitle>{nextItem ? `Sắp tới: ${nextItem.title}` : 'Hết giờ học hôm nay'}</S.LiveTitle>
              {nextItem && <S.LiveMeta>Bắt đầu lúc {nextItem.time}</S.LiveMeta>}
            </>
          )}
        </S.LiveBody>
      </S.LiveNow>

      <S.SchList>
        {schedule.map(item => {
          const status = getStatus(item, nowMin, nextId);
          return (
            <S.SchRow key={item.id} $status={status}>
              <S.SchTime>{item.time}</S.SchTime>
              <S.SchIco $bg={item.color + '22'}>{item.icon}</S.SchIco>
              <S.SchBody>
                <S.SchTitle>{item.title}</S.SchTitle>
                <S.SchNote>{item.note}</S.SchNote>
              </S.SchBody>
              {status !== 'upcoming' && (
                <S.SchStatus $status={status}>
                  {status === 'done' ? 'Xong' : status === 'now' ? 'Đang diễn ra' : 'Tiếp theo'}
                </S.SchStatus>
              )}
            </S.SchRow>
          );
        })}
      </S.SchList>
    </S.Card>
  );
};

export default LiveScheduleWidget;
