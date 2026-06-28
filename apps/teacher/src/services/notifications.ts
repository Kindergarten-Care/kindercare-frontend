import { apiClient } from '@kindercare/core';

export interface NotificationItem {
  id: string | number;
  type: 'alert' | 'event' | 'message' | 'default';
  title: string;
  message: string;
  time: string;
  isUnread: boolean;
}

export class NotificationService {
  public static async getNotifications(): Promise<NotificationItem[]> {
    try {
      const res = await apiClient.get('/teacher/notifications');
      if (res.data?.data && Array.isArray(res.data.data)) {
        return res.data.data.map((n: any) => ({
          id: n.notifId || n.id,
          type: n.type?.toLowerCase() || 'default',
          title: n.title,
          message: n.message,
          time: new Date(n.createdAt * 1000).toLocaleString('vi-VN') || 'Vừa xong',
          isUnread: !n.isRead
        }));
      }
      return [];
    } catch (error) {
      // Return empty array if API fails
      return [];
    }
  }

  public static async markAsRead(id: string | number): Promise<boolean> {
    try {
      await apiClient.put(`/teacher/notifications/${id}/read`);
      return true;
    } catch (error) {
      return false;
    }
  }

  public static async markAllAsRead(): Promise<boolean> {
    try {
      await apiClient.put('/teacher/notifications/read-all');
      return true;
    } catch (error) {
      return false;
    }
  }
}
