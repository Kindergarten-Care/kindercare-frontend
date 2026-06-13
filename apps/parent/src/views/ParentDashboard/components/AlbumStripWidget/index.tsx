'use client';

import React, { useState, useEffect, useCallback } from 'react';
import * as S from './styles';
import { AlbumPhoto } from '@/config/types/dashboard';
import { IconPhoto, IconZoom, IconClose, IconChevronLeft, IconChevronRight, IconDownload } from '@/assets/icons/dashboard';

interface AlbumStripWidgetProps {
  photos: AlbumPhoto[];
}

const AlbumStripWidget: React.FC<AlbumStripWidgetProps> = ({ photos }) => {
  const [galleryOpen, setGalleryOpen] = useState<boolean>(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const openLightbox = (idx: number): void => setLightboxIdx(idx);
  const closeLightbox = (): void => setLightboxIdx(null);

  const prevPhoto = useCallback((): void => {
    setLightboxIdx(prev => (prev === null ? 0 : (prev - 1 + photos.length) % photos.length));
  }, [photos.length]);

  const nextPhoto = useCallback((): void => {
    setLightboxIdx(prev => (prev === null ? 0 : (prev + 1) % photos.length));
  }, [photos.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent): void => {
      if (lightboxIdx === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'ArrowRight') nextPhoto();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIdx, prevPhoto, nextPhoto]);

  const currentPhoto = lightboxIdx !== null ? photos[lightboxIdx] : null;

  return (
    <>
      <S.Card>
        <S.Head>
          <S.HeadIco><IconPhoto size={18} color="#005A36" /></S.HeadIco>
          <S.HeadInfo>
            <S.HeadTitle>
              Album hôm nay
              <S.PhotoCount><IconPhoto size={13} /> {photos.length} ảnh mới</S.PhotoCount>
            </S.HeadTitle>
            <S.HeadSub>Cô giáo vừa tải lên · Cập nhật lúc 14:32</S.HeadSub>
          </S.HeadInfo>
          <S.ViewAllBtn onClick={() => setGalleryOpen(true)}>
            Xem tất cả →
          </S.ViewAllBtn>
        </S.Head>

        <S.Rail>
          {photos.map((photo, idx) => (
            <S.Photo
              key={photo.id}
              $bg={photo.color}
              onClick={() => openLightbox(idx)}
              title={photo.caption}
            >
              <S.PhotoIco>{photo.icon}</S.PhotoIco>
              <S.TimePill>{photo.time}</S.TimePill>
              <S.ZoomIcon className="zoom"><IconZoom size={16} color="#fff" /></S.ZoomIcon>
            </S.Photo>
          ))}
          <S.MoreTile onClick={() => setGalleryOpen(true)}>
            <IconPhoto size={22} color="#6b7280" />
            Xem tất cả
          </S.MoreTile>
        </S.Rail>
      </S.Card>

      {galleryOpen && (
        <S.Overlay onClick={() => setGalleryOpen(false)}>
          <S.GalleryModal onClick={e => e.stopPropagation()}>
            <S.GalleryHead>
              <S.GalleryHeadInfo>
                <S.GalleryTitle><IconPhoto size={16} /> Album hôm nay — {new Date().toLocaleDateString('vi-VN')}</S.GalleryTitle>
                <S.GallerySubtitle>{photos.length} ảnh · Lớp Hoa Hướng Dương</S.GallerySubtitle>
              </S.GalleryHeadInfo>
              <S.ModalCloseBtn onClick={() => setGalleryOpen(false)}>
                <IconClose size={16} />
              </S.ModalCloseBtn>
            </S.GalleryHead>
            <S.GalleryGrid>
              {photos.map((photo, idx) => (
                <S.GalleryPhoto
                  key={photo.id}
                  $bg={photo.color}
                  onClick={() => { setGalleryOpen(false); openLightbox(idx); }}
                >
                  <div style={{ fontSize: 40 }}>{photo.icon}</div>
                  <S.TimePill>{photo.time} — {photo.caption}</S.TimePill>
                </S.GalleryPhoto>
              ))}
            </S.GalleryGrid>
          </S.GalleryModal>
        </S.Overlay>
      )}

      {lightboxIdx !== null && currentPhoto && (
        <S.LightboxOverlay onClick={closeLightbox}>
          <S.Lightbox onClick={e => e.stopPropagation()}>
            <S.LbClose onClick={closeLightbox}><IconClose size={16} /></S.LbClose>
            <S.LbArrow $side="left" onClick={prevPhoto}><IconChevronLeft size={22} /></S.LbArrow>
            <S.LbPhoto $bg={currentPhoto.color}>{currentPhoto.icon}</S.LbPhoto>
            <S.LbArrow $side="right" onClick={nextPhoto}><IconChevronRight size={22} /></S.LbArrow>
            <S.LbFoot>
              <div>
                <S.LbCaption>{currentPhoto.caption}</S.LbCaption>
                <S.LbMeta>Lớp Hoa Hướng Dương · {currentPhoto.time} hôm nay</S.LbMeta>
              </div>
              <S.LbActions>
                <S.LbDots>{lightboxIdx + 1}/{photos.length}</S.LbDots>
                <S.LbDownload onClick={() => alert('Đã tải ảnh!')}>
                  <IconDownload size={14} /> Tải về
                </S.LbDownload>
              </S.LbActions>
            </S.LbFoot>
          </S.Lightbox>
        </S.LightboxOverlay>
      )}
    </>
  );
};

export default AlbumStripWidget;
