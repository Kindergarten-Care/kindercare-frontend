'use client';

import React from 'react';
import * as S from './styles';

interface TimelineRawItem {
  time: string;
  title: string;
  sub: string;
  status: 'done' | 'current' | 'next';
}

const TIMELINE_DATA: TimelineRawItem[] = [
  { time: '07:30', title: 'Đón bé', sub: 'Cô đón & điểm danh tại cửa lớp', status: 'done' },
  { time: '08:00', title: 'Ăn sáng', sub: 'Cháo dinh dưỡng + sữa', status: 'done' },
  { time: '08:45', title: 'Học chữ cái', sub: 'Làm quen nhóm chữ O · Ô · Ơ', status: 'done' },
  { time: '09:30', title: 'Hoạt động ngoài trời', sub: 'Vận động & trò chơi sân trường', status: 'current' },
  { time: '11:00', title: 'Ăn trưa', sub: 'Cơm, canh rau, thịt viên', status: 'next' },
  { time: '12:00', title: 'Ngủ trưa', sub: 'Giờ nghỉ trưa của các bé', status: 'next' },
  { time: '14:30', title: 'Ăn xế & trả bé', sub: 'Bánh, sữa chua + chuẩn bị về', status: 'next' },
];

export const TimelineWidget: React.FC = () => {
  const getPillLabel = (status: 'done' | 'current' | 'next'): string => {
    switch (status) {
      case 'done': return 'Đã xong';
      case 'current': return 'Đang diễn ra';
      case 'next': return 'Tiếp theo';
    }
  };

  const getDotColor = (status: 'done' | 'current' | 'next'): string => {
    switch (status) {
      case 'done': return '#A7C9B6';
      case 'current': return '#005A36';
      case 'next': return '#D1D5DB';
    }
  };

  return (
    <S.WidgetContainer>
      <S.HeaderRow>
        <S.WidgetTitle>Lịch sinh hoạt hôm nay</S.WidgetTitle>
        <S.StatusPill>
          <S.StatusDot />
          Đang diễn ra
        </S.StatusPill>
      </S.HeaderRow>

      <S.TimelineList>
        {TIMELINE_DATA.map((t, idx) => {
          const isNext = t.status === 'next';
          const isCurrent = t.status === 'current';
          const dotColor = getDotColor(t.status);
          const showLine = idx < TIMELINE_DATA.length - 1;

          return (
            <S.TimelineItem key={idx}>
              <S.TimeLabel $isNext={isNext}>{t.time}</S.TimeLabel>
              <S.DotCol>
                <S.CircleDot $dotColor={dotColor}>
                  {isCurrent && <S.PulseCircle />}
                </S.CircleDot>
                {showLine && <S.VerticalLine />}
              </S.DotCol>
              <S.ActivityContent>
                <S.InfoBlock>
                  <S.ActivityTitle $isNext={isNext}>{t.title}</S.ActivityTitle>
                  <S.ActivitySub>{t.sub}</S.ActivitySub>
                </S.InfoBlock>
                <S.PillBadge $pillStyle={t.status}>
                  {getPillLabel(t.status)}
                </S.PillBadge>
              </S.ActivityContent>
            </S.TimelineItem>
          );
        })}
      </S.TimelineList>
    </S.WidgetContainer>
  );
};
export default TimelineWidget;
