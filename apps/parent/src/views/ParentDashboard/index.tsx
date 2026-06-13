'use client';

import React, { useEffect, useState } from 'react';
import { parentDashboardService } from '@/services/ParentDashboardService';
import { ParentDashboardModel } from '@/config/types/dashboard';
import * as S from './styles';

import UrgentNoticeBanner from './components/UrgentNoticeBanner';
import AlbumStripWidget from './components/AlbumStripWidget';
import ChildHeroWidget from './components/ChildHeroWidget';
import QuickActionsStrip from './components/QuickActionsStrip';
import LiveScheduleWidget from './components/LiveScheduleWidget';
import CameraWidget from './components/CameraWidget';
import DailyLessonWidget from './components/DailyLessonWidget';
import FeeAlertWidget from './components/FeeAlertWidget';
import MiniCalendarWidget from './components/MiniCalendarWidget';
import ChatFab from './components/ChatFab';

export function ParentDashboard(): React.ReactElement {
  const [data, setData] = useState<ParentDashboardModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [chatOpen, setChatOpen] = useState<boolean>(false);

  useEffect(() => {
    parentDashboardService
      .getDashboardData()
      .then(setData)
      .catch(err => console.error('Dashboard fetch failed:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <S.DashboardContainer>
        <div style={{ padding: 40, color: 'var(--muted)' }}>Đang tải dữ liệu...</div>
      </S.DashboardContainer>
    );
  }

  const activeChild = data.children[data.activeChildIndex];

  return (
    <S.DashboardContainer>
      {/* Urgent notices — top of everything */}
      <UrgentNoticeBanner notices={data.urgentNotices} />

      {/* Child profile card */}
      <ChildHeroWidget
        data={data.childHero}
        avatarGradient={activeChild.avatarColor}
        avatarInitial={activeChild.avatarInitial}
        onAbsence={() => alert('Báo nghỉ học')}
        onMessage={() => alert('Nhắn tin với giáo viên')}
      />

      {/* Today's album — full width, compact strip */}
      <AlbumStripWidget photos={data.albumPhotos} />

      {/* Fee alert banner */}
      <FeeAlertWidget fee={data.fee} />

      {/* Quick actions — 4 compact buttons */}
      <QuickActionsStrip
        onAbsence={() => alert('Báo nghỉ học')}
        onMedication={() => alert('Dặn dò thuốc')}
        onFee={() => alert('Đóng học phí')}
        onDiary={() => alert('Nhật ký')}
      />

      {/* Two-column grid */}
      <S.MainGrid>
        <S.LeftColumn>
          {/* Live schedule — realtime current activity */}
          <LiveScheduleWidget schedule={data.schedule} />
        </S.LeftColumn>

        <S.RightColumn>
          {/* Camera */}
          <CameraWidget
            className={activeChild.className}
            teacher={activeChild.teacher}
          />

          {/* Daily lesson */}
          <DailyLessonWidget lessons={data.dailyLessons} />

          {/* Attendance calendar */}
          <MiniCalendarWidget days={data.calendarDays} stats={data.attendanceStats} />
        </S.RightColumn>
      </S.MainGrid>

      {/* Floating chat FAB */}
      <ChatFab
        teacher={activeChild.teacher}
        initialMessages={data.messages}
        unreadCount={data.messages.filter(m => m.unread && !m.isMe).length}
      />
    </S.DashboardContainer>
  );
}
