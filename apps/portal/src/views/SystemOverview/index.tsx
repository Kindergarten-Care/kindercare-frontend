"use client";
import React from 'react';
import * as S from './SystemOverview.styles';
import { MetricCard } from './components/MetricCard';
import { RoleDistributionChart } from './components/RoleDistributionChart';
import { TrafficLoadChart } from './components/TrafficLoadChart';

import { UserGroupLargeIcon } from '@kindercare/ui/src/svgs/UserGroupLargeIcon';
import { UsersSmallIcon } from '@kindercare/ui/src/svgs/UsersSmallIcon';
import { ArrowTrendUpIcon } from '@kindercare/ui/src/svgs/ArrowTrendUpIcon';

import { UsersConnectLargeIcon } from '@kindercare/ui/src/svgs/UsersConnectLargeIcon';
import { LiveUsersSmallIcon } from '@kindercare/ui/src/svgs/LiveUsersSmallIcon';

import { WarningTriangleLargeIcon } from '@kindercare/ui/src/svgs/WarningTriangleLargeIcon';
import { WarningTriangleSmallIcon } from '@kindercare/ui/src/svgs/WarningTriangleSmallIcon';

export const SystemOverviewView: React.FC = () => {
  return (
    <S.PageWrapper>
      <S.MainWorkspace>
        <S.HeaderWrapper>
          <S.HeaderTitle>Tổng quan Hệ thống</S.HeaderTitle>
          <S.HeaderSubtitle>Giám sát hoạt động và tài nguyên hệ thống theo thời gian thực.</S.HeaderSubtitle>
        </S.HeaderWrapper>

        <S.MetricCardsGrid>
          <MetricCard
            title="Tổng tài khoản"
            value="12,458"
            iconBoxBg="#DCFCE7"
            iconBoxContent={<UsersSmallIcon fill="#16A34A" />}
            largeIcon={<UserGroupLargeIcon fill="#22C55E" />}
            badgeText="4.2%"
            badgeBg="#F0FDF4"
            badgeColor="#16A34A"
            badgeIcon={<ArrowTrendUpIcon fill="#16A34A" />}
          />
          <MetricCard
            title="Tài khoản đang Online"
            value="1,842"
            iconBoxBg="#E0F2FE"
            iconBoxContent={<LiveUsersSmallIcon fill="#0284C7" />}
            largeIcon={<UsersConnectLargeIcon fill="#3B82F6" />}
            badgeText="Live"
            badgeBg="#F0F9FF"
            badgeColor="#0369A1"
            badgeIcon={
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="10" height="10" rx="5" fill="#0EA5E9"/>
              </svg>
            }
          />
          <MetricCard
            title="Cảnh báo lỗi System Log"
            value="24"
            iconBoxBg="#FEF9C3"
            iconBoxContent={<WarningTriangleSmallIcon fill="#CA8A04" />}
            largeIcon={<WarningTriangleLargeIcon fill="#EAB308" />}
            badgeText="trong 24h qua"
            badgeBg="#FEFCE8"
            badgeColor="#CA8A04"
          />
        </S.MetricCardsGrid>

        <S.ChartsGrid>
          <RoleDistributionChart />
          <TrafficLoadChart />
        </S.ChartsGrid>
      </S.MainWorkspace>
    </S.PageWrapper>
  );
};
