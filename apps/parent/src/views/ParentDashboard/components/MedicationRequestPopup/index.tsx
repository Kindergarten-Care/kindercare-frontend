'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { ResponsiveModal } from '@kindercare/ui';
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

// `value` is sent to the API as-is and must stay stable across locales; only the label is translated.
export const TIMING_OPTIONS = [
  { value: 'Sau ăn sáng', labelKey: 'medication.timingAfterBreakfast' },
  { value: 'Sau ăn trưa', labelKey: 'medication.timingAfterLunch' },
  { value: 'Trước khi ngủ', labelKey: 'medication.timingBeforeSleep' },
  { value: 'Khi cần', labelKey: 'medication.timingAsNeeded' },
] as const;

const MedicationRequestPopup: React.FC<MedicationRequestPopupProps> = ({
  isOpen,
  onClose,
  studentName,
  className,
  onSubmitSuccess
}) => {
  const t = useTranslations('Dashboard');
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

  return (
    <ResponsiveModal isOpen={isOpen} onClose={handleClose} maxWidth="580px">
        <S.HeadRow>
          <S.IconBox>
            <IconMedicine size={22} color="#dc2626" />
          </S.IconBox>
          <S.TitleWrap>
            <S.Title>{t('medication.title')}</S.Title>
            <S.Subtitle>{t('medication.subtitle', { name: studentName, className })}</S.Subtitle>
          </S.TitleWrap>
          <S.CloseBtn onClick={handleClose} aria-label={t('closePopup')}>
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
                    {t('medication.cardBadge', { number: index + 1 })}
                  </S.CardBadge>
                  {medicines.length > 1 && (
                    <S.RemoveCardBtn type="button" onClick={() => handleRemoveMedicine(med.id)}>
                      <IconClose size={12} color="#dc2626" />
                      {t('medication.removeCard')}
                    </S.RemoveCardBtn>
                  )}
                </S.CardHeader>

                <S.CardBodyGrid>
                  {/* Image Attachment widget */}
                  <S.ImageUploadSlot onClick={() => document.getElementById(`file-input-${med.id}`)?.click()}>
                    {photoUrl ? (
                      <>
                        <S.AttachedImagePreview src={photoUrl} alt={t('medication.photoAlt', { number: index + 1 })} />
                        <S.ImageOverlayActions>
                          <S.RemovePhotoBtn type="button" onClick={(e) => handleRemovePhoto(med.id, e)}>
                            {t('medication.removePhoto')}
                          </S.RemovePhotoBtn>
                        </S.ImageOverlayActions>
                      </>
                    ) : (
                      <>
                        <span style={{ fontSize: '18px' }}>📷</span>
                        <S.UploadSlotLabel>{t('medication.attachPhoto')}</S.UploadSlotLabel>
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
                      <S.InputLabel>{t('medication.nameLabel')}</S.InputLabel>
                      <S.StyledInput
                        type="text"
                        placeholder={t('medication.namePlaceholder')}
                        value={med.name}
                        onChange={(e) => handleFieldChange(med.id, 'name', e.target.value)}
                      />
                    </S.InputGroup>

                    {/* Dosage and Frequency side-by-side */}
                    <S.RowGrid2>
                      <S.InputGroup>
                        <S.InputLabel>{t('medication.dosageLabel')}</S.InputLabel>
                        <S.StyledInput
                          type="text"
                          placeholder={t('medication.dosagePlaceholder')}
                          value={med.dosage}
                          onChange={(e) => handleFieldChange(med.id, 'dosage', e.target.value)}
                        />
                      </S.InputGroup>

                      <S.InputGroup>
                        <S.InputLabel>{t('medication.frequencyLabel')}</S.InputLabel>
                        <S.StyledInput
                          type="text"
                          placeholder={t('medication.frequencyPlaceholder')}
                          value={med.frequency}
                          onChange={(e) => handleFieldChange(med.id, 'frequency', e.target.value)}
                        />
                      </S.InputGroup>
                    </S.RowGrid2>

                    {/* Timing selection */}
                    <div>
                      <S.TimingLabel>{t('medication.timingLabel')}</S.TimingLabel>
                      <S.PillsRow>
                        {TIMING_OPTIONS.map(time => (
                          <S.PillBtn
                            key={time.value}
                            type="button"
                            $active={med.selectedTimes.includes(time.value)}
                            onClick={() => handleTimeToggle(med.id, time.value)}
                          >
                            {t(time.labelKey)}
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
            {t('medication.addMore')}
          </S.AddMoreBtn>

          {/* General Notes for teacher */}
          <S.FormGroup>
            <S.SectionLabel>{t('medication.generalNoteLabel')}</S.SectionLabel>
            <S.StyledTextarea
              placeholder={t('medication.generalNotePlaceholder')}
              value={generalNote}
              onChange={(e) => setGeneralNote(e.target.value)}
            />
          </S.FormGroup>
        </S.ContentForm>

        <S.Footer>
          <S.CancelBtn type="button" onClick={handleClose} disabled={isSubmitting}>
            {t('cancel')}
          </S.CancelBtn>
          <S.SubmitBtn type="button" onClick={handleSubmit} disabled={isSubmitting}>
            <IconCheck size={16} color="#ffffff" />
            {isSubmitting ? t('submitting') : t('medication.submit')}
          </S.SubmitBtn>
        </S.Footer>
    </ResponsiveModal>
  );
};

export default MedicationRequestPopup;
