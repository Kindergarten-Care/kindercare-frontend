'use client';

import React, { useMemo, useState } from 'react';
import { Dropdown } from '@kindercare/ui';
import { getInitials } from '@/views/AccountList/utils/getInitials';
import { GradeDomainModel } from '@/config/types/grade';
import { ClassDetailDomainModel, ClassStudentDomainModel } from '@/config/types/class';
import {
  Panel, PanelHead, PanelTitleRow, PanelTitle, PanelTitleIcon,
  PanelMeta,
  ListContainer, ListGroupLabel, StudentRow, StudentAvatar, StudentAvatarImg,
  StudentInfo, StudentName, StudentMeta, NewTag, RemoveBtn,
  EmptyState, EmptyIcon, EmptyText,
} from '../styles';

const AVATAR_PALETTE = [
  ['#10b981', '#6ee7b7'],
  ['#6366F1', '#a5b4fc'],
  ['#8B5CF6', '#c4b5fd'],
  ['#14B8A6', '#5eead4'],
  ['#0EA5E9', '#7dd3fc'],
  ['#F97316', '#fdba74'],
  ['#DB2777', '#f9a8d4'],
  ['#F59E0B', '#fcd34d'],
];

const avatarGradient = (seed: number) => {
  const [from, to] = AVATAR_PALETTE[seed % AVATAR_PALETTE.length];
  return `linear-gradient(140deg, ${from}, ${to})`;
};

interface AvatarContentProps {
  avatarUrl?: string | null;
  fullName: string;
}

function AvatarContent({ avatarUrl, fullName }: AvatarContentProps) {
  const [imgFailed, setImgFailed] = useState(false);

  return avatarUrl && !imgFailed ? (
    <StudentAvatarImg
      src={avatarUrl}
      alt={fullName}
      onError={() => setImgFailed(true)}
    />
  ) : (
    <>{getInitials(fullName)}</>
  );
}

interface TargetClassPanelProps {
  selectedClassId: string;
  classDetail: ClassDetailDomainModel | null;
  stagedStudents: ClassStudentDomainModel[];
  grades: GradeDomainModel[];
  loadingClass: boolean;
  onClassChange: (classId: string) => void;
  onUnstage: (studentId: number) => void;
}

export default function TargetClassPanel({
  selectedClassId,
  classDetail,
  stagedStudents,
  grades,
  loadingClass,
  onClassChange,
  onUnstage,
}: TargetClassPanelProps) {
  const existingStudents = classDetail?.students ?? [];
  const isEmpty = stagedStudents.length === 0 && existingStudents.length === 0;

  const targetClassOptions = useMemo(() => [
    { value: '', label: '-- Chọn lớp học --' },
    ...grades.flatMap(grade =>
      grade.classes.map(cls => ({
        value: String(cls.classId),
        label: `${cls.className}${cls.yearName ? ` (${cls.yearName})` : ''}`,
        group: grade.gradeName,
      }))
    ),
  ], [grades]);

  return (
    <Panel>
      <PanelHead>
        <PanelTitleRow>
          <PanelTitle>
            <PanelTitleIcon $variant="dst">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" /></svg>
            </PanelTitleIcon>
            Lớp học đích
          </PanelTitle>
        </PanelTitleRow>

        <Dropdown
          value={selectedClassId === '' ? '' : selectedClassId}
          onChange={onClassChange}
          options={targetClassOptions}
          fullWidth
          ariaLabel="Lớp học đích"
        />

        {classDetail && (
          <PanelMeta>
            Sĩ số: <strong>{classDetail.totalStudents}</strong> học sinh
            {stagedStudents.length > 0 && <> · <strong style={{ color: '#237a3c' }}>+{stagedStudents.length}</strong> sắp thêm</>}
          </PanelMeta>
        )}
      </PanelHead>

      <ListContainer>
        {!selectedClassId ? (
          <EmptyState>
            <EmptyIcon>🎯</EmptyIcon>
            <EmptyText>Chọn một lớp học đích<br />để xem danh sách học sinh.</EmptyText>
          </EmptyState>
        ) : loadingClass ? (
          <EmptyState>
            <EmptyText>Đang tải danh sách...</EmptyText>
          </EmptyState>
        ) : isEmpty ? (
          <EmptyState>
            <EmptyIcon>📭</EmptyIcon>
            <EmptyText>Lớp học này<br />chưa có học sinh nào.</EmptyText>
          </EmptyState>
        ) : (
          <>
            {stagedStudents.length > 0 && (
              <>
                <ListGroupLabel>Vừa thêm · {stagedStudents.length}</ListGroupLabel>
                {stagedStudents.map((student, index) => (
                  <StudentRow key={`staged-${student.studentId}`}>
                    <StudentAvatar $bg={avatarGradient(index)}>
                      <AvatarContent avatarUrl={student.avatarUrl} fullName={student.fullName} />
                    </StudentAvatar>
                    <StudentInfo>
                      <StudentName>{student.fullName}</StudentName>
                      <StudentMeta>HS-{String(student.studentId).padStart(4, '0')}</StudentMeta>
                    </StudentInfo>
                    <NewTag>Mới</NewTag>
                    <RemoveBtn title="Bỏ khỏi danh sách chờ" onClick={() => onUnstage(student.studentId)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                    </RemoveBtn>
                  </StudentRow>
                ))}
              </>
            )}

            {existingStudents.length > 0 && (
              <>
                <ListGroupLabel>Đã có trong lớp · {existingStudents.length}</ListGroupLabel>
                {existingStudents.map((student, index) => (
                  <StudentRow key={student.studentId}>
                    <StudentAvatar $bg={avatarGradient(index + stagedStudents.length)}>
                      <AvatarContent avatarUrl={student.avatarUrl} fullName={student.fullName} />
                    </StudentAvatar>
                    <StudentInfo>
                      <StudentName>{student.fullName}</StudentName>
                      <StudentMeta>HS-{String(student.studentId).padStart(4, '0')}</StudentMeta>
                    </StudentInfo>
                  </StudentRow>
                ))}
              </>
            )}
          </>
        )}
      </ListContainer>
    </Panel>
  );
}
