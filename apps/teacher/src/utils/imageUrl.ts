/**
 * Helper xử lý URL ảnh trả về từ BE.
 *
 * BE có thể trả về 3 format:
 *  1. Full URL      : "https://cdn.example.com/uploads/students/abc.jpg"
 *  2. Relative path : "/uploads/students/abc.jpg"
 *  3. data URI      : "data:image/png;base64,iVBORw0KGgo..."
 *
 * Helper này convert (2) thành (1) bằng cách nối với API host
 * (cắt phần `/api/...` ở cuối).
 *
 * Trả về:
 *  - Input undefined / empty / không phải string → undefined (để fallback về placeholder).
 *  - Đã là full URL hoặc data URI → giữ nguyên.
 *  - Relative path → nối với API host.
 *
 * @example
 *   fixImageUrl('https://cdn.example.com/x.jpg')  // → 'https://cdn.example.com/x.jpg'
 *   fixImageUrl('/uploads/abc.jpg')               // → 'http://localhost:8080/uploads/abc.jpg'
 *   fixImageUrl('data:image/png;base64,...')      // → 'data:image/png;base64,...'
 *   fixImageUrl('')                               // → undefined
 *   fixImageUrl(null)                             // → undefined
 */
export function fixImageUrl(url?: string | null): string | undefined {
  if (!url || typeof url !== 'string' || url.trim() === '') return undefined;

  // Đã là full URL (http/https) hoặc data URI → giữ nguyên
  if (/^(https?:|data:)/i.test(url)) return url;

  // Relative path → nối với API host
  const apiBase =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_API_BASE ||
    'https://web-test.kindercare.app/api/v1';

  // Cắt phần `/api/...` ở cuối để lấy origin
  const host = apiBase.split('/api')[0];
  const cleaned = url.replace(/^\/+/, '');
  return `${host}/${cleaned}`;
}

/**
 * Wrapper an toàn: luôn trả về string hợp lệ hoặc fallback.
 * Dùng khi UI cần src cho <img> (không thể là undefined).
 */
export function safeImageUrl(
  url: string | null | undefined,
  fallback = ''
): string {
  return fixImageUrl(url) ?? fallback;
}
