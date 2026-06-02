'use client';

import React from 'react';
import styled from 'styled-components';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

const SwitcherContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
  display: flex;
  gap: 8px;
  padding: 6px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
    box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.2);
  }
`;

const LocaleButton = styled.button<{ $active: boolean }>`
  border: none;
  background: ${props => props.$active ? 'linear-gradient(135deg, #6e8efb, #a777e3)' : 'transparent'};
  color: ${props => props.$active ? '#fff' : '#444'};
  padding: 8px 16px;
  border-radius: 40px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 50px;

  &:hover {
    color: ${props => props.$active ? '#fff' : '#000'};
    background: ${props => props.$active ? 'linear-gradient(135deg, #5a7dfa, #9666d2)' : 'rgba(255, 255, 255, 0.3)'};
  }

  @media (prefers-color-scheme: dark) {
    color: ${props => props.$active ? '#fff' : '#ccc'};
    &:hover {
        color: #fff;
    }
  }
`;

const LanguageSwitcher: React.FC = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === '/login') return null;

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === locale) return;
    router.replace(pathname, { locale: newLocale as "vi" | "en" });
  };

  return (
    <SwitcherContainer>
      <LocaleButton 
        $active={locale === 'vi'} 
        onClick={() => handleLocaleChange('vi')}
      >
        VI
      </LocaleButton>
      <LocaleButton 
        $active={locale === 'en'} 
        onClick={() => handleLocaleChange('en')}
      >
        EN
      </LocaleButton>
    </SwitcherContainer>
  );
};

export default LanguageSwitcher;
