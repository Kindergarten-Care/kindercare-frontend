'use client';

import React from 'react';
import * as S from './styles';
import { AssessmentDomainModel } from '@/config/types/assessment';
import { TeacherDomainModel } from '@/config/types/student';
import { getAvatarGradient, getInitials } from '@/utils/Student/Avatar';
import { getTeacherDisplayName } from '@/utils/Teacher/TeacherDisplay';

interface TeacherNotesTimelineProps {
  notes: AssessmentDomainModel[];
  leadTeacher: TeacherDomainModel | null;
}

const parseMonthLabel = (assessmentMonth: string): { month: string; year: string } => {
  const [mm, yyyy] = assessmentMonth.split('-');
  return { month: mm ?? assessmentMonth, year: yyyy ?? '' };
};

export function TeacherNotesTimeline({ notes, leadTeacher }: TeacherNotesTimelineProps) {
  if (notes.length === 0) {
    return <S.EmptyState>Chưa có nhận xét nào của giáo viên.</S.EmptyState>;
  }

  const teacherName = leadTeacher ? getTeacherDisplayName(leadTeacher) : 'Giáo viên chủ nhiệm';
  const gradient = getAvatarGradient(leadTeacher?.teacherId ?? 0);
  const initials = getInitials(teacherName);

  return (
    <S.NoteList>
      {notes.map(note => {
        const { month, year } = parseMonthLabel(note.assessmentMonth);
        return (
          <S.Note key={note.assessmentId}>
            <S.NoteMonth>
              <S.NoteMonthNum>{month}</S.NoteMonthNum>
              <S.NoteMonthYear>/{year}</S.NoteMonthYear>
            </S.NoteMonth>
            <S.NoteBody>
              <S.NoteTop>
                <S.NoteAvatar $gradient={gradient}>{initials}</S.NoteAvatar>
                <S.NoteName>{teacherName}</S.NoteName>
              </S.NoteTop>
              <S.NoteText>{note.teacherComment}</S.NoteText>
            </S.NoteBody>
          </S.Note>
        );
      })}
    </S.NoteList>
  );
}
