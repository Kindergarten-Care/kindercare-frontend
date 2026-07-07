'use client';

import React from 'react';
import { StudentDomainModel } from '@/config/types/student';
import { getAvatarGradient } from '@/utils/Student/Avatar';
import {
  IconCake, IconGender, IconIdCard, IconEnroll, IconStatusCheck, IconClassCap, IconFamily,
} from '../../icons';
import * as S from './styles';

interface ChildInfoSectionProps {
  student: StudentDomainModel;
  teacherDisplayName: string | null;
  avatarInitial: string;
  age: number | null;
  dobFormatted: string;
  admissionFormatted: string;
}

export const ChildInfoSection: React.FC<ChildInfoSectionProps> = ({
  student,
  teacherDisplayName,
  avatarInitial,
  age,
  dobFormatted,
  admissionFormatted,
}) => {
  const infoRows = [
    { key: 'dob', k: 'Ngày sinh', v: age !== null ? `${dobFormatted} · ${age} tuổi` : dobFormatted, icon: <IconCake size={18} />, c: '#DB2777', tint: '#FCE7F2' },
    { key: 'gender', k: 'Giới tính', v: student.gender || '--', icon: <IconGender size={18} />, c: '#2563EB', tint: '#E3EDFD' },
    { key: 'id', k: 'Mã học sinh', v: String(student.studentId), icon: <IconIdCard size={18} />, c: '#8B5CF6', tint: '#F1ECFE' },
    { key: 'enroll', k: 'Ngày nhập học', v: admissionFormatted, icon: <IconEnroll size={18} />, c: '#005A36', tint: '#E6F3ED' },
    { key: 'class', k: 'Lớp đang học', v: teacherDisplayName ? `${student.className} · GVCN ${teacherDisplayName}` : student.className, icon: <IconClassCap size={18} />, c: '#0E8A7D', tint: '#D7F0EC' },
    { key: 'status', k: 'Trạng thái', v: student.enrollmentStatus === 'Active' ? 'Đang theo học' : (student.enrollmentStatus || '--'), icon: <IconStatusCheck size={18} />, c: '#005A36', tint: '#E6F3ED' },
  ];

  return (
    <S.Section>
      <S.SecHead>
        <S.SecIcon><IconFamily size={18} /></S.SecIcon>
        <S.SecTitle>Thông tin của bé</S.SecTitle>
      </S.SecHead>
      <S.ChildBanner>
        <S.ChildIdentity>
          <S.ChildAvatar $gradient={getAvatarGradient(student.studentId)}>
            {student.avatarUrl ? (
              <img src={student.avatarUrl} alt={student.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
            ) : (
              avatarInitial
            )}
          </S.ChildAvatar>
          <div style={{ minWidth: 0, flex: 1 }}>
            <S.ChildName>{student.fullName}</S.ChildName>
          </div>
        </S.ChildIdentity>

        <S.InfoDivider />

        <S.InfoGrid>
          {infoRows.map(row => (
            <S.InfoRow key={row.key} $c={row.c} $tint={row.tint}>
              <S.InfoIcon>{row.icon}</S.InfoIcon>
              <S.InfoMain>
                <S.InfoKey>{row.k}</S.InfoKey>
                <S.InfoValue>{row.v}</S.InfoValue>
              </S.InfoMain>
            </S.InfoRow>
          ))}
        </S.InfoGrid>
      </S.ChildBanner>
    </S.Section>
  );
};