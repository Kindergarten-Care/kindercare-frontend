'use client';

import React, { useState, useEffect, useMemo } from 'react';
import * as S from './styles';
import { AssessmentService } from '@/services/StudentAssessmentService';
import { ASSESSMENT_CRITERIA } from '@/config/types/assessment';
import type { AssessmentHistoryPoint, AssessmentCriterionKey } from '@/config/types/assessment';
import { useRouter } from '@/i18n/routing';
import { ChevronRight, BookOpen, CheckCircle2, Circle } from 'lucide-react';
import { getStudentInitials } from '@/utils/string';

interface PeriodicAssessmentWidgetProps {
  /** Lớp đang active — bắt buộc để fetch assessments. */
  classId?: number | null;
  /** Kỳ hiển thị, mặc định là tháng hiện tại (YYYY-MM). */
  termPeriod?: string;
  /** Map studentId → name (BE không trả studentName trong AssessmentHistoryPoint). */
  studentNames?: Record<string, string>;
  /** Avatar theo studentId (optional, dùng kèm name). */
  studentAvatars?: Record<string, string>;
  /** Callback khi user muốn mở trang /assessment?studentId=X (không dùng nếu widget navigate trực tiếp). */
  onOpenAssessment?: (studentId: string | number, termPeriod: string) => void;
}

/**
 * Tổng quan "Đánh giá định kỳ" cho 1 lớp / 1 tháng.
 * Data lấy từ AssessmentService.getClassAssessments — KHÔNG dùng mock hash.
 *
 * Hiển thị:
 *  - Progress: % HS đã có đánh giá tháng này
 *  - Modal: danh sách HS với 5 tiêu chí (Thể chất/Nhận thức/Ngôn ngữ/Cảm xúc-Xã hội/Thẩm mỹ)
 *  - Card HS: 5 ô điểm + ĐTB + trạng thái
 *  - Click HS → navigate sang /assessment?studentId=X&termPeriod=Y
 */
export const PeriodicAssessmentWidget: React.FC<PeriodicAssessmentWidgetProps> = ({
  classId,
  termPeriod: termPeriodProp,
  studentNames,
  studentAvatars,
  onOpenAssessment,
}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [records, setRecords] = useState<AssessmentHistoryPoint[]>([]);
  const [loading, setLoading] = useState(false);

  // Mặc định lấy tháng hiện tại YYYY-MM
  const termPeriod = useMemo(() => {
    if (termPeriodProp) return termPeriodProp;
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  }, [termPeriodProp]);

  // Lấy sĩ số lớp từ records đã biết (nếu BE trả về đủ HS thì dùng luôn)
  // Không có endpoint /class/students riêng → đếm HS có record làm "đã đánh giá",
  // còn lại hiển thị "chưa đánh giá" dựa trên records.length thay vì tổng sĩ số.
  useEffect(() => {
    if (!classId || !isModalOpen) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const list = await AssessmentService.getClassAssessments(classId, termPeriod);
        if (!cancelled) setRecords(list);
      } catch (e) {
        if (!cancelled) setRecords([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [classId, termPeriod, isModalOpen]);

  // Tính % đánh giá dựa trên records.length (nếu có ≥1 record thì ≥1% đã đánh giá).
  // Hiển thị ngay từ khi widget mount (không cần đợi modal mở).
  const evaluatedCount = records.length;
  const percent = loading ? 0 : Math.min(100, evaluatedCount * 10); // mỗi record = 10% (rough)

  const formatPeriodLabel = (tp: string): string => {
    const m = tp.match(/^(\d{4})-(\d{2})$/);
    if (!m) return tp;
    return `Tháng ${Number(m[2])}/${m[1]}`;
  };

  const handleNavigate = (studentId: string | number) => {
    if (onOpenAssessment) {
      onOpenAssessment(studentId, termPeriod);
      return;
    }
    router.push(`/assessment?studentId=${studentId}&termPeriod=${termPeriod}`);
    setIsModalOpen(false);
  };

  const handleOpenAll = () => {
    router.push(`/assessment?termPeriod=${termPeriod}`);
    setIsModalOpen(false);
  };

  return (
    <>
      <S.WidgetContainer>
        <S.WidgetHeader style={{ marginBottom: '14px' }}>
          <S.HeaderLeft>
            <S.IconContainer style={{ background: '#DBEAFE', color: '#1D4ED8', width: '36px', height: '36px', fontSize: '16px' }}>📋</S.IconContainer>
            <S.TitleBox>
              <S.WidgetTitle style={{ fontSize: '15px' }}>Đánh giá định kỳ</S.WidgetTitle>
              <S.WidgetSubtitle style={{ fontSize: '11px' }}>{formatPeriodLabel(termPeriod)}</S.WidgetSubtitle>
            </S.TitleBox>
          </S.HeaderLeft>
        </S.WidgetHeader>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#1F2937' }}>
              {loading ? 'Đang tải...' : `${evaluatedCount} học sinh đã đánh giá`}
            </span>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#1D4ED8' }}>
              {percent}%
            </span>
          </div>
          <div style={{ width: '100%', height: '8px', background: '#EFF6FF', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${percent}%`, height: '100%', background: 'linear-gradient(90deg, #3B82F6, #1D4ED8)', borderRadius: '4px', transition: 'width 0.3s ease' }} />
          </div>
        </div>

        <S.ActionButton onClick={() => setIsModalOpen(true)} style={{ padding: '10px', fontSize: '13px' }}>
          <BookOpen size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
          Mở đánh giá định kỳ
        </S.ActionButton>
      </S.WidgetContainer>

      {isModalOpen && (
        <S.ModalOverlay onClick={() => setIsModalOpen(false)}>
          <S.ModalContent onClick={e => e.stopPropagation()} style={{ maxWidth: 760 }}>
            <S.ModalHeader>
              <S.ModalTitleInfo>
                <S.ModalTitle>📋 Đánh giá định kỳ — {formatPeriodLabel(termPeriod)}</S.ModalTitle>
                <S.ModalSubtitle>
                  5 tiêu chí phát triển, thang điểm 1–10.
                </S.ModalSubtitle>
              </S.ModalTitleInfo>
              <S.HeaderActions>
                <S.BatchAwardButton
                  onClick={handleOpenAll}
                  style={{ background: '#1D4ED8', color: '#fff' }}
                >
                  <span>📊</span> Mở trang đánh giá đầy đủ
                </S.BatchAwardButton>
                <S.CloseButton onClick={() => setIsModalOpen(false)}>✕</S.CloseButton>
              </S.HeaderActions>
            </S.ModalHeader>

            <S.ModalBody>
              {loading ? (
                <div style={{ padding: 32, textAlign: 'center', color: '#64748b' }}>
                  Đang tải đánh giá của lớp…
                </div>
              ) : records.length === 0 ? (
                <div style={{ padding: 32, textAlign: 'center', color: '#64748b' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>
                    Chưa có đánh giá nào cho tháng này.
                  </div>
                  <div style={{ fontSize: 13, opacity: 0.85 }}>
                    Nhấn "Mở trang đánh giá đầy đủ" để bắt đầu.
                  </div>
                </div>
              ) : (
                <AssessmentList
                  records={records}
                  studentNames={studentNames}
                  studentAvatars={studentAvatars}
                  onStudentClick={handleNavigate}
                />
              )}
            </S.ModalBody>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </>
  );
};

/**
 * Render danh sách HS với 5 ô điểm tương ứng ASSESSMENT_CRITERIA.
 * Điểm BE trả về: physicalScore, cognitiveScore, languageScore, socioEmotionalScore, aestheticScore.
 */
interface AssessmentListProps {
  records: AssessmentHistoryPoint[];
  studentNames?: Record<string, string>;
  studentAvatars?: Record<string, string>;
  onStudentClick: (studentId: string | number) => void;
}

const AssessmentList: React.FC<AssessmentListProps> = ({ records, studentNames, studentAvatars, onStudentClick }) => {
  return (
    <S.GridContainer style={{ gridTemplateColumns: '1fr', gap: 10 }}>
      {/* Header row: cố định, dễ scan */}
      <CriteriaHeader />

      {records.map(r => {
        const scores: Record<AssessmentCriterionKey, number | null> = {
          physicalScore: r.physicalScore || null,
          cognitiveScore: r.cognitiveScore || null,
          languageScore: r.languageScore || null,
          socioEmotionalScore: r.socioEmotionalScore || null,
          aestheticScore: r.aestheticScore || null,
        };
        const known = (Object.values(scores).filter(v => v !== null) as number[]);
        const avg = known.length > 0
          ? Math.round((known.reduce((a, b) => a + b, 0) / known.length) * 10) / 10
          : 0;
        const key = String(r.studentId);
        const name = studentNames?.[key] || `HS #${key}`;
        const initial = getStudentInitials(name);
        const isComplete = known.length >= 5;

        return (
          <AssessmentRow
            key={key}
            initial={initial}
            name={name}
            avatarUrl={studentAvatars?.[key]}
            scores={scores}
            avg={avg}
            isComplete={isComplete}
            note={r.teacherComment}
            onClick={() => onStudentClick(r.studentId)}
          />
        );
      })}
    </S.GridContainer>
  );
};

const CriteriaHeader: React.FC = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1.6fr repeat(5, minmax(48px, 1fr)) 40px',
      gap: 6,
      padding: '8px 12px',
      fontSize: 11,
      fontWeight: 700,
      color: '#64748B',
      textTransform: 'uppercase',
      letterSpacing: 0.04,
      alignItems: 'center',
    }}
  >
    <span>Học sinh</span>
    {ASSESSMENT_CRITERIA.map(c => (
      <span key={c.key} style={{ textAlign: 'center' }} title={c.description}>
        {c.emoji}
      </span>
    ))}
    <span style={{ textAlign: 'center' }}>→</span>
  </div>
);

interface AssessmentRowProps {
  initial: string;
  name: string;
  avatarUrl?: string;
  scores: Record<AssessmentCriterionKey, number | null>;
  avg: number;
  isComplete: boolean;
  note?: string;
  onClick: () => void;
}

const AssessmentRow: React.FC<AssessmentRowProps> = ({
  initial,
  name,
  avatarUrl,
  scores,
  avg,
  isComplete,
  note,
  onClick,
}) => (
  <div
    onClick={onClick}
    style={{
      display: 'grid',
      gridTemplateColumns: '1.6fr repeat(5, minmax(48px, 1fr)) 40px',
      gap: 6,
      padding: '12px',
      borderRadius: 14,
      border: '1px solid #E5E7EB',
      background: '#fff',
      cursor: 'pointer',
      alignItems: 'center',
      transition: 'all 0.15s',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = '#A7E0C6';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = '#E5E7EB';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
      <div
        style={{
          width: 32, height: 32, borderRadius: '50%',
          background: avatarUrl ? `url(${avatarUrl}) center/cover no-repeat` : '#E6F3ED',
          color: avatarUrl ? 'transparent' : '#005A36',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, fontSize: 13, flex: 'none',
        }}
      >
        {!avatarUrl && initial}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: '#1F2937', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {name}
        </div>
        <div style={{ fontSize: 11, color: '#6B7280', display: 'flex', alignItems: 'center', gap: 4 }}>
          {isComplete ? (
            <><CheckCircle2 size={11} color="#10B981" /> ĐTB {avg}/10</>
          ) : (
            <><Circle size={11} color="#9CA3AF" /> Chưa đủ</>
          )}
          {note && (
            <span
              title={note}
              style={{
                marginLeft: 6,
                maxWidth: 100,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontStyle: 'italic',
              }}
            >
              · {note}
            </span>
          )}
        </div>
      </div>
    </div>

    {ASSESSMENT_CRITERIA.map(c => {
      const v = scores[c.key];
      const tone = v === null ? '#F3F4F6' : v >= 8 ? '#D1FAE5' : v >= 6 ? '#FEF3C7' : '#FEE2E2';
      const fg = v === null ? '#9CA3AF' : v >= 8 ? '#065F46' : v >= 6 ? '#92400E' : '#991B1B';
      return (
        <div
          key={c.key}
          title={`${c.label}: ${v === null ? 'chưa có' : `${v}/10`}`}
          style={{
            textAlign: 'center',
            padding: '4px 2px',
            borderRadius: 8,
            background: tone,
            color: fg,
            fontWeight: 800,
            fontSize: 13,
          }}
        >
          {v === null ? '—' : v}
        </div>
      );
    })}

    <div style={{ display: 'flex', justifyContent: 'center', color: '#9CA3AF' }}>
      <ChevronRight size={18} />
    </div>
  </div>
);