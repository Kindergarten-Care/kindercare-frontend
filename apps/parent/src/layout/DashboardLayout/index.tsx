'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { LanguageSwitcher } from '@kindercare/ui';
import { useAuth } from '@kindercare/core';
import { useParent } from '@/contexts/ParentContext';
import { useStudent } from '@/contexts/StudentContext';
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

type RelationshipInfo = { label: string; avatar: string };

function resolveRelationship(raw: string | undefined, locale: 'vi' | 'en'): RelationshipInfo {
  const r = (raw ?? '').trim().toLowerCase();

  const map: Array<{ keys: string[]; vi: string; en: string; avatar: string }> = [
    { keys: ['bố', 'ba', 'cha', 'father', 'dad', 'papa'],      vi: 'ba',   en: 'Dad',      avatar: '👨' },
    { keys: ['mẹ', 'má', 'me', 'mother', 'mom', 'mama'],       vi: 'mẹ',   en: 'Mom',      avatar: '👩' },
    { keys: ['ông', 'grandfather', 'grandpa', 'opa'],           vi: 'ông',  en: 'Grandpa',  avatar: '👴' },
    { keys: ['bà', 'grandmother', 'grandma', 'oma'],            vi: 'bà',   en: 'Grandma',  avatar: '👵' },
    { keys: ['anh'],                                            vi: 'anh',  en: 'Brother',  avatar: '👦' },
    { keys: ['chị'],                                            vi: 'chị',  en: 'Sister',   avatar: '👧' },
    { keys: ['chú', 'uncle'],                                   vi: 'chú',  en: 'Uncle',    avatar: '👨' },
    { keys: ['cô', 'dì', 'thím', 'aunt'],                      vi: 'cô',   en: 'Aunt',     avatar: '👩' },
    { keys: ['cậu'],                                            vi: 'cậu',  en: 'Uncle',    avatar: '👨' },
    { keys: ['bác'],                                            vi: 'bác',  en: 'Uncle',    avatar: '👴' },
  ];

  const match = map.find(entry => entry.keys.includes(r));
  if (match) return { label: locale === 'en' ? match.en : match.vi, avatar: match.avatar };
  return { label: '', avatar: '👤' };
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
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const locale = useLocale() as 'vi' | 'en';
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();
  const { parentProfile } = useParent();
  const { activeStudent } = useStudent();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLocaleChange = (nextLocale: 'vi' | 'en') => {
    if (nextLocale === locale) return;
    router.replace(pathname, { locale: nextLocale });
  };

  const rawRelationship = activeStudent?.relationship ?? user?.relationship ?? user?.children?.[0]?.relationship;
  const rel = resolveRelationship(rawRelationship, locale);

  const getGreetingText = (): string => {
    const greeting = getGreeting(locale);
    if (!user) return `${greeting} 👋`;

    const fullName = parentProfile?.fullName || user.fullName || user.username || '';
    const nameParts = fullName.trim().split(/\s+/);
    const shortName = nameParts.slice(-2).join(' ');
    const displayName = rel.label ? `${rel.label} ${shortName}` : shortName;

    return `${greeting}, ${displayName} 👋`;
  };

  return (
    <S.DashboardWrapper $collapsed={collapsed}>
      <ParentSidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />

      <S.MainContent>
        <S.HeaderBand>
          <S.HeaderBgDecorations />
          <S.HeaderInner>
            <S.Greet>
              <S.GreetName $collapsed={collapsed}>{getGreetingText()}</S.GreetName>
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

              <S.SettingsWrapper ref={settingsRef}>
                <S.IconBtn title="Cài đặt" onClick={() => setIsSettingsOpen(prev => !prev)}>
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
                    <S.DropdownItem>
                      <S.DropdownLabel>{locale === 'vi' ? 'Giao diện tối' : 'Dark Mode'}</S.DropdownLabel>
                      <S.ToggleSwitch title={locale === 'vi' ? 'Chưa hỗ trợ' : 'Not supported yet'}>
                        <S.ToggleSlider />
                      </S.ToggleSwitch>
                    </S.DropdownItem>
                  </S.SettingsDropdown>
                )}
              </S.SettingsWrapper>

              <S.AvatarWrap>
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
