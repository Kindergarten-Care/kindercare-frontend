'use client';

import React from 'react';
import {
  SideNavContainer,
  BrandSection,
  BrandIcon,
  BrandInfo,
  BrandName,
  BrandSub,
  NavLinks,
  NavLink,
  NavIcon,
  NavLabel,
  BottomSection,
} from './styles';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  active?: boolean;
}

const OverviewIcon: React.FC = () => (
  <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="10.5" y="0.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="0.5" y="10.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="10.5" y="10.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const SchoolYearIcon: React.FC = () => (
  <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 7h14" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6 1v4M12 1v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const FeeIcon: React.FC = () => (
  <svg viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="11" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4 4h1M17 12h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ParentIcon: React.FC = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 18c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const AuditIcon: React.FC = () => (
  <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 1l7 3v5c0 4.418-3 7-7 8-4-1-7-3.582-7-8V4l7-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M6 9l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SupportIcon: React.FC = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7.5 8a2.5 2.5 0 015 0c0 1.5-2.5 2-2.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="10" cy="14" r="0.75" fill="currentColor" />
  </svg>
);

const LogoutIcon: React.FC = () => (
  <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 13l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 9H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 2H4a2 2 0 00-2 2v10a2 2 0 002 2h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const KindercareLogoIcon: React.FC = () => (
  <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 1L1 5v8h4v-4h4v4h4V5L7 1z" fill="white" />
  </svg>
);

const mainNavItems: NavItem[] = [
  { label: 'Tổng quan', icon: <OverviewIcon />, href: '/dashboard', active: true },
  { label: 'Thiết lập Niên khóa & CSDL', icon: <SchoolYearIcon />, href: '/school-year' },
  { label: 'Cấu hình Biểu phí', icon: <FeeIcon />, href: '/fee-config' },
  { label: 'Quản lý Phụ huynh', icon: <ParentIcon />, href: '/parent-management' },
  { label: 'Audit & Backup', icon: <AuditIcon />, href: '/audit-backup' },
];

const bottomNavItems: NavItem[] = [
  { label: 'Hỗ trợ', icon: <SupportIcon />, href: '/support' },
  { label: 'Đăng xuất', icon: <LogoutIcon />, href: '/logout' },
];

export default function ITAdminSideNavBar(): React.ReactElement {
  return (
    <SideNavContainer>
      <BrandSection>
        <img 
          src="https://media.kindercare.app/KinderCare%20Logo/KinderCare_LogoTextHorizontal.png" 
          alt="KinderCare Guardian System" 
          style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
        />
      </BrandSection>

      <NavLinks>
        {mainNavItems.map((item) => (
          <NavLink key={item.href} href={item.href} $active={item.active}>
            <NavIcon $active={item.active}>{item.icon}</NavIcon>
            <NavLabel $active={item.active}>{item.label}</NavLabel>
          </NavLink>
        ))}
      </NavLinks>

      <BottomSection>
        {bottomNavItems.map((item) => (
          <NavLink key={item.href} href={item.href}>
            <NavIcon>{item.icon}</NavIcon>
            <NavLabel>{item.label}</NavLabel>
          </NavLink>
        ))}
      </BottomSection>
    </SideNavContainer>
  );
}
