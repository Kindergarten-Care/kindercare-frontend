import React from 'react';
import * as S from './styles';
import { AuthUser } from '@/contexts/AuthContext';

interface PersonalInfoTabProps {
  user: AuthUser;
}

export const PersonalInfoTab: React.FC<PersonalInfoTabProps> = ({ user }) => {
  return (
    <div>
      <S.Section>
        <S.SectionTitle>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          Thông tin cơ bản
        </S.SectionTitle>
        <S.GridContainer>
          <S.FieldGroup>
            <S.Label>Họ và tên</S.Label>
            <S.ValueBox>{user?.fullName || 'Nguyễn Thị Thu Huyền'}</S.ValueBox>
          </S.FieldGroup>
          <S.FieldGroup>
            <S.Label>Ngày sinh</S.Label>
            <S.ValueBox>20/10/1995</S.ValueBox>
          </S.FieldGroup>
          <S.FieldGroup>
            <S.Label>Giới tính</S.Label>
            <S.ValueBox>Nữ</S.ValueBox>
          </S.FieldGroup>
          <S.FieldGroup>
            <S.Label>Số CCCD</S.Label>
            <S.ValueBox>079195001234</S.ValueBox>
          </S.FieldGroup>
        </S.GridContainer>
      </S.Section>

      <S.Section>
        <S.SectionTitle>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          Thông tin liên hệ
        </S.SectionTitle>
        <S.GridContainer>
          <S.FieldGroup>
            <S.Label>Số điện thoại</S.Label>
            <S.ValueBox>{user?.phoneNumber || user?.phone || '0901234567'}</S.ValueBox>
          </S.FieldGroup>
          <S.FieldGroup>
            <S.Label>Email</S.Label>
            <S.ValueBox>{user?.email || 'huyen.nguyen@kindercare.edu.vn'}</S.ValueBox>
          </S.FieldGroup>
          <S.FieldGroup $fullWidth>
            <S.Label>Địa chỉ thường trú</S.Label>
            <S.ValueBox>{user?.address || '123 Đường A, Quận 1, TP.HCM'}</S.ValueBox>
          </S.FieldGroup>
        </S.GridContainer>
      </S.Section>
    </div>
  );
};
