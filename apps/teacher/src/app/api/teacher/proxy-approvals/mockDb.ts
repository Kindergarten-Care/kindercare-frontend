export type ProxyStatus = 'Pending' | 'Approved' | 'Rejected';

export interface ProxyAuthorization {
  AuthorizationID: number;
  StudentID: number;
  StudentName: string;
  ParentID: number;
  ParentName: string;
  AuthorizationDate: string;
  ProxyName: string;
  ProxyPhone: string;
  ProxyIDCard: string;
  ProxyPhotoURL: string;
  Notes: string;
  Status: ProxyStatus;
  CreatedAt: number;
  ProcessedBy?: number; // teacher ID
  ProcessedAt?: number; // Unix timestamp
}

export const proxyAuthorizations: ProxyAuthorization[] = [
  {
    AuthorizationID: 20001,
    StudentID: 101,
    StudentName: 'Nguyễn An',
    ParentID: 50,
    ParentName: 'Nguyễn Văn Hải',
    AuthorizationDate: '2026-07-13',
    ProxyName: 'Trần Văn Hùng (Chú bé)',
    ProxyPhone: '0912345678',
    ProxyIDCard: '030095012345',
    ProxyPhotoURL: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    Notes: 'Nhờ chú đón bé lúc 16h30 vì bố mẹ bận họp.',
    Status: 'Pending',
    CreatedAt: Date.now() - 3600000,
  },
  {
    AuthorizationID: 20002,
    StudentID: 102,
    StudentName: 'Lê Bình',
    ParentID: 51,
    ParentName: 'Lê Quốc Bảo',
    AuthorizationDate: '2026-07-13',
    ProxyName: 'Nguyễn Thị Hoa (Dì ruột)',
    ProxyPhone: '0987654321',
    ProxyIDCard: '030095054321',
    ProxyPhotoURL: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    Notes: 'Dì Hoa có mang theo căn cước công dân đối chiếu.',
    Status: 'Pending',
    CreatedAt: Date.now() - 1800000,
  },
  {
    AuthorizationID: 20003,
    StudentID: 103,
    StudentName: 'Phạm Mai',
    ParentID: 52,
    ParentName: 'Phạm Thị Lan',
    AuthorizationDate: '2026-07-10',
    ProxyName: 'Bà Nguyễn Thị B',
    ProxyPhone: '0909123456',
    ProxyIDCard: '030095067890',
    ProxyPhotoURL: '/uploads/proxy-photos/proxy-20003.jpg', // relative path — FE must normalize
    Notes: 'Bà đón cháu về chơi cuối tuần.',
    Status: 'Approved',
    CreatedAt: Date.now() - 86400000,
    ProcessedBy: 5,
    ProcessedAt: Date.now() - 82800000,
  },
];

/**
 * Guard: only allow transition when Status === 'Pending'.
 * Returns true if update succeeded, false otherwise.
 */
export function updateProxyStatus(
  id: number,
  status: 'Approved' | 'Rejected',
  processedBy?: number
): boolean {
  const item = proxyAuthorizations.find((p) => p.AuthorizationID === id);
  if (!item) return false;
  if (item.Status !== 'Pending') return false;

  item.Status = status;
  item.ProcessedBy = processedBy;
  item.ProcessedAt = Date.now();
  return true;
}
