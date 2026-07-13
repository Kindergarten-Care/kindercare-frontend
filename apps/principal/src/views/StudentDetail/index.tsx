'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { studentService } from '@/services/Student/StudentService';
import { StudentDetailDomainModel } from '@/config/types/student';
import { useRouter, useSearchParams } from 'next/navigation';
import { getInitials } from '@/views/AccountList/utils/getInitials';
import AddParentModal from './AddParentModal';
import EditStudentProfileModal from './EditStudentProfileModal';
import {
  Container, LoadingText, ErrorText,
  HeaderActions, BtnGhost, BtnBrand,
  Hero, HeroBg, HeroAvatar, HeroAvatarImg, HeroMain, HeroName, HeroMeta, Pill, Cdot,
  CardPad, CardHead, CardTitle, TitleIcon,
  InfoGrid, Field, FieldLabel, FieldValue, AllergyNote,
  Parents, ParentCard, ParentCardHead, ParentAvatar, ParentAvatarImg, ParentName, ParentRel, PrimaryTag,
  ParentGrid, ContactLine, EmptyText,
} from './styles';

const AVATAR_PALETTE = [
  ['#DB2777', '#f9a8d4'],
  ['#2563EB', '#60a5fa'],
  ['#8B5CF6', '#c4b5fd'],
  ['#10b981', '#6ee7b7'],
  ['#F97316', '#fdba74'],
  ['#0EA5E9', '#7dd3fc'],
];

const avatarGradient = (seed: number) => {
  const [from, to] = AVATAR_PALETTE[seed % AVATAR_PALETTE.length];
  return `linear-gradient(140deg, ${from}, ${to})`;
};

function formatDate(ts: bigint | null): string {
  if (!ts) return '—';
  return new Date(Number(ts) * 1000).toLocaleDateString('vi-VN');
}

function calculateAge(ts: bigint | null): number | null {
  if (!ts) return null;
  const birth = new Date(Number(ts) * 1000);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
  return age;
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

function ParentAvatarView({ avatarUrl, fullName, bg }: { avatarUrl: string | null; fullName: string; bg: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <ParentAvatar $bg={bg}>
      {avatarUrl && !failed ? (
        <ParentAvatarImg src={avatarUrl} alt={fullName} onError={() => setFailed(true)} />
      ) : (
        getInitials(fullName)
      )}
    </ParentAvatar>
  );
}

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
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [heroAvatarFailed, setHeroAvatarFailed] = useState(false);

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

  useEffect(() => {
    setHeroAvatarFailed(false);
  }, [student?.avatarUrl]);

  if (loading) return <Container><LoadingText>Đang tải dữ liệu...</LoadingText></Container>;
  if (error) return <Container><ErrorText>{error}</ErrorText></Container>;
  if (!student) return null;

  const age = calculateAge(student.dateOfBirth);

  return (
    <Container>
      <HeaderActions>
        <BtnGhost onClick={() => (fromClass ? router.back() : router.push('/students'))}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          Quay lại danh sách
        </BtnGhost>
        <BtnBrand onClick={() => setShowEditProfile(true)}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>
          Chỉnh sửa hồ sơ
        </BtnBrand>
      </HeaderActions>

      <Hero>
        <HeroBg />
        <HeroAvatar>
          {student.avatarUrl && !heroAvatarFailed ? (
            <HeroAvatarImg
              src={student.avatarUrl}
              alt={student.fullName}
              onError={() => setHeroAvatarFailed(true)}
            />
          ) : (
            getInitials(student.fullName)
          )}
        </HeroAvatar>
        <HeroMain>
          <HeroName>{student.fullName}</HeroName>
          <HeroMeta>
            <Pill $variant="code">HS-{String(student.id).padStart(4, '0')}</Pill>
            {student.className && (
              <Pill $variant="cls">
                <Cdot />
                {student.className}
              </Pill>
            )}
            <Pill $variant="on">
              <Cdot />
              {statusLabel(student.status)}
            </Pill>
          </HeroMeta>
        </HeroMain>
      </Hero>

      <CardPad>
        <CardHead style={{ marginBottom: 22 }}>
          <CardTitle>
            <TitleIcon>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
            </TitleIcon>
            Thông tin cá nhân
          </CardTitle>
        </CardHead>
        <InfoGrid>
          <Field><FieldLabel>Họ và tên</FieldLabel><FieldValue>{student.fullName}</FieldValue></Field>
          <Field>
            <FieldLabel>Ngày sinh</FieldLabel>
            <FieldValue>
              {formatDate(student.dateOfBirth)}
              {age !== null && <span style={{ color: '#9ca3af', fontWeight: 500 }}> · {age} tuổi</span>}
            </FieldValue>
          </Field>
          <Field><FieldLabel>Giới tính</FieldLabel><FieldValue>{student.gender || '—'}</FieldValue></Field>
          <Field><FieldLabel>Ngày nhập học</FieldLabel><FieldValue $muted={!student.admissionDate}>{formatDate(student.admissionDate)}</FieldValue></Field>
          <Field><FieldLabel>Lớp hiện tại</FieldLabel><FieldValue $muted={!student.className}>{student.className || 'Chưa xếp lớp'}</FieldValue></Field>

          <AllergyNote $hasContent={!!student.allergies}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
            <span>
              <strong>Dị ứng / Bệnh lý:</strong> {student.allergies || 'Không có ghi nhận'}
            </span>
          </AllergyNote>
        </InfoGrid>
      </CardPad>

      <CardPad style={{ marginBottom: 0 }}>
        <CardHead>
          <CardTitle>
            <TitleIcon>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11" /></svg>
            </TitleIcon>
            Thông tin phụ huynh &amp; người thân
          </CardTitle>
          <BtnBrand onClick={() => setShowAddParent(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
            Thêm người thân
          </BtnBrand>
        </CardHead>

        {student.parents && student.parents.length > 0 ? (
          <Parents>
            {student.parents.map((parent, index) => (
              <ParentCard key={parent.parentId}>
                <ParentCardHead>
                  <ParentAvatarView avatarUrl={parent.avatarUrl} fullName={parent.fullName} bg={avatarGradient(index)} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <ParentName>
                      {parent.fullName}
                      {parent.isPrimary && (
                        <PrimaryTag>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                          Liên hệ chính
                        </PrimaryTag>
                      )}
                    </ParentName>
                    <ParentRel>{relationshipLabel(parent.relationship)}</ParentRel>
                  </div>
                </ParentCardHead>

                <ParentGrid>
                  <Field>
                    <FieldLabel>Số điện thoại</FieldLabel>
                    <ContactLine>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>
                      {parent.phoneNumber}
                    </ContactLine>
                  </Field>
                  <Field>
                    <FieldLabel>Nghề nghiệp</FieldLabel>
                    <FieldValue $muted={!parent.occupation}>{parent.occupation || 'Chưa cập nhật'}</FieldValue>
                  </Field>
                  <Field $full>
                    <FieldLabel>Email</FieldLabel>
                    {parent.email ? (
                      <ContactLine>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 6 10-6" /></svg>
                        {parent.email}
                      </ContactLine>
                    ) : (
                      <FieldValue $muted>Chưa cập nhật</FieldValue>
                    )}
                  </Field>
                  <Field $full>
                    <FieldLabel>Địa chỉ</FieldLabel>
                    <FieldValue $muted={!parent.address}>{parent.address || 'Chưa cập nhật'}</FieldValue>
                  </Field>
                </ParentGrid>
              </ParentCard>
            ))}
          </Parents>
        ) : (
          <EmptyText>Chưa có thông tin phụ huynh / người thân</EmptyText>
        )}
      </CardPad>

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

      {showEditProfile && (
        <EditStudentProfileModal
          student={student}
          onClose={() => setShowEditProfile(false)}
          onSuccess={() => {
            setShowEditProfile(false);
            fetchStudentDetail();
          }}
        />
      )}
    </Container>
  );
}
