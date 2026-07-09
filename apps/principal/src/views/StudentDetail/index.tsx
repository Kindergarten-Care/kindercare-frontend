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
  Avatar
} from './styles';

interface StudentDetailProps {
  studentId: string;
}

export default function StudentDetailView({ studentId }: StudentDetailProps) {
  const router = useRouter();
  const [student, setStudent] = useState<StudentDetailDomainModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
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
    };
    if (studentId) {
      fetchDetail();
    }
  }, [studentId]);

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
        <Avatar>
          {student.avatarUrl ? (
            <img src={student.avatarUrl} alt={student.fullName} />
          ) : (
            student.fullName?.charAt(0)
          )}
        </Avatar>
        <CardTitle>Thông tin cá nhân</CardTitle>
        <InfoGrid>
          <InfoItem>
            <InfoLabel>Họ và Tên</InfoLabel>
            <InfoValue>{student.fullName}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Ngày sinh</InfoLabel>
            <InfoValue>
              {student.dateOfBirth ? new Date(Number(student.dateOfBirth) * 1000).toLocaleDateString('vi-VN') : '—'}
            </InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Giới tính</InfoLabel>
            <InfoValue>{student.gender === 'Male' ? 'Nam' : student.gender === 'Female' ? 'Nữ' : 'Khác'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Lớp học</InfoLabel>
            <InfoValue>{student.className || 'Chưa xếp lớp'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Dị ứng (Lưu ý y tế)</InfoLabel>
            <InfoValue>{student.allergies || 'Không có'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Ngày nhập học</InfoLabel>
            <InfoValue>
              {student.admissionDate ? new Date(Number(student.admissionDate) * 1000).toLocaleDateString('vi-VN') : '—'}
            </InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Trạng thái</InfoLabel>
            <InfoValue>
              {student.status === 'Studying' ? 'Đang học' : student.status}
            </InfoValue>
          </InfoItem>
        </InfoGrid>
      </Card>

      <Card>
        <CardTitle>Thông tin phụ huynh</CardTitle>
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
                    <InfoValue>{parent.email}</InfoValue>
                  </InfoItem>
                </InfoGrid>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ color: '#64748b' }}>Chưa có thông tin phụ huynh</div>
        )}
      </Card>
    </Container>
  );
}
