'use client';

import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { IconCamera, IconPlay } from '@/assets/icons/dashboard';

interface CameraWidgetProps {
  className?: string;
  teacher?: string;
}

const CameraWidget: React.FC<CameraWidgetProps> = ({
  className = 'Lớp Hoa Hướng Dương',
  teacher = 'Cô Phạm Thị Hương',
}) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const update = (): void => {
      setTime(new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <S.Card>
      <S.CardHead>
        <S.CardTitle><IconCamera size={16} /> Camera lớp học</S.CardTitle>
      </S.CardHead>

      <S.CamFeed onClick={() => alert('Đang kết nối camera...')}>
        <S.CamGrain />
        <S.CamLive>
          <S.LiveDot />
          TRỰC TIẾP
        </S.CamLive>
        {time && <S.CamTime>{time}</S.CamTime>}
        <S.CamPlay className="play">
          <IconPlay size={22} color="var(--brand)" />
        </S.CamPlay>
        <S.CamLabel>CAM 01 — {className}</S.CamLabel>
      </S.CamFeed>

      <S.CamFoot>
        <S.OnlineDot />
        Đang trực tuyến · {teacher} phụ trách
      </S.CamFoot>
    </S.Card>
  );
};

export default CameraWidget;
