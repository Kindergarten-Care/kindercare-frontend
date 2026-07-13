# Chi tiết hóa đơn — breakdown hoàn tiền ăn (mealRefundBreakdown) — FE Integration Guide

## 1. Bối cảnh

`GET /api/v1/principal/invoices/{id}` giờ trả thêm field **`mealRefundBreakdown`** để diễn giải rõ khoản `refundAmount` (hoàn tiền ăn do nghỉ có phép) — trả lời câu hỏi "nghỉ mấy ngày, đơn giá bao nhiêu, ra số tiền hoàn thế nào" thay vì chỉ đưa 1 con số tổng như trước.

Field này **chỉ có giá trị khi `invoiceType === 'MONTHLY'`** — với `TUITION`/`EXTRACURRICULAR`, luôn là `null` (2 loại này không có khái niệm hoàn tiền ăn).

---

## 2. Response mới

**Request không đổi:**
```
GET /api/v1/principal/invoices/53
Authorization: Bearer <principal_token>
```

**Response 200 (hóa đơn MONTHLY):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Lấy thông tin chi tiết hóa đơn thành công",
  "data": {
    "id": 53,
    "studentId": 19,
    "studentFullName": "Nguyễn Minh Chánh",
    "classId": 13,
    "className": "Chồi 1",
    "billingMonth": "08-2026",
    "tuitionFee": "0.00",
    "expectedMealFee": "1150000.00",
    "extracurricularFee": "0.00",
    "surcharge": "0.00",
    "refundAmount": "180000.00",
    "discountAmount": "0.00",
    "totalAmount": "970000.00",
    "paymentStatus": "Unpaid",
    "invoiceType": "MONTHLY",
    "createdAt": 1754006700,
    "dueDate": 1755864000,
    "published": 1,
    "publishedAt": 1755000000,
    "reminderSentAt": null,
    "overdueReminderSentAt": null,
    "mealRefundBreakdown": {
      "deductedDays": 3,
      "dailyFee": 60000,
      "refundAmount": 180000
    },
    "transactions": []
  }
}
```

**Response 200 (hóa đơn TUITION/EXTRACURRICULAR — `mealRefundBreakdown` luôn `null`):**
```json
{
  "data": {
    "invoiceType": "TUITION",
    "refundAmount": "0.00",
    "mealRefundBreakdown": null,
    "...": "..."
  }
}
```

### Field `mealRefundBreakdown`
| Field | Kiểu | Ý nghĩa |
|---|---|---|
| `deductedDays` | `integer` | Số ngày công (T2–T6, trừ ngày lễ) học sinh nghỉ có phép trong **tháng liền trước** `billingMonth` của hóa đơn, và đơn nghỉ đó có `IsMealFeeDeducted = 1` |
| `dailyFee` | `number` | Đơn giá tiền ăn/ngày **hiện hành** theo lớp/năm học của học sinh (`BaseFees.DailyMealFee`) |
| `refundAmount` | `number` | `deductedDays × dailyFee` — số tiền hoàn tương ứng |

**Gợi ý hiển thị UI:**
```
Hoàn tiền ăn: nghỉ 3 ngày công × 60,000đ = 180,000đ
```

---

## 3. ⚠️ Lưu ý quan trọng — `mealRefundBreakdown.refundAmount` có thể LỆCH nhẹ so với field `refundAmount` gốc

Đây là điểm dễ gây hiểu lầm nhất khi tích hợp, đọc kỹ:

- Field **`refundAmount`** ở cấp ngoài (top-level, cạnh `tuitionFee`, `totalAmount`...) là giá trị **đã lưu cứng trong DB** từ lúc cron tạo hóa đơn — dùng đơn giá tiền ăn **tại thời điểm đó**.
- Field **`mealRefundBreakdown.refundAmount`** được **tính lại real-time** mỗi lần gọi API này — dùng đơn giá tiền ăn **hiện tại** (query `BaseFees` mới nhất).

→ Nếu hiệu trưởng đổi `DailyMealFee` của lớp **sau khi** hóa đơn đã được tạo, 2 số này sẽ **không khớp nhau**. Ví dụ: hóa đơn tạo lúc đơn giá là 60.000đ/ngày (`refundAmount` gốc = 180.000đ cho 3 ngày), sau đó hiệu trưởng đổi đơn giá lên 70.000đ/ngày → gọi lại API chi tiết sẽ thấy `mealRefundBreakdown.refundAmount = 210.000đ` (3 × 70.000), nhưng `refundAmount` gốc vẫn là 180.000đ.

**`deductedDays` thì luôn đúng 100%** trong mọi trường hợp — vì dựa trên dữ liệu `LeaveRequests` cố định, không phụ thuộc giá tiền.

**Khuyến nghị hiển thị cho FE:** dùng field `refundAmount` gốc (top-level) làm số tiền hoàn **chính thức** hiển thị trên hóa đơn (vì đây là số đã áp dụng thực tế vào `TotalAmount`), còn `mealRefundBreakdown` chỉ dùng để **diễn giải/giải thích** cho hiệu trưởng hiểu "vì sao có số này" — không nên để 2 con số riêng biệt cạnh nhau nếu chúng lệch nhau sẽ gây hoang mang. Cách xử lý gợi ý:

```
Hoàn tiền ăn (đã áp dụng): 180,000đ
   → Nghỉ 3 ngày công có phép
   (Đơn giá hiện tại: 60,000đ/ngày — nếu khác giá lúc tạo hóa đơn, số hoàn có thể chênh lệch)
```

Hoặc đơn giản hơn: chỉ hiển thị `deductedDays` (luôn đúng) kèm số tiền `refundAmount` gốc, **bỏ qua** `mealRefundBreakdown.refundAmount` trong UI, chỉ dùng nó cho mục đích debug/log nếu cần.

---

## 4. Checklist tránh sai sót

- [ ] Chỉ hiển thị block "Hoàn tiền ăn: nghỉ X ngày..." khi `invoiceType === 'MONTHLY'` **và** `mealRefundBreakdown !== null` — với `TUITION`/`EXTRACURRICULAR` field này luôn `null`, đừng cố parse `deductedDays`/`dailyFee` từ `null` (sẽ crash nếu không check trước).
- [ ] Không hiển thị đồng thời `refundAmount` (gốc) và `mealRefundBreakdown.refundAmount` như 2 số độc lập cạnh nhau nếu chúng có thể khác nhau — dùng `refundAmount` gốc là số chính thức, `mealRefundBreakdown` chỉ để diễn giải `deductedDays`/`dailyFee`.
- [ ] Nếu `deductedDays === 0`, `mealRefundBreakdown` vẫn trả về object bình thường (`{ deductedDays: 0, dailyFee: ..., refundAmount: 0 }`), **không phải `null`** — chỉ `null` khi `invoiceType !== 'MONTHLY'`. Đừng nhầm 2 trường hợp "không có gì để hoàn" và "không áp dụng field này".
- [ ] Field này chỉ có ở API **chi tiết** (`GET /principal/invoices/{id}`) — **không có** ở API danh sách (`GET /principal/invoices`), vì tính breakdown cho mỗi dòng trong danh sách sẽ chậm (mỗi lần gọi phải query lại `LeaveRequests`). Nếu cần hiển thị ở list, phải xin BE bổ sung riêng, đừng giả định nó tự động có sẵn.
