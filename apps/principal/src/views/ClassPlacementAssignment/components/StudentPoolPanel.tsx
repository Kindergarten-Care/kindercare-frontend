'use client';

import React, { useMemo, useState } from 'react';
import { Dropdown } from '@kindercare/ui';
import { getInitials } from '@/views/AccountList/utils/getInitials';
import { formatTimestamp } from '@/utils/date';
import { GradeDomainModel } from '@/config/types/grade';
import { ClassStudentDomainModel } from '@/config/types/class';
import {
  Panel, PanelHead, PanelTitleRow, PanelTitle, PanelTitleIcon,
  SearchBox, SearchInput, SubBar, SelectionCount, LinkBtn,
  ListContainer, StudentRow, Checkbox, StudentAvatar, StudentAvatarImg,
  StudentInfo, StudentName, StudentMeta, AgeChip,
  EmptyState, EmptyIcon, EmptyText,
} from '../styles';

const AVATAR_PALETTE = [
  ['#F97316', '#fdba74'],
  ['#2563EB', '#60a5fa'],
  ['#DB2777', '#f9a8d4'],
  ['#8B5CF6', '#c4b5fd'],
  ['#F59E0B', '#fcd34d'],
  ['#14B8A6', '#5eead4'],
  ['#6366F1', '#a5b4fc'],
  ['#0EA5E9', '#7dd3fc'],
];

const avatarGradient = (seed: number) => {
  const [from, to] = AVATAR_PALETTE[seed % AVATAR_PALETTE.length];
  return `linear-gradient(140deg, ${from}, ${to})`;
};

function calculateAge(ts: bigint | null): number | null {
  if (!ts) return null;
  const birth = new Date(Number(ts) * 1000);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
  return age;
}

interface StudentPoolPanelProps {
  sourceClassId: string;
  sourceStudents: ClassStudentDomainModel[];
  grades: GradeDomainModel[];
  loading: boolean;
  onSourceClassChange: (classId: string) => void;
  onToggleSelection: (studentId: number) => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
  selectedStudentIds: number[];
}

export default function StudentPoolPanel({
  sourceClassId,
  sourceStudents,
  grades,
  loading,
  onSourceClassChange,
  onToggleSelection,
  onSelectAll,
  onClearSelection,
  selectedStudentIds,
}: StudentPoolPanelProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = useMemo(() => {
    if (!searchTerm) return sourceStudents;
    const term = searchTerm.toLowerCase();
    return sourceStudents.filter(s =>
      s.fullName.toLowerCase().includes(term) ||
      String(s.studentId).includes(term)
    );
  }, [sourceStudents, searchTerm]);

  const allSelected = filteredStudents.length > 0 && selectedStudentIds.length === filteredStudents.length;

  const sourceClassOptions = useMemo(() => [
    { value: '', label: 'Học sinh chờ xếp lớp' },
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
            <PanelTitleIcon $variant="src">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M19 8v6M22 11h-6" /></svg>
            </PanelTitleIcon>
            Nguồn học sinh
          </PanelTitle>
        </PanelTitleRow>

        <Dropdown
          value={sourceClassId === '' ? '' : sourceClassId}
          onChange={onSourceClassChange}
          options={sourceClassOptions}
          fullWidth
          ariaLabel="Nguồn học sinh"
        />

        <SearchBox>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
          <SearchInput
            placeholder="Tìm học sinh trong nguồn…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </SearchBox>

        <SubBar>
          <SelectionCount $active={selectedStudentIds.length > 0}>
            <b>{selectedStudentIds.length}</b> / {filteredStudents.length} đã chọn
          </SelectionCount>
          <LinkBtn onClick={allSelected ? onClearSelection : onSelectAll} disabled={filteredStudents.length === 0}>
            {allSelected ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
          </LinkBtn>
        </SubBar>
      </PanelHead>

      <ListContainer>
        {loading ? (
          <EmptyState>
            <EmptyText>Đang tải...</EmptyText>
          </EmptyState>
        ) : filteredStudents.length === 0 ? (
          <EmptyState>
            <EmptyIcon>📭</EmptyIcon>
            <EmptyText>
              {searchTerm ? 'Không tìm thấy học sinh phù hợp.' : <>Không có học sinh nào<br />ở nguồn này.</>}
            </EmptyText>
          </EmptyState>
        ) : (
          filteredStudents.map((student, index) => {
            const selected = selectedStudentIds.includes(student.studentId);
            const age = calculateAge(student.dateOfBirth);
            return (
              <StudentRow key={student.studentId} $selected={selected} onClick={() => onToggleSelection(student.studentId)}>
                <Checkbox $checked={selected}>
                  {selected && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  )}
                </Checkbox>
                <StudentAvatar $bg={avatarGradient(index)}>
                  {student.avatarUrl ? <StudentAvatarImg src={student.avatarUrl} alt={student.fullName} /> : getInitials(student.fullName)}
                </StudentAvatar>
                <StudentInfo>
                  <StudentName>{student.fullName}</StudentName>
                  <StudentMeta>
                    HS-{String(student.studentId).padStart(4, '0')} · {formatTimestamp(student.dateOfBirth)}
                  </StudentMeta>
                </StudentInfo>
                {age !== null && <AgeChip>{age} tuổi</AgeChip>}
              </StudentRow>
            );
          })
        )}
      </ListContainer>
    </Panel>
  );
}
