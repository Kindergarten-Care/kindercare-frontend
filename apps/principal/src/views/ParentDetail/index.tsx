'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@kindercare/core';
import { accountService } from '@/services/account/AccountService';
import { ParentDetailDomainModel } from '@/config/types/account';
import {
  Container, TopActions, BackButton, HeaderCard, HeaderLeft, BigAvatar, BigAvatarImg,
  ParentName, ParentMeta, UsernameTag, RoleTag, EditButton,
  SectionCard, SectionHeader, SectionIconWrapper, SectionTitle, CountBadge,
  InfoGrid, InfoItem, InfoLabel, InfoValue,
  Table, Th, Td, Tr, StudentInfoCell, SmallAvatar, SmallAvatarImg, Badge,
  ModalOverlay, ModalContent, ModalActions, ModalButton
} from './styles';

const formatDate = (bigintDate: bigint | null) => {
  if (!bigintDate) return '—';
  return new Date(Number(bigintDate) * 1000).toLocaleDateString('vi-VN');
};

const getInitials = (name?: string) => {
  if (!name) return 'U';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const getAvatarBg = (name: string) => {
  const colors = ['#f472b6', '#818cf8', '#10b981', '#fb923c', '#3b82f6', '#f43f5e'];
  let sum = 0;
  for (let i = 0; i < name.length; i++) {
    sum += name.charCodeAt(i);
  }
  return colors[sum % colors.length];
};

export default function ParentDetailView() {
  const { id } = useParams();
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [parent, setParent] = useState<ParentDetailDomainModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [showResetModal, setShowResetModal] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [resetError, setResetError] = useState('');

  const handleResetPassword = async () => {
    if (!id) return;
    setResetting(true);
    setResetError('');
    try {
      await accountService.resetAccountPassword(Number(id));
      alert('Khôi phục mật khẩu thành công (Mặc định: 123456)');
      setShowResetModal(false);
    } catch (err: any) {
      setResetError(err.message || 'Có lỗi xảy ra');
    } finally {
      setResetting(false);
    }
  };

  useEffect(() => {
    if (authLoading || !isAuthenticated || !id) return;

    let isMounted = true;
    setLoading(true);

    accountService.getParentDetail(Number(id))
      .then(data => {
        if (isMounted) setParent(data);
      })
      .catch(err => {
        if (isMounted) setError(err.message || 'Lỗi khi tải dữ liệu');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [id, isAuthenticated, authLoading]);

  if (loading) return <Container>Đang tải dữ liệu...</Container>;
  if (error) return <Container style={{ color: 'red' }}>{error}</Container>;
  if (!parent) return null;

  return (
    <Container>
      <TopActions>
        <BackButton onClick={() => router.back()}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Quay lại danh sách phụ huynh
        </BackButton>
      </TopActions>

      <HeaderCard>
        <HeaderLeft>
          {parent.avatarUrl ? (
            <BigAvatarImg src={parent.avatarUrl} alt={parent.fullName} />
          ) : (
            <BigAvatar $color="#f97316">{getInitials(parent.fullName)}</BigAvatar>
          )}
          <div>
            <ParentName>{parent.fullName}</ParentName>
            <ParentMeta>
              <UsernameTag>@{parent.username}</UsernameTag>
              <RoleTag>Phụ huynh - {parent.children.length} con đang học</RoleTag>
            </ParentMeta>
          </div>
        </HeaderLeft>
        <EditButton onClick={() => setShowResetModal(true)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
          Chỉnh sửa
        </EditButton>
      </HeaderCard>

      <SectionCard>
        <SectionHeader>
          <SectionIconWrapper>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </SectionIconWrapper>
          <SectionTitle>Thông tin cá nhân</SectionTitle>
        </SectionHeader>
        <InfoGrid>
          <InfoItem><InfoLabel>Họ Tên</InfoLabel><InfoValue>{parent.fullName}</InfoValue></InfoItem>
          <InfoItem><InfoLabel>Tên đăng nhập</InfoLabel><InfoValue>{parent.username}</InfoValue></InfoItem>
          <InfoItem><InfoLabel>Email</InfoLabel><InfoValue>{parent.email || '—'}</InfoValue></InfoItem>
          <InfoItem><InfoLabel>Số điện thoại</InfoLabel><InfoValue>{parent.phoneNumber || '—'}</InfoValue></InfoItem>
          <InfoItem><InfoLabel>Ngày sinh</InfoLabel><InfoValue>{formatDate(parent.dateOfBirth)}</InfoValue></InfoItem>
          <InfoItem><InfoLabel>Nghề nghiệp</InfoLabel><InfoValue>{parent.job || '—'}</InfoValue></InfoItem>
          <InfoItem><InfoLabel>CMND / CCCD</InfoLabel><InfoValue>{parent.idCard || '—'}</InfoValue></InfoItem>
          <InfoItem><InfoLabel>Địa chỉ</InfoLabel><InfoValue>{parent.address || '—'}</InfoValue></InfoItem>
        </InfoGrid>
      </SectionCard>

      <SectionCard>
        <SectionHeader>
          <SectionIconWrapper>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </SectionIconWrapper>
          <SectionTitle>
            Danh sách con
            <CountBadge>{parent.children.length}</CountBadge>
          </SectionTitle>
        </SectionHeader>
        
        <Table>
          <thead>
            <tr>
              <Th>MÃ HS</Th>
              <Th>HỌ TÊN CON</Th>
              <Th>LỚP</Th>
              <Th>NGÀY SINH</Th>
              <Th>GIỚI TÍNH</Th>
              <Th>QUAN HỆ</Th>
              <Th>ĐẠI DIỆN CHÍNH</Th>
            </tr>
          </thead>
          <tbody>
            {parent.children.length === 0 ? (
              <tr>
                <Td colSpan={7} style={{ textAlign: 'center' }}>Không có học sinh nào</Td>
              </tr>
            ) : (
              parent.children.map((c, index) => (
                <Tr key={c.studentId}>
                  <Td style={{ color: '#9ca3af' }}>HS-{String(c.studentId).padStart(4, '0')}</Td>
                  <Td>
                    <StudentInfoCell>
                      {(c as any).avatarUrl ? (
                        <SmallAvatarImg src={(c as any).avatarUrl} alt={c.fullName} />
                      ) : (
                        <SmallAvatar $bg={getAvatarBg(c.fullName)}>{getInitials(c.fullName)}</SmallAvatar>
                      )}
                      <span style={{ fontWeight: 600 }}>{c.fullName}</span>
                    </StudentInfoCell>
                  </Td>
                  <Td><Badge $type="class">{c.className || '—'}</Badge></Td>
                  <Td>{formatDate(c.dateOfBirth)}</Td>
                  <Td>
                    <Badge $type={c.gender === 'Nữ' ? 'genderF' : c.gender === 'Nam' ? 'genderM' : undefined}>
                      {c.gender || '—'}
                    </Badge>
                  </Td>
                  <Td>{c.relationship || '—'}</Td>
                  <Td>
                    {c.isPrimary ? (
                      <Badge $type="primary">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Có
                      </Badge>
                    ) : (
                      '—'
                    )}
                  </Td>
                </Tr>
              ))
            )}
          </tbody>
        </Table>
      </SectionCard>

      {showResetModal && (
        <ModalOverlay onClick={() => !resetting && setShowResetModal(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Xác nhận thay đổi</h2>
            <p style={{ color: '#4B5563', marginTop: '12px', fontSize: '0.9rem' }}>
              Chức năng cập nhật phụ huynh đang được phát triển. Bạn có muốn đặt lại mật khẩu của tài khoản <b>{parent.username}</b> về mặc định (123456) không?
            </p>
            {resetError && <p style={{ color: '#EF4444', fontSize: '0.875rem', marginTop: '8px' }}>{resetError}</p>}
            <ModalActions>
              <ModalButton onClick={() => setShowResetModal(false)} disabled={resetting}>Hủy bỏ</ModalButton>
              <ModalButton $danger onClick={handleResetPassword} disabled={resetting}>
                {resetting ? 'Đang xử lý...' : 'Khôi phục mật khẩu'}
              </ModalButton>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}
