'use client';

import React from 'react';
import styled from 'styled-components';
import { getInitials } from '@/views/AccountList/utils/getInitials';

const Wrapper = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AvatarText = styled.span<{ $size: number }>`
  font-weight: 600;
  color: #4b5563;
  font-size: ${({ $size }) => Math.max($size * 0.4, 10)}px;
`;

const AvatarImgRounded = styled.img<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  object-fit: cover;
`;

interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: number;
}

export default function Avatar({ src, name = '', size = 40 }: AvatarProps) {
  if (src) {
    return <AvatarImgRounded src={src} alt={name} $size={size} />;
  }
  return (
    <Wrapper $size={size}>
      <AvatarText $size={size}>{getInitials(name)}</AvatarText>
    </Wrapper>
  );
}
