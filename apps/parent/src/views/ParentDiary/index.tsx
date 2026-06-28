'use client';

import React, { useState, useMemo } from 'react';
import * as S from './styles';
import { ActivityType } from '@/config/types/dailySchedule';
import { useParentDiary } from './hooks/useParentDiary';
import { getTeacherDisplayName } from '@/views/ParentDashboard/hooks/useParentDashboard';
import { tsToHHMM } from '@/utils/Student/Date';

// ─── SVG icon paths ───────────────────────────────────────────────────────────

const BusPath    = () => <path d="M4 16V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10M4 16h16M4 16v2.5M20 16v2.5M7 9h10M7 13h0M17 13h0" />;
const MealPath   = () => <><path d="M5 3v7a2 2 0 0 0 4 0V3M7 10v11" /><path d="M16 3c-1.4 0-2.5 2-2.5 4.5S14.6 12 16 12v9" /></>;
const BrushPath  = () => <><path d="M9.3 14.7 4 20s1.9 1 3.4-.5M9.3 14.7l7.8-7.8a2 2 0 0 1 2.9 2.9l-7.8 7.8-2.9-2.9z" /><circle cx="6.3" cy="5.6" r="1.2" /></>;
const TreePath   = () => <path d="M12 3 7 10h3l-4 6h5v5h2v-5h5l-4-6h3z" />;
const SleepPath  = () => <path d="M3 18v-5a3 3 0 0 1 3-3h7a4 4 0 0 1 4 4v4M3 18h18M3 18v2M21 18v2M3 13h3" />;
const HomePath   = () => <><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></>;
const GroupPath  = () => <><circle cx="7" cy="9" r="2.6" /><circle cx="16.5" cy="9" r="2.6" /><path d="M2.5 19c0-2.4 2-3.8 4.5-3.8s4.5 1.4 4.5 3.8M12.5 19c.2-2.2 2.2-3.6 4.4-3.6 2.3 0 4 1.4 4.1 3.6" /></>;
const ClockPath  = () => <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>;
const BellPath   = () => <><path d="M18 8.5a6 6 0 0 0-12 0c0 6-2.5 7.5-2.5 7.5h17S18 14.5 18 8.5z" /><path d="M10 19.5a2.2 2.2 0 0 0 4 0" /></>;
const ImgPath    = () => <><rect x="3" y="4.5" width="18" height="15" rx="2.5" /><circle cx="8.5" cy="9.5" r="1.6" /><path d="m4 17 5-4.5 4 3 3-2.5 4 3.5" /></>;
const MsgPath    = () => <path d="M4 5h16v11H8l-4 4z" />;
const ArrowPath  = () => <path d="M5 12h13M13 6l6 6-6 6" />;
const DlPath     = () => <><path d="M12 3v12M7.5 10.5 12 15l4.5-4.5" /><path d="M5 19h14" /></>;
const CalPath    = () => <><rect x="3" y="4.5" width="18" height="16" rx="2.5" /><path d="M3 9h18M8 2.5v4M16 2.5v4" /></>;
const ChevPath   = () => <path d="m6 9 6 6 6-6" />;
const UserPath   = () => <><circle cx="12" cy="8" r="3.6" /><path d="M5 20c0-3.4 3.1-5.5 7-5.5s7 2.1 7 5.5" /></>;
const BookPath   = () => <><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></>;
const FoodPath   = () => <><path d="M5 3v7a2 2 0 0 0 4 0V3M7 10v11" /><path d="M16 3c-1.4 0-2.5 2-2.5 4.5S14.6 12 16 12v9" /></>;
const NapPath    = () => <path d="M3 18v-5a3 3 0 0 1 3-3h7a4 4 0 0 1 4 4v4M3 18h18" />;

const ICON_PATH: Record<ActivityType, React.FC> = {
  pickup:  BusPath,
  meal:    MealPath,
  study:   BrushPath,
  play:    TreePath,
  nap:     SleepPath,
  dropoff: HomePath,
  other:   GroupPath,
};

const ACTIVITY_STYLE: Record<ActivityType, { color: string; tint: string }> = {
  pickup:  { color: '#0E8A7D', tint: '#D7F0EC' },
  meal:    { color: '#F97316', tint: '#FFEEDF' },
  study:   { color: '#8B5CF6', tint: '#F1ECFE' },
  nap:     { color: '#2563EB', tint: '#E3EDFD' },
  play:    { color: '#005A36', tint: '#E6F3ED' },
  dropoff: { color: '#0E8A7D', tint: '#D7F0EC' },
  other:   { color: '#8B5CF6', tint: '#F1ECFE' },
};

const LESSON_COLORS = [
  { color: '#7C3AED', tint: '#EDE9FE' },
  { color: '#0E8A7D', tint: '#D7F0EC' },
  { color: '#B45309', tint: '#FEF3C7' },
  { color: '#2563EB', tint: '#EFF6FF' },
  { color: '#DC2626', tint: '#FEE2E2' },
];
const lessonColor = (idx: number) => LESSON_COLORS[idx % LESSON_COLORS.length];

// ─── helpers ──────────────────────────────────────────────────────────────────

function Svg({ children, size = 17, sw = 1.9 }: { children: React.ReactNode; size?: number; sw?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

function ActivityIcon({ type, size = 17 }: { type: ActivityType; size?: number }) {
  const Inner = ICON_PATH[type] ?? GroupPath;
  return <Svg size={size}><Inner /></Svg>;
}

function getTeacherInitial(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  return parts[parts.length - 1]?.[0]?.toUpperCase() ?? 'C';
}

// ─── component ────────────────────────────────────────────────────────────────

export function ParentDiary() {
  const { activeStudent, loading, timelineItems, photos, stats, todayAttendance, lessons } = useParentDiary();
  const [liked, setLiked] = useState(false);

  const todayStr = useMemo(() => {
    const d = new Date();
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}/${d.getFullYear()}`;
  }, []);

  if (loading || !activeStudent) {
    return (
      <S.PageWrap>
        <div style={{ padding: 40, color: 'var(--muted)' }}>Đang tải nhật ký...</div>
      </S.PageWrap>
    );
  }

  const leadTeacher = activeStudent.teachers?.[0] ?? null;
  const teacherName = leadTeacher ? getTeacherDisplayName(leadTeacher) : 'Cô giáo';
  const teacherInitial = leadTeacher ? getTeacherInitial(leadTeacher.fullName) : 'C';

  const firstName = activeStudent.fullName.split(' ').slice(-1)[0];
  const summaryText = useMemo(() => {
    if (todayAttendance?.checkOutTime) {
      const by = todayAttendance.pickedUpBy ? ` bởi ${todayAttendance.pickedUpBy}` : '';
      return `Bé ${firstName} đã được đón lúc ${tsToHHMM(todayAttendance.checkOutTime)}${by}. Tham gia ${timelineItems.length} hoạt động trong ngày.`;
    }
    if (todayAttendance?.checkInTime) {
      return `Bé ${firstName} đến trường lúc ${tsToHHMM(todayAttendance.checkInTime)}. Đang tham gia ${timelineItems.length} hoạt động hôm nay.`;
    }
    return timelineItems.length > 0
      ? `Bé ${firstName} có ${timelineItems.length} hoạt động hôm nay.`
      : 'Chưa có dữ liệu hoạt động hôm nay.';
  }, [todayAttendance, timelineItems.length, firstName]);

  return (
    <S.PageWrap>

      {/* ── Page header ── */}
      <S.PageHeader>
        <div>
          <S.PageTitle>Nhật ký sinh hoạt của bé</S.PageTitle>
          <S.PageCrumb>
            <Svg size={15}><UserPath /></Svg>
            <b>{activeStudent.fullName}</b> · {activeStudent.className}
          </S.PageCrumb>
        </div>
        <S.HeaderActions>
          <S.DateChip>
            <Svg size={16}><CalPath /></Svg>
            Hôm nay, {todayStr}
            <Svg size={15} sw={2.2}><ChevPath /></Svg>
          </S.DateChip>
          <S.IconAction title="Tải nhật ký">
            <Svg size={18}><DlPath /></Svg>
          </S.IconAction>
        </S.HeaderActions>
      </S.PageHeader>

      {/* ── Summary ── */}
      <S.Summary>
        <S.SummaryIco>
          <Svg size={24} sw={1.8}><BellPath /></Svg>
        </S.SummaryIco>
        <S.SummaryBody>
          <S.SummaryLabel>Tóm tắt hôm nay</S.SummaryLabel>
          <S.SummaryText>{summaryText}</S.SummaryText>
        </S.SummaryBody>
        <S.Stats>
          <S.StatChip>
            <Svg size={20} sw={1.8}><FoodPath /></Svg>
            <div>
              <S.StatVal>{stats.mealCount}/3</S.StatVal>
              <S.StatLbl>Bữa ăn</S.StatLbl>
            </div>
          </S.StatChip>
          <S.StatChip>
            <Svg size={20} sw={1.8}><NapPath /></Svg>
            <div>
              <S.StatVal>{stats.napDuration}</S.StatVal>
              <S.StatLbl>Ngủ trưa</S.StatLbl>
            </div>
          </S.StatChip>
        </S.Stats>
      </S.Summary>

      {/* ── Main grid ── */}
      <S.Grid>

        {/* Timeline */}
        <S.Card>
          <S.CardHead>
            <S.CardHeadIco>
              <Svg size={17}><ClockPath /></Svg>
            </S.CardHeadIco>
            <S.CardTitle>Trục thời gian hoạt động</S.CardTitle>
            <S.CardSub>{timelineItems.length} mốc</S.CardSub>
          </S.CardHead>
          <S.TlWrap>
            {timelineItems.length === 0 ? (
              <S.TlEmpty>Chưa có hoạt động nào hôm nay</S.TlEmpty>
            ) : (
              <S.Tl>
                {timelineItems.map((item, i) => {
                  const style = ACTIVITY_STYLE[item.activityType] ?? ACTIVITY_STYLE.other;
                  const isLast = i === timelineItems.length - 1;
                  return (
                    <S.TlItem key={item.id} $isLast={isLast}>
                      <S.TlNode $color={style.color} $tint={style.tint}>
                        <ActivityIcon type={item.activityType} size={15} />
                      </S.TlNode>
                      <S.TlCard>
                        <S.TlTop>
                          <S.TlTime>{item.time}</S.TlTime>
                          <S.TlName $color={style.color} $tint={style.tint}>
                            <ActivityIcon type={item.activityType} size={13} />
                            {item.name}
                          </S.TlName>
                        </S.TlTop>
                        {item.detail && <S.TlDetail>{item.detail}</S.TlDetail>}
                      </S.TlCard>
                    </S.TlItem>
                  );
                })}
              </S.Tl>
            )}
          </S.TlWrap>
        </S.Card>

        {/* Right column */}
        <S.SideCol>

          {/* Photos */}
          <S.Card>
            <S.CardHead>
              <S.CardHeadIco>
                <Svg size={17}><ImgPath /></Svg>
              </S.CardHeadIco>
              <S.CardTitle>Hình ảnh trong ngày</S.CardTitle>
              <S.CardSub>{photos.length} ảnh</S.CardSub>
            </S.CardHead>
            <S.PhotoGrid>
              {photos.length === 0 ? (
                <>
                  {[1, 2, 3, 4].map(n => (
                    <S.Photo key={n}>
                      <Svg size={26} sw={1.5}><ImgPath /></Svg>
                    </S.Photo>
                  ))}
                </>
              ) : (
                <>
                  {photos.slice(0, 4).map(photo => (
                    <S.Photo key={photo.id}>
                      {photo.url && <img src={photo.url} alt={photo.caption} />}
                      {!photo.url && <Svg size={26} sw={1.5}><ImgPath /></Svg>}
                      <S.PhotoCap>
                        <Svg size={12} sw={2}><ClockPath /></Svg>
                        {photo.time}
                      </S.PhotoCap>
                    </S.Photo>
                  ))}
                  {photos.length > 4 && (
                    <S.PhotoMore>
                      Xem tất cả {photos.length} ảnh
                      <Svg size={15} sw={2}><ArrowPath /></Svg>
                    </S.PhotoMore>
                  )}
                </>
              )}
            </S.PhotoGrid>
          </S.Card>

          {/* Daily lessons */}
          <S.Card>
            <S.CardHead>
              <S.CardHeadIco>
                <Svg size={17}><BookPath /></Svg>
              </S.CardHeadIco>
              <S.CardTitle>Bài học hôm nay</S.CardTitle>
              <S.CardSub>{lessons.length} bài</S.CardSub>
            </S.CardHead>
            <S.LsnList>
              {lessons.length === 0 ? (
                <S.LsnEmpty>Chưa có dữ liệu bài học hôm nay</S.LsnEmpty>
              ) : (
                lessons.map((lesson, idx) => {
                  const { color, tint } = lessonColor(idx);
                  return (
                    <S.LsnItem key={lesson.lessonLogId}>
                      <S.LsnSubjectBadge $color={color} $tint={tint}>
                        {lesson.subjectName.substring(0, 2).toUpperCase()}
                      </S.LsnSubjectBadge>
                      <S.LsnContent>
                        <S.LsnSubjectTag $color={color}>{lesson.subjectName}</S.LsnSubjectTag>
                        <S.LsnTitle>{lesson.lessonTitle}</S.LsnTitle>
                        {lesson.details && <S.LsnDetail>{lesson.details}</S.LsnDetail>}
                      </S.LsnContent>
                    </S.LsnItem>
                  );
                })
              )}
            </S.LsnList>
          </S.Card>

          {/* Teacher message */}
          <S.Card>
            <S.CardHead>
              <S.CardHeadIco>
                <Svg size={17}><MsgPath /></Svg>
              </S.CardHeadIco>
              <S.CardTitle>Lời nhắn từ cô chủ nhiệm</S.CardTitle>
            </S.CardHead>
            <S.MsgBody>
              <S.MsgFrom>
                <S.MsgAvatar>{teacherInitial}</S.MsgAvatar>
                <div>
                  <S.MsgFromName>{teacherName}</S.MsgFromName>
                  <S.MsgFromRole>GV chủ nhiệm {activeStudent.className}</S.MsgFromRole>
                </div>
              </S.MsgFrom>
              <S.MsgQuote>
                Hôm nay bé học và chơi rất ngoan, hòa đồng với các bạn. Phụ huynh tiếp tục động viên bé nhé!
              </S.MsgQuote>
              <S.ActionRow>
                <S.HeartBtn $liked={liked} onClick={() => setLiked(v => !v)}>
                  <Svg size={16} sw={1.9}>
                    <path
                      d="M12 20s-7-4.5-9.2-9C1.3 8 3 4.5 6.4 4.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3.4 0 5.1 3.5 3.6 6.5C19 15.5 12 20 12 20z"
                      fill={liked ? 'currentColor' : 'none'}
                    />
                  </Svg>
                  {liked ? 'Đã thả tim' : 'Thả tim'}
                </S.HeartBtn>
                <S.ReplyBtn>
                  <Svg size={16} sw={1.9}><MsgPath /></Svg>
                  Phản hồi cô
                </S.ReplyBtn>
              </S.ActionRow>
            </S.MsgBody>
          </S.Card>

        </S.SideCol>
      </S.Grid>
    </S.PageWrap>
  );
}
