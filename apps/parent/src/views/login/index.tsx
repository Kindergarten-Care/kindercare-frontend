'use client';

import React from 'react';
import { Responsive } from '@kindercare/ui';
import { PageContainer } from './styles';
import HeroPanel from './components/HeroPanel';
import MobileHeroBannerPanel from './components/MobileHeroBannerPanel';
import LoginFormPanel from './components/LoginFormPanel';

export function LoginView(): React.ReactElement {
  return (
    <PageContainer>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Desktop (≥ 1024px): full animated green hero panel */}
      <Responsive from="lg" display="contents">
        <HeroPanel />
      </Responsive>

      {/* Mobile (< 1024px): compact branded green banner */}
      <Responsive to="lg" display="contents">
        <MobileHeroBannerPanel />
      </Responsive>

      {/* Always visible: login form */}
      <LoginFormPanel />
    </PageContainer>
  );
}
