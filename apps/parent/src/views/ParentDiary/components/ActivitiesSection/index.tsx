import React from 'react';
import * as S from './styles';
import { Svg } from '../Svg';
import { DailyActivityDomainModel } from '@/config/types/dailyActivity';

interface ActivitiesSectionProps {
  activity: DailyActivityDomainModel | null;
}

function getRateType(status: string | null | undefined): 'good' | 'ok' | 'low' | 'info' {
  if (!status) return 'info';
  const s = status.trim().toLowerCase();
  if (s.includes('ngoan') || s.includes('tốt') || s.includes('tích cực') || s.includes('hết')) return 'good';
  if (s.includes('bình thường') || s.includes('ngoan') || s.includes('khá')) return 'info';
  if (s.includes('khó ngủ') || s.includes('quấy') || s.includes('chú ý')) return 'ok';
  if (s.includes('bỏ') || s.includes('không')) return 'low';
  return 'info';
}

export function ActivitiesSection({ activity }: ActivitiesSectionProps) {
  const items = [
    {
      name: 'Ngủ trưa',
      desc: 'Ngủ từ 12:00 – 14:00 (2 giờ)',
      status: activity?.napStatus || 'Chưa ghi nhận',
      bg: '#E3EDFD',
      color: '#2563EB',
      icon: <path d="M3 18v-5a3 3 0 0 1 3-3h7a4 4 0 0 1 4 4v4M3 18h18M3 18v2M21 18v2M3 13h3" />,
    },
    {
      name: 'Vệ sinh',
      status: activity?.hygieneStatus || 'Chưa ghi nhận',
      bg: '#D7F0EC',
      color: '#0E8A7D',
      icon: (
        <>
          <path d="M6 3h9a2 2 0 0 1 2 2v6H6z" />
          <path d="M6 11c0 3 2 5 5.5 5S17 14 17 11M11.5 16v5M8 21h7" />
        </>
      ),
    },
    {
      name: 'Hoạt động ngày',
      status: activity?.activityStatus || 'Chưa ghi nhận',
      bg: '#F1ECFE',
      color: '#8B5CF6',
      icon: (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M9 9.5a1.5 1.5 0 0 1 3 0c0 1.2-1.5 1.3-1.5 2.5M11.5 15h.01" />
        </>
      ),
    },
  ];

  return (
    <S.Sec>
      <S.SecHead>
        <S.SecIco style={{ background: '#E3EDFD', color: '#2563EB' }}>
          <Svg size={18}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3.5 2" />
          </Svg>
        </S.SecIco>
        <S.SecTitle>Sinh hoạt ra sao?</S.SecTitle>
      </S.SecHead>
      <S.TileCard>
        {items.map((item, i) => {
          const rateType = getRateType(item.status);
          return (
            <S.Tile key={i}>
              <S.TileIco style={{ background: item.bg, color: item.color }}>
                <Svg size={20}>{item.icon}</Svg>
              </S.TileIco>
              <S.TileBody>
                <S.TileName>{item.name}</S.TileName>
                {item.desc && <S.TileDesc>{item.desc}</S.TileDesc>}
              </S.TileBody>
              <S.Rate $type={rateType}>{item.status}</S.Rate>
            </S.Tile>
          );
        })}
      </S.TileCard>
    </S.Sec>
  );
}
