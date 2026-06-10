import React from 'react';
import * as S from './styles';
import { ProfileSummaryCard } from './components/ProfileSummaryCard';
import { TabbedDetails } from './components/TabbedDetails';
import { AuthUser } from '@/contexts/AuthContext';

interface TeacherProfileViewProps {
  user: AuthUser;
}

export const TeacherProfileView: React.FC<TeacherProfileViewProps> = ({ user }) => {
  return (
    <S.ProfileContainer>
      <S.ProfileHeader>
        <S.ProfileTitle>Chi tiết Hồ sơ</S.ProfileTitle>
      </S.ProfileHeader>

      <S.ProfileGrid>
        <S.Column1>
          <ProfileSummaryCard user={user} />
        </S.Column1>

        <S.Column2>
          <TabbedDetails user={user} />
        </S.Column2>
      </S.ProfileGrid>
    </S.ProfileContainer>
  );
};
