import React, { useState } from 'react';
import styled from 'styled-components';

/**
 * Avatar học sinh — render <img> với fallback initial.
 *
 * Props:
 *   - src: URL ảnh (full hoặc relative — nên chạy qua fixImageUrl() trước).
 *   - name: tên học sinh (dùng để sinh initial khi không có ảnh / load lỗi).
 *   - size: pixel (vuông). Mặc định 32.
 *   - accent: màu nền khi fallback (mặc định #E2E8F0).
 *
 * Behaviour:
 *   - Có src + load OK → hiển thị ảnh.
 *   - Có src + load lỗi → fallback về initial (gradient background).
 *   - Không có src → hiển thị initial luôn.
 */
export interface StudentAvatarProps {
  src?: string | null;
  name?: string;
  size?: number;
  accent?: string;
  className?: string;
}

function initials(name?: string): string {
  if (!name) return '?';
  return name
    .split(' ')
    .map(s => s[0])
    .filter(Boolean)
    .slice(-2)
    .join('')
    .toUpperCase();
}

const Wrap = styled.span<{ $size: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${p => p.$size}px;
  height: ${p => p.$size}px;
  border-radius: 50%;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;
  background: #E2E8F0;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const Initial = styled.span<{ $size: number }>`
  font-weight: 700;
  color: #475569;
  font-size: ${p => Math.max(11, Math.round(p.$size * 0.4))}px;
  user-select: none;
`;

export const StudentAvatar: React.FC<StudentAvatarProps> = ({
  src,
  name,
  size = 32,
  className,
}) => {
  const [errored, setErrored] = useState(false);
  const showImage = Boolean(src) && !errored;

  return (
    <Wrap $size={size} className={className} aria-label={name ? `Avatar của ${name}` : 'Avatar'}>
      {showImage ? (
        <Img
          src={src as string}
          alt={name || 'student avatar'}
          onError={() => setErrored(true)}
          loading="lazy"
        />
      ) : (
        <Initial $size={size}>{initials(name)}</Initial>
      )}
    </Wrap>
  );
};
