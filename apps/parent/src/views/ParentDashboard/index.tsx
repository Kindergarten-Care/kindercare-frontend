'use client';

import React from 'react';
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
import LeaveRequestPopup from './components/LeaveRequestPopup';
import MedicationRequestPopup from './components/MedicationRequestPopup';
import AttendanceQrPopup from './components/AttendanceQrPopup';
import { useParentDashboard } from './hooks/useParentDashboard';

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
    avatarGradient,
    avatarInitial,
    viewYear,
    viewMonth,
    prevMonth,
    nextMonth,
    isLeavePopupOpen, setIsLeavePopupOpen,
    isMedicationPopupOpen, setIsMedicationPopupOpen,
    isQrPopupOpen, setIsQrPopupOpen,
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
        onAbsence={() => setIsLeavePopupOpen(true)}
        onMessage={() => alert('Nhắn tin với giáo viên')}
        onCheckinQr={() => setIsQrPopupOpen(true)}
      />

      <S.MainGrid>
        <S.LeftColumn>
          <S.LeftTopGrid>
            <S.ColumnStack>
              <QuickActionsStrip
                onAbsence={() => setIsLeavePopupOpen(true)}
                onMedication={() => setIsMedicationPopupOpen(true)}
                onFee={() => alert('Đóng học phí')}
                onDiary={() => alert('Nhật ký')}
                onPickup={() => alert('Đăng ký người đón hộ')}
              />
              <DevelopmentalDomainsWidget assessment={latestAssessment} />
            </S.ColumnStack>

            <GrowthWidget />
          </S.LeftTopGrid>

          <S.BottomGrid>
            <LiveScheduleWidget
              schedule={schedule}
              className={activeStudent.className}
              todayAttendanceStatus={calendarDays.find(d => d.day === new Date().getDate())?.status}
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
