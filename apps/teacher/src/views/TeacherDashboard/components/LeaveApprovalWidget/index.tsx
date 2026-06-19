import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { AttendanceService } from '@/services/attendance';
import { LeaveRequest } from '@/config/types/attendance';

interface LeaveApprovalWidgetProps {
  onAction: (message: string) => void;
  onRefresh?: () => void;
}

export const LeaveApprovalWidget: React.FC<LeaveApprovalWidgetProps> = ({ onAction, onRefresh }) => {
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const allReqs = await AttendanceService.getAllLeaveRequests();
      // Filter only PENDING requests
      const pending = allReqs.filter(r => r.status === 'PENDING');
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

      onAction(
        approve 
          ? `Đã duyệt đơn nghỉ học của ${name} thành công!` 
          : `Đã từ chối đơn nghỉ học của ${name}.`
      );
      
      if (onRefresh) {
        onRefresh();
      }
    } catch (e) {
      console.warn('Failed to process leave request:', e);
      onAction('Gặp lỗi khi xử lý đơn nghỉ học.');
    } finally {
      // Reload actual database list
      fetchRequests();
    }
  };

  if (loading) {
    return (
      <S.WidgetContainer>
        <S.HeaderRow>
          <S.Title>📩 Đơn xin phép</S.Title>
          <S.CounterBadge>Đang tải...</S.CounterBadge>
        </S.HeaderRow>
        <div style={{ color: '#9CA3AF', fontSize: '13px', textAlign: 'center', padding: '20px 0' }}>
          Đang tải đơn xin nghỉ...
        </div>
      </S.WidgetContainer>
    );
  }

  return (
    <S.WidgetContainer>
      <S.HeaderRow>
        <S.Title>📩 Đơn xin phép</S.Title>
        <S.CounterBadge>{requests.length} chờ duyệt</S.CounterBadge>
      </S.HeaderRow>

      <S.RequestList>
        {requests.length === 0 ? (
          <div style={{ color: '#9CA3AF', fontSize: '13px', textAlign: 'center', padding: '20px 0', fontWeight: 600 }}>
            🎉 Không có đơn xin nghỉ nào cần duyệt!
          </div>
        ) : (
          requests.map(r => {
            const colors = ['#FCA5A5', '#6EE7B7', '#93C5FD', '#C4B5FD', '#F9A8D4', '#FDBA74'];
            const initial = r.studentName ? r.studentName.trim().split(' ').pop()?.charAt(0).toUpperCase() || 'B' : 'B';
            const color = colors[r.studentName.length % colors.length];

            return (
              <S.RequestRow key={r.id} $removing={(r as any).removing}>
                <S.AvatarCircle $color={color}>{initial}</S.AvatarCircle>
                <S.InfoCol>
                  <S.ChildName>{r.studentName}</S.ChildName>
                  <S.RequestDetails>{r.reason} · {r.fromDate} → {r.toDate}</S.RequestDetails>
                </S.InfoCol>
                <S.ActionButtons>
                  <S.ApproveButton 
                    onClick={() => handleAction(r.id, r.studentName, true)}
                    title="Duyệt"
                  >
                    ✓
                  </S.ApproveButton>
                  <S.RejectButton 
                    onClick={() => handleAction(r.id, r.studentName, false)}
                    title="Từ chối"
                  >
                    ✕
                  </S.RejectButton>
                </S.ActionButtons>
              </S.RequestRow>
            );
          })
        )}
      </S.RequestList>
    </S.WidgetContainer>
  );
};
