'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar, NavItem } from '@kindercare/ui';
import { 
  OverviewIcon, 
  SchoolYearIcon, 
  ParentIcon, 
  SupportIcon, 
  LogoutIcon 
} from '@kindercare/ui';
import {
  DashboardContainer,
  MainContent,
  TopBar,
  SearchWrapper,
  SearchInput,
  TopBarActions,
  ActionButton,
  NotificationBadge,
  VerticalDivider,
  UserProfile,
  ProfileInfo,
  ProfileName,
  ProfileRole,
  AvatarWrapper,
  PageArea,
} from './styles';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

// Custom SVG Icons for layout items not available in base icons package
const AttendanceIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="9" y1="15" x2="10" y2="15"></line>
    <line x1="13" y1="15" x2="15" y2="15"></line>
    <line x1="9" y1="19" x2="10" y2="19"></line>
    <line x1="13" y1="19" x2="15" y2="19"></line>
    <line x1="9" y1="11" x2="15" y2="11"></line>
  </svg>
);

const ActivityIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
  </svg>
);

const SettingsIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const SearchIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const NotificationBellIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

const ChatBubbleIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

export function DashboardLayout({ children }: DashboardLayoutProps): React.ReactElement {
  const pathname = usePathname() || '';

  // Helper to extract locale from path (e.g., /teacher/vi/attendance -> vi)
  const segments = pathname.split('/');
  const locale = segments[2] || 'vi';

  const baseRoute = `/teacher/${locale}`;

  const mainNavItems: NavItem[] = [
    { 
      label: 'Bảng điều khiển', 
      icon: <OverviewIcon size={18} />, 
      href: `${baseRoute}/dashboard`,
      active: pathname.endsWith('/dashboard')
    },
    { 
      label: 'Danh sách lớp', 
      icon: <SchoolYearIcon size={18} />, 
      href: `${baseRoute}/class`,
      active: pathname.endsWith('/class')
    },
    { 
      label: 'Điểm danh', 
      icon: <AttendanceIcon size={18} />, 
      href: `${baseRoute}/attendance`,
      active: pathname.includes('/attendance')
    },
    { 
      label: 'Hoạt động', 
      icon: <ActivityIcon size={18} />, 
      href: `${baseRoute}/activities`,
      active: pathname.endsWith('/activities')
    },
    { 
      label: 'Liên lạc phụ huynh', 
      icon: <ParentIcon size={18} />, 
      href: `${baseRoute}/parent-contact`,
      active: pathname.endsWith('/parent-contact')
    },
    { 
      label: 'Cài đặt', 
      icon: <SettingsIcon size={18} />, 
      href: `${baseRoute}/settings`,
      active: pathname.endsWith('/settings')
    },
  ];

  const bottomNavItems: NavItem[] = [
    { 
      label: 'Trợ giúp', 
      icon: <SupportIcon size={18} />, 
      href: `${baseRoute}/support` 
    },
    { 
      label: 'Đăng xuất', 
      icon: <LogoutIcon size={18} />, 
      href: `${baseRoute}/logout` 
    },
  ];

  // Map active title for breadcrumb
  let activeTitle = 'Điểm danh hàng ngày';
  if (pathname.includes('/attendance')) {
    activeTitle = 'Điểm danh hàng ngày';
  } else if (pathname.includes('/dashboard')) {
    activeTitle = 'Bảng điều khiển';
  } else if (pathname.includes('/class')) {
    activeTitle = 'Danh sách lớp';
  } else if (pathname.includes('/activities')) {
    activeTitle = 'Quản lý Hoạt động';
  } else if (pathname.includes('/parent-contact')) {
    activeTitle = 'Liên lạc Phụ huynh';
  } else if (pathname.includes('/settings')) {
    activeTitle = 'Cài đặt';
  }

  return (
    <DashboardContainer>
      <Sidebar 
        mainNavItems={mainNavItems}
        bottomNavItems={bottomNavItems}
        brandName="KinderCare Giáo Viên"
      />
      
      <MainContent>
        <TopBar>
          <SearchWrapper>
            <SearchIcon size={18} />
            <SearchInput type="text" placeholder="Tìm kiếm hồ sơ..." />
          </SearchWrapper>

          <TopBarActions>
            <ActionButton aria-label="Notifications">
              <NotificationBellIcon size={20} />
              <NotificationBadge />
            </ActionButton>
            <ActionButton aria-label="Messages">
              <ChatBubbleIcon size={20} />
            </ActionButton>
            <VerticalDivider />
            <UserProfile>
              <ProfileInfo>
                <ProfileName>Cô Minh Thư</ProfileName>
                <ProfileRole>Giáo viên chủ nhiệm</ProfileRole>
              </ProfileInfo>
              <AvatarWrapper>
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=60" 
                  alt="Cô Minh Thư" 
                />
              </AvatarWrapper>
            </UserProfile>
          </TopBarActions>
        </TopBar>

        <PageArea>
          {children}
        </PageArea>
      </MainContent>
    </DashboardContainer>
  );
}
