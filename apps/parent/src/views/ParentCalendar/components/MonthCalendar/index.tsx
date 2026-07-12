'use client';

import React from 'react';
import * as S from './styles';
import { CalendarCellData, WEEKDAY_LABELS, getCategoryMeta, sameDay } from '../../utils';

const MAX_PILLS_PER_DAY = 2;

interface MonthCalendarProps {
  cells: CalendarCellData[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

const MonthCalendar: React.FC<MonthCalendarProps> = ({ cells, selectedDate, onSelectDate }) => (
  <S.Card>
    <S.Grid>
      {WEEKDAY_LABELS.map((label, i) => (
        <S.Weekday key={label} $weekend={i >= 5}>{label}</S.Weekday>
      ))}

      {cells.map(cell => {
        const visible = cell.events.slice(0, MAX_PILLS_PER_DAY);
        const overflow = cell.events.length - visible.length;

        return (
          <S.DayCell
            key={cell.date.getTime()}
            type="button"
            $inMonth={cell.inMonth}
            $weekend={cell.isWeekend}
            $today={cell.isToday}
            $selected={sameDay(cell.date, selectedDate)}
            onClick={() => onSelectDate(cell.date)}
          >
            <S.DayNum $today={cell.isToday} $weekend={cell.isWeekend}>
              {cell.date.getDate()}
            </S.DayNum>

            {cell.events.length > 0 && (
              <>
                <S.EventPills>
                  {visible.map(event => {
                    const meta = getCategoryMeta(event.category);
                    return (
                      <S.EventPill key={event.eventId} $c={meta.c} $tint={meta.tint}>
                        <meta.Icon size={10} />
                        <S.EventPillLabel>{event.title}</S.EventPillLabel>
                      </S.EventPill>
                    );
                  })}
                  {overflow > 0 && <S.MoreCount>+{overflow} sự kiện khác</S.MoreCount>}
                </S.EventPills>

                <S.DotRow>
                  {cell.events.slice(0, 4).map(event => (
                    <S.Dot key={event.eventId} $c={getCategoryMeta(event.category).c} />
                  ))}
                </S.DotRow>
              </>
            )}
          </S.DayCell>
        );
      })}
    </S.Grid>
  </S.Card>
);

export default MonthCalendar;
