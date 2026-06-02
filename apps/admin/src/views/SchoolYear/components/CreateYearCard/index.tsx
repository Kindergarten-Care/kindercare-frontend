'use client';

import React from 'react';
import {
  CreateCardContainer,
  IconWrapper,
  CreateTitle,
  CreateDescription
} from './styles';
import { PlusIcon } from '@kindercare/ui';

export interface CreateYearCardProps {
  onClick?: () => void;
}

export function CreateYearCard({ onClick }: CreateYearCardProps): React.ReactElement {
  return (
    <CreateCardContainer onClick={onClick}>
      <IconWrapper>
        <PlusIcon size={24} />
      </IconWrapper>
      <CreateTitle>Tạo Niên khóa mới</CreateTitle>
      <CreateDescription>
        Thiết lập thời gian và cơ sở dữ liệu cho năm học tiếp theo.
      </CreateDescription>
    </CreateCardContainer>
  );
}
