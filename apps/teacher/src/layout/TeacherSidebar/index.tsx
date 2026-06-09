import React from 'react';
import * as S from './styles';

export const TeacherSidebar: React.FC = () => {
  return (
    <S.SidebarContainer>
      <S.LogoContainer>
        {/* Placeholder for Logo */}
        <h2>KinderCare</h2>
      </S.LogoContainer>
      <S.NavList>
        <S.NavItem active>Tổng quan</S.NavItem>
        <S.NavItem>Lớp học</S.NavItem>
        <S.NavItem>Học sinh</S.NavItem>
        <S.NavItem>Nhắn tin</S.NavItem>
      </S.NavList>
    </S.SidebarContainer>
  );
};
