'use client';

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@kindercare/ui';
import { LoginView } from '@/views/Login';

export default function LoginPage() {
  return (
    <ThemeProvider theme={theme}>
      <LoginView />
    </ThemeProvider>
  );
}
