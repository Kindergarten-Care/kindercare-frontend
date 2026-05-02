'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  LoginWrapper,
  LoginCard,
  LeftColumn,
  LeftOverlay,
  Badge,
  LeftContent,
  LeftTitle,
  TitleLine,
  LeftSubtitle,
  RightColumn,
  BrandSection,
  BrandLogoWrapper,
  BrandName,
  GreetingSection,
  GreetingTitle,
  GreetingSubtitle,
  LoginForm,
  FormGroup,
  LabelRow,
  Label,
  ForgotPasswordLink,
  InputWrapper,
  Input,
  InputIcon,
  InputRightIcon,
  SubmitButton,
  DividerSection,
  DividerLine,
  DividerText,
  SocialLogins,
  SocialButton,
  FooterSection,
  FooterText,
  FooterLink,
  LoginGlobalStyle,
  CloseButton,
} from './styles';

export interface LoginProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Login: React.FC<LoginProps> = ({ isOpen = true, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log('Login submitted', { emailOrPhone, password });
  };

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <>
      <LoginGlobalStyle />
      <LoginWrapper $isOpen={isOpen} onClick={handleBackdropClick}>
        <LoginCard>
          {onClose && (
            <CloseButton onClick={onClose} aria-label="Close login">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L13 13M1 13L13 1" stroke="#191C1D" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </CloseButton>
          )}
          <LeftColumn>
            <LeftOverlay>
            <Badge>
              <Image
                src="/images/login/badge_star.svg"
                alt="Star Badge"
                width={14}
                height={14}
              />
              TOP RATED PRESCHOOL
            </Badge>

            <LeftContent>
              <LeftTitle>Kết nối Yêu thương</LeftTitle>
              <TitleLine />
              <LeftSubtitle>
                Đồng hành cùng bé trên mỗi bước đường phát triển với môi trường giáo dục an toàn và tận tâm.
              </LeftSubtitle>
            </LeftContent>
          </LeftOverlay>
        </LeftColumn>

        <RightColumn>
          <BrandSection>
            <BrandLogoWrapper>
              <Image
                src="/images/login/logo_overlay.png"
                alt="KinderCare Overlay"
                width={44}
                height={44}
                style={{ objectFit: 'cover' }}
              />
            </BrandLogoWrapper>
            <BrandName>KinderCare</BrandName>
          </BrandSection>

          <GreetingSection>
            <GreetingTitle>Chào mừng Ba Mẹ<br />quay lại!</GreetingTitle>
            <GreetingSubtitle>
              Đăng nhập để xem các hoạt động mới nhất của bé hôm nay.
            </GreetingSubtitle>
          </GreetingSection>

          <LoginForm onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="emailOrPhone">SĐT hoặc Email</Label>
              <InputWrapper>
                <InputIcon>
                  <Image
                    src="/images/login/input_mail.svg"
                    alt="Mail Icon"
                    width={16}
                    height={16}
                  />
                </InputIcon>
                <Input
                  id="emailOrPhone"
                  type="text"
                  placeholder="Nhập SĐT hoặc email"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  required
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <LabelRow>
                <Label htmlFor="password">Mật khẩu</Label>
                <ForgotPasswordLink href="#">Quên mật khẩu?</ForgotPasswordLink>
              </LabelRow>
              <InputWrapper>
                <InputIcon>
                  <Image
                    src="/images/login/input_lock.svg"
                    alt="Lock Icon"
                    width={16}
                    height={16}
                  />
                </InputIcon>
                <Input
                  id="password"
                  type="password"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </InputWrapper>
            </FormGroup>

            <SubmitButton type="submit">Đăng nhập</SubmitButton>
          </LoginForm>

          <DividerSection>
            <DividerLine />
            <DividerText>Hoặc đăng nhập bằng</DividerText>
            <DividerLine />
          </DividerSection>

          <SocialLogins>
            <SocialButton $provider="google" type="button">
              <Image
                src="/images/login/google_icon.svg"
                alt="Google Icon"
                width={20}
                height={20}
              />
              Google
            </SocialButton>
            <SocialButton $provider="zalo" type="button">
              Zalo
            </SocialButton>
          </SocialLogins>

          <FooterSection>
            <FooterText>Chưa có tài khoản?</FooterText>
            <FooterLink href="#">Liên hệ nhà trường</FooterLink>
          </FooterSection>
        </RightColumn>
      </LoginCard>
    </LoginWrapper>
    </>
  );
};

export default Login;
