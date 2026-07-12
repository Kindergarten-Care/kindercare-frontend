'use client';

import React from 'react';
import {
  KmOverlay, KmModal, KmHead, KmIco, KmHText, KmTitle, KmSubtitle, KmClose, KmBody,
} from './styles';
import { CloseIcon } from './icons';

export * from './styles';
export * from './icons';

interface ModalProps {
  size?: 'sm' | 'md' | 'lg';
  onClose?: () => void;
  closeOnOverlayClick?: boolean;
  children: React.ReactNode;
}

/**
 * Overlay + modal shell theo KinderCare Popup Design System.
 * onClose omitted => click overlay không đóng (dùng cho dialog hành động nguy hiểm bắt buộc chọn rõ).
 */
export function Modal({ size = 'md', onClose, closeOnOverlayClick = true, children }: ModalProps) {
  return (
    <KmOverlay onClick={() => closeOnOverlayClick && onClose?.()}>
      <KmModal $size={size} onClick={e => e.stopPropagation()}>
        {children}
      </KmModal>
    </KmOverlay>
  );
}

interface ModalHeaderProps {
  icon?: React.ReactNode;
  iconVariant?: 'brand' | 'red' | 'amber' | 'blue';
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  onClose?: () => void;
}

/** Header chuẩn: icon tile + title/subtitle + nút X (bỏ onClose để ẩn nút X — dùng cho dialog nguy hiểm). */
export function ModalHeader({ icon, iconVariant = 'brand', title, subtitle, onClose }: ModalHeaderProps) {
  return (
    <KmHead>
      {icon && <KmIco $variant={iconVariant}>{icon}</KmIco>}
      <KmHText>
        <KmTitle>{title}</KmTitle>
        {subtitle && <KmSubtitle>{subtitle}</KmSubtitle>}
      </KmHText>
      {onClose && (
        <KmClose onClick={onClose} type="button" aria-label="Đóng">
          <CloseIcon />
        </KmClose>
      )}
    </KmHead>
  );
}

export { KmBody as ModalBody };
