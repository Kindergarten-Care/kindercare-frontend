import React from 'react';
import * as S from './styles';
import { Svg } from '../Svg';
import { getLastNameInitial } from '@/utils/formatName';
import { isMaleTeacher } from '@/utils/Teacher/TeacherDisplay';

interface TeacherNoteCardProps {
  teacherName: string | null;
  teacherNote: string | null;
  className: string;
  teacherGender?: string | null;
}

export function TeacherNoteCard({ teacherName, teacherNote, className, teacherGender }: TeacherNoteCardProps) {
  const finalTeacherName = teacherName || 'Giáo viên';
  const teacherInitial = getLastNameInitial(finalTeacherName);
  // If the name already carries "Thầy"/"Cô" (e.g. formatted upstream), infer the honorific from it;
  // otherwise fall back to the teacher's gender.
  const isMale = /^thầy\b/i.test(finalTeacherName) || (!/^cô\b/i.test(finalTeacherName) && isMaleTeacher(teacherGender));
  const honorific = isMale ? 'thầy' : 'cô';

  return (
    <S.Sec>
      <S.SecHead>
        <S.SecIco>
          <Svg size={18}>
            <path d="M4 5h16v11H8l-4 4z" />
          </Svg>
        </S.SecIco>
        <S.SecTitle>Nhận xét của {honorific} về bé hôm nay</S.SecTitle>
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
          {teacherNote || `Hôm nay ${honorific} chưa ghi nhận nhận xét nào cho bé.`}
        </S.NoteQuote>
      </S.NoteCard>
    </S.Sec>
  );
}
