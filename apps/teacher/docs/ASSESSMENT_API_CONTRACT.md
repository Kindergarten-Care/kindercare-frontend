# Plan cho BE Dev — Đánh giá định kỳ học sinh

> **Người nhận**: Backend dev (NestJS / Express / Next.js API Routes / Strapi...).
> **Người gửi**: Frontend team.
> **Ngày tạo**: 12/07/2026 (cập nhật: 12/07/2026 02:45 — chốt dùng `DevelopmentAssessments`).
> **Mục đích**: hoàn thiện tính năng "Đánh giá định kỳ học sinh" 6 tiêu chí, dùng bảng **`DevelopmentAssessments`** (bảng riêng cho "Đánh giá phát triển", schema đã có sẵn).
>
> ⚠️ File này đồng thời là **API contract** giữa FE ↔ BE. Gửi cho BE dev khi ready.

---

## Tóm tắt nhanh

FE đã build xong UI + form 6 tiêu chí + radar chart + service kết nối BE. Hiện đang kết nối được **3/6 tiêu chí** (Thể chất / Nhận thức / Ngôn ngữ) + chưa có endpoint history. BE cần làm **2 task** để mở khóa toàn bộ tính năng.

**Quan trọng — giữ nguyên tên bảng `DevelopmentAssessments`** (PascalCase) như file SQL dump. Đừng đổi thành lowercase hay `student_development_assessments`.

---

## 0. Tình trạng hiện tại

### Bảng `DevelopmentAssessments` (bảng BE dùng)

```sql
CREATE TABLE `DevelopmentAssessments` (
  `AssessmentID`   int NOT NULL AUTO_INCREMENT,
  `StudentID`      int NOT NULL,
  `TermPeriod`     varchar(7) NOT NULL,                  -- 'YYYY-MM'
  `PhysicalScore`  tinyint DEFAULT NULL,                 -- Thể chất       (1..10)
  `EmotionalScore` tinyint DEFAULT NULL,                 -- Cảm xúc        (1..10)
  `SocialScore`    tinyint DEFAULT NULL,                 -- Xã hội         (1..10)
  `LanguageScore`  tinyint DEFAULT NULL,                 -- Ngôn ngữ       (1..10)
  `CognitiveScore` tinyint DEFAULT NULL,                 -- Nhận thức      (1..10)
  `OverallNote`    text,                                 -- Lời phê tổng hợp
  `AssessedBy`     int DEFAULT NULL,                     -- TeacherID
  `CreatedAt`      bigint DEFAULT NULL,
  `UpdatedAt`      bigint DEFAULT NULL,
  PRIMARY KEY (`AssessmentID`),
  UNIQUE KEY `uq_dev_student_period` (`StudentID`, `TermPeriod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

### Dữ liệu mẫu (5 records) đã có sẵn

| AssessmentID | StudentID | TermPeriod | P | E | S | L | C | Note |
|---|---|---|---|---|---|---|---|---|
| 1 | 117 | 2026-07 | 4 | 5 | 4 | 5 | 4 | "Bé phát triển tốt, tích cực tham gia hoạt động nhóm" |
| 2 | 109 | 2026-07 | 3 | 4 | 5 | 4 | 3 | "Bé hoà đồng, cần cải thiện vận động tinh" |
| 3 | 107 | 2026-07 | 5 | 4 | 4 | 4 | 5 | "Bé năng động, học hỏi nhanh" |
| 4 | 116 | 2026-07 | 4 | 3 | 4 | 4 | 4 | "Bé cần chú ý hơn về kiểm soát cảm xúc" |
| 5 | 19 | 2026-08 | 5 | 4 | 5 | 5 | 4 | "Bé có sự phát triển vượt bậc về ngôn ngữ..." |

### Endpoints hiện có

```
GET  /teacher/classes/{classId}/student-health/assessments?termPeriod=YYYY-MM   ✅ (đang chạy)
PUT  /teacher/classes/{classId}/student-health/assessments                       ✅ (đang chạy, nhưng chỉ chấp nhận 3 scores)
GET  /teacher/classes/{classId}/student-health/assessments/history?...           ❌ (404)
```

### ⚠️ Bug BE hiện tại (cần fix ngay)

```
Table 'kindercare_db_test.students' doesn't exist
```

**Nguyên nhân**: BE query bảng `students` (lowercase). Bảng thật trong DB là `Students` (PascalCase) — số ít.
**Fix**:
- Đổi tất cả query `FROM students` → `FROM Students` trong code BE.
- Cũng check tương tự: `DevelopmentAssessments` (không `developmentassessments`).
- Hoặc cấu hình MySQL `lower_case_table_names = 1` (cần restart) — **không khuyến khích**.

---

## TASK 1 — Mở rộng PUT validator (5 scores + OverallNote)

**Độ ưu tiên**: 🔴 Cao (block FE feature).
**Effort**: ~30 phút.

### 1.1 Vấn đề hiện tại

FE đang gửi:
```json
{
  "termPeriod": "2026-07",
  "items": [
    {
      "studentId": 117,
      "physicalScore": 4,
      "cognitiveScore": 4,
      "languageScore": 5,
      "emotionalScore": 5,    // ← BE báo: "is not allowed"
      "socialScore": 4,        // ← BE báo: "is not allowed"
      "overallNote": "Bé..."   // ← BE báo: "is not allowed"
    }
  ]
}
```

BE response 400:
```
"items[0].emotionalScore" is not allowed
"items[0].socialScore" is not allowed
"items[0].overallNote" is not allowed
```

### 1.2 Schema validator mong muốn

Cập nhật Joi / Zod / class-validator (tùy stack BE) để chấp nhận:

```typescript
const AssessmentItemSchema = {
  studentId: { type: 'integer', required: true },
  physicalScore:  { type: 'integer', min: 1, max: 10, required: true },
  cognitiveScore: { type: 'integer', min: 1, max: 10, required: true },
  languageScore:  { type: 'integer', min: 1, max: 10, required: true },
  emotionalScore: { type: 'integer', min: 1, max: 10, required: false },  // ← MỚI
  socialScore:    { type: 'integer', min: 1, max: 10, required: false },  // ← MỚI
  overallNote:    { type: 'string',  maxLength: 500, required: false },   // ← MỚI
};

const UpsertBodySchema = {
  termPeriod: { type: 'string', pattern: /^\d{4}-\d{2}$/, required: true },  // YYYY-MM
  items: { type: 'array', min: 1, items: AssessmentItemSchema, required: true },
};
```

### 1.3 SQL UPDATE statement (mở rộng INSERT ON DUPLICATE)

Bảng `DevelopmentAssessments` đã có `UNIQUE KEY (StudentID, TermPeriod)` → dùng `ON DUPLICATE KEY UPDATE` được luôn:

```sql
INSERT INTO DevelopmentAssessments (
  StudentID, TermPeriod,
  PhysicalScore, CognitiveScore, LanguageScore,
  EmotionalScore, SocialScore, OverallNote,
  AssessedBy, CreatedAt, UpdatedAt
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, UNIX_TIMESTAMP(), UNIX_TIMESTAMP())
ON DUPLICATE KEY UPDATE
  PhysicalScore  = VALUES(PhysicalScore),
  CognitiveScore = VALUES(CognitiveScore),
  LanguageScore  = VALUES(LanguageScore),
  EmotionalScore = VALUES(EmotionalScore),
  SocialScore    = VALUES(SocialScore),
  OverallNote    = VALUES(OverallNote),
  UpdatedAt      = UNIX_TIMESTAMP();
```

**Lưu ý**:
- Vẫn dùng **PascalCase** cho tên bảng + cột (`DevelopmentAssessments`, `PhysicalScore`, ...). Không lowercase.
- `AssessedBy` lấy từ `req.user.id` (giáo viên đang login), **không nhận từ FE**.

### 1.4 Mapping field camelCase ↔ PascalCase

| FE (camelCase)         | BE / DB (PascalCase)   | Ghi chú                       |
|------------------------|------------------------|-------------------------------|
| `studentId`            | `StudentID`            | int                           |
| `termPeriod`           | `TermPeriod`           | YYYY-MM, khớp FE ↔ DB        |
| `physicalScore`        | `PhysicalScore`        | int 1..10                     |
| `cognitiveScore`       | `CognitiveScore`       | int 1..10                     |
| `languageScore`        | `LanguageScore`        | int 1..10                     |
| `emotionalScore`       | `EmotionalScore`       | int 1..10 (cột riêng trong DB) |
| `socialScore`          | `SocialScore`          | int 1..10 (cột riêng trong DB) |
| `overallNote`          | `OverallNote`          | text, max 500                 |

**Lưu ý về UI**: FE hiển thị 1 card "Cảm xúc - Xã hội" trên UI, nhưng BE nhận `emotionalScore + socialScore` riêng → FE phải tách:
- Khi submit: nếu user nhập socioEmotional (1 slider), FE split thành emotional = social = value.
- Khi load history: FE merge emotional + social thành socioEmotional để vẽ radar chart.

### 1.5 Acceptance criteria

- [ ] PUT body chứa `emotionalScore`, `socialScore`, `overallNote` → BE response 200, không còn lỗi `is not allowed`.
- [ ] Bản ghi được lưu đúng vào DB (verify bằng `SELECT * FROM DevelopmentAssessments WHERE StudentID = 117 AND TermPeriod = '2026-07'`).
- [ ] Khi update record đã tồn tại (cùng `StudentID + TermPeriod`), chỉ UPDATE đúng field thay đổi, giữ nguyên field khác.
- [ ] Validate range 1..10 cho scores, max length 500 cho note.

---

## TASK 2 — Implement endpoint history

**Độ ưu tiên**: 🟡 Trung bình (FE có thể sống thiếu, nhưng radar chart sẽ đẹp hơn nhiều khi có).
**Effort**: ~30 phút.

### 2.1 Endpoint cần tạo

```
GET /teacher/classes/{classId}/student-health/assessments/history
```

### 2.2 Query params

| Param        | Type   | Required | Default | Ghi chú                    |
|--------------|--------|----------|---------|----------------------------|
| `studentId`  | number | ✅       | -       | ID học sinh                |
| `monthsBack` | number | ❌       | 6       | Số tháng gần nhất (max 12) |

### 2.3 Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "history": [
      {
        "assessmentId": 1,
        "studentId": 117,
        "termPeriod": "2026-07",
        "physicalScore": 4,
        "cognitiveScore": 4,
        "languageScore": 5,
        "emotionalScore": 5,
        "socialScore": 4,
        "overallNote": "Bé phát triển tốt...",
        "createdAt": 1783560469,
        "updatedAt": 1783560469
      },
      {
        "assessmentId": 5,
        "studentId": 19,
        "termPeriod": "2026-08",
        "physicalScore": 5,
        "cognitiveScore": 4,
        "languageScore": 5,
        "emotionalScore": 4,
        "socialScore": 5,
        "overallNote": "Bé có sự phát triển vượt bậc...",
        "createdAt": 1783900000,
        "updatedAt": 1783900000
      }
    ]
  }
}
```

### 2.4 SQL

```sql
SELECT
  da.AssessmentID   AS assessmentId,
  da.StudentID      AS studentId,
  da.TermPeriod     AS termPeriod,
  da.PhysicalScore  AS physicalScore,
  da.CognitiveScore AS cognitiveScore,
  da.LanguageScore  AS languageScore,
  da.EmotionalScore AS emotionalScore,
  da.SocialScore    AS socialScore,
  da.OverallNote    AS overallNote,
  da.CreatedAt      AS createdAt,
  da.UpdatedAt      AS updatedAt
FROM DevelopmentAssessments da
WHERE da.StudentID = ?
ORDER BY da.TermPeriod DESC
LIMIT ?;
```

**Tip**: Có thể dùng `WHERE TermPeriod >= DATE_FORMAT(DATE_SUB(NOW(), INTERVAL ? MONTH), '%Y-%m')` nếu muốn tính theo tháng hiện tại.

### 2.5 Acceptance criteria

- [ ] `GET .../history?studentId=117&monthsBack=6` trả về array `history` (có thể rỗng nếu HS chưa có record).
- [ ] Sort theo `termPeriod DESC` (mới nhất trước).
- [ ] Limit ≤ 12.
- [ ] Auth: chỉ giáo viên phụ trách lớp đó mới được xem.

---

## TASK 3 (optional) — Lint chéo PascalCase trong code BE

**Effort**: ~10 phút.

Nếu sau khi làm Task 1 mà vẫn gặp lỗi `Table 'xxx.developmentassessments' doesn't exist`:

- Tìm trong code BE các chỗ query bảng assessment + students.
- Đảm bảo **mọi nơi** dùng đúng PascalCase khớp với tên trong file SQL dump:
  - `Students` (không `students`)
  - `DevelopmentAssessments` (không `developmentassessments`, không `development_assessments`)
- Hoặc cấu hình MySQL `lower_case_table_names = 1` (cần restart server) — **không khuyến khích** vì đổi hành vi toàn DB.

---

## Quick test commands (curl)

Sau khi BE xong Task 1:

```bash
# Test PUT với 5 scores + note
curl -X PUT http://localhost:8080/teacher/classes/13/student-health/assessments \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "termPeriod": "2026-07",
    "items": [{
      "studentId": 117,
      "physicalScore": 4,
      "cognitiveScore": 4,
      "languageScore": 5,
      "emotionalScore": 5,
      "socialScore": 4,
      "overallNote": "Test BE note"
    }]
  }'
# Expected: { "success": true, "data": { "savedCount": 1 } }

# Verify trong DB
mysql -u root -p kindercare_db_test \
  -e "SELECT * FROM DevelopmentAssessments WHERE StudentID=117 AND TermPeriod='2026-07';"
```

Sau khi xong Task 2:

```bash
# Test history
curl "http://localhost:8080/teacher/classes/13/student-health/assessments/history?studentId=117&monthsBack=6" \
  -H "Authorization: Bearer $TOKEN"
# Expected: { "success": true, "data": { "history": [...] } }
```

---

## FE sẽ làm gì sau khi BE xong

Sau khi BE chạy ổn Task 1 + Task 2, FE chỉ cần 5 thay đổi nhỏ (FE owner tự làm, không cần BE):

1. `apps/teacher/src/config/types/assessment.ts`:
   - Thêm `emotionalScore`, `socialScore`, `overallNote` vào `BE_SUPPORTED_FIELDS`.
2. `apps/teacher/src/config/validations/assessment.ts`:
   - Trong `validateUpsertBody()`, build payload gồm đủ 5 scores + note.
3. `apps/teacher/src/views/AssessmentView/index.tsx`:
   - Uncomment đoạn `getStudentHistory` trong `useEffect`.
   - Map field `emotionalScore + socialScore` → `socioEmotionalScore` cho radar chart (mean của 2 field).
4. `apps/teacher/src/components/assessment/AssessmentForm/index.tsx`:
   - Bỏ filter `!isSupported` → mở lại 3 card Cảm xúc - Xã hội / Thẩm mỹ / Kỹ năng sống (lưu ý: AestheticScore và LifeSkillScore không có trong DB → vẫn giữ local).
5. **Không cần** thay đổi SQL hay schema DB — bảng `DevelopmentAssessments` đã có sẵn đủ cột.

---

## Tham chiếu FE

| File                                                              | Vai trò                                |
|-------------------------------------------------------------------|----------------------------------------|
| `apps/teacher/src/config/types/assessment.ts`                    | Type definitions                       |
| `apps/teacher/src/config/validations/assessment.ts`              | Hand-rolled validation (mirror Zod)    |
| `apps/teacher/src/services/StudentAssessmentService.ts`          | HTTP service, dùng endpoint từ SERVER  |
| `apps/teacher/src/components/assessment/AssessmentForm/`         | UI form 6 tiêu chí                     |
| `apps/teacher/src/components/assessment/AssessmentChart/`        | Radar chart inline SVG                 |
| `apps/teacher/src/views/AssessmentView/`                         | Page chính                             |
| `apps/teacher/src/app/[locale]/assessment/page.tsx`              | Next.js route                          |
| `packages/core/src/config/server.ts`                             | SERVER constants (3 endpoint paths)    |
| `apps/teacher/docs/ASSESSMENT_API_CONTRACT.md`                   | Contract đầy đủ (giữ để tham khảo)    |

## Liên lạc

Có thắc mắc gì ping FE trên channel #frontend hoặc reply trực tiếp vào issue này.

— FE Team