import React from 'react';
import * as S from '../styles';
import { MonthYearPicker } from '@kindercare/ui';
import type { TeacherClassDomainModel } from '@/config/types/class';

interface TopBarProps {
  dateStr: string;
  className?: string;
  classes: TeacherClassDomainModel[] | undefined;
  activeClassId: number | string | undefined;
  onChangeClass: (classId: number) => void;
  termPeriod: string;
  onChangeTermPeriod: (termPeriod: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  dateStr,
  className,
  classes,
  activeClassId,
  onChangeClass,
  termPeriod,
  onChangeTermPeriod,
}) => {
  return (
    <S.TopBar>
      <div>
        <S.Title>Y tế & Sức khỏe</S.Title>
        <S.Subtitle>Cập nhật ngày {dateStr} · Lớp {className || '...'}</S.Subtitle>
      </div>

      <S.FilterRow>
        <select
          value={activeClassId || ''}
          onChange={e => onChangeClass(Number(e.target.value))}
          style={{
            height: 42,
            padding: '0 36px 0 14px',
            borderRadius: 12,
            border: '1.5px solid #E6EEE9',
            background: '#fff url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%236B7280\' stroke-width=\'2.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 12px center',
            fontFamily: 'inherit',
            fontWeight: 700,
            fontSize: 14,
            color: '#1F2937',
            appearance: 'none',
            cursor: 'pointer',
            minWidth: 180,
          }}
        >
          {classes?.map((c: TeacherClassDomainModel) => (
            <option key={c.classId} value={c.classId}>{c.className}</option>
          ))}
        </select>
        <div style={{ zIndex: 10 }}>
          <MonthYearPicker
            month={Number(termPeriod.split('-')[1]) - 1}
            year={Number(termPeriod.split('-')[0])}
            onChange={(month, year) =>
              onChangeTermPeriod(`${year}-${String(month + 1).padStart(2, '0')}`)
            }
          />
        </div>
      </S.FilterRow>
    </S.TopBar>
  );
};
