'use client';

import React from 'react';
import Avatar from '@/components/Avatar';
import { getFirstName, getLastName } from '@/utils/name';
import { formatTimestamp } from '@/utils/date';
import { ViewIcon } from '@/icons/ViewIcon';
import { StudentDetailDomainModel } from '@/config/types/student';
import {
  TableCard,
  Table,
  Th,
  Tr,
  Td,
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
  StudentRowCell,
  StudentNameGroup,
  StudentName,
  StudentMeta,
  GenderBadge,
} from '../styles';

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
}

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

  return (
    <TableCard>
      <Table>
        <thead>
          <tr>
            <Th>Họ và tên</Th>
            <Th style={{ textAlign: 'center' }}>Giới tính</Th>
            <Th>Ngày sinh</Th>
            <Th>Lớp học</Th>
            <Th style={{ width: 80, textAlign: 'center' }}>Thao tác</Th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <Tr key={student.id}>
              <Td>
                <StudentRowCell>
                  <Avatar src={student.avatarUrl ?? undefined} name={student.fullName} size={42} />
                  <StudentNameGroup>
                    <StudentName>{student.fullName}</StudentName>
                    <StudentMeta>HS-{String(student.id).padStart(4, '0')}</StudentMeta>
                  </StudentNameGroup>
                </StudentRowCell>
              </Td>
              <Td style={{ textAlign: 'center' }}>
                <GenderBadge $gender={student.gender || 'Nam'}>
                  {student.gender || '—'}
                </GenderBadge>
              </Td>
              <Td style={{ color: '#6b7280', whiteSpace: 'nowrap' }}>
                {formatTimestamp(student.dateOfBirth ?? null)}
              </Td>
              <Td>
                {student.className ? (
                  <StatusBadge $variant="active">
                    <span style={{ fontSize: '0.6rem' }}>●</span>
                    {student.className}
                  </StatusBadge>
                ) : (
                  <StatusBadge $variant="muted">Chờ xếp lớp</StatusBadge>
                )}
              </Td>
              <Td style={{ textAlign: 'center' }}>
                <IconBtn title="Xem hồ sơ" onClick={() => onViewProfile(student.id)}>
                  <ViewIcon width={18} height={18} />
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
          <PageNavBtn $disabled={currentPage === 1} onClick={onPrevPage}>
            ← Trước
          </PageNavBtn>
          <PageNavBtn $disabled={currentPage === totalPages} onClick={onNextPage}>
            Sau →
          </PageNavBtn>
        </PaginationControls>
      </PaginationBar>
    </TableCard>
  );
}
