'use client';

import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';

// Animations from HTML
const bob = keyframes`
  0%, 100% { transform: translateY(0) rotate(-4deg); }
  50% { transform: translateY(-12px) rotate(3deg); }
`;
const float2 = keyframes`
  0%, 100% { transform: translateY(0) rotate(4deg); }
  50% { transform: translateY(-9px) rotate(-3deg); }
`;
const pop = keyframes`
  from { opacity: 0; transform: scale(.94) translateY(10px); }
  to { opacity: 1; transform: none; }
`;
const blob = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(24px, -20px) scale(1.12); }
  66% { transform: translate(-18px, 14px) scale(.94); }
`;
const chipin = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: none; }
`;
const twinkle = keyframes`
  0%, 100% { opacity: .35; transform: scale(.85); }
  50% { opacity: 1; transform: scale(1.15); }
`;
const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px;
  background: radial-gradient(900px 500px at 15% 10%, #EAF6EF 0%, #E9F1EC 55%);
  font-family: 'Inter', system-ui, sans-serif;
  color: #1F2937;
`;

const Card = styled.div`
  display: grid;
  grid-template-columns: 1.05fr .95fr;
  width: 100%;
  max-width: 1040px;
  min-height: 600px;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 30px 80px -30px rgba(0, 90, 54, .4);
  background: #fff;
  animation: ${pop} .4s cubic-bezier(.2, .8, .3, 1);

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    max-width: 450px;
    border-radius: 0;
  }
`;

// --- LEFT PANEL ---

const BrandPane = styled.div`
  position: relative;
  overflow: hidden;
  background: linear-gradient(155deg, #00432A 0%, #005A36 48%, #0A8A57 100%);
  padding: 44px 46px;
  display: flex;
  flex-direction: column;

  @media (max-width: 900px) {
    display: none !important;
  }
`;

const Blob1 = styled.span`
  position: absolute;
  top: -90px;
  right: -70px;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(52, 211, 153, .55), rgba(52, 211, 153, 0) 70%);
  filter: blur(6px);
  animation: ${blob} 14s ease-in-out infinite;
`;

const Blob2 = styled.span`
  position: absolute;
  bottom: -70px;
  left: -50px;
  width: 230px;
  height: 230px;
  border-radius: 50%;
  background: radial-gradient(circle at 40% 40%, rgba(251, 191, 36, .4), rgba(251, 191, 36, 0) 70%);
  filter: blur(6px);
  animation: ${blob} 18s ease-in-out infinite reverse;
`;

const Twinkle = styled.span<{ top: string, right?: string, left?: string, size: string, color: string, delay: string, duration: string }>`
  position: absolute;
  top: ${p => p.top};
  ${p => p.right ? `right: ${p.right};` : ''}
  ${p => p.left ? `left: ${p.left};` : ''}
  font-size: ${p => p.size};
  color: ${p => p.color};
  animation: ${twinkle} ${p => p.duration} ease-in-out infinite ${p => p.delay};
`;

const LogoBox = styled.div`
  flex: none;
  width: 46px;
  height: 46px;
  border-radius: 14px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 22px -8px rgba(0,0,0,.4);
`;

const DisplayText = styled.div`
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
`;

const AvatarWrapper = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin-bottom: 26px;
`;

const AvatarBg = styled.span`
  position: absolute;
  inset: 0;
  border-radius: 38px;
  background: rgba(255,255,255,.14);
  border: 1px solid rgba(255,255,255,.25);
  backdrop-filter: blur(6px);
`;

const AvatarEmoji = styled.span`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 78px;
  line-height: 1;
  filter: drop-shadow(0 14px 20px rgba(0,0,0,.3));
  animation: ${bob} 4s ease-in-out infinite;
`;

const FloatingEmoji1 = styled.span`
  position: absolute;
  top: -14px;
  right: -16px;
  font-size: 40px;
  filter: drop-shadow(0 8px 12px rgba(0,0,0,.25));
  animation: ${float2} 4.4s ease-in-out infinite .4s;
`;

const FloatingEmoji2 = styled.span`
  position: absolute;
  bottom: -10px;
  left: -16px;
  font-size: 30px;
  filter: drop-shadow(0 8px 12px rgba(0,0,0,.25));
  animation: ${float2} 5s ease-in-out infinite .8s;
`;

const FeatureBox = styled.div<{ delay: string }>`
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 11px 14px;
  border-radius: 14px;
  background: rgba(255,255,255,.12);
  border: 1px solid rgba(255,255,255,.18);
  backdrop-filter: blur(6px);
  animation: ${chipin} .5s ease both ${p => p.delay};
`;

const FeatureIcon = styled.span<{ color: string }>`
  flex: none;
  width: 34px;
  height: 34px;
  border-radius: 11px;
  background: rgba(255,255,255,.9);
  color: ${p => p.color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

// --- RIGHT PANEL ---

const FormPane = styled.div`
  padding: 48px 46px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FormTitle = styled(DisplayText)`
  font-size: 25px;
  font-weight: 800;
  letter-spacing: -.02em;
`;

const FormSubtitle = styled.div`
  font-size: 13.5px;
  color: #9CA3AF;
  font-weight: 500;
  margin-top: 5px;
`;

const LabelGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const Label = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .05em;
  text-transform: uppercase;
  color: #9CA3AF;
`;

const InputWrap = styled.div<{ $error?: boolean }>`
  display: flex;
  align-items: center;
  gap: 11px;
  height: 50px;
  padding: 0 15px;
  border-radius: 13px;
  background: #F8FBF9;
  border: 1px solid ${p => p.$error ? '#FCA5A5' : '#E6EEE9'};
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: 14px;
  color: #1F2937;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 9px;
  cursor: pointer;
  user-select: none;
  margin-top: 2px;
`;

const CustomCheck = styled.div<{ checked: boolean }>`
  flex: none;
  width: 22px;
  height: 22px;
  border-radius: 7px;
  border: 1.5px solid ${p => p.checked ? '#005A36' : '#CBD5D1'};
  background: ${p => p.checked ? '#005A36' : '#fff'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .15s;
`;

const SubmitBtn = styled.button`
  margin-top: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  height: 52px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(135deg, #00794A, #005A36);
  color: #fff;
  font-family: inherit;
  font-weight: 800;
  font-size: 15px;
  cursor: pointer;
  box-shadow: 0 12px 26px -10px rgba(0, 90, 54, .5);
  transition: transform .15s;

  &:hover {
    transform: scale(1.02);
  }
  &:active {
    transform: scale(.98);
  }
`;

const Spinner = styled.span`
  width: 18px;
  height: 18px;
  border: 2.5px solid rgba(255,255,255,.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${spin} .7s linear infinite;
`;

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const router = useRouter();
  const { setUser } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setErrorMsg('Vui lòng nhập đầy đủ email và mật khẩu.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    
    try {
      const response = await authService.login(username, password);
      
      const token = response?.token || response?.data?.token;
      
      if (!token) {
        throw new Error('Không nhận được token hợp lệ từ server.');
      }

      sessionStorage.setItem('teacher_token', token);
      
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(decodeURIComponent(atob(base64).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')));
      
      setUser({
        userId: payload.userId,
        username: payload.username,
        roleId: payload.roleId,
        roleName: payload.roleName,
        fullName: payload.fullName,
      });

      toast.success('Đăng nhập thành công! Đang mở bảng điều khiển...');
      router.push('/dashboard');
      
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.response?.data?.message || err.message || 'Sai thông tin đăng nhập.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <Card>
        <BrandPane>
          <Blob1 />
          <Blob2 />
          <Twinkle top="24%" left="16%" size="16px" color="#FBBF24" duration="3s" delay="0s">✦</Twinkle>
          <Twinkle top="64%" right="20%" size="12px" color="#A7F3D0" duration="3.6s" delay=".6s">✦</Twinkle>
          <Twinkle top="14%" right="30%" size="10px" color="#fff" duration="2.8s" delay=".3s">✦</Twinkle>

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <LogoBox>
              <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#005A36" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
              </svg>
            </LogoBox>
            <div style={{ lineHeight: 1.15 }}>
              <DisplayText style={{ fontWeight: 800, fontSize: '17px', color: '#fff', letterSpacing: '.02em' }}>KINDER CARE</DisplayText>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '.14em', color: '#9FD3BA', marginTop: '2px' }}>QUẢN LÝ GIÁO VIÊN</div>
            </div>
          </div>

          <div style={{ position: 'relative', marginTop: 'auto' }}>
            <AvatarWrapper>
              <AvatarBg />
              <AvatarEmoji>🧑‍🏫</AvatarEmoji>
              <FloatingEmoji1>🍎</FloatingEmoji1>
              <FloatingEmoji2>⭐</FloatingEmoji2>
            </AvatarWrapper>
            
            <DisplayText style={{ fontSize: '31px', fontWeight: 800, color: '#fff', lineHeight: 1.18, letterSpacing: '-.02em' }}>
              Chào mừng thầy cô<br/>trở lại lớp học 🌿
            </DisplayText>
            <p style={{ fontSize: '14px', color: '#CDEBDC', lineHeight: 1.6, margin: '12px 0 0', maxWidth: '340px' }}>
              Quản lý một ngày ở lớp — gọn gàng, ấm áp và trong tầm tay.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '26px', maxWidth: '320px' }}>
              <FeatureBox delay=".1s">
                <FeatureIcon color="#005A36">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                  </svg>
                </FeatureIcon>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#fff' }}>Quản lý đơn xin nghỉ & y tế</span>
              </FeatureBox>
              
              <FeatureBox delay=".22s">
                <FeatureIcon color="#D97706">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </FeatureIcon>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#fff' }}>Phiếu bé ngoan & sổ liên lạc</span>
              </FeatureBox>
              
              <FeatureBox delay=".34s">
                <FeatureIcon color="#2563EB">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4Z"></path>
                    <line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line>
                  </svg>
                </FeatureIcon>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#fff' }}>Thực đơn & lịch học hằng ngày</span>
              </FeatureBox>
            </div>
          </div>
        </BrandPane>

        <FormPane>
          <FormTitle>Đăng nhập</FormTitle>
          <FormSubtitle>Dùng tài khoản giáo viên do nhà trường cấp.</FormSubtitle>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '26px' }}>
            <div>
              <Label>Email / Mã giáo viên</Label>
              <InputWrap $error={!!errorMsg}>
                <span style={{ flex: 'none', display: 'flex', width: '18px', height: '18px', color: '#9CA3AF' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <path d="m22 7-10 5L2 7"></path>
                  </svg>
                </span>
                <Input 
                  value={username}
                  onChange={e => { setUsername(e.target.value); setErrorMsg(''); }}
                  placeholder="thayhuy@kindercare.edu.vn" 
                />
              </InputWrap>
            </div>

            <div>
              <LabelGroup>
                <Label>Mật khẩu</Label>
                <a href="#" style={{ fontSize: '12px', fontWeight: 700, color: '#005A36', textDecoration: 'none' }} onClick={(e) => e.preventDefault()}>Quên mật khẩu?</a>
              </LabelGroup>
              <InputWrap $error={!!errorMsg}>
                <span style={{ flex: 'none', display: 'flex', width: '18px', height: '18px', color: '#9CA3AF' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </span>
                <Input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setErrorMsg(''); }}
                  placeholder="••••••••" 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ flex: 'none', width: '30px', height: '30px', borderRadius: '8px', border: 'none', background: 'transparent', color: '#9CA3AF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {showPassword ? (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  ) : (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                  )}
                </button>
              </InputWrap>
            </div>

            {errorMsg && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', fontWeight: 600, color: '#DC2626', background: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: '11px', padding: '10px 13px' }}>
                ⚠️ {errorMsg}
              </div>
            )}

            <CheckboxLabel onClick={() => setRemember(!remember)}>
              <CustomCheck checked={remember}>
                {remember && <span style={{ color: '#fff', fontSize: '12px', fontWeight: 800 }}>✓</span>}
              </CustomCheck>
              <span style={{ fontSize: '13px', color: '#6B7280', fontWeight: 500 }}>Ghi nhớ đăng nhập trên máy này</span>
            </CheckboxLabel>

            <SubmitBtn type="submit" disabled={loading}>
              {loading ? <Spinner /> : (
                <>
                  <span>Đăng nhập</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </>
              )}
            </SubmitBtn>

          </form>

          <div style={{ textAlign: 'center', fontSize: '12.5px', color: '#9CA3AF', fontWeight: 500, marginTop: '26px' }}>
            Chưa có tài khoản? <a href="#" style={{ color: '#005A36', fontWeight: 700, textDecoration: 'none' }} onClick={(e) => e.preventDefault()}>Liên hệ quản trị trường</a>
          </div>
        </FormPane>
      </Card>
    </PageContainer>
  );
}
