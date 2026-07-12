import React from 'react';

export interface SidebarSubItemConfig {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export interface SidebarItemConfig {
  label: string;
  href?: string;
  icon: React.ReactNode;
  subItems?: SidebarSubItemConfig[];
}

export const SIDEBAR_ITEMS: SidebarItemConfig[] = [
  {
    label: 'Tổng quan',
    href: '/overview',
    icon: <span>🏠</span>
  },
  {
    label: 'Tài khoản & Hồ sơ',
    icon: (
      <span>👤</span>
    ),
    subItems: [
      { label: 'Học sinh', href: '/students', icon: <span>👶</span> },
      { label: 'Giáo viên', href: '/accounts?role=teacher', icon: <span>👨🏼‍🏫</span> },
      { label: 'Phụ huynh', href: '/accounts?role=parent', icon: <span>👨‍👩‍👧‍👦</span> },
    ]
  },
  {
    label: 'Công tác biên chế',
    icon: (
      <span>📋</span>
    ),
    subItems: [
      { label: 'Năm học', href: '/assignments/academic-year', icon: <span>📅</span> },
      { label: 'Bổ nhiệm GVCN', href: '/assignments/homeroom-teacher', icon: <span>👨🏼‍🏫</span> },
      { label: 'Xếp lớp', href: '/assignments/class-placement', icon: <span>🎓</span> },
    ]
  },
  {
    label: 'Khối học và lớp học',
    icon: (
      <span>🏫</span>
    ),
    href: '/grades-classes'
  },
  {
    label: 'Biểu phí & Tài chính',
    icon: (
      <span>💰</span>
    ),
    href: '/finance'
  },
];
