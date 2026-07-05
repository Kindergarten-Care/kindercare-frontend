'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ResponsiveModal } from '@kindercare/ui';
import * as S from './styles';
import { UrgentNotice } from '@/config/types/dashboard';
import { IconAlert, IconClose } from '@/assets/icons/dashboard';

interface UrgentNoticeBannerProps {
  notices: UrgentNotice[];
}

const UrgentNoticeBanner: React.FC<UrgentNoticeBannerProps> = ({ notices }) => {
  const t = useTranslations('Dashboard');
  const [dismissed, setDismissed] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const SEV_LABEL: Record<string, string> = {
    urgent: t('notices.severityUrgent'),
    important: t('notices.severityImportant'),
    info: t('notices.severityInfo'),
  };

  if (dismissed || notices.length === 0) return null;

  const doubled = [...notices, ...notices];

  return (
    <>
      <S.Banner>
        <S.Tag>
          <S.PulseDot />
          {t('notices.bannerTag')}
        </S.Tag>

        <S.Track>
          <S.Marquee>
            {doubled.map((n, i) => (
              <S.Item key={`${n.id}-${i}`}>
                <span>{n.icon}</span>
                {n.title}
              </S.Item>
            ))}
          </S.Marquee>
        </S.Track>

        <S.AllBtn onClick={() => setModalOpen(true)}>
          {t('notices.countLabel', { count: notices.length })}
        </S.AllBtn>
        <S.CloseBtn onClick={() => setDismissed(true)}>
          <IconClose size={14} />
        </S.CloseBtn>
      </S.Banner>

      <ResponsiveModal isOpen={modalOpen} onClose={() => setModalOpen(false)} maxWidth="560px" mobileMaxHeight="88vh">
          <S.ModalHead>
            <S.ModalTitle><IconAlert size={18} /> {t('notices.modalTitle')}</S.ModalTitle>
            <S.CloseBtn onClick={() => setModalOpen(false)} style={{ background: '#f3f4f6', color: '#374151' }}>
              <IconClose size={14} />
            </S.CloseBtn>
          </S.ModalHead>
          <S.ModalBody>
            {notices.map(n => (
              <S.NoticeRow key={n.id} $severity={n.severity}>
                <S.NoticeIco $severity={n.severity}>{n.icon}</S.NoticeIco>
                <S.NoticeContent>
                  <S.NoticeTop>
                    <S.NoticeSev $severity={n.severity}>{SEV_LABEL[n.severity]}</S.NoticeSev>
                    <S.NoticeWhen>{n.date}</S.NoticeWhen>
                  </S.NoticeTop>
                  <S.NoticeTitle>{n.title}</S.NoticeTitle>
                  <S.NoticeDetail>{n.detail}</S.NoticeDetail>
                </S.NoticeContent>
              </S.NoticeRow>
            ))}
          </S.ModalBody>
      </ResponsiveModal>
    </>
  );
};

export default UrgentNoticeBanner;
