'use client';

import React, { useEffect, useState } from 'react';
import { ParentDashboardService } from '@/services/ParentDashboardService';
import { ParentDashboardModel } from '@/config/types/dashboard';
import { DashboardContainer, GridContainer, Col1, Col2, Col3 } from './styles';
import { ChildStatusWidget } from './components/ChildStatusWidget';
import { MomentsWidget } from './components/MomentsWidget';
import { TuitionWidget } from './components/TuitionWidget';
import { AttendanceWidget } from './components/AttendanceWidget';
import { NewsWidget } from './components/NewsWidget';

import { PickupWidget } from './components/PickupWidget';
import { UpcomingEventsWidget } from './components/UpcomingEventsWidget';

export function ParentDashboard(): React.ReactElement {
  const [data, setData] = useState<ParentDashboardModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardData = await ParentDashboardService.getDashboardData();
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
      <DashboardContainer>
        <div>Đang tải dữ liệu...</div>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <GridContainer>
        {/* Column 1: Status, Moments, Tuition */}
        <Col1>
          <ChildStatusWidget data={data.childStatus} />
          <MomentsWidget data={data.moments} />
          <TuitionWidget data={data.tuition} />
        </Col1>

        {/* Column 2: Upcoming Events */}
        <Col2>
          <UpcomingEventsWidget data={data.upcomingEvents} />
        </Col2>

        {/* Column 3: Attendance, Pickup, News */}
        <Col3>
          <AttendanceWidget data={data.attendance} />
          <PickupWidget data={data.pickup} />
          <NewsWidget data={data.news} />
        </Col3>
      </GridContainer>
    </DashboardContainer>
  );
}
