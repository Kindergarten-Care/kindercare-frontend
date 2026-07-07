'use client';

import React from 'react';
import { X, History, Clock, User, Calendar, CheckCircle, AlertCircle, Edit, Send, RefreshCw } from 'lucide-react';
import * as S from '../styles';
import type { ImportHistoryItem, ImportSession } from '@/services/weeklySchedule/WeeklyScheduleService';

interface ImportHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: ImportHistoryItem[];
  sessions: ImportSession[];
}

const getActionIcon = (action: string) => {
  switch (action) {
    case 'Created':
    case 'Updated':
      return <Edit size={14} style={{ color: '#3B82F6' }} />;
    case 'Submitted':
      return <Send size={14} style={{ color: '#8B5CF6' }} />;
    case 'Approved':
      return <CheckCircle size={14} style={{ color: '#10B981' }} />;
    case 'Rejected':
      return <AlertCircle size={14} style={{ color: '#EF4444' }} />;
    case 'Imported':
      return <RefreshCw size={14} style={{ color: '#F59E0B' }} />;
    default:
      return <History size={14} style={{ color: '#6B7280' }} />;
  }
};

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatDateOnly = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export const ImportHistoryModal: React.FC<ImportHistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  sessions
}) => {
  if (!isOpen) return null;

  return (
    <S.ModalBackdrop onClick={onClose}>
      <S.ModalBox
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 700, maxHeight: '80vh' }}
      >
        {/* HEADER */}
        <S.ModalHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <S.ModalIcon>
              <History size={21} />
            </S.ModalIcon>
            <div>
              <S.ModalTitle>Lịch sử Import</S.ModalTitle>
              <S.ModalSubtitle>Xem lại các hoạt động với thời khóa biểu</S.ModalSubtitle>
            </div>
          </div>
          <S.ModalCloseBtn onClick={onClose}>
            <X size={18} />
          </S.ModalCloseBtn>
        </S.ModalHeader>

        {/* BODY */}
        <S.ModalBody style={{ overflowY: 'auto' }}>
          {history.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: '#6B7280'
            }}>
              <History size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
              <p style={{ margin: 0 }}>Chưa có lịch sử import nào</p>
            </div>
          ) : (
            <>
              {/* SUMMARY STATS */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 12,
                marginBottom: 24
              }}>
                <div style={{
                  padding: 16,
                  background: '#f0f9ff',
                  borderRadius: 8,
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#0369A1' }}>
                    {sessions.length}
                  </div>
                  <div style={{ fontSize: 12, color: '#075985' }}>Ngày import</div>
                </div>
                <div style={{
                  padding: 16,
                  background: '#f0fdf4',
                  borderRadius: 8,
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#15803D' }}>
                    {history.filter(h => h.Action === 'Imported').length}
                  </div>
                  <div style={{ fontSize: 12, color: '#166534' }}>Lần import</div>
                </div>
                <div style={{
                  padding: 16,
                  background: '#fef3c7',
                  borderRadius: 8,
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#B45309' }}>
                    {history.filter(h => h.Action === 'Submitted').length}
                  </div>
                  <div style={{ fontSize: 12, color: '#92400E' }}>Lần gửi duyệt</div>
                </div>
              </div>

              {/* TIMELINE */}
              <div style={{ position: 'relative' }}>
                {sessions.map((session, idx) => (
                  <div key={idx} style={{ marginBottom: 24 }}>
                    {/* Date header */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      marginBottom: 12
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '4px 10px',
                        background: '#e0e7ff',
                        borderRadius: 12,
                        fontSize: 12,
                        fontWeight: 600,
                        color: '#4338CA'
                      }}>
                        <Calendar size={12} />
                        {formatDateOnly(session.importDate)}
                      </div>
                      <div style={{
                        flex: 1,
                        height: 1,
                        background: '#E5E7EB'
                      }} />
                    </div>

                    {/* Actions for this date */}
                    <div style={{ paddingLeft: 12 }}>
                      {history
                        .filter(h => {
                          const actionDate = new Date(h.CreatedAt * 1000).toDateString();
                          const sessionDate = new Date(session.importDate).toDateString();
                          return actionDate === sessionDate;
                        })
                        .map((item, itemIdx) => (
                          <div
                            key={item.HistoryID}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: 12,
                              padding: '10px 12px',
                              background: '#f9fafb',
                              borderRadius: 8,
                              marginBottom: 8
                            }}
                          >
                            <div style={{
                              width: 28,
                              height: 28,
                              borderRadius: '50%',
                              background: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                            }}>
                              {getActionIcon(item.Action)}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                marginBottom: 4
                              }}>
                                <span style={{
                                  fontSize: 13,
                                  fontWeight: 600,
                                  color: '#1F2937'
                                }}>
                                  {item.Action}
                                </span>
                                <span style={{
                                  fontSize: 11,
                                  padding: '2px 6px',
                                  background: '#F3F4F6',
                                  borderRadius: 4,
                                  color: '#6B7280'
                                }}>
                                  Tuần {item.WeekNumber}
                                </span>
                              </div>
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                                fontSize: 11,
                                color: '#6B7280'
                              }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                  <Clock size={10} />
                                  {formatDate(item.CreatedAt)}
                                </span>
                                {item.ActorName && (
                                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <User size={10} />
                                    {item.ActorName}
                                  </span>
                                )}
                              </div>
                              {item.FromStatus && item.ToStatus && (
                                <div style={{
                                  fontSize: 11,
                                  color: '#9CA3AF',
                                  marginTop: 4
                                }}>
                                  {item.FromStatus} → {item.ToStatus}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </S.ModalBody>

        {/* FOOTER */}
        <S.ModalFooter>
          <S.CancelBtn type="button" onClick={onClose}>
            Đóng
          </S.CancelBtn>
        </S.ModalFooter>
      </S.ModalBox>
    </S.ModalBackdrop>
  );
};
