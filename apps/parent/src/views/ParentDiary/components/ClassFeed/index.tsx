'use client';

import React from 'react';
import * as S from './styles';
import { Svg } from '../Svg';
import { NewsfeedDomainModel } from '@/config/types/newsfeed';
import { getLastNameInitial } from '@/utils/formatName';

interface ClassFeedProps {
  newsfeeds: NewsfeedDomainModel[];
  onViewAll: () => void;
  onZoomImage: (url: string) => void;
}

export function ClassFeed({ newsfeeds, onViewAll, onZoomImage }: ClassFeedProps) {
  const formatTime = (ts: bigint) => {
    const d = new Date(Number(ts) * 1000);
    const time = d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const date = d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    return `${time} · ${date}`;
  };

  const getLatestUpdatedText = () => {
    if (newsfeeds.length === 0) return 'Mới cập nhật';
    const latestPost = newsfeeds[0];
    const diff = Math.floor(Date.now() / 1000) - Number(latestPost.postedAt);

    if (diff < 60) return 'Vừa xong';
    if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
    return `${Math.floor(diff / 86400)} ngày trước`;
  };

  // Limit display to at most 3 items
  const displayPosts = newsfeeds.slice(0, 3);
  const showViewAll = newsfeeds.length > 3;

  return (
    <S.ColLeft>
      <S.SecHead style={{ marginBottom: 12 }}>
        <S.SecIco>
          <Svg size={18}>
            <rect x="3" y="4" width="18" height="16" rx="2.5" />
            <path d="M7 8h10M7 12h10M7 16h6" />
          </Svg>
        </S.SecIco>
        <S.SecTitle>Bảng tin của lớp</S.SecTitle>
        <S.SecSub>{getLatestUpdatedText()}</S.SecSub>
      </S.SecHead>
      <S.Feed>
        {newsfeeds.length === 0 ? (
          <div style={{ padding: '24px', textAlign: 'center', color: 'var(--muted)', background: '#fff', borderRadius: '16px', border: '1px solid var(--border)' }}>
            Chưa có bản tin nào từ lớp học
          </div>
        ) : (
          displayPosts.map((post) => {
            const initial = getLastNameInitial(post.teacherName);
            return (
              <S.Post key={post.postId}>
                <S.PostHead>
                  {post.teacherAvatarUrl ? (
                    <S.PostAvatar style={{ background: 'none' }}>
                      <img
                        src={post.teacherAvatarUrl}
                        alt={post.teacherName}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
                      />
                    </S.PostAvatar>
                  ) : (
                    <S.PostAvatar>{initial}</S.PostAvatar>
                  )}
                  <div>
                    <S.PostAuthor>{post.teacherName}</S.PostAuthor>
                    <S.PostMeta>Giáo viên · {formatTime(post.postedAt)}</S.PostMeta>
                  </div>
                  <S.PostPill>Hoạt động</S.PostPill>
                </S.PostHead>
                <S.PostBody>{post.content}</S.PostBody>
                {post.mediaUrl && (
                  <S.PostImg style={{ height: 'auto', background: '#f8fafc', cursor: 'zoom-in' }} onClick={() => post.mediaUrl && onZoomImage(post.mediaUrl)}>
                    <img
                      src={post.mediaUrl}
                      alt="Bản tin lớp học"
                      style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '350px', objectFit: 'contain' }}
                    />
                  </S.PostImg>
                )}
              </S.Post>
            );
          })
        )}
      </S.Feed>

      {showViewAll && (
        <S.ViewAllButton onClick={onViewAll}>
          Xem tất cả ({newsfeeds.length})
          <Svg size={14} sw={2.5}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </Svg>
        </S.ViewAllButton>
      )}
    </S.ColLeft>
  );
}
