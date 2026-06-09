'use client';

import React from 'react';
import { Sidebar } from '@kindercare/ui';
import ITAdminTopAppBar from '../ITAdminTopAppBar';
import {
  DashboardWrapper,
  MainContent,
  TopBar,
  PageArea,
  TopBarTitle,
  TopBarActions,
  Avatar,
} from './styles';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps): React.ReactElement {
  return (
    <DashboardWrapper>
      <Sidebar />
      <MainContent>
        <ITAdminTopAppBar />
        <PageArea>{children}</PageArea>
      </MainContent>
    </DashboardWrapper>
  );
}
