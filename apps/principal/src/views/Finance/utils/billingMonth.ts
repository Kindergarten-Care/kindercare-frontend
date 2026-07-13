const MONTH_LABELS = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
];

/** "08-2026" -> { month: 7 (0-indexed), year: 2026 } */
export function billingMonthToMonthYear(billingMonth: string): { month: number; year: number } {
  const [mm, yyyy] = billingMonth.split('-');
  return { month: Number(mm) - 1, year: Number(yyyy) };
}

/** month: 0-indexed -> "08-2026" */
export function monthYearToBillingMonth(month: number, year: number): string {
  return `${String(month + 1).padStart(2, '0')}-${year}`;
}

/** "08-2026" -> "Tháng 8/2026" */
export function formatBillingMonth(billingMonth: string): string {
  const { month, year } = billingMonthToMonthYear(billingMonth);
  return `${MONTH_LABELS[month]}/${year}`;
}

export function currentBillingMonth(): string {
  const now = new Date();
  return monthYearToBillingMonth(now.getMonth(), now.getFullYear());
}
