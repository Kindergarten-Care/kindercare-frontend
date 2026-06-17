"use client";
import React from 'react';
import * as S from './TopBar.styles';
import { NotificationIcon } from '@kindercare/ui/src/svgs/NotificationIcon';
import { SettingsIcon } from '@kindercare/ui/src/svgs/SettingsIcon';
import { HelpCircleIcon } from '@kindercare/ui/src/svgs/HelpCircleIcon';

const DEFAULT_AVATAR = "data:image/jpeg;base64,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";

export const TopBar: React.FC = () => {
  return (
    <S.TopBarWrapper>
      <S.TitleBox>
        <S.TitleText>Admin Workspace</S.TitleText>
      </S.TitleBox>

      <S.ActionsWrapper>
        <S.IconButton aria-label="Notifications">
          <NotificationIcon fill="#94A3B8" size={20} />
        </S.IconButton>
        
        <S.IconButton aria-label="Settings">
          <SettingsIcon fill="#94A3B8" size={20} />
        </S.IconButton>
        
        <S.IconButton aria-label="Help">
          <HelpCircleIcon fill="#94A3B8" size={20} />
        </S.IconButton>

        <S.ProfileBox>
          <S.ProfileImage src={DEFAULT_AVATAR} alt="Admin Profile" />
        </S.ProfileBox>
      </S.ActionsWrapper>
    </S.TopBarWrapper>
  );
};
