import { NextResponse } from 'next/server';
import { notifications, generateMockIfNeeded } from '../mockDb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const teacherId = searchParams.get('teacherId');
  const tIdNum = teacherId ? Number(teacherId) : 5; // Default demo teacher ID

  // Tự động sinh thêm đơn mới nếu cần thiết
  generateMockIfNeeded(tIdNum);

  // Lọc thông báo chưa đọc của teacher tương ứng
  const unread = notifications.filter(n => n.IsRead === 0 && n.ReceiverID === tIdNum);
  
  return NextResponse.json({
    ok: true,
    data: unread
  });
}
