import React from 'react';
import * as S from './styles';

export const AttendanceWidget: React.FC = () => {
  return (
    <S.WidgetContainer>
      <S.WidgetHeader>
        <S.WidgetTitle>Sĩ số lớp: 20 bé</S.WidgetTitle>
        <S.MoreIcon>⋮</S.MoreIcon>
      </S.WidgetHeader>
      
      <S.ChartContainer>
        {/* Placeholder for SVG Circle Chart */}
        <S.ChartCircle>
          <S.ChartNumber>18</S.ChartNumber>
          <S.ChartLabel>CÓ MẶT</S.ChartLabel>
        </S.ChartCircle>
      </S.ChartContainer>

      <S.StatsList>
        <S.StatItem variant="present">
          <S.StatInfo>
            <S.Dot color="#0e793c" />
            <S.StatName>Có mặt</S.StatName>
          </S.StatInfo>
          <S.StatValue bg="#97f7ac" color="#00210b">18</S.StatValue>
        </S.StatItem>
        <S.StatItem variant="absent-excused">
          <S.StatInfo>
            <S.Dot color="#f59e0b" />
            <S.StatName>Vắng có phép</S.StatName>
          </S.StatInfo>
          <S.StatValue bg="#ffedd5" color="#9a3412">2</S.StatValue>
        </S.StatItem>
        <S.StatItem variant="absent-unexcused">
          <S.StatInfo>
            <S.Dot color="#ba1a1a" />
            <S.StatName>Vắng không phép</S.StatName>
          </S.StatInfo>
          <S.StatValue bg="#ffdad6" color="#93000a">0</S.StatValue>
        </S.StatItem>
      </S.StatsList>

      <S.ActionButton>Điểm danh ngay</S.ActionButton>
    </S.WidgetContainer>
  );
};
