'use client';

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@kindercare/ui';
import { ForgotPasswordView } from '@/views/ForgotPassword';

export default function ForgotPasswordPage() {
  return (
    <ThemeProvider theme={theme}>
      <ForgotPasswordView />
    </ThemeProvider>
  );
}
