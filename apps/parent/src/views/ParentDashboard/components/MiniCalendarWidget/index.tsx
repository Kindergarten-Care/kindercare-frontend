import React from 'react';
import * as S from './styles';

const MiniCalendarWidget: React.FC = () => {
  const weekdays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  
  // Mock days for May 2025
  // Start on Thursday (T5) -> 3 blank days (T2, T3, T4)
  const prevMonthDays = [28, 29, 30];
  const daysInMonth = 31;
  const nextMonthDays = 8; // to fill 6 rows

  return (
    <S.Card>
      <S.CalHeader>
        <S.MonthSelect>
          Tháng 5, 2025 <span>⌄</span>
        </S.MonthSelect>
        <S.NavBtns>
          <S.NavBtn>&lt;</S.NavBtn>
          <S.NavBtn>&gt;</S.NavBtn>
        </S.NavBtns>
      </S.CalHeader>

      <S.CalGrid>
        {weekdays.map(d => (
          <S.Weekday key={d}>{d}</S.Weekday>
        ))}

        {prevMonthDays.map(d => (
          <S.Day key={`p-${d}`} $isOtherMonth $status="none">{d}</S.Day>
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const d = i + 1;
          const weekday = (i + 3) % 7; // offset for May 2025
          const isWeekend = weekday === 5 || weekday === 6;
          
          let status: any = 'none';
          if (isWeekend) status = 'weekend';
          else if (d === 1 || d === 2) status = 'holiday'; // Labor Day
          else if (d <= 14) status = 'present';
          else if (d === 15) status = 'none'; // Today
          
          if (d === 9) status = 'excused';

          return (
            <S.Day 
              key={`c-${d}`} 
              $isToday={d === 15}
              $status={status}
            >
              {d}
            </S.Day>
          );
        })}

        {Array.from({ length: nextMonthDays }).map((_, i) => (
          <S.Day key={`n-${i+1}`} $isOtherMonth $status="none">{i+1}</S.Day>
        ))}
      </S.CalGrid>
    </S.Card>
  );
};

export default MiniCalendarWidget;
