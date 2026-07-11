/**
 * Test fixImageUrl logic. Run: node apps/teacher/test/fixImageUrl.test.mjs
 */

// Copy of helper (FE source uses TS, this is plain JS)
function fixImageUrl(url) {
  if (!url || typeof url !== 'string' || url.trim() === '') return undefined;
  if (/^(https?:|data:)/i.test(url)) return url;
  const apiBase =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_API_BASE ||
    'https://web-test.kindercare.app/api/v1';
  const host = apiBase.split('/api')[0];
  const cleaned = url.replace(/^\/+/, '');
  return `${host}/${cleaned}`;
}

let pass = 0, fail = 0;
function expect(name, actual, expected) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a === e) { console.log(`✅ ${name}`); pass++; }
  else { console.log(`❌ ${name}\n   expected: ${e}\n   actual:   ${a}`); fail++; }
}

console.log('── fixImageUrl tests ──');
expect('1. Full URL http → giữ nguyên',
  fixImageUrl('http://cdn.example.com/x.jpg'),
  'http://cdn.example.com/x.jpg');
expect('2. Full URL https → giữ nguyên',
  fixImageUrl('https://cdn.example.com/x.jpg'),
  'https://cdn.example.com/x.jpg');
expect('3. Relative path /uploads/abc.jpg → nối host',
  fixImageUrl('/uploads/students/abc.jpg'),
  'https://web-test.kindercare.app/uploads/students/abc.jpg');
expect('4. Relative không có / đầu → vẫn nối host',
  fixImageUrl('uploads/abc.jpg'),
  'https://web-test.kindercare.app/uploads/abc.jpg');
expect('5. data URI → giữ nguyên',
  fixImageUrl('data:image/png;base64,iVBOR...'),
  'data:image/png;base64,iVBOR...');
expect('6. undefined → undefined',
  fixImageUrl(undefined),
  undefined);
expect('7. null → undefined',
  fixImageUrl(null),
  undefined);
expect('8. empty string → undefined',
  fixImageUrl(''),
  undefined);
expect('9. whitespace → undefined',
  fixImageUrl('   '),
  undefined);
expect('10. number → undefined (defensive)',
  fixImageUrl(123),
  undefined);

// Test với env override
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:8080/api/v1';
expect('11. với env override → nối localhost:8080',
  fixImageUrl('/uploads/abc.jpg'),
  'http://localhost:8080/uploads/abc.jpg');

delete process.env.NEXT_PUBLIC_API_URL;
process.env.NEXT_PUBLIC_API_BASE = 'http://localhost:3000/api';
expect('12. với NEXT_PUBLIC_API_BASE → nối localhost:3000',
  fixImageUrl('/uploads/abc.jpg'),
  'http://localhost:3000/uploads/abc.jpg');

// Edge cases
expect('13. URL có ký tự đặc biệt query string → giữ nguyên',
  fixImageUrl('https://cdn.com/x.jpg?v=123&t=abc'),
  'https://cdn.com/x.jpg?v=123&t=abc');

// Test với env riêng từng case (delete trên process.env không clean triệt để)
delete process.env.NEXT_PUBLIC_API_URL;
delete process.env.NEXT_PUBLIC_API_BASE;
expect('14. URL relative có query string (sau khi clear env)',
  fixImageUrl('/uploads/abc.jpg?v=1'),
  'https://web-test.kindercare.app/uploads/abc.jpg?v=1');
expect('15. URL relative có hash fragment (sau khi clear env)',
  fixImageUrl('/uploads/abc.jpg#main'),
  'https://web-test.kindercare.app/uploads/abc.jpg#main');

console.log('\n' + '='.repeat(60));
console.log(`✅ PASS: ${pass}   ❌ FAIL: ${fail}`);
console.log('='.repeat(60));
process.exit(fail > 0 ? 1 : 0);