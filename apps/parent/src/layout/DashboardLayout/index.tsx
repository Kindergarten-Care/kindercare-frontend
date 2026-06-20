'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { LanguageSwitcher } from '@kindercare/ui';
import { useAuth } from '@kindercare/core';
import { useParent } from '@/contexts/ParentContext';
import ParentSidebar from './ParentSidebar';
import NotificationPopup from './NotificationPopup';
import * as S from './styles';
import { IconSearch, IconBell, IconSettings } from '@/assets/icons/dashboard';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function getGreeting(locale: 'vi' | 'en' = 'vi'): string {
  const h = new Date().getHours();
  if (locale === 'en') {
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  }
  if (h < 12) return 'Chào buổi sáng';
  if (h < 18) return 'Chào buổi chiều';
  return 'Chào buổi tối';
}

function getFormattedDate(locale: 'vi' | 'en' = 'vi'): string {
  return new Date().toLocaleDateString(locale === 'en' ? 'en-US' : 'vi-VN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [isNotifOpen, setIsNotifOpen] = useState<boolean>(false);
  const [hasUnreadNotif, setHasUnreadNotif] = useState<boolean>(true);
  const locale = useLocale() as 'vi' | 'en';
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();
  const { parentProfile } = useParent();

  const handleLocaleChange = (nextLocale: 'vi' | 'en') => {
    if (nextLocale === locale) return;
    router.replace(pathname, { locale: nextLocale });
  };

  const getGreetingText = (): string => {
    const greeting = getGreeting(locale);
    if (!user) return `${greeting} 👋`;

    const fullName = parentProfile?.fullName || user.fullName || user.username || '';
    const nameParts = fullName.trim().split(/\s+/);
    const displayNameParts = nameParts.slice(-2);
    const shortName = displayNameParts.join(' ');

    let rel = user.relationship?.trim().toLowerCase() || '';
    if (locale === 'en') {
      if (['cha', 'ba', 'bố', 'father', 'dad', 'daddy'].includes(rel)) rel = 'daddy';
      else if (['mẹ', 'má', 'mother', 'mom', 'mommy'].includes(rel)) rel = 'mommy';
      
      const displayName = rel ? `${rel} ${shortName}` : shortName;
      return `${greeting}, ${displayName} 👋`;
    } else {
      if (['cha', 'ba', 'bố', 'father', 'dad'].includes(rel)) rel = 'ba';
      else if (['mẹ', 'má', 'mother', 'mom'].includes(rel)) rel = 'mẹ';
      
      const displayName = rel ? `${rel} ${shortName}` : shortName;
      return `${greeting}, ${displayName} 👋`;
    }
  };

  return (
    <S.DashboardWrapper $collapsed={collapsed}>
      <ParentSidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />

      <S.MainContent>
        <S.HeaderBand>
          <S.HeaderInner>
            <S.Greet>
              <S.GreetName>{getGreetingText()}</S.GreetName>
              <S.GreetDate>{getFormattedDate(locale)}</S.GreetDate>
            </S.Greet>

            <S.Actions>
              <S.SearchBar>
                <IconSearch size={16} color="#9ca3af" />
                <input placeholder="Tìm kiếm..." />
              </S.SearchBar>

              <S.IconBtn title="Thông báo" onClick={() => { setIsNotifOpen(true); setHasUnreadNotif(false); }}>
                <IconBell size={18} />
                {hasUnreadNotif && <S.NotifDot />}
              </S.IconBtn>

              <S.IconBtn title="Cài đặt">
                <IconSettings size={18} />
              </S.IconBtn>

              <LanguageSwitcher currentLocale={locale} onLocaleChange={handleLocaleChange} />

              <S.AvatarWrap>
                <S.Avatar>
                  {parentProfile?.avatarUrl ? (
                    <img 
                      src={parentProfile.avatarUrl} 
                      alt={parentProfile.fullName} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
                    />
                  ) : (
                    user?.relationship?.toLowerCase() === 'cha' ? '👨' : '👩'
                  )}
                </S.Avatar>
                <S.AvatarOnline />
              </S.AvatarWrap>
            </S.Actions>
          </S.HeaderInner>
        </S.HeaderBand>

        <S.PageArea>{children}</S.PageArea>
      </S.MainContent>
      
      <NotificationPopup isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </S.DashboardWrapper>
  );
};

export default DashboardLayout;
