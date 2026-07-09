'use client';

import React from 'react';
import { ResponsiveModal } from '@kindercare/ui';
import { NewsfeedDomainModel } from '@/config/types/newsfeed';
import { getLastNameInitial } from '@/utils/formatName';
import { IconClose } from '@/assets/icons/dashboard';
import * as S from '../../styles';
import * as P from './styles';

interface NewsfeedPopupProps {
  isOpen: boolean;
  onClose: () => void;
  newsfeeds: NewsfeedDomainModel[];
  onZoomImage: (url: string) => void;
}

export function NewsfeedPopup({ isOpen, onClose, newsfeeds, onZoomImage }: NewsfeedPopupProps) {
  const formatTime = (ts: bigint) => {
    const d = new Date(Number(ts) * 1000);
    const time = d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const date = d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    return `${time} · ${date}`;
  };

  return (
    <ResponsiveModal isOpen={isOpen} onClose={onClose} maxWidth="680px" mobileMaxHeight="85vh">
        <P.Header>
          <P.Title>Bảng tin lớp học</P.Title>
          <P.CloseBtn onClick={onClose} aria-label="Đóng">
            <IconClose size={14} />
          </P.CloseBtn>
        </P.Header>
        <P.ScrollArea>
          {newsfeeds.map((post) => {
            const initial = getLastNameInitial(post.teacherName);
            return (
              <S.Post key={post.postId} style={{ width: '100%', maxWidth: '480px' }}>
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
          })}
        </P.ScrollArea>
    </ResponsiveModal>
  );
}
