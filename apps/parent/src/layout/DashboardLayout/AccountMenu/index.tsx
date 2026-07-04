'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '@kindercare/core';
import { useParent } from '@/contexts/ParentContext';
import { IconSettings, IconLogout } from '@/assets/icons/dashboard';
import AccountSettingsModal from '../AccountSettingsModal';
import * as S from './styles';

interface AccountMenuProps {
  avatar: React.ReactNode;
  name: string;
  email?: string;
  dropUp?: boolean;
  locale?: 'vi' | 'en';
}

const AccountMenu: React.FC<AccountMenuProps> = ({ avatar, name, email, dropUp, locale = 'vi' }) => {
  const { logout } = useAuth();
  const { parentProfile } = useParent();
  const [open, setOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async (e: React.MouseEvent): Promise<void> => {
    e.stopPropagation();
    setOpen(false);
    await logout();
  };

  const displayEmail = email ?? parentProfile?.email;

  return (
    <S.MenuContainer ref={containerRef}>
      <div onClick={e => { e.stopPropagation(); setOpen(o => !o); }} style={{ cursor: 'pointer' }}>
        {avatar}
      </div>

      {open && (
        <S.MenuPanel $dropUp={dropUp}>
          <S.ProfileBlock>
            <S.ProfileAv>{avatar}</S.ProfileAv>
            <S.ProfileInfo>
              <S.ProfileName>{name}</S.ProfileName>
              {displayEmail && <S.ProfileEmail>{displayEmail}</S.ProfileEmail>}
            </S.ProfileInfo>
          </S.ProfileBlock>

          <S.MenuList>
            <S.MenuItem onClick={e => { e.stopPropagation(); setOpen(false); setSettingsOpen(true); }}>
              <IconSettings size={16} /> {locale === 'vi' ? 'Cài đặt tài khoản' : 'Account settings'}
            </S.MenuItem>
          </S.MenuList>

          <S.MenuDivider />

          <S.MenuList>
            <S.MenuItem $danger onClick={handleLogout}>
              <IconLogout size={16} /> {locale === 'vi' ? 'Đăng xuất' : 'Log out'}
            </S.MenuItem>
          </S.MenuList>
        </S.MenuPanel>
      )}

      <AccountSettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </S.MenuContainer>
  );
};

export default AccountMenu;
