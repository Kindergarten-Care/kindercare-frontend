'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ThemeProvider } from 'styled-components';
import { theme } from '@kindercare/ui';

const ForgotPasswordView = dynamic(() => import('@/views/ForgotPassword'), {
  ssr: false,
});

export default function ForgotPasswordPage() {
  return (
    <ThemeProvider theme={theme}>
      <ForgotPasswordView />
    </ThemeProvider>
  );
}
