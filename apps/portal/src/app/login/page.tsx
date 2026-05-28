'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ThemeProvider } from 'styled-components';
import { theme } from '@kindercare/ui';

const LoginView = dynamic(() => import('@/views/Login'), {
  ssr: false,
});

export default function LoginPage() {
  return (
    <ThemeProvider theme={theme}>
      <LoginView />
    </ThemeProvider>
  );
}
