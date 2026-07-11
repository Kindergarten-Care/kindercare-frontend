/**
 * FE validation unit test — Node 22+ (no extra deps).
 * Chạy: node apps/teacher/test/validateUpsertBody.test.mjs
 *
 * Verify logic validateUpsertBody() / validateAssessmentItem() match với
 * BE contract (5 scores 1..10 + overallNote max 500).
 *
 * Implementation ở đây là 1 BẢN SAO đơn giản của source — mục đích chỉ để
 * tài liệu hóa rule. Khi cần test thật với source code thật, FE dev nên
 * chạy bằng vitest/jest (cài thêm dep).
 *
 * Khi chạy bằng Node, chỉ cần verify logic pass/fail.
 */

const ASSESSMENT_SCORE_MIN = 1;
const ASSESSMENT_SCORE_MAX = 10;
const MONTH_RE = /^\d{4}-(0[1-9]|1[0-2])$/;

const BE_REQUIRED_SCORE_KEYS = ['physicalScore', 'cognitiveScore', 'languageScore'];
const BE_OPTIONAL_SCORE_KEYS = ['emotionalScore', 'socialScore'];
const BE_OPTIONAL_TEXT_KEYS  = ['overallNote'];
const LOCAL_ONLY_KEYS        = ['aestheticScore', 'lifeSkillScore'];

function isScore(n) {
  return typeof n === 'number' && Number.isInteger(n) && n >= ASSESSMENT_SCORE_MIN && n <= ASSESSMENT_SCORE_MAX;
}
function isOptionalScore(n) {
  return n === undefined || n === null || isScore(n);
}
function isMonthReversed(s) {
  return typeof s === 'string' && MONTH_RE.test(s);
}

function validateAssessmentItem(input) {
  const errors = [];
  if (typeof input !== 'object' || input === null) return ['Phải là một object hợp lệ.'];
  const item = input;
  if (item.studentId === undefined || item.studentId === null || item.studentId === '') {
    errors.push('studentId là bắt buộc.');
  }
  for (const k of BE_REQUIRED_SCORE_KEYS) {
    if (!isScore(item[k])) errors.push(`${k} phải là số nguyên từ ${ASSESSMENT_SCORE_MIN} đến ${ASSESSMENT_SCORE_MAX}.`);
  }
  for (const k of BE_OPTIONAL_SCORE_KEYS) {
    if (!isOptionalScore(item[k])) errors.push(`${k} (tùy chọn) phải là số nguyên từ ${ASSESSMENT_SCORE_MIN} đến ${ASSESSMENT_SCORE_MAX} nếu có.`);
  }
  for (const k of BE_OPTIONAL_TEXT_KEYS) {
    const v = item[k];
    if (v === undefined || v === null) continue;
    if (typeof v !== 'string') errors.push(`${k} phải là chuỗi.`);
    else if (v.length > 500) errors.push(`${k} tối đa 500 ký tự.`);
  }
  return errors;
}

function validateUpsertBody(input) {
  const errors = {};
  if (typeof input !== 'object' || input === null) return { ok: false, errors: { _root: 'Body phải là object.' } };
  const body = input;
  if (typeof body.termPeriod !== 'string' || body.termPeriod === '') {
    errors.termPeriod = 'termPeriod là bắt buộc, định dạng YYYY-MM.';
  } else if (!isMonthReversed(body.termPeriod)) {
    errors.termPeriod = 'termPeriod phải có dạng YYYY-MM (vd "2026-07").';
  }
  if (!Array.isArray(body.items)) return { ok: false, errors: { ...{}, items: 'items phải là mảng.' } };
  if (body.items.length === 0) return { ok: false, errors: { ...{}, items: 'items không được rỗng — phải có ít nhất 1 học sinh.' } };

  const cleanedItems = [];
  body.items.forEach((raw, idx) => {
    const itemErrors = validateAssessmentItem(raw);
    if (itemErrors.length > 0) {
      errors[`items[${idx}]`] = itemErrors.join(' ');
    } else {
      const it = raw;
      const cleaned = { studentId: typeof it.studentId === 'string' ? Number(it.studentId) : it.studentId };
      for (const k of BE_REQUIRED_SCORE_KEYS) cleaned[k] = it[k];
      for (const k of BE_OPTIONAL_SCORE_KEYS) {
        if (typeof it[k] === 'number') cleaned[k] = it[k];
      }
      for (const k of BE_OPTIONAL_TEXT_KEYS) {
        if (typeof it[k] === 'string' && it[k].trim()) cleaned[k] = it[k].trim();
      }
      cleanedItems.push(cleaned);
    }
  });

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data: { items: cleanedItems, termPeriod: body.termPeriod }, errors: {} };
}

// ── Test runner ──────────────────────────────────────────────────────────
let pass = 0, fail = 0;
function expect(name, actual, expected) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a === e) {
    console.log(`✅ ${name}`);
    pass++;
  } else {
    console.log(`❌ ${name}`);
    console.log(`   expected: ${e}`);
    console.log(`   actual:   ${a}`);
    fail++;
  }
}

// ── Tests ────────────────────────────────────────────────────────────────
console.log('── 1. Body hợp lệ với 5 scores + note ──');
{
  const r = validateUpsertBody({
    termPeriod: '2026-07',
    items: [{
      studentId: 117, physicalScore: 4, cognitiveScore: 4, languageScore: 5,
      emotionalScore: 5, socialScore: 4, overallNote: 'Bé phát triển tốt.',
    }],
  });
  expect('1.1 ok=true', r.ok, true);
  expect('1.2 Payload cleaned chỉ giữ field BE hỗ trợ',
    Object.keys(r.data.items[0]).sort(),
    ['cognitiveScore', 'emotionalScore', 'languageScore', 'overallNote', 'physicalScore', 'socialScore', 'studentId']);
}

console.log('\n── 2. Thiếu 1 trong 3 score bắt buộc ──');
{
  const r = validateUpsertBody({
    termPeriod: '2026-07',
    items: [{ studentId: 117, physicalScore: 4, cognitiveScore: 4 }],
  });
  expect('2.1 ok=false', r.ok, false);
  expect('2.2 Có lỗi nhắc languageScore', Boolean(r.errors['items[0]']?.includes('languageScore')), true);
}

console.log('\n── 3. Score ngoài range 1..10 ──');
{
  const r1 = validateUpsertBody({
    termPeriod: '2026-07',
    items: [{ studentId: 1, physicalScore: 15, cognitiveScore: 9, languageScore: 7 }],
  });
  expect('3.1 physicalScore=15 → ok=false', r1.ok, false);
  expect('3.2 Error nhắc 10', Boolean(r1.errors['items[0]']?.includes('10')), true);

  const r2 = validateUpsertBody({
    termPeriod: '2026-07',
    items: [{ studentId: 1, physicalScore: 0, cognitiveScore: 9, languageScore: 7 }],
  });
  expect('3.3 physicalScore=0 → ok=false', r2.ok, false);

  const r3 = validateUpsertBody({
    termPeriod: '2026-07',
    items: [{ studentId: 1, physicalScore: -3, cognitiveScore: 9, languageScore: 7 }],
  });
  expect('3.4 physicalScore=-3 → ok=false', r3.ok, false);
}

console.log('\n── 4. emotional/social/overallNote optional ──');
{
  const r = validateUpsertBody({
    termPeriod: '2026-07',
    items: [{ studentId: 117, physicalScore: 4, cognitiveScore: 4, languageScore: 5 }],
  });
  expect('4.1 Body không có optional → ok=true', r.ok, true);
  expect('4.2 Payload không có emotionalScore', r.data.items[0].emotionalScore, undefined);
  expect('4.3 Payload không có socialScore', r.data.items[0].socialScore, undefined);
  expect('4.4 Payload không có overallNote', r.data.items[0].overallNote, undefined);
}

console.log('\n── 5. Local-only field bị loại ──');
{
  const r = validateUpsertBody({
    termPeriod: '2026-07',
    items: [{
      studentId: 117, physicalScore: 4, cognitiveScore: 4, languageScore: 5,
      // 2 field local-only (DB DevelopmentAssessments chưa có cột)
      aestheticScore: 7, lifeSkillScore: 9,
    }],
  });
  expect('5.1 ok=true', r.ok, true);
  expect('5.2 aestheticScore bị loại', r.data.items[0].aestheticScore, undefined);
  expect('5.3 lifeSkillScore bị loại', r.data.items[0].lifeSkillScore, undefined);
}

console.log('\n── 6. termPeriod validation ──');
{
  const r1 = validateUpsertBody({
    items: [{ studentId: 1, physicalScore: 8, cognitiveScore: 9, languageScore: 7 }],
  });
  expect('6.1 Thiếu termPeriod → ok=false', r1.ok, false);

  const r2 = validateUpsertBody({
    termPeriod: '07-2026',
    items: [{ studentId: 1, physicalScore: 8, cognitiveScore: 9, languageScore: 7 }],
  });
  expect('6.2 termPeriod sai format → ok=false', r2.ok, false);

  const r3 = validateUpsertBody({
    termPeriod: '2026-13',
    items: [{ studentId: 1, physicalScore: 8, cognitiveScore: 9, languageScore: 7 }],
  });
  expect('6.3 termPeriod tháng 13 → ok=false', r3.ok, false);
}

console.log('\n── 7. items rỗng ──');
{
  const r = validateUpsertBody({ termPeriod: '2026-07', items: [] });
  expect('7.1 items rỗng → ok=false', r.ok, false);
}

console.log('\n── 8. Score không integer ──');
{
  const r = validateUpsertBody({
    termPeriod: '2026-07',
    items: [{ studentId: 1, physicalScore: 7.5, cognitiveScore: 9, languageScore: 7 }],
  });
  expect('8.1 physicalScore=7.5 → ok=false', r.ok, false);
}

console.log('\n── 9. overallNote > 500 chars ──');
{
  const r = validateUpsertBody({
    termPeriod: '2026-07',
    items: [{
      studentId: 1, physicalScore: 8, cognitiveScore: 9, languageScore: 7,
      overallNote: 'a'.repeat(501),
    }],
  });
  expect('9.1 overallNote > 500 → ok=false', r.ok, false);
}

console.log('\n── 10. Multi-item (cả lớp) ──');
{
  const r = validateUpsertBody({
    termPeriod: '2026-07',
    items: [
      { studentId: 117, physicalScore: 4, cognitiveScore: 4, languageScore: 5, emotionalScore: 5, socialScore: 4 },
      { studentId: 109, physicalScore: 3, cognitiveScore: 3, languageScore: 4 },
      { studentId: 107, physicalScore: 5, cognitiveScore: 5, languageScore: 4, overallNote: 'Bé năng động' },
    ],
  });
  expect('10.1 3 items hợp lệ → ok=true', r.ok, true);
  expect('10.2 items count = 3', r.data.items.length, 3);
  expect('10.3 item[0] có emotional+social', Boolean(r.data.items[0].emotionalScore && r.data.items[0].socialScore), true);
  expect('10.4 item[1] không có overallNote', r.data.items[1].overallNote, undefined);
  expect('10.5 item[2] overallNote="Bé năng động"', r.data.items[2].overallNote, 'Bé năng động');
}

console.log('\n' + '='.repeat(60));
console.log(`✅ PASS: ${pass}   ❌ FAIL: ${fail}`);
console.log('='.repeat(60));
process.exit(fail > 0 ? 1 : 0);