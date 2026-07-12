'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { CalendarDay, AttendanceStats, ScheduleItem, AlbumPhoto, ChildHeroInfo, UrgentNotice } from '@/config/types/dashboard';
import { useStudent } from '@/contexts/StudentContext';
import { getInitials, getAvatarGradient } from '@/utils/Student/Avatar';
import { formatDateFromBigInt, tsToHHMM, currentMonthParam } from '@/utils/Student/Date';
import { formatPersonName } from '@/utils/formatName';
import { attendanceService } from '@/services/Attendance/AttendanceService';
import { AttendanceDomainModel } from '@/config/types/attendance';
import { dailyAlbumService } from '@/services/DailyAlbum/DailyAlbumService';
import { assessmentService } from '@/services/Assessment/AssessmentService';
import { weeklyScheduleService } from '@/services/WeeklySchedule/WeeklyScheduleService';
import { menuService } from '@/services/Menu/MenuService';
import { MenuDomainModel } from '@/config/types/menu';
import { invoiceService } from '@/services/Invoice/InvoiceService';
import { ActivityType } from '@/config/types/dailySchedule';
import { WeeklyScheduleDomainModel } from '@/config/types/weeklySchedule';
import { DailyAlbumDomainModel } from '@/config/types/dailyAlbum';
import { AssessmentDomainModel } from '@/config/types/assessment';
import { InvoiceDomainModel } from '@/config/types/invoice';
import { getTeacherDisplayName } from '@/utils/Teacher/TeacherDisplay';
import { formatVND, formatBillingMonth, getDueStatus } from '@/utils/Billing/format';

// ─── Domain → Widget mappers ──────────────────────────────────────────────────

const ACTIVITY_META: Record<ActivityType, { icon: string; color: string }> = {
  pickup:  { icon: '🚌', color: '#16a34a' },
  meal:    { icon: '🍽️', color: '#d97706' },
  study:   { icon: '📚', color: '#8b5cf6' },
  nap:     { icon: '😴', color: '#6b7280' },
  play:    { icon: '🌳', color: '#059669' },
  dropoff: { icon: '🏠', color: '#005A36' },
  other:   { icon: '📌', color: '#6b7280' },
};

const DOW_KEYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

/** Today's activities from the weekly routine timetable, sorted by start time. */
const weeklyTimetableToTodayItems = (timetable: WeeklyScheduleDomainModel | null): ScheduleItem[] => {
  if (!timetable?.details?.length) return [];
  const todayKey = DOW_KEYS[new Date().getDay()];

  return timetable.details
    .filter(d => d.dayOfWeek === todayKey)
    .sort((a, b) => a.startTime.localeCompare(b.startTime))
    .map(d => {
      const meta = ACTIVITY_META[d.activityType] ?? ACTIVITY_META.other;
      return {
        id: String(d.scheduleDetailId),
        time: d.startTime.slice(0, 5),   // "HH:mm[:ss]" → "HH:mm"
        endTime: d.endTime.slice(0, 5),
        title: d.activityName,
        note: d.details ?? d.location ?? '',
        icon: meta.icon,
        color: meta.color,
        activityType: d.activityType ?? 'other',
      };
    });
};

/** Invoices with an upcoming or overdue due date, turned into dashboard urgent notices. */
const invoicesToUrgentNotices = (
  invoices: InvoiceDomainModel[],
  t: ReturnType<typeof useTranslations>
): UrgentNotice[] =>
  invoices
    .map(inv => ({ inv, due: getDueStatus(inv.dueDate, inv.paymentStatus) }))
    .filter(({ due }) => due.variant === 'soon' || due.variant === 'overdue')
    .sort((a, b) => (a.inv.dueDate ?? 0) - (b.inv.dueDate ?? 0))
    .map(({ inv, due }) => ({
      id: `invoice-${inv.invoiceId}`,
      severity: due.variant === 'overdue' ? 'urgent' : 'important',
      title: t('notices.invoiceTitle', { month: formatBillingMonth(inv.billingMonth), amount: formatVND(inv.totalAmount) }),
      detail: due.variant === 'overdue'
        ? t('notices.overdueDetail', { label: due.label })
        : t('notices.dueSoonDetail', { label: due.label }),
      date: due.label,
      icon: '💰',
    }));

const albumsToPhotos = (albums: DailyAlbumDomainModel[]): AlbumPhoto[] =>
  albums.flatMap(album =>
    album.photos.map(photo => ({
      id: String(photo.photoId),
      caption: photo.description ?? album.caption ?? '',
      time: tsToHHMM(photo.createdAt),
      color: '#f3f4f6',
      icon: '📷',
      photoUrl: photo.photoUrl,
    }))
  );

// ─── Attendance calendar helpers ──────────────────────────────────────────────

const DEFAULT_STATS: AttendanceStats = {
  percentage: 0, present: 0, absent: 0, excused: 0, totalDays: 0,
};

const calculateAttendanceData = (
  records: AttendanceDomainModel[],
  viewYear: number,
  viewMonth: number,
): { calendarDays: CalendarDay[]; attendanceStats: AttendanceStats } => {
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const recordsMap = new Map<number, AttendanceDomainModel>();
  records.forEach(r => {
    const d = new Date(Number(r.attendanceDate) * 1000);
    if (d.getFullYear() === viewYear && d.getMonth() === viewMonth) {
      recordsMap.set(d.getDate(), r);
    }
  });

  const calendarDays: CalendarDay[] = [];
  let present = 0, absent = 0, excused = 0, totalDays = 0;

  for (let day = 1; day <= daysInMonth; day++) {
    const dayOfWeek = new Date(viewYear, viewMonth, day).getDay();
    const record = recordsMap.get(day);
    let status: CalendarDay['status'] = 'none';
    let checkinTime: string | undefined;
    let checkoutTime: string | undefined;

    if (record) {
      const dbStatus = record.status.toLowerCase();
      if (dbStatus === 'present') {
        status = 'present'; present++; totalDays++;
        if (record.checkInTime) {
          checkinTime = tsToHHMM(record.checkInTime);
        }
        if (record.checkOutTime) {
          checkoutTime = tsToHHMM(record.checkOutTime);
        }
      } else if (dbStatus === 'absent') {
        status = 'absent'; absent++; totalDays++;
      } else if (dbStatus === 'excused') {
        status = 'excused'; excused++; totalDays++;
      } else if (dbStatus === 'holiday') {
        status = 'holiday';
      }
    } else if (dayOfWeek === 0 || dayOfWeek === 6) {
      status = 'weekend';
    }

    calendarDays.push({ day, status, checkinTime, checkoutTime });
  }

  const percentage = totalDays > 0 ? Math.round((present / totalDays) * 100) : 100;
  return { calendarDays, attendanceStats: { percentage, present, absent, excused, totalDays } };
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useParentDashboard() {
  const { activeStudent, loading: studentLoading } = useStudent();
  const t = useTranslations('Dashboard');

  const [apiLoading, setApiLoading] = useState(false);
  const [isLeavePopupOpen, setIsLeavePopupOpen] = useState(false);
  const [isMedicationPopupOpen, setIsMedicationPopupOpen] = useState(false);
  const [isProxyPopupOpen, setIsProxyPopupOpen] = useState(false);
  const [isQrPopupOpen, setIsQrPopupOpen] = useState(false);

  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());

  const [allRecords, setAllRecords] = useState<AttendanceDomainModel[]>([]);
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [attendanceStats, setAttendanceStats] = useState<AttendanceStats>(DEFAULT_STATS);

  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [photos, setPhotos] = useState<AlbumPhoto[]>([]);
  const [latestAssessment, setLatestAssessment] = useState<AssessmentDomainModel | null>(null);
  const [urgentNotices, setUrgentNotices] = useState<UrgentNotice[]>([]);
  const [unpaidCount, setUnpaidCount] = useState(0);
  const [dailyMenu, setDailyMenu] = useState<MenuDomainModel | null>(null);

  const prevMonth = useCallback((): void => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }, [viewMonth]);

  const nextMonth = useCallback((): void => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }, [viewMonth]);

  const openLeavePopup      = useCallback(() => setIsLeavePopupOpen(true),       []);
  const closeLeavePopup     = useCallback(() => setIsLeavePopupOpen(false),      []);
  const openMedicPopup      = useCallback(() => setIsMedicationPopupOpen(true),  []);
  const closeMedicPopup     = useCallback(() => setIsMedicationPopupOpen(false), []);
  const openProxyPopup      = useCallback(() => setIsProxyPopupOpen(true),       []);
  const closeProxyPopup     = useCallback(() => setIsProxyPopupOpen(false),      []);
  const openQrPopup         = useCallback(() => setIsQrPopupOpen(true),          []);
  const closeQrPopup        = useCallback(() => setIsQrPopupOpen(false),         []);

  const fetchDashboardData = useCallback(() => {
    if (!activeStudent?.studentId) return;
    const id = activeStudent.studentId;
    setApiLoading(true);

    Promise.allSettled([
      attendanceService.getAttendance(id),
      weeklyScheduleService.getWeeklyTimetable(id),
      dailyAlbumService.getDailyAlbums(id),
      assessmentService.getAssessments(id, currentMonthParam()),
      invoiceService.getInvoices(id),
      menuService.getMenu(id),
    ])
      .then(([attendance, timetable, albums, assessments, invoices, menu]) => {
        if (attendance.status === 'fulfilled') setAllRecords(attendance.value);
        else console.error('Attendance API failed:', attendance.reason);

        if (timetable.status === 'fulfilled') setSchedule(weeklyTimetableToTodayItems(timetable.value));
        else console.error('Weekly timetable API failed:', timetable.reason);



        if (albums.status === 'fulfilled') setPhotos(albumsToPhotos(albums.value));
        else console.error('Daily albums API failed:', albums.reason);

        if (assessments.status === 'fulfilled') setLatestAssessment(assessments.value[0] ?? null);
        else console.error('Assessments API failed:', assessments.reason);

        if (menu.status === 'fulfilled') setDailyMenu(menu.value);
        else console.error('Daily menu API failed:', menu.reason);

        if (invoices.status === 'fulfilled') {
          const invoiceNotices = invoicesToUrgentNotices(invoices.value, t);

          const sortedUnpaid = invoices.value
            .filter(inv => inv.paymentStatus !== 'Paid')
            .sort((a, b) => (a.dueDate ?? Infinity) - (b.dueDate ?? Infinity));

          const topUnpaid = sortedUnpaid[0] ?? null;
          const topDue = topUnpaid ? getDueStatus(topUnpaid.dueDate, topUnpaid.paymentStatus) : null;
          const feeNotice = topUnpaid && topDue
            ? {
                id: 'fee-alert',
                severity: topDue.variant === 'overdue' ? 'urgent' as const : 'important' as const,
                title: `Thanh toán ${formatBillingMonth(topUnpaid.billingMonth)} · ${formatVND(topUnpaid.totalAmount)}`,
                detail: topDue.variant === 'overdue'
                  ? `Đã quá hạn: ${topDue.label}`
                  : `Đến hạn: ${topDue.label}`,
                date: topDue.label,
                icon: '💰',
              }
            : null;

          setUrgentNotices([...(feeNotice ? [feeNotice] : []), ...invoiceNotices]);

          Promise.all(
            invoices.value.map(async (inv) => {
              if (inv.invoiceType === 'EXTRACURRICULAR' && inv.paymentStatus === 'Partial') {
                try {
                  const detail = await invoiceService.getInvoiceDetail(inv.invoiceId);
                  if (detail.extracurricularItems) {
                    const activeItems = detail.extracurricularItems.filter(
                      item => item.status === 'Active' || item.status === 'Pending'
                    );
                    if (activeItems.length > 0) {
                      const allPending = activeItems.every(item => item.status === 'Pending');
                      if (allPending) {
                        return { ...inv, paymentStatus: 'Unpaid' as const };
                      }
                      const allActive = activeItems.every(item => item.status === 'Active');
                      if (allActive) {
                        return { ...inv, paymentStatus: 'Paid' as const };
                      }
                    }
                  }
                } catch (err) {
                  console.error(err);
                }
              }
              return inv;
            })
          ).then(enrichedList => {
            const count = enrichedList.filter(inv => inv.paymentStatus !== 'Paid').length;
            setUnpaidCount(count);
          });
        } else {
          console.error('Invoices API failed:', invoices.reason);
        }
      })
      .finally(() => setApiLoading(false));
  }, [activeStudent?.studentId, t]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  useEffect(() => {
    const handlePushMessage = (e: Event) => {
      const payload = (e as CustomEvent).detail;
      const type = payload.data?.type;
      const title = payload.notification?.title || '';
      const body = payload.notification?.body || '';
      if (
        type === 'ATTENDANCE' ||
        title.toLowerCase().includes('điểm danh') ||
        title.toLowerCase().includes('attendance') ||
        body.toLowerCase().includes('điểm danh') ||
        body.toLowerCase().includes('attendance')
      ) {
        setIsQrPopupOpen(false);
        fetchDashboardData();
      }
    };

    window.addEventListener('kc:push:message', handlePushMessage);
    return () => {
      window.removeEventListener('kc:push:message', handlePushMessage);
    };
  }, [fetchDashboardData]);

  useEffect(() => {
    const { calendarDays: days, attendanceStats: stats } = calculateAttendanceData(allRecords, viewYear, viewMonth);
    setCalendarDays(days);
    setAttendanceStats(stats);
  }, [allRecords, viewYear, viewMonth]);

  const leadTeacher = activeStudent?.teachers?.[0] ?? null;

  const getTodayAttendanceStatus = (): {
    attendanceStatus: ChildHeroInfo['attendanceStatus'];
    checkinTime: string;
    checkinSub: string;
  } => {
    const today = new Date();
    const todayRecord = allRecords.find(r => {
      const d = new Date(Number(r.attendanceDate) * 1000);
      return (
        d.getDate() === today.getDate() &&
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear()
      );
    });

    const isWeekend = today.getDay() === 0 || today.getDay() === 6;

    let attendanceStatus: ChildHeroInfo['attendanceStatus'] = 'not_started';
    let checkinTime = t('hero.notCheckedIn');
    let checkinSub = t('hero.waitingMorningCheckin');

    if (isWeekend) {
      attendanceStatus = 'holiday';
      checkinTime = t('hero.holiday');
      checkinSub = t('hero.weekend');
    } else if (todayRecord) {
      const statusLower = todayRecord.status?.toLowerCase();
      if (statusLower === 'excused') {
        attendanceStatus = 'excused';
        checkinTime = t('hero.excusedTitle');
        checkinSub = t('hero.excusedSub');
      } else if (statusLower === 'absent') {
        attendanceStatus = 'absent';
        checkinTime = t('hero.absentTitle');
        checkinSub = t('hero.absentSub');
      } else if (statusLower === 'holiday') {
        attendanceStatus = 'holiday';
        checkinTime = t('hero.holiday');
        checkinSub = t('hero.holidaySub');
      } else if (statusLower === 'present') {
        if (todayRecord.checkInTime) {
          const inTime = tsToHHMM(todayRecord.checkInTime);
          if (todayRecord.checkOutTime) {
            const outTime = tsToHHMM(todayRecord.checkOutTime);
            attendanceStatus = 'checked_out';
            checkinTime = t('hero.checkedOut', { time: outTime });
            const pickupDisplay = formatPersonName(todayRecord.pickedUpBy, todayRecord.pickedUpRelationship, '');
            checkinSub = pickupDisplay ? t('hero.pickedUpBy', { name: pickupDisplay }) : t('hero.pickedUpGeneric');
          } else {
            attendanceStatus = 'studying';
            checkinTime = t('hero.checkedIn', { time: inTime });
            const dropoffDisplay = formatPersonName(todayRecord.droppedOffBy, todayRecord.droppedOffRelationship, '');
            checkinSub = dropoffDisplay ? t('hero.droppedOffBy', { name: dropoffDisplay }) : t('hero.studyingGeneric');
          }
        }
      }
    }

    return { attendanceStatus, checkinTime, checkinSub };
  };

  const todayStatus = getTodayAttendanceStatus();

  const todayCalendarStatus = useMemo(() => {
    const today = new Date().getDate();
    return calendarDays.find(d => d.day === today)?.status;
  }, [calendarDays]);

  const childHero = activeStudent
    ? {
        name: activeStudent.fullName,
        className: activeStudent.className,
        teacher: leadTeacher ? getTeacherDisplayName(leadTeacher) : t('hero.teacherUnassigned'),
        academicYear: activeStudent.academicYearName,
        branch: activeStudent.campusName,
        statusTags: [
          { label: t('hero.dobTag', { date: formatDateFromBigInt(activeStudent.dateOfBirth) }), type: 'neutral' as const },
          { label: t('hero.admissionTag', { date: formatDateFromBigInt(activeStudent.admissionDate) }), type: 'neutral' as const },
          { label: activeStudent.allergies ? t('hero.allergyTag', { allergies: activeStudent.allergies }) : t('hero.noAllergies'), type: activeStudent.allergies ? 'yellow' as const : 'green' as const },
        ],
        checkinTime: todayStatus.checkinTime,
        checkinSub: todayStatus.checkinSub,
        attendanceStatus: todayStatus.attendanceStatus,
      }
    : null;

  return {
    loading: studentLoading || apiLoading,
    activeStudent,
    schedule,
    photos,
    calendarDays,
    attendanceStats,
    latestAssessment,
    urgentNotices,
    childHero,
    todayCalendarStatus,
    avatarGradient: activeStudent ? getAvatarGradient(activeStudent.studentId) : '',
    avatarInitial: activeStudent ? getInitials(activeStudent.fullName) : '',
    viewYear,
    viewMonth,
    prevMonth,
    nextMonth,
    isLeavePopupOpen,  openLeavePopup,  closeLeavePopup,
    isMedicationPopupOpen, openMedicPopup, closeMedicPopup,
    isProxyPopupOpen, openProxyPopup, closeProxyPopup,
    isQrPopupOpen,     openQrPopup,     closeQrPopup,
    unpaidCount,
    dailyMenu,
  };
}
