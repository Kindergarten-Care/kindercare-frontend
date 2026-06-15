import React, { useState } from 'react';
import * as S from './styles';
import { NotificationDropdown } from './components/NotificationDropdown';
import { useRouter } from '@/i18n/routing';

interface TopAppBarProps {
  fullName: string;
  roleTitle: string;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({ fullName, roleTitle }) => {
  const router = useRouter();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const today = new Date();
  const dateString = today.toLocaleDateString('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <S.HeaderContainer>
      <S.GreetingSection>
        <S.GreetingTitle>Chào buổi sáng, {fullName}! ☀️</S.GreetingTitle>
        <S.GreetingDate>{dateString}</S.GreetingDate>
      </S.GreetingSection>
      
      <S.ActionsSection>
        <S.NotificationWrapper>
          <S.NotificationButton onClick={() => setIsNotifOpen(!isNotifOpen)}>
            🔔
            <S.NotificationBadge />
          </S.NotificationButton>
          {isNotifOpen && <NotificationDropdown onClose={() => setIsNotifOpen(false)} />}
        </S.NotificationWrapper>
        <S.ProfileSection onClick={() => router.push('/profile')} style={{ cursor: 'pointer' }}>
          <S.Avatar>
            <img src="https://ui-avatars.com/api/?name=Teacher&background=dcfce7&color=0e793c" alt="avatar" />
          </S.Avatar>
          <S.ProfileInfo>
            <S.ProfileName>{fullName}</S.ProfileName>
            <S.ProfileRole>{roleTitle}</S.ProfileRole>
          </S.ProfileInfo>
        </S.ProfileSection>
      </S.ActionsSection>
    </S.HeaderContainer>
  );
};
