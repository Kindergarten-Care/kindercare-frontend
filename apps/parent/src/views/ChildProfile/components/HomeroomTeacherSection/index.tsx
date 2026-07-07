'use client';

import React from 'react';
import { TeacherDomainModel } from '@/config/types/student';
import { getAvatarGradient, getInitials } from '@/utils/Student/Avatar';
import { IconPhoneCall, IconMail, IconClassCap, IconTeacher } from '../../icons';
import * as S from './styles';

interface HomeroomTeacherSectionProps {
  teacher: TeacherDomainModel;
  className: string;
}

export const HomeroomTeacherSection: React.FC<HomeroomTeacherSectionProps> = ({
  teacher,
  className,
}) => (
  <S.Section>
    <S.SecHead>
      <S.SecIcon $bg="#E3EDFD" $fg="#2563EB"><IconTeacher size={18} /></S.SecIcon>
      <S.SecTitle>Giáo viên chủ nhiệm</S.SecTitle>
    </S.SecHead>

    <S.RelCard $c="#2563EB">
      <S.RelHead $tint="#E3EDFD">
        <S.RelAvatar $gradient={getAvatarGradient(teacher.teacherId)}>
          {getInitials(teacher.fullName)}
        </S.RelAvatar>
        <S.RelId>
          <S.RelRole>{teacher.roleInClass || 'Giáo viên'}</S.RelRole>
          <S.RelName>{teacher.fullName}</S.RelName>
          <S.RelJob><IconClassCap size={13} /> {className}</S.RelJob>
        </S.RelId>
      </S.RelHead>
      <S.RelBody>
        <S.RelItem>
          <S.RelItemIcon><IconPhoneCall size={17} /></S.RelItemIcon>
          <S.RelItemMain>
            <S.RelItemKey>Số điện thoại</S.RelItemKey>
            <S.RelItemValue>{teacher.phoneNumber || '--'}</S.RelItemValue>
          </S.RelItemMain>
        </S.RelItem>
        <S.RelItem>
          <S.RelItemIcon><IconMail size={17} /></S.RelItemIcon>
          <S.RelItemMain>
            <S.RelItemKey>Email</S.RelItemKey>
            <S.RelItemValue>{teacher.email || '--'}</S.RelItemValue>
          </S.RelItemMain>
        </S.RelItem>
      </S.RelBody>
      <S.RelActions>
        <S.RelActionBtn $variant="call" href={teacher.phoneNumber ? `tel:${teacher.phoneNumber}` : undefined}>
          <IconPhoneCall size={15} /> Gọi
        </S.RelActionBtn>
        <S.RelActionBtn $variant="mail" href={teacher.email ? `mailto:${teacher.email}` : undefined}>
          <IconMail size={15} /> Nhắn tin Email
        </S.RelActionBtn>
      </S.RelActions>
    </S.RelCard>
  </S.Section>
);