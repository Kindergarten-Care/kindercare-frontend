'use client';

import React, { useState, useRef } from 'react';
import * as S from './styles';
import { IconClose, IconCheck, IconAbsence } from '@/assets/icons/dashboard';

interface LeaveRequestPopupProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  className: string;
}

const getLocalDateString = (offsetDays = 0): string => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const date = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${date}`;
};

const formatToDisplayDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
};

const REASONS = [
  'Bé bị ốm',
  'Việc gia đình',
  'Khám sức khỏe',
  'Đi du lịch',
  'Lý do khác'
];

const LeaveRequestPopup: React.FC<LeaveRequestPopupProps> = ({
  isOpen,
  onClose,
  studentName,
  className
}) => {
  const [isLongLeave, setIsLongLeave] = useState<boolean>(false);
  const [singleDate, setSingleDate] = useState<string>(getLocalDateString(0));
  const [startDate, setStartDate] = useState<string>(getLocalDateString(0));
  const [endDate, setEndDate] = useState<string>(getLocalDateString(1));
  const [selectedReason, setSelectedReason] = useState<string>('Bé bị ốm');
  const [note, setNote] = useState<string>('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachedFile(e.target.files[0]);
    }
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = () => {
    const datesInfo = isLongLeave
      ? `Từ ngày: ${formatToDisplayDate(startDate)} - Đến ngày: ${formatToDisplayDate(endDate)}`
      : `Ngày nghỉ: ${formatToDisplayDate(singleDate)}`;
    
    const submittedData = {
      studentName,
      className,
      datesInfo,
      reason: selectedReason,
      note: note.trim() || 'Không có ghi chú',
      attachment: attachedFile ? attachedFile.name : 'Không có đính kèm'
    };

    console.log('--- Gửi đơn xin nghỉ học ---', submittedData);

    alert(
      `Gửi đơn xin nghỉ thành công!\n\n` +
      `• Học sinh: ${submittedData.studentName}\n` +
      `• Lớp: ${submittedData.className}\n` +
      `• Thời gian: ${submittedData.datesInfo}\n` +
      `• Lý do: ${submittedData.reason}\n` +
      `• Ghi chú: ${submittedData.note}\n` +
      `• Đính kèm: ${submittedData.attachment}`
    );

    // Reset state & close
    setIsLongLeave(false);
    setSingleDate(getLocalDateString(0));
    setStartDate(getLocalDateString(0));
    setEndDate(getLocalDateString(1));
    setSelectedReason('Bé bị ốm');
    setNote('');
    setAttachedFile(null);
    onClose();
  };

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
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Đến ngày</span>
                  <S.StyledInput
                    type="date"
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
                  value={singleDate}
                  onChange={(e) => setSingleDate(e.target.value)}
                />
              </div>
            )}
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
          <S.CancelBtn type="button" onClick={onClose}>
            Hủy
          </S.CancelBtn>
          <S.SubmitBtn type="button" onClick={handleSubmit}>
            <IconCheck size={16} color="#ffffff" />
            Gửi đơn
          </S.SubmitBtn>
        </S.Footer>
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default LeaveRequestPopup;
