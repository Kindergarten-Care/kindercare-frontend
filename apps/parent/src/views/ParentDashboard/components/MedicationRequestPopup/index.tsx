'use client';

import React from 'react';
import * as S from './styles';
import { IconClose, IconCheck, IconMedicine, IconPlus } from '@/assets/icons/dashboard';
import { useMedicationRequestPopup } from './useMedicationRequestPopup';

interface MedicationRequestPopupProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  className: string;
  onSubmitSuccess?: () => void;
}

const TIMING_OPTIONS = [
  'Sau ăn sáng',
  'Sau ăn trưa',
  'Trước khi ngủ',
  'Khi cần'
];

const MedicationRequestPopup: React.FC<MedicationRequestPopupProps> = ({
  isOpen,
  onClose,
  studentName,
  className,
  onSubmitSuccess
}) => {
  const {
    medicines,
    generalNote,
    setGeneralNote,
    isSubmitting,
    handleAddMedicine,
    handleRemoveMedicine,
    handleFieldChange,
    handleTimeToggle,
    handleFileChange,
    handleRemovePhoto,
    handleSubmit,
    handleClose,
  } = useMedicationRequestPopup({ isOpen, onClose, onSubmitSuccess });

  if (!isOpen) return null;

  return (
    <S.Overlay onClick={handleClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.HeadRow>
          <S.IconBox>
            <IconMedicine size={22} color="#dc2626" />
          </S.IconBox>
          <S.TitleWrap>
            <S.Title>Dặn dò thuốc</S.Title>
            <S.Subtitle>Gửi giáo viên cho bé {studentName} · Lớp {className}</S.Subtitle>
          </S.TitleWrap>
          <S.CloseBtn onClick={handleClose} aria-label="Đóng popup">
            <IconClose size={16} />
          </S.CloseBtn>
        </S.HeadRow>

        <S.ContentForm>
          {medicines.map((med, index) => {
            const photoUrl = med.photoUrl;
            return (
              <S.MedicineCard key={med.id}>
                <S.CardHeader>
                  <S.CardBadge>
                    <IconMedicine size={12} color="var(--brand)" />
                    Thuốc {index + 1}
                  </S.CardBadge>
                  {medicines.length > 1 && (
                    <S.RemoveCardBtn type="button" onClick={() => handleRemoveMedicine(med.id)}>
                      <IconClose size={12} color="#dc2626" />
                      Xóa thuốc
                    </S.RemoveCardBtn>
                  )}
                </S.CardHeader>

                <S.CardBodyGrid>
                  {/* Image Attachment widget */}
                  <S.ImageUploadSlot onClick={() => document.getElementById(`file-input-${med.id}`)?.click()}>
                    {photoUrl ? (
                      <>
                        <S.AttachedImagePreview src={photoUrl} alt={`Ảnh thuốc ${index + 1}`} />
                        <S.ImageOverlayActions>
                          <S.RemovePhotoBtn type="button" onClick={(e) => handleRemovePhoto(med.id, e)}>
                            Xóa ảnh
                          </S.RemovePhotoBtn>
                        </S.ImageOverlayActions>
                      </>
                    ) : (
                      <>
                        <span style={{ fontSize: '18px' }}>📷</span>
                        <S.UploadSlotLabel>Đính kèm ảnh</S.UploadSlotLabel>
                      </>
                    )}
                    <input
                      type="file"
                      id={`file-input-${med.id}`}
                      style={{ display: 'none' }}
                      accept="image/*"
                      onChange={(e) => handleFileChange(med.id, e)}
                    />
                  </S.ImageUploadSlot>

                  {/* Input Fields */}
                  <S.CardFieldsWrap>
                    {/* Tên thuốc */}
                    <S.InputGroup>
                      <S.InputLabel>Tên thuốc</S.InputLabel>
                      <S.StyledInput
                        type="text"
                        placeholder="Ví dụ: Siro ho Prospan"
                        value={med.name}
                        onChange={(e) => handleFieldChange(med.id, 'name', e.target.value)}
                      />
                    </S.InputGroup>

                    {/* Dosage and Frequency side-by-side */}
                    <S.RowGrid2>
                      <S.InputGroup>
                        <S.InputLabel>Liều lượng</S.InputLabel>
                        <S.StyledInput
                          type="text"
                          placeholder="5ml / 1 viên"
                          value={med.dosage}
                          onChange={(e) => handleFieldChange(med.id, 'dosage', e.target.value)}
                        />
                      </S.InputGroup>

                      <S.InputGroup>
                        <S.InputLabel>Số lần / ngày</S.InputLabel>
                        <S.StyledInput
                          type="text"
                          placeholder="2 lần"
                          value={med.frequency}
                          onChange={(e) => handleFieldChange(med.id, 'frequency', e.target.value)}
                        />
                      </S.InputGroup>
                    </S.RowGrid2>

                    {/* Timing selection */}
                    <div>
                      <S.TimingLabel>Thời điểm uống</S.TimingLabel>
                      <S.PillsRow>
                        {TIMING_OPTIONS.map(time => (
                          <S.PillBtn
                            key={time}
                            type="button"
                            $active={med.selectedTimes.includes(time)}
                            onClick={() => handleTimeToggle(med.id, time)}
                          >
                            {time}
                          </S.PillBtn>
                        ))}
                      </S.PillsRow>
                    </div>
                  </S.CardFieldsWrap>
                </S.CardBodyGrid>
              </S.MedicineCard>
            );
          })}

          {/* Add more button */}
          <S.AddMoreBtn type="button" onClick={handleAddMedicine}>
            <IconPlus size={14} color="var(--brand)" />
            Thêm loại thuốc khác
          </S.AddMoreBtn>

          {/* General Notes for teacher */}
          <S.FormGroup>
            <S.SectionLabel>Lưu ý chung cho giáo viên (tùy chọn)</S.SectionLabel>
            <S.StyledTextarea
              placeholder="Ví dụ: Tất cả thuốc để trong ba lô, ngăn trước..."
              value={generalNote}
              onChange={(e) => setGeneralNote(e.target.value)}
            />
          </S.FormGroup>
        </S.ContentForm>

        <S.Footer>
          <S.CancelBtn type="button" onClick={handleClose} disabled={isSubmitting}>
            Hủy
          </S.CancelBtn>
          <S.SubmitBtn type="button" onClick={handleSubmit} disabled={isSubmitting}>
            <IconCheck size={16} color="#ffffff" />
            {isSubmitting ? 'Đang gửi...' : 'Gửi dặn dò'}
          </S.SubmitBtn>
        </S.Footer>
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default MedicationRequestPopup;
