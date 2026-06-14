'use client';

import React, { useEffect, useState } from 'react';
import { parentDashboardService } from '@/services/ParentDashboardService';
import { ParentDashboardModel } from '@/config/types/dashboard';
import { useStudent } from '@/contexts/StudentContext';
import { getInitials, getAvatarGradient } from '@/utils/Student/Avatar';
import { formatDateFromBigInt } from '@/utils/Student/Date';
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
  const { activeStudent } = useStudent();

  useEffect(() => {
    parentDashboardService
      .getDashboardData()
      .then(setData)
      .catch(err => console.error('Dashboard fetch failed:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data || !activeStudent) {
    return (
      <S.DashboardContainer>
        <div style={{ padding: 40, color: 'var(--muted)' }}>Đang tải dữ liệu...</div>
      </S.DashboardContainer>
    );
  }

  const avatarGradient = getAvatarGradient(activeStudent.studentId);
  const avatarInitial = getInitials(activeStudent.fullName);

  const childHero = {
    name: activeStudent.fullName,
    className: activeStudent.className,
    teacher: activeStudent.academicYearName,
    branch: activeStudent.campusName,
    statusTags: [
      { label: `🎂 NS: ${formatDateFromBigInt(activeStudent.dateOfBirth)}`, type: 'neutral' as const },
      { label: `📅 Nhập học: ${formatDateFromBigInt(activeStudent.admissionDate)}`, type: 'neutral' as const },
      { label: activeStudent.allergies ? `⚠️ ${activeStudent.allergies}` : 'Không dị ứng', type: activeStudent.allergies ? 'yellow' as const : 'green' as const },
    ],
    checkinTime: 'Đang học',
    checkinSub: 'Đúng giờ · Cổng A',
  };

  return (
    <S.DashboardContainer>
      {/* Urgent notices — top of everything */}
      <UrgentNoticeBanner notices={data.urgentNotices} />

      {/* Child profile card */}
      <ChildHeroWidget
        data={childHero}
        avatarGradient={avatarGradient}
        avatarInitial={avatarInitial}
        avatarUrl={activeStudent.avatarUrl}
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
            className={activeStudent.className}
            teacher={activeStudent.academicYearName}
          />

          {/* Daily lesson */}
          <DailyLessonWidget lessons={data.dailyLessons} />

          {/* Attendance calendar */}
          <MiniCalendarWidget days={data.calendarDays} stats={data.attendanceStats} />
        </S.RightColumn>
      </S.MainGrid>

      {/* Floating chat FAB */}
      <ChatFab
        teacher={activeStudent.academicYearName}
        initialMessages={data.messages}
        unreadCount={data.messages.filter(m => m.unread && !m.isMe).length}
        classroom={activeStudent.className}
      />
    </S.DashboardContainer>
  );
}
