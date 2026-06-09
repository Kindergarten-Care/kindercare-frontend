import React from 'react';
import * as S from './styles';

const NOTES = [
  { id: 1, studentName: 'Khang', note: 'Nhờ cô cho bé uống siro ho lúc 11h' },
  { id: 2, studentName: 'Vy', note: 'Mẹ đón sớm lúc 15:30' },
];

export const ParentNotesWidget: React.FC = () => {
  return (
    <S.WidgetContainer>
      <S.WidgetHeader>
        <S.Icon>📝</S.Icon>
        <S.WidgetTitle>Dặn dò hôm nay</S.WidgetTitle>
      </S.WidgetHeader>
      
      <S.NotesList>
        {NOTES.map((note) => (
          <S.NoteItem key={note.id}>
            <S.ColorBar />
            <S.NoteContent>
              <S.StudentName>{note.studentName}</S.StudentName>
              <S.NoteText>{note.note}</S.NoteText>
            </S.NoteContent>
            <S.Checkbox />
          </S.NoteItem>
        ))}
      </S.NotesList>
    </S.WidgetContainer>
  );
};
