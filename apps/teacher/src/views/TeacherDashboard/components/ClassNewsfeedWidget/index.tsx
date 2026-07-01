import React, { useState } from 'react';
import * as S from './styles';
import { useNewsfeeds } from '@/hooks/useTeacherQueries';

interface ClassNewsfeedWidgetProps {
  classId: number | string | null;
}

export const ClassNewsfeedWidget: React.FC<ClassNewsfeedWidgetProps> = ({ classId }) => {
  const { data: newsfeeds, isLoading, isError, error } = useNewsfeeds(classId || undefined);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const formatTime = (timestampRaw: string | number) => {
    let d: Date;
    if (typeof timestampRaw === 'number') {
      // Phân biệt giây và mili-giây
      d = new Date(timestampRaw > 10000000000 ? timestampRaw : timestampRaw * 1000);
    } else {
      d = new Date(timestampRaw);
    }

    if (isNaN(d.getTime())) return 'Không rõ thời gian';

    const now = new Date();
    const diff = now.getTime() - d.getTime();
    
    if (diff < 60000) return 'Vừa xong';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} phút trước`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} giờ trước`;
    
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
      ) : isError ? (
        <S.EmptyState style={{ color: 'red' }}>
          ❌ Lỗi kết nối Máy chủ: {(error as any)?.response?.data?.message || (error as Error)?.message || 'Không thể tải lịch sử'}
        </S.EmptyState>
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
          {newsfeeds.map((feed: any) => {
            const postId = feed.PostID || feed.postId || feed.id;
            const teacherName = feed.TeacherName || feed.teacherName || feed.teacher_name || 'Giáo viên';
            const teacherAvatar = feed.TeacherAvatar || feed.teacherAvatar || feed.teacher_avatar || feed.avatarUrl || 'https://ui-avatars.com/api/?name=' + teacherName.charAt(0);
            const postedAt = feed.PostedAt || feed.postedAt || feed.created_at || feed.createdAt;
            const content = feed.Content || feed.content;
            const mediaUrl = feed.MediaURL || feed.mediaUrl || feed.media_url;

            return (
              <S.FeedItem key={postId}>
                <S.FeedHeader>
                  <S.TeacherAvatar src={teacherAvatar} alt="Teacher" />
                  <S.HeaderInfo>
                    <S.TeacherName>{teacherName}</S.TeacherName>
                    <S.PostTime>{formatTime(postedAt)}</S.PostTime>
                  </S.HeaderInfo>
                </S.FeedHeader>
                
                <S.FeedContent>{content}</S.FeedContent>
                
                {mediaUrl && (
                  <S.FeedImage 
                    src={mediaUrl} 
                    alt="Đính kèm" 
                    onClick={() => setLightboxImage(mediaUrl)}
                  />
                )}
              </S.FeedItem>
            );
          })}
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
