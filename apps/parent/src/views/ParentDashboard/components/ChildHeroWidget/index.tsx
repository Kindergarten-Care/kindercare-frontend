'use client';

import React from 'react';
import * as S from './styles';
import { ChildHeroInfo } from '@/config/types/dashboard';
import { IconSchool, IconTeacher, IconPin, IconAbsence, IconChat, IconCalendar } from '@/assets/icons/dashboard';

interface ChildHeroWidgetProps {
  data: ChildHeroInfo;
  avatarGradient?: string;
  avatarInitial?: string;
  avatarUrl?: string | null;
  onAbsence?: () => void;
  onMessage?: () => void;
}

const ChildHeroWidget: React.FC<ChildHeroWidgetProps> = ({
  data,
  avatarGradient = 'linear-gradient(140deg,#0a7a4c,#005A36)',
  avatarInitial = 'BC',
  avatarUrl,
  onAbsence,
  onMessage,
}) => {
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
        <S.StatusRing>
          <S.PulseDot />
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
        <S.CheckinBadge>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#16a34a', display: 'inline-block', flexShrink: 0 }} />
          Đã đến trường · {data.checkinTime}
        </S.CheckinBadge>
      </S.Info>

      <S.Right>
        <S.BtnAbsence onClick={onAbsence}>
          <IconAbsence size={15} color="#fff" /> Báo nghỉ học
        </S.BtnAbsence>
        <S.BtnMsg onClick={onMessage}>
          <IconChat size={15} /> Nhắn giáo viên
        </S.BtnMsg>
      </S.Right>
    </S.HeroContainer>
  );
};

export default ChildHeroWidget;
