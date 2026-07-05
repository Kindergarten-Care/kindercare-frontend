'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import * as S from './styles';
import { DailyLesson } from '@/config/types/dashboard';
import { IconBook } from '@/assets/icons/dashboard';

interface DailyLessonWidgetProps {
  lessons: DailyLesson[];
}

const DailyLessonWidget: React.FC<DailyLessonWidgetProps> = ({ lessons }) => {
  const t = useTranslations('Dashboard');
  return (
    <S.Card>
      <S.CardHead>
        <S.CardTitle><IconBook size={16} /> {t('lessons.title')}</S.CardTitle>
      </S.CardHead>

      {lessons.length === 0 ? (
        <S.EmptyState>
          <S.EmptyIcon>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </S.EmptyIcon>
          <S.EmptyTitle>{t('lessons.emptyTitle')}</S.EmptyTitle>
          <S.EmptySub dangerouslySetInnerHTML={{ __html: t.raw('emptyActivitiesSub') }} />
        </S.EmptyState>
      ) : (
        <S.LessonList>
          {lessons.map(lesson => (
            <S.LessonRow key={lesson.id}>
              <S.LessonIco $color={lesson.color}>{lesson.icon}</S.LessonIco>
              <S.LessonBody>
                <S.LessonSubject $color={lesson.color}>{lesson.subject}</S.LessonSubject>
                <S.LessonTitle>{lesson.title}</S.LessonTitle>
                <S.LessonDesc>{lesson.description}</S.LessonDesc>
              </S.LessonBody>
            </S.LessonRow>
          ))}
        </S.LessonList>
      )}
    </S.Card>
  );
};

export default DailyLessonWidget;
