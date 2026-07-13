'use client';

import React from 'react';
import * as S from './styles';
import {
  CalendarEventModel,
  CalendarHolidayModel,
  getCategoryMeta,
  formatFullDate,
  formatEventRange,
  sameDay,
} from '../../utils';
import { IconCalendar, IconClock, IconPin, IconStar } from '../../icons';

interface EventSidePanelProps {
  selectedDate: Date;
  selectedDayEvents: CalendarEventModel[];
  selectedDayHolidays: CalendarHolidayModel[];
  upcomingEvents: CalendarEventModel[];
  onSelectDate: (date: Date) => void;
}

const MONTH_SHORT = ['Th 1', 'Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7', 'Th 8', 'Th 9', 'Th 10', 'Th 11', 'Th 12'];

const EventSidePanel: React.FC<EventSidePanelProps> = ({
  selectedDate,
  selectedDayEvents,
  selectedDayHolidays,
  upcomingEvents,
  onSelectDate,
}) => (
  <S.Column>
    {/* Events of the selected day */}
    <S.Card>
      <S.CardHead>
        <S.CardIcon $bg="#E6F3ED" $fg="#005A36"><IconCalendar size={17} /></S.CardIcon>
        <div>
          <S.CardTitle>Sự kiện trong ngày</S.CardTitle>
          <S.CardSub>{formatFullDate(selectedDate)}</S.CardSub>
        </div>
      </S.CardHead>

      {selectedDayHolidays.map(holiday => (
        <S.HolidayBanner key={holiday.holidayId}>
          <IconStar size={14} />
          {holiday.holidayName ? `Ngày nghỉ lễ: ${holiday.holidayName}` : 'Ngày nghỉ lễ theo quy định trường'}
        </S.HolidayBanner>
      ))}

      {selectedDayEvents.length > 0 ? (
        <S.EventList>
          {selectedDayEvents.map(event => {
            const meta = getCategoryMeta(event.category);
            return (
              <S.EventItem key={event.eventId} $c={meta.c} $tint={meta.tint}>
                <S.EventItemHead>
                  <S.EventItemIcon $c={meta.c}><meta.Icon size={15} /></S.EventItemIcon>
                  <S.EventItemTitle>{event.title}</S.EventItemTitle>
                  <S.EventItemBadge $c={meta.c}>{meta.label}</S.EventItemBadge>
                </S.EventItemHead>
                <S.EventItemMeta>
                  <S.EventItemMetaRow>
                    <IconClock size={12} /> {event.time ?? 'Cả ngày'}
                  </S.EventItemMetaRow>
                  {event.location && (
                    <S.EventItemMetaRow>
                      <IconPin size={12} /> {event.location}
                    </S.EventItemMetaRow>
                  )}
                </S.EventItemMeta>
                {event.description && <S.EventItemDesc>{event.description}</S.EventItemDesc>}
              </S.EventItem>
            );
          })}
        </S.EventList>
      ) : selectedDayHolidays.length === 0 ? (
        <S.EmptyState>
          <IconCalendar size={26} color="#D1D5DB" />
          Không có sự kiện nào trong ngày này
        </S.EmptyState>
      ) : null}
    </S.Card>

    {/* Upcoming events */}
    <S.Card>
      <S.CardHead>
        <S.CardIcon $bg="#FFEEDF" $fg="#F97316"><IconClock size={17} /></S.CardIcon>
        <div>
          <S.CardTitle>Sự kiện sắp tới</S.CardTitle>
          <S.CardSub>Trong 2 tháng tới</S.CardSub>
        </div>
      </S.CardHead>

      {upcomingEvents.length > 0 ? (
        <S.EventList>
          {upcomingEvents.map(event => {
            const meta = getCategoryMeta(event.category);
            return (
              <S.UpcomingRow
                key={event.eventId}
                type="button"
                $active={sameDay(event.startDate, selectedDate)}
                onClick={() => onSelectDate(event.startDate)}
              >
                <S.UpcomingDate $c={meta.c} $tint={meta.tint}>
                  <S.UpcomingDay>{event.startDate.getDate()}</S.UpcomingDay>
                  <S.UpcomingMonth>{MONTH_SHORT[event.startDate.getMonth()]}</S.UpcomingMonth>
                </S.UpcomingDate>
                <S.UpcomingInfo>
                  <S.UpcomingTitle>{event.title}</S.UpcomingTitle>
                  <S.UpcomingMeta>
                    {formatEventRange(event)}{event.time ? ` · ${event.time}` : ''}
                  </S.UpcomingMeta>
                </S.UpcomingInfo>
              </S.UpcomingRow>
            );
          })}
        </S.EventList>
      ) : (
        <S.EmptyState>
          <IconClock size={26} color="#D1D5DB" />
          Chưa có sự kiện nào sắp diễn ra
        </S.EmptyState>
      )}
    </S.Card>
  </S.Column>
);

export default EventSidePanel;
