/**
 * FE validation unit test — chạy bằng: npx ts-node test/validateUpsertBody.test.ts
 *
 * Verify các rule:
 *   1. Body hợp lệ (đủ 3 score bắt buộc + 2 optional + note) → ok
 *   2. Body thiếu 1 trong 3 score bắt buộc → fail với message đúng field
 *   3. Body có score > 10 hoặc < 1 → fail
 *   4. Body có emotional/social/overallNote optional → vẫn ok, payload sạch
 *   5. Body có local-only field (socioEmotional/aesthetic/lifeSkill) → payload sạch (không gửi)
 *   6. termPeriod thiếu hoặc sai format → fail
 *   7. items rỗng → fail
 *   8. Score không phải integer (vd 7.5) → fail
 *
 * Nếu tất cả pass → output "✅ ALL PASSED".
 */

import { validateUpsertBody, validateAssessmentItem } from '../src/config/validations/assessment';

let pass = 0;
let fail = 0;

function expect(name: string, actual: unknown, expected: unknown) {
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

// ── 1. Body hợp lệ (đủ 5 scores + note) ─────────────────────────────────
{
  const r = validateUpsertBody({
    termPeriod: '2026-07',
    items: [{
      studentId: 1,
      physicalScore: 8,
      cognitiveScore: 9,
      languageScore: 7,
      emotionalScore: 8,
      socialScore: 9,
      overallNote: 'Bé tiến bộ rõ rệt.',
    }],
  });
  expect('1. Body hợp lệ với 5 scores + note → ok=true', r.ok, true);
  expect('1.1 Payload cleaned chỉ giữ field BE hỗ trợ',
    Object.keys((r.data!.items[0] as any)).sort(),
    ['cognitiveScore', 'emotionalScore', 'languageScore', 'overallNote', 'physicalScore', 'socialScore', 'studentId']);
}

// ── 2. Thiếu 1 trong 3 score bắt buộc ────────────────────────────────────
{
  const r = validateUpsertBody({
    termPeriod: '2026-07',
    items: [{ studentId: 1, physicalScore: 8, cognitiveScore: 9 /* thiếu languageScore */ }],
  });
  expect('2. Body thiếu languageScore → ok=false', r.ok, false);
  expect('2.1 Có lỗi nhắc đúng field',
    Boolean(r.errors['items[0]']?.includes('languageScore')),
    true);
}

// ── 3. Score > 10 hoặc < 1 ───────────────────────────────────────────────
{
  const r = validateUpsertBody({
    termPeriod: '2026-07',
    items: [{ studentId: 1, physicalScore: 15, cognitiveScore: 9, languageScore: 7 }],
  });
  expect('3. Body có physicalScore=15 → ok=false', r.ok, false);
  expect('3.1 Error message nhắc đến 10',
    Boolean(r.errors['items[0]']?.includes('10')),
    true);
}
{
  const r = validateUpsertBody({
    termPeriod: '2026-07',
    items: [{ studentId: 1, physicalScore: 0, cognitiveScore: 9, languageScore: 7 }],
  });
  expect('3.2 Body có physicalScore=0 → ok=false', r.ok, false);
}

// ── 4. emotional/social/overallNote optional → vẫn ok ────────────────────
{
  const r = validateUpsertBody({
    termPeriod: '2026-07',
    items: [{ studentId: 1, physicalScore: 8, cognitiveScore: 9, languageScore: 7 }],
  });
  expect('4. Body không có emotionalScore/socialScore/overallNote → ok=true', r.ok, true);
  expect('4.1 Payload không có emotionalScore/socialScore',
    Boolean((r.data!.items[0] as any).emotionalScore === undefined
        && (r.data!.items[0] as any).socialScore === undefined),
    true);
}

// ── 5. Local-only field bị loại khỏi payload ─────────────────────────────
{
  const r = validateUpsertBody({
    termPeriod: '2026-07',
    items: [{
      studentId: 1,
      physicalScore: 8,
      cognitiveScore: 9,
      languageScore: 7,
      socioEmotionalScore: 8, // local-only (UI merge)
      aestheticScore: 7,      // local-only
      lifeSkillScore: 9,      // local-only
    }],
  });
  expect('5. Body có local-only field → ok=true', r.ok, true);
  const payload = r.data!.items[0] as any;
  expect('5.1 socioEmotionalScore bị loại', payload.socioEmotionalScore, undefined);
  expect('5.2 aestheticScore bị loại', payload.aestheticScore, undefined);
  expect('5.3 lifeSkillScore bị loại', payload.lifeSkillScore, undefined);
}

// ── 6. termPeriod thiếu / sai format ─────────────────────────────────────
{
  const r = validateUpsertBody({
    items: [{ studentId: 1, physicalScore: 8, cognitiveScore: 9, languageScore: 7 }],
  });
  expect('6. Body thiếu termPeriod → ok=false', r.ok, false);
  expect('6.1 Lỗi có nhắc termPeriod', Boolean(r.errors.termPeriod), true);
}
{
  const r = validateUpsertBody({
    termPeriod: '07-2026', // sai format
    items: [{ studentId: 1, physicalScore: 8, cognitiveScore: 9, languageScore: 7 }],
  });
  expect('6.2 Body termPeriod sai format (MM-YYYY) → ok=false', r.ok, false);
}

// ── 7. items rỗng ────────────────────────────────────────────────────────
{
  const r = validateUpsertBody({ termPeriod: '2026-07', items: [] });
  expect('7. items rỗng → ok=false', r.ok, false);
}

// ── 8. Score không phải integer (vd 7.5) ─────────────────────────────────
{
  const r = validateUpsertBody({
    termPeriod: '2026-07',
    items: [{ studentId: 1, physicalScore: 7.5, cognitiveScore: 9, languageScore: 7 }],
  });
  expect('8. physicalScore=7.5 (không integer) → ok=false', r.ok, false);
}

// ── 9. overallNote > 500 ký tự → fail ───────────────────────────────────
{
  const r = validateUpsertBody({
    termPeriod: '2026-07',
    items: [{
      studentId: 1,
      physicalScore: 8,
      cognitiveScore: 9,
      languageScore: 7,
      overallNote: 'a'.repeat(501),
    }],
  });
  expect('9. overallNote > 500 chars → ok=false', r.ok, false);
}

// ── 10. validateAssessmentItem riêng lẻ ──────────────────────────────────
{
  const errs = validateAssessmentItem({
    studentId: 1, physicalScore: 8, cognitiveScore: 9, languageScore: 7,
  });
  expect('10. Item hợp lệ → errs rỗng', errs, []);
}
{
  const errs = validateAssessmentItem({
    studentId: 1, physicalScore: 11, cognitiveScore: 9, languageScore: 7,
  });
  expect('10.1 Item có physicalScore=11 → có lỗi', errs.length > 0, true);
  expect('10.2 Lỗi nhắc đến 10', errs.some(e => e.includes('10')), true);
}

// ─────────────────────────────────────────────────────────────────────────
console.log('');
console.log(`Pass: ${pass} | Fail: ${fail}`);
if (fail > 0) process.exit(1);