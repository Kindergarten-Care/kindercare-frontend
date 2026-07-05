import React, { useEffect, useState } from 'react';
import { BookOpen, Save, X } from 'lucide-react';
import { DAYS, SUBJECTS, feKeyToApiDay } from '../constants';
import * as S from '../styles';
import type { DayKey, SubjectKey } from '@/config/types/lessonPlan';
import type { LessonDraft } from '../hooks/useLessonPlan';

interface LessonModalProps {
  isOpen: boolean;
  editId: string | null;
  draft: LessonDraft;
  isReadOnly?: boolean;
  onClose: () => void;
  onSave: () => void;
  onUpdateDraft: (patch: Partial<LessonDraft>) => void;
  onPickSubject: (subject: SubjectKey) => void;
  onPickDay: (day: DayKey) => void;
}

const SUBJECT_KEYS = Object.keys(SUBJECTS) as SubjectKey[];

export const LessonModal: React.FC<LessonModalProps> = ({
  isOpen,
  editId,
  draft,
  isReadOnly = false,
  onClose,
  onSave,
  onUpdateDraft,
  onPickSubject,
  onPickDay,
}) => {
  if (!isOpen) return null;

  const modalDayName = DAYS.find((d) => d.key === draft.day)?.name ?? '';

  return (
    <S.ModalBackdrop onClick={onClose}>
      <S.ModalWideBox onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <S.ModalWideHeader>
          <S.ModalIcon>
            <BookOpen size={21} strokeWidth={1.8} />
          </S.ModalIcon>
          <div style={{ flex: 1 }}>
            <S.ModalTitle>{editId ? 'Sửa tiết học' : 'Thêm tiết học mới'}</S.ModalTitle>
            <S.ModalSubtitle>{modalDayName} · Soạn giáo án chi tiết</S.ModalSubtitle>
          </div>
          <S.ModalCloseBtn onClick={onClose} aria-label="Đóng">
            <X size={18} />
          </S.ModalCloseBtn>
        </S.ModalWideHeader>

        {/* BODY */}
        <S.ModalBody>
          {/* ROW 1: Lĩnh vực */}
          <div>
            <S.FieldLabel>Lĩnh vực / môn học</S.FieldLabel>
            <S.SubjectGrid>
              {SUBJECT_KEYS.map((key) => {
                const subject = SUBJECTS[key];
                return (
                  <S.SubjectBtn
                    key={key}
                    type="button"
                    $active={draft.subject === key}
                    $color={subject.color}
                    $tint={subject.tint}
                    onClick={() => !isReadOnly && onPickSubject(key)}
                    disabled={isReadOnly}
                  >
                    {subject.icon} {subject.label}
                  </S.SubjectBtn>
                );
              })}
            </S.SubjectGrid>
          </div>

          {/* Tên bài học */}
          <div>
            <S.FieldLabel>Tên bài học *</S.FieldLabel>
            <S.TextInput
              value={draft.title}
              onChange={(e) => onUpdateDraft({ title: e.target.value })}
              placeholder="Ví dụ: Nhận biết hình tròn, hình vuông"
              disabled={isReadOnly}
            />
          </div>

          {/* Giờ bắt đầu + Giờ kết thúc */}
          <S.TimeRow>
            <S.TimeField>
              <S.FieldLabel>Giờ bắt đầu</S.FieldLabel>
              <S.TextInput
                value={draft.startTime ? draft.startTime.slice(0, 5) : draft.time}
                onChange={(e) => onUpdateDraft({ time: e.target.value, startTime: e.target.value + ':00' })}
                placeholder="08:45"
                disabled={isReadOnly}
              />
            </S.TimeField>
            <S.TimeField>
              <S.FieldLabel>Giờ kết thúc</S.FieldLabel>
              <S.TextInput
                value={draft.endTime ? draft.endTime.slice(0, 5) : ''}
                onChange={(e) => onUpdateDraft({ endTime: e.target.value + ':00' })}
                placeholder="09:15"
                disabled={isReadOnly}
              />
            </S.TimeField>
          </S.TimeRow>

          {/* Thứ trong tuần */}
          <div>
            <S.FieldLabel>Thứ trong tuần</S.FieldLabel>
            <S.DayBtnRow>
              {DAYS.map((day) => (
                <S.DayBtn
                  key={day.key}
                  type="button"
                  $active={draft.day === day.key}
                  onClick={() => !isReadOnly && onPickDay(day.key)}
                  disabled={isReadOnly}
                >
                  {day.short}
                </S.DayBtn>
              ))}
            </S.DayBtnRow>
          </div>

          {/* 🎯 Mục tiêu */}
          <div>
            <S.FieldLabel>🎯 Mục tiêu bài học</S.FieldLabel>
            <S.TextArea
              value={draft.objective}
              onChange={(e) => onUpdateDraft({ objective: e.target.value })}
              placeholder="Bé sẽ đạt được gì sau tiết học này? (kiến thức, kỹ năng, thái độ)"
              disabled={isReadOnly}
            />
          </div>

          {/* 📋 Hoạt động */}
          <div>
            <S.FieldLabel>📋 Chi tiết hoạt động / Cách tiến hành</S.FieldLabel>
            <S.TextArea
              value={draft.activityDetails}
              onChange={(e) => onUpdateDraft({ activityDetails: e.target.value })}
              placeholder="Cô hướng dẫn: ... Bé thực hành: ... Trò chơi: ..."
              disabled={isReadOnly}
            />
          </div>

          {/* 🎒 Đồ dùng */}
          <div>
            <S.FieldLabel>🎒 Đồ dùng / Học liệu cần chuẩn bị</S.FieldLabel>
            <S.TextArea
              value={draft.materials}
              onChange={(e) => onUpdateDraft({ materials: e.target.value })}
              placeholder="Flashcard, giấy A4, sáp màu, bảng con, ... (mỗi mục 1 dòng)"
              rows={3}
              disabled={isReadOnly}
            />
          </div>

          {/* 📝 Lưu ý GV */}
          <div>
            <S.FieldLabel>📝 Lưu ý cho giáo viên (tuỳ chọn)</S.FieldLabel>
            <S.TextArea
              value={draft.teacherNote}
              onChange={(e) => onUpdateDraft({ teacherNote: e.target.value })}
              placeholder="Lưu ý khi dạy: trẻ tăng động, cần chú ý quan sát, ..."
              rows={2}
              disabled={isReadOnly}
            />
          </div>

          <S.ModalFooter style={{ marginTop: 4 }}>
            <S.CancelBtn type="button" onClick={onClose}>Huỷ</S.CancelBtn>
            {!isReadOnly && (
              <S.SaveBtn type="button" onClick={onSave}>
                <Save size={16} style={{ marginRight: 6 }} />
                {editId ? 'Lưu thay đổi' : 'Thêm vào kế hoạch'}
              </S.SaveBtn>
            )}
          </S.ModalFooter>
        </S.ModalBody>
      </S.ModalWideBox>
    </S.ModalBackdrop>
  );
};