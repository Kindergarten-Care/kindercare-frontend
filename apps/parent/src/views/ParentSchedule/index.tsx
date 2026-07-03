'use client';

import React from 'react';
import * as S from './styles';
import { useParentSchedule } from './hooks/useParentSchedule';
import { useWeekSelector } from './hooks/useWeekSelector';
import { MenuDetailDomainModel } from '@/config/types/menu';
import {
  DOW_LABELS,
  getMealConfig,
  getMealConfigByLabel,
  getLessonMeta,
  getTimetableIcon,
  getActivityColorMeta,
  DAYS_OF_WEEK_ORDER,
  exportTimetableToPDF,
  getWeeksInMonth,
  getScheduleConfigFromDate,
} from './utils';
import { Dropdown } from '@kindercare/ui';
import {
  IconMealBreakfast,
  IconBook,
  IconClock,
  IconPin,
} from './icons';

const pad = (n: number): string => String(n).padStart(2, '0');

export function ParentSchedule() {
  const { anchorDate, goPrevWeek, goNextWeek, goCurrentWeek, setAnchorDate, weekLabel } = useWeekSelector();
  const { activeStudent, loading, days, weeklyTimetable, gridItems, weekStart, weekEnd } = useParentSchedule(anchorDate);

  const scheduleConfig = React.useMemo(() => getScheduleConfigFromDate(anchorDate), [anchorDate]);
  const weeks = React.useMemo(() => getWeeksInMonth(scheduleConfig.year, scheduleConfig.month), [scheduleConfig]);
  const currentWeekVal = React.useMemo(() => String(Math.floor(weekStart.getTime() / 1000)), [weekStart]);


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
          <Dropdown
            value={currentWeekVal}
            onChange={(val) => setAnchorDate(new Date(Number(val) * 1000))}
            options={weeks}
            placeholder="Chọn tuần"
          />
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
            <S.ThemeLabel>Chủ đề tháng {scheduleConfig.month}</S.ThemeLabel>
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
            <S.ExportPdfBtn
              onClick={() => exportTimetableToPDF(activeStudent?.fullName ?? 'Học sinh', weekLabel)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Xuất PDF
            </S.ExportPdfBtn>
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
                      <S.TtHeadDate $today={item.isToday}>{pad(item.date!.getDate())}/{pad(item.date!.getMonth() + 1)}</S.TtHeadDate>
                    </S.TtHead>
                  );
                }
                if (item.type === 'session') {
                  return (
                    <S.TtPeriod key={idx} $c={item.c!} $tint={item.tint!} style={style}>
                      <S.TtPeriodIcon>{React.createElement(getTimetableIcon(item.icon!), { size: 13 })}</S.TtPeriodIcon>
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
                  const act = item.activity!;
                  const meta = getActivityColorMeta(act.activityType);
                  const ActIcon = getTimetableIcon(meta.icon);
                  return (
                    <S.TtAct key={idx} $c={meta.c} $tint={meta.tint} $today={days[DAYS_OF_WEEK_ORDER.indexOf(act.dayOfWeek)]?.isToday} style={style}>
                      <S.TtActIcon $c={meta.c} $tint={meta.tint}><ActIcon size={15} /></S.TtActIcon>
                      <S.TtActMeta>
                        <S.TtActName>{act.activityName}</S.TtActName>
                        {act.details && (
                          <S.TtActDetails>
                            {act.details}
                          </S.TtActDetails>
                        )}
                      </S.TtActMeta>
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
            <S.TimetableEmpty>
              <IconClock size={28} color="#9CA3AF" />
              <S.TimetableEmptyTitle>Chưa cập nhật lịch sinh hoạt</S.TimetableEmptyTitle>
              <S.TimetableEmptyDesc>Vui lòng quay lại sau để xem lịch sinh hoạt của tuần này</S.TimetableEmptyDesc>
            </S.TimetableEmpty>
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
