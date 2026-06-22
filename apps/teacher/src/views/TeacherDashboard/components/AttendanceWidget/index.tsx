'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import { AttendanceService } from '@/services/attendance';
import { Student } from '@/config/types/attendance';
import * as S from './styles';

const getTodayDateString = (): string => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

interface AttendanceWidgetProps {
  students?: Student[];
  className?: string;
  loading?: boolean;
}

export const AttendanceWidget: React.FC<AttendanceWidgetProps> = ({
  students: propStudents,
  className: propClassName,
  loading: propLoading,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [className, setClassName] = useState<string>('');
  const [students, setStudents] = useState<Student[]>([]);

  const fetchAttendance = async () => {
    if (propStudents !== undefined) {
      setStudents(propStudents);
      setClassName(propClassName || '');
      setLoading(propLoading || false);
      return;
    }
    try {
      setLoading(true);
      const classes = await AttendanceService.getTeacherClasses();
      if (classes.length > 0) {
        const firstClass = classes[0];
        setClassName(firstClass.className);
        
        const todayStr = getTodayDateString();
        const data = await AttendanceService.getDailyAttendance(firstClass.classId, todayStr);
        setStudents(data);
      }
    } catch (error) {
      console.error('Failed to load dashboard attendance data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [propStudents, propClassName, propLoading]);

  const tot = students.length || 42;
  const presentStudents = students.filter(s => s.attendanceStatus === 'PRESENT' && !s.hasActiveLeaveRequest);
  const late = presentStudents.filter(s => s.arrivalTime && s.arrivalTime !== '--:--' && s.arrivalTime > '08:00').length;
  const present = presentStudents.length - late;
  const absent = tot - present - late;

  const a1 = tot > 0 ? Math.round((present / tot) * 360) : 0;
  const a2 = tot > 0 ? a1 + Math.round((late / tot) * 360) : 0;
  const donutGradient = tot > 0 
    ? `conic-gradient(#005A36 0deg ${a1}deg, #D97706 ${a1}deg ${a2}deg, #DC2626 ${a2}deg 360deg)`
    : '#E2E8F0';
  const rate = tot > 0 ? Math.round(((present + late) / tot) * 100) : 0;

  if (loading) {
    return (
      <S.WidgetContainer style={{ minHeight: '230px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '30px', height: '30px', border: '3px solid #005A36', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          <span style={{ fontSize: '14px', color: '#6B7280', fontWeight: '500' }}>Đang tải sĩ số...</span>
          <style dangerouslySetInnerHTML={{ __html: '@keyframes spin { to { transform: rotate(360deg); } }' }} />
        </div>
      </S.WidgetContainer>
    );
  }

  return (
    <S.WidgetContainer>
      <S.HeaderRow>
        <S.WidgetTitle>Điểm danh hôm nay</S.WidgetTitle>
        <S.DetailLink onClick={() => router.push('/attendance')}>
          Chi tiết →
        </S.DetailLink>
      </S.HeaderRow>

      <S.LayoutGrid>
        <S.DonutOuter $donutGradient={donutGradient}>
          <S.DonutInner>
            <S.DonutRate>{rate}%</S.DonutRate>
            <S.DonutLabel>Chuyên cần</S.DonutLabel>
          </S.DonutInner>
        </S.DonutOuter>

        <S.StatsBlock>
          <S.ClassTotalRow>
            <S.TotalLabel>Sĩ số lớp {className || 'Mầm 1'}</S.TotalLabel>
            <S.TotalNumber>{tot}</S.TotalNumber>
          </S.ClassTotalRow>

          <S.StatRow>
            <S.ColorDot $color="#005A36" />
            <S.StatName>Có mặt</S.StatName>
            <S.StatCount $color="#005A36">{present}</S.StatCount>
          </S.StatRow>

          <S.StatRow>
            <S.ColorDot $color="#D97706" />
            <S.StatName>Đi muộn</S.StatName>
            <S.StatCount $color="#92400E">{late}</S.StatCount>
          </S.StatRow>

          <S.StatRow>
            <S.ColorDot $color="#DC2626" />
            <S.StatName>Vắng mặt</S.StatName>
            <S.StatCount $color="#DC2626">{absent}</S.StatCount>
          </S.StatRow>
        </S.StatsBlock>
      </S.LayoutGrid>
    </S.WidgetContainer>
  );
};
export default AttendanceWidget;
