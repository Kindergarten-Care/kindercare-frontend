import React from 'react';
import * as S from './styles';
import { AttendanceStats } from '@/config/types/dashboard';

interface AttendanceStatsWidgetProps {
  stats: AttendanceStats;
}

const AttendanceStatsWidget: React.FC<AttendanceStatsWidgetProps> = ({ stats }) => {
  return (
    <S.Card>
      <S.SectionHead>
        <S.SectionTitle>
          <span>⭐</span> Tỷ lệ chuyên cần
        </S.SectionTitle>
      </S.SectionHead>
      
      <S.MainStat>
        <strong>{stats.percentage}%</strong>
        <span>tháng này</span>
      </S.MainStat>

      <S.StatGrid>
        <S.StatBox $type="present">
          <strong>{stats.present}</strong>
          <span>Đi học</span>
        </S.StatBox>
        <S.StatBox $type="absent">
          <strong>{stats.absent}</strong>
          <span>Vắng mặt</span>
        </S.StatBox>
        <S.StatBox $type="excused">
          <strong>{stats.excused}</strong>
          <span>Có phép</span>
        </S.StatBox>
      </S.StatGrid>
    </S.Card>
  );
};

export default AttendanceStatsWidget;
