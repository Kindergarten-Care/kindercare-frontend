'use client';

import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { AttendanceService } from '@/services/attendance';
import { LeaveRequest } from '@/config/types/attendance';

import { useLeaveRequests, useUpdateLeaveRequest } from '@/hooks/useTeacherQueries';

const formatDate = (timestamp: number | undefined): string => {
  if (!timestamp) return '...';
  const d = new Date(timestamp * 1000);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}`;
};

const formatCreatedAt = (val: any): string => {
  if (!val) return '...';
  const d = new Date(val);
  if (isNaN(d.getTime())) return String(val);
  return d.toLocaleString('vi-VN');
};

interface LeaveApprovalWidgetProps {
  onAction: (message: string) => void;
  onRefresh?: () => void;
}

export const LeaveApprovalWidget: React.FC<LeaveApprovalWidgetProps> = ({ onAction, onRefresh }) => {
  const { data, isLoading } = useLeaveRequests('Pending');
  const updateLeaveRequest = useUpdateLeaveRequest();

  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [selectedLeaveRequest, setSelectedLeaveRequest] = useState<LeaveRequest | null>(null);
  const [leaveReqDetail, setLeaveReqDetail] = useState<LeaveRequest | null>(null);
  const [isLoadingReqDetail, setIsLoadingReqDetail] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setRequests(data);
    }
  }, [data]);

  const handleOpenLeaveRequest = async (r: LeaveRequest) => {
    setSelectedLeaveRequest(r);
    setLeaveReqDetail(null);
    setIsLoadingReqDetail(true);
    try {
      const detail = await AttendanceService.getLeaveRequestDetail(r.id);
      if (detail) {
        setLeaveReqDetail(detail);
      }
    } catch (e) {
      console.warn('Failed to load leave request detail:', e);
    } finally {
      setIsLoadingReqDetail(false);
    }
  };

  const handleAction = async (id: string, name: string, approve: boolean) => {
    // Set removing flag locally to trigger transition
    setRequests(prev => prev.map(r => r.id === id ? { ...r, removing: true } as any : r));

    try {
      const status = approve ? 'Approved' : 'Rejected';
      await updateLeaveRequest.mutateAsync({ requestId: id, status });
      
      // Update attendance status in database to sync
      const targetRequest = requests.find(r => r.id === id);
      if (targetRequest) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;
        const newDomainStatus = approve ? 'PERMISSION_ABSENCE' : 'UNEXCUSED_ABSENCE';
        
        await AttendanceService.updateAttendance(
          targetRequest.classId || 'MN1',
          dateStr,
          [{
            studentId: targetRequest.studentId,
            status: newDomainStatus,
            arrivalTime: undefined,
            healthNote: targetRequest.reason || ''
          }]
        );
      }

      setTimeout(() => {
        setRequests(prev => prev.filter(r => r.id !== id));
        onAction(
          approve 
            ? `Đã duyệt đơn nghỉ học của ${name} thành công!` 
            : `Đã từ chối đơn nghỉ học của ${name}.`
        );
        if (onRefresh) {
          onRefresh();
        }
      }, 320);
    } catch (e) {
      console.warn('Failed to process leave request:', e);
      onAction('Gặp lỗi khi xử lý đơn nghỉ học.');
      if (data) setRequests(data); // Revert on failure
    }
  };

  const getGradColor = (name: string): string => {
    const grads = [
      'linear-gradient(135deg, #F59E0B, #D97706)',
      'linear-gradient(135deg, #10B981, #059669)',
      'linear-gradient(135deg, #3B82F6, #2563EB)',
      'linear-gradient(135deg, #8B5CF6, #7C3AED)',
      'linear-gradient(135deg, #EC4899, #D01775)'
    ];
    let h = 0;
    for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
    return grads[h % grads.length];
  };

  const getInitial = (name: string): string => {
    return name.trim().split(' ').pop()?.charAt(0).toUpperCase() || 'B';
  };

  if (isLoading) {
    return (
      <S.WidgetContainer>
        <S.HeaderRow>
          <S.HeaderIconWrapper>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </S.HeaderIconWrapper>
          <S.WidgetTitle>Đơn chờ duyệt</S.WidgetTitle>
          <S.CounterBadge>...</S.CounterBadge>
        </S.HeaderRow>
        <div style={{ color: '#9CA3AF', fontSize: '13px', textAlign: 'center', padding: '30px 0', fontWeight: 600 }}>
          Đang tải...
        </div>
      </S.WidgetContainer>
    );
  }

  return (
    <>
      <S.WidgetContainer>
        <S.HeaderRow>
          <S.HeaderIconWrapper>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </S.HeaderIconWrapper>
          <S.WidgetTitle>Đơn chờ duyệt</S.WidgetTitle>
          <S.CounterBadge>{requests.length}</S.CounterBadge>
        </S.HeaderRow>

        <S.RequestList>
          {requests.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', flex: 1, padding: '30px 10px', textAlign: 'center', color: '#9CA3AF' }}>
              <span style={{ fontSize: '36px' }}>✅</span>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>Đã xử lý hết đơn!</span>
            </div>
          ) : (
            requests.map(r => (
              <S.RequestRow key={r.id} $removing={(r as any).removing}>
                <S.StudentRow style={{ cursor: 'pointer' }} onClick={() => handleOpenLeaveRequest(r)}>
                  <S.AvatarCircle $background={getGradColor(r.studentName)}>
                    {getInitial(r.studentName)}
                  </S.AvatarCircle>
                  <S.InfoCol>
                    <S.ChildName>{r.studentName}</S.ChildName>
                    <S.RequestDetails>{r.reason} · {formatDate(r.fromDate)} - {formatDate(r.toDate)}</S.RequestDetails>
                  </S.InfoCol>
                </S.StudentRow>
                <S.ActionButtons>
                  <S.ApproveButton onClick={() => handleAction(r.id, r.studentName, true)}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Duyệt
                  </S.ApproveButton>
                  <S.RejectButton onClick={() => handleAction(r.id, r.studentName, false)}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </S.RejectButton>
                </S.ActionButtons>
              </S.RequestRow>
            ))
          )}
        </S.RequestList>
      </S.WidgetContainer>

      {selectedLeaveRequest && (
        <S.ModalOverlay onClick={() => setSelectedLeaveRequest(null)}>
          <S.ModalContent onClick={e => e.stopPropagation()}>
            <S.ModalTitle>Đơn xin phép - {selectedLeaveRequest.studentName}</S.ModalTitle>
            
            {isLoadingReqDetail ? (
              <div style={{ padding: '40px 0', textAlign: 'center', color: '#9CA3AF', fontSize: '14px', fontWeight: 500 }}>
                Đang tải dữ liệu chi tiết...
              </div>
            ) : leaveReqDetail ? (
              <>
                <S.ModalMetaRow>
                  <S.ModalMetaField>
                    <S.ModalLabel>Lớp học: </S.ModalLabel>
                    <span style={{ color: '#1F2937', fontWeight: 500 }}>{leaveReqDetail.className || '...'}</span>
                  </S.ModalMetaField>

                  <S.ModalMetaField>
                    <S.ModalLabel>Phụ huynh: </S.ModalLabel>
                    <span style={{ color: '#1F2937', fontWeight: 500 }}>{leaveReqDetail.parentName} ({leaveReqDetail.relationship})</span>
                  </S.ModalMetaField>
                  {leaveReqDetail.parentPhone && (
                    <S.ModalMetaField>
                      <S.ModalLabel>Số điện thoại: </S.ModalLabel>
                      <span style={{ color: '#1F2937', fontWeight: 500 }}>{leaveReqDetail.parentPhone}</span>
                    </S.ModalMetaField>
                  )}
                  <S.ModalMetaField>
                    <S.ModalLabel>Ngày gửi đơn: </S.ModalLabel>
                    <span style={{ color: '#1F2937', fontWeight: 500 }}>{formatCreatedAt(leaveReqDetail.createdAt)}</span>
                  </S.ModalMetaField>
                  <S.ModalMetaField>
                    <S.ModalLabel>Thời gian nghỉ: </S.ModalLabel>
                    <span style={{ color: '#1F2937', fontWeight: 500 }}>
                      Từ {leaveReqDetail.fromDate ? new Date(leaveReqDetail.fromDate * 1000).toLocaleDateString('vi-VN') : '...'} đến {leaveReqDetail.toDate ? new Date(leaveReqDetail.toDate * 1000).toLocaleDateString('vi-VN') : '...'}
                    </span>
                  </S.ModalMetaField>
                  <S.ModalMetaField>
                    <S.ModalLabel>Giảm trừ tiền ăn: </S.ModalLabel>
                    <span style={{ color: leaveReqDetail.isMealFeeDeducted ? '#10B981' : '#EF4444', fontWeight: 700 }}>
                      {leaveReqDetail.isMealFeeDeducted ? 'Có' : 'Không'}
                    </span>
                  </S.ModalMetaField>
                  <S.ModalMetaField>
                    <S.ModalLabel>Trạng thái: </S.ModalLabel>
                    <S.ModalValue $status={leaveReqDetail.status}>
                      {leaveReqDetail.status === 'APPROVED' ? 'Đã duyệt' : (leaveReqDetail.status === 'REJECTED' ? 'Từ chối' : 'Chờ duyệt')}
                    </S.ModalValue>
                  </S.ModalMetaField>
                </S.ModalMetaRow>

                <div style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '6px', fontWeight: 700 }}>LÝ DO XIN NGHỈ:</div>
                <S.ModalReasonBox>
                  {leaveReqDetail.reason || 'Không ghi rõ lý do'}
                </S.ModalReasonBox>

                {leaveReqDetail.parentNotes && (
                  <>
                    <div style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '6px', fontWeight: 700 }}>Ý KIẾN / GHI CHÚ PHỤ HUYNH:</div>
                    <S.ModalReasonBox style={{ minHeight: '60px', background: '#F9FAFB' }}>
                      {leaveReqDetail.parentNotes}
                    </S.ModalReasonBox>
                  </>
                )}
                
                {leaveReqDetail.attachmentUrl && (
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '6px', fontWeight: 700 }}>MINH CHỨNG ĐÍNH KÈM:</div>
                    <img src={leaveReqDetail.attachmentUrl} alt="Minh chứng" style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '8px', border: '1px solid #E5E7EB', objectFit: 'cover' }} />
                  </div>
                )}
              </>
            ) : (
              <>
                <S.ModalMetaRow>
                  <S.ModalMetaField>
                    <S.ModalLabel>Trạng thái: </S.ModalLabel>
                    <S.ModalValue $status={selectedLeaveRequest.status}>
                      {selectedLeaveRequest.status === 'APPROVED' ? 'Đã duyệt' : (selectedLeaveRequest.status === 'REJECTED' ? 'Từ chối' : 'Chờ duyệt')}
                    </S.ModalValue>
                  </S.ModalMetaField>
                </S.ModalMetaRow>
                <div style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '6px', fontWeight: 700 }}>GHI CHÚ / LÝ DO:</div>
                <S.ModalReasonBox>
                  {selectedLeaveRequest.reason || 'Không ghi rõ lý do'}
                </S.ModalReasonBox>
              </>
            )}
            
            <S.ModalActionRow>
              {((leaveReqDetail && leaveReqDetail.status === 'PENDING') ||
                 (!leaveReqDetail && selectedLeaveRequest.status === 'PENDING')) ? (
                <>
                  <S.ModalRejectBtn onClick={() => { setSelectedLeaveRequest(null); handleAction(selectedLeaveRequest.id, selectedLeaveRequest.studentName, false); }}>Từ chối</S.ModalRejectBtn>
                  <S.ModalApproveBtn onClick={() => { setSelectedLeaveRequest(null); handleAction(selectedLeaveRequest.id, selectedLeaveRequest.studentName, true); }}>Xác nhận & Duyệt</S.ModalApproveBtn>
                </>
              ) : (
                <S.ModalCloseBtn onClick={() => setSelectedLeaveRequest(null)}>Đóng</S.ModalCloseBtn>
              )}
            </S.ModalActionRow>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </>
  );
};
