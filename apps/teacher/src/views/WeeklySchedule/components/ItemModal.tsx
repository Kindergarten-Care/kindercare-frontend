'use client';

import React from 'react';
import { BookOpen, Save, X, AlertTriangle, Info } from 'lucide-react';
import {
  ACTIVITY_TYPE_LABELS,
  ACTIVITY_TYPE_COLORS,
} from '@/config/types/weeklySchedule';
import * as S from '../styles';
import type { ActivityType, DayOfWeek, SchoolDay } from '@/config/types/weeklySchedule';

interface EditingItem {
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  activityName: string;
  activityType: ActivityType;
  details: string;
  location: string;
  orderIndex: number;
}

interface ItemModalProps {
  isOpen: boolean;
  editId: number | null;
  item: EditingItem | null;
  /**
   * Forced view-only mode (e.g. template is Approved).
   */
  isReadOnly?: boolean;
  /**
   * Explicit view-only flag for past/today columns regardless of template status.
   */
  viewOnly?: boolean;
  /**
   * When true, show a hint that opening the editor on a future day of a
   * already-Submitted template will mark a change request for the principal.
   */
  changeRequestHint?: boolean;
  onClose: () => void;
  onSave: () => void;
  onUpdate: (patch: Partial<EditingItem>) => void;
}

const ACTIVITY_TYPES: ActivityType[] = ['pickup', 'meal', 'study', 'nap', 'play', 'dropoff', 'other'];

const ACTIVITY_ICONS: Record<ActivityType, string> = {
  pickup: '👋',
  meal: '🍽️',
  study: '📚',
  nap: '😴',
  play: '🎮',
  dropoff: '👋',
  other: '📌',
};

const DAYS: { key: SchoolDay; label: string }[] = [
  { key: 'Monday', label: 'Thứ 2' },
  { key: 'Tuesday', label: 'Thứ 3' },
  { key: 'Wednesday', label: 'Thứ 4' },
  { key: 'Thursday', label: 'Thứ 5' },
  { key: 'Friday', label: 'Thứ 6' },
];

export const ItemModal: React.FC<ItemModalProps> = ({
  isOpen,
  editId,
  item,
  isReadOnly = false,
  viewOnly = false,
  changeRequestHint = false,
  onClose,
  onSave,
  onUpdate,
}) => {
  if (!isOpen || !item) return null;

  const modalDayName = DAYS.find(d => d.key === item.dayOfWeek)?.label || '';
  // Effective lock: true if forced by template status OR explicitly marked as view-only (past/today)
  const effectiveReadOnly = isReadOnly || viewOnly;

  // Reason shown at the top of the modal when locked
  const lockReason = viewOnly
    ? 'Ngày này đã qua hoặc là hôm nay — bạn chỉ có thể xem, không thể chỉnh sửa.'
    : isReadOnly
      ? 'Thời khóa biểu đang ở trạng thái Đã duyệt — bạn chỉ có thể xem.'
      : null;

  return (
    <S.ModalBackdrop onClick={onClose}>
      <S.ModalBox onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <S.ModalHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <S.ModalIcon>
              <BookOpen size={21} />
            </S.ModalIcon>
            <div>
              <S.ModalTitle>{editId ? 'Sửa hoạt động' : 'Thêm hoạt động mới'}</S.ModalTitle>
              <S.ModalSubtitle>{modalDayName}</S.ModalSubtitle>
            </div>
          </div>
          <S.ModalCloseBtn onClick={onClose}>
            <X size={18} />
          </S.ModalCloseBtn>
        </S.ModalHeader>

        {/* BODY */}
        <S.ModalBody>
          {/* VIEW-ONLY NOTICE (only when effectiveReadOnly && viewOnly / isReadOnly) */}
          {effectiveReadOnly && lockReason && (
            <S.ViewOnlyNotice>
              <AlertTriangle size={16} />
              <span>{lockReason}</span>
            </S.ViewOnlyNotice>
          )}

          {/* CHANGE-REQUEST HINT for future day of Submitted template */}
          {!effectiveReadOnly && changeRequestHint && (
            <S.ChangeRequestHint>
              <Info size={16} />
              <span>
                Thời khóa biểu đang <strong>chờ duyệt</strong>. Khi bạn lưu thay đổi cho ngày tương lai,
                hệ thống sẽ <strong>tự động ghi nhận yêu cầu cập nhật</strong> để gửi Hiệu trưởng xử lý.
              </span>
            </S.ChangeRequestHint>
          )}

          {/* Loại hoạt động */}
          <div>
            <S.FieldLabel>Loại hoạt động</S.FieldLabel>
            <S.TypeGrid>
              {ACTIVITY_TYPES.map((type) => (
                <S.TypeBtn
                  key={type}
                  type="button"
                  $active={item.activityType === type}
                  $color={ACTIVITY_TYPE_COLORS[type]}
                  onClick={() => !effectiveReadOnly && onUpdate({ activityType: type })}
                  disabled={effectiveReadOnly}
                >
                  <S.TypeIcon>{ACTIVITY_ICONS[type]}</S.TypeIcon>
                  <S.TypeLabel>{ACTIVITY_TYPE_LABELS[type]}</S.TypeLabel>
                </S.TypeBtn>
              ))}
            </S.TypeGrid>
          </div>

          {/* Tên hoạt động */}
          <div>
            <S.FieldLabel>Tên hoạt động *</S.FieldLabel>
            <S.TextInput
              value={item.activityName}
              onChange={(e) => onUpdate({ activityName: e.target.value })}
              placeholder="Ví dụ: Đón bé & Thể dục sáng"
              disabled={effectiveReadOnly}
            />
          </div>

          {/* Giờ bắt đầu + Giờ kết thúc */}
          <S.TimeRow>
            <S.TimeField>
              <S.FieldLabel>Giờ bắt đầu</S.FieldLabel>
              <S.TextInput
                type="time"
                value={item.startTime}
                onChange={(e) => onUpdate({ startTime: e.target.value })}
                disabled={effectiveReadOnly}
              />
            </S.TimeField>
            <S.TimeField>
              <S.FieldLabel>Giờ kết thúc</S.FieldLabel>
              <S.TextInput
                type="time"
                value={item.endTime}
                onChange={(e) => onUpdate({ endTime: e.target.value })}
                disabled={effectiveReadOnly}
              />
            </S.TimeField>
          </S.TimeRow>

          {/* Thứ */}
          <div>
            <S.FieldLabel>Thứ trong tuần</S.FieldLabel>
            <S.DayBtnRow>
              {DAYS.map((day) => (
                <S.DayBtn
                  key={day.key}
                  type="button"
                  $active={item.dayOfWeek === day.key}
                  onClick={() => !effectiveReadOnly && onUpdate({ dayOfWeek: day.key as SchoolDay })}
                  disabled={effectiveReadOnly}
                >
                  {day.label}
                </S.DayBtn>
              ))}
            </S.DayBtnRow>
          </div>

          {/* Mô tả chi tiết */}
          <div>
            <S.FieldLabel>Mô tả / Nội dung hoạt động</S.FieldLabel>
            <S.TextArea
              value={item.details}
              onChange={(e) => onUpdate({ details: e.target.value })}
              placeholder="Mô tả chi tiết hoạt động..."
              disabled={effectiveReadOnly}
            />
          </div>

          {/* Địa điểm */}
          <div>
            <S.FieldLabel>Địa điểm</S.FieldLabel>
            <S.TextInput
              value={item.location}
              onChange={(e) => onUpdate({ location: e.target.value })}
              placeholder="Ví dụ: Sân trường, Lớp học, Phòng ăn"
              disabled={effectiveReadOnly}
            />
          </div>

          <S.ModalFooter style={{ marginTop: 0, padding: '16px 0 0 0', borderTop: 'none' }}>
            <S.CancelBtn type="button" onClick={onClose}>Hủy</S.CancelBtn>
            {!effectiveReadOnly && (
              <S.SaveBtn type="button" onClick={onSave}>
                <Save size={16} style={{ marginRight: 6 }} />
                {editId ? 'Lưu thay đổi' : 'Thêm vào thời khóa biểu'}
              </S.SaveBtn>
            )}
          </S.ModalFooter>
        </S.ModalBody>
      </S.ModalBox>
    </S.ModalBackdrop>
  );
};
