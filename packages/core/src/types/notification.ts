export type NotificationType = 'ATTENDANCE' | 'LEAVE_REQUEST' | 'HEALTH_ALERT' | string;

export interface NotificationDto {
  NotifID:     number;
  UserID:      number;
  Title:       string;
  Message:     string;
  Type:        NotificationType;
  IsRead:      0 | 1;
  IsCritical:  0 | 1;
  DataPayload: string;
  CreatedAt:   number;
  UpdatedAt:   number;
}
