'use client';

import React from 'react';
import { Sidebar } from '@kindercare/ui';
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
        <TopBar>
          <TopBarTitle>KinderCare Admin</TopBarTitle>
          <TopBarActions>
            <Avatar>A</Avatar>
          </TopBarActions>
        </TopBar>
        <PageArea>{children}</PageArea>
      </MainContent>
    </DashboardWrapper>
  );
}
