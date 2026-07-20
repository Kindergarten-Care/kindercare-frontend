import React from 'react';
import * as S from '../styles';
import { useLogin } from '../hooks/useLogin';

export const LoginForm: React.FC = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    remember,
    setRemember,
    loading,
    errorMsg,
    setErrorMsg,
    handleLogin,
  } = useLogin();

  return (
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
              type={showPassword ? 'text' : 'password'}
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
  );
};
