'use client';

import React, { useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Edit2,
  Plus,
  Send,
  Trash2,
  Undo2,
  XCircle,
  Eye,
} from 'lucide-react';
import { useTeacherClasses } from '@/hooks/queries';
import { DAYS, SUBJECTS, getSubjectMeta } from './constants';
import { useLessonPlan } from './hooks/useLessonPlan';
import { LessonModal } from './components/LessonModal';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import * as S from './styles';
import { DashboardLayout } from '@/layout/DashboardLayout';
import type { DayKey } from '@/config/types/lessonPlan';
import {
  STATUS_COLORS,
  STATUS_LABELS,
  type LessonPlanStatus,
} from '@/config/types/lessonPlanApi';

const STATUS_FILTERS: Array<{ key: LessonPlanStatus | 'all'; label: string }> = [
  { key: 'all', label: 'Tất cả' },
  { key: 'Draft', label: 'Nháp' },
  { key: 'Submitted', label: 'Chờ duyệt' },
  { key: 'Approved', label: 'Đã duyệt' },
  { key: 'Rejected', label: 'Từ chối' },
  { key: 'RevisionRequested', label: 'Cần sửa' },
];

function statusColor(s: LessonPlanStatus): { fg: string; bg: string } {
  const c = STATUS_COLORS[s];
  // Tạo phiên bản nhạt cho background
  const bg = c + '1A'; // 10% opacity hex
  return { fg: c, bg };
}

export const LessonPlanView: React.FC = () => {
  const [itemToDeleteId, setItemToDeleteId] = React.useState<string | null>(null);
  const { data: classes } = useTeacherClasses();
  const activeClass = classes && classes.length > 0 ? classes[0] : null;
  const className = activeClass?.displayName ?? 'Lớp Mầm 1';

  const {
    todayKey,
    weekLabel,
    weekDates,
    totalCount,
    doneCount,
    donePct,
    lessons,
    modalOpen,
    editItemId,
    draft,
    toasts,
    prevWeek,
    nextWeek,
    openNew,
    openAdd,
    openEdit,
    closeModal,
    updateDraft,
    pickSubject,
    pickDay,
    saveLesson,
    toggleDone,
    removeLesson,
    exportPlan,
    submitForApproval,
    withdraw,
    setStatusFilter,
    statusFilter,
    currentPlan,
    isReadOnly,
    isLoading,
  } = useLessonPlan(className);

  const subjectLegend = useMemo(
    () =>
      (Object.keys(SUBJECTS) as Array<keyof typeof SUBJECTS>).map((key) => ({
        key,
        label: SUBJECTS[key].label,
        color: SUBJECTS[key].color,
      })),
    []
  );

  const dayColumns = useMemo(() => {
    return DAYS.map((day, index) => {
      const isToday = weekLabel === 'Tuần này' && day.key === todayKey;
      const dayLessons = lessons
        .filter((lesson) => lesson.day === day.key)
        .sort((a, b) => (a.startTime || a.time).localeCompare(b.startTime || b.time));

      return {
        ...day,
        date: weekDates[index],
        isToday,
        lessons: dayLessons,
      };
    });
  }, [lessons, todayKey, weekDates, weekLabel]);

  const status = currentPlan?.status;
  const sc = status ? statusColor(status) : null;
  const canSubmit = status === 'Draft' || status === 'RevisionRequested';
  const canWithdraw = status === 'Submitted';

  return (
    <DashboardLayout>
    <S.Container>
      {/* HERO */}
      <S.HeroSection>
        <S.HeroBgOverlay />
        <S.HeroContent>
          <S.HeroText>
            <S.HeroSubtitle>{className} · Kế hoạch giảng dạy</S.HeroSubtitle>
            <S.HeroTitle>Soạn giáo án tuần</S.HeroTitle>
            <S.HeroStats>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <S.HeroCount>{doneCount}/{totalCount}</S.HeroCount>
                <S.HeroCountLabel>tiết đã soạn xong</S.HeroCountLabel>
              </div>
              <S.HeroDivider />
              <S.HeroWeekLabel>{weekLabel}</S.HeroWeekLabel>
              {status && sc && (
                <>
                  <S.HeroDivider />
                  <S.StatusBadge $color={sc.fg} $bg={sc.bg}>
                    <S.StatusDot $color={sc.fg} />
                    {STATUS_LABELS[status]}
                  </S.StatusBadge>
                </>
              )}
            </S.HeroStats>
            <S.ProgressTrack>
              <S.ProgressFill $pct={donePct} />
            </S.ProgressTrack>
          </S.HeroText>

          <S.HeroActions>
            <S.PrimaryBtn type="button" onClick={openNew} disabled={isReadOnly}>
              <Plus size={19} strokeWidth={2.2} />
              Tạo giáo án mới
            </S.PrimaryBtn>
            <S.SecondaryBtn type="button" onClick={exportPlan}>
              <Download size={16} strokeWidth={1.8} />
              Xuất kế hoạch
            </S.SecondaryBtn>
            {currentPlan && canSubmit && (
              <S.SubmitBtn type="button" onClick={submitForApproval}>
                <Send size={16} />
                Gửi Hiệu trưởng duyệt
              </S.SubmitBtn>
            )}
            {currentPlan && canWithdraw && (
              <S.WithdrawBtn type="button" onClick={withdraw}>
                <Undo2 size={16} />
                Rút lại
              </S.WithdrawBtn>
            )}
          </S.HeroActions>
        </S.HeroContent>
      </S.HeroSection>

      {/* REVIEWER COMMENT (nếu có) */}
      {currentPlan && currentPlan.reviewerComment && (
        <S.ReviewNote>
          <strong>💬 Phản hồi từ Hiệu trưởng:</strong>
          {currentPlan.reviewerComment}
          {currentPlan.reviewerName && (
            <> &mdash; <em>{currentPlan.reviewerName}</em></>
          )}
        </S.ReviewNote>
      )}

      {/* READ-ONLY BANNER (khi plan đã Submitted/Approved/Rejected) */}
      {isReadOnly && (
        <S.ReadOnlyBanner>
          <Eye size={16} />
          Giáo án đang ở trạng thái <strong>{status && STATUS_LABELS[status]}</strong> &mdash; bạn chỉ có thể xem.
          {canWithdraw && ' Muốn sửa?'} {canWithdraw && (
            <button
              type="button"
              onClick={withdraw}
              style={{
                marginLeft: 8,
                color: '#BE123C',
                fontWeight: 700,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Rút lại
            </button>
          )}
        </S.ReadOnlyBanner>
      )}

      {/* TOOLBAR */}
      <S.Toolbar>
        <S.WeekNav>
          <S.WeekNavBtn type="button" onClick={prevWeek} aria-label="Tuần trước">
            <ChevronLeft size={16} strokeWidth={2.2} />
          </S.WeekNavBtn>
          <S.WeekNavLabel>{weekLabel}</S.WeekNavLabel>
          <S.WeekNavBtn type="button" onClick={nextWeek} aria-label="Tuần sau">
            <ChevronRight size={16} strokeWidth={2.2} />
          </S.WeekNavBtn>
        </S.WeekNav>

        <S.ToolbarSpacer />

        <S.FilterRow>
          {STATUS_FILTERS.map((f) => (
            <S.FilterChip
              key={f.key}
              type="button"
              $active={statusFilter === f.key || (f.key === 'all' && !statusFilter)}
              onClick={() =>
                setStatusFilter(f.key === 'all' ? undefined : (f.key as LessonPlanStatus))
              }
            >
              {f.label}
            </S.FilterChip>
          ))}
        </S.FilterRow>
      </S.Toolbar>

      <S.Toolbar>
        <S.LegendRow>
          {subjectLegend.map((item) => (
            <S.LegendChip key={item.key}>
              <S.LegendDot $color={item.color} />
              {item.label}
            </S.LegendChip>
          ))}
        </S.LegendRow>
      </S.Toolbar>

      {/* EMPTY / LOADING */}
      {!currentPlan && !isLoading && (
        <S.EmptyState>
          <h3>Chưa có giáo án cho tuần này</h3>
          <p>Hãy tạo giáo án mới hoặc chuyển sang tuần khác để xem nội dung đã có.</p>
          <S.PrimaryBtn type="button" onClick={openNew}>
            <Plus size={18} strokeWidth={2.2} />
            Tạo giáo án tuần này
          </S.PrimaryBtn>
        </S.EmptyState>
      )}

      {isLoading && (
        <S.EmptyState>
          <p>⏳ Đang tải giáo án…</p>
        </S.EmptyState>
      )}

      {/* BOARD */}
      {currentPlan && (
        <S.BoardGrid>
          {dayColumns.map((day) => (
            <S.DayCol key={day.key} $isToday={day.isToday}>
              <S.DayColHead>
                <div>
                  <S.DayName $isToday={day.isToday}>{day.name}</S.DayName>
                  <S.DayDate>{day.date}</S.DayDate>
                </div>
                {day.isToday && <S.TodayTag>HÔM NAY</S.TodayTag>}
              </S.DayColHead>

              <S.LessonList>
                {day.lessons.map((lesson) => {
                  const subject = getSubjectMeta(lesson.subject);
                  return (
                    <S.LessonCard
                      key={lesson.id}
                      $done={lesson.done}
                      $accent={subject.color}
                    >
                      <S.LessonTop>
                        <S.LessonIcon $tint={subject.tint} $color={subject.color}>
                          {subject.icon}
                        </S.LessonIcon>
                        <S.LessonSubject $color={subject.color}>{subject.label}</S.LessonSubject>
                        <S.LessonTime>
                          {lesson.startTime ? lesson.startTime.slice(0, 5) : lesson.time}
                        </S.LessonTime>
                      </S.LessonTop>
                      <S.LessonTitle>{lesson.title}</S.LessonTitle>

                      {lesson.objective && (
                        <S.LessonNote>
                          <strong>🎯 </strong>
                          {lesson.objective.length > 80
                            ? lesson.objective.slice(0, 80) + '…'
                            : lesson.objective}
                        </S.LessonNote>
                      )}
                      {lesson.activityDetails && (
                        <S.LessonNote>
                          <strong>📋 </strong>
                          {lesson.activityDetails.length > 80
                            ? lesson.activityDetails.slice(0, 80) + '…'
                            : lesson.activityDetails}
                        </S.LessonNote>
                      )}

                      <S.LessonActions>
                        <S.StatusBtn
                          type="button"
                          $done={lesson.done}
                          onClick={() => toggleDone(lesson.id)}
                        >
                          {lesson.done ? '✓ Đã dạy' : 'Đang soạn'}
                        </S.StatusBtn>
                        <S.ActionSpacer />
                        {!isReadOnly && (
                          <>
                            <S.IconBtn
                              type="button"
                              title="Sửa"
                              onClick={() => openEdit(lesson.id)}
                            >
                              <Edit2 size={13} strokeWidth={2} />
                            </S.IconBtn>
                            <S.IconBtn
                              type="button"
                              $danger
                              title="Xoá"
                              onClick={() => setItemToDeleteId(lesson.id)}
                            >
                              <Trash2 size={13} strokeWidth={2} />
                            </S.IconBtn>
                          </>
                        )}
                        {isReadOnly && (
                          <S.IconBtn
                            type="button"
                            title="Xem chi tiết"
                            onClick={() => openEdit(lesson.id)}
                          >
                            <Edit2 size={13} strokeWidth={2} />
                          </S.IconBtn>
                        )}
                      </S.LessonActions>
                    </S.LessonCard>
                  );
                })}

                {!isReadOnly && (
                  <S.AddLessonBtn type="button" onClick={() => openAdd(day.key as DayKey)}>
                    <Plus size={15} strokeWidth={2.2} />
                    Thêm tiết
                  </S.AddLessonBtn>
                )}
              </S.LessonList>
            </S.DayCol>
          ))}
        </S.BoardGrid>
      )}

      <LessonModal
        isOpen={modalOpen}
        editId={editItemId}
        draft={draft}
        isReadOnly={isReadOnly}
        onClose={closeModal}
        onSave={saveLesson}
        onUpdateDraft={updateDraft}
        onPickSubject={pickSubject}
        onPickDay={pickDay}
      />

      <S.ToastStack>
        {toasts.map((toast) => (
          <S.ToastItem key={toast.id}>{toast.text}</S.ToastItem>
        ))}
      </S.ToastStack>

      {itemToDeleteId && (
        <ConfirmDialog
          title="Xóa tiết học?"
          message="Bạn có chắc chắn muốn xóa tiết học này khỏi kế hoạch giảng dạy tuần? Hành động này không thể hoàn tác."
          confirmText="Xóa"
          cancelText="Hủy"
          variant="danger"
          onConfirm={() => {
            if (itemToDeleteId) {
              removeLesson(itemToDeleteId);
            }
            setItemToDeleteId(null);
          }}
          onCancel={() => setItemToDeleteId(null)}
        />
      )}
    </S.Container>
    </DashboardLayout>
  );
};