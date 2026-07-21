'use client';

import React from 'react';
import * as S from './styles';
import { TeacherSidebar } from '../TeacherSidebar';
import { TopAppBar } from '../TopAppBar';
import { ToastContainer } from '@kindercare/ui';
import { useTeacherNotifications } from '@/hooks/useTeacherNotifications';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}) => {
  const { user, isLoading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  // Enable smart notifications polling
  const { renderDetailModal } = useTeacherNotifications();

  if (isLoading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Đang tải hệ thống...</div>;
  }

  if (!user) {
    return null; // Will redirect via AuthGuard
  }

  const fullName = user.fullName || user.username;
  const roleTitle = user.roleName === 'Teacher' ? 'Giáo viên chủ nhiệm' : (user.roleName || 'Giáo viên');

  return (
    <S.LayoutContainer $isCollapsed={isCollapsed}>
      <TeacherSidebar 
        isOpen={isSidebarOpen} 
        isCollapsed={isCollapsed}
        onClose={() => setIsSidebarOpen(false)} 
        onToggleCollapse={() => setIsCollapsed(c => !c)}
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
      {renderDetailModal()}
    </S.LayoutContainer>
  );
};
