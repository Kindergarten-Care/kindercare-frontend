'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import * as S from './styles';

import ChildHeroWidget from './components/ChildHeroWidget';
import QuickActionsStrip from './components/QuickActionsStrip';
import LiveScheduleWidget from './components/LiveScheduleWidget';
import MiniGrowthWidget from './components/MiniGrowthWidget';
import DailyMenuWidget from './components/DailyMenuWidget';
import MiniCalendarWidget from './components/MiniCalendarWidget';
import UrgentNoticeBanner from './components/UrgentNoticeBanner';
import { useParentDashboard } from './hooks/useParentDashboard';
import { useRouter } from '@/i18n/routing';

const LeaveRequestPopup      = dynamic(() => import('./components/LeaveRequestPopup'),      { ssr: false });
const MedicationRequestPopup = dynamic(() => import('./components/MedicationRequestPopup'), { ssr: false });
const ProxyRequestPopup      = dynamic(() => import('./components/ProxyRequestPopup'),      { ssr: false });
const AttendanceQrPopup      = dynamic(() => import('./components/AttendanceQrPopup'),      { ssr: false });

export function ParentDashboard(): React.ReactElement {
  const router = useRouter();
  const t = useTranslations('Dashboard');
  const {
    loading,
    activeStudent,
    schedule,
    calendarDays,
    attendanceStats,
    latestAssessment,
    urgentNotices,
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
    unpaidCount,
    dailyMenu,
  } = useParentDashboard();

  if (loading || !activeStudent || !childHero) {
    return (
      <S.DashboardContainer>
        <div style={{ padding: 40, color: 'var(--muted)' }}>{t('loading')}</div>
      </S.DashboardContainer>
    );
  }

  const handleMonthChange = (direction: 'prev' | 'next'): void => {
    if (direction === 'prev') prevMonth();
    else nextMonth();
  };

  return (
    <S.DashboardContainer>
      {urgentNotices.length > 0 && <UrgentNoticeBanner notices={urgentNotices} />}

      <ChildHeroWidget
        data={childHero}
        avatarGradient={avatarGradient}
        avatarInitial={avatarInitial}
        avatarUrl={activeStudent.avatarUrl}
        onAbsence={openLeavePopup}
        onMessage={() => alert(t('alerts.messageTeacher'))}
        onCheckinQr={openQrPopup}
      />

      <S.MainGrid>
        <S.LeftColumn>
          <QuickActionsStrip
            onAbsence={openLeavePopup}
            onMedication={openMedicPopup}
            onFee={() => router.push('/billing')}
            onDiary={() => router.push('/diary')}
            onPickup={openProxyPopup}
            unpaidCount={unpaidCount}
          />

          <S.BottomGrid>
            <LiveScheduleWidget
              schedule={schedule}
              className={activeStudent.className}
              todayAttendanceStatus={todayCalendarStatus}
            />
            <DailyMenuWidget menu={dailyMenu} />
          </S.BottomGrid>

          <MiniGrowthWidget assessment={latestAssessment} />
        </S.LeftColumn>

        <S.RightColumn>
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
