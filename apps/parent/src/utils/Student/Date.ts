/**
 * Formats a BigInt Unix epoch timestamp (in seconds) to a Vietnamese date string (dd/mm/yyyy).
 */
export const formatDateFromBigInt = (timestamp: bigint | null | undefined): string => {
  if (!timestamp || timestamp === BigInt(0)) return '--';
  const date = new Date(Number(timestamp) * 1000);
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

/**
 * Converts a Unix epoch timestamp (in seconds, as bigint) to "HH:mm" string.
 */
export const tsToHHMM = (ts: bigint): string => {
  const d = new Date(Number(ts) * 1000);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

/**
 * Returns the current month in "YYYY-MM" format for assessment API queries,
 * matching the AssessmentMonth column format returned by the backend.
 */
export const currentMonthParam = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
};
