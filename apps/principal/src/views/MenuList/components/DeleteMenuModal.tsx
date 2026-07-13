'use client';

import React, { useState } from 'react';
import { kcToast } from '@kindercare/ui';
import {
  Modal, ModalHeader, ModalBody, KmCallout, KmFoot, KmBtn, KmErrorText, TrashIcon, AlertTriangleIcon,
} from '@/components/Modal';

interface DeleteMenuModalProps {
  menuName: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export default function DeleteMenuModal({ menuName, onClose, onConfirm }: DeleteMenuModalProps) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    try {
      setDeleting(true);
      setError(null);
      await onConfirm();
      onClose();
      kcToast.success('Đã xóa thực đơn thành công');
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
      <ModalHeader icon={<TrashIcon />} iconVariant="red" title="Xóa thực đơn?" subtitle={`"${menuName}" — thao tác không thể hoàn tác.`} />

      <ModalBody>
        {error && <KmErrorText style={{ marginBottom: 12 }}>{error}</KmErrorText>}
        <KmCallout $variant="amber">
          <AlertTriangleIcon />
          <span>Toàn bộ chi tiết món ăn trong thực đơn này sẽ bị xóa theo. Muốn <b>thay thế</b> thực đơn: xóa bản cũ trước, sau đó import file mới cho cùng lớp/tuần/năm.</span>
        </KmCallout>
      </ModalBody>

      <KmFoot $tight>
        <KmBtn type="button" $variant="ghost" onClick={onClose} disabled={deleting}>Hủy</KmBtn>
        <KmBtn type="button" $variant="danger" onClick={handleConfirm} disabled={deleting}>
          {deleting ? 'Đang xóa...' : 'Xóa thực đơn'}
        </KmBtn>
      </KmFoot>
    </Modal>
  );
}
