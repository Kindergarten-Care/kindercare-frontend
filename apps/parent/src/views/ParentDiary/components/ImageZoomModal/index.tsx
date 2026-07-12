'use client';

import React, { useEffect } from 'react';
import * as S from './styles';
import { IconClose } from '@/assets/icons/dashboard';

interface ImageZoomModalProps {
  imageUrl: string | null;
  caption?: string | null;
  onClose: () => void;
}

export function ImageZoomModal({ imageUrl, caption, onClose }: ImageZoomModalProps) {
  useEffect(() => {
    if (imageUrl) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [imageUrl]);

  if (!imageUrl) return null;

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!imageUrl) return;

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const filename = imageUrl.split('/').pop()?.split('?')[0] || 'kindercare_image.jpg';
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed, falling back to new tab:', error);
      window.open(imageUrl, '_blank');
    }
  };

  return (
    <S.Overlay onClick={onClose}>
      <S.ImageWrapper onClick={(e) => e.stopPropagation()}>
        <S.DownloadLink
          href={imageUrl}
          onClick={handleDownload}
          title="Tải ảnh về máy"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </S.DownloadLink>
        <S.CloseBtn onClick={onClose} aria-label="Đóng">
          <IconClose size={16} />
        </S.CloseBtn>
        <S.ZoomedImage src={imageUrl} alt={caption || 'Xem ảnh lớn'} />
        {caption && <S.Caption>{caption}</S.Caption>}
      </S.ImageWrapper>
    </S.Overlay>
  );
}
