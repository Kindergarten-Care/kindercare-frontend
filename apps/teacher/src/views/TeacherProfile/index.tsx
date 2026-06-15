import React from 'react';
import * as S from './styles';
import { ProfileSummaryCard } from './components/ProfileSummaryCard';
import { TabbedDetails } from './components/TabbedDetails';
import { AuthUser } from '@/contexts/AuthContext';
import { useRouter } from '@/i18n/routing';
import { ArrowLeft } from 'lucide-react';

interface TeacherProfileViewProps {
  user: AuthUser;
}

export const TeacherProfileView: React.FC<TeacherProfileViewProps> = ({ user }) => {
  const router = useRouter();

  return (
    <S.ProfileContainer>
      <S.ProfileHeader>
        <S.HeaderLeft>
          <S.BackButton onClick={() => router.back()}>
            <ArrowLeft size={16} />
            Quay lại
          </S.BackButton>
          <S.ProfileTitle>Chi tiết Hồ sơ</S.ProfileTitle>
        </S.HeaderLeft>
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
