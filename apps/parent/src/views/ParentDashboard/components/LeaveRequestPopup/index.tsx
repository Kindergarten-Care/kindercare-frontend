'use client';

import React from 'react';
import { useTranslations, useFormatter } from 'next-intl';
import { ResponsiveModal } from '@kindercare/ui';
import * as S from './styles';
import { IconClose, IconCheck, IconAbsence, IconChevronLeft, IconChevronRight } from '@/assets/icons/dashboard';
import { useLeaveRequestPopup } from './useLeaveRequestPopup';

interface LeaveRequestPopupProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  className: string;
  onSubmitSuccess?: () => void;
}

// `value` is sent to the API as-is and must stay stable across locales; only the label is translated.
export const REASONS = [
  { value: 'Bé bị ốm', labelKey: 'leave.reasonSick' },
  { value: 'Việc gia đình', labelKey: 'leave.reasonFamily' },
  { value: 'Khám sức khỏe', labelKey: 'leave.reasonCheckup' },
  { value: 'Đi du lịch', labelKey: 'leave.reasonTravel' },
  { value: 'Lý do khác', labelKey: 'leave.reasonOther' },
] as const;

const LeaveRequestPopup: React.FC<LeaveRequestPopupProps> = ({
  isOpen,
  onClose,
  studentName,
  className,
  onSubmitSuccess
}) => {
  const t = useTranslations('Dashboard');
  const format = useFormatter();
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
  } = useLeaveRequestPopup({ isOpen, onClose, onSubmitSuccess });

  const monthLabel = format.dateTime(new Date(viewYear, viewMonth, 1), { month: 'long' });
  const weekdayLabels = Array.from({ length: 7 }, (_, i) =>
    format.dateTime(new Date(Date.UTC(2024, 0, i + 1)), { weekday: 'short' })
  );

  return (
    <ResponsiveModal isOpen={isOpen} onClose={onClose} maxWidth="520px">
        <S.HeadRow>
          <S.IconBox>
            <IconAbsence size={22} color="#16a34a" />
          </S.IconBox>
          <S.TitleWrap>
            <S.Title>{t('hero.reportAbsence')}</S.Title>
            <S.Subtitle>{t('leave.subtitle', { name: studentName, className })}</S.Subtitle>
          </S.TitleWrap>
          <S.CloseBtn onClick={onClose} aria-label={t('closePopup')}>
            <IconClose size={16} />
          </S.CloseBtn>
        </S.HeadRow>

        <S.ContentForm>
          {/* Long Leave Toggle */}
          <S.FormGroup>
            <S.LabelRow>
              <S.FieldLabel>{t('leave.durationLabel')}</S.FieldLabel>
              <S.ToggleContainer>
                {t('leave.multiDayToggle')}
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
                  <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, display: 'block', marginBottom: '4px' }}>{t('leave.fromDate')}</span>
                  <S.StyledInput
                    type="date"
                    min={todayStr}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, display: 'block', marginBottom: '4px' }}>{t('leave.toDate')}</span>
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
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, display: 'block', marginBottom: '4px' }}>{t('leave.singleDayLabel')}</span>
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
                <S.MiniCalTitle>{monthLabel}, {viewYear}</S.MiniCalTitle>
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
                {weekdayLabels.map((d) => (
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
            <S.FieldLabel>{t('leave.reasonLabel')}</S.FieldLabel>
            <S.ChipGrid>
              {REASONS.map((reason) => (
                <S.ReasonChip
                  key={reason.value}
                  type="button"
                  $active={selectedReason === reason.value}
                  onClick={() => setSelectedReason(reason.value)}
                >
                  {t(reason.labelKey)}
                </S.ReasonChip>
              ))}
            </S.ChipGrid>
          </S.FormGroup>

          {/* Note Input */}
          <S.FormGroup>
            <S.FieldLabel>{t('leave.noteLabel')}</S.FieldLabel>
            <S.StyledTextarea
              placeholder={
                selectedReason === REASONS[0].value
                  ? t('leave.notePlaceholderSick')
                  : t('leave.notePlaceholderGeneric')
              }
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </S.FormGroup>

          {/* Document Attachment */}
          <S.FormGroup>
            <S.FieldLabel>{t('leave.attachmentLabel')}</S.FieldLabel>

            {attachedFile ? (
              <S.AttachedFileBar>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, marginRight: '8px' }}>
                  {t('leave.attachedFileInfo', { fileName: attachedFile.name, sizeKb: (attachedFile.size / 1024).toFixed(1) })}
                </span>
                <S.RemoveFileBtn type="button" onClick={handleRemoveFile} title={t('leave.removeAttachment')}>
                  <IconClose size={14} color="#dc2626" />
                </S.RemoveFileBtn>
              </S.AttachedFileBar>
            ) : (
              <S.AttachmentArea onClick={handleTriggerUpload}>
                <S.AttachmentLabel>
                  <span style={{ fontSize: '20px' }}>📁</span>
                  <span>{t('leave.uploadPrompt')}</span>
                  <span>{t('leave.uploadHint')}</span>
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
            {t('cancel')}
          </S.CancelBtn>
          <S.SubmitBtn type="button" onClick={handleSubmit} disabled={isSubmitting}>
            <IconCheck size={16} color="#ffffff" />
            {isSubmitting ? t('submitting') : t('leave.submit')}
          </S.SubmitBtn>
        </S.Footer>
    </ResponsiveModal>
  );
};

export default LeaveRequestPopup;
