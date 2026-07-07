'use client';

import React, { useEffect, useState } from 'react';
import { FileText, Send, Undo2, X } from 'lucide-react';
import * as S from '../styles';

type Mode = 'submit' | 'withdraw';

interface ChangeRequestModalProps {
  isOpen: boolean;
  mode: Mode;
  defaultReason?: string;
  /** True when the template has a snapshot already captured (only used in submit mode). */
  hasPendingChangeRequest?: boolean;
  isSubmitting?: boolean;
  onClose: () => void;
  /**
   * Submit mode: called with the reason (≥5 chars).
   * Withdraw mode: called with the boolean restoreOriginal flag.
   */
  onConfirm: (payload: { reason: string } | { restoreOriginal: boolean }) => void;
}

const MIN_REASON_LEN = 5;

export const ChangeRequestModal: React.FC<ChangeRequestModalProps> = ({
  isOpen,
  mode,
  defaultReason = '',
  hasPendingChangeRequest = false,
  isSubmitting = false,
  onClose,
  onConfirm,
}) => {
  const [reason, setReason] = useState(defaultReason);
  const [restoreOriginal, setRestoreOriginal] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setReason(defaultReason);
      setRestoreOriginal(true);
    }
  }, [isOpen, defaultReason]);

  if (!isOpen) return null;

  const isSubmit = mode === 'submit';
  const reasonTrimmed = reason.trim();
  const reasonValid = reasonTrimmed.length >= MIN_REASON_LEN;
  const submitDisabled = isSubmitting || !reasonValid;

  const handleSubmit = () => {
    if (isSubmit) {
      if (!reasonValid) return;
      onConfirm({ reason: reasonTrimmed });
    } else {
      onConfirm({ restoreOriginal });
    }
  };

  return (
    <S.ModalBackdrop onClick={onClose}>
      <S.ModalBox onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <S.ModalHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <S.ModalIcon>
              {isSubmit ? <Send size={21} /> : <Undo2 size={21} />}
            </S.ModalIcon>
            <div>
              <S.ModalTitle>
                {isSubmit ? 'Gửi yêu cầu thay đổi' : 'Rút yêu cầu thay đổi'}
              </S.ModalTitle>
              <S.ModalSubtitle>
                {isSubmit
                  ? 'Vui lòng mô tả lý do bạn muốn thay đổi thời khóa biểu'
                  : 'Bạn muốn khôi phục lịch ban đầu hay giữ các thay đổi đã chỉnh sửa?'}
              </S.ModalSubtitle>
            </div>
          </div>
          <S.ModalCloseBtn onClick={onClose} disabled={isSubmitting}>
            <X size={18} />
          </S.ModalCloseBtn>
        </S.ModalHeader>

        {/* BODY */}
        <S.ModalBody>
          {isSubmit ? (
            <>
              {!hasPendingChangeRequest && (
                <S.ViewOnlyNotice style={{ background: '#EFF6FF', borderColor: '#3B82F6', color: '#1E40AF' }}>
                  <FileText size={16} />
                  <span>
                    Hệ thống sẽ tự động lưu một bản snapshot của lịch hiện tại trước khi
                    gửi yêu cầu, để có thể khôi phục lại nếu bạn rút yêu cầu sau này.
                  </span>
                </S.ViewOnlyNotice>
              )}
              <div>
                <S.FieldLabel>Lý do thay đổi *</S.FieldLabel>
                <S.TextArea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Ví dụ: Điều chỉnh hoạt động ngoài trời do thời tiết..."
                  rows={4}
                  maxLength={500}
                  disabled={isSubmitting}
                />
                <div
                  style={{
                    fontSize: 11,
                    color: reasonValid ? '#10B981' : '#94a3b8',
                    marginTop: 4,
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>Tối thiểu {MIN_REASON_LEN} ký tự</span>
                  <span>{reasonTrimmed.length}/500</span>
                </div>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <RestoreOption
                checked={restoreOriginal}
                onChange={() => setRestoreOriginal(true)}
                title="Khôi phục về lịch ban đầu (khuyến nghị)"
                description="Xóa toàn bộ chỉnh sửa và khôi phục lịch về trạng thái Đã duyệt trước đó."
              />
              <RestoreOption
                checked={!restoreOriginal}
                onChange={() => setRestoreOriginal(false)}
                title="Giữ nguyên các thay đổi"
                description="Rút yêu cầu nhưng giữ lại các chỉnh sửa. Lịch sẽ chuyển về trạng thái Nháp để bạn tiếp tục chỉnh sửa."
              />
            </div>
          )}
        </S.ModalBody>

        {/* FOOTER */}
        <S.ModalFooter>
          <S.CancelBtn type="button" onClick={onClose} disabled={isSubmitting}>
            Hủy
          </S.CancelBtn>
          <S.SaveBtn
            type="button"
            onClick={handleSubmit}
            disabled={submitDisabled}
            style={
              !isSubmit
                ? { background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)' }
                : undefined
            }
          >
            {isSubmit ? <Send size={16} /> : <Undo2 size={16} />}
            {isSubmit ? 'Gửi yêu cầu' : 'Xác nhận rút'}
          </S.SaveBtn>
        </S.ModalFooter>
      </S.ModalBox>
    </S.ModalBackdrop>
  );
};

interface RestoreOptionProps {
  checked: boolean;
  onChange: () => void;
  title: string;
  description: string;
}

const RestoreOption: React.FC<RestoreOptionProps> = ({ checked, onChange, title, description }) => (
  <label
    style={{
      display: 'flex',
      gap: 12,
      padding: 12,
      borderRadius: 10,
      border: `2px solid ${checked ? '#667eea' : '#e2e8f0'}`,
      background: checked ? 'rgba(102,126,234,0.06)' : 'white',
      cursor: 'pointer',
      transition: 'all 0.15s',
    }}
  >
    <input
      type="radio"
      checked={checked}
      onChange={onChange}
      style={{ marginTop: 2, accentColor: '#667eea' }}
    />
    <div>
      <div style={{ fontWeight: 600, fontSize: 14, color: '#2d3748', marginBottom: 4 }}>
        {title}
      </div>
      <div style={{ fontSize: 12, color: '#718096', lineHeight: 1.5 }}>{description}</div>
    </div>
  </label>
);