'use client';

import React from 'react';
import {
  TopBarContainer,
  BrandName,
  TopBarActions,
  SearchContainer,
  SearchInput,
  SearchIconWrapper,
  ActionButton,
  ProfileAvatar
} from './styles';
import { SearchIcon, BellIcon } from '@kindercare/ui';

export interface TopAppBarProps {
  adminName?: string;
  avatarUrl?: string;
}

export function TopAppBar({ 
  adminName = "Admin",
  avatarUrl = "https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"
}: TopAppBarProps): React.ReactElement {
  return (
    <TopBarContainer>
      <BrandName>Kindergarten Management</BrandName>
      
      <TopBarActions>
        <SearchContainer>
          <SearchIconWrapper>
            <SearchIcon size={18} />
          </SearchIconWrapper>
          <SearchInput placeholder="Tìm kiếm..." />
        </SearchContainer>

        <ActionButton aria-label="Notifications">
          <BellIcon size={20} />
        </ActionButton>

        <ProfileAvatar>
          <img src={avatarUrl} alt={adminName} />
        </ProfileAvatar>
      </TopBarActions>
    </TopBarContainer>
  );
}
