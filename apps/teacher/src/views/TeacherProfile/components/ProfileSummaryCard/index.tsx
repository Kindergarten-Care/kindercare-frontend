import React from 'react';
import * as S from './styles';
import { AuthUser } from '@/contexts/AuthContext';

interface ProfileSummaryCardProps {
  user: AuthUser;
}

export const ProfileSummaryCard: React.FC<ProfileSummaryCardProps> = ({ user }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <S.CardContainer>
        <S.AvatarWrapper>
          <img src={user?.avatarUrl || 'https://via.placeholder.com/140'} alt="Teacher Avatar" />
          <S.EditAvatarButton title="Chỉnh sửa ảnh đại diện">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </S.EditAvatarButton>
        </S.AvatarWrapper>

        <S.TeacherName>{user?.fullName || 'Cô Thu Huyền'}</S.TeacherName>
        <S.RoleBadge>{user?.roleName === 'Teacher' ? 'Giáo viên' : (user?.roleName || 'Giáo viên')}</S.RoleBadge>

        <S.InfoList>
          <S.InfoRow>
            <S.InfoLabel>Mã NV</S.InfoLabel>
            <S.InfoValue>GV-{String(user?.userId || '').padStart(3, '0')}</S.InfoValue>
          </S.InfoRow>
          <S.InfoRow>
            <S.InfoLabel>Ngày vào làm</S.InfoLabel>
            <S.InfoValue>15/08/2023</S.InfoValue>
          </S.InfoRow>
          <S.InfoRow>
            <S.InfoLabel>Trạng thái</S.InfoLabel>
            <S.InfoValue style={{ color: user?.status === 'Active' || user?.workStatus === 'Active' ? '#10B981' : '#EF4444' }}>
              {user?.status === 'Active' || user?.workStatus === 'Active' ? 'Đang công tác' : 'Tạm nghỉ'}
            </S.InfoValue>
          </S.InfoRow>
        </S.InfoList>

        <S.UpdateRequestButton>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          Yêu cầu phòng NS cập nhật
        </S.UpdateRequestButton>
      </S.CardContainer>

      <S.QuickStatsContainer>
        <S.StatBox>
          <S.StatLabel>Điểm danh tháng</S.StatLabel>
          <S.StatValue>22/22</S.StatValue>
        </S.StatBox>
        <S.StatBox>
          <S.StatLabel>Phản hồi PH</S.StatLabel>
          <S.StatValue style={{ color: '#10B981' }}>4.9/5</S.StatValue>
        </S.StatBox>
      </S.QuickStatsContainer>
    </div>
  );
};
