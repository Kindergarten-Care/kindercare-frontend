/**
 * Lấy tên (chữ cuối) từ họ tên đầy đủ.
 * Ví dụ: "Hồ Công Danh" → "Danh"
 */
export function getFirstName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  return parts[parts.length - 1] ?? fullName;
}

/**
 * Lấy chữ viết tắt cuối họ tên.
 * Ví dụ: "Nguyễn Thị Lan" → "L"
 */
export function getLastNameInitial(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  return parts[parts.length - 1]?.[0]?.toUpperCase() ?? '?';
}

/**
 * Lấy 2 chữ viết tắt của học sinh.
 * Ví dụ: "Nguyễn Công Danh" → "CD"
 */
export function getStudentInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length >= 2) {
    const last = parts[parts.length - 1]?.[0]?.toUpperCase() ?? '';
    const beforeLast = parts[parts.length - 2]?.[0]?.toUpperCase() ?? '';
    return beforeLast + last;
  }
  return parts[0]?.[0]?.toUpperCase() ?? 'K';
}

/**
 * Tạo tên hiển thị theo format "Quan hệ Tên".
 * Ví dụ: rel="Bố", fullName="Hồ Công Danh" → "Bố Danh"
 * Nếu không có quan hệ hợp lệ → trả về fullName.
 * Nếu không có dữ liệu → "Chưa ghi nhận"
 */
const GENERIC_RELATIONSHIPS = ['Người đưa đi', 'Người đón hộ', 'Phụ huynh'];

export function formatPersonName(
  fullName: string | null | undefined,
  relationship: string | null | undefined,
  fallback = 'Chưa ghi nhận'
): string {
  if (!fullName) return fallback;
  if (relationship && !GENERIC_RELATIONSHIPS.includes(relationship)) {
    return `${relationship} ${getFirstName(fullName)}`;
  }
  return fullName;
}

/**
 * Lấy chữ viết tắt avatar dựa trên quan hệ hoặc tên.
 * Ví dụ: rel="Bố" → "B", rel=null + name="Danh" → "D"
 */
export function formatPersonInitial(
  fullName: string | null | undefined,
  relationship: string | null | undefined,
  fallback = '—'
): string {
  if (!fullName) return fallback;
  if (relationship && !GENERIC_RELATIONSHIPS.includes(relationship)) {
    return relationship.charAt(0).toUpperCase();
  }
  return fullName.charAt(0).toUpperCase();
}
