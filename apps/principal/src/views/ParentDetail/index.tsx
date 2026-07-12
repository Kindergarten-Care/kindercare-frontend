'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@kindercare/core';
import { accountService } from '@/services/account/AccountService';
import { ParentDetailDomainModel } from '@/config/types/account';
import {
  Container, HeaderActions, BtnGhost, BtnDanger,
  Hero, HeroBg, HeroAvatar, HeroAvatarImg, HeroMain, HeroName, HeroMeta, Pill, Cdot,
  CardPad, CardHead, CardTitle, TitleIcon, CountChip,
  InfoGrid, Field, FieldLabel, FieldValue,
  Table, Th, Tr, Td, KidCell, KidAvatar, KidAvatarImg, KidName,
  CodeText, ClassChip, GenderChip, RelText, YesChip, NoChip, DobText, EmptyText,
  ModalOverlay, Modal, ModalHead, ModalHeadTitle, ModalBody, ModalFoot, ModalBtn,
  StateText
} from './styles';

const AVATAR_PALETTE = [
  ['#DB2777', '#f9a8d4'],
  ['#8B5CF6', '#c4b5fd'],
  ['#10b981', '#6ee7b7'],
  ['#F97316', '#fdba74'],
  ['#2563EB', '#60a5fa'],
  ['#14B8A6', '#5eead4'],
  ['#6366F1', '#a5b4fc'],
  ['#0EA5E9', '#7dd3fc'],
];

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

const avatarGradient = (seed: number) => {
  const [from, to] = AVATAR_PALETTE[seed % AVATAR_PALETTE.length];
  return `linear-gradient(140deg, ${from}, ${to})`;
};

type AvatarContentProps = {
  avatarUrl?: string | null;
  fullName?: string;
  ImgComponent: typeof HeroAvatarImg | typeof KidAvatarImg;
};

function AvatarContent({ avatarUrl, fullName, ImgComponent: Img }: AvatarContentProps) {
  const [imgFailed, setImgFailed] = useState(false);

  return avatarUrl && !imgFailed ? (
    <Img src={avatarUrl} alt={fullName} onError={() => setImgFailed(true)} />
  ) : (
    <>{getInitials(fullName)}</>
  );
}

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

  if (loading) return <Container><StateText>Đang tải dữ liệu...</StateText></Container>;
  if (error) return <Container><StateText style={{ color: '#dc2626' }}>{error}</StateText></Container>;
  if (!parent) return null;

  return (
    <Container>
      <HeaderActions>
        <BtnGhost onClick={() => router.back()}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          Quay lại danh sách
        </BtnGhost>
        <BtnDanger onClick={() => setShowResetModal(true)}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
          Khôi phục mật khẩu
        </BtnDanger>
      </HeaderActions>

      <Hero>
        <HeroBg />
        <HeroAvatar>
          <AvatarContent avatarUrl={parent.avatarUrl} fullName={parent.fullName} ImgComponent={HeroAvatarImg} />
        </HeroAvatar>
        <HeroMain>
          <HeroName>{parent.fullName}</HeroName>
          <HeroMeta>
            <Pill $variant="code">@{parent.username}</Pill>
            <Pill $variant="role">
              <Cdot />
              Phụ huynh · {parent.children.length} con đang học
            </Pill>
          </HeroMeta>
        </HeroMain>
      </Hero>

      <CardPad>
        <CardHead>
          <CardTitle>
            <TitleIcon>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
            </TitleIcon>
            Thông tin cá nhân
          </CardTitle>
        </CardHead>
        <InfoGrid>
          <Field><FieldLabel>Họ tên</FieldLabel><FieldValue>{parent.fullName}</FieldValue></Field>
          <Field><FieldLabel>Tên đăng nhập</FieldLabel><FieldValue>{parent.username}</FieldValue></Field>
          <Field><FieldLabel>Email</FieldLabel><FieldValue $muted={!parent.email}>{parent.email || '—'}</FieldValue></Field>
          <Field><FieldLabel>Số điện thoại</FieldLabel><FieldValue $mono $muted={!parent.phoneNumber}>{parent.phoneNumber || '—'}</FieldValue></Field>
          <Field><FieldLabel>Ngày sinh</FieldLabel><FieldValue $mono $muted={!parent.dateOfBirth}>{formatDate(parent.dateOfBirth)}</FieldValue></Field>
          <Field><FieldLabel>Nghề nghiệp</FieldLabel><FieldValue $muted={!parent.job}>{parent.job || '—'}</FieldValue></Field>
          <Field><FieldLabel>CMND / CCCD</FieldLabel><FieldValue $mono $muted={!parent.idCard}>{parent.idCard || '—'}</FieldValue></Field>
          <Field><FieldLabel>Địa chỉ</FieldLabel><FieldValue $muted={!parent.address}>{parent.address || '—'}</FieldValue></Field>
        </InfoGrid>
      </CardPad>

      <CardPad style={{ marginBottom: 0 }}>
        <CardHead style={{ marginBottom: 18 }}>
          <CardTitle>
            <TitleIcon>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1M15 15h2a4 4 0 0 1 4 4v1" /></svg>
            </TitleIcon>
            Danh sách con <CountChip>{parent.children.length}</CountChip>
          </CardTitle>
        </CardHead>

        {parent.children.length === 0 ? (
          <EmptyText>Không có học sinh nào</EmptyText>
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>Mã HS</Th>
                <Th>Họ tên con</Th>
                <Th>Lớp</Th>
                <Th>Ngày sinh</Th>
                <Th>Giới tính</Th>
                <Th>Quan hệ</Th>
                <Th>Đại diện chính</Th>
              </tr>
            </thead>
            <tbody>
              {parent.children.map((c, index) => {
                const isGirl = c.gender?.toLowerCase() === 'nữ' || c.gender?.toLowerCase() === 'female';
                return (
                  <Tr key={c.studentId}>
                    <Td><CodeText>HS-{String(c.studentId).padStart(4, '0')}</CodeText></Td>
                    <Td>
                      <KidCell>
                        <KidAvatar $bg={avatarGradient(index)}>
                          <AvatarContent avatarUrl={c.avatarUrl} fullName={c.fullName} ImgComponent={KidAvatarImg} />
                        </KidAvatar>
                        <KidName>{c.fullName}</KidName>
                      </KidCell>
                    </Td>
                    <Td>{c.className ? <ClassChip>{c.className}</ClassChip> : <span style={{ color: '#9ca3af' }}>—</span>}</Td>
                    <Td><DobText>{formatDate(c.dateOfBirth)}</DobText></Td>
                    <Td>{c.gender ? <GenderChip $girl={isGirl}>{c.gender}</GenderChip> : '—'}</Td>
                    <Td><RelText>{c.relationship || '—'}</RelText></Td>
                    <Td>
                      {c.isPrimary ? (
                        <YesChip>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                          Có
                        </YesChip>
                      ) : (
                        <NoChip>Không</NoChip>
                      )}
                    </Td>
                  </Tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </CardPad>

      {showResetModal && (
        <ModalOverlay onClick={() => !resetting && setShowResetModal(false)}>
          <Modal onClick={e => e.stopPropagation()}>
            <ModalHead>
              <ModalHeadTitle>Xác nhận khôi phục mật khẩu</ModalHeadTitle>
            </ModalHead>
            <ModalBody>
              <p style={{ color: '#4b5563', fontSize: '13.5px', lineHeight: 1.5 }}>
                Bạn có chắc chắn muốn đặt lại mật khẩu của tài khoản <b>{parent.username}</b> về mặc định (123456) không?
              </p>
              {resetError && <p style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '8px' }}>{resetError}</p>}
              <ModalFoot>
                <ModalBtn onClick={() => setShowResetModal(false)} disabled={resetting}>Hủy bỏ</ModalBtn>
                <ModalBtn $danger onClick={handleResetPassword} disabled={resetting}>
                  {resetting ? 'Đang xử lý...' : 'Xác nhận'}
                </ModalBtn>
              </ModalFoot>
            </ModalBody>
          </Modal>
        </ModalOverlay>
      )}
    </Container>
  );
}
