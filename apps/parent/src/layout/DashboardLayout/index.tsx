'use client';

import React, { useState } from 'react';
import ParentSidebar from './ParentSidebar';
import * as S from './styles';
import { IconSearch, IconBell, IconSettings } from '@/assets/icons/dashboard';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Chào buổi sáng';
  if (h < 18) return 'Chào buổi chiều';
  return 'Chào buổi tối';
}

function getFormattedDate(): string {
  return new Date().toLocaleDateString('vi-VN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <S.DashboardWrapper $collapsed={collapsed}>
      <ParentSidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />

      <S.MainContent>
        <S.HeaderBand>
          <S.HeaderInner>
            <S.Greet>
              <S.GreetName>{getGreeting()} 👋</S.GreetName>
              <S.GreetDate>{getFormattedDate()}</S.GreetDate>
            </S.Greet>

            <S.Actions>
              <S.SearchBar>
                <IconSearch size={16} color="#9ca3af" />
                <input placeholder="Tìm kiếm..." />
              </S.SearchBar>

              <S.IconBtn title="Thông báo">
                <IconBell size={18} />
                <S.NotifDot />
              </S.IconBtn>

              <S.IconBtn title="Cài đặt">
                <IconSettings size={18} />
              </S.IconBtn>

              <S.AvatarWrap>
                <S.Avatar>M</S.Avatar>
                <S.AvatarOnline />
              </S.AvatarWrap>
            </S.Actions>
          </S.HeaderInner>
        </S.HeaderBand>

        <S.PageArea>{children}</S.PageArea>
      </S.MainContent>
    </S.DashboardWrapper>
  );
};

export default DashboardLayout;
