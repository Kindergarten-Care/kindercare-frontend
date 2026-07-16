# Upload avatar học sinh + Thêm hồ sơ học sinh — FE Integration Guide

## 1. Bối cảnh

`POST /principal/students/enroll` (tạo hồ sơ học sinh) là **JSON thuần** — nhận `student.avatarUrl` là 1 string URL có sẵn, **không** nhận file upload trực tiếp (không phải multipart).

Vì hệ thống chưa có endpoint upload ảnh nào cho phía hiệu trưởng, đã bổ sung 1 endpoint riêng: **upload ảnh trước → lấy URL → đưa URL đó vào payload `enroll`**. 2 bước hoàn toàn tách biệt, không gộp lại.

```
[1] FE chọn file ảnh
        │
        ▼
[2] POST /principal/students/upload-avatar (multipart) → nhận { avatarUrl }
        │
        ▼
[3] POST /principal/students/enroll (JSON) — đưa avatarUrl vào student.avatarUrl
```

Endpoint upload này cũng dùng lại được cho luồng **sửa** học sinh đã tồn tại (`PATCH /principal/student/{id}`) — cùng cách lấy URL trước, patch sau.

---

## 2. API 1 — Upload avatar

### `POST /api/v1/principal/students/upload-avatar`

**Request — multipart/form-data, field name bắt buộc là `avatar`:**
```
POST /api/v1/principal/students/upload-avatar
Authorization: Bearer <principal_token>
Content-Type: multipart/form-data

avatar: <file>
```

**Giới hạn file (dùng chung filter với module Teacher, không phải rule riêng cho endpoint này):**
- Định dạng: `jpg`, `jpeg`, `png`, `webp`, `gif`
- Kích thước tối đa: **20MB**
- Field name multipart phải đúng là `"avatar"` (không phải `file`/`image`) — sai tên field sẽ khiến `req.file` là `undefined` → nhận lỗi 400 dù đã đính kèm file.

**Response 200:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Upload ảnh đại diện học sinh thành công",
  "data": {
    "avatarUrl": "https://media.kindercare.app/students/avatar/1755000000-123456789.jpg"
  }
}
```

**Response 400** (thiếu file hoặc sai định dạng):
```json
{ "success": false, "statusCode": 400, "message": "Vui lòng chọn một file ảnh" }
```
```json
{ "success": false, "statusCode": 400, "message": "Chỉ chấp nhận file ảnh (jpg, jpeg, png, webp, gif)" }
```

**Response 500** (lỗi upload lên DigitalOcean Spaces — hiếm, do hạ tầng):
```json
{ "success": false, "statusCode": 500, "message": "Lỗi upload ảnh lên DigitalOcean Spaces: ..." }
```

⚠️ **Endpoint này KHÔNG gắn ảnh vào học sinh nào cả** — nó chỉ upload file và trả URL. Nếu gọi xong mà không dùng URL đó ở bước tiếp theo (`enroll` hoặc `PATCH /student/{id}`), file vẫn tồn tại trên storage nhưng không có tác dụng gì (không có cơ chế tự xóa file "orphan" — nếu user bấm upload rồi huỷ form, ảnh vẫn nằm trên Spaces, chỉ là không được tham chiếu tới. Không phải bug cần lo, nhưng đừng gọi lại nhiều lần vô ích).

---

## 3. API 2 — Thêm hồ sơ học sinh (đã có từ trước, giờ có thêm field `avatarUrl`)

### `POST /api/v1/principal/students/enroll`

**Request — JSON thuần (không phải multipart), body đầy đủ:**
```json
{
  "student": {
    "fullName": "Nguyễn Minh Khang",
    "dateOfBirth": 1684108800,
    "gender": "Nam",
    "allergies": "Dị ứng lạc",
    "admissionDate": 1754006700,
    "avatarUrl": "https://media.kindercare.app/students/avatar/1755000000-123456789.jpg"
  },
  "parent": {
    "id": 6,
    "fullName": "Nguyễn Anh Tuấn",
    "phoneNumber": "0909090909",
    "email": "tuan.nguyen@gmail.com",
    "occupation": "Kỹ sư",
    "address": "65 Huỳnh Thúc Kháng, Q1"
  },
  "isNewParent": true,
  "account": {
    "username": "0909090909",
    "password": "123456"
  },
  "packageId": 1
}
```

**Field `student.avatarUrl` — MỚI, optional:**
| Field | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `avatarUrl` | `string \| null` | Không | URL lấy từ response của API upload ở mục 2. Bỏ trống = lưu `NULL` trong DB, không lỗi. |

**Lưu ý theo `isNewParent`:**
- `isNewParent = true` → cần đủ `parent.fullName`, `parent.phoneNumber`, `parent.email`, `parent.occupation`, `parent.address` **+** `account.username`, `account.password` (tạo tài khoản phụ huynh mới, `RoleID=4`).
- `isNewParent = false` → chỉ cần `parent.id` (ParentID của phụ huynh đã có sẵn trong hệ thống), bỏ qua toàn bộ field còn lại của `parent`/`account`.

**`packageId` (optional):** nếu có, tự động tạo `StudentTuitionPlans` cho học sinh — `StartMonth` tính từ `student.admissionDate`, `MonthlyTuitionSnapshot` lấy theo `BaseFees` của năm học đang active. Không truyền thì học sinh vẫn tạo được, chỉ là chưa có gói học phí (đăng ký sau qua API khác).

**Response 201 — Không có `statusCode` (khác API upload ở trên, dùng `res.json()` trực tiếp, không qua `ApiResponse`):**
```json
{
  "success": true,
  "data": {
    "studentId": 150,
    "parentId": 6
  },
  "message": "Đã tạo hồ sơ học sinh thành công"
}
```

⚠️ **Thứ tự field khác thường:** response này để `data` **trước** `message` trong object literal — không ảnh hưởng gì khi FE dùng `response.data.data.studentId`/`response.data.message` (JSON không quan tâm thứ tự key), chỉ nêu ra để không bối rối khi nhìn raw response lúc debug.

**Response lỗi:** service hiện chưa có validate field-level rõ ràng ở tầng controller (nhận `req.body` thẳng) — nếu thiếu field bắt buộc (vd `student.fullName`), lỗi sẽ là exception từ tầng DB/service (thường là 500 với message kỹ thuật, không phải 400 thân thiện). **FE nên tự validate đầy đủ field bắt buộc ở client trước khi gọi**, đừng trông chờ BE trả lỗi 400 rõ nghĩa cho mọi trường hợp thiếu dữ liệu.

---

## 4. Luồng tích hợp đầy đủ (để FE tự test end-to-end)

1. User vào form "Thêm học sinh mới", chọn ảnh đại diện.
2. FE gọi ngay `POST /principal/students/upload-avatar` (multipart, field `avatar`) — có thể gọi ngay lúc user chọn ảnh (upload trước, không cần đợi submit form) để UX nhanh hơn, preview ảnh luôn bằng URL trả về.
3. FE giữ `avatarUrl` nhận được trong state của form.
4. User điền tiếp các field còn lại, bấm submit.
5. FE gọi `POST /principal/students/enroll` với `student.avatarUrl = <URL đã lưu ở bước 3>`.
6. Nhận `studentId` — nếu cần xếp lớp ngay, gọi tiếp `POST /principal/assignments/students` (API khác, không thuộc phạm vi doc này).

**Tương tự khi sửa avatar cho học sinh đã tồn tại:**
1. `POST /principal/students/upload-avatar` → nhận `avatarUrl` mới.
2. `PATCH /principal/student/{id}` với body `{ "avatarUrl": "<url mới>" }`.

---

## 5. Checklist tránh sai sót khi tích hợp

- [ ] Field multipart phải tên đúng là `avatar` (không phải `file`, `image`, `photo`) khi gọi `upload-avatar`.
- [ ] `upload-avatar` và `enroll` là **2 lời gọi API riêng biệt, tuần tự** — không có cách gộp thành 1 request multipart duy nhất chứa cả file ảnh và toàn bộ thông tin học sinh/phụ huynh.
- [ ] `upload-avatar` trả response có `statusCode` (dùng `ApiResponse`), nhưng `enroll` **không có** `statusCode` trong response — đừng viết code parse chung 1 interface cho cả 2.
- [ ] `upload-avatar` không tự gắn ảnh vào học sinh — nếu không dùng URL trả về ở bước `enroll`/`PATCH` tiếp theo, ảnh coi như vô nghĩa (không lỗi, chỉ là không có tác dụng).
- [ ] `student.avatarUrl` là optional — không bắt buộc phải upload ảnh mới cho `enroll` hoạt động.
- [ ] Giới hạn file: chỉ `jpg/jpeg/png/webp/gif`, tối đa 20MB — validate phía client trước khi gọi API để tránh chờ round-trip lên server rồi mới biết bị 400.
- [ ] Thiếu field bắt buộc trong `enroll` (vd `student.fullName`) có thể không trả 400 thân thiện — validate đầy đủ ở FE trước khi submit, đừng dựa vào lỗi từ BE để hiển thị message cho user.
