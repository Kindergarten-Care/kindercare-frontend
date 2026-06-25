import React, { useState } from 'react';
import * as S from './styles';
import { useTeacherProfile } from '@/hooks/useTeacherQueries';
import dynamic from 'next/dynamic';

// Lazy load modals for better performance
// const EditProfileModal = dynamic(() => import('./components/EditProfileModal').then(mod => mod.EditProfileModal), { ssr: false });
// const ChangePasswordModal = dynamic(() => import('./components/ChangePasswordModal').then(mod => mod.ChangePasswordModal), { ssr: false });

export const TeacherProfileView: React.FC = () => {
  const { data: profile, isLoading } = useTeacherProfile();
  
  if (isLoading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Đang tải hồ sơ...</div>;
  }

  if (!profile) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Không có dữ liệu hồ sơ.</div>;
  }

  const formatDOB = (dobSeconds?: bigint | null) => {
    if (!dobSeconds) return 'Chưa cập nhật';
    return new Date(Number(dobSeconds) * 1000).toLocaleDateString('vi-VN');
  };

  return (
    <S.Container>
      <S.BentoGrid>
        
        {/* Main Identity Box */}
        <S.Box $spanCol={2} $spanRow={2} $bg="#005A36" $color="#FFF">
          <S.AvatarBox>
            <S.ProfileAvatar 
              src={profile.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullName)}&background=random`} 
              alt={profile.fullName}
              fill
              sizes="120px"
            />
          </S.AvatarBox>
          <S.Title>{profile.fullName}</S.Title>
          <S.SubTitle>{profile.professionalRank || 'Giáo viên mầm non'}</S.SubTitle>
          <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
            <S.ActionButton $primary style={{ background: '#FFF', color: '#005A36' }}>
              Cập nhật Avatar
            </S.ActionButton>
          </div>
        </S.Box>

        {/* Status Box */}
        <S.Box $spanCol={1} $spanRow={1} $bg="#ECFDF5" $color="#065F46">
          <S.StatLabel style={{ color: '#059669' }}>Trạng thái</S.StatLabel>
          <S.Title>{profile.workStatus === 'Active' ? 'Đang làm việc' : profile.workStatus}</S.Title>
          <S.SubTitle style={{ marginTop: 'auto', opacity: 1, color: '#10B981' }}>● Online</S.SubTitle>
        </S.Box>

        {/* Years of Experience / Stats */}
        <S.Box $spanCol={1} $spanRow={1} $bg="#EFF6FF" $color="#1E3A8A">
          <S.StatLabel style={{ color: '#2563EB' }}>Đánh giá</S.StatLabel>
          <S.StatNumber>4.9/5</S.StatNumber>
          <S.SubTitle style={{ marginTop: '8px', color: '#3B82F6' }}>Từ phụ huynh</S.SubTitle>
        </S.Box>

        {/* Contact Info Box */}
        <S.Box $spanCol={2} $spanRow={2}>
          <S.Title style={{ fontSize: '20px', marginBottom: '16px' }}>Thông tin liên hệ</S.Title>
          <S.InfoList>
            <S.InfoItem>
              <S.InfoLabel>Số điện thoại</S.InfoLabel>
              <S.InfoValue>{profile.phoneNumber || 'Chưa cập nhật'}</S.InfoValue>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoLabel>Email</S.InfoLabel>
              <S.InfoValue>{profile.email || 'Chưa cập nhật'}</S.InfoValue>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoLabel>Địa chỉ</S.InfoLabel>
              <S.InfoValue>{profile.address || 'Chưa cập nhật'}</S.InfoValue>
            </S.InfoItem>
          </S.InfoList>
        </S.Box>

        {/* Personal Details Box */}
        <S.Box $spanCol={2} $spanRow={1}>
          <S.Title style={{ fontSize: '20px', marginBottom: '16px' }}>Thông tin cá nhân</S.Title>
          <S.InfoList>
            <S.InfoItem>
              <S.InfoLabel>Ngày sinh</S.InfoLabel>
              <S.InfoValue>{formatDOB(profile.dateOfBirth)}</S.InfoValue>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoLabel>Giới tính</S.InfoLabel>
              <S.InfoValue>{profile.gender === 'Female' ? 'Nữ' : 'Nam'}</S.InfoValue>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoLabel>CCCD/CMND</S.InfoLabel>
              <S.InfoValue>{profile.idCard || 'Chưa cập nhật'}</S.InfoValue>
            </S.InfoItem>
          </S.InfoList>
        </S.Box>

        {/* Action Box */}
        <S.Box $spanCol={2} $spanRow={1}>
          <div style={{ display: 'flex', gap: '16px', height: '100%', alignItems: 'center' }}>
            <S.ActionButton $primary>Chỉnh sửa hồ sơ</S.ActionButton>
            <S.ActionButton>Đổi mật khẩu</S.ActionButton>
          </div>
        </S.Box>

      </S.BentoGrid>
    </S.Container>
  );
};
