'use client';

import React from 'react';
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
import GrowthWidget from './components/GrowthWidget';
import ChatFab from './components/ChatFab';
import LeaveRequestPopup from './components/LeaveRequestPopup';
import MedicationRequestPopup from './components/MedicationRequestPopup';
import AttendanceQrPopup from './components/AttendanceQrPopup';
import { useParentDashboard, getTeacherDisplayName } from './hooks/useParentDashboard';

export function ParentDashboard(): React.ReactElement {
  const {
    data,
    loading,
    activeStudent,
    isLeavePopupOpen,
    setIsLeavePopupOpen,
    isMedicationPopupOpen,
    setIsMedicationPopupOpen,
    isQrPopupOpen,
    setIsQrPopupOpen,
    childHero,
    avatarGradient,
    avatarInitial,
    leadTeacher,
  } = useParentDashboard();

  if (loading || !data || !activeStudent || !childHero) {
    return (
      <S.DashboardContainer>
        <div style={{ padding: 40, color: 'var(--muted)' }}>Đang tải dữ liệu...</div>
      </S.DashboardContainer>
    );
  }

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
        onAbsence={() => setIsLeavePopupOpen(true)}
        onMessage={() => alert('Nhắn tin với giáo viên')}
        onCheckinQr={() => setIsQrPopupOpen(true)}
      />

      {/* Fee alert banner */}
      <FeeAlertWidget fee={data.fee} />

      {/* Two-column grid */}
      <S.MainGrid>
        <S.LeftColumn>
          <S.LeftTopGrid>
            <S.ColumnStack>
              {/* Quick actions — moved here to align width and height */}
              <QuickActionsStrip
                onAbsence={() => setIsLeavePopupOpen(true)}
                onMedication={() => setIsMedicationPopupOpen(true)}
                onFee={() => alert('Đóng học phí')}
                onDiary={() => alert('Nhật ký')}
                onPickup={() => alert('Đăng ký người đón hộ')}
              />

              {/* Today's album — moved here side-by-side with Camera */}
              <AlbumStripWidget photos={data.albumPhotos} />
            </S.ColumnStack>

            {/* Growth metrics */}
            <GrowthWidget />
          </S.LeftTopGrid>

          {/* Live schedule — realtime current activity */}
          <LiveScheduleWidget schedule={data.schedule} />
        </S.LeftColumn>

        <S.RightColumn>
          {/* Camera — moved here side-by-side with Album */}
          <CameraWidget
            className={activeStudent.className}
            teacher={activeStudent.academicYearName}
          />

          {/* Attendance calendar */}
          <MiniCalendarWidget days={data.calendarDays} stats={data.attendanceStats} />

          {/* Daily lesson */}
          <DailyLessonWidget lessons={data.dailyLessons} />
        </S.RightColumn>
      </S.MainGrid>

      {/* Floating chat FAB */}
      <ChatFab
        teacherName={leadTeacher ? getTeacherDisplayName(leadTeacher) : 'Giáo viên'}
        initialMessages={data.messages}
        unreadCount={data.messages.filter(m => m.unread && !m.isMe).length}
        classroom={activeStudent.className}
      />

      <LeaveRequestPopup
        isOpen={isLeavePopupOpen}
        onClose={() => setIsLeavePopupOpen(false)}
        studentName={activeStudent.fullName}
        className={activeStudent.className}
      />

      <MedicationRequestPopup
        isOpen={isMedicationPopupOpen}
        onClose={() => setIsMedicationPopupOpen(false)}
        studentName={activeStudent.fullName}
        className={activeStudent.className}
      />

      <AttendanceQrPopup
        isOpen={isQrPopupOpen}
        onClose={() => setIsQrPopupOpen(false)}
        student={{
          studentId: activeStudent.studentId,
          fullName: activeStudent.fullName,
          className: activeStudent.className,
          academicYearName: activeStudent.academicYearName,
          campusName: activeStudent.campusName,
        }}
      />
    </S.DashboardContainer>
  );
}
