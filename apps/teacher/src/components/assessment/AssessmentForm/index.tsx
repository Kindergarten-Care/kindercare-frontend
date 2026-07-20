import React, { useMemo, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import {
  ASSESSMENT_CRITERIA,
  ASSESSMENT_SCORE_DEFAULT,
  ASSESSMENT_SCORE_MAX,
  ASSESSMENT_SCORE_MIN,
  AssessmentCriterionKey,
  LOCAL_ONLY_FIELDS,
  UpsertAssessmentItem,
  CriterionScore,
} from '@/config/types/assessment';
import { Button } from '@kindercare/ui';
import { StudentAvatar } from '@/components/common/StudentAvatar';
import {
  validateAssessmentItem,
  assessmentMean,
} from '@/config/validations/assessment';

/**
 * Form đánh giá định kỳ học sinh — 5 tiêu chí dạng bento card.
 * Tự build Slider (input[type=range] styled) + Textarea, không phụ thuộc shadcn.
 */

export interface AssessmentFormProps {
  studentId: number | string;
  studentName?: string;
  studentAvatar?: string;
  initial?: UpsertAssessmentItem;
  onSubmit: (item: UpsertAssessmentItem) => Promise<void> | void;
  disabled?: boolean;
}

type Scores = Record<AssessmentCriterionKey, CriterionScore>;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 20px;
  background: ${props => props.theme.colors.white};
  border-radius: 24px;
  border: 1px solid ${props => props.theme.colors.border};
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
`;

const StudentRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StudentName = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: ${props => props.theme.colors.fg || props.theme.colors.text};
`;

const StudentMeta = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.muted || '#64748B'};
`;

const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
`;

const Card = styled.div<{ $accent: string }>`
  position: relative;
  border-radius: 20px;
  padding: 14px 16px 16px;
  background: linear-gradient(180deg, ${p => p.$accent}10 0%, ${p => p.$accent}05 100%);
  border: 1px solid ${p => p.$accent}33;
  transition: transform 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px -12px ${p => p.$accent}66;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
`;

const CardHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const PendingBadge = styled.span`
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 999px;
  background: #F1F5F9;
  color: #64748B;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const CardDisabledOverlay = styled.div<{ $accent: string }>`
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.55);
  border-radius: 20px;
  pointer-events: none;
  backdrop-filter: blur(1px);
`;

const ScoreBadge = styled.div<{ $accent: string }>`
  font-weight: 800;
  font-size: 18px;
  color: ${p => p.$accent};
  background: ${p => p.$accent}1A;
  border-radius: 12px;
  padding: 2px 12px;
  min-width: 44px;
  text-align: center;
  transition: background 0.2s ease, color 0.2s ease;
`;

const CardDescription = styled.div`
  font-size: 11.5px;
  color: ${props => props.theme.colors.muted || '#64748B'};
  margin-bottom: 8px;
  line-height: 1.4;
`;

/** Slider dùng <input type=range> styled, giống Shadcn Slider. */
const SliderField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SliderInput = styled.input<{ $accent: string }>`
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 9999px;
  background: linear-gradient(
    to right,
    ${p => p.$accent} 0%,
    ${p => p.$accent} var(--slider-fill, 0%),
    #E2E8F0 var(--slider-fill, 0%),
    #E2E8F0 100%
  );
  outline: none;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: ${p => p.$accent};
    cursor: pointer;
    border: 3px solid #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    transition: transform 0.12s ease;
  }
  &::-webkit-slider-thumb:hover { transform: scale(1.15); }

  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: ${p => p.$accent};
    cursor: pointer;
    border: 3px solid #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  }
`;

const SliderScale = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: ${props => props.theme.colors.muted || '#94A3B8'};
  margin-top: 2px;
`;

const Textarea = styled.textarea<{ $hasError?: boolean }>`
  width: 100%;
  min-height: 100px;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1.5px solid ${p => (p.$hasError ? '#EF4444' : '#CBD5E1')};
  font-family: inherit;
  font-size: 15px;
  font-weight: 500;
  color: #1E293B;
  resize: vertical;
  outline: none;
  background: ${props => props.theme.colors.white};
  box-sizing: border-box;
  transition: border-color 0.18s ease, box-shadow 0.18s ease;

  &:focus {
    border-color: ${props => props.theme.colors.green || '#15803d'};
    box-shadow: 0 0 0 3px rgba(21, 128, 61, 0.15);
  }
`;

const TextareaLabel = styled.label`
  display: block;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 6px;
  color: ${props => props.theme.colors.fg || props.theme.colors.text};
`;

const ErrorText = styled.div`
  color: #DC2626;
  font-size: 12px;
  margin-top: 4px;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 4px;
`;

const MeanBadge = styled.div<{ $accent: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 9999px;
  background: ${p => p.$accent}14;
  color: ${p => p.$accent};
  font-weight: 700;
  font-size: 13px;
`;

function fillPercent(value: number): string {
  return `${((value - ASSESSMENT_SCORE_MIN) / (ASSESSMENT_SCORE_MAX - ASSESSMENT_SCORE_MIN)) * 100}%`;
}

const initialScores = (init?: UpsertAssessmentItem): Scores => ({
  physicalScore: init?.physicalScore ?? ASSESSMENT_SCORE_DEFAULT,
  cognitiveScore: init?.cognitiveScore ?? ASSESSMENT_SCORE_DEFAULT,
  languageScore: init?.languageScore ?? ASSESSMENT_SCORE_DEFAULT,
  socioEmotionalScore: init?.socioEmotionalScore ?? ASSESSMENT_SCORE_DEFAULT,
  aestheticScore: init?.aestheticScore ?? ASSESSMENT_SCORE_DEFAULT,
});

export const AssessmentForm: React.FC<AssessmentFormProps> = ({
  studentId,
  studentName,
  studentAvatar,
  initial,
  onSubmit,
  disabled,
}) => {
  const theme = useTheme();
  const accentMain = theme.colors?.primary || '#046E1E';

  const [scores, setScores] = useState<Scores>(initialScores(initial));
  const [comment, setComment] = useState<string>(initial?.teacherComment ?? '');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const setScore = (key: AssessmentCriterionKey, val: number) => {
    setScores(prev => ({ ...prev, [key]: val as CriterionScore }));
  };

  const mean = useMemo(
    () => assessmentMean({
      studentId,
      physicalScore: scores.physicalScore,
      cognitiveScore: scores.cognitiveScore,
      languageScore: scores.languageScore,
      socioEmotionalScore: scores.socioEmotionalScore,
      aestheticScore: scores.aestheticScore,
    }),
    [scores, studentId]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    /** Map từ 5 card UI → payload gửi BE.
     *  BE dùng bảng `StudentAssessments` (5 score cột + 1 text):
     *    PhysicalScore, CognitiveScore, LanguageScore,
     *    SocioEmotionalScore, AestheticScore, TeacherComment
     */
    const payload: UpsertAssessmentItem = {
      studentId,
      physicalScore: scores.physicalScore,
      cognitiveScore: scores.cognitiveScore,
      languageScore: scores.languageScore,
      socioEmotionalScore: scores.socioEmotionalScore,
      aestheticScore: scores.aestheticScore,
      teacherComment: comment.trim() || undefined,
    };

    const errs = validateAssessmentItem(payload);
    if (errs.length > 0) {
      setError(errs.join(' '));
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit(payload);
      setSuccess('Đã lưu đánh giá thành công.');
    } catch (err: any) {
      setError(err?.message || 'Lưu đánh giá thất bại.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container onSubmit={handleSubmit}>
      <StudentRow>
        <StudentAvatar src={studentAvatar} name={studentName} size={44} />
        <div>
          <StudentName>{studentName || `Học sinh #${studentId}`}</StudentName>
          <StudentMeta>Đánh giá 5 tiêu chí — thang điểm {ASSESSMENT_SCORE_MIN}–{ASSESSMENT_SCORE_MAX}</StudentMeta>
        </div>
      </StudentRow>

      <BentoGrid>
        {/**
         * Render đủ 5 card theo ASSESSMENT_CRITERIA — KHÔNG filter `!isSupported`.
         *  - 4 card có cột DB (Physical, Cognitive, Language, SocioEmotional → 2 cột riêng Emotional/Social):
         *      gửi BE khi save.
         *  - 1 card local-only (Aesthetic): DB DevelopmentAssessments chưa có cột
         *      → KHÔNG gửi BE, lưu localStorage. Hiển thị badge "Lưu cục bộ" để user biết.
         */}
        {ASSESSMENT_CRITERIA.map(c => {
          const val = scores[c.key];
          /** Field "DB chưa có cột" — vẫn cho nhập nhưng lưu client-side. */
          const isLocalOnly = (LOCAL_ONLY_FIELDS as readonly AssessmentCriterionKey[]).includes(c.key);
          return (
            <Card key={c.key} $accent={c.accent} style={{ position: 'relative' }}>
              <CardHeader>
                <CardHeaderLeft>
                  <span style={{ fontSize: 18 }}>{c.emoji}</span>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{c.label}</span>
                  {isLocalOnly && <PendingBadge>Lưu cục bộ</PendingBadge>}
                </CardHeaderLeft>
                <ScoreBadge $accent={c.accent}>{val}</ScoreBadge>
              </CardHeader>
              <CardDescription>{c.description}</CardDescription>
              <SliderField>
                <SliderInput
                  type="range"
                  min={ASSESSMENT_SCORE_MIN}
                  max={ASSESSMENT_SCORE_MAX}
                  step={1}
                  value={val}
                  $accent={c.accent}
                  style={{ ['--slider-fill' as any]: fillPercent(val) }}
                  onChange={e => setScore(c.key, Number(e.target.value))}
                  disabled={disabled || submitting}
                  aria-label={`${c.label} điểm`}
                />
                <SliderScale>
                  <span>{ASSESSMENT_SCORE_MIN}</span>
                  <span>{Math.round((ASSESSMENT_SCORE_MIN + ASSESSMENT_SCORE_MAX) / 2)}</span>
                  <span>{ASSESSMENT_SCORE_MAX}</span>
                </SliderScale>
              </SliderField>
            </Card>
          );
        })}
      </BentoGrid>

      <div>
        <TextareaLabel htmlFor="teacherComment">Lời phê của giáo viên</TextareaLabel>
        <Textarea
          id="teacherComment"
          placeholder="Ví dụ: Bé Bảo An tiến bộ rõ rệt về kỹ năng tự phục vụ, biết tự xúc ăn hết suất..."
          value={comment}
          $hasError={Boolean(error && /teacherComment|comment/i.test(error))}
          maxLength={500}
          onChange={e => setComment(e.target.value)}
          disabled={disabled || submitting}
        />
        <div style={{ fontSize: 11, color: '#94A3B8', textAlign: 'right', marginTop: 4 }}>
          {comment.length}/500
        </div>
      </div>

      {error && <ErrorText>{error}</ErrorText>}
      {success && (
        <div style={{ color: accentMain, fontSize: 13, fontWeight: 600 }}>{success}</div>
      )}

      <Actions>
        <MeanBadge $accent={accentMain}>
          ⌀ Trung bình: {mean.toFixed(1)} / {ASSESSMENT_SCORE_MAX}
        </MeanBadge>
        {initial ? (
          <span style={{ fontSize: 13, fontWeight: 700, color: '#166534', background: '#DCFCE7', padding: '8px 18px', borderRadius: 999, border: '1px solid #BBF7D0' }}>
            Đã đánh giá
          </span>
        ) : (
          <Button type="submit" disabled={disabled || submitting}>
            {submitting ? 'Đang lưu…' : 'Lưu đánh giá'}
          </Button>
        )}
      </Actions>
    </Container>
  );
};
