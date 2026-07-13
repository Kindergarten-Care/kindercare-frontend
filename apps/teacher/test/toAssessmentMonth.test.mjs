/**
 * Test toAssessmentMonth() — verify FE parse YYYY-MM (BE DevelopmentAssessments.TermPeriod).
 *
 * Background: DB `DevelopmentAssessments.TermPeriod` lưu dạng `YYYY-MM` (vd "2026-07").
 * FE cũng dùng YYYY-MM → không cần convert. `toAssessmentMonth()` chỉ normalize edge cases.
 */
function toAssessmentMonth(input) {
  if (!input) return currentMonthYYYY();
  if (input instanceof Date) {
    const y = input.getFullYear();
    const m = input.getMonth() + 1;
    return `${y}-${String(m).padStart(2, '0')}`;
  }
  if (/^\d{4}-(0?[1-9]|1[0-2])$/.test(input)) {
    const [yy, mm] = input.split('-').map(Number);
    return `${yy}-${String(mm).padStart(2, '0')}`;
  }
  return currentMonthYYYY();
}

function currentMonthYYYY() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

let pass = 0, fail = 0;
function expect(name, actual, expected) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a === e) { console.log(`✅ ${name}`); pass++; }
  else { console.log(`❌ ${name}\n   expected: ${e}\n   actual:   ${a}`); fail++; }
}

console.log('── toAssessmentMonth (BE TermPeriod YYYY-MM) ──');
expect('1. YYYY-MM chuẩn → giữ nguyên',
  toAssessmentMonth('2026-07'), '2026-07');
expect('2. YYYY-M (1 chữ số) → pad thành 2026-07',
  toAssessmentMonth('2026-7'), '2026-07');
expect('3. Tháng 12 (edge)',
  toAssessmentMonth('2025-12'), '2025-12');
expect('4. Tháng 1 (single digit MM)',
  toAssessmentMonth('2026-1'), '2026-01');
expect('5. Date object → YYYY-MM',
  toAssessmentMonth(new Date(2026, 6, 13)), '2026-07');
expect('6. undefined → tháng hiện tại',
  toAssessmentMonth(undefined), currentMonthYYYY());
expect('7. string rỗng → tháng hiện tại',
  toAssessmentMonth(''), currentMonthYYYY());
expect('8. Format lạ → tháng hiện tại',
  toAssessmentMonth('abc'), currentMonthYYYY());
expect('9. Format MM-YYYY (cũ) KHÔNG còn hỗ trợ → fallback current month',
  toAssessmentMonth('07-2026'), currentMonthYYYY());

console.log('\n' + '='.repeat(60));
console.log(`✅ PASS: ${pass}   ❌ FAIL: ${fail}`);
console.log('='.repeat(60));
process.exit(fail > 0 ? 1 : 0);