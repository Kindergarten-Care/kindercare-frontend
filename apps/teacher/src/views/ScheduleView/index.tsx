import React, { useState } from 'react';
import * as S from './styles';
import { useClassSchedule } from '@/hooks/useTeacherQueries';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar as CalendarIcon } from 'lucide-react';

export const ScheduleView: React.FC = () => {
  const { user } = useAuth();
  const classId = user?.classIds?.[0];
  
  // Format local date to YYYY-MM-DD for input default
  const getLocalDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const [selectedDateStr, setSelectedDateStr] = useState(getLocalDateString());

  // Convert "YYYY-MM-DD" to timestamp at 00:00:00
  const dateSeconds = Math.floor(new Date(`${selectedDateStr}T00:00:00`).getTime() / 1000);

  const { data: schedule, isLoading } = useClassSchedule(classId, dateSeconds);

  return (
    <S.Container>
      <S.Header>
        <S.Title>
          <CalendarIcon size={28} color="#005A36" />
          Lịch trình sinh hoạt
        </S.Title>
        <S.DateSelector 
          type="date" 
          value={selectedDateStr}
          onChange={(e) => setSelectedDateStr(e.target.value)}
        />
      </S.Header>

      <S.TimelineWrapper>
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>Đang tải lịch trình...</div>
        ) : (!schedule || schedule.length === 0) ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>Không có lịch trình cho ngày này.</div>
        ) : (
          <>
            <S.TimelineLine />
            {schedule.map(item => (
              <S.TimelineItem key={item.dailyScheduleId}>
                <S.TimeColumn>
                  <S.TimeText>{item.startTime}</S.TimeText>
                </S.TimeColumn>
                
                <S.TimelineDot $type={item.activityType} />
                
                <S.ContentBox>
                  <S.ActivityTitle>{item.activityName}</S.ActivityTitle>
                  {item.details && <S.ActivityDesc>{item.details}</S.ActivityDesc>}
                  <S.TagsRow>
                    {item.location && <S.Tag>{item.location}</S.Tag>}
                    {item.activityType && <S.Tag>{item.activityType}</S.Tag>}
                  </S.TagsRow>
                </S.ContentBox>
              </S.TimelineItem>
            ))}
          </>
        )}
      </S.TimelineWrapper>
    </S.Container>
  );
};
