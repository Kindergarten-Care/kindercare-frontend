'use client';

import React from 'react';
import Avatar from '@/components/Avatar';
import { GradeDomainModel } from '@/config/types/grade';
import { ClassStudentDomainModel } from '@/config/types/class';
import {
  Panel,
  PanelHeader,
  PanelLabel,
  PanelSelect,
  PanelMeta,
  SelectionCount,
  ListContainer,
  StudentItem,
  Checkbox,
  EmptyState,
  EmptyIcon,
  EmptyText,
} from '../styles';

interface StudentPoolPanelProps {
  sourceClassId: string;
  sourceStudents: ClassStudentDomainModel[];
  grades: GradeDomainModel[];
  selectedCount: number;
  loading: boolean;
  onSourceClassChange: (classId: string) => void;
  onToggleSelection: (studentId: number) => void;
  selectedStudentIds: number[];
}

export default function StudentPoolPanel({
  sourceClassId,
  sourceStudents,
  grades,
  selectedCount,
  loading,
  onSourceClassChange,
  onToggleSelection,
  selectedStudentIds,
}: StudentPoolPanelProps) {
  return (
    <Panel>
      <PanelHeader>
        <PanelLabel>Nguồn học sinh</PanelLabel>
        <PanelSelect
          value={sourceClassId}
          onChange={e => onSourceClassChange(e.target.value)}
        >
          <option value="">Học sinh chờ xếp lớp</option>
          {grades.map(grade => (
            <optgroup key={`src-${grade.gradeId}`} label={grade.gradeName}>
              {grade.classes.map(cls => (
                <option key={`src-${cls.classId}`} value={cls.classId}>
                  {cls.className}{cls.yearName ? ` (${cls.yearName})` : ''}
                </option>
              ))}
            </optgroup>
          ))}
        </PanelSelect>
        <PanelMeta>
          <SelectionCount $active={selectedCount > 0}>
            {selectedCount} / {sourceStudents.length} đã chọn
          </SelectionCount>
        </PanelMeta>
      </PanelHeader>

      <ListContainer>
        {loading ? (
          <EmptyState>
            <EmptyText>Đang tải...</EmptyText>
          </EmptyState>
        ) : sourceStudents.length === 0 ? (
          <EmptyState>
            <EmptyIcon>📭</EmptyIcon>
            <EmptyText>Không có học sinh nào<br />ở nguồn này.</EmptyText>
          </EmptyState>
        ) : (
          sourceStudents.map(student => (
            <StudentItem
              key={student.studentId}
              $selected={selectedStudentIds.includes(student.studentId)}
              onClick={() => onToggleSelection(student.studentId)}
            >
              <Checkbox $checked={selectedStudentIds.includes(student.studentId)}>
                {selectedStudentIds.includes(student.studentId) && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </Checkbox>
              <Avatar src={student.avatarUrl ?? undefined} name={student.fullName} size={36} />
              <div>
                <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.875rem' }}>
                  {student.fullName}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: 2 }}>
                  ID: {student.studentId}
                </div>
              </div>
            </StudentItem>
          ))
        )}
      </ListContainer>
    </Panel>
  );
}
