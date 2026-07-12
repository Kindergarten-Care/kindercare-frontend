import { NextResponse } from 'next/server';
import { notifications } from '../mockDb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { notificationIds } = body;
    
    if (Array.isArray(notificationIds)) {
      notificationIds.forEach(id => {
        const notif = notifications.find(n => n.NotificationID === id);
        if (notif) notif.IsRead = 1;
      });
      console.log(`[Mock DB] Marked notifications as read:`, notificationIds);
    }
    
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 400 });
  }
}
