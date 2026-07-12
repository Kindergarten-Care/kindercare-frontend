export interface MockNotification {
  NotificationID: number;
  SenderID: number;
  ReceiverID: number;
  Type: 'LEAVE' | 'MEDICAL' | 'OTHER';
  Message: string;
  IsRead: number;
  CreatedAt: number;
}

export const notifications: MockNotification[] = [
  {
    NotificationID: 10001,
    SenderID: 201,
    ReceiverID: 5, // Trùng với ID giáo viên demo (hoặc tự động khớp)
    Type: 'LEAVE',
    Message: 'Phụ huynh bé Nguyễn An gửi đơn xin nghỉ phép ngày 13/07.',
    IsRead: 0,
    CreatedAt: Date.now() - 60000
  },
  {
    NotificationID: 10002,
    SenderID: 202,
    ReceiverID: 5,
    Type: 'MEDICAL',
    Message: 'Phụ huynh bé Lê Bình gửi dặn thuốc uống buổi trưa.',
    IsRead: 0,
    CreatedAt: Date.now() - 30000
  }
];

export let lastMockGenerated = Date.now();

export function generateMockIfNeeded(teacherId: number) {
  // Cứ sau 30 giây polling, tự sinh ra một thông báo đơn mới để demo
  if (Date.now() - lastMockGenerated > 30000) {
    const newId = Date.now();
    const type = Math.random() > 0.5 ? 'LEAVE' : 'MEDICAL';
    const msg = type === 'LEAVE'
      ? `Phụ huynh bé Trần Chi vừa gửi đơn xin nghỉ phép mới lúc ${new Date().toLocaleTimeString('vi-VN')}.`
      : `Phụ huynh bé Hoàng Dũng gửi dặn thuốc uống sau ăn trưa lúc ${new Date().toLocaleTimeString('vi-VN')}.`;

    notifications.push({
      NotificationID: newId,
      SenderID: 203,
      ReceiverID: teacherId,
      Type: type,
      Message: msg,
      IsRead: 0,
      CreatedAt: Date.now()
    });
    lastMockGenerated = Date.now();
    console.log(`[Mock DB] Automatically generated new ${type} notification for teacher ${teacherId}`);
  }
}
