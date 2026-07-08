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
    label: 'Tài khoản',
    icon: (
      <span>👤</span>
    ),
    subItems: [
      { label: 'Giáo viên', href: '/accounts?role=teacher', icon: <span>👨🏼‍🏫</span> },
      { label: 'Phụ huynh', href: '/accounts?role=parent', icon: <span>👨‍👩‍👧‍👦</span> },
    ]
  },
];
