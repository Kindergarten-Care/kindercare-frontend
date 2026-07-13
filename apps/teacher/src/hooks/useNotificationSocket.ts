'use client';

import { useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { socketService } from '@kindercare/core';
import type { NotificationPayload } from '@kindercare/core';

/** Map notification type → human-readable label */
const NOTIF_TYPE_LABEL: Record<string, string> = {
  leave_request: 'đơn xin nghỉ phép',
  medical_request: 'đơn y tế',
  proxy_authorization: 'đơn đón hộ',
  assessment: 'đánh giá học sinh',
  attendance: 'điểm danh',
  newsfeed: 'tin tức lớp',
  general: 'thông báo',
};

/** Map notification type → react-query key to invalidate */
const NOTIF_QUERY_KEYS: Record<string, string[]> = {
  leave_request: ['leaveRequests'],
  medical_request: ['medicalRequests'],
  proxy_authorization: ['proxyApprovals'],
  assessment: [],
  attendance: ['dashboardStats'],
  newsfeed: ['classNewsfeed'],
  general: [],
};

function getNotifType(payload: NotificationPayload): string {
  try {
    const data = typeof payload.dataPayload === 'string'
      ? JSON.parse(payload.dataPayload)
      : payload.dataPayload;
    return data?.requestType || data?.type || payload.type || 'general';
  } catch {
    return payload.type || 'general';
  }
}

function getToastLabel(notifType: string): string {
  return NOTIF_TYPE_LABEL[notifType] || NOTIF_TYPE_LABEL.general;
}

function isCritical(notification: NotificationPayload): boolean {
  return !!notification.isCritical;
}

export function useNotificationSocket() {
  const queryClient = useQueryClient();

  const handleNewNotification = useCallback((notification: NotificationPayload) => {
    const notifType = getNotifType(notification);
    const label = getToastLabel(notifType);

    // 1. Show toast
      if (isCritical(notification)) {
      toast.error(notification.message || `Có ${label} mới cần xử lý ngay!`, {
        autoClose: 6000,
      });
    } else {
      toast.info(notification.message || `Có ${label} mới`, {
        autoClose: 4000,
      });
    }

    // 2. Invalidate relevant queries so data refreshes automatically
    const keys = NOTIF_QUERY_KEYS[notifType] || [];
    keys.forEach(key => {
      queryClient.invalidateQueries({ queryKey: [key] });
    });
  }, [queryClient]);

  useEffect(() => {
    socketService.on('new_notification', handleNewNotification);

    return () => {
      socketService.off('new_notification', handleNewNotification);
    };
  }, [handleNewNotification]);
}
