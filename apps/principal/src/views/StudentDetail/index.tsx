'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { studentService } from '@/services/Student/StudentService';
import { StudentDetailDomainModel } from '@/config/types/student';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Container,
  LoadingText,
  ErrorText,
  HeaderCard,
  AvatarWrapper,
  InitialsText,
  HeaderInfo,
  StudentName,
  BadgeRow,
  Badge,
  HeaderActions,
  ChangeClassButton,
  BackButton,
  TopBackButton,
  SectionCard,
  SectionHeader,
  SectionIcon,
  SectionTitle,
  InfoGrid,
  InfoItem,
  InfoLabel,
  InfoValue,
  EmptyText,
  ParentCard,
  ParentHeader,
  ParentName,
  ParentRelationship,
  PrimaryBadge,
  ActionButton,
  AddButton,
  AllergyNote,
} from './styles';
import AddParentModal from './AddParentModal';

// ─── Helpers ───
function formatDate(ts: bigint | null): string {
  if (!ts) return '—';
  return new Date(Number(ts) * 1000).toLocaleDateString('vi-VN');
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function statusLabel(s: string): string {
  switch (s) {
    case 'Studying': return 'Đang học';
    case 'Graduated': return 'Đã tốt nghiệp';
    case 'Transferred': return 'Đã chuyển trường';
    case 'Dropout': return 'Nghỉ học';
    default: return s;
  }
}

function relationshipLabel(r: string): string {
  switch (r) {
    case 'Father': return 'Bố';
    case 'Mother': return 'Mẹ';
    case 'Grandfather': return 'Ông';
    case 'Grandmother': return 'Bà';
    case 'Guardian': return 'Người giám hộ';
    case 'Sibling': return 'Anh/Chị/Em';
    default: return r;
  }
}

// ─── Icons ───
const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const SwapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 3 21 3 21 8"/>
    <line x1="4" y1="20" x2="21" y2="3"/>
    <polyline points="21 16 21 21 16 21"/>
    <line x1="15" y1="15" x2="21" y2="21"/>
    <line x1="4" y1="4" x2="9" y2="9"/>
  </svg>
);

const BackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const AlertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.19h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const IDCardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2"/>
    <line x1="2" y1="10" x2="22" y2="10"/>
  </svg>
);

// ─── Main Component ───
interface StudentDetailProps {
  studentId: string;
}

export default function StudentDetailView({ studentId }: StudentDetailProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromClass = searchParams?.get('from') === 'class';
  
  const [student, setStudent] = useState<StudentDetailDomainModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddParent, setShowAddParent] = useState(false);

  const fetchStudentDetail = useCallback(async () => {
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
      <TopBackButton onClick={() => {
        if (fromClass) {
          router.back();
        } else {
          router.push('/students');
        }
      }} title="Quay lại">
        <BackIcon />
        Quay lại
      </TopBackButton>

      {/* ─── Header Card ─── */}
      <HeaderCard>
        <AvatarWrapper>
          {student.avatarUrl ? (
            <img src={student.avatarUrl} alt={student.fullName} />
          ) : (
            <InitialsText>{getInitials(student.fullName)}</InitialsText>
          )}
        </AvatarWrapper>

        <HeaderInfo>
          <StudentName>{student.fullName}</StudentName>
          <BadgeRow>
            {/* Mã học sinh */}
            <Badge $variant="code">
              <IDCardIcon />
              HS-{String(student.id).padStart(4, '0')}
            </Badge>
            {/* Lớp */}
            {student.className && (
              <Badge $variant="class">
                {student.className}
              </Badge>
            )}
            {/* Trạng thái */}
            <Badge $variant="status">
              {statusLabel(student.status)}
            </Badge>
          </BadgeRow>
        </HeaderInfo>


      </HeaderCard>

      {/* ─── Thông tin cá nhân ─── */}
      <SectionCard>
        <SectionHeader>
          <SectionIcon><UserIcon /></SectionIcon>
          <SectionTitle>Thông tin cá nhân</SectionTitle>
        </SectionHeader>

        <InfoGrid>
          <InfoItem>
            <InfoLabel>Họ và tên</InfoLabel>
            <InfoValue>{student.fullName}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Ngày sinh</InfoLabel>
            <InfoValue>{formatDate(student.dateOfBirth)}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Giới tính</InfoLabel>
            <InfoValue>{student.gender === 'Male' ? 'Nam' : student.gender === 'Female' ? 'Nữ' : '—'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Ngày nhập học</InfoLabel>
            <InfoValue>{formatDate(student.admissionDate)}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Lớp hiện tại</InfoLabel>
            <InfoValue>{student.className || 'Chưa xếp lớp'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Nhóm máu</InfoLabel>
            <InfoValue>—</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Mã định danh</InfoLabel>
            <InfoValue>—</InfoValue>
          </InfoItem>

          {/* Ghi chú dị ứng — full width */}
          <AllergyNote $hasContent={!!student.allergies}>
            <AlertIcon />
            <span>
              <strong>Dị ứng / Bệnh lý:</strong>{' '}
              {student.allergies || 'Không có ghi nhận'}
            </span>
          </AllergyNote>
        </InfoGrid>
      </SectionCard>

      {/* ─── Thông tin phụ huynh & người thân ─── */}
      <SectionCard>
        <SectionHeader>
          <SectionIcon><UsersIcon /></SectionIcon>
          <SectionTitle>Thông tin phụ huynh &amp; người thân</SectionTitle>
          <AddButton
            onClick={() => setShowAddParent(true)}
            style={{ marginLeft: 'auto' }}
          >
            <PlusIcon />
            Thêm người thân
          </AddButton>
        </SectionHeader>

        {student.parents && student.parents.length > 0 ? (
          student.parents.map(parent => (
            <ParentCard key={parent.parentId}>
              <ParentHeader>
                <ParentName>
                  {parent.fullName}
                  <ParentRelationship>
                    {relationshipLabel(parent.relationship)}
                  </ParentRelationship>
                  {parent.isPrimary && <PrimaryBadge>Liên hệ chính</PrimaryBadge>}
                </ParentName>
                <ActionButton>
                  <PhoneIcon />
                  {parent.phoneNumber}
                </ActionButton>
              </ParentHeader>

              <InfoGrid>
                <InfoItem>
                  <InfoLabel>Số điện thoại</InfoLabel>
                  <InfoValue>{parent.phoneNumber}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Email</InfoLabel>
                  <InfoValue>{parent.email || '—'}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Nghề nghiệp</InfoLabel>
                  <InfoValue>{parent.occupation || '—'}</InfoValue>
                </InfoItem>
              </InfoGrid>
            </ParentCard>
          ))
        ) : (
          <EmptyText>Chưa có thông tin phụ huynh / người thân</EmptyText>
        )}
      </SectionCard>

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
