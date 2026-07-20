import React from 'react';
import { Save, Pencil } from 'lucide-react';
import * as S from '../styles';
import { StudentDetailedDomainModel } from '@/config/types/student';
import { BMI_CATEGORIES, getBMICategory, BMICategory } from '@/config/types/health';
import { getAvatarGrad, getInitials } from '../utils';
import { HealthRowState } from '../hooks/useHealthView';

interface StudentHealthRowProps {
  student: StudentDetailedDomainModel;
  row?: HealthRowState;
  bmi: number | null;
  isSaved: boolean;
  isEditing: boolean;
  saving: boolean;
  animationDelayMs: number;
  onHeightChange: (studentId: number, value: string) => void;
  onWeightChange: (studentId: number, value: string) => void;
  onViewAllergies: (student: StudentDetailedDomainModel) => void;
  onEdit: (studentId: number) => void;
  onSave: (studentId: number) => void;
}

export const StudentHealthRow: React.FC<StudentHealthRowProps> = ({
  student,
  row,
  bmi,
  isSaved,
  isEditing,
  saving,
  animationDelayMs,
  onHeightChange,
  onWeightChange,
  onViewAllergies,
  onEdit,
  onSave,
}) => {
  const height = row?.height || '';
  const weight = row?.weight || '';

  let bmiCategory: BMICategory | null = null;
  let bmiStyle = { color: '#9CA3AF', bg: '#F3F4F6', border: '#E5E7EB' };

  if (bmi !== null) {
    bmiCategory = getBMICategory(bmi);
    const cat = BMI_CATEGORIES[bmiCategory];
    bmiStyle = { color: cat.color, bg: cat.bgColor, border: cat.borderColor };
  }

  return (
    <S.TableRow $saved={isSaved} style={{ animationDelay: `${animationDelayMs}ms` }}>
      <S.StudentCell>
        <S.AvatarSmall $grad={getAvatarGrad(student.fullName)}>
          {getInitials(student.fullName)}
          {student.avatarUrl && (
            <img
              src={student.avatarUrl}
              alt=""
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e: any) => { e.currentTarget.style.display = 'none'; }}
            />
          )}
        </S.AvatarSmall>
        <div>
          <S.StudentName onClick={() => onViewAllergies(student)} style={{ cursor: student.allergies ? 'pointer' : 'default' }}>
            {student.fullName}
          </S.StudentName>
          {student.allergies && (
            <span
              onClick={() => onViewAllergies(student)}
              style={{
                fontSize: 10, fontWeight: 700, color: '#DC2626',
                background: '#FEE2E2', padding: '1px 6px', borderRadius: 999,
                border: '1px solid #FCA5A5', cursor: 'pointer',
                display: 'inline-block', marginTop: '2px',
              }}
            >
              Dị ứng
            </span>
          )}
        </div>
      </S.StudentCell>

      <S.CellValue>
        <input
          type="number"
          value={height}
          placeholder="--"
          min={50}
          max={200}
          disabled={!isEditing}
          onChange={e => onHeightChange(student.studentId, e.target.value)}
          style={{
            width: '100%', height: 36, padding: '0 10px', borderRadius: 8,
            border: `1.5px solid ${isEditing ? '#34D399' : '#E6EEE9'}`,
            background: isEditing ? '#fff' : '#F3F4F6',
            fontFamily: 'inherit', fontSize: 14, fontWeight: 600,
            color: '#1F2937', textAlign: 'center', outline: 'none',
          }}
        />
      </S.CellValue>

      <S.CellValue>
        <input
          type="number"
          value={weight}
          placeholder="--"
          min={5}
          max={150}
          step="0.1"
          disabled={!isEditing}
          onChange={e => onWeightChange(student.studentId, e.target.value)}
          style={{
            width: '100%', height: 36, padding: '0 10px', borderRadius: 8,
            border: `1.5px solid ${isEditing ? '#34D399' : '#E6EEE9'}`,
            background: isEditing ? '#fff' : '#F3F4F6',
            fontFamily: 'inherit', fontSize: 14, fontWeight: 600,
            color: '#1F2937', textAlign: 'center', outline: 'none',
          }}
        />
      </S.CellValue>

      <S.CellValue>
        {bmi !== null ? (
          <S.BMIBadge $color={bmiStyle.color} $bg={bmiStyle.bg} $border={bmiStyle.border}>
            {bmi.toFixed(1)}
          </S.BMIBadge>
        ) : (
          <span style={{ color: '#C7CFCA', fontSize: 13, fontWeight: 600 }}>--</span>
        )}
      </S.CellValue>

      <S.CellValue>
        {bmiCategory ? (
          <span style={{ fontSize: 11, fontWeight: 700, color: bmiStyle.color, background: bmiStyle.bg, padding: '2px 8px', borderRadius: 999, border: `1px solid ${bmiStyle.border}` }}>
            {BMI_CATEGORIES[bmiCategory].label}
          </span>
        ) : (
          <span style={{ color: '#C7CFCA', fontSize: 11, fontWeight: 500 }}>Chưa đo</span>
        )}
      </S.CellValue>

      <div style={{ textAlign: 'right', minHeight: 36, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        {isSaved && !isEditing ? (
          <S.SaveButton
            onClick={() => onEdit(student.studentId)}
            disabled={saving}
            style={{
              background: '#F59E0B',
              color: '#fff',
              boxShadow: '0 8px 16px -6px rgba(245,158,11,0.3)',
            }}
            onMouseOver={e => e.currentTarget.style.background = '#D97706'}
            onMouseOut={e => e.currentTarget.style.background = '#F59E0B'}
          >
            <Pencil size={13} style={{ marginRight: 4 }} />
            Chỉnh sửa
          </S.SaveButton>
        ) : (height || weight) ? (
          <S.SaveButton
            onClick={() => onSave(student.studentId)}
            disabled={saving || !height || !weight}
            style={{
              opacity: (!height || !weight) ? 0.5 : 1,
              cursor: (!height || !weight) ? 'not-allowed' : 'pointer',
            }}
          >
            <Save size={13} style={{ marginRight: 4 }} />
            Lưu
          </S.SaveButton>
        ) : null}
      </div>
    </S.TableRow>
  );
};
