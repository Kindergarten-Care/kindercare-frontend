'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';
import * as S from './styles';

export const LoginView: React.FC = () => {
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
    <S.PageContainer>
      <S.Card>
        <S.BrandPane>
          <S.Blob1 />
          <S.Blob2 />
          <S.Twinkle top="24%" left="16%" size="16px" color="#FBBF24" duration="3s" delay="0s">✦</S.Twinkle>
          <S.Twinkle top="64%" right="20%" size="12px" color="#A7F3D0" duration="3.6s" delay=".6s">✦</S.Twinkle>
          <S.Twinkle top="14%" right="30%" size="10px" color="#fff" duration="2.8s" delay=".3s">✦</S.Twinkle>

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <img
              src="https://media.kindercare.app/KinderCare%20Logo/Kindercare_TeacherDashboardLogo.png"
              alt="KinderCare Logo"
              style={{ width: '100%', height: 'auto', maxWidth: 260, objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
            />
          </div>

          <div style={{ position: 'relative', marginTop: 'auto' }}>
            <S.AvatarWrapper>
              <S.AvatarBg />
              <S.AvatarEmoji>🧑‍🏫</S.AvatarEmoji>
              <S.FloatingEmoji1>🍎</S.FloatingEmoji1>
              <S.FloatingEmoji2>⭐</S.FloatingEmoji2>
            </S.AvatarWrapper>
            
            <S.DisplayText style={{ fontSize: '31px', fontWeight: 800, color: '#fff', lineHeight: 1.18, letterSpacing: '-.02em' }}>
              Chào mừng thầy cô<br/>trở lại lớp học 🌿
            </S.DisplayText>
            <p style={{ fontSize: '14px', color: '#CDEBDC', lineHeight: 1.6, margin: '12px 0 0', maxWidth: '340px' }}>
              Quản lý một ngày ở lớp — gọn gàng, ấm áp và trong tầm tay.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '26px', maxWidth: '320px' }}>
              <S.FeatureBox delay=".1s">
                <S.FeatureIcon color="#005A36">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                  </svg>
                </S.FeatureIcon>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#fff' }}>Quản lý đơn xin nghỉ & y tế</span>
              </S.FeatureBox>
              
              <S.FeatureBox delay=".22s">
                <S.FeatureIcon color="#D97706">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </S.FeatureIcon>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#fff' }}>Phiếu bé ngoan & sổ liên lạc</span>
              </S.FeatureBox>
              
              <S.FeatureBox delay=".34s">
                <S.FeatureIcon color="#2563EB">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4Z"></path>
                    <line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line>
                  </svg>
                </S.FeatureIcon>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#fff' }}>Thực đơn & lịch học hằng ngày</span>
              </S.FeatureBox>
            </div>
          </div>
        </S.BrandPane>

        <S.FormPane>
          <S.FormTitle>Đăng nhập</S.FormTitle>
          <S.FormSubtitle>Dùng tài khoản giáo viên do nhà trường cấp.</S.FormSubtitle>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '26px' }}>
            <div>
              <S.Label>Email / Mã giáo viên</S.Label>
              <S.InputWrap $error={!!errorMsg}>
                <span style={{ flex: 'none', display: 'flex', width: '18px', height: '18px', color: '#9CA3AF' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <path d="m22 7-10 5L2 7"></path>
                  </svg>
                </span>
                <S.Input 
                  value={username}
                  onChange={e => { setUsername(e.target.value); setErrorMsg(''); }}
                  placeholder="thayhuy@kindercare.edu.vn" 
                />
              </S.InputWrap>
            </div>

            <div>
              <S.LabelGroup>
                <S.Label>Mật khẩu</S.Label>
                <a href="#" style={{ fontSize: '12px', fontWeight: 700, color: '#005A36', textDecoration: 'none' }} onClick={(e) => e.preventDefault()}>Quên mật khẩu?</a>
              </S.LabelGroup>
              <S.InputWrap $error={!!errorMsg}>
                <span style={{ flex: 'none', display: 'flex', width: '18px', height: '18px', color: '#9CA3AF' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </span>
                <S.Input 
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
              </S.InputWrap>
            </div>

            {errorMsg && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', fontWeight: 600, color: '#DC2626', background: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: '11px', padding: '10px 13px' }}>
                ⚠️ {errorMsg}
              </div>
            )}

            <S.CheckboxLabel onClick={() => setRemember(!remember)}>
              <S.CustomCheck checked={remember}>
                {remember && <span style={{ color: '#fff', fontSize: '12px', fontWeight: 800 }}>✓</span>}
              </S.CustomCheck>
              <span style={{ fontSize: '13px', color: '#6B7280', fontWeight: 500 }}>Ghi nhớ đăng nhập trên máy này</span>
            </S.CheckboxLabel>

            <S.SubmitBtn type="submit" disabled={loading}>
              {loading ? <S.Spinner /> : (
                <>
                  <span>Đăng nhập</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </>
              )}
            </S.SubmitBtn>

          </form>

          <div style={{ textAlign: 'center', fontSize: '12.5px', color: '#9CA3AF', fontWeight: 500, marginTop: '26px' }}>
            Chưa có tài khoản? <a href="#" style={{ color: '#005A36', fontWeight: 700, textDecoration: 'none' }} onClick={(e) => e.preventDefault()}>Liên hệ quản trị trường</a>
          </div>
        </S.FormPane>
      </S.Card>
    </S.PageContainer>
  );
};
