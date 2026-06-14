/**
 * Formats a BigInt Unix epoch timestamp (in seconds) to a Vietnamese date string (dd/mm/yyyy).
 */
export const formatDateFromBigInt = (timestamp: bigint): string => {
  const date = new Date(Number(timestamp) * 1000);
  return date.toLocaleDateString('vi-VN', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
};
