import React, { useState } from 'react';
import * as S from './styles';
import { useNewsfeeds } from '@/hooks/useTeacherQueries';

interface ClassNewsfeedWidgetProps {
  classId: number | string | null;
}

export const ClassNewsfeedWidget: React.FC<ClassNewsfeedWidgetProps> = ({ classId }) => {
  const { data: newsfeeds, isLoading } = useNewsfeeds(classId || undefined);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const formatTime = (timestampSeconds: number) => {
    const d = new Date(timestampSeconds * 1000);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    
    // Nếu dưới 60 giây
    if (diff < 60000) return 'Vừa xong';
    // Nếu dưới 60 phút
    if (diff < 3600000) return `${Math.floor(diff / 60000)} phút trước`;
    // Nếu dưới 24h
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} giờ trước`;
    
    // Nếu hơn 24h thì hiện ngày tháng
    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <S.WidgetContainer>
      <S.WidgetHeader>
        <S.WidgetTitle>
          <span>📸</span> Nhật ký lớp học
        </S.WidgetTitle>
      </S.WidgetHeader>

      {isLoading ? (
        <S.EmptyState>Đang tải nhật ký...</S.EmptyState>
      ) : !newsfeeds || newsfeeds.length === 0 ? (
        <S.EmptyState>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
          Chưa có bài đăng nào trong lớp.
        </S.EmptyState>
      ) : (
        <S.FeedList>
          {newsfeeds.map((feed: any) => (
            <S.FeedItem key={feed.postId}>
              <S.FeedHeader>
                <S.TeacherAvatar src={feed.teacherAvatar || 'https://ui-avatars.com/api/?name=' + (feed.teacherName || 'G')} alt="Teacher" />
                <S.HeaderInfo>
                  <S.TeacherName>{feed.teacherName || 'Giáo viên'}</S.TeacherName>
                  <S.PostTime>{formatTime(feed.postedAt)}</S.PostTime>
                </S.HeaderInfo>
              </S.FeedHeader>
              
              <S.FeedContent>{feed.content}</S.FeedContent>
              
              {feed.mediaUrl && (
                <S.FeedImage 
                  src={feed.mediaUrl} 
                  alt="Đính kèm" 
                  onClick={() => setLightboxImage(feed.mediaUrl)}
                />
              )}
            </S.FeedItem>
          ))}
        </S.FeedList>
      )}

      {/* Lightbox cho xem ảnh lớn */}
      <S.LightboxOverlay $active={!!lightboxImage} onClick={() => setLightboxImage(null)}>
        <S.LightboxContent onClick={(e) => e.stopPropagation()}>
          <S.LightboxCloseBtn onClick={() => setLightboxImage(null)}>✕</S.LightboxCloseBtn>
          {lightboxImage && <S.LightboxImage src={lightboxImage} alt="Preview" />}
        </S.LightboxContent>
      </S.LightboxOverlay>

    </S.WidgetContainer>
  );
};
