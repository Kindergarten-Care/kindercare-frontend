'use client';

import React, { useState, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { LanguageSwitcher } from '@kindercare/ui';
import { PhoneIcon, EmailIcon, LockIcon, EyeIcon, EyeOffIcon, HeadsetIcon } from './Icons';
import { LOGO_URL } from './Icons';
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
  TabCapsuleContainer,
  TabCapsuleButton,
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
  DividerRow,
  OutlineSecondaryButton,
  BottomCenterFooter,
  FooterHelpLink,
  SupportHotline,
  SparkDot,
  CardRainbowAccent,
} from '../styles';

export default function LoginFormPanel(): React.ReactElement {
  const t = useTranslations('Login');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  /* ─── State Management ─── */
  const [activeTab, setActiveTab] = useState<'phone' | 'email'>('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /* ─── Callbacks ─── */
  const handleLocaleChange = useCallback(
    (newLocale: string) => {
      if (newLocale === locale) return;
      router.replace(pathname, { locale: newLocale as 'vi' | 'en' });
    },
    [locale, pathname, router]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      // Perform validation check / mock login
      setTimeout(() => {
        setIsLoading(false);
        // Successful simulation redirects or triggers action
      }, 1500);
    },
    []
  );

  return (
    <FormSide>
      <FloatingYellowStar>★</FloatingYellowStar>
      <FloatingRedRing />
      <FloatingBlueCircle />
      <FloatingSoftRedCircle />

      {/* Extra kindergarten sparkles on form side */}
      <SparkDot $top="38%"    $left="10%"  $size="5px" $color="rgba(74,222,128,0.45)"  $speed="5s" />
      <SparkDot $top="58%"    $right="10%" $size="6px" $color="rgba(251,191,36,0.5)"   $speed="7s" $reverse />
      <SparkDot $bottom="35%" $left="14%"  $size="4px" $color="rgba(96,165,250,0.45)"  $speed="6s" />
      <SparkDot $top="22%"    $right="14%" $size="5px" $color="rgba(192,132,252,0.4)"  $speed="8s" $reverse />

      {/* Top Header Row (Teacher Pathway and Lang Switcher) */}
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

      {/* Central Sign-in Card */}
      <LoginCard>
        <CardRainbowAccent />
        <CardHeaderArea>
          <CDNLogo src={LOGO_URL} alt="KinderCare Full Logo" />
          <FormTitle>{t('title')}</FormTitle>
          <FormSubtitle>{t('subtitle')}</FormSubtitle>
        </CardHeaderArea>

        {/* Form tab capsule */}
        <TabCapsuleContainer>
          <TabCapsuleButton
            $isActive={activeTab === 'phone'}
            onClick={() => setActiveTab('phone')}
          >
            <PhoneIcon />
            {t('phoneLogin')}
          </TabCapsuleButton>
          <TabCapsuleButton
            $isActive={activeTab === 'email'}
            onClick={() => setActiveTab('email')}
          >
            <EmailIcon />
            {t('emailLabel')}
          </TabCapsuleButton>
        </TabCapsuleContainer>

        <form onSubmit={handleSubmit} autoComplete="on">
          {/* Conditional field render */}
          {activeTab === 'phone' ? (
            <FieldGroup>
              <FieldLabel htmlFor="parent-phone">{t('phoneLogin')}</FieldLabel>
              <FieldInputWrapper>
                <StyledTextInput
                  id="parent-phone"
                  type="tel"
                  placeholder={t('phonePlaceholder')}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  autoComplete="tel"
                />
                <FieldIconLeft>
                  <PhoneIcon />
                </FieldIconLeft>
              </FieldInputWrapper>
            </FieldGroup>
          ) : (
            <FieldGroup>
              <FieldLabel htmlFor="parent-email">{t('emailLabel')}</FieldLabel>
              <FieldInputWrapper>
                <StyledTextInput
                  id="parent-email"
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
                <FieldIconLeft>
                  <EmailIcon />
                </FieldIconLeft>
              </FieldInputWrapper>
            </FieldGroup>
          )}

          {/* Password input field */}
          <FieldGroup>
            <FieldLabel htmlFor="parent-password">{t('passwordLabel')}</FieldLabel>
            <FieldInputWrapper>
              <StyledTextInput
                id="parent-password"
                type={showPassword ? 'text' : 'password'}
                placeholder={t('passwordPlaceholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <FieldIconLeft>
                <LockIcon />
              </FieldIconLeft>
              <TogglePasswordBtn
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </TogglePasswordBtn>
            </FieldInputWrapper>
          </FieldGroup>

          {/* Controls row */}
          <ControlRow>
            <CheckboxLabel>
              <CustomCheckbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              {t('rememberMe')}
            </CheckboxLabel>
            <ForgotLink href="#">{t('forgotPassword')}</ForgotLink>
          </ControlRow>

          {/* Actions */}
          <SolidSubmitButton type="submit" disabled={isLoading}>
            {isLoading ? t('loggingIn') : t('loginButton')}
          </SolidSubmitButton>
        </form>

        <DividerRow>{t('orDivider')}</DividerRow>

        <OutlineSecondaryButton type="button">
          {t('otpButton')}
        </OutlineSecondaryButton>

      </LoginCard>

      {/* Bottom card footer */}
      <BottomCenterFooter>
        <FooterHelpLink>
          {t('noAccountText')}
          <a href="#">{t('registerConsultation')}</a>
        </FooterHelpLink>

        <SupportHotline>
          <HeadsetIcon />
          {t('needSupport')}{' '}
          <span style={{ color: '#237A3C', marginLeft: '4px' }}>
            {t('hotline')}
          </span>
        </SupportHotline>
      </BottomCenterFooter>
    </FormSide>
  );
}
