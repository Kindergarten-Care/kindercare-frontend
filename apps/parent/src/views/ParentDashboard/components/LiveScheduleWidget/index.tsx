'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import * as S from './styles';
import { ScheduleItem } from '@/config/types/dashboard';
import { ActivityType } from '@/config/types/dailySchedule';
import { ACTIVITY_STYLE, fmtClock, getActiveInfo } from '@/utils/Schedule/scheduleUtils';

// ─── SVG icon paths per activity type ────────────────────────────────────────

const BusIcon   = () => <path d="M4 16V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10M4 16h16M4 16v2.5M20 16v2.5M7 9h10M7 13h0M17 13h0" />;
const MealIcon  = () => <><path d="M5 3v7a2 2 0 0 0 4 0V3M7 10v11" /><path d="M16 3c-1.4 0-2.5 2-2.5 4.5S14.6 12 16 12v9" /></>;
const BrushIcon = () => <><path d="M9.3 14.7 4 20s1.9 1 3.4-.5M9.3 14.7l7.8-7.8a2 2 0 0 1 2.9 2.9l-7.8 7.8-2.9-2.9z" /><circle cx="6.3" cy="5.6" r="1.2" /></>;
const TreeIcon  = () => <path d="M12 3 7 10h3l-4 6h5v5h2v-5h5l-4-6h3z" />;
const SleepIcon = () => <path d="M3 18v-5a3 3 0 0 1 3-3h7a4 4 0 0 1 4 4v4M3 18h18M3 18v2M21 18v2M3 13h3" />;
const HomeIcon  = () => <><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></>;
const GroupIcon = () => <><circle cx="7" cy="9" r="2.6" /><circle cx="16.5" cy="9" r="2.6" /><path d="M2.5 19c0-2.4 2-3.8 4.5-3.8s4.5 1.4 4.5 3.8M12.5 19c.2-2.2 2.2-3.6 4.4-3.6 2.3 0 4 1.4 4.1 3.6" /></>;
const ClockIcon = () => <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>;
const MoonIcon  = () => <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />;

const ICON_MAP: Record<ActivityType, React.FC> = {
  pickup: BusIcon, meal: MealIcon, study: BrushIcon,
  play: TreeIcon,  nap: SleepIcon, dropoff: HomeIcon, other: GroupIcon,
};

// ─── sub-components ───────────────────────────────────────────────────────────

const SvgIcon: React.FC<{ type: ActivityType; size?: number }> = ({ type, size = 20 }) => {
  const Inner = ICON_MAP[type] ?? GroupIcon;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <Inner />
    </svg>
  );
};

const ArrowIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
);

// ─── constants ────────────────────────────────────────────────────────────────

const SPACING = 66;

// ─── component ────────────────────────────────────────────────────────────────

interface LiveScheduleWidgetProps {
  schedule: ScheduleItem[];
  className?: string;
  todayAttendanceStatus?: string;
}

const LiveScheduleWidget: React.FC<LiveScheduleWidgetProps> = ({ schedule, className, todayAttendanceStatus }) => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('Dashboard');
  const [nowMin, setNowMin] = useState(() => {
    const d = new Date();
    return d.getHours() * 60 + d.getMinutes();
  });
  const [clock, setClock] = useState(() => fmtClock(new Date()));

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setNowMin(d.getHours() * 60 + d.getMinutes());
      setClock(fmtClock(d));
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  const { idx: activeIdx, isLive, isBeforeFirst, isAfterLast } = useMemo(
    () => getActiveInfo(schedule, nowMin),
    [schedule, nowMin],
  );

  const isAbsent   = todayAttendanceStatus === 'absent' || todayAttendanceStatus === 'excused';
  const emptyState = !schedule.length;
  const dimFocus   = !isLive;

  return (
    <S.Card>
      <S.CardHead>
        <S.HeadIco>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <ClockIcon />
          </svg>
        </S.HeadIco>
        <S.HeadText>
          <S.CardTitle>{t('schedule.title')}</S.CardTitle>
          {className && <S.CardSub>{className}</S.CardSub>}
        </S.HeadText>
        <S.ClockBadge>{clock}</S.ClockBadge>
      </S.CardHead>

      {emptyState ? (
        isAbsent ? (
          <S.EmptyState>
            <S.EmptyIcon style={{ background: '#FEF9C3', color: '#D97706' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <MoonIcon />
              </svg>
            </S.EmptyIcon>
            <S.EmptyTitle>{t('schedule.offTitle')}</S.EmptyTitle>
            <S.EmptySub>{t('schedule.offSub')}</S.EmptySub>
          </S.EmptyState>
        ) : (
          <S.EmptyState>
            <S.EmptyIcon>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <ClockIcon />
              </svg>
            </S.EmptyIcon>
            <S.EmptyTitle>{t('schedule.emptyTitle')}</S.EmptyTitle>
            <S.EmptySub dangerouslySetInnerHTML={{ __html: t.raw('emptyActivitiesSub') }} />
          </S.EmptyState>
        )
      ) : (
        <S.StageWrap>
          {isAfterLast && (
            <S.DoneBanner>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <HomeIcon />
              </svg>
              {t('schedule.done')}
            </S.DoneBanner>
          )}
          <S.Stage>
            <S.FocusFrame $dim={dimFocus} />
            <S.Wheel>
              {schedule.map((item, i) => {
                const off     = i - activeIdx;
                const a       = Math.abs(off);
                const style   = ACTIVITY_STYLE[item.activityType] ?? ACTIVITY_STYLE.other;
                const isActive = off === 0;
                const isDone   = off < 0;
                const isNext   = off === 1;

                return (
                  <S.Slot
                    key={item.id}
                    $active={isActive}
                    style={{
                      transform: `translateY(${off * SPACING}px) translateZ(${-a * 52}px) rotateX(${Math.max(-60, Math.min(60, off * -28))}deg)`,
                      opacity:   a === 0 ? 1 : Math.max(0, 1 - a * 0.4),
                      zIndex:    100 - a,
                    }}
                  >
                    <S.SlotTime $active={isActive}>{item.time}</S.SlotTime>
                    <S.SlotIco $color={style.color} $tint={style.tint} $active={isActive}>
                      <SvgIcon type={item.activityType} size={isActive ? 21 : 19} />
                    </S.SlotIco>
                    <S.SlotBody>
                      <S.SlotName $active={isActive}>{item.title}</S.SlotName>
                      {item.note && <S.SlotDesc>{item.note}</S.SlotDesc>}
                    </S.SlotBody>
                    {isActive && isLive       && <S.LiveBadge><S.LiveDot />{t('schedule.ongoing')}</S.LiveBadge>}
                    {isActive && isBeforeFirst && <S.Tag $type="soon">{t('schedule.upcoming')}</S.Tag>}
                    {isDone                    && <S.Tag $type="done">{t('schedule.finished')}</S.Tag>}
                    {isNext && (isLive || (!isBeforeFirst && !isAfterLast)) && (
                      <S.Tag $type="next">{t('schedule.next')}</S.Tag>
                    )}
                  </S.Slot>
                );
              })}
            </S.Wheel>
          </S.Stage>
        </S.StageWrap>
      )}

      {!(emptyState && isAbsent) && (
        <S.ViewBtn onClick={() => router.push(`/${locale}/schedule`)}>
          {t('schedule.viewFull')}
          <ArrowIcon size={16} />
        </S.ViewBtn>
      )}
    </S.Card>
  );
};

export default LiveScheduleWidget;
