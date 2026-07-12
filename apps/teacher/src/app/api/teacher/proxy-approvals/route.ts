import { NextResponse } from 'next/server';
import { proxyAuthorizations, updateProxyStatus } from './mockDb';

export async function GET() {
  // Lấy toàn bộ đơn đón hộ (để phục vụ cả tab Chờ duyệt và Lịch sử ở Client)
  return NextResponse.json({
    ok: true,
    data: proxyAuthorizations
  });
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { authorizationId, status } = body;

    if (!authorizationId || !['Approved', 'Rejected'].includes(status)) {
      return NextResponse.json({ ok: false, error: 'Thiếu dữ liệu hoặc trạng thái không hợp lệ' }, { status: 400 });
    }

    const authItem = proxyAuthorizations.find(p => p.AuthorizationID === Number(authorizationId));
    if (!authItem) {
      return NextResponse.json({ ok: false, error: 'Không tìm thấy đơn đăng ký' }, { status: 404 });
    }

    // Guard: only Pending records can be processed
    if (authItem.Status !== 'Pending') {
      return NextResponse.json(
        { ok: false, error: 'Đơn đăng ký này đã được xử lý hoặc hủy trước đó' },
        { status: 409 } // 409 Conflict is more accurate for state transition errors
      );
    }

    // Extract mock teacher ID from header (real BE extracts from JWT)
    const teacherId = Number(request.headers.get('x-teacher-id') || 5);

    const success = updateProxyStatus(Number(authorizationId), status, teacherId);
    if (success) {
      console.log(`[Proxy API] Successfully updated Authorization ${authorizationId} to ${status}`);
      
      // MOCK: Gửi thông báo đến phụ huynh
      console.log(`[Mock Notification] Pushed notification to Parent ${authItem.ParentID}: "Yêu cầu đón hộ cho bé ${authItem.StudentName} đã được giáo viên ${status === 'Approved' ? 'Duyệt' : 'Từ chối'}."`);
      
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: false, error: 'Cập nhật trạng thái thất bại' }, { status: 500 });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
