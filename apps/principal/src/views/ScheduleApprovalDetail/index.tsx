'use client';

import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { kcToast } from '@kindercare/ui';
import { scheduleApprovalService } from '@/services/ScheduleApproval/ScheduleApprovalService';
import { MonthlyScheduleDetailDto, WeeklyScheduleItemDto, DayOfWeek, ScheduleActivityType } from '@/config/types/scheduleApproval';
import {
  Container, LoadingText, ErrorText,
  Hero, HeroAv, HeroMain, HeroCls, HeroTheme, HeroMeta, MPill, HeroActions, BtnApprove, BtnReject, BtnActivate,
  ABadge, ADot, WeekTabs, WeekTab, WeekTabN, WeekTabTh,
  TtWrap, Tt, TtHead, TtTime, TtEnd, TtAct, TtActIc, TtActBody, TtActName, TtActLoc, TtActDetail, TtEmpty,
  Legend, Leg, LegIc, EmptyWeeks, EmptyIcon, EmptyTitle,
} from './styles';

const CLASS_AV = [
  'linear-gradient(140deg,#fcd34d,#f59e0b)',
  'linear-gradient(140deg,#6ee7b7,#10b981)',
  'linear-gradient(140deg,#60a5fa,#2563eb)',
  'linear-gradient(140deg,#fda4af,#f43f5e)',
  'linear-gradient(140deg,#c4b5fd,#8b5cf6)',
  'linear-gradient(140deg,#0a7a4c,#005a36)',
];

const DOW_ORDER: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DOW_VN: Record<DayOfWeek, string> = {
  Monday: 'Thứ Hai', Tuesday: 'Thứ Ba', Wednesday: 'Thứ Tư', Thursday: 'Thứ Năm',
  Friday: 'Thứ Sáu', Saturday: 'Thứ Bảy', Sunday: 'Chủ Nhật',
};

const ACT: Record<ScheduleActivityType, { label: string; c: string; tint: string; icon: React.ReactNode }> = {
  pickup: { label: 'Đón trẻ', c: '#0e8a7d', tint: '#d7f0ec', icon: <><rect x="3" y="6" width="18" height="9" rx="2" /><path d="M3 15v3M21 15v3M7 10h10" /><circle cx="7.5" cy="18" r="1.6" /><circle cx="16.5" cy="18" r="1.6" /></> },
  meal: { label: 'Ăn uống', c: '#f97316', tint: '#ffeedf', icon: <><path d="M5 3v7a2 2 0 0 0 4 0V3M7 10v11" /><path d="M16 3c-1.4 0-2.5 2-2.5 4.5S14.6 12 16 12v9" /></> },
  study: { label: 'Học tập', c: '#8b5cf6', tint: '#f1ecfe', icon: <><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v15H6.5A2.5 2.5 0 0 0 4 19.5z" /><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /></> },
  nap: { label: 'Ngủ trưa', c: '#2563eb', tint: '#e3edfd', icon: <path d="M3 18v-5a3 3 0 0 1 3-3h7a4 4 0 0 1 4 4v4M3 18h18M3 18v2M21 18v2M3 13h3" /> },
  play: { label: 'Vui chơi', c: '#237a3c', tint: '#e8f5ed', icon: <><path d="M9.3 14.7 4 20s1.9 1 3.4-.5M9.3 14.7l7.8-7.8a2 2 0 0 1 2.9 2.9l-7.8 7.8-2.9-2.9z" /><circle cx="6.3" cy="5.6" r="1.2" /></> },
  dropoff: { label: 'Trả trẻ', c: '#db2777', tint: '#fce7f2', icon: <><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></> },
  other: { label: 'Khác', c: '#92400e', tint: '#fff0d8', icon: <path d="M12 2v20M2 12h20" /> },
};

function svgIco(type: ScheduleActivityType, size = 15) {
  const a = ACT[type] || ACT.other;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {a.icon}
    </svg>
  );
}

const hm = (t: string) => t.slice(0, 5);

interface ScheduleApprovalDetailProps {
  scheduleId: string;
}

export default function ScheduleApprovalDetailView({ scheduleId }: ScheduleApprovalDetailProps) {
  const router = useRouter();
  const [data, setData] = useState<MonthlyScheduleDetailDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [curWeek, setCurWeek] = useState(0);
  const [approving, setApproving] = useState(false);

  const fetchDetail = useCallback(async () => {
    try {
      setLoading(true);
      const detail = await scheduleApprovalService.getMonthlyScheduleDetail(scheduleId);
      setData(detail);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Lỗi khi tải chi tiết thời khóa biểu');
    } finally {
      setLoading(false);
    }
  }, [scheduleId]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  const handleSetStatus = async (approvedStatus: 0 | 1) => {
    if (!data) return;
    try {
      setApproving(true);
      await scheduleApprovalService.approveMonthlySchedule(data.id, { approvedStatus });
      setData(prev => prev && { ...prev, approvedStatus });
      kcToast.success(
        approvedStatus === 1
          ? 'Đã duyệt thời khóa biểu · đã gửi thông báo cho giáo viên'
          : 'Đã từ chối · yêu cầu giáo viên chỉnh sửa lại'
      );
    } catch (err: any) {
      kcToast.error(err.message || 'Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setApproving(false);
    }
  };

  const handleActivate = async () => {
    if (!data) return;
    try {
      setApproving(true);
      await scheduleApprovalService.activeMonthlySchedule(data.id, true);
      setData(prev => prev && { ...prev, isActive: true });
      kcToast.success('Đã kích hoạt thời khóa biểu tháng này');
    } catch (err: any) {
      kcToast.error(err.message || 'Lỗi khi kích hoạt');
    } finally {
      setApproving(false);
    }
  };

  const week = data?.weeks[curWeek];

  const { slots, itemIndex } = useMemo(() => {
    if (!week) return { slots: [], itemIndex: {} as Record<string, WeeklyScheduleItemDto> };
    const slotKey = (it: WeeklyScheduleItemDto) => `${it.startTime}|${it.endTime}`;
    const slotMap = new Map<string, { s: string; e: string }>();
    week.items.forEach(it => {
      if (!slotMap.has(slotKey(it))) slotMap.set(slotKey(it), { s: it.startTime, e: it.endTime });
    });
    const slotsArr = [...slotMap.values()].sort((a, b) => a.s.localeCompare(b.s));
    const idx: Record<string, WeeklyScheduleItemDto> = {};
    week.items.forEach(it => { idx[`${it.dayOfWeek}|${slotKey(it)}`] = it; });
    return { slots: slotsArr, itemIndex: idx };
  }, [week]);

  if (loading) return <Container><LoadingText>Đang tải dữ liệu...</LoadingText></Container>;
  if (error) return <Container><ErrorText>{error}</ErrorText></Container>;
  if (!data) return null;

  return (
    <Container>
      <Hero>
        <HeroAv $bg={CLASS_AV[data.classId % CLASS_AV.length]}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
        </HeroAv>
        <HeroMain>
          <HeroCls>
            {data.className}
            {data.approvedStatus === 1 ? (
              <ABadge $variant="approved"><ADot />Đã duyệt</ABadge>
            ) : (
              <ABadge $variant="pending"><ADot />Chờ duyệt</ABadge>
            )}
          </HeroCls>
          <HeroTheme>{data.monthTheme}</HeroTheme>
          <HeroMeta>
            <MPill>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
              Tháng {data.month}/{data.year}
            </MPill>
            <MPill>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
              {data.gradeName}
            </MPill>
            <MPill>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>
              {data.weeks.length} tuần
            </MPill>
          </HeroMeta>
        </HeroMain>
        <HeroActions>
          {data.approvedStatus === 1 ? (
            <BtnActivate onClick={handleActivate} disabled={approving || data.isActive}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              {data.isActive ? 'Đang hoạt động' : 'Kích hoạt'}
            </BtnActivate>
          ) : (
            <>
              <BtnReject onClick={() => handleSetStatus(0)} disabled={approving}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                Từ chối
              </BtnReject>
              <BtnApprove onClick={() => handleSetStatus(1)} disabled={approving}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                Duyệt
              </BtnApprove>
            </>
          )}
        </HeroActions>
      </Hero>

      {data.weeks.length === 0 ? (
        <EmptyWeeks>
          <EmptyIcon>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
          </EmptyIcon>
          <EmptyTitle>Chưa có tuần nào được thiết lập cho tháng này</EmptyTitle>
        </EmptyWeeks>
      ) : (
        <>
          <WeekTabs>
            {data.weeks.map((w, i) => (
              <WeekTab key={w.weeklyScheduleId} $active={i === curWeek} onClick={() => setCurWeek(i)}>
                <WeekTabN $active={i === curWeek}>Tuần {w.weekOrder}</WeekTabN>
                <WeekTabTh>{w.weekTheme.replace(/^Tuần \d+:\s*/, '')}</WeekTabTh>
              </WeekTab>
            ))}
          </WeekTabs>

          <TtWrap>
            <Tt>
              <TtHead $corner>Khung giờ</TtHead>
              {DOW_ORDER.map(d => (
                <TtHead key={d} $weekend={d === 'Saturday' || d === 'Sunday'}>{DOW_VN[d]}</TtHead>
              ))}
              {slots.map(sl => (
                <React.Fragment key={`${sl.s}-${sl.e}`}>
                  <TtTime><span>{hm(sl.s)}</span><TtEnd>{hm(sl.e)}</TtEnd></TtTime>
                  {DOW_ORDER.map(d => {
                    const it = itemIndex[`${d}|${sl.s}|${sl.e}`];
                    if (!it) return <TtEmpty key={d}><span>—</span></TtEmpty>;
                    const a = ACT[it.activityType] || ACT.other;
                    return (
                      <TtAct key={d} $c={a.c} $tint={a.tint}>
                        <TtActIc $c={a.c} $tint={a.tint}>{svgIco(it.activityType, 15)}</TtActIc>
                        <TtActBody>
                          <TtActName>{it.activityName}</TtActName>
                          <TtActLoc>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s7-5.5 7-11a7 7 0 0 0-14 0c0 5.5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
                            {it.location || '—'}
                          </TtActLoc>
                          {it.details && <TtActDetail title={it.details}>{it.details}</TtActDetail>}
                        </TtActBody>
                      </TtAct>
                    );
                  })}
                </React.Fragment>
              ))}
            </Tt>
          </TtWrap>

          <Legend>
            {(Object.keys(ACT) as ScheduleActivityType[]).map(k => (
              <Leg key={k}>
                <LegIc $c={ACT[k].c} $tint={ACT[k].tint}>{svgIco(k, 13)}</LegIc>
                {ACT[k].label}
              </Leg>
            ))}
          </Legend>
        </>
      )}
    </Container>
  );
}
