import React from 'react';
import * as S from './styles';
import { AttendanceWidget } from './components/AttendanceWidget';
import { ParentNotesWidget } from './components/ParentNotesWidget';
import { TimelineWidget } from './components/TimelineWidget';
import { QuickActionsWidget } from './components/QuickActionsWidget';
import { HealthAlertsWidget } from './components/HealthAlertsWidget';
import { NoticeboardWidget } from './components/NoticeboardWidget';
import { Responsive } from '@kindercare/ui';

export const TeacherDashboardView: React.FC = () => {
  return (
    <>
      {/* 3-Column Layout: from XL (>= 1280px) */}
      <Responsive from="xl">
        <S.DashboardGrid3Col>
          <S.Column>
            <AttendanceWidget />
            <ParentNotesWidget />
          </S.Column>
          <S.Column>
            <TimelineWidget />
            <QuickActionsWidget />
          </S.Column>
          <S.Column>
            <HealthAlertsWidget />
            <NoticeboardWidget />
          </S.Column>
        </S.DashboardGrid3Col>
      </Responsive>

      {/* 2-Column Layout: from MD to XL (768px <= width < 1280px) */}
      <Responsive from="md" to="xl">
        <S.DashboardGrid2Col>
          <S.Column>
            <AttendanceWidget />
            <ParentNotesWidget />
            <HealthAlertsWidget />
          </S.Column>
          <S.Column>
            <TimelineWidget />
            <QuickActionsWidget />
            <NoticeboardWidget />
          </S.Column>
        </S.DashboardGrid2Col>
      </Responsive>

      {/* 1-Column Layout: below MD (< 768px) */}
      <Responsive to="md">
        <S.DashboardGrid1Col>
          <AttendanceWidget />
          <TimelineWidget />
          <ParentNotesWidget />
          <QuickActionsWidget />
          <HealthAlertsWidget />
          <NoticeboardWidget />
        </S.DashboardGrid1Col>
      </Responsive>
    </>
  );
};

