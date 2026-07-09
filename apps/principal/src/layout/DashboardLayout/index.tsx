'use client';

import React, { useState } from 'react';
import { useAuth } from '@kindercare/core';
import { useRouter, usePathname } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { getFormattedDate } from '@/utils/date';
import { SIDEBAR_ITEMS } from './config';
import { HomeIcon } from '@/icons/HomeIcon';
import { ChevronRightIcon } from '@/icons/ChevronRightIcon';
import {
  LayoutContainer,
  TopNavbar,
  BrandArea,
  Logo,
  SearchArea,
  SearchInputWrapper,
  SearchIcon,
  SearchInput,
  UserArea,
  UserIconSvg,
  MainArea,
  Sidebar,
  SidebarItem,
  SidebarItemContent,
  SidebarItemText,
  SidebarItemIcon,
  ChevronIcon,
  SidebarSubMenuWrapper,
  SidebarSubMenuInner,
  SidebarSubMenu,
  SidebarSubItem,
  Timestamp,
  ContentContainer,
  BreadcrumbContainer,
  BreadcrumbItem,
  BreadcrumbSeparator
} from './styles';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [formattedDate, setFormattedDate] = useState<string>('');

  const currentFullUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;

  const toggleExpand = (label: string) => {
    setExpandedItems(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  React.useEffect(() => {
    setFormattedDate(getFormattedDate());
    const intervalId = setInterval(() => {
      setFormattedDate(getFormattedDate());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <LayoutContainer>
      <TopNavbar>
        <BrandArea>
          <Logo 
            src="https://media.kindercare.app/KinderCare%20Logo/KinderCare_LogoTextHorizontal.png" 
            alt="Logo" 
          />
        </BrandArea>

        <SearchArea>
          <SearchInputWrapper>
            <SearchIcon viewBox="0 0 24 24">
              <path d="M10 2a8 8 0 105.293 14.707l5 5a1 1 0 001.414-1.414l-5-5A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
            </SearchIcon>
            <SearchInput placeholder="Search" />
          </SearchInputWrapper>
        </SearchArea>

        <UserArea>
          <UserIconSvg viewBox="0 0 24 24" onClick={handleLogout}>
            <title>Logout</title>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
          </UserIconSvg>
        </UserArea>
      </TopNavbar>

      <MainArea>
        <Sidebar>
          {SIDEBAR_ITEMS.map((item) => {
            const hasSub = !!item.subItems?.length;
            const isExpanded = !!expandedItems[item.label];
            const isChildActive = item.subItems?.some(sub => currentFullUrl === sub.href) || false;
            const isMainActive = item.href ? currentFullUrl === item.href || pathname === item.href : false;
            const isActive = isMainActive || isChildActive;

            const handleItemClick = () => {
              if (hasSub) toggleExpand(item.label);
              else if (item.href) router.push(item.href);
            };

            return (
              <div key={item.label} style={{ display: 'flex', flexDirection: 'column' }}>
                <SidebarItem $active={isActive || undefined} onClick={handleItemClick}>
                  <SidebarItemContent>
                    <SidebarItemIcon>{item.icon}</SidebarItemIcon>
                    <SidebarItemText>{item.label}</SidebarItemText>
                  </SidebarItemContent>
                  {hasSub && (
                    <ChevronIcon viewBox="0 0 24 24" $isOpen={isExpanded} $active={isActive || undefined}>
                      <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </ChevronIcon>
                  )}
                </SidebarItem>
                
                {hasSub && (
                  <SidebarSubMenuWrapper $isOpen={isExpanded}>
                    <SidebarSubMenuInner>
                      <SidebarSubMenu>
                        {item.subItems!.map((sub, idx) => {
                          const isSubActive = currentFullUrl === sub.href;
                          return (
                            <SidebarSubItem 
                              key={idx}
                              $active={isSubActive || undefined}
                              onClick={() => router.push(sub.href)}
                            >
                              {sub.icon && <span style={{ marginRight: '8px' }}>{sub.icon}</span>}
                              {sub.label}
                            </SidebarSubItem>
                          );
                        })}
                      </SidebarSubMenu>
                    </SidebarSubMenuInner>
                  </SidebarSubMenuWrapper>
                )}
              </div>
            );
          })}

          <Timestamp>
            {formattedDate}
          </Timestamp>
        </Sidebar>

        <ContentContainer>
          <BreadcrumbContainer>
            <BreadcrumbItem $clickable onClick={() => router.push('/overview')}>
              <span style={{ marginRight: '6px', display: 'flex' }}><HomeIcon /></span> Trang chủ
            </BreadcrumbItem>
            {(() => {
              for (const item of SIDEBAR_ITEMS) {
                if (item.href && (pathname === item.href || currentFullUrl === item.href)) {
                  return (
                    <>
                      <BreadcrumbSeparator><ChevronRightIcon /></BreadcrumbSeparator>
                      <BreadcrumbItem className="active">{item.label}</BreadcrumbItem>
                    </>
                  );
                }
                if (item.subItems) {
                  for (const sub of item.subItems) {
                    if (currentFullUrl === sub.href || pathname === sub.href) {
                      return (
                        <>
                          <BreadcrumbSeparator><ChevronRightIcon /></BreadcrumbSeparator>
                          <BreadcrumbItem 
                            $clickable={!!item.href} 
                            onClick={() => item.href ? router.push(item.href) : toggleExpand(item.label)}
                          >
                            {item.label}
                          </BreadcrumbItem>
                          <BreadcrumbSeparator><ChevronRightIcon /></BreadcrumbSeparator>
                          <BreadcrumbItem className="active">{sub.label}</BreadcrumbItem>
                        </>
                      );
                    }
                  }
                }
              }

              if (pathname.startsWith('/classes/')) {
                return (
                  <>
                    <BreadcrumbSeparator><ChevronRightIcon /></BreadcrumbSeparator>
                    <BreadcrumbItem $clickable onClick={() => router.push('/grades-classes')}>Khối học và Lớp học</BreadcrumbItem>
                    <BreadcrumbSeparator><ChevronRightIcon /></BreadcrumbSeparator>
                    <BreadcrumbItem className="active">Chi tiết Lớp học</BreadcrumbItem>
                  </>
                );
              }
              if (pathname.startsWith('/teacher/')) {
                return (
                  <>
                    <BreadcrumbSeparator><ChevronRightIcon /></BreadcrumbSeparator>
                    <BreadcrumbItem $clickable onClick={() => router.push('/accounts')}>Tài khoản & Hồ sơ</BreadcrumbItem>
                    <BreadcrumbSeparator><ChevronRightIcon /></BreadcrumbSeparator>
                    <BreadcrumbItem $clickable onClick={() => router.push('/accounts/teachers')}>Giáo viên</BreadcrumbItem>
                    <BreadcrumbSeparator><ChevronRightIcon /></BreadcrumbSeparator>
                    <BreadcrumbItem className="active">Chi tiết Giáo viên</BreadcrumbItem>
                  </>
                );
              }
              return null;
            })()}
          </BreadcrumbContainer>
          {children}
        </ContentContainer>
      </MainArea>
    </LayoutContainer>
  );
}
