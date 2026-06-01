"use client";
import React from 'react';
import * as S from './TrafficLoadChart.styles';

const mockData = [
  { label: 'T2', height: 40, tooltip: '1.2k' },
  { label: 'T3', height: 55 },
  { label: 'T4', height: 35 },
  { label: 'T5', height: 80 },
  { label: 'T6', height: 65 },
  { label: 'T7', height: 95, tooltip: '3.8k', active: true },
  { label: 'CN', height: 70 },
];

export const TrafficLoadChart: React.FC = () => {
  return (
    <S.Wrapper>
      <S.Header>
        <S.TitleContainer>
          <S.Title>Tải lượng truy cập hệ thống</S.Title>
          <S.Subtitle>Lưu lượng request / giây (7 ngày qua)</S.Subtitle>
        </S.TitleContainer>
        <S.TabsContainer>
          <S.TabButton>Ngày</S.TabButton>
          <S.TabButton $active>Tuần</S.TabButton>
        </S.TabsContainer>
      </S.Header>

      <S.ChartArea>
        <S.GridLines>
          <S.Divider />
          <S.Divider />
          <S.Divider />
          <S.Divider />
        </S.GridLines>

        <S.BarsContainer>
          {mockData.map((data, index) => (
            <S.Bar key={index} $heightPct={data.height} $active={data.active}>
              {data.tooltip && (
                <S.Tooltip>{data.tooltip}</S.Tooltip>
              )}
            </S.Bar>
          ))}
        </S.BarsContainer>

        <S.XAxisLabels>
          {mockData.map((data, index) => (
            <S.AxisLabel key={index}>{data.label}</S.AxisLabel>
          ))}
        </S.XAxisLabels>
      </S.ChartArea>
    </S.Wrapper>
  );
};
