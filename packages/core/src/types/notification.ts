export type NotificationType = 'ATTENDANCE' | 'LEAVE_REQUEST' | 'HEALTH_ALERT' | string;

export interface NotificationDto {
  notifId:     number;
  userId:      number;
  title:       string;
  message:     string;
  type:        NotificationType;
  isRead:      0 | 1;
  isCritical:  0 | 1;
  dataPayload: Record<string, string>;
  createdAt:   number;
  updatedAt:   number;
}
