'use client';

import React from 'react';
import {
  LayoutDashboard,
  ClipboardCheck,
  Calendar,
  Users,
  BookOpen,
  Heart,
  Star,
} from 'lucide-react';
import * as S from './SidebarStyles';

interface NavItemData {
  href: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
  isActive?: boolean;
}

interface NavSectionData {
  title: string;
  items: NavItemData[];
}

interface LessonPlanSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  className?: string;
  classInfo?: {
    name: string;
    studentCount: number;
    initials: string;
  };
  userInfo?: {
    name: string;
    role: string;
    initials: string;
  };
}

const NAV_SECTIONS: NavSectionData[] = [
  {
    title: 'HOM NAY',
    items: [
      { href: '/teacher/dashboard', icon: <LayoutDashboard size={20} strokeWidth={1.8} />, label: 'Tổng quan' },
      { href: '/teacher/attendance', icon: <ClipboardCheck size={20} strokeWidth={1.8} />, label: 'Điểm danh' },
      { href: '/teacher/schedule', icon: <Calendar size={20} strokeWidth={1.8} />, label: 'Thực đơn & Lịch học' },
    ],
  },
  {
    title: 'LOP & HOC TAP',
    items: [
      { href: '/teacher/classes', icon: <Users size={20} strokeWidth={1.8} />, label: 'Danh sách lớp', badge: 20 },
      { href: '/teacher/lesson-plan', icon: <BookOpen size={20} strokeWidth={1.9} />, label: 'Soạn giáo án', isActive: true },
    ],
  },
  {
    title: 'CHAM SOC',
    items: [
      { href: '/teacher/health', icon: <Heart size={20} strokeWidth={1.8} />, label: 'Y tế & Sức khoẻ' },
      { href: '/teacher/awards', icon: <Star size={20} strokeWidth={1.8} />, label: 'Phiếu bé ngoan' },
    ],
  },
];

const LeafIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#005A36" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const CollapseIconWrapper = ({ isCollapsed }: { isCollapsed: boolean }) => (
  <span style={{ display: 'flex', transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}>
    <ChevronLeftIcon />
  </span>
);

export const LessonPlanSidebar: React.FC<LessonPlanSidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  className,
  classInfo = { name: 'Lớp Mầm 1', studentCount: 42, initials: 'M1' },
  userInfo = { name: 'Thầy Lê Quang Huy', role: 'Giáo viên', initials: 'H' },
}) => {
  return (
    <S.SidebarWrapper $collapsed={isCollapsed} className={className}>
      <S.CollapseBtn onClick={onToggleCollapse} title={isCollapsed ? 'Mở rộng' : 'Thu gọn'}>
        <CollapseIconWrapper isCollapsed={isCollapsed} />
      </S.CollapseBtn>

      {/* Logo */}
      <S.Logo $hidden={isCollapsed}>
        <S.LogoIcon>
          <LeafIcon />
        </S.LogoIcon>
        <S.LogoText>
          <S.LogoTitle>KINDER CARE</S.LogoTitle>
          <S.LogoSubtitle>QUẢN LÝ GIÁO VIÊN</S.LogoSubtitle>
        </S.LogoText>
      </S.Logo>

      {/* Class Selector */}
      <S.ClassSelector $hidden={isCollapsed}>
        <S.ClassAvatar>{classInfo.initials}</S.ClassAvatar>
        <S.ClassInfo>
          <S.ClassName>{classInfo.name}</S.ClassName>
          <S.ClassCount>{classInfo.studentCount} học sinh</S.ClassCount>
        </S.ClassInfo>
        <S.ChevronIcon>
          <ChevronDownIcon />
        </S.ChevronIcon>
      </S.ClassSelector>

      {/* Navigation */}
      <S.Nav>
        {NAV_SECTIONS.map((section) => (
          <React.Fragment key={section.title}>
            <S.NavSection $hidden={isCollapsed}>{section.title}</S.NavSection>
            {section.items.map((item) => (
              <S.NavItem
                key={item.href}
                href={item.href}
                $active={item.isActive}
                $hidden={isCollapsed}
              >
                {item.isActive && <S.ActiveBar />}
                <S.NavIcon>{item.icon}</S.NavIcon>
                <S.NavLabel $hidden={isCollapsed}>{item.label}</S.NavLabel>
                {item.badge && <S.NavBadge $hidden={isCollapsed}>{item.badge}</S.NavBadge>}
              </S.NavItem>
            ))}
          </React.Fragment>
        ))}
      </S.Nav>

      {/* User Bar */}
      <S.UserBar $hidden={isCollapsed}>
        <S.UserAvatar>{userInfo.initials}</S.UserAvatar>
        <S.UserInfo>
          <S.UserName>{userInfo.name}</S.UserName>
          <S.UserRole>{userInfo.role}</S.UserRole>
        </S.UserInfo>
        <S.SettingsLink href="/teacher/profile" $hidden={isCollapsed}>
          <SettingsIcon />
        </S.SettingsLink>
      </S.UserBar>
    </S.SidebarWrapper>
  );
};
