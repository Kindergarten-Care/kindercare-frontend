'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { getSession } from '@kindercare/core';
import { useLoginState } from './hooks';
import * as S from './styles';

interface ToastItem {
  id: number;
  text: string;
}

interface FeatureDef {
  label: string;
  color: string;
  delay: number;
  icon: React.ReactNode;
}

const FEATURES: FeatureDef[] = [
  {
    label: 'Điểm danh QR chỉ trong 1 giây',
    color: '#005A36',
    delay: 0.1,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7V5a2 2 0 0 1 2-2h2" />
        <path d="M17 3h2a2 2 0 0 1 2 2v2" />
        <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
        <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
        <rect x="7" y="7" width="10" height="10" rx="1" />
      </svg>
    ),
  },
  {
    label: 'Phiếu bé ngoan & sổ liên lạc',
    color: '#D97706',
    delay: 0.22,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    label: 'Thực đơn & lịch học hằng ngày',
    color: '#2563EB',
    delay: 0.34,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4Z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
];

const IconMail = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 5L2 7" />
  </svg>
);

const IconLock = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconEye = (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconEyeOff = (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const IconArrowRight = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const IconAlert = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

export const LoginView: React.FC = () => {
  const {
    username,
    password,
    rememberMe,
    errors,
    isSubmitting,
    handleUsernameChange,
    handlePasswordChange,
    handleRememberMeChange,
    handleSubmit,
  } = useLoginState();

  const [showPass, setShowPass] = useState(false);
  const [shake, setShake] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const nidRef = useRef(0);

  // Auto-redirect nếu đã có session
  useEffect(() => {
    const session = getSession();
    if (session) {
      const nextUrl = (process.env.NEXT_PUBLIC_TEACHER_APP_URL || 'http://localhost:3001') + '/teacher';
      window.location.href = nextUrl;
    }
  }, []);

  // Shake khi có lỗi
  useEffect(() => {
    if (errors.username || errors.password) {
      setShake(true);
      const t = setTimeout(() => setShake(false), 420);
      return () => clearTimeout(t);
    }
  }, [errors.username, errors.password]);

  const addToast = (text: string) => {
    const id = ++nidRef.current;
    setToasts((prev) => [...prev, { id, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2600);
  };

  const handleForgot = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    addToast('📧 Đã gửi hướng dẫn đặt lại mật khẩu tới email của bạn');
  };

  const handleContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    addToast('☎️ Liên hệ quản trị: (028) 3822 1234');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <S.PageWrap>
      <S.Card>
        {/* Brand Pane (left) */}
        <S.BrandPane>
          <S.BlobGreen />
          <S.BlobAmber />
          <S.Twinkle1>✦</S.Twinkle1>
          <S.Twinkle2>✦</S.Twinkle2>
          <S.Twinkle3>✦</S.Twinkle3>

          <S.BrandLogoBanner
            src="https://media.kindercare.app/KinderCare%20Logo/Kindercare_TeacherDashboardLogo.png"
            alt="KinderCare"
          />

          <S.HeroBlock>
            <S.EmojiStage>
              <S.EmojiCard />
              <S.EmojiMain>🧑‍🏫</S.EmojiMain>
              <S.EmojiApple>🍎</S.EmojiApple>
              <S.EmojiStar>⭐</S.EmojiStar>
            </S.EmojiStage>

            <S.HeroTitle>
              Chào mừng thầy cô
              <br />
              trở lại lớp học 🌿
            </S.HeroTitle>
            <S.HeroDesc>
              Quản lý một ngày ở lớp — gọn gàng, ấm áp và trong tầm tay.
            </S.HeroDesc>

            <S.FeatureChips>
              {FEATURES.map((f, idx) => (
                <S.FeatureChip key={idx} $delay={f.delay}>
                  <S.ChipIconBox $color={f.color}>{f.icon}</S.ChipIconBox>
                  <S.ChipLabel>{f.label}</S.ChipLabel>
                </S.FeatureChip>
              ))}
            </S.FeatureChips>
          </S.HeroBlock>
        </S.BrandPane>

        {/* Form Pane (right) */}
        <S.FormPane>
          <S.FormTitle>Đăng nhập</S.FormTitle>
          <S.FormSubtitle>Dùng tài khoản giáo viên do nhà trường cấp.</S.FormSubtitle>

          <S.LoginForm
            $shake={shake}
            onSubmit={handleSubmit}
            noValidate
          >
            {/* Email */}
            <div>
              <S.FieldLabel>Email / Mã giáo viên</S.FieldLabel>
              <S.InputWrap $hasError={!!errors.username}>
                <S.InputIcon>{IconMail}</S.InputIcon>
                <S.FieldInput
                  ref={usernameRef}
                  id="username"
                  type="text"
                  placeholder="thayhuy@kindercare.edu.vn"
                  value={username}
                  onChange={handleUsernameChange}
                  onKeyDown={handleKeyDown}
                  autoComplete="username"
                />
              </S.InputWrap>
            </div>

            {/* Password */}
            <div>
              <S.FieldLabelRow>
                <S.FieldLabel as="span" style={{ margin: 0 }}>Mật khẩu</S.FieldLabel>
                <S.ForgotLink as={Link} href="/login/forgot-password" onClick={handleForgot}>
                  Quên mật khẩu?
                </S.ForgotLink>
              </S.FieldLabelRow>
              <S.InputWrap $hasError={!!errors.password}>
                <S.InputIcon>{IconLock}</S.InputIcon>
                <S.FieldInput
                  ref={passwordRef}
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                  onKeyDown={handleKeyDown}
                  autoComplete="current-password"
                />
                <S.TogglePassBtn
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  aria-label={showPass ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showPass ? IconEyeOff : IconEye}
                </S.TogglePassBtn>
              </S.InputWrap>
            </div>

            {/* Error banner */}
            {(errors.username || errors.password) && (
              <S.ErrorBanner>
                {IconAlert}
                {errors.username || errors.password}
              </S.ErrorBanner>
            )}

            {/* Remember me */}
            <S.RememberRow>
              <S.CheckBox
                type="button"
                $checked={rememberMe}
                onClick={(e) => {
                  e.preventDefault();
                  handleRememberMeChange({
                    target: { checked: !rememberMe },
                  } as React.ChangeEvent<HTMLInputElement>);
                }}
                aria-checked={rememberMe}
                role="checkbox"
              >
                {rememberMe && <S.CheckTick>✓</S.CheckTick>}
              </S.CheckBox>
              <S.RememberLabel>Ghi nhớ đăng nhập trên máy này</S.RememberLabel>
            </S.RememberRow>

            {/* Submit */}
            <S.SubmitBtn type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <S.Spinner />
                  Đang xử lý...
                </>
              ) : (
                <>
                  Đăng nhập
                  {IconArrowRight}
                </>
              )}
            </S.SubmitBtn>
          </S.LoginForm>

          <S.FooterNote>
            Chưa có tài khoản? <a href="#" onClick={handleContact}>Liên hệ quản trị trường</a>
          </S.FooterNote>
        </S.FormPane>
      </S.Card>

      {/* Toasts */}
      <S.ToastStack>
        {toasts.map((t) => (
          <S.Toast key={t.id}>{t.text}</S.Toast>
        ))}
      </S.ToastStack>
    </S.PageWrap>
  );
};

export default LoginView;
