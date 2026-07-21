'use client';

import React, { useState } from 'react';
import * as S from './styles';
import { useParentDiary } from './hooks/useParentDiary';
import { useDateSelector } from './hooks/useDateSelector';
import { getTeacherDisplayName } from '@/utils/Teacher/TeacherDisplay';

import { IconClose } from '@/assets/icons/dashboard';


import { DiaryHeader } from './components/DiaryHeader';
import { ClassFeed } from './components/ClassFeed';
import { AttendanceCard } from './components/AttendanceCard';
import { MealsSection } from './components/MealsSection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { TeacherNoteCard } from './components/TeacherNoteCard';
import { NewsfeedPopup } from './components/ClassFeed/components/NewsfeedPopup';
import { ImageZoomModal } from './components/ImageZoomModal';

function getDiaryStatus(selectedDate: Date): { title: string; description: string } {
  const now = new Date();
  const isToday =
    selectedDate.getDate() === now.getDate() &&
    selectedDate.getMonth() === now.getMonth() &&
    selectedDate.getFullYear() === now.getFullYear();

  if (!isToday) {
    return {
      title: 'Một ngày học tập và vui chơi của bé đã khép lại',
      description: 'Các hoạt động tại trường đã hoàn thành. Ba mẹ có thể trò chuyện cùng con về các trải nghiệm thú vị ngày hôm nay nhé!',
    };
  }

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const timeVal = hours * 60 + minutes;

  if (timeVal >= 450 && timeVal < 510) {
    return {
      title: 'Chào buổi sáng ba mẹ! Bé đã sẵn sàng cho ngày mới chưa?',
      description: 'Bé đang tham gia hoạt động đón trẻ và tập bài dân vũ khởi động ngày mới cùng các bạn.',
    };
  }
  if (timeVal >= 510 && timeVal < 675) {
    return {
      title: 'Bé đang trong các hoạt động học tập buổi sáng',
      description: 'Các bạn nhỏ đang nạp năng lượng với suất ăn dinh dưỡng và tham gia các bài học khám phá, vui chơi theo lịch trình.',
    };
  }
  if (timeVal >= 675 && timeVal < 840) {
    return {
      title: 'Đến giờ ăn trưa và nghỉ ngơi của các bé rồi',
      description: 'Sau giờ ăn trưa, không gian lớp học được giữ yên tĩnh để các bé chìm vào giấc ngủ ngon, hồi phục năng lượng.',
    };
  }
  if (timeVal >= 840 && timeVal < 960) {
    return {
      title: 'Bé đã thức giấc và bắt đầu các hoạt động chiều',
      description: 'Bé đang thưởng thức suất ăn nhẹ xế chiều và tham gia hoạt động kể chuyện, xem phim tư liệu hoặc năng khiếu.',
    };
  }
  if (timeVal >= 960 && timeVal < 1020) {
    return {
      title: 'Lớp học đang chuẩn bị cho giờ tan trường',
      description: 'Giáo viên đang hỗ trợ các bé vệ sinh cá nhân, dọn dẹp balo và đồ dùng cá nhân để chuẩn bị đợi ba mẹ đón.',
    };
  }
  if (timeVal >= 1020 && timeVal < 1140) {
    return {
      title: 'Giờ tan học đã đến!',
      description: 'Ba mẹ nhớ chú ý an toàn khi di chuyển đến trường đón bé nhé. Chúc gia đình mình một buổi tối vui vẻ!',
    };
  }
  return {
    title: 'Một ngày học tập và vui chơi của bé đã khép lại',
    description: 'Các hoạt động tại trường đã hoàn thành. Ba mẹ có thể trò chuyện cùng con về các trải nghiệm thú vị ngày hôm nay nhé!',
  };
}

export function ParentDiary() {
  const { selectedDate, setSelectedDate, selectedDateStr } = useDateSelector();
  const diaryStatus = getDiaryStatus(selectedDate);

  const [isNewsfeedOpen, setIsNewsfeedOpen] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<{ url: string; caption?: string } | null>(null);

  const {
    activeStudent,
    loading,
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
        <ClassFeed
          newsfeeds={newsfeeds}
          onViewAll={() => setIsNewsfeedOpen(true)}
          onZoomImage={handleZoomImage}
        />

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
                diaryTitle={diaryStatus.title}
                diaryDescription={diaryStatus.description}
                onZoomImage={handleZoomImage}
              />

              <S.TwoCol>
                <MealsSection menu={dailyMenu} activity={dailyActivity} />
                <ActivitiesSection activity={dailyActivity} />
              </S.TwoCol>

              <TeacherNoteCard
                teacherName={teacherNoteName}
                teacherNote={teacherNoteBody}
                className={activeStudent.className}
                teacherGender={leadTeacher?.gender}
              />
            </>
          )}
        </S.ColRight>
      </S.JournalGrid>

      <NewsfeedPopup
        isOpen={isNewsfeedOpen}
        onClose={() => setIsNewsfeedOpen(false)}
        newsfeeds={newsfeeds}
        onZoomImage={(url) => { handleZoomImage(url); }}
      />

      <ImageZoomModal
        imageUrl={zoomedImage?.url || null}
        caption={zoomedImage?.caption}
        onClose={() => {
          setZoomedImage(null);
        }}
      />
    </S.PageWrap>
  );
}
