'use client';

import React from 'react';
import ParentSidebar from './ParentSidebar';
import * as S from './styles';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <S.DashboardWrapper>
      <ParentSidebar />
      <S.MainContent>
        <S.TopBar>
          <S.TopbarLeft>
            <S.TopbarGreet>Chào chị Mai 👋</S.TopbarGreet>
            <S.TopbarDate>Thứ Năm, 15 tháng 5 năm 2025</S.TopbarDate>
          </S.TopbarLeft>
          <S.TopbarRight>
            <S.SearchBar>🔍&nbsp; Tìm kiếm...</S.SearchBar>
            <S.IconBtn>
              🔔
              <S.NotifDot />
            </S.IconBtn>
          </S.TopbarRight>
        </S.TopBar>
        <S.PageArea>{children}</S.PageArea>
      </S.MainContent>
    </S.DashboardWrapper>
  );
};

export default DashboardLayout;
