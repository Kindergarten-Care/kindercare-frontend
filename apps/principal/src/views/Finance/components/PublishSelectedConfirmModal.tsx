'use client';

import React, { useState } from 'react';
import { kcToast } from '@kindercare/ui';
import {
  Modal, ModalHeader, ModalBody, KmCallout, KmFoot, KmBtn, KmErrorText, CreditCardIcon, AlertTriangleIcon,
} from '@/components/Modal';

interface PublishSelectedConfirmModalProps {
  count: number;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export default function PublishSelectedConfirmModal({ count, onClose, onConfirm }: PublishSelectedConfirmModalProps) {
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    try {
      setPublishing(true);
      setError(null);
      await onConfirm();
      onClose();
      kcToast.success(`Đã công khai ${count} hóa đơn`);
    } catch (err: any) {
      const message = err.message || 'Có lỗi xảy ra, vui lòng thử lại';
      setError(message);
      kcToast.error(message);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <Modal size="sm" closeOnOverlayClick={false}>
      <ModalHeader
        icon={<CreditCardIcon />}
        iconVariant="amber"
        title={`Xác nhận công khai ${count} hóa đơn đã chọn?`}
      />

      <ModalBody>
        {error && <KmErrorText style={{ marginBottom: 12 }}>{error}</KmErrorText>}
        <KmCallout $variant="amber">
          <AlertTriangleIcon />
          <span>
            Sau khi công khai: phụ huynh sẽ thấy và có thể thanh toán ngay, hạn đóng được tính là <b>10 ngày</b> kể từ bây giờ.
            Thao tác này <b>không thể hoàn tác</b>. Các hóa đơn chưa chọn sẽ không bị ảnh hưởng.
          </span>
        </KmCallout>
      </ModalBody>

      <KmFoot $tight>
        <KmBtn type="button" $variant="ghost" onClick={onClose} disabled={publishing}>Hủy</KmBtn>
        <KmBtn type="button" $variant="brand" onClick={handleConfirm} disabled={publishing}>
          {publishing ? 'Đang công khai...' : 'Xác nhận công khai'}
        </KmBtn>
      </KmFoot>
    </Modal>
  );
}
