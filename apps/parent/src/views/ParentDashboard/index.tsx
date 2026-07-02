'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import * as S from './styles';

import AlbumStripWidget from './components/AlbumStripWidget';
import ChildHeroWidget from './components/ChildHeroWidget';
import QuickActionsStrip from './components/QuickActionsStrip';
import LiveScheduleWidget from './components/LiveScheduleWidget';
import DevelopmentalDomainsWidget from './components/DevelopmentalDomainsWidget';
import CameraWidget from './components/CameraWidget';
import DailyLessonWidget from './components/DailyLessonWidget';
import MiniCalendarWidget from './components/MiniCalendarWidget';
import GrowthWidget from './components/GrowthWidget';
import { useParentDashboard } from './hooks/useParentDashboard';

const LeaveRequestPopup      = dynamic(() => import('./components/LeaveRequestPopup'),      { ssr: false });
const MedicationRequestPopup = dynamic(() => import('./components/MedicationRequestPopup'), { ssr: false });
const ProxyRequestPopup      = dynamic(() => import('./components/ProxyRequestPopup'),      { ssr: false });
const AttendanceQrPopup      = dynamic(() => import('./components/AttendanceQrPopup'),      { ssr: false });

export function ParentDashboard(): React.ReactElement {
  const {
    loading,
    activeStudent,
    schedule,
    lessons,
    photos,
    calendarDays,
    attendanceStats,
    latestAssessment,
    childHero,
    todayCalendarStatus,
    avatarGradient,
    avatarInitial,
    viewYear,
    viewMonth,
    prevMonth,
    nextMonth,
    isLeavePopupOpen,     openLeavePopup,  closeLeavePopup,
    isMedicationPopupOpen, openMedicPopup, closeMedicPopup,
    isProxyPopupOpen,      openProxyPopup,  closeProxyPopup,
    isQrPopupOpen,        openQrPopup,     closeQrPopup,
  } = useParentDashboard();

  if (loading || !activeStudent || !childHero) {
    return (
      <S.DashboardContainer>
        <div style={{ padding: 40, color: 'var(--muted)' }}>Đang tải dữ liệu...</div>
      </S.DashboardContainer>
    );
  }

  return (
    <S.DashboardContainer>
      <ChildHeroWidget
        data={childHero}
        avatarGradient={avatarGradient}
        avatarInitial={avatarInitial}
        avatarUrl={activeStudent.avatarUrl}
        onAbsence={openLeavePopup}
        onMessage={() => alert('Nhắn tin với giáo viên')}
        onCheckinQr={openQrPopup}
      />

      <S.MainGrid>
        <S.LeftColumn>
          <S.LeftTopGrid>
            <S.ColumnStack>
              <QuickActionsStrip
                onAbsence={openLeavePopup}
                onMedication={openMedicPopup}
                onFee={() => alert('Đóng học phí')}
                onDiary={() => alert('Nhật ký')}
                onPickup={openProxyPopup}
              />
              <DevelopmentalDomainsWidget assessment={latestAssessment} />
            </S.ColumnStack>

            <GrowthWidget />
          </S.LeftTopGrid>

          <S.BottomGrid>
            <LiveScheduleWidget
              schedule={schedule}
              className={activeStudent.className}
              todayAttendanceStatus={todayCalendarStatus}
            />
            <S.ColumnStack>
              <AlbumStripWidget photos={photos} />
              <DailyLessonWidget lessons={lessons} />
            </S.ColumnStack>
          </S.BottomGrid>
        </S.LeftColumn>

        <S.RightColumn>
          <CameraWidget
            className={activeStudent.className}
            teacher={activeStudent.academicYearName}
          />
          <MiniCalendarWidget
            days={calendarDays}
            stats={attendanceStats}
            viewYear={viewYear}
            viewMonth={viewMonth}
            onPrevMonth={prevMonth}
            onNextMonth={nextMonth}
          />
        </S.RightColumn>
      </S.MainGrid>

      <LeaveRequestPopup
        isOpen={isLeavePopupOpen}
        onClose={closeLeavePopup}
        studentName={activeStudent.fullName}
        className={activeStudent.className}
      />

      <MedicationRequestPopup
        isOpen={isMedicationPopupOpen}
        onClose={closeMedicPopup}
        studentName={activeStudent.fullName}
        className={activeStudent.className}
      />

      <ProxyRequestPopup
        isOpen={isProxyPopupOpen}
        onClose={closeProxyPopup}
        studentName={activeStudent.fullName}
        className={activeStudent.className}
      />

      <AttendanceQrPopup
        isOpen={isQrPopupOpen}
        onClose={closeQrPopup}
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
