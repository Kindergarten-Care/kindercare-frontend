import React, { useEffect, useRef, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@kindercare/core';
import { toast } from 'react-toastify';
import { X, Calendar, FileText, Check, AlertCircle } from 'lucide-react';
import styled, { keyframes } from 'styled-components';
import { useTeacherProfile } from './useTeacherQueries';

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

interface NotificationPayload {
  NotificationID: number;
  SenderID: number;
  ReceiverID: number;
  Type: 'LEAVE' | 'MEDICAL' | 'OTHER';
  Message: string;
  IsRead: number;
  CreatedAt: number;
}

export function useTeacherNotifications() {
  const queryClient = useQueryClient();
  const { data: profile } = useTeacherProfile();
  const teacherId = profile?.teacherId;
  
  // State to manage global active notification view modal
  const [activeNotif, setActiveNotif] = useState<NotificationPayload | null>(null);

  // Keep track of which Notification IDs have been toasted in the current session
  const notifiedIdsRef = useRef<Set<number>>(new Set());

  // Smart polling via TanStack Query every 3 seconds
  const { data: newNotifications } = useQuery<NotificationPayload[]>({
    queryKey: ['pollingTeacherNotifications', teacherId],
    queryFn: async () => {
      if (!teacherId) return [];
      const res = await apiClient.get('/notifications/teacher', {
        params: { teacherId }
      });
      return res.data?.data || [];
    },
    enabled: !!teacherId,
    refetchInterval: 3000,
    refetchIntervalInBackground: true,
  });

  // Mutation to mark notifications as read on backend/mockDb
  const markAsReadMutation = useMutation({
    mutationFn: async (notificationIds: number[]) => {
      await apiClient.post('/notifications/mark-as-read', { notificationIds });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pollingTeacherNotifications', teacherId] });
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

  useEffect(() => {
    if (!newNotifications || newNotifications.length === 0) return;

    const idsToMark: number[] = [];

    newNotifications.forEach(notif => {
      if (!notifiedIdsRef.current.has(notif.NotificationID)) {
        notifiedIdsRef.current.add(notif.NotificationID);
        idsToMark.push(notif.NotificationID);

        // Capture current toast instance to clear easily
        let toastId: any = null;

        const handleViewClick = () => {
          setActiveNotif(notif);
          if (toastId) toast.dismiss(toastId);
        };

        toastId = toast.info(
          <div style={{ padding: '2px 0' }}>
            <div style={{ fontWeight: 800, marginBottom: '4px', fontSize: '13px', color: '#111827' }}>
              {notif.Type === 'LEAVE' ? '📅 Đơn xin nghỉ phép mới' : '💊 Đơn dặn thuốc mới'}
            </div>
            <div style={{ fontSize: '12px', color: '#4B5563', lineHeight: 1.4, marginBottom: '8px' }}>
              {notif.Message}
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
  }, [newNotifications, markAsReadMutation]);

  // Utility renderer to display global modal inline
  const renderDetailModal = () => {
    if (!activeNotif) return null;
    return (
      <Overlay onClick={() => setActiveNotif(null)}>
        <ModalBox onClick={(e) => e.stopPropagation()}>
          <Header>
            <Title>
              {activeNotif.Type === 'LEAVE' ? '📅 Đơn Xin Nghỉ Phép' : '💊 Đơn Dặn Thuốc Y Tế'}
            </Title>
            <CloseButton onClick={() => setActiveNotif(null)}>
              <X size={18} />
            </CloseButton>
          </Header>
          <Body>
            <InfoRow>
              <Label>Loại yêu cầu</Label>
              <Value>
                <FileText size={15} />
                {activeNotif.Type === 'LEAVE' ? 'Nghỉ phép học tập' : 'Dặn thuốc y tế hàng ngày'}
              </Value>
            </InfoRow>
            <InfoRow>
              <Label>Ngày gửi</Label>
              <Value>
                <Calendar size={15} />
                {new Date(activeNotif.CreatedAt).toLocaleString('vi-VN')}
              </Value>
            </InfoRow>
            <InfoRow>
              <Label>Nội dung chi tiết đơn</Label>
              <MessageBox>{activeNotif.Message}</MessageBox>
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
