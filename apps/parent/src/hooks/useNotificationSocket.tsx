'use client';

import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { socketService, type NotificationPayload } from '@kindercare/core';
import { toast, KindercareToast } from '@kindercare/ui';
import { prependItem } from '@/store/slices/notificationSlice';
import type { AppDispatch } from '@/store';

/** Maps a notification type string to a KindercareToast variant */
function getToastVariant(type: string): 'success' | 'danger' | 'warning' | 'info' {
  const upper = type?.toUpperCase() ?? '';
  if (['MEDICATION', 'MEDICATION_REQUEST', 'MEDICAL_REQUEST', 'MEDICINE', 'MEDICINE_REQUEST'].includes(upper)) {
    return 'danger';
  }
  if (['HEALTH_ALERT'].includes(upper)) {
    return 'warning';
  }
  if (['ATTENDANCE', 'CHECKIN', 'CHECKOUT'].includes(upper)) {
    return 'success';
  }
  return 'info';
}

/** Inline SVG icon that mirrors NotificationIcon visual for the toast */
function getToastIcon(type: string) {
  const upper = type?.toUpperCase() ?? '';

  if (['ATTENDANCE', 'CHECKIN', 'CHECKOUT'].includes(upper)) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" />
        <path d="m9 14 2 2 4-4" />
      </svg>
    );
  }
  if (['MEDICATION', 'MEDICATION_REQUEST', 'MEDICAL_REQUEST', 'MEDICINE', 'MEDICINE_REQUEST'].includes(upper)) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    );
  }
  if (['LEAVE_REQUEST'].includes(upper)) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" />
      </svg>
    );
  }
  if (['HEALTH_ALERT'].includes(upper)) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 8v8" /><path d="M8 12h8" />
      </svg>
    );
  }
  // default: bell
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

/**
 * useNotificationSocket
 *
 * Subscribes to the Socket.IO `new_notification` event:
 * 1. Dispatches `prependItem` to Redux → badge count + list update
 * 2. Shows a KindercareToast with icon, title, and message
 */
export function useNotificationSocket() {
  const dispatch = useDispatch<AppDispatch>();
  const handlerRef = useRef<((n: NotificationPayload) => void) | null>(null);

  useEffect(() => {
    const handler = (notification: NotificationPayload) => {
      // parse dataPayload if it is a JSON string
      let parsedPayload: Record<string, string> = {};
      if (typeof notification.dataPayload === 'string') {
        try {
          parsedPayload = JSON.parse(notification.dataPayload);
        } catch {
          parsedPayload = { raw: notification.dataPayload };
        }
      } else {
        parsedPayload = notification.dataPayload || {};
      }

      // 1. Push to Redux store
      dispatch(prependItem({
        notifId:     notification.notifId,
        userId:      notification.userId,
        title:       notification.title,
        message:     notification.message,
        type:        notification.type,
        isRead:      notification.isRead,
        isCritical:  notification.isCritical,
        dataPayload: parsedPayload,
        createdAt:   notification.createdAt,
        updatedAt:   notification.updatedAt,
      }));

      // 2. Show toast
      const variant = getToastVariant(notification.type);
      const icon    = getToastIcon(notification.type);

      toast(
        <KindercareToast
          variant={variant}
          title={notification.title}
          message={notification.message}
          icon={icon}
        />,
        {
          icon: false,
          type: variant === 'danger' ? 'error' : variant,
          autoClose: 5000,
          position: 'top-right',
        }
      );
    };

    handlerRef.current = handler;
    socketService.on('new_notification', handler);

    return () => {
      if (handlerRef.current) {
        socketService.off('new_notification', handlerRef.current);
        handlerRef.current = null;
      }
    };
  }, [dispatch]);
}

