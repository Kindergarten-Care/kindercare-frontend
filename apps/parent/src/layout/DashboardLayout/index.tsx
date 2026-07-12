'use client';

import React, { useState } from 'react';
import { LanguageSwitcher } from '@kindercare/ui';
import ParentSidebar from './ParentSidebar';
import NotificationPopup from './NotificationPopup';
import AccountMenu from './AccountMenu';
import BottomNavBar from './BottomNavBar';
import * as S from './styles';
import { IconBell, IconSettings } from '@/assets/icons/dashboard';
import { useDashboardLayout } from './hooks/useDashboardLayout';
import { useNotificationSocket } from '@/hooks/useNotificationSocket';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const {
    collapsed,
    handleToggle,
    isNotifOpen,
    setIsNotifOpen,
    isSettingsOpen,
    setIsSettingsOpen,
    settingsRef,
    locale,
    parentProfile,
    unreadCount,
    greetingText,
    formattedDate,
    handleLocaleChange,
    rel,
  } = useDashboardLayout();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Subscribe to live Socket.IO notifications
  useNotificationSocket();

  return (
    <S.DashboardWrapper $collapsed={collapsed}>
      <ParentSidebar
        collapsed={collapsed}
        onToggle={handleToggle}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      <S.MainContent>
        <S.HeaderBand>
          <S.HeaderBgDecorations />
          <S.HeaderInner>
            <S.Greet>
              <S.GreetName $collapsed={collapsed}>{greetingText}</S.GreetName>
              <S.GreetDate>{formattedDate}</S.GreetDate>
            </S.Greet>

            <S.Actions>
              <S.IconBtn title="Thông báo" onClick={() => setIsNotifOpen(true)}>
                <IconBell size={18} />
                {unreadCount > 0 && <S.NotifDot>{unreadCount > 99 ? '99+' : unreadCount}</S.NotifDot>}
              </S.IconBtn>

              <S.SettingsWrapper ref={settingsRef}>
                <S.IconBtn title="Cài đặt" onClick={() => setIsSettingsOpen((prev) => !prev)}>
                  <IconSettings size={18} />
                </S.IconBtn>
                {isSettingsOpen && (
                  <S.SettingsDropdown>
                    <S.DropdownTitle>
                      <IconSettings size={14} />
                      {locale === 'vi' ? 'Cài đặt hệ thống' : 'System Settings'}
                    </S.DropdownTitle>
                    <S.DropdownItem>
                      <S.DropdownLabel>{locale === 'vi' ? 'Ngôn ngữ' : 'Language'}</S.DropdownLabel>
                      <LanguageSwitcher currentLocale={locale} onLocaleChange={handleLocaleChange} />
                    </S.DropdownItem>
                  </S.SettingsDropdown>
                )}
              </S.SettingsWrapper>

              <S.AvatarWrap>
                <AccountMenu
                  locale={locale}
                  name={parentProfile?.fullName || 'Phụ huynh'}
                  email={parentProfile?.email}
                  avatar={
                    <S.Avatar>
                      {parentProfile?.avatarUrl ? (
                        <img
                          src={parentProfile.avatarUrl}
                          alt={parentProfile.fullName}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
                        />
                      ) : (
                        rel.avatar
                      )}
                    </S.Avatar>
                  }
                />
                <S.AvatarOnline />
              </S.AvatarWrap>
            </S.Actions>
          </S.HeaderInner>
        </S.HeaderBand>

        <S.PageArea>{children}</S.PageArea>
      </S.MainContent>

      <NotificationPopup isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
      <BottomNavBar onOpenMenu={() => setMobileMenuOpen(true)} />
    </S.DashboardWrapper>
  );
};

export default DashboardLayout;
