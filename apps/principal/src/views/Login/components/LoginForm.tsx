'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import axios from 'axios';
import { useAuth, useAppRouter } from '@kindercare/core';
import { useRouter } from '@/i18n/routing';
import {
  LoginModal,
  CardHeader,
  Logo,
  PortalLabel,
  Form,
  FieldGroup,
  FieldLabel,
  InputWrapper,
  InputIcon,
  TextInput,
  TogglePasswordBtn,
  CheckboxRow,
  CheckboxLabel,
  CustomCheckbox,
  SubmitButton,
  ErrorMessage,
} from '../styles';
import { UserIcon, LockIcon, EyeIcon, EyeOffIcon } from './Icons';

export default function LoginForm(): React.ReactElement {
  const t = useTranslations('Login');

  const { login } = useAuth();
  const { go } = useAppRouter();
  const router = useRouter(); // From next/navigation or next-intl/routing if available. But wait, I can just use useRouter() or go.principalDashboard()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(
        { identifier: username, password },
        { rememberMe, loginUrl: '/auth/principal/login' }
      );
      // Redirect to test page after successful login
      router.push('/home'); 
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status ?? 0;
        if (status === 400) setError(t('missingCredentials'));
        else if (status === 401) setError(t('invalidCredentials'));
        else if (status === 403) setError(t('accessDenied'));
        else setError(t('loginError'));
      } else {
        setError(t('loginError'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginModal>
      <CardHeader>
        <Logo
          src="https://media.kindercare.app/KinderCare%20Logo/PrincipalLogo.png"
          alt="KinderCare Principal"
        />
        <PortalLabel>{t('portalLabel')}</PortalLabel>
      </CardHeader>

      <Form onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <FieldGroup>
          <FieldLabel htmlFor="login-username">{t('usernameLabel')}</FieldLabel>
          <InputWrapper>
            <InputIcon><UserIcon /></InputIcon>
            <TextInput
              id="login-username"
              type="text"
              placeholder={t('usernamePlaceholder')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </InputWrapper>
        </FieldGroup>

        <FieldGroup>
          <FieldLabel htmlFor="login-password">{t('passwordLabel')}</FieldLabel>
          <InputWrapper>
            <InputIcon><LockIcon /></InputIcon>
            <TextInput
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              placeholder={t('passwordPlaceholder')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <TogglePasswordBtn
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </TogglePasswordBtn>
          </InputWrapper>
        </FieldGroup>

        <CheckboxRow>
          <CheckboxLabel>
            <CustomCheckbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            {t('rememberMe')}
          </CheckboxLabel>
        </CheckboxRow>

        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? t('loggingIn') : t('loginButton')}
        </SubmitButton>
      </Form>
    </LoginModal>
  );
}
