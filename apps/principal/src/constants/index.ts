export const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

export const STATUS_OPTIONS = [
  { value: 'all', label: 'Tất cả trạng thái' },
  { value: 'active', label: 'Đang hoạt động' },
  { value: 'inactive', label: 'Đã khóa' },
] as const;

export const ACCOUNT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;

export const ACCOUNT_STATUS_TEXT: Record<string, string> = {
  active: 'Hoạt động',
  inactive: 'Đã khóa',
};

export const ENROLLMENT_STATUS_TEXT: Record<string, string> = {
  ACTIVE: 'Đang học',
  TRANSFERRED: 'Chuyển lớp',
  INACTIVE: 'Nghỉ học',
  PENDING: 'Chờ xếp lớp',
};

export const UNASSIGNED_CLASS_PLACEHOLDER = 'Chờ xếp lớp';

export const TEACHER_ROLES_IN_CLASS = [
  { value: 'Giáo viên chủ nhiệm', label: 'Giáo viên chủ nhiệm' },
  { value: 'Giáo viên phụ', label: 'Giáo viên phụ' },
] as const;

export const ITEMS_PER_PAGE = 10;
