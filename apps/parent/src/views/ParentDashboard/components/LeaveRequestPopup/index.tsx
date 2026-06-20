'use client';

import React from 'react';
import * as S from './styles';
import { IconClose, IconCheck, IconAbsence, IconChevronLeft, IconChevronRight } from '@/assets/icons/dashboard';
import { useLeaveRequestPopup } from './useLeaveRequestPopup';

interface LeaveRequestPopupProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  className: string;
}

const REASONS = [
  'Bé bị ốm',
  'Việc gia đình',
  'Khám sức khỏe',
  'Đi du lịch',
  'Lý do khác'
];

const WEEKDAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
const MONTHS = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
];

const LeaveRequestPopup: React.FC<LeaveRequestPopupProps> = ({
  isOpen,
  onClose,
  studentName,
  className
}) => {
  const {
    isLongLeave,
    setIsLongLeave,
    singleDate,
    setSingleDate,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedReason,
    setSelectedReason,
    note,
    setNote,
    attachedFile,
    isSubmitting,
    fileInputRef,
    viewYear,
    viewMonth,
    prevMonth,
    nextMonth,
    handleDayClick,
    handleFileChange,
    handleTriggerUpload,
    handleRemoveFile,
    handleSubmit,
    prefixBlanks,
    daysInMonth,
    todayStr,
  } = useLeaveRequestPopup({ isOpen, onClose });

  if (!isOpen) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.HeadRow>
          <S.IconBox>
            <IconAbsence size={22} color="#16a34a" />
          </S.IconBox>
          <S.TitleWrap>
            <S.Title>Báo nghỉ học</S.Title>
            <S.Subtitle>Đơn xin nghỉ cho bé {studentName} · Lớp {className}</S.Subtitle>
          </S.TitleWrap>
          <S.CloseBtn onClick={onClose} aria-label="Đóng popup">
            <IconClose size={16} />
          </S.CloseBtn>
        </S.HeadRow>

        <S.ContentForm>
          {/* Long Leave Toggle */}
          <S.FormGroup>
            <S.LabelRow>
              <S.FieldLabel>Thời gian nghỉ</S.FieldLabel>
              <S.ToggleContainer>
                Nghỉ dài ngày
                <S.ToggleInput
                  type="checkbox"
                  checked={isLongLeave}
                  onChange={(e) => setIsLongLeave(e.target.checked)}
                />
                <S.ToggleSwitch $checked={isLongLeave} />
              </S.ToggleContainer>
            </S.LabelRow>

            {isLongLeave ? (
              <S.DateGrid>
                <div>
                  <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Từ ngày</span>
                  <S.StyledInput
                    type="date"
                    min={todayStr}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Đến ngày</span>
                  <S.StyledInput
                    type="date"
                    min={startDate || todayStr}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </S.DateGrid>
            ) : (
              <div>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Ngày nghỉ</span>
                <S.StyledInput
                  type="date"
                  min={todayStr}
                  value={singleDate}
                  onChange={(e) => setSingleDate(e.target.value)}
                />
              </div>
            )}

            {/* Interactive Mini Calendar */}
            <S.MiniCalWrapper>
              <S.MiniCalHeader>
                <S.MiniCalTitle>{MONTHS[viewMonth]}, {viewYear}</S.MiniCalTitle>
                <S.MiniCalNavs>
                  <S.MiniCalNavBtn type="button" onClick={prevMonth}>
                    <IconChevronLeft size={13} />
                  </S.MiniCalNavBtn>
                  <S.MiniCalNavBtn type="button" onClick={nextMonth}>
                    <IconChevronRight size={13} />
                  </S.MiniCalNavBtn>
                </S.MiniCalNavs>
              </S.MiniCalHeader>

              <S.MiniCalGrid>
                {WEEKDAYS.map((d) => (
                  <S.MiniCalWeekday key={d}>{d}</S.MiniCalWeekday>
                ))}

                {Array.from({ length: prefixBlanks }).map((_, i) => (
                  <S.MiniCalDay key={`blank-${i}`} type="button" $empty />
                ))}

                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const d = i + 1;
                  const monthStr = String(viewMonth + 1).padStart(2, '0');
                  const dayStr = String(d).padStart(2, '0');
                  const dateStr = `${viewYear}-${monthStr}-${dayStr}`;

                  const isToday = dateStr === todayStr;
                  const isSelected = !isLongLeave && dateStr === singleDate;
                  const isStart = isLongLeave && dateStr === startDate;
                  const isEnd = isLongLeave && dateStr === endDate;
                  const isBoundary = isStart || isEnd;
                  const isInRange = !!(isLongLeave && startDate && endDate && dateStr > startDate && dateStr < endDate);
                  const isPast = dateStr < todayStr;

                  return (
                    <S.MiniCalDay
                      key={d}
                      type="button"
                      $selected={isSelected || isBoundary}
                      $inRange={isInRange}
                      $today={isToday}
                      disabled={isPast}
                      onClick={() => handleDayClick(d)}
                    >
                      {d}
                    </S.MiniCalDay>
                  );
                })}
              </S.MiniCalGrid>
            </S.MiniCalWrapper>
          </S.FormGroup>

          {/* Quick Reasons */}
          <S.FormGroup>
            <S.FieldLabel>Lý do nghỉ</S.FieldLabel>
            <S.ChipGrid>
              {REASONS.map((reason) => (
                <S.ReasonChip
                  key={reason}
                  type="button"
                  $active={selectedReason === reason}
                  onClick={() => setSelectedReason(reason)}
                >
                  {reason}
                </S.ReasonChip>
              ))}
            </S.ChipGrid>
          </S.FormGroup>

          {/* Note Input */}
          <S.FormGroup>
            <S.FieldLabel>Ghi chú cho giáo viên (tùy chọn)</S.FieldLabel>
            <S.StyledTextarea
              placeholder={
                selectedReason === 'Bé bị ốm'
                  ? 'Ví dụ: Bé hơi sốt nhẹ, gia đình cho bé nghỉ theo dõi tại nhà...'
                  : 'Ghi chú thêm chi tiết lý do nghỉ học cho giáo viên biết...'
              }
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </S.FormGroup>

          {/* Document Attachment */}
          <S.FormGroup>
            <S.FieldLabel>Đính kèm minh chứng nếu có (Hình ảnh, Giấy khám bệnh...)</S.FieldLabel>
            
            {attachedFile ? (
              <S.AttachedFileBar>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, marginRight: '8px' }}>
                  📄 {attachedFile.name} ({(attachedFile.size / 1024).toFixed(1)} KB)
                </span>
                <S.RemoveFileBtn type="button" onClick={handleRemoveFile} title="Xóa tệp đính kèm">
                  <IconClose size={14} color="#dc2626" />
                </S.RemoveFileBtn>
              </S.AttachedFileBar>
            ) : (
              <S.AttachmentArea onClick={handleTriggerUpload}>
                <S.AttachmentLabel>
                  <span style={{ fontSize: '20px' }}>📁</span>
                  <span>Nhấn để chọn hoặc kéo thả tệp tin đính kèm</span>
                  <span>Hỗ trợ ảnh chụp đơn thuốc, giấy khám bệnh...</span>
                </S.AttachmentLabel>
                <S.HiddenFileInput
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*,application/pdf"
                />
              </S.AttachmentArea>
            )}
          </S.FormGroup>
        </S.ContentForm>

        <S.Footer>
          <S.CancelBtn type="button" onClick={onClose} disabled={isSubmitting}>
            Hủy
          </S.CancelBtn>
          <S.SubmitBtn type="button" onClick={handleSubmit} disabled={isSubmitting}>
            <IconCheck size={16} color="#ffffff" />
            {isSubmitting ? 'Đang gửi...' : 'Gửi đơn'}
          </S.SubmitBtn>
        </S.Footer>
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default LeaveRequestPopup;
