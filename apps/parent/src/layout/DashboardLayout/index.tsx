'use client';

import React from 'react';
import { Sidebar } from '@kindercare/ui';
import { NavItem } from '@kindercare/ui/src/layout/Sidebar';
import { 
  OverviewIcon, 
  CalendarIcon, 
  FeeIcon, 
  AccountIcon,
  SupportIcon,
  LogoutIcon,
  PlusIcon
} from '@kindercare/ui/src/svgs/Icons';
import {
  DashboardWrapper,
  MainContent,
  TopBar,
  PageArea,
  TopBarTitle,
  TopBarActions,
  Avatar,
  FloatingChatButton,
  ChatBadge
} from './styles';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const parentNavItems: NavItem[] = [
  { label: 'Tổng quan', icon: <OverviewIcon size={18} />, href: '/dashboard_view', active: true },
  { label: 'Hồ sơ bé', icon: <AccountIcon size={18} />, href: '/child-profile' },
  { label: 'Học phí', icon: <FeeIcon size={18} />, href: '/tuition' },
  { label: 'Liên lạc', icon: <CalendarIcon size={18} />, href: '/communication' },
  { label: 'Sức khỏe', icon: <AccountIcon size={18} />, href: '/health' },
];

const parentBottomNavItems: NavItem[] = [
  { label: 'Đăng ký ngoại khóa', icon: <PlusIcon size={18} />, href: '/extracurricular', variant: 'button' },
  { label: 'Trợ giúp', icon: <SupportIcon size={18} />, href: '/support' },
  { label: 'Đăng xuất', icon: <LogoutIcon size={18} />, href: '/logout' },
];

export function DashboardLayout({ children }: DashboardLayoutProps): React.ReactElement {
  return (
    <DashboardWrapper>
      <Sidebar 
        mainNavItems={parentNavItems} 
        bottomNavItems={parentBottomNavItems}
        brandName="KinderCare Guardian Portal" 
      />
      <MainContent>
        <TopBar>
          <TopBarTitle>Hồ sơ Phụ huynh</TopBarTitle>
          <TopBarActions>
            {/* Notification Bell */}
            <div style={{ marginRight: '16px', cursor: 'pointer', color: '#181d18', position: 'relative' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 8, height: 8, background: '#ba1a1a', borderRadius: '50%' }} />
            </div>
            
            <div style={{ textAlign: 'right', marginRight: '12px' }}>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '14px', fontWeight: 600, color: '#181d18' }}>Phạm Hồng Nhung</div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '12px', color: '#64748b' }}>Phụ huynh học sinh</div>
            </div>

            <Avatar>
              <img src="/assets/mock/parent_avatar.png" alt="Avatar" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </Avatar>
          </TopBarActions>
        </TopBar>
        <PageArea>{children}</PageArea>

        <FloatingChatButton>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <ChatBadge>2</ChatBadge>
        </FloatingChatButton>
      </MainContent>
    </DashboardWrapper>
  );
}
