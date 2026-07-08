'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@kindercare/core';
import { accountService } from '@/services/account/AccountService';
import { TeacherDetailDomainModel } from '@/config/types/account';
import styled from 'styled-components';

const getWorkStatusText = (status?: string | null) => {
  if (!status) return '—';
  const s = status.toLowerCase();
  if (s === 'active') return 'Đang làm việc';
  if (s === 'inactive') return 'Đã nghỉ việc';
  return status;
};
const Container = styled.div`
  padding: 24px;
`;

const BackButton = styled.button`
  background: ${({ theme }) => theme.colors?.surface || '#fff'};
  border: 1px solid ${({ theme }) => theme.colors?.border || '#e5e7eb'};
  color: ${({ theme }) => theme.colors?.muted || '#6b7280'};
  font-weight: 500;
  font-size: 0.9rem;
  padding: 8px 16px;
  border-radius: 9999px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover {
    background: ${({ theme }) => theme.colors?.greenLight || '#e8f5ed'};
    color: ${({ theme }) => theme.colors?.green || '#237A3C'};
    border-color: ${({ theme }) => theme.colors?.greenLight || '#e8f5ed'};
    transform: translateX(-2px);
  }
`;

const Card = styled.div`
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: 24px;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E5E7EB;
  padding-bottom: 16px;
`;

const AvatarWrapper = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #E0E7FF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AvatarText = styled.span`
  color: #4F46E5;
  font-weight: 600;
  font-size: 1.5rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InfoLabel = styled.span`
  font-size: 0.875rem;
  color: #6B7280;
`;

const InfoValue = styled.span`
  font-size: 1rem;
  color: #111827;
  font-weight: 500;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 600;
  color: #4b5563;
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
`;

const Td = styled.td`
  padding: 12px 16px;
  font-size: 0.875rem;
  color: #1f2937;
  border-bottom: 1px solid #e5e7eb;
`;

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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 400px;
  max-width: 90%;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;

const Button = styled.button<{ $danger?: boolean, $primary?: boolean }>`
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ $danger, $primary }) => ($danger ? '#EF4444' : $primary ? '#4F46E5' : '#E5E7EB')};
  color: ${({ $danger, $primary }) => ($danger || $primary ? 'white' : '#374151')};
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default function TeacherDetailView() {
  const { id } = useParams();
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [teacher, setTeacher] = useState<TeacherDetailDomainModel | null>(null);
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
      alert('Reset mật khẩu thành công (Mặc định: 123456)');
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

    accountService.getTeacherDetail(Number(id))
      .then(data => {
        if (isMounted) setTeacher(data);
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
  if (!teacher) return null;

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <BackButton onClick={() => router.back()} style={{ marginBottom: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Quay lại danh sách
        </BackButton>
        <Button $danger onClick={() => setShowResetModal(true)}>
          Khôi phục mật khẩu
        </Button>
      </div>

      <Card>
        <HeaderRow>
          <AvatarWrapper>
            {teacher.avatarUrl ? (
              <AvatarImg src={teacher.avatarUrl} alt={teacher.fullName} />
            ) : (
              <AvatarText>{getInitials(teacher.fullName)}</AvatarText>
            )}
          </AvatarWrapper>
          <div>
            <Title>Thông tin cá nhân (Giáo viên)</Title>
            <div style={{ color: '#6B7280', fontSize: '0.875rem', marginTop: '4px' }}>{teacher.fullName}</div>
          </div>
        </HeaderRow>
        <InfoGrid>
          <InfoItem><InfoLabel>Họ Tên</InfoLabel><InfoValue>{teacher.fullName}</InfoValue></InfoItem>
          <InfoItem><InfoLabel>Tên đăng nhập</InfoLabel><InfoValue>{teacher.username}</InfoValue></InfoItem>
          <InfoItem><InfoLabel>Email</InfoLabel><InfoValue>{teacher.email || '—'}</InfoValue></InfoItem>
          <InfoItem><InfoLabel>Số điện thoại</InfoLabel><InfoValue>{teacher.phoneNumber || '—'}</InfoValue></InfoItem>
          <InfoItem><InfoLabel>Ngày sinh</InfoLabel><InfoValue>{formatDate(teacher.dateOfBirth)}</InfoValue></InfoItem>
          <InfoItem><InfoLabel>Giới tính</InfoLabel><InfoValue>{teacher.gender || '—'}</InfoValue></InfoItem>
          <InfoItem><InfoLabel>CMND/CCCD</InfoLabel><InfoValue>{teacher.idCard || '—'}</InfoValue></InfoItem>
          <InfoItem><InfoLabel>Địa chỉ</InfoLabel><InfoValue>{teacher.address || '—'}</InfoValue></InfoItem>

          <InfoItem><InfoLabel>Trạng thái công việc</InfoLabel><InfoValue>{getWorkStatusText(teacher.workStatus)}</InfoValue></InfoItem>
        </InfoGrid>
      </Card>

      <Card>
        <Title>Danh sách lớp phụ trách ({teacher.totalClasses})</Title>
        <Table>
          <thead>
            <tr>
              <Th>ID Lớp</Th>
              <Th>Tên Lớp</Th>
              <Th>Vai trò trong lớp</Th>
              <Th>Ngày phân công</Th>
            </tr>
          </thead>
          <tbody>
            {teacher.classes.length === 0 ? (
              <tr>
                <Td colSpan={4} style={{ textAlign: 'center' }}>Không có lớp học nào</Td>
              </tr>
            ) : (
              teacher.classes.map(c => (
                <tr key={c.classId}>
                  <Td>{c.classId}</Td>
                  <Td>{c.className}</Td>
                  <Td>{c.roleInClass}</Td>
                  <Td>{formatDate(c.assignedDate)}</Td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card>

      {showResetModal && (
        <ModalOverlay onClick={() => !resetting && setShowResetModal(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <Title>Xác nhận khôi phục mật khẩu</Title>
            <p style={{ color: '#4B5563', marginTop: '12px', fontSize: '0.9rem' }}>
              Bạn có chắc chắn muốn đặt lại mật khẩu của tài khoản <b>{teacher.username}</b> về mặc định (123456) không?
            </p>
            {resetError && <p style={{ color: '#EF4444', fontSize: '0.875rem', marginTop: '8px' }}>{resetError}</p>}
            <ModalActions>
              <Button onClick={() => setShowResetModal(false)} disabled={resetting}>Hủy bỏ</Button>
              <Button $danger onClick={handleResetPassword} disabled={resetting}>
                {resetting ? 'Đang xử lý...' : 'Xác nhận'}
              </Button>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}
