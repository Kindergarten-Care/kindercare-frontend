import React from 'react';
import styled from 'styled-components';
import { WidgetCard, WidgetHeader, WidgetTitle } from '../styles';
import { AttendanceStatus } from '@/config/types/dashboard';

const Legend = styled.div`
  display: flex;
  gap: 12px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 500;
`;

const Dot = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.$color};
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
`;

const DayHeader = styled.div`
  text-align: center;
  font-size: 16px;
  color: #3f493f;
  padding: 4px 0;
`;

const DayCell = styled.div<{ $status: 'Đúng giờ' | 'Vắng/Ốm' | 'Chưa có' | 'Nghỉ lễ' }>`
  background: ${props => {
    switch (props.$status) {
      case 'Đúng giờ': return '#005e2c';
      case 'Vắng/Ốm': return '#ffdad6';
      case 'Nghỉ lễ': return '#e5e7eb'; // Example color
      default: return '#f0f5ec';
    }
  }};
  color: ${props => {
    switch (props.$status) {
      case 'Đúng giờ': return '#fff';
      case 'Vắng/Ốm': return '#93000a';
      default: return '#181d18';
    }
  }};
  border-radius: 12px;
  padding: 16px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

const DAYS_OF_WEEK = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

export const AttendanceWidget = ({ data }: { data: AttendanceStatus }) => {
  return (
    <WidgetCard>
      <WidgetHeader>
        <WidgetTitle>Điểm danh tháng {data.month}</WidgetTitle>
        <Legend>
          <LegendItem>
            <Dot $color="#005e2c" /> Đúng giờ
          </LegendItem>
          <LegendItem>
            <Dot $color="#ffdad6" /> Vắng/Ốm
          </LegendItem>
        </Legend>
      </WidgetHeader>
      
      <CalendarGrid>
        {DAYS_OF_WEEK.map((day) => (
          <DayHeader key={day}>{day}</DayHeader>
        ))}
        {/* Placeholder for first day offset (e.g., if month starts on Wednesday) */}
        <div /><div />
        
        {data.days.map((day) => (
          <DayCell key={day.date} $status={day.status}>
            {day.date}
          </DayCell>
        ))}
      </CalendarGrid>
    </WidgetCard>
  );
};
