'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import * as S from './styles';
import AccountSettingsModal from '../AccountSettingsModal';
import {
  IconHome, IconCreditCard, IconSettings, IconGrid,
} from '@/assets/icons/dashboard';

interface BottomNavBarProps {
  onOpenMenu: () => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ onOpenMenu }) => {
  const pathname = usePathname();
  const locale = useLocale();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <S.Bar>
        <S.ItemButton onClick={onOpenMenu}>
          <IconGrid size={20} />
          Menu
        </S.ItemButton>
        <S.Item href={`/${locale}/dashboard`} $active={pathname.includes('/dashboard')}>
          <IconHome size={20} />
          Tổng quan
        </S.Item>
        <S.Item href={`/${locale}/billing`} $active={pathname.includes('/billing')}>
          <IconCreditCard size={20} />
          Học phí
        </S.Item>
        <S.ItemButton onClick={() => setSettingsOpen(true)}>
          <IconSettings size={20} />
          Cài đặt
        </S.ItemButton>
      </S.Bar>

      <AccountSettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
};

export default BottomNavBar;
