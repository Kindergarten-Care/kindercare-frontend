import { apiClient } from '../lib/apiClient';
import { SERVER } from '../config/server';
import type { ApiResponse } from '../types/api';
import type { NotificationDto } from '../types/notification';

export interface FirebaseClientConfig {
  apiKey:            string;
  authDomain:        string;
  projectId:         string;
  storageBucket:     string;
  messagingSenderId: string;
  appId:             string;
}

class NotificationService {
  async getFirebaseConfig(): Promise<FirebaseClientConfig> {
    const { data: res } = await apiClient.get<ApiResponse<FirebaseClientConfig>>(
      SERVER.notifications.getFirebaseConfig,
    );
    if (!res.success) throw new Error(res.message);
    return res.data;
  }

  async registerToken(token: string): Promise<void> {
    const { data: res } = await apiClient.post<ApiResponse<null>>(
      SERVER.notifications.registerToken,
      { token, deviceType: 'web' },
    );
    if (!res.success) throw new Error(res.message);
  }

  async getInbox(): Promise<NotificationDto[]> {
    const { data: res } = await apiClient.get<ApiResponse<NotificationDto[]>>(
      SERVER.notifications.getInbox,
    );
    if (!res.success) throw new Error(res.message);
    return res.data;
  }

  async markAsRead(notifId: number): Promise<void> {
    const url = SERVER.notifications.markAsRead.replace(':id', String(notifId));
    const { data: res } = await apiClient.put<ApiResponse<null>>(url);
    if (!res.success) throw new Error(res.message);
  }

  async markAllAsRead(): Promise<void> {
    const { data: res } = await apiClient.put<ApiResponse<null>>(
      SERVER.notifications.markAllAsRead,
    );
    if (!res.success) throw new Error(res.message);
  }
}

export const notificationService = new NotificationService();
