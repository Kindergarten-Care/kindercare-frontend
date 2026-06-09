import React from 'react';
import * as S from './styles';

interface TopAppBarProps {
  fullName: string;
  roleTitle: string;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({ fullName, roleTitle }) => {
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
        <S.NotificationButton>
          🔔
          <S.NotificationBadge />
        </S.NotificationButton>
        <S.ProfileSection>
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
