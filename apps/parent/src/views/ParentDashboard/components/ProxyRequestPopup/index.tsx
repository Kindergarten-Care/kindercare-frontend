'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { ResponsiveModal } from '@kindercare/ui';
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
  const t = useTranslations('Dashboard');

  return (
    <ResponsiveModal isOpen={isOpen} onClose={onClose} maxWidth="520px">
        <S.HeadRow>
          <S.IconBox>
            <IconProfile size={22} color="#0d9488" />
          </S.IconBox>
          <S.TitleWrap>
            <S.Title>{t('proxy.title')}</S.Title>
            <S.Subtitle>{t('proxy.subtitle', { name: studentName, className })}</S.Subtitle>
          </S.TitleWrap>
          <S.CloseBtn onClick={onClose} aria-label={t('closePopup')}>
            <IconClose size={16} />
          </S.CloseBtn>
        </S.HeadRow>

        <S.ContentForm>
          {/* Authorization Date Selection */}
          <S.FormGroup>
            <S.FieldLabel>{t('proxy.dateLabel')}</S.FieldLabel>
            <S.StyledInput
              type="date"
              min={todayStr}
              value={authorizationDate}
              onChange={(e) => setAuthorizationDate(e.target.value)}
            />
          </S.FormGroup>

          {/* Authorization Type Selection */}
          <S.FormGroup>
            <S.FieldLabel>{t('proxy.typeLabel')}</S.FieldLabel>
            <S.ChipGrid>
              <S.ReasonChip
                type="button"
                $active={type === 'checkin'}
                onClick={() => setType('checkin')}
              >
                {t('proxy.typeCheckin')}
              </S.ReasonChip>
              <S.ReasonChip
                type="button"
                $active={type === 'checkout'}
                onClick={() => setType('checkout')}
              >
                {t('proxy.typeCheckout')}
              </S.ReasonChip>
              <S.ReasonChip
                type="button"
                $active={type === 'both'}
                onClick={() => setType('both')}
              >
                {t('proxy.typeBoth')}
              </S.ReasonChip>
            </S.ChipGrid>
          </S.FormGroup>

          {/* Proxy Name */}
          <S.FormGroup>
            <S.FieldLabel>{t('proxy.nameLabel')}</S.FieldLabel>
            <S.StyledInput
              type="text"
              placeholder={t('proxy.namePlaceholder')}
              value={proxyName}
              onChange={(e) => setProxyName(e.target.value)}
            />
          </S.FormGroup>

          {/* Phone & ID Card grid */}
          <S.DateGrid>
            <div>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, display: 'block', marginBottom: '4px' }}>{t('proxy.phoneLabel')}</span>
              <S.StyledInput
                type="tel"
                placeholder={t('proxy.phonePlaceholder')}
                value={proxyPhone}
                onChange={(e) => setProxyPhone(e.target.value)}
              />
            </div>
            <div>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, display: 'block', marginBottom: '4px' }}>{t('proxy.idCardLabel')}</span>
              <S.StyledInput
                type="text"
                placeholder={t('proxy.idCardPlaceholder')}
                value={proxyIDCard}
                onChange={(e) => setProxyIDCard(e.target.value)}
              />
            </div>
          </S.DateGrid>

          {/* Notes */}
          <S.FormGroup style={{ marginTop: '16px' }}>
            <S.FieldLabel>{t('proxy.noteLabel')}</S.FieldLabel>
            <S.StyledTextarea
              placeholder={t('proxy.notePlaceholder')}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </S.FormGroup>

          {/* Portrait Photo Upload */}
          <S.FormGroup>
            <S.FieldLabel>{t('proxy.photoLabel')}</S.FieldLabel>
            {attachedFile ? (
              <S.AttachedFileBar>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, marginRight: '8px' }}>
                  {t('proxy.attachedFileInfo', { fileName: attachedFile.name, sizeKb: (attachedFile.size / 1024).toFixed(1) })}
                </span>
                <S.RemoveFileBtn type="button" onClick={handleRemoveFile} title={t('leave.removeAttachment')}>
                  <IconClose size={14} color="#dc2626" />
                </S.RemoveFileBtn>
              </S.AttachedFileBar>
            ) : (
              <S.AttachmentArea onClick={handleTriggerUpload}>
                <S.AttachmentLabel>
                  <span style={{ fontSize: '20px' }}>📷</span>
                  <span>{t('proxy.uploadPrompt')}</span>
                  <span>{t('proxy.uploadHint')}</span>
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
            {t('cancel')}
          </S.CancelBtn>
          <S.SubmitBtn type="button" onClick={handleSubmit} disabled={isSubmitting} style={{ backgroundColor: '#0d9488' }}>
            <IconCheck size={16} color="#ffffff" />
            {isSubmitting ? t('submitting') : t('proxy.submit')}
          </S.SubmitBtn>
        </S.Footer>
    </ResponsiveModal>
  );
};

export default ProxyRequestPopup;
