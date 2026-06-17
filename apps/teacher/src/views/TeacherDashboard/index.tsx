import React from 'react';
import * as S from './styles';
import { AttendanceWidget } from './components/AttendanceWidget';
import { ParentNotesWidget } from './components/ParentNotesWidget';
import { TimelineWidget } from './components/TimelineWidget';
import { QuickActionsWidget } from './components/QuickActionsWidget';
import { HealthAlertsWidget } from './components/HealthAlertsWidget';
import { NoticeboardWidget } from './components/NoticeboardWidget';

export const TeacherDashboardView: React.FC = () => {
  return (
    <S.DashboardGrid>
      <S.Column1>
        <AttendanceWidget />
        <ParentNotesWidget />
      </S.Column1>
      <S.Column2>
        <TimelineWidget />
        <QuickActionsWidget />
      </S.Column2>
      <S.Column3>
        <HealthAlertsWidget />
        <NoticeboardWidget />
      </S.Column3>
    </S.DashboardGrid>
  );
};
