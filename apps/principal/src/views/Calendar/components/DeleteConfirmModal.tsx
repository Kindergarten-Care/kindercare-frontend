'use client';

import React, { useState } from 'react';
import { kcToast } from '@kindercare/ui';
import {
  Modal, ModalHeader, ModalBody, KmCallout, KmFoot, KmBtn, KmErrorText, TrashIcon, AlertTriangleIcon,
} from '@/components/Modal';

interface DeleteConfirmModalProps {
  title: string;
  description: string;
  consequence: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export default function DeleteConfirmModal({ title, description, consequence, onClose, onConfirm }: DeleteConfirmModalProps) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    try {
      setDeleting(true);
      setError(null);
      await onConfirm();
      onClose();
    } catch (err: any) {
      const message = err.message || 'Có lỗi xảy ra, vui lòng thử lại';
      setError(message);
      kcToast.error(message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Modal size="sm" closeOnOverlayClick={false}>
      <ModalHeader icon={<TrashIcon />} iconVariant="red" title={title} subtitle={description} />

      <ModalBody>
        {error && <KmErrorText style={{ marginBottom: 12 }}>{error}</KmErrorText>}
        <KmCallout $variant="red">
          <AlertTriangleIcon />
          <span>{consequence}</span>
        </KmCallout>
      </ModalBody>

      <KmFoot $tight>
        <KmBtn type="button" $variant="ghost" onClick={onClose} disabled={deleting}>Hủy</KmBtn>
        <KmBtn type="button" $variant="danger" onClick={handleConfirm} disabled={deleting}>
          {deleting ? 'Đang xóa...' : 'Xóa'}
        </KmBtn>
      </KmFoot>
    </Modal>
  );
}
