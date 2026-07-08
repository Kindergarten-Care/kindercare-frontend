'use client';

import React from 'react';
import {
  PageContainer,
  FloatingStar,
} from './styles';
import LoginForm from './components/LoginForm';

export function LoginView(): React.ReactElement {
  return (
    <PageContainer>


      <FloatingStar $top="15%" $left="10%" $delay="0s">★</FloatingStar>
      <FloatingStar $top="25%" $left="85%" $delay="1s">★</FloatingStar>
      <FloatingStar $top="75%" $left="15%" $delay="2s">★</FloatingStar>
      <FloatingStar $top="80%" $left="80%" $delay="1.5s">★</FloatingStar>
      <FloatingStar $top="10%" $left="50%" $delay="0.5s">★</FloatingStar>
      <FloatingStar $top="60%" $left="5%" $delay="0.8s">★</FloatingStar>
      <FloatingStar $top="40%" $left="92%" $delay="1.2s">★</FloatingStar>

      <LoginForm />
    </PageContainer>
  );
}
