export const getFormattedDate = () => {
  try {
    const formatter = new Intl.DateTimeFormat('sv-SE', {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
    });
    return formatter.format(new Date()) + ' (GMT +07:00)';
  } catch (e) {
    return new Date().toISOString().replace('T', ' ').substring(0, 19) + ' (GMT +00:00)';
  }
};

export const formatTimestamp = (ts: bigint | number | null | undefined): string => {
  if (!ts) return 'Chưa cập nhật';
  return new Date(Number(ts) * 1000).toLocaleDateString('vi-VN');
};

export const formatTimestampMs = (ms: number | null | undefined): string => {
  if (!ms) return 'Chưa cập nhật';
  return new Date(Number(ms)).toLocaleDateString('vi-VN');
};
