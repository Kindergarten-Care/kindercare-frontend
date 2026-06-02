'use client';

import React, { useState, useCallback, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import {
  PageContainer,
  HeroSide,
  FloatingOrangeCircle,
  FloatingCyanRing,
  BrandHeader,
  BrandName,
  HeroContent,
  BadgeCapsule,
  HeroTitle,
  HeroSubtitle,
  StatsSection,
  StatsContainerOuter,
  UploadDropZone,
  UploadText,
  StatsGrid,
  StatCard,
  StatVal,
  StatLabel,
  FormSide,
  FloatingYellowStar,
  FloatingRedRing,
  FloatingBlueCircle,
  FloatingSoftRedCircle,
  HeaderRow,
  TeacherPathText,
  InlineLangSwitcher,
  InlineLangButton,
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
  AlertDemoBox,
  AlertText,
  BottomCenterFooter,
  FooterHelpLink,
  SupportHotline,
} from './styles';

/* ─── CDN Assets ─── */
const LOGO_URL =
  'https://media.kindercare.app/KinderCare%20Logo/KinderCare_LogoTextHorizontal.png';

/* ─── Premium SVG Icons (Zero Dependencies) ─── */
const SproutIcon = ({ size = 42 }: { size?: number }) => (
  <svg
    viewBox="460 200 280 280"
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="600" cy="330" r="120" fill="#ffffff" />
    <path
      d="M600 450V360"
      stroke="#237a3c"
      strokeWidth="22"
      strokeLinecap="round"
    />
    <path
      d="M600 380c0-46 38-82 92-82 0 46-38 82-92 82Z"
      fill="#7cc24f"
    />
    <path
      d="M600 350c0-42-36-74-84-74 0 42 36 74 84 74Z"
      fill="#226a33"
    />
    <circle cx="690" cy="278" r="22" fill="#f2a33c" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="1.1em"
    height="1.1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const EmailIcon = () => (
  <svg
    width="1.1em"
    height="1.1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LockIcon = () => (
  <svg
    width="1.1em"
    height="1.1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = () => (
  <svg
    width="1.1em"
    height="1.1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    width="1.1em"
    height="1.1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const HeadsetIcon = () => (
  <svg
    width="1.1em"
    height="1.1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

const UploadIcon = () => (
  <svg
    width="2em"
    height="2em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgba(255, 255, 255, 0.85)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

export default function LoginView(): React.ReactElement {
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

  /* Drag and drop childhood photo interaction */
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  /* Drag & Drop logic */
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setUploadedImage(url);
      }
    }
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setUploadedImage(url);
      }
    }
  }, []);

  const handleZoneClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <PageContainer>
      {/* Google Fonts integration */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* ─── Left Side: Green Hero & Interactive Area ─── */}
      <HeroSide>
        <FloatingOrangeCircle />
        <FloatingCyanRing />

        {/* Top brand header */}
        <BrandHeader>
          <SproutIcon size={46} />
          <BrandName>KINDER CARE</BrandName>
        </BrandHeader>

        {/* Dynamic Marketing Headers */}
        <HeroContent>
          <BadgeCapsule>{t('brandSubtitle')}</BadgeCapsule>
          <HeroTitle
            dangerouslySetInnerHTML={{ __html: t.raw('leftHeaderHtml') }}
          />
          <HeroSubtitle>{t('leftDescription')}</HeroSubtitle>
        </HeroContent>

        {/* Interactive drag-and-drop class photo & Stats */}
        <StatsSection>
          <StatsContainerOuter>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleFileChange}
            />
            <UploadDropZone
              $isDragActive={dragActive}
              $hasImage={!!uploadedImage}
              style={uploadedImage ? { backgroundImage: `url(${uploadedImage})` } : {}}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={handleZoneClick}
            >
              {uploadedImage ? (
                <UploadText>{t('dragDropSuccess')}</UploadText>
              ) : (
                <>
                  <UploadIcon />
                  <UploadText>{t('dragDropText')}</UploadText>
                </>
              )}
            </UploadDropZone>

            <StatsGrid>
              <StatCard $borderBottomColor="#ef4444">
                <StatVal $textColor="#ef4444">{t('studentsCount')}</StatVal>
                <StatLabel>{t('studentsLabel')}</StatLabel>
              </StatCard>
              <StatCard $borderBottomColor="#3b82f6">
                <StatVal $textColor="#3b82f6">{t('satisfactionRate')}</StatVal>
                <StatLabel>{t('satisfactionLabel')}</StatLabel>
              </StatCard>
              <StatCard $borderBottomColor="#8b5cf6">
                <StatVal $textColor="#8b5cf6">{t('teachersCount')}</StatVal>
                <StatLabel>{t('teachersLabel')}</StatLabel>
              </StatCard>
            </StatsGrid>
          </StatsContainerOuter>
        </StatsSection>
      </HeroSide>

      {/* ─── Right Side: Elegant Login Form and support ─── */}
      <FormSide>
        <FloatingYellowStar>★</FloatingYellowStar>
        <FloatingRedRing />
        <FloatingBlueCircle />
        <FloatingSoftRedCircle />

        {/* Top Header Row (Teacher Pathway and Lang Switcher) */}
        <HeaderRow>
          <TeacherPathText>
            {t('teacherLoginLink')}
            <a href="#">{t('teacherLogin')}</a>
          </TeacherPathText>

          <InlineLangSwitcher>
            <InlineLangButton
              $isActive={locale === 'vi'}
              onClick={() => handleLocaleChange('vi')}
            >
              VI
            </InlineLangButton>
            <InlineLangButton
              $isActive={locale === 'en'}
              onClick={() => handleLocaleChange('en')}
            >
              us EN
            </InlineLangButton>
          </InlineLangSwitcher>
        </HeaderRow>

        {/* Central Sign-in Card */}
        <LoginCard>
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

          {/* Alert instructions */}
          <AlertDemoBox>
            <AlertText>{t('demoNote')}</AlertText>
          </AlertDemoBox>
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
    </PageContainer>
  );
}
