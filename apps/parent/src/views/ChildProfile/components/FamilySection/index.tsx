'use client';

import React from 'react';
import { RelativeDomainModel } from '@/config/types/relative';
import { getAvatarGradient, getInitials } from '@/utils/Student/Avatar';
import { formatDateFromBigInt } from '@/utils/Student/Date';
import { IconJob, IconCake, IconPhoneCall, IconMail, IconMapPin, IconFamily } from '../../icons';
import * as S from './styles';

interface FamilySectionProps {
  relatives: RelativeDomainModel[];
}

export const FamilySection: React.FC<FamilySectionProps> = ({ relatives }) => (
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
);