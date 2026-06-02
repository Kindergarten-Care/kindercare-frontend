import React from 'react';
import styled from 'styled-components';
import { WidgetCard, WidgetHeader, WidgetTitle, WidgetLink } from '../styles';
import { UpcomingEvent } from '@/config/types/dashboard';

const EventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const EventItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;

  &:hover {
    border-color: #007947;
    background: #f0fdf4;
  }
`;

const EventDate = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #007947;
  margin-bottom: 8px;
`;

const EventTitle = styled.h4`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #181d18;
  margin: 0 0 8px 0;
`;

const EventDetail = styled.div`
  font-size: 13px;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const UpcomingEventsWidget = ({ data }: { data: UpcomingEvent[] }) => {
  return (
    <WidgetCard>
      <WidgetHeader>
        <WidgetTitle>Sự kiện sắp tới</WidgetTitle>
        <WidgetLink>Xem lịch</WidgetLink>
      </WidgetHeader>
      
      <EventList>
        {data.map((item) => (
          <EventItem key={item.id}>
            <EventDate>{item.date}</EventDate>
            <EventTitle>{item.title}</EventTitle>
            <EventDetail>🕒 {item.time}</EventDetail>
            <EventDetail>📍 {item.location}</EventDetail>
          </EventItem>
        ))}
      </EventList>
    </WidgetCard>
  );
};
