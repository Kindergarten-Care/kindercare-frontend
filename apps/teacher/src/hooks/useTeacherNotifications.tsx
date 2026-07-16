import React, { useEffect, useRef, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, socketService, notificationService, type NotificationDto } from '@kindercare/core';
import { toast } from 'react-toastify';
import { X, Calendar, FileText, Check, AlertCircle } from 'lucide-react';
import styled, { keyframes } from 'styled-components';
import { useTeacherProfile } from './queries';

const modalFadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalBox = styled.div`
  width: min(460px, 100%);
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3);
  animation: ${modalFadeIn} 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
`;

const Header = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #F9FAFB;
`;

const Title = styled.h3`
  font-size: 15px;
  font-weight: 800;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CloseButton = styled.button`
  border: none;
  background: none;
  color: #9CA3AF;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.15s;

  &:hover {
    color: #EF4444;
  }
`;

const Body = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Value = styled.span`
  font-size: 13.5px;
  font-weight: 600;
  color: #1F2937;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const MessageBox = styled.div`
  font-size: 13px;
  color: #374151;
  line-height: 1.5;
  background: #F9FAFB;
  padding: 12px 16px;
  border-radius: 12px;
  border-left: 3px solid #005A36;
  margin-top: 4px;
`;

const Footer = styled.div`
  padding: 16px 20px;
  border-top: 1px solid #F3F4F6;
  display: flex;
  gap: 10px;
  background: #F9FAFB;
`;

const ActionButton = styled.button<{ $primary?: boolean; $danger?: boolean }>`
  flex: 1;
  height: 40px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s;
  
  ${({ $primary, $danger }) => {
    if ($primary) {
      return `
        border: none;
        background: linear-gradient(135deg, #00794A, #005A36);
        color: #ffffff;
        box-shadow: 0 4px 10px rgba(0, 90, 54, 0.25);
        &:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 14px rgba(0, 90, 54, 0.35);
        }
      `;
    }
    if ($danger) {
      return `
        border: 1px solid #FCA5A5;
        background: #ffffff;
        color: #DC2626;
        &:hover {
          background: #FEF2F2;
        }
      `;
    }
    return `
      border: 1px solid #D1D5DB;
      background: #ffffff;
      color: #4B5563;
      &:hover {
        background: #F3F4F6;
      }
    `;
  }}
`;

export function useTeacherNotifications() {
  const queryClient = useQueryClient();
  const { data: profile } = useTeacherProfile();
  const teacherId = profile?.teacherId;
  
  // State to manage global active notification view modal
  const [activeNotif, setActiveNotif] = useState<NotificationDto | null>(null);

  // Keep track of which Notification IDs have been toasted in the current session
  const notifiedIdsRef = useRef<Set<number>>(new Set());

  // Mutation to mark notifications as read on backend
  const markAsReadMutation = useMutation({
    mutationFn: async (notificationIds: number[]) => {
      for (const id of notificationIds) {
        await notificationService.markAsRead(id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['initialTeacherNotifications', teacherId] });
    }
  });

  const handleApprove = () => {
    if (!activeNotif) return;
    toast.success('Đã duyệt đơn của phụ huynh gửi thành công!');
    setActiveNotif(null);
  };

  const handleReject = () => {
    if (!activeNotif) return;
    toast.info('Đã từ chối đơn của phụ huynh.');
    setActiveNotif(null);
  };

  // Fetch initial unread notifications ONCE on mount (no polling)
  const { data: initialNotifications } = useQuery<NotificationDto[]>({
    queryKey: ['initialTeacherNotifications', teacherId],
    queryFn: async () => {
      if (!teacherId) return [];
      return await notificationService.getInbox();
    },
    enabled: !!teacherId,
    staleTime: Infinity,
  });

  // Trigger toasts for initial unread notifications
  useEffect(() => {
    if (!initialNotifications || initialNotifications.length === 0) return;

    const idsToMark: number[] = [];

    initialNotifications.forEach(notif => {
      if (notif.isRead === 1) return;

      let role = '';
      try {
        const data = typeof notif.dataPayload === 'string' ? JSON.parse(notif.dataPayload) : (notif.dataPayload || {});
        role = data.senderRole || data.role || '';
      } catch(e) {}
      
      const isFromParent = ['LEAVE_REQUEST', 'leave_request', 'PROXY_AUTHORIZATION', 'MEDICAL_REQUEST'].includes(notif.type) || ['Parent', 'Phụ huynh'].includes(role);
      const isFromAdmin = ['ANNOUNCEMENT', 'SYSTEM', 'ADMIN'].includes(notif.type) || ['Admin', 'Principal', 'Hiệu trưởng'].includes(role);

      if (!(isFromParent || isFromAdmin)) return;

      if (!notifiedIdsRef.current.has(notif.notifId)) {
        notifiedIdsRef.current.add(notif.notifId);
        idsToMark.push(notif.notifId);

        let toastId: any = null;
        const handleViewClick = () => {
          setActiveNotif(notif);
          if (toastId) toast.dismiss(toastId);
        };

        const isLeave = notif.type === 'LEAVE_REQUEST' || notif.type === 'leave_request';
        const isProxy = notif.type === 'PROXY_AUTHORIZATION';

        let notifTitle = '💊 Đơn dặn thuốc mới';
        if (isLeave) notifTitle = '📅 Đơn xin nghỉ phép mới';
        if (isProxy) notifTitle = '🚗 Đăng ký đón hộ mới';

        toastId = toast.info(
          <div style={{ padding: '2px 0' }}>
            <div style={{ fontWeight: 800, marginBottom: '4px', fontSize: '13px', color: '#111827' }}>
              {notifTitle}
            </div>
            <div style={{ fontSize: '12px', color: '#4B5563', lineHeight: 1.4, marginBottom: '8px' }}>
              {notif.message}
            </div>
            <button
              onClick={handleViewClick}
              style={{
                padding: '5px 12px',
                background: '#005A36',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-block',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              Xem ngay
            </button>
          </div>,
          {
            position: "top-right",
            autoClose: 5000,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
          }
        );
      }
    });

    if (idsToMark.length > 0) {
      markAsReadMutation.mutate(idsToMark);
    }
  }, [initialNotifications, markAsReadMutation]);

  // Real-time integration via Socket.io
  useEffect(() => {
    if (!teacherId) return;

    const socket = socketService.getSocket();

    const handleConnect = () => {
      socketService.emit('join_room', `teacher_${teacherId}`);
      console.log(`[Socket] Teacher ${teacherId} joined room: teacher_${teacherId}`);
    };

    if (socket) {
      if (socket.connected) {
        handleConnect();
      }
      socket.on('connect', handleConnect);
    }

    const onNewNotification = (payload: any) => {
      console.log('[Socket] Received new notification:', payload);
      
      const notifId = payload.notifId || payload.NotificationID || Date.now();
      const type = payload.type || payload.Type || 'OTHER';
      const msg = payload.message || payload.Message || '';
      
      let dataPayload = payload.dataPayload || payload.data || {};
      if (typeof dataPayload === 'string') {
        try {
          dataPayload = JSON.parse(dataPayload);
        } catch (e) {}
      }

      const formattedNotif: NotificationDto = {
        notifId: notifId,
        userId: teacherId,
        title: payload.title || 'Thông báo mới',
        message: msg,
        type: type,
        isRead: 0,
        isCritical: payload.isCritical || 0,
        dataPayload: dataPayload,
        createdAt: payload.createdAt || Math.floor(Date.now() / 1000),
        updatedAt: payload.updatedAt || Math.floor(Date.now() / 1000)
      };

      if (formattedNotif.isRead === 1) return;

      let role = '';
      try {
        const data = typeof formattedNotif.dataPayload === 'string' ? JSON.parse(formattedNotif.dataPayload) : (formattedNotif.dataPayload || {});
        role = data.senderRole || data.role || '';
      } catch(e) {}
      
      const isFromParent = ['LEAVE_REQUEST', 'leave_request', 'PROXY_AUTHORIZATION', 'MEDICAL_REQUEST'].includes(formattedNotif.type) || ['Parent', 'Phụ huynh'].includes(role);
      const isFromAdmin = ['ANNOUNCEMENT', 'SYSTEM', 'ADMIN'].includes(formattedNotif.type) || ['Admin', 'Principal', 'Hiệu trưởng'].includes(role);

      if (!(isFromParent || isFromAdmin)) return;

      if (!notifiedIdsRef.current.has(formattedNotif.notifId)) {
        notifiedIdsRef.current.add(formattedNotif.notifId);

        let toastId: any = null;
        const handleViewClick = () => {
          setActiveNotif(formattedNotif);
          if (toastId) toast.dismiss(toastId);
        };

        const isLeave = formattedNotif.type === 'LEAVE_REQUEST' || formattedNotif.type === 'leave_request';
        const isProxy = formattedNotif.type === 'PROXY_AUTHORIZATION';
        
        let notifTitle = '💊 Đơn dặn thuốc mới';
        if (isLeave) notifTitle = '📅 Đơn xin nghỉ phép mới';
        if (isProxy) notifTitle = '🚗 Đăng ký đón hộ mới';
        
        toastId = toast.info(
          <div style={{ padding: '2px 0' }}>
            <div style={{ fontWeight: 800, marginBottom: '4px', fontSize: '13px', color: '#111827' }}>
              {notifTitle}
            </div>
            <div style={{ fontSize: '12px', color: '#4B5563', lineHeight: 1.4, marginBottom: '8px' }}>
              {formattedNotif.message}
            </div>
            <button
              onClick={handleViewClick}
              style={{
                padding: '5px 12px',
                background: '#005A36',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-block',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              Xem ngay
            </button>
          </div>,
          {
            position: "top-right",
            autoClose: 5000,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
          }
        );

        // Mark as read on backend
        markAsReadMutation.mutate([formattedNotif.notifId]);
      }
    };

    socketService.on('new_notification', onNewNotification);

    return () => {
      if (socket) {
        socket.off('connect', handleConnect);
      }
      socketService.off('new_notification', onNewNotification);
    };
  }, [teacherId, markAsReadMutation]);

  // Utility renderer to display global modal inline
  const renderDetailModal = () => {
    if (!activeNotif) return null;
    const isLeave = activeNotif.type === 'LEAVE_REQUEST' || activeNotif.type === 'leave_request';
    const isProxy = activeNotif.type === 'PROXY_AUTHORIZATION';

    const formattedDate = activeNotif.createdAt > 2000000000 
      ? new Date(activeNotif.createdAt).toLocaleString('vi-VN')
      : new Date(activeNotif.createdAt * 1000).toLocaleString('vi-VN');

    let title = '💊 Đơn Dặn Thuốc Y Tế';
    if (isLeave) title = '📅 Đơn Xin Nghỉ Phép';
    if (isProxy) title = '🚗 Đăng Ký Đón Hộ';

    let typeStr = 'Dặn thuốc y tế hàng ngày';
    if (isLeave) typeStr = 'Nghỉ phép học tập';
    if (isProxy) typeStr = 'Xác nhận người đón hộ';

    return (
      <Overlay onClick={() => setActiveNotif(null)}>
        <ModalBox onClick={(e) => e.stopPropagation()}>
          <Header>
            <Title>{title}</Title>
            <CloseButton onClick={() => setActiveNotif(null)}>
              <X size={18} />
            </CloseButton>
          </Header>
          <Body>
            <InfoRow>
              <Label>Loại yêu cầu</Label>
              <Value>
                <FileText size={15} />
                {typeStr}
              </Value>
            </InfoRow>
            <InfoRow>
              <Label>Ngày gửi</Label>
              <Value>
                <Calendar size={15} />
                {formattedDate}
              </Value>
            </InfoRow>
            <InfoRow>
              <Label>Nội dung chi tiết đơn</Label>
              <MessageBox>{activeNotif.message}</MessageBox>
            </InfoRow>
          </Body>
          <Footer>
            <ActionButton $danger onClick={handleReject}>
              Từ chối
            </ActionButton>
            <ActionButton $primary onClick={handleApprove}>
              Duyệt đơn
            </ActionButton>
          </Footer>
        </ModalBox>
      </Overlay>
    );
  };

  return {
    renderDetailModal
  };
}
