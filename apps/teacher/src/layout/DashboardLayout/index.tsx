'use client';

import React from 'react';
import * as S from './styles';
import { TeacherSidebar } from '../TeacherSidebar';
import { TopAppBar } from '../TopAppBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <S.LayoutContainer $isCollapsed={isCollapsed}>
      <TeacherSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />
      
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
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </S.LayoutContainer>
  );
};

