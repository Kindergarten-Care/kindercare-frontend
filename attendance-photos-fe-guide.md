# Bổ sung ảnh đưa/đón trẻ vào API điểm danh — FE Integration Guide

## 1. Bối cảnh

Bảng `Attendances` đã có sẵn 2 cột `dropoffImage`/`pickupImage` — ảnh giáo viên chụp lúc **nhận trẻ** (dropoff) và **trả trẻ** (pickup) khi điểm danh bằng ảnh. Trước đây, API điểm danh phía phụ huynh **chưa trả về** 2 field này — phụ huynh xem lịch sử điểm danh không thấy được ảnh minh chứng, dù dữ liệu đã có sẵn trong DB.

Giờ đã bổ sung — không đổi endpoint, không đổi request, chỉ thêm 2 field mới vào response.

---

## 2. API thay đổi

### `GET /api/v1/parent/children/{studentId}/attendance`

**Request không đổi:**
```
GET /api/v1/parent/children/19/attendance?startDate=1783728000&endDate=1783900800
Authorization: Bearer <parent_token>
```

**Response — thêm 2 field mới `dropoffImage`, `pickupImage` trong mỗi bản ghi:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Lấy thông tin điểm danh của bé thành công",
  "data": [
    {
      "attendanceId": 362,
      "studentId": 19,
      "attendanceDate": 1783900800,
      "status": "Present",
      "checkInTime": 1783929600,
      "checkOutTime": 1783961400,
      "droppedOffByParentId": 6,
      "droppedOffBy": "Bố",
      "droppedOffRelationship": "Bố",
      "droppedOffAvatarUrl": "https://media.kindercare.app/parents/avatar.png",
      "pickedUpByParentId": 6,
      "pickedUpBy": "Bà nội",
      "pickedUpRelationship": "Người đón hộ",
      "pickedUpAvatarUrl": "https://media.kindercare.app/proxy/avatar.png",
      "checkedInByTeacherId": 5,
      "checkedOutByTeacherId": 5,
      "proxyAuthorizationId": null,
      "dropoffImage": "https://media.kindercare.app/attendance/1783917850784-155833263.jpg",
      "pickupImage": "https://media.kindercare.app/attendance/1783917864932-185925687.jpg"
    }
  ]
}
```

### Field mới
| Field | Kiểu | Ý nghĩa |
|---|---|---|
| `dropoffImage` | `string \| null` | URL ảnh giáo viên chụp lúc **nhận trẻ** vào buổi sáng. `null` nếu ngày đó chưa điểm danh bằng ảnh (vd điểm danh qua QR/thủ công không kèm ảnh, hoặc bé chưa đến trường). |
| `pickupImage` | `string \| null` | URL ảnh giáo viên chụp lúc **trả trẻ** buổi chiều. `null` nếu chưa đón hoặc điểm danh không kèm ảnh. |

⚠️ Không phải mọi bản ghi điểm danh đều có ảnh — hệ thống hỗ trợ nhiều cách điểm danh (QR, thủ công, chụp ảnh); chỉ cách "điểm danh bằng ảnh" mới điền vào 2 cột này. Với các bản ghi cũ hoặc điểm danh bằng cách khác, cả 2 field sẽ là `null` — **không phải lỗi**.

---

## 3. Gợi ý hiển thị UI

- Ở màn lịch sử điểm danh, mỗi dòng/thẻ ngày có thể thêm 2 thumbnail nhỏ (ảnh đón/ảnh trả) nếu tồn tại — bấm vào để xem full size.
- Nếu `dropoffImage`/`pickupImage` là `null`, không hiển thị khung ảnh trống — ẩn hẳn phần đó hoặc hiển thị icon placeholder trung tính (không phải "ảnh lỗi").
- Có thể ghép với field đã có sẵn cùng bản ghi để hiển thị đầy đủ hơn: `droppedOffBy`/`pickedUpBy` (ai đưa/đón) đi kèm `dropoffImage`/`pickupImage` (ảnh xác nhận) trong cùng 1 khối thông tin.

---

## 4. Checklist tránh sai sót

- [ ] `dropoffImage`/`pickupImage` có thể `null` — luôn kiểm tra trước khi render `<img src=...>`, tránh hiển thị ảnh broken.
- [ ] 2 field này độc lập với `status` (`Present`/`Absent`/`Excused`) — 1 bản ghi `status = 'Present'` vẫn có thể có `dropoffImage = null` nếu điểm danh không qua ảnh (vd quét QR).
- [ ] Không cần gọi thêm API nào khác để lấy ảnh — đã có sẵn trực tiếp trong response của API điểm danh hiện tại, không phải endpoint riêng.
- [ ] Endpoint, params, và toàn bộ field cũ giữ nguyên — đây là thay đổi bổ sung an toàn (additive), không breaking change.
