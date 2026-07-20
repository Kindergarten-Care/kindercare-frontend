'use client';

import React from 'react';
import * as S from './styles';
import { BrandPane } from './components/BrandPane';
import { LoginForm } from './components/LoginForm';

export const LoginView: React.FC = () => {
  return (
    <S.PageContainer>
      <S.Card>
        <BrandPane />
        <LoginForm />
      </S.Card>
    </S.PageContainer>
  );
};
