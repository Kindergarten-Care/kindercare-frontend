'use client';

import React from 'react';
import Avatar from '@/components/Avatar';
import { ClassDetailDomainModel } from '@/config/types/class';
import { ClassDomainModel } from '@/config/types/grade';
import {
  MainPanel,
  PanelHeader,
  ClassInfo,
  ClassName,
  YearBadge,
  ClassMeta,
  PrimaryButton,
  Table,
  Th,
  Td,
  Tr,
  TeacherRow,
  RoleBadge,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptySubtitle,
  TeacherCount,
} from '../styles';
import AssignTeacherModal from '../components/AssignTeacherModal';

interface ClassDetailPanelProps {
  selectedClass: ClassDomainModel | null;
  classDetail: ClassDetailDomainModel | null;
  loading: boolean;
  onAssignSuccess: () => void;
}

export default function ClassDetailPanel({
  selectedClass,
  classDetail,
  loading,
  onAssignSuccess,
}: ClassDetailPanelProps) {
  const [isAssignModalOpen, setIsAssignModalOpen] = React.useState(false);

  if (loading) {
    return (
      <MainPanel>
        <EmptyState>
          <EmptyTitle>Đang tải dữ liệu...</EmptyTitle>
        </EmptyState>
      </MainPanel>
    );
  }

  if (!classDetail) {
    return (
      <MainPanel>
        <EmptyState>
          <EmptyIcon>👈</EmptyIcon>
          <EmptyTitle>Chọn một lớp học</EmptyTitle>
          <EmptySubtitle>Chọn lớp từ danh sách bên trái để xem chi tiết giáo viên.</EmptySubtitle>
        </EmptyState>
      </MainPanel>
    );
  }

  return (
    <MainPanel>
      <PanelHeader>
        <ClassInfo>
          <ClassName>
            Lớp {classDetail.className}
            {classDetail.yearName && <YearBadge>{classDetail.yearName}</YearBadge>}
          </ClassName>
          <ClassMeta>
            {classDetail.gradeName} • {classDetail.totalStudents} học sinh
            {classDetail.teachers && (
              <TeacherCount>
                • {classDetail.teachers.length} giáo viên
              </TeacherCount>
            )}
          </ClassMeta>
        </ClassInfo>
        {selectedClass && (
          <PrimaryButton onClick={() => setIsAssignModalOpen(true)}>
            + Bổ nhiệm Giáo viên
          </PrimaryButton>
        )}
      </PanelHeader>

      {classDetail.teachers && classDetail.teachers.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <Th>Giáo viên</Th>
              <Th>Vai trò</Th>
              <Th>Số điện thoại</Th>
              <Th>Email</Th>
            </tr>
          </thead>
          <tbody>
            {classDetail.teachers.map(teacher => (
              <Tr key={teacher.id}>
                <Td>
                  <TeacherRow>
                    <Avatar src={teacher.avatarUrl ?? undefined} name={teacher.fullName} size={40} />
                    <div>
                      <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.875rem' }}>
                        {teacher.fullName}
                      </div>
                    </div>
                  </TeacherRow>
                </Td>
                <Td>
                  <RoleBadge $isMain={
                    teacher.roleInClass === 'Giáo viên chủ nhiệm' ||
                    teacher.roleInClass === 'MainTeacher'
                  }>
                    {teacher.roleInClass}
                  </RoleBadge>
                </Td>
                <Td style={{ color: '#6b7280' }}>{teacher.phoneNumber || '—'}</Td>
                <Td style={{ color: '#6b7280' }}>{teacher.email || '—'}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <EmptyState>
          <EmptyIcon>👨‍🏫</EmptyIcon>
          <EmptyTitle>Chưa có giáo viên</EmptyTitle>
          <EmptySubtitle>Lớp này chưa được phân công giáo viên nào.</EmptySubtitle>
        </EmptyState>
      )}

      {isAssignModalOpen && selectedClass && (
        <AssignTeacherModal
          classId={selectedClass.classId}
          className={selectedClass.className}
          onClose={() => setIsAssignModalOpen(false)}
          onSuccess={() => {
            setIsAssignModalOpen(false);
            onAssignSuccess();
          }}
        />
      )}
    </MainPanel>
  );
}
