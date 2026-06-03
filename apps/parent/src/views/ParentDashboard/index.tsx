'use client';

import React, { useEffect, useState } from 'react';
import { parentDashboardService } from '@/services/ParentDashboardService';
import { ParentDashboardModel } from '@/config/types/dashboard';
import * as S from './styles';

import ChildHeroWidget from './components/ChildHeroWidget';
import QuickActionsStrip from './components/QuickActionsStrip';
import TimelineWidget from './components/TimelineWidget';
import MessagesWidget from './components/MessagesWidget';
import CameraWidget from './components/CameraWidget';
import FeeAlertWidget from './components/FeeAlertWidget';
import AttendanceStatsWidget from './components/AttendanceStatsWidget';
import MiniCalendarWidget from './components/MiniCalendarWidget';
import UpcomingEventsWidget from './components/UpcomingEventsWidget';

export function ParentDashboard(): React.ReactElement {
  const [data, setData] = useState<ParentDashboardModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardData = await parentDashboardService.getDashboardData();
        setData(dashboardData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !data) {
    return (
      <S.DashboardContainer>
        <div>Đang tải dữ liệu...</div>
      </S.DashboardContainer>
    );
  }

  return (
    <S.DashboardContainer>
      {/* Hero Section - Full width */}
      <ChildHeroWidget data={data.childHero} />
      
      {/* Quick Access Strip - Full width */}
      <QuickActionsStrip />

      <S.MainGrid>
        <S.LeftColumn>
          <TimelineWidget events={data.timeline} />
          <MessagesWidget messages={data.messages} />
        </S.LeftColumn>

        <S.RightColumn>
          <CameraWidget />
          <FeeAlertWidget fee={data.fee} />
          <AttendanceStatsWidget stats={data.attendanceStats} />
          <MiniCalendarWidget />
          <UpcomingEventsWidget events={data.upcomingEvents} />
        </S.RightColumn>
      </S.MainGrid>
    </S.DashboardContainer>
  );
}
