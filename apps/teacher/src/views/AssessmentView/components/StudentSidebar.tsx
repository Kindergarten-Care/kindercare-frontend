import React from 'react';
import { Activity } from 'lucide-react';
import * as S from '../styles';
import { StudentAvatar } from '@/components/common/StudentAvatar';
import { MonthYearPicker } from '@kindercare/ui';
import { AssessmentHistoryPoint } from '@/config/types/assessment';
import { StudentLite } from '../hooks/useAssessmentView';

interface StudentSidebarProps {
  students: StudentLite[];
  loadingStudents: boolean;
  selectedId: string | null;
  onSelectStudent: (id: string) => void;
  monthRecords: AssessmentHistoryPoint[];
  filterType: 'all' | 'assessed' | 'not_assessed';
  setFilterType: (v: 'all' | 'assessed' | 'not_assessed') => void;
  termPeriod: string;
  setTermPeriod: (v: string) => void;
}

export const StudentSidebar: React.FC<StudentSidebarProps> = ({
  students,
  loadingStudents,
  selectedId,
  onSelectStudent,
  monthRecords,
  filterType,
  setFilterType,
  termPeriod,
  setTermPeriod,
}) => {
  const renderStudentList = () => {
    if (loadingStudents) {
      return <S.Spinner><Activity size={14} /> Đang tải danh sách lớp…</S.Spinner>;
    }
    if (students.length === 0) {
      return (
        <S.EmptyState>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>Chưa tải được danh sách học sinh.</div>
          <div style={{ fontSize: 12, opacity: 0.85, lineHeight: 1.45 }}>
            Vui lòng kiểm tra kết nối mạng hoặc thử lại.
          </div>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              marginTop: 8,
              padding: '4px 10px',
              border: '1px solid currentColor',
              borderRadius: 6,
              background: 'transparent',
              color: 'inherit',
              cursor: 'pointer',
              fontSize: 12,
            }}
          >
            Thử lại
          </button>
        </S.EmptyState>
      );
    }

    const filteredStudents = students.filter(s => {
      const isAssessed = monthRecords.some(r => String(r.studentId) === String(s.id));
      if (filterType === 'assessed') return isAssessed;
      if (filterType === 'not_assessed') return !isAssessed;
      return true;
    });

    return (
      <S.StudentList>
        {filteredStudents.map(s => {
          const active = String(s.id) === String(selectedId);
          const isAssessed = monthRecords.some(r => String(r.studentId) === String(s.id));
          return (
            <S.StudentItem
              key={String(s.id)}
              type="button"
              $active={active}
              onClick={() => onSelectStudent(String(s.id))}
              aria-label={`Chọn học sinh ${s.name}`}
            >
              <StudentAvatar src={s.avatar} name={s.name} size={32} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {s.name}
              </span>
              {isAssessed && <S.Badge>Đã đánh giá</S.Badge>}
            </S.StudentItem>
          );
        })}
        {filteredStudents.length === 0 && (
          <S.EmptyState>Không có học sinh nào phù hợp bộ lọc.</S.EmptyState>
        )}
      </S.StudentList>
    );
  };

  return (
    <S.Sidebar>
      <div style={{ borderBottom: '1px solid #F1F5F9', paddingBottom: '14px', marginBottom: '4px' }}>
        <S.SidebarTitle as="label" htmlFor="term-select" style={{ display: 'block', marginBottom: 6 }}>
          Chọn tháng đánh giá
        </S.SidebarTitle>
        <MonthYearPicker
          month={Number(termPeriod.split('-')[1]) - 1}
          year={Number(termPeriod.split('-')[0])}
          onChange={(month, year) =>
            setTermPeriod(`${year}-${String(month + 1).padStart(2, '0')}`)
          }
          id="term-select"
        />
      </div>

      <S.SidebarTitle>
        Danh sách lớp ({monthRecords.length}/{students.length} bé đã đánh giá)
      </S.SidebarTitle>
      <div style={{ display: 'flex', gap: 6, marginBottom: 8, marginTop: -4 }}>
        <S.FilterBtn $active={filterType === 'all'} onClick={() => setFilterType('all')}>Tất cả</S.FilterBtn>
        <S.FilterBtn $active={filterType === 'assessed'} onClick={() => setFilterType('assessed')}>Đã ĐG</S.FilterBtn>
        <S.FilterBtn $active={filterType === 'not_assessed'} onClick={() => setFilterType('not_assessed')}>Chưa ĐG</S.FilterBtn>
      </div>
      {renderStudentList()}
    </S.Sidebar>
  );
};
