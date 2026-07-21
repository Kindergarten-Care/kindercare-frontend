import React from 'react';
import * as S from '../styles';
import { StudentDetailedDomainModel } from '@/config/types/student';
import { HealthRowState } from '../hooks/useHealthView';
import { StudentHealthRow } from './StudentHealthRow';

interface StudentHealthTableProps {
  hasAnyStudents: boolean;
  loading: boolean;
  filteredStudents: StudentDetailedDomainModel[];
  healthRows: Map<number, HealthRowState>;
  savedRows: Set<number>;
  editingStudentIds: Set<number>;
  saving: boolean;
  getPreviewBMI: (studentId: number) => number | null;
  onHeightChange: (studentId: number, value: string) => void;
  onWeightChange: (studentId: number, value: string) => void;
  onViewAllergies: (student: StudentDetailedDomainModel) => void;
  onEdit: (studentId: number) => void;
  onSave: (studentId: number) => void;
}

export const StudentHealthTable: React.FC<StudentHealthTableProps> = ({
  hasAnyStudents,
  loading,
  filteredStudents,
  healthRows,
  savedRows,
  editingStudentIds,
  saving,
  getPreviewBMI,
  onHeightChange,
  onWeightChange,
  onViewAllergies,
  onEdit,
  onSave,
}) => {
  return (
    <S.StudentTable>
      <S.TableHeader>
        <div>Học sinh</div>
        <div>Chiều cao (cm)</div>
        <div>Cân nặng (kg)</div>
        <div>BMI</div>
        <div>Tình trạng</div>
        <div style={{ textAlign: 'right' }}>Hành động</div>
      </S.TableHeader>

      {!hasAnyStudents ? (
        <div style={{ padding: '40px 20px', textAlign: 'center', color: '#9CA3AF' }}>
          Chưa có học sinh trong lớp này
        </div>
      ) : loading ? (
        <div style={{ padding: '40px 20px', textAlign: 'center', color: '#9CA3AF' }}>
          Đang tải dữ liệu...
        </div>
      ) : filteredStudents.length === 0 ? (
        <div style={{ padding: '40px 20px', textAlign: 'center', color: '#9CA3AF' }}>
          Không tìm thấy học sinh nào phù hợp bộ lọc
        </div>
      ) : (
        filteredStudents.map((student: StudentDetailedDomainModel, idx: number) => {
          const row = healthRows.get(student.studentId);
          const isSaved = savedRows.has(student.studentId) || !!row?.saved;
          const isEditing = !isSaved || editingStudentIds.has(student.studentId);
          const bmi = getPreviewBMI(student.studentId);

          return (
            <StudentHealthRow
              key={student.studentId}
              student={student}
              row={row}
              bmi={bmi}
              isSaved={isSaved}
              isEditing={isEditing}
              saving={saving}
              animationDelayMs={idx * 40}
              onHeightChange={onHeightChange}
              onWeightChange={onWeightChange}
              onViewAllergies={onViewAllergies}
              onEdit={onEdit}
              onSave={onSave}
            />
          );
        })
      )}
    </S.StudentTable>
  );
};
