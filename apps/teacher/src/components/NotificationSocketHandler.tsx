'use client';

import { useNotificationSocket } from '@/hooks/useNotificationSocket';

/**
 * Client-side wrapper that sets up real-time notification handling.
 * Mounted inside SocketProvider so socket is already connected.
 */
export function NotificationSocketHandler() {
  useNotificationSocket();
  return null;
}
