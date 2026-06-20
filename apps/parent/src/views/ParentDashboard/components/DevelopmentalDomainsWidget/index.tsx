'use client';

import React from 'react';
import * as S from './styles';
import { IconChart } from '@/assets/icons/dashboard';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

// Inline SVGs for required icons
const BarbellIcon: React.FC<IconProps> = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 12h12" />
    <path d="M6 8v8" />
    <path d="M4 10v4" />
    <path d="M18 8v8" />
    <path d="M20 10v4" />
  </svg>
);

const BrainIcon: React.FC<IconProps> = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-4.88A2.5 2.5 0 0 1 9.5 2z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-4.88A2.5 2.5 0 0 0 14.5 2z" />
  </svg>
);

const MessageSquareIcon: React.FC<IconProps> = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const HeartIcon: React.FC<IconProps> = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const PaintbrushIcon: React.FC<IconProps> = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m14 6-4-4-4 4 10 10a2 2 0 0 0 2.828-2.828L14 6z" />
    <path d="M6 21a2 2 0 0 1-2-2v-3a7 7 0 0 1 14 0v3a2 2 0 0 1-2 2H6z" />
  </svg>
);

interface DomainItem {
  id: string;
  name: string;
  score: number;
  diff: string;
  trend: 'up' | 'down';
  color: string;
  bg: string;
  Icon: React.FC<IconProps>;
}

const DOMAINS: DomainItem[] = [
  {
    id: 'physical',
    name: 'Thể chất',
    score: 7.8,
    diff: '+0.4',
    trend: 'up',
    color: '#2563eb', // Blue
    bg: '#eff6ff',
    Icon: BarbellIcon,
  },
  {
    id: 'cognitive',
    name: 'Nhận thức',
    score: 9.1,
    diff: '+0.8',
    trend: 'up',
    color: '#005A36', // Green (Brand)
    bg: '#eaf7f0', // Brand-tint
    Icon: BrainIcon,
  },
  {
    id: 'language',
    name: 'Ngôn ngữ',
    score: 9.4,
    diff: '+1.1',
    trend: 'up',
    color: '#7c3aed', // Purple
    bg: '#f5f3ff',
    Icon: MessageSquareIcon,
  },
  {
    id: 'social',
    name: 'Tình cảm – Xã hội',
    score: 8.5,
    diff: '+0.2',
    trend: 'up',
    color: '#f97316', // Orange
    bg: '#fff7ed',
    Icon: HeartIcon,
  },
  {
    id: 'aesthetic',
    name: 'Thẩm mỹ',
    score: 8.2,
    diff: '-0.1',
    trend: 'down',
    color: '#ec4899', // Pink
    bg: '#fdf2f8',
    Icon: PaintbrushIcon,
  },
];

const DevelopmentalDomainsWidget: React.FC = () => {
  return (
    <S.Card>
      <S.CardHead>
        <S.CardTitleContainer>
          <S.CardTitle>
            <IconChart size={18} color="var(--brand, #005a36)" />
            5 lĩnh vực phát triển
          </S.CardTitle>
          <S.AvgBadge>TB 8.6</S.AvgBadge>
        </S.CardTitleContainer>
        <S.DetailLink onClick={() => alert('Xem chi tiết 5 lĩnh vực phát triển')}>
          Chi tiết →
        </S.DetailLink>
      </S.CardHead>

      <S.DomainsGrid>
        {DOMAINS.map(({ id, name, score, diff, trend, color, bg, Icon }) => (
          <S.DomainCard key={id} $color={color}>
            <S.DomainHead>
              <S.DomainIcon $bg={bg} $color={color}>
                <Icon size={16} />
              </S.DomainIcon>
              <S.TrendBadge $trend={trend}>
                {trend === 'up' ? '↑' : '↓'} {diff}
              </S.TrendBadge>
            </S.DomainHead>

            <S.DomainLabel>{name}</S.DomainLabel>

            <S.ScoreRow>
              <S.ScoreValue>{score.toFixed(1)}</S.ScoreValue>
              <S.ScoreMax>/10</S.ScoreMax>
            </S.ScoreRow>

            <S.ProgressWrapper>
              <S.ProgressFill $pct={score * 10} $color={color} />
            </S.ProgressWrapper>
          </S.DomainCard>
        ))}
      </S.DomainsGrid>
    </S.Card>
  );
};

export default DevelopmentalDomainsWidget;
