'use client';

import React from 'react';
import * as S from './styles';
import { useChildProfile } from './hooks/useChildProfile';
import { ChildInfoSection } from './components/ChildInfoSection';
import { FamilySection } from './components/FamilySection';
import { HomeroomTeacherSection } from './components/HomeroomTeacherSection';

export function ChildProfile() {
  const {
    loading,
    activeStudent,
    relatives,
    teacherDisplayName,
    leadTeacher,
    age,
    avatarInitial,
    dobFormatted,
    admissionFormatted,
  } = useChildProfile();

  if (loading || !activeStudent) {
    return (
      <S.PageWrap>
        <div style={{ padding: 40, color: '#6B7280' }}>Đang tải hồ sơ...</div>
      </S.PageWrap>
    );
  }

  return (
    <S.PageWrap>
      <S.PageHeader>
        <div>
          <S.PageTitle>Hồ sơ bé</S.PageTitle>
          <S.PageSub>Thông tin cá nhân của bé và gia đình</S.PageSub>
        </div>
      </S.PageHeader>

      <S.ProfileGrid>
        <S.ColLeft>
          <ChildInfoSection
            student={activeStudent}
            teacherDisplayName={teacherDisplayName}
            avatarInitial={avatarInitial}
            age={age}
            dobFormatted={dobFormatted}
            admissionFormatted={admissionFormatted}
          />
          <FamilySection relatives={relatives} />
        </S.ColLeft>

        <S.ColRight>
          {leadTeacher && (
            <HomeroomTeacherSection teacher={leadTeacher} className={activeStudent.className} />
          )}
        </S.ColRight>
      </S.ProfileGrid>
    </S.PageWrap>
  );
}