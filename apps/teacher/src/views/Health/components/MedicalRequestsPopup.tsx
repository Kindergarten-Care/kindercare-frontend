'use client';

import React, { useState } from 'react';
import { X, Pill, CheckCircle, XCircle, Clock } from 'lucide-react';
import * as S from '../styles';
import type { MedicationDomainModel } from '@/config/types/health';
import { useUpdateMedicationStatus } from '@/hooks/useHealthQueries';

interface MedicalRequestsPopupProps {
  onClose: () => void;
  requests: MedicationDomainModel[];
  classId: number | string | undefined;
  addToast: (text: string, variant: 'success' | 'error' | 'warning' | 'info') => void;
}

const avatarGradients = [
  '#F87171', '#FB923C', '#FBBF24', '#34D399', '#38BDF8', '#818CF8', '#E879F9', '#F472B6',
];

function getAvatarGrad(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarGradients[Math.abs(hash) % avatarGradients.length];
}

function getInitials(name: string) {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function formatDate(timestamp: number) {
  if (!timestamp) return 'Không rõ';
  return new Date(timestamp).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export const MedicalRequestsPopup: React.FC<MedicalRequestsPopupProps> = ({
  onClose,
  requests,
  addToast,
}) => {
  const [noteInputs, setNoteInputs] = useState<Record<number, string>>({});
  const updateStatus = useUpdateMedicationStatus();

  const handleAction = async (requestId: number, status: 'Completed' | 'Rejected') => {
    try {
      await updateStatus.mutateAsync({
        requestId,
        status,
        teacherNote: noteInputs[requestId] || undefined,
      });
      addToast(`Đã ${status === 'Completed' ? 'xác nhận' : 'từ chối'} đơn thuốc`, 'success');
    } catch {
      addToast('Thao tác thất bại, vui lòng thử lại', 'error');
    }
  };

  return (
    <S.PopupOverlay onClick={onClose}>
      <S.Popup onClick={e => e.stopPropagation()} style={{ maxWidth: 620 }}>
        <S.PopupHeader>
          <S.PopupTitle>
            <Pill size={20} color="#2563EB" />
            Đơn dặn thuốc
          </S.PopupTitle>
          <S.CloseBtn onClick={onClose}>
            <X size={16} />
          </S.CloseBtn>
        </S.PopupHeader>

        <S.PopupBody>
          {requests.length === 0 ? (
            <S.EmptyState>
              <CheckCircle size={36} color="#6EE7B7" />
              <S.EmptyTitle>Không có đơn chờ xử lý</S.EmptyTitle>
              <S.EmptyDesc>Tất cả đơn dặn thuốc đã được xử lý.</S.EmptyDesc>
            </S.EmptyState>
          ) : (
            <>
              <div style={{ fontSize: 12.5, color: '#6B7280', fontWeight: 500, marginBottom: 14 }}>
                Nhấn <strong style={{ color: '#059669' }}>Xác nhận</strong> khi đã cho uống thuốc, hoặc{' '}
                <strong style={{ color: '#DC2626' }}>Từ chối</strong> nếu không thể thực hiện.
              </div>

              {requests.map((req, idx) => (
                <div
                  key={req.medRequestId}
                  style={{
                    border: '1px solid #E6EEE9',
                    borderRadius: 14,
                    padding: 16,
                    marginBottom: 12,
                    background: '#FAFCFB',
                    animationDelay: `${idx * 50}ms`,
                  }}
                >
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: '50%',
                      background: getAvatarGrad(req.studentName),
                      color: '#fff', fontSize: 14, fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none',
                      overflow: 'hidden',
                    }}>
                      {req.studentAvatar ? (
                        <img src={req.studentAvatar} alt={req.studentName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        getInitials(req.studentName)
                      )}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 15, fontWeight: 700, color: '#1F2937' }}>{req.studentName}</span>
                        <S.StatusBadge $status={req.status} />
                      </div>
                      <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
                        Phụ huynh: {req.parentName} · Ngày: {formatDate(req.requestDate)}
                      </div>
                    </div>
                  </div>

                  {/* Medicine Details */}
                  <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10,
                  }}>
                    <div style={{ background: '#fff', borderRadius: 8, padding: '8px 12px', border: '1px solid #E6EEE9' }}>
                      <div style={{ fontSize: 10.5, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Thuốc</div>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1F2937', marginTop: 2 }}>{req.medicineDetails}</div>
                    </div>
                    <div style={{ background: '#fff', borderRadius: 8, padding: '8px 12px', border: '1px solid #E6EEE9' }}>
                      <div style={{ fontSize: 10.5, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Liều lượng</div>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1F2937', marginTop: 2 }}>{req.dosage}</div>
                    </div>
                    {req.frequency && (
                      <div style={{ background: '#fff', borderRadius: 8, padding: '8px 12px', border: '1px solid #E6EEE9' }}>
                        <div style={{ fontSize: 10.5, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tần suất</div>
                        <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1F2937', marginTop: 2 }}>{req.frequency}</div>
                      </div>
                    )}
                    {req.timeToTake && (
                      <div style={{ background: '#fff', borderRadius: 8, padding: '8px 12px', border: '1px solid #E6EEE9' }}>
                        <div style={{ fontSize: 10.5, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Giờ uống</div>
                        <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1F2937', marginTop: 2 }}>{req.timeToTake}</div>
                      </div>
                    )}
                  </div>

                  {req.parentNote && (
                    <div style={{ fontSize: 12.5, color: '#374151', fontStyle: 'italic', background: '#FEF9C3', padding: '6px 10px', borderRadius: 8, border: '1px solid #FDE68A', marginBottom: 10 }}>
                      📝 Ghi chú PH: {req.parentNote}
                    </div>
                  )}

                  {/* Teacher Note */}
                  <textarea
                    placeholder="Ghi chú của giáo viên (không bắt buộc)..."
                    value={noteInputs[req.medRequestId] || ''}
                    onChange={e => setNoteInputs(prev => ({ ...prev, [req.medRequestId]: e.target.value }))}
                    style={{
                      width: '100%', padding: '8px 12px', borderRadius: 8,
                      border: '1.5px solid #E6EEE9', background: '#fff',
                      fontFamily: 'inherit', fontSize: 13, color: '#1F2937',
                      resize: 'vertical', minHeight: 56, boxSizing: 'border-box',
                      outline: 'none', marginBottom: 10,
                    }}
                  />

                  {/* Actions */}
                  <S.ActionRow>
                    <S.PrimaryBtn
                      onClick={() => handleAction(req.medRequestId, 'Completed')}
                      disabled={updateStatus.isPending}
                      style={{ flex: 1, background: '#059669' }}
                    >
                      <CheckCircle size={15} />
                      Xác nhận đã cho uống
                    </S.PrimaryBtn>
                    <S.SecondaryBtn
                      onClick={() => handleAction(req.medRequestId, 'Rejected')}
                      disabled={updateStatus.isPending}
                      style={{ flex: 1, borderColor: '#FCA5A5', color: '#DC2626' }}
                    >
                      <XCircle size={15} />
                      Từ chối
                    </S.SecondaryBtn>
                  </S.ActionRow>
                </div>
              ))}
            </>
          )}
        </S.PopupBody>
      </S.Popup>
    </S.PopupOverlay>
  );
};
