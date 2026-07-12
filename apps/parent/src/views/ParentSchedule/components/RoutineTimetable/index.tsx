'use client';

import React from 'react';
import { IconClock } from '../../icons';
import {
  getTimetableIcon,
  getActivityColorMeta,
  exportTimetableToPDF,
  DAYS_OF_WEEK_ORDER,
  GridItem,
} from '../../utils';
import {
  Section,
  SecHead,
  SecIcon,
  SecTitle,
  ExportPdfBtn,
  TimetableWrap,
  Timetable,
  TtHead,
  TtHeadDate,
  TtPeriod,
  TtPeriodIcon,
  TtTime,
  TtAct,
  TtActIcon,
  TtActName,
  TtActMeta,
  TtActDetails,
  TimetableEmpty,
  TimetableEmptyTitle,
  TimetableEmptyDesc,
} from './styles';

const pad = (n: number): string => String(n).padStart(2, '0');

interface RoutineTimetableSectionProps {
  gridItems: GridItem[];
  days: { date: Date; isToday: boolean }[];
  hasRealTimetable: boolean;
  studentFullName: string;
  weekLabel: string;
}

export const RoutineTimetableSection: React.FC<RoutineTimetableSectionProps> = ({
  gridItems,
  days,
  hasRealTimetable,
  studentFullName,
  weekLabel,
}) => (
  <Section>
    <SecHead>
      <SecIcon $bg="#E3EDFD" $fg="#2563EB"><IconClock size={19} /></SecIcon>
      <SecTitle>Lịch sinh hoạt trong tuần</SecTitle>
      {hasRealTimetable && (
        <ExportPdfBtn
          onClick={() => exportTimetableToPDF(studentFullName, weekLabel)}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Xuất PDF
        </ExportPdfBtn>
      )}
    </SecHead>
    <TimetableWrap id="timetable-pdf-area">
      {hasRealTimetable ? (
        <Timetable>
          {gridItems.map((item, idx) => {
            const style = {
              gridRow: item.gridRow,
              gridColumn: item.gridCol,
            };

            if (item.type === 'header-corner') {
              return <TtHead key={idx} $corner style={style}>{item.label}</TtHead>;
            }
            if (item.type === 'header-day') {
              return (
                <TtHead key={idx} $today={item.isToday} style={style}>
                  {item.label}
                  <TtHeadDate $today={item.isToday}>{pad(item.date!.getDate())}/{pad(item.date!.getMonth() + 1)}</TtHeadDate>
                </TtHead>
              );
            }
            if (item.type === 'session') {
              return (
                <TtPeriod key={idx} $c={item.c!} $tint={item.tint!} style={style}>
                  <TtPeriodIcon>{React.createElement(getTimetableIcon(item.icon!), { size: 13 })}</TtPeriodIcon>
                  {item.label}
                </TtPeriod>
              );
            }
            if (item.type === 'time') {
              return (
                <TtTime key={idx} style={style}>
                  <IconClock size={12} /> {item.label}
                </TtTime>
              );
            }
            if (item.type === 'activity') {
              const act = item.activity!;
              const meta = getActivityColorMeta(act.activityType);
              const ActIcon = getTimetableIcon(meta.icon);
              return (
                <TtAct key={idx} $c={meta.c} $tint={meta.tint} $today={days[DAYS_OF_WEEK_ORDER.indexOf(act.dayOfWeek)]?.isToday} style={style}>
                  <TtActIcon $c={meta.c} $tint={meta.tint}><ActIcon size={15} /></TtActIcon>
                  <TtActMeta>
                    <TtActName>{act.activityName}</TtActName>
                    {act.details && (
                      <TtActDetails>
                        {act.details}
                      </TtActDetails>
                    )}
                  </TtActMeta>
                </TtAct>
              );
            }
            if (item.type === 'empty') {
              const dayIdx = Number(item.gridCol) - 2;
              return (
                <TtAct key={idx} $c="#6B7280" $tint="#F4F8F5" $today={days[dayIdx]?.isToday} style={style}>
                  <TtActIcon $c="#6B7280" $tint="#F4F8F5"><IconClock size={15} /></TtActIcon>
                  <TtActName>Nghỉ ngơi / Chơi tự do</TtActName>
                </TtAct>
              );
            }
            return null;
          })}
        </Timetable>
      ) : (
        <TimetableEmpty>
          <IconClock size={28} color="#9CA3AF" />
          <TimetableEmptyTitle>Chưa cập nhật lịch sinh hoạt</TimetableEmptyTitle>
          <TimetableEmptyDesc>Vui lòng quay lại sau để xem lịch sinh hoạt của tuần này</TimetableEmptyDesc>
        </TimetableEmpty>
      )}
    </TimetableWrap>
  </Section>
);