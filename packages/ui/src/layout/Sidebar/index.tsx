import React from 'react';
import {
  SideNavContainer,
  BrandSection,
  BrandName,
  ClassSelectorContainer,
  ClassSelector,
  ClassSelectorLabel,
  ClassSelectorTitleRow,
  ClassSelectorTitle,
  ClassSelectorSub,
  NavLinks,
  NavLink,
  NavIcon,
  NavLabel,
  BottomSection,
  BottomNavLink,
  BottomNavIcon,
  BottomNavLabel,
} from './styles';
import { 
  OverviewIcon, 
  SchoolYearIcon, 
  FeeIcon, 
  ParentIcon, 
  AuditIcon, 
  SupportIcon, 
  LogoutIcon 
} from '../../svgs/Icons';

export interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  active?: boolean;
}

export interface SidebarProps {
  mainNavItems?: NavItem[];
  bottomNavItems?: NavItem[];
  brandLogoUrl?: string;
  brandName?: string;
  classNameView?: string;
  schoolYearView?: string;
}

const defaultMainNavItems: NavItem[] = [
  { label: 'Tổng quan', icon: <OverviewIcon size={18} />, href: '/dashboard', active: true },
  { label: 'Thiết lập Niên khóa & CSDL', icon: <SchoolYearIcon size={18} />, href: '/school-year' },
  { label: 'Cấu hình Biểu phí', icon: <FeeIcon size={18} />, href: '/fee-config' },
  { label: 'Quản lý Phụ huynh', icon: <ParentIcon size={18} />, href: '/parent-management' },
  { label: 'Audit & Backup', icon: <AuditIcon size={18} />, href: '/audit-backup' },
];

const defaultBottomNavItems: NavItem[] = [
  { label: 'Hỗ trợ', icon: <SupportIcon size={18} />, href: '/support' },
  { label: 'Đăng xuất', icon: <LogoutIcon size={18} />, href: '/logout' },
];

const ChevronDownIcon = ({ size = 12, color = '#005E2C' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

export function Sidebar({ 
  mainNavItems = defaultMainNavItems, 
  bottomNavItems = defaultBottomNavItems,
  brandLogoUrl = "https://media.kindercare.app/KinderCare%20Logo/KinderCare_LogoTextHorizontal.png",
  brandName = "KinderCare",
  classNameView = "Lớp Mầm Non 1",
  schoolYearView = "Năm học 2023-2024"
}: SidebarProps): React.ReactElement {
  return (
    <SideNavContainer>
      <div>
        <BrandSection>
          {brandLogoUrl && !brandLogoUrl.includes("KinderCare_LogoTextHorizontal") ? (
            <img 
              src={brandLogoUrl} 
              alt={brandName} 
              style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
            />
          ) : (
            <BrandName>KinderCare</BrandName>
          )}
        </BrandSection>

        <ClassSelectorContainer>
          <ClassSelector>
            <ClassSelectorLabel>ĐANG XEM</ClassSelectorLabel>
            <ClassSelectorTitleRow>
              <ClassSelectorTitle>{classNameView}</ClassSelectorTitle>
              <ChevronDownIcon size={12} color="#005E2C" />
            </ClassSelectorTitleRow>
            <ClassSelectorSub>{schoolYearView}</ClassSelectorSub>
          </ClassSelector>
        </ClassSelectorContainer>

        <NavLinks>
          {mainNavItems.map((item) => (
            <NavLink key={item.href} href={item.href} $active={item.active}>
              <NavIcon $active={item.active}>{item.icon}</NavIcon>
              <NavLabel $active={item.active}>{item.label}</NavLabel>
            </NavLink>
          ))}
        </NavLinks>
      </div>

      <BottomSection>
        {bottomNavItems.map((item) => (
          <BottomNavLink key={item.href} href={item.href}>
            <BottomNavIcon>{item.icon}</BottomNavIcon>
            <BottomNavLabel>{item.label}</BottomNavLabel>
          </BottomNavLink>
        ))}
      </BottomSection>
    </SideNavContainer>
  );
}
