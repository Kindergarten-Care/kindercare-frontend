'use client';

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
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <S.LayoutContainer>
      <TeacherSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {isSidebarOpen && (
        <S.SidebarOverlay onClick={() => setIsSidebarOpen(false)} />
      )}
      
      <S.MainContent>
        <TopAppBar 
          fullName={fullName} 
          roleTitle={roleTitle} 
          onMenuClick={() => setIsSidebarOpen(true)} 
        />
        <S.PageContent>
          {children}
        </S.PageContent>
      </S.MainContent>
    </S.LayoutContainer>
  );
};

