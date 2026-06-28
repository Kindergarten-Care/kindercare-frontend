/**
 * Helper to determine BMI classification and styling badge type.
 */
export const getBmiStatus = (bmiValue: number): { label: string; type: 'success' | 'warn' } => {
  if (bmiValue < 14) return { label: 'Thiếu cân', type: 'warn' };
  if (bmiValue > 17) return { label: 'Thừa cân', type: 'warn' };
  return { label: 'Cân đối', type: 'success' };
};

/**
 * Returns formatted difference label between current and previous measurements.
 */
export const getDiffLabel = (
  diff: number | null,
  isWeight: boolean,
  shortMonth?: string
): string => {
  if (diff === null) return 'Mới cập nhật';
  const sign = diff >= 0 ? '+' : '';
  const unit = isWeight ? 'kg' : 'cm';
  const suffix = shortMonth ? ` (${shortMonth})` : '';
  return `${sign}${diff.toFixed(1)} ${unit}${suffix}`;
};

/**
 * Formats a raw termPeriod (e.g. "2026-06") to localized month format.
 * E.g., "2026-06" -> { month: "Tháng 6", shortMonth: "T6" }
 */
export const formatTermPeriod = (termPeriod: string): { month: string; shortMonth: string } => {
  const parts = termPeriod.split('-');
  const monthNum = parts.length >= 2 ? parseInt(parts[1], 10) : 0;
  return {
    month: monthNum > 0 ? `Tháng ${monthNum}` : termPeriod,
    shortMonth: monthNum > 0 ? `T${monthNum}` : termPeriod,
  };
};

/**
 * Formats a raw termPeriod (e.g. "2026-06") to latest update date string.
 * E.g., "2026-06" -> "06/2026"
 */
export const formatLatestUpdate = (termPeriod: string): string => {
  const parts = termPeriod.split('-');
  return parts.length >= 2 ? `${parts[1]}/${parts[0]}` : termPeriod;
};
