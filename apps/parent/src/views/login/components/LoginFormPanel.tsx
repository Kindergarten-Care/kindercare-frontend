'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@kindercare/ui';
import { UserIcon, LockIcon, EyeIcon, EyeOffIcon, HeadsetIcon, LOGO_URL } from './Icons';
import {
  FormSide,
  FloatingYellowStar,
  FloatingRedRing,
  FloatingBlueCircle,
  FloatingSoftRedCircle,
  HeaderRow,
  TeacherPathText,
  LoginCard,
  CardHeaderArea,
  CDNLogo,
  FormTitle,
  FormSubtitle,
  FieldGroup,
  FieldLabel,
  FieldInputWrapper,
  FieldIconLeft,
  StyledTextInput,
  TogglePasswordBtn,
  ControlRow,
  CheckboxLabel,
  CustomCheckbox,
  ForgotLink,
  SolidSubmitButton,
  BottomCenterFooter,
  FooterHelpLink,
  SupportHotline,
  SparkDot,
  CardRainbowAccent,
} from '../styles';
import { useLoginForm } from '../hooks/useLoginForm';

export default function LoginFormPanel(): React.ReactElement {
  const t = useTranslations('Login');
  const {
    locale, handleLocaleChange,
    identifier, setIdentifier,
    password, setPassword,
    showPassword, setShowPassword,
    rememberMe, setRememberMe,
    isSubmitting, error,
    handleSubmit,
  } = useLoginForm();

  return (
    <FormSide>
      <FloatingYellowStar>★</FloatingYellowStar>
      <FloatingRedRing />
      <FloatingBlueCircle />
      <FloatingSoftRedCircle />

      <SparkDot $top="38%"    $left="10%"  $size="5px" $color="rgba(74,222,128,0.45)" $speed="5s" />
      <SparkDot $top="58%"    $right="10%" $size="6px" $color="rgba(251,191,36,0.5)"  $speed="7s" $reverse />
      <SparkDot $bottom="35%" $left="14%"  $size="4px" $color="rgba(96,165,250,0.45)" $speed="6s" />
      <SparkDot $top="22%"    $right="14%" $size="5px" $color="rgba(192,132,252,0.4)" $speed="8s" $reverse />

      <HeaderRow>
        <TeacherPathText>
          {t('teacherLoginLink')}
          <a href="#">{t('teacherLogin')}</a>
        </TeacherPathText>
        <LanguageSwitcher
          currentLocale={locale as 'vi' | 'en'}
          onLocaleChange={handleLocaleChange}
        />
      </HeaderRow>

      <LoginCard>
        <CardRainbowAccent />

        <CardHeaderArea>
          <CDNLogo src={LOGO_URL} alt="KinderCare" />
          <FormTitle>{t('title')}</FormTitle>
          <FormSubtitle>{t('subtitle')}</FormSubtitle>
        </CardHeaderArea>

        <form onSubmit={handleSubmit} autoComplete="on">
          <FieldGroup>
            <FieldLabel htmlFor="login-identifier">{t('identifierLabel')}</FieldLabel>
            <FieldInputWrapper>
              <FieldIconLeft><UserIcon /></FieldIconLeft>
              <StyledTextInput
                id="login-identifier"
                type="text"
                placeholder={t('identifierPlaceholder')}
                value={identifier}
                onChange={e => setIdentifier(e.target.value)}
                required
                autoComplete="username"
              />
            </FieldInputWrapper>
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="login-password">{t('passwordLabel')}</FieldLabel>
            <FieldInputWrapper>
              <FieldIconLeft><LockIcon /></FieldIconLeft>
              <StyledTextInput
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                placeholder={t('passwordPlaceholder')}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <TogglePasswordBtn
                type="button"
                onClick={() => setShowPassword(p => !p)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </TogglePasswordBtn>
            </FieldInputWrapper>
          </FieldGroup>

          <ControlRow>
            <CheckboxLabel>
              <CustomCheckbox
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
              />
              {t('rememberMe')}
            </CheckboxLabel>
            <ForgotLink href="#">{t('forgotPassword')}</ForgotLink>
          </ControlRow>

          {error && (
            <div role="alert" style={{
              background: '#fff1f2',
              border: '1px solid #fca5a5',
              borderRadius: 10,
              color: '#dc2626',
              fontSize: '0.85rem',
              padding: '0.6rem 0.9rem',
              marginBottom: '0.75rem',
            }}>
              {error}
            </div>
          )}

          <SolidSubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? t('loggingIn') : t('loginButton')}
          </SolidSubmitButton>
        </form>
      </LoginCard>

      <BottomCenterFooter>
        <FooterHelpLink>
          {t('noAccountText')}
          <a href="#">{t('registerConsultation')}</a>
        </FooterHelpLink>
        <SupportHotline>
          <HeadsetIcon />
          {t('needSupport')}{' '}
          <span style={{ color: '#237A3C', marginLeft: 4 }}>{t('hotline')}</span>
        </SupportHotline>
      </BottomCenterFooter>
    </FormSide>
  );
}
