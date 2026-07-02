import React from 'react';
import * as S from './styles';
import { Svg } from '../Svg';
import { getLastNameInitial } from '@/utils/formatName';

interface TeacherNoteCardProps {
  teacherName: string | null;
  teacherNote: string | null;
  className: string;
}

export function TeacherNoteCard({ teacherName, teacherNote, className }: TeacherNoteCardProps) {
  const finalTeacherName = teacherName || 'Giáo viên';
  const teacherInitial = getLastNameInitial(finalTeacherName);

  return (
    <S.Sec>
      <S.SecHead>
        <S.SecIco>
          <Svg size={18}>
            <path d="M4 5h16v11H8l-4 4z" />
          </Svg>
        </S.SecIco>
        <S.SecTitle>Nhận xét của cô về bé hôm nay</S.SecTitle>
      </S.SecHead>
      <S.NoteCard>
        <S.NoteFrom>
          <S.NoteAv>{teacherInitial}</S.NoteAv>
          <div>
            <S.NoteName>{finalTeacherName}</S.NoteName>
            <S.NoteRole>GV phụ trách · Lớp {className}</S.NoteRole>
          </div>
          <S.NoteTime>Hôm nay</S.NoteTime>
        </S.NoteFrom>
        <S.NoteQuote>
          {teacherNote || 'Hôm nay cô chưa ghi nhận nhận xét nào cho bé.'}
        </S.NoteQuote>
      </S.NoteCard>
    </S.Sec>
  );
}
