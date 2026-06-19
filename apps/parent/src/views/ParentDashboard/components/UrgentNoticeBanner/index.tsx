'use client';

import React, { useState } from 'react';
import * as S from './styles';
import { UrgentNotice } from '@/config/types/dashboard';
import { IconAlert, IconClose } from '@/assets/icons/dashboard';

interface UrgentNoticeBannerProps {
  notices: UrgentNotice[];
}

const SEV_LABEL: Record<string, string> = {
  urgent: 'Khẩn cấp',
  important: 'Quan trọng',
  info: 'Thông báo',
};

const UrgentNoticeBanner: React.FC<UrgentNoticeBannerProps> = ({ notices }) => {
  const [dismissed, setDismissed] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  if (dismissed || notices.length === 0) return null;

  const doubled = [...notices, ...notices];

  return (
    <>
      <S.Banner>
        <S.Tag>
          <S.PulseDot />
          KHẨN
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
          {notices.length} thông báo
        </S.AllBtn>
        <S.CloseBtn onClick={() => setDismissed(true)}>
          <IconClose size={14} />
        </S.CloseBtn>
      </S.Banner>

      {modalOpen && (
        <S.Overlay onClick={() => setModalOpen(false)}>
          <S.Modal onClick={e => e.stopPropagation()}>
            <S.ModalHead>
              <S.ModalTitle><IconAlert size={18} /> Thông báo khẩn</S.ModalTitle>
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
          </S.Modal>
        </S.Overlay>
      )}
    </>
  );
};

export default UrgentNoticeBanner;
