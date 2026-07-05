'use client';

import React, { useState } from 'react';
import * as S from './styles';
import { useParentDiary } from './hooks/useParentDiary';
import { useDateSelector } from './hooks/useDateSelector';
import { getTeacherDisplayName } from '@/utils/Teacher/TeacherDisplay';

// ─── Components ───────────────────────────────────────────────────────────────
import { DiaryHeader } from './components/DiaryHeader';
import { ClassFeed } from './components/ClassFeed';
import { AttendanceCard } from './components/AttendanceCard';
import { MealsSection } from './components/MealsSection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { TeacherNoteCard } from './components/TeacherNoteCard';
import { PhotoGrid } from './components/PhotoGrid';
import { NewsfeedPopup } from './components/ClassFeed/components/NewsfeedPopup';
import { ImageZoomModal } from './components/ImageZoomModal';

export function ParentDiary() {
  const { selectedDate, setSelectedDate, selectedDateStr } = useDateSelector();

  const [isNewsfeedOpen, setIsNewsfeedOpen] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<{ url: string; caption?: string } | null>(null);

  const {
    activeStudent,
    loading,
    photos,
    stats,
    attendances,
    newsfeeds,
    dailyMenu,
    dailyActivity,
  } = useParentDiary(selectedDate);

  if (loading || !activeStudent) {
    return (
      <S.PageWrap>
        <div style={{ padding: 40, color: 'var(--muted)' }}>Đang tải nhật ký...</div>
      </S.PageWrap>
    );
  }

  const dayOfWeek = selectedDate.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  const leadTeacher = activeStudent.teachers?.[0] ?? null;
  const fallbackTeacherName = leadTeacher ? getTeacherDisplayName(leadTeacher) : 'Cô Nguyễn Thị Lan';

  const selectedAttendance =
    attendances.find((a) => {
      const d = new Date(Number(a.attendanceDate) * 1000);
      return (
        d.getDate() === selectedDate.getDate() &&
        d.getMonth() === selectedDate.getMonth() &&
        d.getFullYear() === selectedDate.getFullYear()
      );
    }) ?? null;

  // Actual teacher note information
  const teacherNoteName = dailyActivity ? dailyActivity.teacherName : fallbackTeacherName;
  const teacherNoteBody = dailyActivity ? dailyActivity.teacherNote : null;

  const handleZoomImage = (url: string, caption?: string) => {
    setZoomedImage({ url, caption });
  };

  return (
    <S.PageWrap>
      <DiaryHeader
        studentName={activeStudent.fullName}
        className={activeStudent.className}
        selectedDate={selectedDate}
        selectedDateStr={selectedDateStr}
        onDateChange={setSelectedDate}
      />

      <S.JournalGrid>
        {/* LEFT — Bảng tin lớp */}
        <ClassFeed
          newsfeeds={newsfeeds}
          onViewAll={() => setIsNewsfeedOpen(true)}
          onZoomImage={handleZoomImage}
        />

        {/* RIGHT — Thông tin ngày */}
        <S.ColRight>
          {isWeekend ? (
            <S.WeekendCard>
              <S.WeekendEmoji>🎉</S.WeekendEmoji>
              <S.WeekendTitle>Hôm nay là cuối tuần rồi!</S.WeekendTitle>
              <S.WeekendDesc>Bé được nghỉ ở nhà cùng gia đình, không có dữ liệu nhật ký cho ngày này. Chúc bé và cả nhà cuối tuần thật vui vẻ!</S.WeekendDesc>
            </S.WeekendCard>
          ) : (
            <>
              <AttendanceCard
                attendance={selectedAttendance}
                studentFullName={activeStudent.fullName}
                stats={stats}
                dailyActivity={dailyActivity}
                studentAvatarUrl={activeStudent.avatarUrl}
              />

              <S.TwoCol>
                <MealsSection menu={dailyMenu} activity={dailyActivity} />
                <ActivitiesSection activity={dailyActivity} />
              </S.TwoCol>

              <TeacherNoteCard
                teacherName={teacherNoteName}
                teacherNote={teacherNoteBody}
                className={activeStudent.className}
              />

              <PhotoGrid photos={photos} onZoomImage={handleZoomImage} />
            </>
          )}
        </S.ColRight>
      </S.JournalGrid>

      <NewsfeedPopup
        isOpen={isNewsfeedOpen}
        onClose={() => setIsNewsfeedOpen(false)}
        newsfeeds={newsfeeds}
        onZoomImage={handleZoomImage}
      />

      <ImageZoomModal
        imageUrl={zoomedImage?.url || null}
        caption={zoomedImage?.caption}
        onClose={() => setZoomedImage(null)}
      />
    </S.PageWrap>
  );
}
