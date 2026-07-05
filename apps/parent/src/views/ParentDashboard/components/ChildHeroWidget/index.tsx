'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import * as S from './styles';
import { ChildHeroInfo } from '@/config/types/dashboard';
import { IconSchool, IconTeacher, IconPin, IconAbsence, IconChat, IconCalendar } from '@/assets/icons/dashboard';

const IconQrCode: React.FC<{ size?: number; color?: string }> = ({ size = 15, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <path d="M7 17h.01M17 17h.01M17 7h.01M7 7h.01" />
  </svg>
);

interface ChildHeroWidgetProps {
  data: ChildHeroInfo;
  avatarGradient?: string;
  avatarInitial?: string;
  avatarUrl?: string | null;
  onAbsence?: () => void;
  onMessage?: () => void;
  onCheckinQr?: () => void;
}

const ChildHeroWidget: React.FC<ChildHeroWidgetProps> = ({
  data,
  avatarGradient = 'linear-gradient(140deg,#0a7a4c,#005A36)',
  avatarInitial = 'BC',
  avatarUrl,
  onAbsence,
  onMessage,
  onCheckinQr,
}) => {
  const t = useTranslations('Dashboard');
  return (
    <S.HeroContainer>
      <S.AvWrap>
        <S.Av $gradient={avatarGradient}>
          {avatarUrl ? (
            <img src={avatarUrl} alt={data.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
          ) : (
            avatarInitial
          )}
        </S.Av>
        <S.StatusRing $status={data.attendanceStatus}>
          <S.PulseDot $status={data.attendanceStatus} />
        </S.StatusRing>
      </S.AvWrap>

      <S.Info>
        <S.Name>{data.name}</S.Name>
        <S.MetaRow>
          <S.Chip><IconSchool size={13} /> {data.className}</S.Chip>
          <S.Chip><IconTeacher size={13} /> {data.teacher}</S.Chip>
          {data.academicYear && <S.Chip><IconCalendar size={13} /> {data.academicYear}</S.Chip>}
          <S.Chip><IconPin size={13} /> {data.branch}</S.Chip>
        </S.MetaRow>
        <S.CheckinBadge $status={data.attendanceStatus}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'currentColor', display: 'inline-block', flexShrink: 0 }} />
          {data.checkinTime} · {data.checkinSub}
        </S.CheckinBadge>
      </S.Info>

      <S.Right>
        <S.BtnAbsence onClick={onAbsence}>
          <IconAbsence size={15} color="#fff" /> {t('hero.reportAbsence')}
        </S.BtnAbsence>
        <S.BtnQrCode onClick={onCheckinQr}>
          <IconQrCode size={15} /> {t('hero.qrCheckin')}
        </S.BtnQrCode>
      </S.Right>
    </S.HeroContainer>
  );
};

export default ChildHeroWidget;
