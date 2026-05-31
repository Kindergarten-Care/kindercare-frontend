'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import '../theme/types';

// @ts-ignore
import engIcon from '../../../public/image/eng_ico.png';
// @ts-ignore
import vieIcon from '../../../public/image/vie_ico.png';

export interface LanguageSwitcherProps {
  currentLocale: 'vi' | 'en';
  onLocaleChange: (locale: 'vi' | 'en') => void;
  className?: string;
}

const SwitcherContainer = styled.div`
  display: inline-flex;
  position: relative;
  align-items: center;
  gap: 4px;
  padding: 4px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 30px;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    border-color: ${({ theme }) => theme.colors.greenMid};
    box-shadow: 0 6px 24px rgba(30, 50, 28, 0.12);
  }
`;

const ActiveSlider = styled.div<{ $activeLocale: 'vi' | 'en' }>`
  position: absolute;
  top: 4px;
  left: 4px;
  width: calc(50% - 4px);
  height: calc(100% - 8px);
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.green}, ${({ theme }) => theme.colors.greenMid});
  border-radius: 26px;
  box-shadow: 0 2px 8px rgba(45, 106, 34, 0.25);
  transition: transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 1;

  ${({ $activeLocale }) =>
    $activeLocale === 'en'
      ? css`
          transform: translateX(100%);
        `
      : ''}
`;

const LocaleButton = styled.button<{ $active: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px 12px;
  border: none;
  background: transparent;
  border-radius: 26px;
  cursor: pointer;
  z-index: 2;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: ${({ $active, theme }) => ($active ? '#ffffff' : theme.colors.muted)};
  transition: color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  outline: none;

  &:hover {
    color: ${({ $active, theme }) => ($active ? '#ffffff' : theme.colors.fg)};
  }
`;

const FlagIcon = styled.img`
  width: 18px;
  height: 18px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;

  ${LocaleButton}:hover & {
    transform: scale(1.1);
  }
`;

export function LanguageSwitcher({
  currentLocale,
  onLocaleChange,
  className,
}: LanguageSwitcherProps): React.ReactElement {
  const getSrc = (iconObj: any) => {
    if (!iconObj) return '';
    return typeof iconObj === 'string' ? iconObj : (iconObj.default?.src || iconObj.src || '');
  };

  const viSrc = getSrc(vieIcon);
  const enSrc = getSrc(engIcon);

  return (
    <SwitcherContainer className={className}>
      <ActiveSlider $activeLocale={currentLocale} />
      <LocaleButton
        type="button"
        $active={currentLocale === 'vi'}
        onClick={() => onLocaleChange('vi')}
        aria-label="Tiếng Việt"
      >
        {viSrc && <FlagIcon src={viSrc} alt="Vietnamese Flag" />}
        <span>VI</span>
      </LocaleButton>
      <LocaleButton
        type="button"
        $active={currentLocale === 'en'}
        onClick={() => onLocaleChange('en')}
        aria-label="English"
      >
        {enSrc && <FlagIcon src={enSrc} alt="English Flag" />}
        <span>EN</span>
      </LocaleButton>
    </SwitcherContainer>
  );
}
