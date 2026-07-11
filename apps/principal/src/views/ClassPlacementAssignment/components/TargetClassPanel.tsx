'use client';

import React from 'react';
import Avatar from '@/components/Avatar';
import { GradeDomainModel } from '@/config/types/grade';
import { ClassDetailDomainModel } from '@/config/types/class';
import {
  Panel,
  PanelHeader,
  PanelLabel,
  PanelSelect,
  PanelMeta,
  ListContainer,
  EmptyState,
  EmptyIcon,
  EmptyText,
} from '../styles';

interface TargetClassPanelProps {
  selectedClassId: string;
  classDetail: ClassDetailDomainModel | null;
  grades: GradeDomainModel[];
  loadingClass: boolean;
  onClassChange: (classId: string) => void;
}

export default function TargetClassPanel({
  selectedClassId,
  classDetail,
  grades,
  loadingClass,
  onClassChange,
}: TargetClassPanelProps) {
  return (
    <Panel>
      <PanelHeader>
        <PanelLabel>Lớp học đích</PanelLabel>
        <PanelSelect
          value={selectedClassId}
          onChange={e => onClassChange(e.target.value)}
        >
          <option value="">-- Chọn lớp học --</option>
          {grades.map(grade => (
            <optgroup key={grade.gradeId} label={grade.gradeName}>
              {grade.classes.map(cls => (
                <option key={cls.classId} value={cls.classId}>
                  {cls.className}
                </option>
              ))}
            </optgroup>
          ))}
        </PanelSelect>
        {classDetail && (
          <PanelMeta>
            <span>📊 Sĩ số: <strong>{classDetail.totalStudents}</strong> học sinh</span>
          </PanelMeta>
        )}
      </PanelHeader>

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
        ) : classDetail?.students?.length === 0 ? (
          <EmptyState>
            <EmptyIcon>📭</EmptyIcon>
            <EmptyText>Lớp học này<br />chưa có học sinh nào.</EmptyText>
          </EmptyState>
        ) : (
          classDetail?.students?.map(student => (
            <div
              key={student.studentId}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '11px 14px',
                border: '1.5px solid #f3f4f6',
                borderRadius: 10,
                marginBottom: 8,
                background: 'white',
              }}
            >
              <Avatar src={student.avatarUrl ?? undefined} name={student.fullName} size={36} />
              <div>
                <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.875rem' }}>
                  {student.fullName}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: 2 }}>
                  ID: {student.studentId}
                </div>
              </div>
            </div>
          ))
        )}
      </ListContainer>
    </Panel>
  );
}
