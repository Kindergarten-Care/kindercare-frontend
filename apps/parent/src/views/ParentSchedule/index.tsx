'use client';

import React from 'react';
import * as S from './styles';
import { useParentSchedule } from './hooks/useParentSchedule';
import { useWeekSelector } from './hooks/useWeekSelector';
import { MenuDetailDomainModel } from '@/config/types/menu';
import { MOCK_WEEK_MENU, MOCK_WEEK_LESSONS, MOCK_MONTH_THEME, MOCK_WEEK_THEME, MOCK_TIMETABLE } from './mockData';
import {
  IconMealBreakfast, IconMealLunch, IconMealSnack,
  IconBook, IconAbc, IconNum, IconMusic, IconArt, IconRun, IconWorld,
  IconClock, IconBus, IconSleep, IconPlay, IconHome, IconWash, IconSun, IconMoon, IconPin,
} from './icons';

const DOW_LABELS = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6'];
const DAYS_OF_WEEK_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const pad = (n: number): string => String(n).padStart(2, '0');

function getMealConfig(mealType: string) {
  const t = mealType.trim().toLowerCase();
  if (t.includes('breakfast') || t.includes('sáng')) {
    return { label: 'Bữa sáng', c: '#F97316', tint: '#FFEEDF', Icon: IconMealBreakfast };
  }
  if (t.includes('morningsnack') || t.includes('phụ sáng')) {
    return { label: 'Phụ sáng', c: '#0E8A7D', tint: '#D7F0EC', Icon: IconMealSnack };
  }
  if (t.includes('lunch') || t.includes('trưa')) {
    return { label: 'Bữa trưa', c: '#005A36', tint: '#E6F3ED', Icon: IconMealLunch };
  }
  if (t.includes('snack') || t.includes('xế') || t.includes('afternoonsnack')) {
    return { label: 'Bữa xế', c: '#DB2777', tint: '#FCE7F2', Icon: IconMealSnack };
  }
  return { label: mealType, c: '#6B7280', tint: '#F4F8F5', Icon: IconMealSnack };
}

// Mock meal groups already use display-ready labels ("Bữa sáng"/"Bữa trưa"/"Bữa xế"),
// so resolving via getMealConfig(label) reuses the same color/icon mapping.
const getMealConfigByLabel = (label: string) => getMealConfig(label);

const LESSON_ICON_META: Record<string, { Icon: React.FC<{ size?: number; color?: string }>; c: string; tint: string }> = {
  math:     { Icon: IconNum,   c: '#0E8A7D', tint: '#D7F0EC' },
  science:  { Icon: IconWorld, c: '#005A36', tint: '#E6F3ED' },
  art:      { Icon: IconArt,   c: '#F97316', tint: '#FFEEDF' },
  music:    { Icon: IconMusic, c: '#DB2777', tint: '#FCE7F2' },
  language: { Icon: IconAbc,   c: '#8B5CF6', tint: '#F1ECFE' },
  english:  { Icon: IconAbc,   c: '#2563EB', tint: '#E3EDFD' },
  craft:    { Icon: IconArt,   c: '#8B5CF6', tint: '#F1ECFE' },
  sport:    { Icon: IconRun,   c: '#2563EB', tint: '#E3EDFD' },
};

const getLessonMeta = (iconType: string) => LESSON_ICON_META[iconType] ?? { Icon: IconBook, c: '#6B7280', tint: '#F4F8F5' };

const TIMETABLE_ICON: Record<string, React.FC<{ size?: number; color?: string }>> = {
  bus: IconBus, meal: IconMealLunch, book: IconBook, play: IconPlay, run: IconRun,
  lunch: IconMealLunch, wash: IconWash, sleep: IconSleep, snack: IconMealSnack,
  art: IconArt, home: IconHome, sun: IconSun, moon: IconMoon,
};

const getTimetableIcon = (key: string) => TIMETABLE_ICON[key] ?? IconClock;

const getActivityColorMeta = (type: string) => {
  switch (type) {
    case 'pickup':
    case 'dropoff':
      return { c: '#0E8A7D', tint: '#D7F0EC', icon: 'bus' };
    case 'meal':
      return { c: '#005A36', tint: '#E6F3ED', icon: 'meal' };
    case 'study':
      return { c: '#8B5CF6', tint: '#F1ECFE', icon: 'book' };
    case 'nap':
      return { c: '#DB2777', tint: '#FCE7F2', icon: 'sleep' };
    case 'play':
      return { c: '#F97316', tint: '#FFEEDF', icon: 'play' };
    default:
      return { c: '#6B7280', tint: '#F4F8F5', icon: 'sun' };
  }
};

export function ParentSchedule() {
  const { anchorDate, goPrevWeek, goNextWeek, goCurrentWeek, weekLabel } = useWeekSelector();
  const { activeStudent, loading, days, weeklyTimetable, weekStart, weekEnd } = useParentSchedule(anchorDate);

  const gridItems = React.useMemo(() => {
    if (!weeklyTimetable?.details || weeklyTimetable.details.length === 0) {
      return [];
    }

    // 1. Get unique time boundaries
    const timeBoundaries = Array.from(new Set([
      ...weeklyTimetable.details.map(d => d.startTime),
      ...weeklyTimetable.details.map(d => d.endTime)
    ])).sort();

    // 2. Generate all consecutive intervals
    const intervals = [];
    for (let i = 0; i < timeBoundaries.length - 1; i++) {
      intervals.push({
        start: timeBoundaries[i],
        end: timeBoundaries[i+1]
      });
    }

    const items = [];

    // Header cells
    items.push({
      type: 'header-corner',
      label: 'Khung giờ',
      gridRow: '1',
      gridCol: '1'
    });

    DAYS_OF_WEEK_ORDER.forEach((day, idx) => {
      items.push({
        type: 'header-day',
        label: DOW_LABELS[idx],
        date: days[idx]?.date,
        isToday: days[idx]?.isToday,
        gridRow: '1',
        gridCol: String(idx + 2)
      });
    });

    let currentGridRow = 2;

    // Group intervals into sessions
    const sessions = [
      {
        label: 'Buổi sáng',
        icon: 'sun',
        c: '#92400E',
        tint: '#FEF3C7',
        filter: (start: string) => start < '11:00:00'
      },
      {
        label: 'Buổi trưa',
        icon: 'meal',
        c: '#9A3412',
        tint: '#FFEDD5',
        filter: (start: string) => start >= '11:00:00' && start < '14:00:00'
      },
      {
        label: 'Buổi chiều',
        icon: 'moon',
        c: '#1E40AF',
        tint: '#EFF6FF',
        filter: (start: string) => start >= '14:00:00'
      }
    ];

    sessions.forEach(session => {
      const sessionIntervals = intervals.filter(int => session.filter(int.start));
      if (sessionIntervals.length === 0) return;

      // Add session banner
      items.push({
        type: 'session',
        label: session.label,
        icon: session.icon,
        c: session.c,
        tint: session.tint,
        gridRow: String(currentGridRow),
        gridCol: '1 / -1'
      });

      const sessionStartRow = currentGridRow + 1;
      currentGridRow = sessionStartRow + sessionIntervals.length;

      // Add time cells for each interval in the session
      const formatTime = (t: string) => t.substring(0, 5);
      sessionIntervals.forEach((int, idx) => {
        items.push({
          type: 'time',
          label: `${formatTime(int.start)} - ${formatTime(int.end)}`,
          gridRow: String(sessionStartRow + idx),
          gridCol: '1'
        });
      });

      // Add activities
      weeklyTimetable.details.forEach(act => {
        // Check if this activity belongs to this session
        if (!session.filter(act.startTime)) return;

        const startIdx = sessionIntervals.findIndex(int => int.start === act.startTime);
        const endIdx = sessionIntervals.findIndex(int => int.end === act.endTime);
        const colIdx = DAYS_OF_WEEK_ORDER.indexOf(act.dayOfWeek);

        if (startIdx !== -1 && endIdx !== -1 && colIdx !== -1) {
          items.push({
            type: 'activity',
            activity: act,
            gridRow: `${sessionStartRow + startIdx} / ${sessionStartRow + endIdx + 1}`,
            gridCol: String(colIdx + 2)
          });
        }
      });

      // Fill in empty cells for this session
      DAYS_OF_WEEK_ORDER.forEach((day, colIdx) => {
        sessionIntervals.forEach((int, rowIdx) => {
          // Check if there is an activity on this day that covers this interval
          const hasActivity = weeklyTimetable.details.some(act => 
            act.dayOfWeek === day && 
            act.startTime <= int.start && 
            act.endTime >= int.end
          );

          if (!hasActivity) {
            items.push({
              type: 'empty',
              gridRow: String(sessionStartRow + rowIdx),
              gridCol: String(colIdx + 2)
            });
          }
        });
      });
    });

    return items;
  }, [weeklyTimetable, days]);

  const handleExportPDF = async () => {
    const printContent = document.getElementById('timetable-pdf-area');
    if (!printContent) return;

    // Dynamically import html2pdf.js on the client side
    const html2pdf = (await import('html2pdf.js')).default;

    const studentName = activeStudent.fullName;
    const fileName = `Thoi_Khoa_Bieu_${studentName.replace(/\s+/g, '_')}.pdf`;

    // Clone the node to modify it for PDF output
    const element = printContent.cloneNode(true) as HTMLElement;
    
    // Add title banner inside the printed PDF area
    const titleBanner = document.createElement('div');
    titleBanner.innerHTML = `
      <div style="margin-bottom: 20px; text-align: center;">
        <h1 style="font-size: 20px; margin: 0 0 5px 0; color: #005A36; font-family: system-ui, -apple-system, sans-serif; font-weight: bold;">THỜI KHÓA BIỂU HỌC TẬP & SINH HOẠT</h1>
        <p style="font-size: 14px; margin: 0; color: #4B5563; font-family: system-ui, -apple-system, sans-serif;">Học sinh: <strong>${studentName}</strong></p>
      </div>
    `;
    element.insertBefore(titleBanner, element.firstChild);

    const opt = {
      margin:       10,
      filename:     fileName,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2.5, useCORS: true, logging: false },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };

    html2pdf().from(element).set(opt).save();
  };

  if (loading || !activeStudent) {
    return (
      <S.PageWrap>
        <div style={{ padding: 40, color: '#6B7280' }}>Đang tải lịch học & thực đơn...</div>
      </S.PageWrap>
    );
  }

  // Only fall back to mock content when the ENTIRE week has no real data —
  // never mix real and mock data day-by-day, to avoid misleading parents.
  const weekHasRealMenu = days.some(d => (d.menu?.details.length ?? 0) > 0);
  const activeMenu = days.find(d => d.menu)?.menu;
  const menuName = activeMenu?.menuName;
  const weekHasRealLessons = days.some(d => d.lessons.length > 0);

  const monthTheme = weeklyTimetable?.monthTheme || 'Chưa cập nhật';
  const weekTheme = weeklyTimetable?.weekTheme || 'Chưa cập nhật';
  const hasRealTimetable = gridItems.length > 0;

  return (
    <S.PageWrap>
      <S.WeekBar>
        <S.WeekNav>
          <S.WeekNavBtn onClick={goPrevWeek} aria-label="Tuần trước">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 6-6 6 6 6" /></svg>
          </S.WeekNavBtn>
          <S.WeekNavBtn onClick={goNextWeek} aria-label="Tuần sau">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6" /></svg>
          </S.WeekNavBtn>
        </S.WeekNav>
        <S.WeekCurrent>
          <S.WeekPickLabel>{weekLabel}</S.WeekPickLabel>
          <S.WeekRange>
            {pad(weekStart.getDate())} – {pad(weekEnd.getDate())}/{pad(weekEnd.getMonth() + 1)}/{weekEnd.getFullYear()}
          </S.WeekRange>
        </S.WeekCurrent>
        <S.WeekTodayBtn onClick={goCurrentWeek}>Về tuần hiện tại</S.WeekTodayBtn>
        <S.WeekDayTabs>
          {days.map((d, i) => (
            <S.WeekDayTab key={i} $today={d.isToday}>
              <S.WeekDayTabDow>{DOW_LABELS[i].replace('Thứ ', 'T')}</S.WeekDayTabDow>
              <S.WeekDayTabNum $today={d.isToday}>{d.date.getDate()}</S.WeekDayTabNum>
            </S.WeekDayTab>
          ))}
        </S.WeekDayTabs>
      </S.WeekBar>

      {/* THEME BANNER */}
      <S.ThemeBar>
        <S.ThemeItem>
          <S.ThemeIcon $variant="month"><IconClock size={22} /></S.ThemeIcon>
          <div>
            <S.ThemeLabel>Chủ đề tháng {anchorDate.getMonth() + 1}</S.ThemeLabel>
            <S.ThemeValue>{monthTheme}</S.ThemeValue>
          </div>
        </S.ThemeItem>
        <S.ThemeDivider />
        <S.ThemeItem>
          <S.ThemeIcon $variant="week"><IconPin size={22} /></S.ThemeIcon>
          <div>
            <S.ThemeLabel>Chủ đề tuần này</S.ThemeLabel>
            <S.ThemeValue>{weekTheme}</S.ThemeValue>
          </div>
        </S.ThemeItem>
      </S.ThemeBar>

      {/* WEEKLY ROUTINE TIMETABLE */}
      <S.Section>
        <S.SecHead>
          <S.SecIcon $bg="#E3EDFD" $fg="#2563EB"><IconClock size={19} /></S.SecIcon>
          <S.SecTitle>Lịch sinh hoạt trong tuần</S.SecTitle>
          {hasRealTimetable && (
            <button 
              onClick={handleExportPDF}
              style={{
                marginLeft: 'auto',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                fontSize: '12.5px',
                fontWeight: 600,
                color: '#005A36',
                background: '#E6F3ED',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#d1e7dd'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#E6F3ED'; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Xuất PDF
            </button>
          )}
        </S.SecHead>
        <S.TimetableWrap id="timetable-pdf-area">
          {hasRealTimetable ? (
            <S.Timetable>
              {gridItems.map((item, idx) => {
                const style = {
                  gridRow: item.gridRow,
                  gridColumn: item.gridCol
                };

                if (item.type === 'header-corner') {
                  return <S.TtHead key={idx} $corner style={style}>{item.label}</S.TtHead>;
                }
                if (item.type === 'header-day') {
                  return (
                    <S.TtHead key={idx} $today={item.isToday} style={style}>
                      {item.label}
                      <S.TtHeadDate $today={item.isToday}>{pad(item.date.getDate())}/{pad(item.date.getMonth() + 1)}</S.TtHeadDate>
                    </S.TtHead>
                  );
                }
                if (item.type === 'session') {
                  return (
                    <S.TtPeriod key={idx} $c={item.c} $tint={item.tint} style={style}>
                      <S.TtPeriodIcon>{React.createElement(getTimetableIcon(item.icon), { size: 13 })}</S.TtPeriodIcon>
                      {item.label}
                    </S.TtPeriod>
                  );
                }
                if (item.type === 'time') {
                  return (
                    <S.TtTime key={idx} style={style}>
                      <IconClock size={12} /> {item.label}
                    </S.TtTime>
                  );
                }
                if (item.type === 'activity') {
                  const act = item.activity;
                  const meta = getActivityColorMeta(act.activityType);
                  const ActIcon = getTimetableIcon(meta.icon);
                  return (
                    <S.TtAct key={idx} $c={meta.c} $tint={meta.tint} $today={days[DAYS_OF_WEEK_ORDER.indexOf(act.dayOfWeek)]?.isToday} style={style}>
                      <S.TtActIcon $c={meta.c} $tint={meta.tint}><ActIcon size={15} /></S.TtActIcon>
                      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                        <S.TtActName>{act.activityName}</S.TtActName>
                        {act.details && (
                          <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '3px', fontWeight: 'normal', lineHeight: 1.3 }}>
                            {act.details}
                          </div>
                        )}
                      </div>
                    </S.TtAct>
                  );
                }
                if (item.type === 'empty') {
                  const dayIdx = Number(item.gridCol) - 2;
                  return (
                    <S.TtAct key={idx} $c="#6B7280" $tint="#F4F8F5" $today={days[dayIdx]?.isToday} style={style}>
                      <S.TtActIcon $c="#6B7280" $tint="#F4F8F5"><IconClock size={15} /></S.TtActIcon>
                      <S.TtActName>Nghỉ ngơi / Chơi tự do</S.TtActName>
                    </S.TtAct>
                  );
                }
                return null;
              })}
            </S.Timetable>
          ) : (
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              padding: '60px 20px', 
              color: '#6B7280', 
              background: '#FFFFFF', 
              border: '1px dashed #E5E7EB', 
              borderRadius: '12px',
              textAlign: 'center',
              gap: '8px',
              margin: '0 10px'
            }}>
              <IconClock size={28} style={{ color: '#9CA3AF' }} />
              <div style={{ fontWeight: 600, fontSize: '15px', color: '#374151' }}>Chưa cập nhật lịch sinh hoạt</div>
              <div style={{ fontSize: '13px', color: '#9CA3AF' }}>Vui lòng quay lại sau để xem lịch sinh hoạt của tuần này</div>
            </div>
          )}
        </S.TimetableWrap>
      </S.Section>

      {/* WEEKLY MENU */}
      <S.Section>
        <S.SecHead>
          <S.SecIcon $bg="#FFEEDF" $fg="#F97316"><IconMealBreakfast size={19} /></S.SecIcon>
          <S.SecTitle>
            Thực đơn dinh dưỡng trong tuần{menuName ? ` (${menuName})` : ''}
          </S.SecTitle>
          <S.SecSub>Thứ 2 – Thứ 6</S.SecSub>
        </S.SecHead>
        <S.WeekCols>
          {days.map((d, i) => {
            const realGroups = (d.menu?.details ?? []).reduce<Record<string, MenuDetailDomainModel[]>>((acc, detail) => {
              const key = getMealConfig(detail.mealType).label;
              (acc[key] ??= []).push(detail);
              return acc;
            }, {});

            const groupEntries = weekHasRealMenu
              ? Object.entries(realGroups)
              : [];
            const hasMenu = groupEntries.length > 0;

            return (
              <S.DayCol key={i} $today={d.isToday}>
                <S.DayColHead $today={d.isToday}>
                  <div>
                    <S.DayColDow $today={d.isToday}>{DOW_LABELS[i]}</S.DayColDow>
                    <S.DayColDate>{pad(d.date.getDate())}/{pad(d.date.getMonth() + 1)}</S.DayColDate>
                  </div>
                  {d.isToday && <S.DayColTodayTag>Hôm nay</S.DayColTodayTag>}
                </S.DayColHead>
                {hasMenu ? (
                  weekHasRealMenu ? (
                    (groupEntries as [string, MenuDetailDomainModel[]][]).map(([label, details]) => {
                      const cfg = getMealConfigByLabel(label);
                      return (
                        <S.Meal key={label} $c={cfg.c} $tint={cfg.tint}>
                          <S.MealLabel>
                            <S.MealLabelIcon><cfg.Icon size={13} /></S.MealLabelIcon>
                            {label}
                          </S.MealLabel>
                          {details.map(detail => (
                            <S.Dish key={detail.menuDetailId} $c={cfg.c}>{detail.dishName}</S.Dish>
                          ))}
                        </S.Meal>
                      );
                    })
                  ) : (
                    (groupEntries as (readonly [string, string[]])[]).map(([label, dishes]) => {
                      const cfg = getMealConfigByLabel(label);
                      return (
                        <S.Meal key={label} $c={cfg.c} $tint={cfg.tint}>
                          <S.MealLabel>
                            <S.MealLabelIcon><cfg.Icon size={13} /></S.MealLabelIcon>
                            {label}
                          </S.MealLabel>
                          {dishes.map(dish => (
                            <S.Dish key={dish} $c={cfg.c}>{dish}</S.Dish>
                          ))}
                        </S.Meal>
                      );
                    })
                  )
                ) : (
                  <S.MealEmpty>Chưa cập nhật thực đơn</S.MealEmpty>
                )}
              </S.DayCol>
            );
          })}
        </S.WeekCols>
      </S.Section>

      {/* WEEKLY LESSONS */}
      <S.Section>
        <S.SecHead>
          <S.SecIcon $bg="#F1ECFE" $fg="#8B5CF6"><IconBook size={19} /></S.SecIcon>
          <S.SecTitle>Bài học trong tuần</S.SecTitle>
          <S.SecSub>Chủ đề: {weekTheme}</S.SecSub>
        </S.SecHead>
        <S.WeekCols>
          {days.map((d, i) => {
            const lessonItems = weekHasRealLessons
              ? d.lessons.map(l => ({ key: String(l.lessonLogId), subject: l.subjectName, iconType: l.iconType, title: l.lessonTitle, details: l.details }))
              : [];

            return (
              <S.DayCol key={i} $today={d.isToday}>
                <S.DayColHead $today={d.isToday}>
                  <div>
                    <S.DayColDow $today={d.isToday}>{DOW_LABELS[i]}</S.DayColDow>
                    <S.DayColDate>{pad(d.date.getDate())}/{pad(d.date.getMonth() + 1)}</S.DayColDate>
                  </div>
                  {d.isToday && <S.DayColTodayTag>Hôm nay</S.DayColTodayTag>}
                </S.DayColHead>
                {lessonItems.length > 0 ? (
                  <S.LessonBody>
                    {lessonItems.map(lesson => {
                      const meta = getLessonMeta(lesson.iconType);
                      return (
                        <S.Lesson key={lesson.key} $c={meta.c} $tint={meta.tint}>
                          <S.LessonIcon><meta.Icon size={17} /></S.LessonIcon>
                          <div>
                            <S.LessonSubject>{lesson.subject}</S.LessonSubject>
                            <S.LessonTitle>{lesson.title}</S.LessonTitle>
                            {lesson.details && <S.LessonDesc>{lesson.details}</S.LessonDesc>}
                          </div>
                        </S.Lesson>
                      );
                    })}
                  </S.LessonBody>
                ) : (
                  <S.MealEmpty>Chưa có bài học</S.MealEmpty>
                )}
              </S.DayCol>
            );
          })}
        </S.WeekCols>
      </S.Section>
    </S.PageWrap>
  );
}
