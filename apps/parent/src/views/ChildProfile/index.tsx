'use client';

import React from 'react';
import * as S from './styles';
import { useChildProfile } from './hooks/useChildProfile';
import { getAvatarGradient, getInitials } from '@/utils/Student/Avatar';
import { formatDateFromBigInt } from '@/utils/Student/Date';
import { kcToast } from '@kindercare/ui';
import {
  IconCake, IconGender, IconIdCard, IconEnroll, IconStatusCheck, IconClassCap,
  IconJob, IconPhoneCall, IconMail, IconMapPin, IconFamily,
} from './icons';
import { IconChat } from '@/assets/icons/dashboard';

export function ChildProfile() {
  const {
    loading, activeStudent, relatives, teacherDisplayName,
    age, avatarInitial, dobFormatted, admissionFormatted,
  } = useChildProfile();

  if (loading || !activeStudent) {
    return (
      <S.PageWrap>
        <div style={{ padding: 40, color: '#6B7280' }}>Đang tải hồ sơ...</div>
      </S.PageWrap>
    );
  }

  const childInfoRows = [
    { k: 'Ngày sinh', v: age !== null ? `${dobFormatted} · ${age} tuổi` : dobFormatted, icon: <IconCake size={18} />, c: '#DB2777', tint: '#FCE7F2' },
    { k: 'Giới tính', v: activeStudent.gender || '--', icon: <IconGender size={18} />, c: '#2563EB', tint: '#E3EDFD' },
    { k: 'Mã học sinh', v: String(activeStudent.studentId), icon: <IconIdCard size={18} />, c: '#8B5CF6', tint: '#F1ECFE' },
    { k: 'Ngày nhập học', v: admissionFormatted, icon: <IconEnroll size={18} />, c: '#005A36', tint: '#E6F3ED' },
    { k: 'Lớp đang học', v: teacherDisplayName ? `${activeStudent.className} · GVCN ${teacherDisplayName}` : activeStudent.className, icon: <IconClassCap size={18} />, c: '#0E8A7D', tint: '#D7F0EC' },
    { k: 'Trạng thái', v: activeStudent.enrollmentStatus || '--', icon: <IconStatusCheck size={18} />, c: '#005A36', tint: '#E6F3ED' },
  ];

  return (
    <S.PageWrap>
      <S.PageHeader>
        <div>
          <S.PageTitle>Hồ sơ bé</S.PageTitle>
          <S.PageSub>Thông tin cá nhân của bé và gia đình</S.PageSub>
        </div>
        <S.HeaderActions>
          <S.BtnGhost onClick={() => kcToast.info('Yêu cầu cập nhật hồ sơ đã được ghi nhận')}>
            <IconChat size={16} /> Yêu cầu cập nhật
          </S.BtnGhost>
        </S.HeaderActions>
      </S.PageHeader>

      {/* Child profile — full-width horizontal banner */}
      <S.Section>
        <S.SecHead>
          <S.SecIcon><IconFamily size={18} /></S.SecIcon>
          <S.SecTitle>Thông tin của bé</S.SecTitle>
        </S.SecHead>
        <S.ChildBanner>
          <S.ChildIdentity>
            <S.ChildAvatar $gradient={getAvatarGradient(activeStudent.studentId)}>
              {activeStudent.avatarUrl ? (
                <img src={activeStudent.avatarUrl} alt={activeStudent.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
              ) : (
                avatarInitial
              )}
            </S.ChildAvatar>
            <div>
              <S.ChildName>{activeStudent.fullName}</S.ChildName>
              <S.ChildTags>
                <S.CTag $variant="class"><IconClassCap size={13} /> {activeStudent.className}</S.CTag>
                <S.CTag $variant="status"><S.StatusDot /> {activeStudent.enrollmentStatus || 'Đang theo học'}</S.CTag>
              </S.ChildTags>
            </div>
          </S.ChildIdentity>

          <S.InfoDivider />

          <S.InfoGrid>
            {childInfoRows.map(row => (
              <S.InfoRow key={row.k} $c={row.c} $tint={row.tint}>
                <S.InfoIcon>{row.icon}</S.InfoIcon>
                <S.InfoMain>
                  <S.InfoKey>{row.k}</S.InfoKey>
                  <S.InfoValue>{row.v}</S.InfoValue>
                </S.InfoMain>
              </S.InfoRow>
            ))}
          </S.InfoGrid>
        </S.ChildBanner>
      </S.Section>

      {/* Family — one card per relative returned by the API */}
      <S.Section>
        <S.SecHead>
          <S.SecIcon $bg="#F1ECFE" $fg="#8B5CF6"><IconFamily size={18} /></S.SecIcon>
          <S.SecTitle>Người thân trong gia đình</S.SecTitle>
          <S.SecSub>{relatives.length} thành viên</S.SecSub>
        </S.SecHead>

        {relatives.length === 0 ? (
          <S.Card>
            <S.EmptyState>Chưa có thông tin người thân.</S.EmptyState>
          </S.Card>
        ) : (
          <S.FamilyGrid>
            {relatives.map(p => {
              const c = p.isPrimary ? '#2563EB' : '#DB2777';
              const tint = p.isPrimary ? '#E3EDFD' : '#FCE7F2';
              const gradient = getAvatarGradient(p.parentId);
              const initials = getInitials(p.fullName);

              return (
                <S.RelCard key={p.parentId} $c={c}>
                  <S.RelHead $tint={tint}>
                    <S.RelAvatar $gradient={gradient}>
                      {p.avatarUrl ? (
                        <img src={p.avatarUrl} alt={p.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
                      ) : (
                        initials
                      )}
                    </S.RelAvatar>
                    <S.RelId>
                      <S.RelRole>{p.relationship}</S.RelRole>
                      <S.RelName>{p.fullName}</S.RelName>
                      <S.RelJob><IconJob size={13} /> {p.job || 'Chưa cập nhật'}</S.RelJob>
                    </S.RelId>
                    {p.isPrimary === 1 && <S.RelPrimary>Liên hệ chính</S.RelPrimary>}
                  </S.RelHead>
                  <S.RelBody>
                    <S.RelItem>
                      <S.RelItemIcon><IconCake size={17} /></S.RelItemIcon>
                      <S.RelItemMain>
                        <S.RelItemKey>Ngày sinh</S.RelItemKey>
                        <S.RelItemValue>{formatDateFromBigInt(p.dateOfBirth)}</S.RelItemValue>
                      </S.RelItemMain>
                    </S.RelItem>
                    <S.RelItem>
                      <S.RelItemIcon><IconPhoneCall size={17} /></S.RelItemIcon>
                      <S.RelItemMain>
                        <S.RelItemKey>Số điện thoại</S.RelItemKey>
                        <S.RelItemValue>{p.phoneNumber || '--'}</S.RelItemValue>
                      </S.RelItemMain>
                    </S.RelItem>
                    <S.RelItem>
                      <S.RelItemIcon><IconMail size={17} /></S.RelItemIcon>
                      <S.RelItemMain>
                        <S.RelItemKey>Email</S.RelItemKey>
                        <S.RelItemValue>{p.email || '--'}</S.RelItemValue>
                      </S.RelItemMain>
                    </S.RelItem>
                    <S.RelItem>
                      <S.RelItemIcon><IconMapPin size={17} /></S.RelItemIcon>
                      <S.RelItemMain>
                        <S.RelItemKey>Địa chỉ</S.RelItemKey>
                        <S.RelItemValue>{p.address || 'Chưa cập nhật'}</S.RelItemValue>
                      </S.RelItemMain>
                    </S.RelItem>
                  </S.RelBody>
                </S.RelCard>
              );
            })}
          </S.FamilyGrid>
        )}
      </S.Section>
    </S.PageWrap>
  );
}
