'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import * as S from './styles';
import { IconChart } from '@/assets/icons/dashboard';
import { AssessmentDomainModel } from '@/config/types/assessment';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const BarbellIcon: React.FC<IconProps> = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 12h12" />
    <path d="M6 8v8" />
    <path d="M4 10v4" />
    <path d="M18 8v8" />
    <path d="M20 10v4" />
  </svg>
);

const BrainIcon: React.FC<IconProps> = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-4.88A2.5 2.5 0 0 1 9.5 2z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-4.88A2.5 2.5 0 0 0 14.5 2z" />
  </svg>
);

const MessageSquareIcon: React.FC<IconProps> = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const HeartIcon: React.FC<IconProps> = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const PaintbrushIcon: React.FC<IconProps> = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m14 6-4-4-4 4 10 10a2 2 0 0 0 2.828-2.828L14 6z" />
    <path d="M6 21a2 2 0 0 1-2-2v-3a7 7 0 0 1 14 0v3a2 2 0 0 1-2 2H6z" />
  </svg>
);

interface DomainConfig {
  id: string;
  color: string;
  bg: string;
  Icon: React.FC<IconProps>;
  scoreKey: keyof Pick<AssessmentDomainModel, 'physicalScore' | 'cognitiveScore' | 'languageScore' | 'socioEmotionalScore' | 'aestheticScore'>;
  fallbackScore: number;
}

const DOMAIN_CONFIGS: DomainConfig[] = [
  { id: 'physical',  color: '#2563eb', bg: '#eff6ff',  Icon: BarbellIcon,      scoreKey: 'physicalScore',        fallbackScore: 7.8 },
  { id: 'cognitive', color: '#005A36', bg: '#eaf7f0',  Icon: BrainIcon,        scoreKey: 'cognitiveScore',        fallbackScore: 9.1 },
  { id: 'language',  color: '#7c3aed', bg: '#f5f3ff',  Icon: MessageSquareIcon, scoreKey: 'languageScore',         fallbackScore: 9.4 },
  { id: 'social',    color: '#f97316', bg: '#fff7ed',  Icon: HeartIcon,        scoreKey: 'socioEmotionalScore',   fallbackScore: 8.5 },
  { id: 'aesthetic', color: '#ec4899', bg: '#fdf2f8',  Icon: PaintbrushIcon,   scoreKey: 'aestheticScore',        fallbackScore: 8.2 },
];

const DOMAIN_NAME_KEYS: Record<string, string> = {
  physical: 'domains.physical',
  cognitive: 'domains.cognitive',
  language: 'domains.language',
  social: 'domains.social',
  aesthetic: 'domains.aesthetic',
};

interface DevelopmentalDomainsWidgetProps {
  assessment?: AssessmentDomainModel | null;
  hideDetailsLink?: boolean;
}

/** "MM-YYYY" (API format) → "Tháng M/YYYY". */
const formatAssessmentMonth = (assessmentMonth: string, t: ReturnType<typeof useTranslations>): string | null => {
  const [month, year] = assessmentMonth.split('-').map(Number);
  if (!month || !year) return null;
  return t('domains.monthLabel', { month, year });
};

const DevelopmentalDomainsWidget: React.FC<DevelopmentalDomainsWidgetProps> = ({ assessment, hideDetailsLink }) => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('Dashboard');

  if (!assessment) {
    return (
      <S.Card>
        <S.CardHead>
          <S.CardTitleContainer>
            <S.CardTitle>
              <IconChart size={18} color="var(--brand, #005a36)" />
              {t('domains.title')}
            </S.CardTitle>
          </S.CardTitleContainer>
        </S.CardHead>
        <S.EmptyState>
          <S.EmptyIcon>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18" />
              <path d="m19 9-5 5-4-4-3 3" />
            </svg>
          </S.EmptyIcon>
          <S.EmptyTitle>{t('domains.emptyTitle')}</S.EmptyTitle>
          <S.EmptySub dangerouslySetInnerHTML={{ __html: t.raw('domains.emptySub') }} />
        </S.EmptyState>
      </S.Card>
    );
  }

  const scores = DOMAIN_CONFIGS.map(cfg => {
    const raw = assessment[cfg.scoreKey];
    const score = raw !== null && raw !== undefined ? raw : 0;
    return { ...cfg, score };
  });

  const avg = scores.reduce((sum, d) => sum + d.score, 0) / scores.length;
  const monthLabel = formatAssessmentMonth(assessment.assessmentMonth, t);

  return (
    <S.Card>
      <S.CardHead>
        <S.CardTitleContainer>
          <S.CardTitle>
            <IconChart size={18} color="var(--brand, #005a36)" />
            {t('domains.title')}
          </S.CardTitle>
          <S.AvgBadge>{t('domains.average', { avg: avg.toFixed(1) })}</S.AvgBadge>
          {monthLabel && <S.MonthTag>{monthLabel}</S.MonthTag>}
        </S.CardTitleContainer>
        {!hideDetailsLink && (
          <S.DetailLink onClick={() => router.push(`/${locale}/growth`)}>
            {t('domains.viewDetail')}
          </S.DetailLink>
        )}
      </S.CardHead>

      <S.DomainsGrid>
        {scores.map(({ id, score, color, bg, Icon }) => (
          <S.DomainCard key={id} $color={color}>
            <S.DomainHead>
              <S.DomainIcon $bg={bg} $color={color}>
                <Icon size={16} />
              </S.DomainIcon>
            </S.DomainHead>

            <S.DomainLabel>{t(DOMAIN_NAME_KEYS[id])}</S.DomainLabel>

            <S.ScoreRow>
              <S.ScoreValue>{score.toFixed(1)}</S.ScoreValue>
              <S.ScoreMax>{t('domains.scoreMax')}</S.ScoreMax>
            </S.ScoreRow>

            <S.ProgressWrapper>
              <S.ProgressFill $pct={score * 10} $color={color} />
            </S.ProgressWrapper>
          </S.DomainCard>
        ))}
      </S.DomainsGrid>

      {assessment.teacherComment && (
        <S.TeacherComment>
          <strong>{t('domains.teacherCommentLabel')}</strong> {assessment.teacherComment}
        </S.TeacherComment>
      )}
    </S.Card>
  );
};

export default DevelopmentalDomainsWidget;
