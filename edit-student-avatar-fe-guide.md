# Sửa ảnh đại diện học sinh đã tồn tại — FE Integration Guide

## 1. Luồng 2 bước (giống hệt luồng tạo mới, chỉ khác bước cuối)

```
[1] FE chọn ảnh mới
        │
        ▼
[2] POST /principal/students/upload-avatar (multipart) → nhận { avatarUrl }
        │
        ▼
[3] PATCH /principal/student/{id} (JSON) — body { "avatarUrl": "<url mới>" }
```

Không có endpoint "sửa avatar" riêng — dùng chung API sửa hồ sơ học sinh tổng quát (`PATCH /principal/student/{id}`), chỉ cần truyền đúng 1 field `avatarUrl`.

---

## 2. Bước 1 — Upload ảnh mới, lấy URL

### `POST /api/v1/principal/students/upload-avatar`

**Request — multipart/form-data, field bắt buộc tên là `avatar`:**
```
POST /api/v1/principal/students/upload-avatar
Authorization: Bearer <principal_token>
Content-Type: multipart/form-data

avatar: <file>
```
- Định dạng: `jpg`, `jpeg`, `png`, `webp`, `gif`
- Tối đa: 20MB

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

⚠️ Bước này **không tự gắn ảnh vào học sinh nào** — chỉ upload và trả URL. Phải qua bước 2 mới thực sự cập nhật hồ sơ.

---

## 3. Bước 2 — Gắn URL mới vào hồ sơ học sinh

### `PATCH /api/v1/principal/student/{id}`

**Request — chỉ cần truyền `avatarUrl`, không cần gửi kèm field khác:**
```json
PATCH /api/v1/principal/student/19
Authorization: Bearer <principal_token>
Content-Type: application/json

{
  "avatarUrl": "https://media.kindercare.app/students/avatar/1755000000-123456789.jpg"
}
```

Đây là API sửa hồ sơ học sinh **tổng quát** (dùng dynamic update) — cũng nhận được `fullName`, `dateOfBirth`, `gender`, `allergies` nếu muốn sửa cùng lúc, nhưng khi chỉ đổi ảnh thì gửi riêng `avatarUrl` là đủ, các field khác giữ nguyên giá trị cũ (không bị ghi đè thành `null`).

**Response 200:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Cập nhật thông tin học sinh thành công",
  "data": null
}
```

**Response 400** (không truyền field nào cả — tức body rỗng `{}`):
```json
{ "success": false, "statusCode": 400, "message": "Cần ít nhất một trong các trường: fullName, dateOfBirth, gender, allergies, avatarUrl" }
```

**Response 404** (`id` không tồn tại):
```json
{ "success": false, "statusCode": 404, "message": "Không tìm thấy học sinh với id = 19" }
```

**Response 403** (không phải hiệu trưởng):
```json
{ "success": false, "statusCode": 403, "message": "Chỉ hiệu trưởng mới có quyền sửa thông tin học sinh" }
```

---

## 4. Muốn xóa ảnh đại diện (không muốn có avatar)

Truyền `avatarUrl: null` — service coi `null` khác `undefined`, nên **vẫn sẽ chạy `SET AvatarURL = NULL`** (không bị bỏ qua như khi không truyền field):
```json
{ "avatarUrl": null }
```
Nếu muốn **giữ nguyên** avatar cũ, đơn giản là không đưa key `avatarUrl` vào body — không phải gửi `avatarUrl: undefined` (JSON không có `undefined`, nên tương đương với việc bỏ hẳn key này ra khỏi object trước khi `JSON.stringify`).

---

## 5. Checklist tránh sai sót

- [ ] Field multipart ở bước upload phải đúng tên `avatar` (không phải `file`/`image`).
- [ ] `upload-avatar` chỉ trả URL, không tự cập nhật gì cả — luôn phải gọi tiếp `PATCH /principal/student/{id}` mới có tác dụng thật.
- [ ] Khi chỉ sửa ảnh, **chỉ gửi `avatarUrl`** trong body `PATCH` — đừng gửi kèm `fullName`/`dateOfBirth`/... với giá trị cũ "phòng hờ", vì nếu lấy sai giá trị cache cũ ở FE có thể vô tình ghi đè nhầm dữ liệu khác của học sinh.
- [ ] Muốn xóa ảnh → gửi `avatarUrl: null` (không phải bỏ trống string `""`, không phải bỏ hẳn key).
- [ ] `PATCH` báo lỗi 400 nếu body hoàn toàn rỗng — FE nên chặn nút "Lưu" ở client khi chưa có thay đổi gì thay vì để BE trả lỗi.
- [ ] Đây **cùng 1 endpoint upload** (`upload-avatar`) dùng chung cho cả luồng tạo mới học sinh (`enroll`) và luồng sửa học sinh cũ — không có 2 endpoint upload riêng biệt.
