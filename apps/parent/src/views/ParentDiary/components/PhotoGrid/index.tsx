import React from 'react';
import * as S from './styles';
import { Svg } from '../Svg';
import { DiaryPhoto } from '../../hooks/useParentDiary';

interface PhotoGridProps {
  photos: DiaryPhoto[];
  onZoomImage: (url: string, caption?: string) => void;
  onViewAll?: () => void;
}

export function PhotoGrid({ photos, onZoomImage, onViewAll }: PhotoGridProps) {
  const hasPhotos = photos.length > 0;

  return (
    <S.Sec>
      <S.SecHead>
        <S.SecIco style={{ background: '#F1ECFE', color: '#8B5CF6' }}>
          <Svg size={18}>
            <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
            <circle cx="8.5" cy="9.5" r="1.6" />
            <path d="m4 17 5-4.5 4 3 3-2.5 4 3.5" />
          </Svg>
        </S.SecIco>
        <S.SecTitle>Hình ảnh hôm nay của bé &amp; lớp</S.SecTitle>
        {hasPhotos && <S.SecSub>{photos.length} ảnh</S.SecSub>}
      </S.SecHead>
      {hasPhotos ? (
        <S.PhotoGrid>
          {photos.slice(0, 4).map((photo, index) => {
            const isLastItem = index === 3;
            const hasMorePhotos = photos.length > 4;
            return (
              <S.Photo
                key={photo.id}
                style={photo.url ? { cursor: 'zoom-in' } : {}}
                onClick={() => {
                  if (isLastItem && hasMorePhotos && onViewAll) {
                    onViewAll();
                  } else if (photo.url) {
                    onZoomImage(photo.url, photo.caption);
                  }
                }}
              >
                {photo.url && <img src={photo.url} alt={photo.caption} />}
                {!photo.url && (
                  <Svg size={26} sw={1.5}>
                    <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
                    <circle cx="8.5" cy="9.5" r="1.6" />
                    <path d="m4 17 5-4.5 4 3 3-2.5 4 3.5" />
                  </Svg>
                )}
                {isLastItem && hasMorePhotos && (
                  <S.PhotoOverlay>
                    +{photos.length - 3}
                  </S.PhotoOverlay>
                )}
                <S.PhotoCap>
                  <Svg size={12} sw={2}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3.5 2" />
                  </Svg>
                  {photo.time}
                </S.PhotoCap>
              </S.Photo>
            );
          })}
        </S.PhotoGrid>
      ) : (
        <S.EmptyState>
          <Svg size={28} sw={1.5}>
            <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
            <circle cx="8.5" cy="9.5" r="1.6" />
            <path d="m4 17 5-4.5 4 3 3-2.5 4 3.5" />
          </Svg>
          <S.EmptyStateTitle>Chưa cập nhật hình ảnh hôm nay</S.EmptyStateTitle>
        </S.EmptyState>
      )}
    </S.Sec>
  );
}
