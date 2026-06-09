import React from 'react';
import * as S from './styles';
import { TeacherSidebar } from '../TeacherSidebar';
import { TopAppBar } from '../TopAppBar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  fullName: string;
  roleTitle: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  fullName,
  roleTitle
}) => {
  return (
    <S.LayoutContainer>
      <TeacherSidebar />
      <S.MainContent>
        <TopAppBar fullName={fullName} roleTitle={roleTitle} />
        <S.PageContent>
          {children}
        </S.PageContent>
      </S.MainContent>
    </S.LayoutContainer>
  );
};
