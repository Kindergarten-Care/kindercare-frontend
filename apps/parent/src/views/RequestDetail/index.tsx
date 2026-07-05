'use client';

import React from 'react';
import { useRequestDetail } from './hooks/useRequestDetail';
import { RequestDetailView } from '@/views/RequestList/components/RequestDetailView';
import { ConfirmCancelModal } from '@/views/RequestList/components/ConfirmCancelModal';
import * as S from '@/views/RequestList/styles';

export const RequestDetail: React.FC = () => {
  const {
    request,
    loading,
    activeStudent,
    isConfirmOpen,
    setIsConfirmOpen,
    triggerCancelRequest,
    confirmCancelRequest,
    handleStatusUpdate,
    handleBack,
  } = useRequestDetail();

  if (loading) {
    return (
      <S.PageContainer>
        <div style={{ textAlign: 'center', padding: '120px 40px', color: 'var(--muted, #6b7280)', fontSize: '14px', fontWeight: 500 }}>
          <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite', marginRight: '8px' }}>🌀</span>
          Đang tải chi tiết đơn từ...
        </div>
      </S.PageContainer>
    );
  }

  if (!request) {
    return (
      <S.PageContainer>
        <div style={{ textAlign: 'center', padding: '120px 40px', color: 'var(--muted, #6b7280)', fontSize: '14px', fontWeight: 500 }}>
          Không tìm thấy đơn từ yêu cầu hoặc học sinh không có quyền truy cập.
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={handleBack}
              style={{
                padding: '10px 20px',
                background: 'var(--brand, #005a36)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(0, 90, 54, 0.15)'
              }}
            >
              Quay lại danh sách
            </button>
          </div>
        </div>
      </S.PageContainer>
    );
  }

  return (
    <S.PageContainer style={{ paddingTop: '16px' }}>
      <RequestDetailView
        request={request}
        activeStudent={activeStudent}
        onBack={handleBack}
        onCancel={triggerCancelRequest}
        onStatusUpdate={handleStatusUpdate}
      />

      <ConfirmCancelModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => confirmCancelRequest(() => handleStatusUpdate({ ...request, status: 'cancelled' }))}
      />
    </S.PageContainer>
  );
};
