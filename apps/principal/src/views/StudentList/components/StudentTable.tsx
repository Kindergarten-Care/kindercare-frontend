'use client';

import React from 'react';
import { getInitials } from '@/views/AccountList/utils/getInitials';
import { formatTimestamp } from '@/utils/date';
import { ViewIcon } from '@/icons/ViewIcon';
import { StudentDetailDomainModel } from '@/config/types/student';
import {
  TableCard,
  Table,
  Th,
  Tr,
  Td,
  RowNum,
  IconBtn,
  LoadingText,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptySubtitle,
  PaginationBar,
  PaginationInfo,
  PaginationControls,
  PageNavBtn,
  StatusBadge,
  Cdot,
  StudentRowCell,
  StudentAvatar,
  StudentAvatarImg,
  StudentNameGroup,
  StudentName,
  StudentMeta,
  GenderBadge,
} from '../styles';

const AVATAR_PALETTE = [
  ['#F97316', '#fdba74'],
  ['#2563EB', '#60a5fa'],
  ['#10b981', '#6ee7b7'],
  ['#DB2777', '#f9a8d4'],
  ['#8B5CF6', '#c4b5fd'],
  ['#0EA5E9', '#7dd3fc'],
  ['#F59E0B', '#fcd34d'],
  ['#14B8A6', '#5eead4'],
  ['#6366F1', '#a5b4fc'],
];

const avatarGradient = (seed: number) => {
  const [from, to] = AVATAR_PALETTE[seed % AVATAR_PALETTE.length];
  return `linear-gradient(140deg, ${from}, ${to})`;
};

interface StudentTableProps {
  students: StudentDetailDomainModel[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  startIndex: number;
  onViewProfile: (id: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  onGoToPage: (page: number) => void;
}

const buildPageList = (currentPage: number, totalPages: number): (number | '…')[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages = new Set<number>([1, 2, totalPages - 1, totalPages, currentPage - 1, currentPage, currentPage + 1]);
  const sorted = Array.from(pages).filter(p => p >= 1 && p <= totalPages).sort((a, b) => a - b);
  const result: (number | '…')[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) result.push('…');
    result.push(p);
  });
  return result;
};

export default function StudentTable({
  students,
  loading,
  error,
  currentPage,
  totalPages,
  startIndex,
  onViewProfile,
  onPrevPage,
  onNextPage,
  onGoToPage,
}: StudentTableProps) {
  if (loading) {
    return (
      <TableCard>
        <LoadingText>Đang tải dữ liệu học sinh...</LoadingText>
      </TableCard>
    );
  }

  if (error) {
    return (
      <TableCard>
        <EmptyState>
          <EmptyIcon>⚠️</EmptyIcon>
          <EmptyTitle>Đã xảy ra lỗi</EmptyTitle>
          <EmptySubtitle>{error}</EmptySubtitle>
        </EmptyState>
      </TableCard>
    );
  }

  if (students.length === 0) {
    return (
      <TableCard>
        <EmptyState>
          <EmptyIcon>🎓</EmptyIcon>
          <EmptyTitle>Không có học sinh nào</EmptyTitle>
          <EmptySubtitle>Danh sách học sinh đang trống.</EmptySubtitle>
        </EmptyState>
      </TableCard>
    );
  }

  const pageList = buildPageList(currentPage, totalPages);

  return (
    <TableCard>
      <Table>
        <thead>
          <tr>
            <Th style={{ width: 44, textAlign: 'center' }}>#</Th>
            <Th>Họ và tên</Th>
            <Th>Mã HS</Th>
            <Th>Ngày sinh</Th>
            <Th>Giới tính</Th>
            <Th>Lớp học</Th>
            <Th style={{ textAlign: 'right' }}>Thao tác</Th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <Tr key={student.id}>
              <Td style={{ textAlign: 'center' }}>
                <RowNum>{startIndex + index + 1}</RowNum>
              </Td>
              <Td>
                <StudentRowCell>
                  <StudentAvatar $bg={avatarGradient(startIndex + index)}>
                    {student.avatarUrl ? (
                      <StudentAvatarImg src={student.avatarUrl} alt={student.fullName} />
                    ) : (
                      getInitials(student.fullName)
                    )}
                  </StudentAvatar>
                  <StudentNameGroup>
                    <StudentName>{student.fullName}</StudentName>
                  </StudentNameGroup>
                </StudentRowCell>
              </Td>
              <Td>
                <StudentMeta>HS-{String(student.id).padStart(4, '0')}</StudentMeta>
              </Td>
              <Td style={{ color: '#6b7280', whiteSpace: 'nowrap' }}>
                {formatTimestamp(student.dateOfBirth ?? null)}
              </Td>
              <Td>
                <GenderBadge $gender={student.gender || 'Nam'}>
                  {student.gender || '—'}
                </GenderBadge>
              </Td>
              <Td>
                {student.className ? (
                  <StatusBadge $variant="active">
                    <Cdot />
                    {student.className}
                  </StatusBadge>
                ) : (
                  <StatusBadge $variant="muted">
                    <Cdot />
                    Chờ xếp lớp
                  </StatusBadge>
                )}
              </Td>
              <Td style={{ textAlign: 'right' }}>
                <IconBtn title="Xem hồ sơ" onClick={() => onViewProfile(student.id)}>
                  <ViewIcon width={16} height={16} />
                </IconBtn>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <PaginationBar>
        <PaginationInfo>
          Hiển thị <strong>{startIndex + 1}–{Math.min(startIndex + 10, students.length)}</strong> / <strong>{students.length}</strong> học sinh
        </PaginationInfo>
        <PaginationControls>
          <PageNavBtn $disabled={currentPage === 1} onClick={onPrevPage}>←</PageNavBtn>
          {pageList.map((p, i) =>
            p === '…' ? (
              <PageNavBtn key={`ellipsis-${i}`} $disabled>…</PageNavBtn>
            ) : (
              <PageNavBtn
                key={p}
                onClick={() => onGoToPage(p)}
                style={p === currentPage ? { background: '#237a3c', color: '#fff', borderColor: '#237a3c' } : undefined}
              >
                {p}
              </PageNavBtn>
            )
          )}
          <PageNavBtn $disabled={currentPage === totalPages} onClick={onNextPage}>→</PageNavBtn>
        </PaginationControls>
      </PaginationBar>
    </TableCard>
  );
}
