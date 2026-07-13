import { apiClient } from '@kindercare/core';

export type ProxyStatus = 'Pending' | 'Approved' | 'Rejected';

export interface ProxyAuthorization {
  authorizationId: number;
  studentId: number;
  studentName: string;
  parentId: number;
  parentName: string;
  authorizationDate: string;
  proxyName: string;
  proxyPhone: string;
  proxyIdCard: string;
  proxyPhotoUrl: string;
  notes: string;
  type: 'Checkin' | 'Checkout' | 'Both' | string;
  status: ProxyStatus;
  createdAt: number;
  processedBy?: number;
  processedAt?: number;
}

function normalizePhotoUrl(url: string | null | undefined): string {
  if (!url) return 'https://ui-avatars.com/api/?name=Unknown&background=e5e7eb&color=374151&size=150';
  if (url.startsWith('http') || url.startsWith('data:')) return url;
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://web-test.kindercare.app/api/v1';
  const host = apiBase.split('/api')[0];
  return `${host}/${url.replace(/^\//, '')}`;
}

function mapApiToDomain(raw: any): ProxyAuthorization {
  return {
    authorizationId: raw.authorizationId ?? raw.AuthorizationID ?? raw.id,
    studentId: raw.studentId ?? raw.StudentID,
    studentName: raw.studentName ?? raw.StudentName ?? 'Học sinh',
    parentId: raw.parentId ?? raw.ParentID,
    parentName: raw.parentName ?? raw.ParentName ?? 'Phụ huynh',
    authorizationDate: (() => {
      const d = raw.authorizationDate ?? raw.AuthorizationDate;
      if (!d) return '';
      const ts = Number(d);
      if (isNaN(ts) || ts <= 0) return d;
      const date = new Date(ts > 2000000000 ? ts : ts * 1000);
      return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    })(),
    proxyName: raw.proxyName ?? raw.ProxyName ?? 'Người đón',
    proxyPhone: raw.proxyPhone ?? raw.ProxyPhone ?? '',
    proxyIdCard: raw.proxyIdCard ?? raw.ProxyIDCard ?? '',
    proxyPhotoUrl: normalizePhotoUrl(raw.proxyPhotoUrl ?? raw.ProxyPhotoURL),
    notes: raw.notes ?? raw.Notes ?? '',
    type: raw.type ?? raw.Type ?? 'Both',
    status: raw.status ?? raw.Status ?? 'Pending',
    createdAt: raw.createdAt ?? raw.CreatedAt ?? Date.now(),
    processedBy: raw.processedBy ?? raw.ProcessedBy,
    processedAt: raw.processedAt ?? raw.ProcessedAt,
  };
}

export class ProxyAuthorizationService {
  /**
   * Fetch proxy authorizations.
   * @param status - Optional filter: 'Pending', 'Approved', 'Rejected'
   */
  public static async getAll(status?: ProxyStatus): Promise<ProxyAuthorization[]> {
    const params: Record<string, string> = {};
    if (status) params.status = status;

    const res = await apiClient.get('/teacher/proxy-approvals', { params });
    const list = res.data?.data || [];
    return (Array.isArray(list) ? list : []).map(mapApiToDomain);
  }

  /**
   * Process (approve/reject) a proxy authorization.
   */
  public static async process(
    authorizationId: number,
    status: 'Approved' | 'Rejected'
  ): Promise<boolean> {
    await apiClient.patch('/teacher/proxy-approvals', {
      authorizationId,
      status,
    });
    return true;
  }
}
