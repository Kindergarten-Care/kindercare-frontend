/**
 * Formats a BigInt Unix epoch timestamp (in seconds) to a Vietnamese date string (dd/mm/yyyy).
 */
export const formatDateFromBigInt = (timestamp: bigint | null | undefined): string => {
  if (!timestamp || timestamp === 0n) return '--';
  const date = new Date(Number(timestamp) * 1000);
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};
