import React from 'react';
import * as S from '../styles';

export const BrandPane: React.FC = () => {
  return (
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
          Chào mừng thầy cô<br />trở lại lớp học 🌿
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
  );
};
