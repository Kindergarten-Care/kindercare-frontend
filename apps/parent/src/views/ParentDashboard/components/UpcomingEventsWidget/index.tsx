import React from 'react';
import * as S from './styles';
import { UpcomingEvent } from '@/config/types/dashboard';

interface UpcomingEventsWidgetProps {
  events: UpcomingEvent[];
}

const UpcomingEventsWidget: React.FC<UpcomingEventsWidgetProps> = ({ events }) => {
  return (
    <S.Card>
      <S.SectionHead>
        <S.SectionTitle>
          <span>📅</span> Sự kiện sắp tới
        </S.SectionTitle>
        <S.SectionLink>Xem lịch &rarr;</S.SectionLink>
      </S.SectionHead>

      <div>
        {events.map((ev) => (
          <S.EvItem key={ev.id}>
            <S.EvDate>
              <strong>{ev.day}</strong>
              <span>{ev.month}</span>
            </S.EvDate>
            <S.EvInfo>
              <strong>{ev.title}</strong>
              <span>{ev.timeOrAmount}</span>
            </S.EvInfo>
            <S.EvTag $type={ev.tagType}>{ev.tag}</S.EvTag>
          </S.EvItem>
        ))}
      </div>
    </S.Card>
  );
};

export default UpcomingEventsWidget;
