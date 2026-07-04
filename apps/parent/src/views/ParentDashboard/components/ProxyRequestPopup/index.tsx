'use client';

import React from 'react';
import * as S from '../LeaveRequestPopup/styles';
import { IconClose, IconCheck, IconProfile } from '@/assets/icons/dashboard';
import { useProxyRequestPopup } from './useProxyRequestPopup';

interface ProxyRequestPopupProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  className: string;
  onSubmitSuccess?: () => void;
}

const ProxyRequestPopup: React.FC<ProxyRequestPopupProps> = ({
  isOpen,
  onClose,
  studentName,
  className,
  onSubmitSuccess
}) => {
  const {
    authorizationDate,
    setAuthorizationDate,
    type,
    setType,
    proxyName,
    setProxyName,
    proxyPhone,
    setProxyPhone,
    proxyIDCard,
    setProxyIDCard,
    notes,
    setNotes,
    attachedFile,
    isSubmitting,
    fileInputRef,
    todayStr,
    handleFileChange,
    handleTriggerUpload,
    handleRemoveFile,
    handleSubmit,
  } = useProxyRequestPopup({ isOpen, onClose, onSubmitSuccess });

  if (!isOpen) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.HeadRow>
          <S.IconBox>
            <IconProfile size={22} color="#0d9488" />
          </S.IconBox>
          <S.TitleWrap>
            <S.Title>Ủy quyền đón hộ</S.Title>
            <S.Subtitle>Ủy quyền đưa đón bé {studentName} · Lớp {className}</S.Subtitle>
          </S.TitleWrap>
          <S.CloseBtn onClick={onClose} aria-label="Đóng popup">
            <IconClose size={16} />
          </S.CloseBtn>
        </S.HeadRow>

        <S.ContentForm>
          {/* Authorization Date Selection */}
          <S.FormGroup>
            <S.FieldLabel>Ngày ủy quyền đưa đón</S.FieldLabel>
            <S.StyledInput
              type="date"
              min={todayStr}
              value={authorizationDate}
              onChange={(e) => setAuthorizationDate(e.target.value)}
            />
          </S.FormGroup>

          {/* Authorization Type Selection */}
          <S.FormGroup>
            <S.FieldLabel>Hình thức ủy quyền</S.FieldLabel>
            <S.ChipGrid>
              <S.ReasonChip
                type="button"
                $active={type === 'checkin'}
                onClick={() => setType('checkin')}
              >
                Đưa đi học (Sáng)
              </S.ReasonChip>
              <S.ReasonChip
                type="button"
                $active={type === 'checkout'}
                onClick={() => setType('checkout')}
              >
                Đón bé về (Chiều)
              </S.ReasonChip>
              <S.ReasonChip
                type="button"
                $active={type === 'both'}
                onClick={() => setType('both')}
              >
                Cả hai (Đưa & Đón)
              </S.ReasonChip>
            </S.ChipGrid>
          </S.FormGroup>

          {/* Proxy Name */}
          <S.FormGroup>
            <S.FieldLabel>Họ tên người được ủy quyền</S.FieldLabel>
            <S.StyledInput
              type="text"
              placeholder="Ví dụ: Nguyễn Văn B"
              value={proxyName}
              onChange={(e) => setProxyName(e.target.value)}
            />
          </S.FormGroup>

          {/* Phone & ID Card grid */}
          <S.DateGrid>
            <div>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Số điện thoại</span>
              <S.StyledInput
                type="tel"
                placeholder="Ví dụ: 0901234567"
                value={proxyPhone}
                onChange={(e) => setProxyPhone(e.target.value)}
              />
            </div>
            <div>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Số CCCD / CMND</span>
              <S.StyledInput
                type="text"
                placeholder="Ví dụ: 079123456789"
                value={proxyIDCard}
                onChange={(e) => setProxyIDCard(e.target.value)}
              />
            </div>
          </S.DateGrid>

          {/* Notes */}
          <S.FormGroup style={{ marginTop: '16px' }}>
            <S.FieldLabel>Ghi chú thêm cho giáo viên (tùy chọn)</S.FieldLabel>
            <S.StyledTextarea
              placeholder="Ví dụ: Là chú ruột của bé, đi xe máy màu đỏ..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </S.FormGroup>

          {/* Portrait Photo Upload */}
          <S.FormGroup>
            <S.FieldLabel>Ảnh chân dung người đón hộ (Bắt buộc để giáo viên đối chiếu)</S.FieldLabel>
            {attachedFile ? (
              <S.AttachedFileBar>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, marginRight: '8px' }}>
                  📷 {attachedFile.name} ({(attachedFile.size / 1024).toFixed(1)} KB)
                </span>
                <S.RemoveFileBtn type="button" onClick={handleRemoveFile} title="Xóa tệp đính kèm">
                  <IconClose size={14} color="#dc2626" />
                </S.RemoveFileBtn>
              </S.AttachedFileBar>
            ) : (
              <S.AttachmentArea onClick={handleTriggerUpload}>
                <S.AttachmentLabel>
                  <span style={{ fontSize: '20px' }}>📷</span>
                  <span>Nhấn để chọn ảnh chân dung người đón hộ</span>
                  <span>Chỉ chấp nhận file ảnh (PNG, JPG) dưới 5MB</span>
                </S.AttachmentLabel>
                <S.HiddenFileInput
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </S.AttachmentArea>
            )}
          </S.FormGroup>
        </S.ContentForm>

        <S.Footer>
          <S.CancelBtn type="button" onClick={onClose} disabled={isSubmitting}>
            Hủy
          </S.CancelBtn>
          <S.SubmitBtn type="button" onClick={handleSubmit} disabled={isSubmitting} style={{ backgroundColor: '#0d9488' }}>
            <IconCheck size={16} color="#ffffff" />
            {isSubmitting ? 'Đang gửi...' : 'Xác nhận ủy quyền'}
          </S.SubmitBtn>
        </S.Footer>
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default ProxyRequestPopup;
