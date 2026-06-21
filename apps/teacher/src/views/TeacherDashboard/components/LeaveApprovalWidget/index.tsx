'use client';

import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { AttendanceService } from '@/services/attendance';
import { LeaveRequest } from '@/config/types/attendance';

const formatDate = (timestamp: number | undefined): string => {
  if (!timestamp) return '...';
  const d = new Date(timestamp * 1000);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}`;
};

const getStartOfTodayInSeconds = (): number => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return Math.floor(d.getTime() / 1000);
};

interface LeaveApprovalWidgetProps {
  onAction: (message: string) => void;
}

export const LeaveApprovalWidget: React.FC<LeaveApprovalWidgetProps> = ({ onAction }) => {
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const allReqs = await AttendanceService.getAllLeaveRequests();
      
      const todayStart = getStartOfTodayInSeconds();
      // Filter only PENDING requests that have NOT passed yet (toDate >= todayStart)
      const pending = allReqs.filter(r => {
        const isPending = r.status === 'PENDING';
        const hasNotPassed = !r.toDate || r.toDate >= todayStart;
        return isPending && hasNotPassed;
      });
      setRequests(pending);
    } catch (e) {
      console.warn('Failed to fetch leave requests:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (id: string, name: string, approve: boolean) => {
    // Set removing flag locally to trigger transition
    setRequests(prev => prev.map(r => r.id === id ? { ...r, removing: true } as any : r));

    try {
      const status = approve ? 'APPROVED' : 'REJECTED';
      await AttendanceService.processLeaveRequest(id, status);
      
      setTimeout(() => {
        setRequests(prev => prev.filter(r => r.id !== id));
        onAction(
          approve 
            ? `Đã duyệt đơn nghỉ học của ${name} thành công!` 
            : `Đã từ chối đơn nghỉ học của ${name}.`
        );
      }, 320);
    } catch (e) {
      console.warn('Failed to process leave request:', e);
      onAction('Gặp lỗi khi xử lý đơn nghỉ học.');
      // Reload actual database list to reset
      fetchRequests();
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

  if (loading) {
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
              <S.StudentRow>
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
  );
};
