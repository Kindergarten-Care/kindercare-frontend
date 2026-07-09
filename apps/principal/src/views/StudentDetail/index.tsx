'use client';

import React, { useEffect, useState } from 'react';
import { studentService } from '@/services/Student/StudentService';
import { StudentDetailDomainModel } from '@/config/types/student';
import { useRouter } from '@/i18n/routing';
import {
  Container,
  Header,
  BackButton,
  LoadingText,
  ErrorText,
  Title,
  Card,
  CardTitle,
  InfoGrid,
  InfoItem,
  InfoLabel,
  InfoValue,
  Avatar,
  Badge,
  AvatarWrapper,
'use client';

import React, { useEffect, useState } from 'react';
import { studentService } from '@/services/Student/StudentService';
import { StudentDetailDomainModel } from '@/config/types/student';
import { useRouter } from '@/i18n/routing';
import {
  Container,
  Header,
  BackButton,
  LoadingText,
  ErrorText,
  Title,
  Card,
  CardTitle,
  InfoGrid,
  InfoItem,
  InfoLabel,
  InfoValue,
  Avatar,
  Badge,
  AvatarWrapper,
  InitialsText
} from './styles';
import { getInitials } from '../AccountList/utils/getInitials';
import AddParentModal from './AddParentModal';
import styled from 'styled-components';

const PrimaryButton = styled.button`
  padding: 8px 16px;
  background-color: #047857;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #065f46;
  }
`;

interface StudentDetailProps {
  studentId: string;
}

export default function StudentDetailView({ studentId }: StudentDetailProps) {
  const router = useRouter();
  const [student, setStudent] = useState<StudentDetailDomainModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddParent, setShowAddParent] = useState(false);

  const fetchStudentDetail = React.useCallback(async () => {
    try {
      setLoading(true);
      const data = await studentService.getStudentDetail(studentId);
      setStudent(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Lỗi khi tải hồ sơ học sinh');
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    if (studentId) {
      fetchStudentDetail();
    }
  }, [studentId, fetchStudentDetail]);

  if (loading) return <Container><LoadingText>Đang tải dữ liệu...</LoadingText></Container>;
  if (error) return <Container><ErrorText>{error}</ErrorText></Container>;
  if (!student) return null;

  return (
    <Container>
      <Header>
        <BackButton onClick={() => router.back()} title="Quay lại">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </BackButton>
        <Title>Hồ sơ học sinh</Title>
      </Header>

      <Card>
        <AvatarWrapper>
          {student.avatarUrl ? (
            <img src={student.avatarUrl} alt={student.fullName} />
          ) : (
            <InitialsText>{getInitials(student.fullName)}</InitialsText>
          )}
        </AvatarWrapper>
        <CardTitle>Thông tin cá nhân</CardTitle>
        <InfoGrid>
          <InfoItem>
            <InfoLabel>Họ và tên</InfoLabel>
            <InfoValue>{student.fullName}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Ngày sinh</InfoLabel>
            <InfoValue>{student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString('vi-VN') : 'N/A'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Giới tính</InfoLabel>
            <InfoValue>{student.gender || 'N/A'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Ngày nhập học</InfoLabel>
            <InfoValue>{student.admissionDate ? new Date(student.admissionDate).toLocaleDateString('vi-VN') : 'N/A'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Lớp hiện tại</InfoLabel>
            <InfoValue>{student.className || 'Chưa xếp lớp'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Trạng thái</InfoLabel>
            <InfoValue>
              <Badge>{student.status}</Badge>
            </InfoValue>
          </InfoItem>
          <InfoItem style={{ gridColumn: '1 / -1' }}>
            <InfoLabel>Ghi chú dị ứng / Bệnh lý</InfoLabel>
            <InfoValue>{student.allergies || 'Không có'}</InfoValue>
          </InfoItem>
        </InfoGrid>
      </Card>

      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <CardTitle style={{ marginBottom: 0 }}>Thông tin phụ huynh</CardTitle>
          <PrimaryButton onClick={() => setShowAddParent(true)}>+ Thêm phụ huynh / người thân</PrimaryButton>
        </div>
        
        {student.parents && student.parents.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {student.parents.map(parent => (
              <div key={parent.parentId} style={{ paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ fontWeight: 600, color: '#0f172a', marginBottom: '12px' }}>
                  {parent.fullName} 
                  <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 400, marginLeft: '8px' }}>
                    ({parent.relationship === 'Father' ? 'Bố' : parent.relationship === 'Mother' ? 'Mẹ' : parent.relationship})
                  </span>
                  {parent.isPrimary && (
                    <span style={{ fontSize: '12px', background: '#e0e7ff', color: '#4338ca', padding: '2px 8px', borderRadius: '12px', marginLeft: '8px' }}>
                      Liên hệ chính
                    </span>
                  )}
                </div>
                <InfoGrid>
                  <InfoItem>
                    <InfoLabel>Số điện thoại</InfoLabel>
                    <InfoValue>{parent.phoneNumber}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Email</InfoLabel>
                    <InfoValue>{parent.email || 'N/A'}</InfoValue>
                  </InfoItem>
                </InfoGrid>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ color: '#64748b' }}>
            <p>Chưa có thông tin phụ huynh</p>
          </div>
        )}
      </Card>

      {showAddParent && (
        <AddParentModal 
          studentId={Number(studentId)}
          onClose={() => setShowAddParent(false)}
          onSuccess={() => {
            setShowAddParent(false);
            fetchStudentDetail();
          }}
        />
      )}
    </Container>
  );
}
