'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTopLoader } from 'nextjs-toploader';
import { useRequestList } from '@/views/RequestList/hooks/useRequestList';
import { RequestDetailView } from '@/views/RequestList/components/RequestDetailView';
import * as S from '@/views/RequestList/styles';

export default function RequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const loader = useTopLoader();

  const {
    requests,
    loading,
    activeStudent,
    handleCancelRequest,
    setRequests,
  } = useRequestList();

  useEffect(() => {
    if (!loading) {
      loader.done();
    }
  }, [loading, loader]);

  const request = requests.find(r => r.id === id);

  const handleStatusUpdate = (updated: any) => {
    setRequests(prev => prev.map(r => r.id === updated.id ? updated : r));
  };

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
              onClick={() => {
                loader.start();
                router.push('/request');
              }}
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
        onBack={() => {
          loader.start();
          router.push('/request');
        }}
        onCancel={handleCancelRequest}
        onStatusUpdate={handleStatusUpdate}
      />
    </S.PageContainer>
  );
}
