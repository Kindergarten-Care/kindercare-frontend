'use client';

import React, { useMemo } from 'react';
import * as S from './styles';
import { useClassSchedule, useClassMenu } from '@/hooks/useTeacherQueries';

interface TimelineWidgetProps {
  classId?: number | null;
}

interface TimelineItemParsed {
  time: string; // HH:mm
  title: string;
  sub: string;
  timestamp: number; // original unix timestamp
  statusFromDb?: string; // Status from backend API
}

export const TimelineWidget: React.FC<TimelineWidgetProps> = ({ classId }) => {
  const { data: scheduleData, isLoading: isLoadingSchedule } = useClassSchedule(classId || undefined);
  const { data: menuData, isLoading: isLoadingMenu } = useClassMenu(classId || undefined);

  // Parse unix timestamp (seconds) or string to HH:mm string in UTC+7
  const formatTimeUTC7 = (val: any): string => {
    if (!val) return '...';
    let d: Date;
    if (typeof val === 'number') {
      d = new Date(val * 1000);
    } else {
      // If it's a string, try parsing as int or assume it's "HH:mm"
      const parsed = parseInt(val, 10);
      if (parsed > 100000) {
        d = new Date(parsed * 1000);
      } else if (String(val).includes(':')) {
        return String(val).substring(0, 5);
      } else {
        return String(val);
      }
    }
    
    // Format to HH:mm in Asia/Ho_Chi_Minh
    return d.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimestamp = (val: any): number => {
    if (typeof val === 'number') return val;
    const parsed = parseInt(val, 10);
    if (parsed > 100000) return parsed;
    return 0;
  };

  const timelineItems = useMemo(() => {
    if (!scheduleData && !menuData) return [];

    const items: TimelineItemParsed[] = [];
    
    // Parse schedule items
    if (scheduleData && Array.isArray(scheduleData)) {
      scheduleData.forEach((s: any) => {
        if (s.startTime) {
          items.push({
            time: formatTimeUTC7(s.startTime),
            title: s.activityName,
            sub: s.description || s.details || 'Hoạt động theo lịch',
            timestamp: getTimestamp(s.startTime),
            statusFromDb: s.status,
          });
        }
      });
    }

    // Parse menu items
    if (menuData && Array.isArray(menuData)) {
      menuData.forEach((m: any) => {
        if (m.mealTime) {
          items.push({
            time: formatTimeUTC7(m.mealTime),
            title: m.mealType === 'Breakfast' ? 'Ăn sáng' : m.mealType === 'Lunch' ? 'Ăn trưa' : m.mealType === 'Snack' ? 'Ăn xế' : 'Bữa ăn',
            sub: m.foodName,
            timestamp: getTimestamp(m.mealTime),
          });
        }
      });
    }

    // Sort chronologically
    return items.sort((a, b) => a.timestamp - b.timestamp);
  }, [scheduleData, menuData]);

  const getStatus = (itemTimeStr: string, itemTimestamp: number, dbStatus?: string): 'done' | 'current' | 'next' => {
    // 1. Explicit DB Status overrides
    if (dbStatus === 'COMPLETED' || dbStatus === 'Xong') return 'done';
    if (dbStatus === 'IN_PROGRESS' || dbStatus === 'Đang diễn ra') return 'current';

    // Current time in UTC+7
    const nowUTC7Str = new Date().toLocaleTimeString('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
    
    const [nowH, nowM] = nowUTC7Str.split(':').map(Number);
    const currentMins = nowH * 60 + nowM;
    
    const [itemH, itemM] = itemTimeStr.split(':').map(Number);
    let itemMins = itemH * 60 + itemM;
    if (isNaN(itemMins)) itemMins = 0;
    
    // 2. If we have a DB status explicitly pending, prevent it from faking "done".
    // Show as "current" if it's time to do it or overdue.
    if (dbStatus === 'PENDING' || dbStatus === 'Chưa diễn ra') {
      if (currentMins >= itemMins - 15) return 'current';
      return 'next';
    }

    // 3. Fallback pure time-based logic (for Menu items which have no status)
    if (currentMins > itemMins + 45) return 'done';
    if (currentMins >= itemMins - 15 && currentMins <= itemMins + 45) return 'current';
    return 'next';
  };

  const getPillLabel = (status: 'done' | 'current' | 'next'): string => {
    switch (status) {
      case 'done': return 'Đã xong';
      case 'current': return 'Đang diễn ra';
      case 'next': return 'Tiếp theo';
    }
  };

  const getDotColor = (status: 'done' | 'current' | 'next'): string => {
    switch (status) {
      case 'done': return '#A7C9B6';
      case 'current': return '#005A36';
      case 'next': return '#D1D5DB';
    }
  };

  const isLoading = isLoadingSchedule || isLoadingMenu;

  return (
    <S.WidgetContainer>
      <S.HeaderRow>
        <S.WidgetTitle>Lịch sinh hoạt hôm nay</S.WidgetTitle>
        <S.StatusPill>
          <S.StatusDot />
          {isLoading ? 'Đang tải...' : 'Hôm nay'}
        </S.StatusPill>
      </S.HeaderRow>

      <S.TimelineList>
        {isLoading ? (
          <div style={{ color: '#9CA3AF', padding: '20px', textAlign: 'center', fontSize: '13px', fontWeight: 600 }}>
            Đang tải dữ liệu lịch trình...
          </div>
        ) : timelineItems.length === 0 ? (
          <div style={{ color: '#9CA3AF', padding: '20px', textAlign: 'center', fontSize: '13px', fontWeight: 600 }}>
            Chưa có lịch sinh hoạt cho lớp học này.
          </div>
        ) : (
          timelineItems.map((t, idx) => {
            const status = getStatus(t.time, t.timestamp, t.statusFromDb);
            const isNext = status === 'next';
            const isCurrent = status === 'current';
            const dotColor = getDotColor(status);
            const showLine = idx < timelineItems.length - 1;

            return (
              <S.TimelineItem key={idx}>
                <S.TimeLabel $isNext={isNext}>{t.time}</S.TimeLabel>
                <S.DotCol>
                  <S.CircleDot $dotColor={dotColor}>
                    {isCurrent && <S.PulseCircle />}
                  </S.CircleDot>
                  {showLine && <S.VerticalLine />}
                </S.DotCol>
                <S.ActivityContent>
                  <S.InfoBlock>
                    <S.ActivityTitle $isNext={isNext}>{t.title}</S.ActivityTitle>
                    <S.ActivitySub>{t.sub}</S.ActivitySub>
                  </S.InfoBlock>
                  <S.PillBadge $pillStyle={status}>
                    {getPillLabel(status)}
                  </S.PillBadge>
                </S.ActivityContent>
              </S.TimelineItem>
            );
          })
        )}
      </S.TimelineList>
    </S.WidgetContainer>
  );
};
export default TimelineWidget;
