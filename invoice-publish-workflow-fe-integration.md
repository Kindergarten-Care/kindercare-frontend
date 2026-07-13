# Invoice Publish Workflow — FE Integration Guide

## 1. Bối cảnh nghiệp vụ (đọc trước khi code)

Trước đây: cron chạy 00:05 ngày 1 hàng tháng → tạo hóa đơn `TUITION`/`MONTHLY` → phụ huynh thấy **ngay lập tức**. Nếu hóa đơn sai (thiếu phụ thu, sai học phí...), phụ huynh đã nhìn thấy số tiền sai trước khi hiệu trưởng kịp sửa.

Bây giờ: thêm bước duyệt ở giữa.

```
[Cron 00:05 ngày 1] → tạo hóa đơn Published=0 (NHÁP)
                              │
                     Hiệu trưởng rà soát, sửa surcharge/due-date nếu cần
                              │
                     Hiệu trưởng bấm "Công khai" (publish)
                              │
                              ▼
                  Published=1, DueDate = lúc publish + 10 ngày
                              │
                              ▼
                  Phụ huynh MỚI thấy được & thanh toán được
```

**Quan trọng — phạm vi áp dụng:**
- Áp dụng cho: `InvoiceType = 'TUITION'` (học phí theo gói) và `'MONTHLY'` (tiền ăn hàng tháng).
- **KHÔNG áp dụng** cho `InvoiceType = 'EXTRACURRICULAR'` (hóa đơn ngoại khóa) — loại này luôn `Published = 1` ngay từ lúc tạo (khi phụ huynh đăng ký hoạt động), vẫn hiển thị/thanh toán ngay như cũ, **không có** khái niệm "nháp" hay nút "công khai" cho loại này.

---

## 2. Field mới trên Invoice

Cả 2 phía **Hiệu trưởng** và **Phụ huynh** đều có thể nhận field này trong response (xem chi tiết endpoint bên dưới):

| Field | Kiểu | Ý nghĩa |
|---|---|---|
| `published` | `boolean` (0/1 từ DB) | `false`/`0` = còn nháp, chưa công khai. `true`/`1` = đã công khai. |
| `publishedAt` | `number \| null` | Unix timestamp (giây) lúc publish. `null` nếu chưa publish. |
| `dueDate` | `number \| null` | Unix timestamp (giây). **`null` khi hóa đơn TUITION/MONTHLY còn nháp** (chưa tính hạn đóng). Sau khi publish = `publishedAt + 10 ngày`. Với EXTRACURRICULAR thì luôn có giá trị ngay từ đầu. |

⚠️ **Lưu ý khi FE hiển thị `dueDate = null`:** không được hiển thị "Invalid Date" hay "01/01/1970" — phải hiển thị "Chưa công khai" / "—" / ẩn hẳn dòng hạn đóng.

---

## 3. API MỚI — chỉ dành cho Hiệu trưởng

### 3.1. `POST /api/v1/billing/run-monthly`
*(Endpoint đã có từ trước, nhưng hành vi đã đổi — không tạo hóa đơn hiển thị ngay nữa)*

Tạo hóa đơn `TUITION`/`MONTHLY` cho toàn trường theo 1 tháng billing. Có thể gọi **bất kỳ lúc nào trong tháng** (không cần đợi ngày 1) — dùng để demo/test. Idempotent — gọi lại nhiều lần cho cùng `billingMonth` không tạo trùng.

**Request:**
```json
POST /api/v1/billing/run-monthly
Authorization: Bearer <principal_token>
Content-Type: application/json

{
  "billingMonth": "08-2026"   // optional, "MM-YYYY". Bỏ trống = tháng hiện tại
}
```

**Response 200:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Chạy hóa đơn hàng tháng thành công",
  "data": {
    "billingMonth": "08-2026",
    "generated": {
      "tuition": 3,
      "monthly": 42,
      "extracurricular": 5
    },
    "skipped": 0,
    "failedStudentIds": []
  }
}
```
- `failedStudentIds`: mảng `studentId` bị lỗi khi tạo hóa đơn (vd thiếu cấu hình học phí cơ bản cho lớp/năm học) — **FE nên hiển thị cảnh báo riêng** nếu mảng này không rỗng, kèm gợi ý "vào Cấu hình học phí để bổ sung".
- Tất cả hóa đơn `tuition`/`monthly` vừa tạo đều ở trạng thái **`published = false`**.

---

### 3.2. `PATCH /api/v1/billing/invoices/publish`

Công khai **hàng loạt** toàn bộ hóa đơn `TUITION`/`MONTHLY` còn nháp của 1 tháng. Đây là hành động chính trên màn hình "Duyệt hóa đơn".

**Request:**
```json
PATCH /api/v1/billing/invoices/publish
Authorization: Bearer <principal_token>
Content-Type: application/json

{
  "billingMonth": "08-2026"   // BẮT BUỘC
}
```

**Response 200:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Đã công khai 45 hóa đơn",
  "data": {
    "billingMonth": "08-2026",
    "publishedCount": 45
  }
}
```

**Response 400** (thiếu `billingMonth`):
```json
{ "success": false, "message": "Vui lòng cung cấp billingMonth (định dạng MM-YYYY)" }
```

⚠️ Gọi API này **không báo lỗi** nếu tháng đó không còn hóa đơn nháp nào (chỉ trả `publishedCount: 0`) — FE nên tự kiểm tra trước (xem mục 3.4) để tránh hiển thị nút "Công khai" khi không có gì để publish.

---

### 3.3. `PATCH /api/v1/billing/invoices/{invoiceId}/publish`

Công khai **1 hóa đơn riêng lẻ** — dùng khi hiệu trưởng vừa sửa xong 1 hóa đơn cụ thể (vd vừa thêm phụ thu) và muốn publish ngay hóa đơn đó mà không đụng tới các hóa đơn khác trong tháng.

**Request:**
```
PATCH /api/v1/billing/invoices/9/publish
Authorization: Bearer <principal_token>
```
(không cần body)

**Response 200:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Công khai hóa đơn thành công",
  "data": {
    "invoice": {
      "InvoiceID": 9,
      "StudentID": 19,
      "PackageID": null,
      "PeriodRange": null,
      "BillingMonth": "08-2026",
      "TuitionFee": "0.00",
      "ExpectedMealFee": "1150000.00",
      "ExtracurricularFee": "0.00",
      "Surcharge": "50000.00",
      "RefundAmount": "0.00",
      "DiscountAmount": "0.00",
      "TotalAmount": "1200000.00",
      "PaymentStatus": "Unpaid",
      "Published": 1,
      "PublishedAt": 1755000000,
      "CreatedAt": 1754006700,
      "InvoiceType": "MONTHLY",
      "DueDate": 1755864000,
      "ReminderSentAt": null,
      "OverdueReminderSentAt": null
    }
  }
}
```
⚠️ **Field trong response này là RAW DB COLUMN NAMES (PascalCase)** — khác hoàn toàn convention camelCase của các API list/detail khác (`getInvoices`, `getInvoiceDetail`). Đây là hành vi **có sẵn từ trước** (giống hệt response của `addSurcharge`/`updateDueDate`), không phải lỗi mới. FE cần map thủ công field PascalCase → camelCase nếu muốn dùng chung component hiển thị với list.

**Response 400** (2 trường hợp cần FE xử lý UI riêng):
```json
{ "success": false, "message": "Hóa đơn ngoại khóa không thuộc quy trình duyệt/công khai" }
```
```json
{ "success": false, "message": "Hóa đơn đã được công khai trước đó" }
```
→ FE nên **ẩn hẳn nút "Công khai"** trên UI khi `invoiceType === 'EXTRACURRICULAR'` hoặc `published === true`, thay vì để user bấm rồi nhận lỗi 400.

**Response 404:**
```json
{ "success": false, "message": "Không tìm thấy hóa đơn" }
```

---

### 3.4. `GET /api/v1/principal/invoices` *(endpoint cũ, có filter mới)*

Dùng để hiển thị danh sách hóa đơn — cả nháp lẫn đã công khai. Đây là API chính cho màn hình "Duyệt hóa đơn".

**Query params (tất cả optional, kết hợp AND với nhau):**
| Param | Giá trị | Ghi chú |
|---|---|---|
| `studentId` | number | |
| `billingMonth` | string `MM-YYYY` | |
| `paymentStatus` | `Unpaid` \| `Partial` \| `Paid` | |
| `invoiceType` | `TUITION` \| `MONTHLY` \| `EXTRACURRICULAR` | |
| `published` | `"1"` / `"true"` = đã công khai; `"0"` / `"false"` = còn nháp | Bỏ query này = lấy cả hai loại |

**Ví dụ — lấy danh sách hóa đơn NHÁP của tháng 8/2026 để hiển thị màn "Duyệt hóa đơn":**
```
GET /api/v1/principal/invoices?billingMonth=08-2026&published=0
```

**Response 200:**
```json
{
  "success": true,
  "data": [
    {
      "id": 53,
      "studentId": 19,
      "studentFullName": "Nguyễn Minh Chánh",
      "classId": 13,
      "className": "Chồi 1",
      "packageId": 1,
      "packageName": "Gói 3 tháng",
      "periodRange": "08-2026 - 10-2026",
      "billingMonth": "08-2026",
      "tuitionFee": "4000000.00",
      "expectedMealFee": "1150000.00",
      "extracurricularFee": "0.00",
      "surcharge": "0.00",
      "refundAmount": "0.00",
      "discountAmount": "0.00",
      "totalAmount": "5150000.00",
      "paymentStatus": "Unpaid",
      "invoiceType": "MONTHLY",
      "createdAt": 1754006700,
      "dueDate": null,
      "published": 0,
      "publishedAt": null,
      "reminderSentAt": null,
      "overdueReminderSentAt": null
    }
  ]
}
```
Lưu ý: response này dùng **camelCase** (khác với response PascalCase của `publishInvoice` ở mục 3.3) — đây là 2 hàm khác nhau trong code, FE cần map riêng cho từng endpoint, không dùng chung 1 type/interface.

`published` ở đây trả về **số nguyên** `0`/`1` (MySQL tinyint), không phải boolean thuần JS — FE nên so sánh bằng `=== 1` / `=== 0` hoặc ép kiểu `Boolean(row.published)`, tránh dùng `row.published === true` (sẽ luôn `false`).

---

### 3.5. `GET /api/v1/principal/invoices/{id}` *(endpoint cũ, đã bổ sung field published/publishedAt)*

Lấy chi tiết 1 hóa đơn kèm lịch sử giao dịch (`transactions`) — dùng khi hiệu trưởng bấm "Xem chi tiết" trên 1 dòng ở màn Duyệt hóa đơn, trước khi quyết định sửa surcharge/due-date hoặc publish riêng lẻ.

⚠️ Trước bản cập nhật này, endpoint đã **thiếu** `published`/`publishedAt` trong response dù list API đã có — đã bổ sung để nhất quán. Nếu FE đã integrate trước đó mà không thấy 2 field này, chỉ cần gọi lại là có ngay, không cần đổi cách gọi.

**Request:**
```
GET /api/v1/principal/invoices/53
Authorization: Bearer <principal_token>
```

**Response 200 (camelCase — cùng convention với `GET /principal/invoices` list, KHÔNG phải PascalCase như mục 3.3):**
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
    "packageId": null,
    "packageName": null,
    "periodRange": null,
    "billingMonth": "08-2026",
    "tuitionFee": "0.00",
    "expectedMealFee": "1150000.00",
    "extracurricularFee": "0.00",
    "surcharge": "50000.00",
    "refundAmount": "0.00",
    "discountAmount": "0.00",
    "totalAmount": "1200000.00",
    "paymentStatus": "Unpaid",
    "invoiceType": "MONTHLY",
    "createdAt": 1754006700,
    "dueDate": null,
    "published": 0,
    "publishedAt": null,
    "reminderSentAt": null,
    "overdueReminderSentAt": null,
    "transactions": [
      {
        "id": 101,
        "amountPaid": "500000.00",
        "paymentMethod": "MoMo",
        "transactionCode": "abc123",
        "transactionDate": 1754100000,
        "status": "Success"
      }
    ]
  }
}
```
- `transactions`: mảng rỗng nếu chưa có giao dịch nào — FE nên hiển thị "Chưa có giao dịch" thay vì bảng trống trơn.
- `404` nếu `id` không tồn tại: `{ "success": false, "message": "Không tìm thấy hóa đơn với id = 53" }`

---

## 4. API PHÍA PHỤ HUYNH — hành vi thay đổi (không phải API mới, nhưng response khác đi)

### 4.1. `GET /api/v1/parent/children/{studentId}/invoices`
### 4.2. `GET /api/v1/parent/invoices/{invoiceId}`
### 4.3. `POST /api/v1/parent/invoices/{invoiceId}/pay`, `/pay-momo`, `/pay-vnpay`

**Không đổi request/response shape.** Nhưng hành vi ẩn dữ liệu thay đổi:
- Hóa đơn `TUITION`/`MONTHLY` có `Published = 0` **sẽ không xuất hiện** trong danh sách (4.1), và gọi thẳng `GET /parent/invoices/{invoiceId}` (4.2) hoặc thanh toán (4.3) vào 1 invoiceId chưa publish sẽ nhận:
  - `403 Forbidden` — "Bạn không có quyền truy cập/thanh toán hóa đơn này" (vì check quyền sở hữu và check publish gộp chung 1 điều kiện ở BE)
  - Hoặc `404 Not Found` — "Không tìm thấy hóa đơn" (tùy đường gọi)
- Hóa đơn `EXTRACURRICULAR` **không bị ảnh hưởng gì** — hiển thị/thanh toán y hệt như trước giờ.

**⚠️ FE KHÔNG cần sửa code màn hình phụ huynh** — chỉ cần biết rằng nếu tự dưng thấy danh sách hóa đơn "ít hơn" hoặc gặp 403/404 khi test bằng 1 invoiceId cụ thể, đó là vì hóa đơn đó **chưa được hiệu trưởng công khai**, không phải bug.

---

## 5. Luồng tích hợp đề xuất (để FE tự kiểm thử end-to-end)

1. **Hiệu trưởng** gọi `POST /billing/run-monthly` với `billingMonth` bất kỳ → tạo hóa đơn nháp.
2. **Hiệu trưởng** vào màn "Duyệt hóa đơn" → `GET /principal/invoices?billingMonth=...&published=0` → thấy danh sách nháp.
3. **Hiệu trưởng** (tùy chọn) sửa 1 hóa đơn: `PATCH /billing/invoices/{id}/surcharge` hoặc `/due-date`.
4. **Hiệu trưởng** bấm "Công khai tất cả" → `PATCH /billing/invoices/publish` với `billingMonth`.
   - Hoặc bấm "Công khai" trên 1 dòng cụ thể → `PATCH /billing/invoices/{id}/publish`.
5. **Phụ huynh** giờ mới `GET /parent/children/{studentId}/invoices` thấy hóa đơn, thanh toán bình thường.

---

## 6. YÊU CẦU GIAO DIỆN FE (để đưa vào Claude design)

### 6.1. Màn hình mới: "Duyệt hóa đơn hàng tháng" (Principal)

**Vị trí:** menu Hiệu trưởng, mục Học phí/Hóa đơn → thêm tab hoặc màn con "Duyệt hóa đơn".

**Bố cục:**
- **Bộ lọc trên cùng:**
  - Dropdown chọn tháng billing (`billingMonth`, định dạng hiển thị "Tháng 8/2026" nhưng gửi API dạng `08-2026`)
  - Toggle/Tab 2 trạng thái: **"Đang chờ duyệt" (published=0)** | **"Đã công khai" (published=1)** — mặc định mở vào tab "Đang chờ duyệt"
  - (Tùy chọn) filter thêm theo `invoiceType`: Học phí / Tiền ăn — lưu ý loại trừ hẳn `EXTRACURRICULAR` khỏi màn hình này vì không thuộc quy trình duyệt

- **Bảng danh sách hóa đơn nháp**, mỗi dòng gồm:
  - Tên học sinh, lớp
  - Loại hóa đơn (badge: "Học phí" / "Tiền ăn")
  - Kỳ (`periodRange` nếu có, hoặc chỉ `billingMonth`)
  - Chi tiết số tiền: học phí, tiền ăn dự kiến, phụ thu, hoàn tiền, giảm giá, **tổng cộng** (`totalAmount`) — nên có nút "xem chi tiết" mở rộng dòng thay vì hiện hết mọi cột (dễ rối)
  - Trạng thái: badge "Nháp" (màu vàng/xám) khi `published=0`
  - Cột hành động: nút **"Sửa phụ thu"** (mở modal nhập amount + note), nút **"Công khai"** (riêng dòng này)

- **Thanh hành động hàng loạt (bulk action bar)** phía trên bảng hoặc dưới cùng:
  - Nút chính, nổi bật: **"Công khai tất cả ([N] hóa đơn)"** — N = số lượng hóa đơn nháp đang hiển thị theo filter tháng hiện tại
  - Bấm vào → **Modal xác nhận bắt buộc** (đây là hành động không thể hoàn tác dễ dàng — không có API "unpublish"):
    ```
    Xác nhận công khai [N] hóa đơn tháng [Tháng 8/2026]?

    Sau khi công khai:
    - Phụ huynh sẽ thấy và có thể thanh toán ngay.
    - Hạn đóng sẽ được tính là 10 ngày kể từ bây giờ.
    - Không thể hoàn tác/ẩn lại sau khi đã công khai.

    [Hủy]   [Xác nhận công khai]
    ```
  - Nút nên **disable** (kèm tooltip "Không có hóa đơn nào đang chờ duyệt") khi `N = 0`, tránh gọi API vô nghĩa.

- **Trạng thái rỗng:** khi tab "Đang chờ duyệt" không có gì → hiển thị empty state kiểu "🎉 Không có hóa đơn nào đang chờ duyệt cho tháng này" + gợi ý nút "Chạy hóa đơn tháng này ngay" (gọi `run-monthly`, xem mục 6.2) nếu tháng đó thực sự chưa chạy cron.

### 6.2. Khu vực "Demo / Test" (chỉ Principal, có thể để trong Settings hoặc màn Duyệt hóa đơn dưới dạng nút phụ)

- Nút **"Chạy hóa đơn tháng này ngay"** (dịch nghĩa cho non-technical: không nói "cron" hay "trigger" với hiệu trưởng thật, nhưng nếu là đồ án/demo thì có thể ghi rõ "Demo: Tạo hóa đơn ngay (không cần đợi ngày 1)")
  - Cho phép chọn `billingMonth` qua dropdown tháng (mặc định = tháng hiện tại)
  - Bấm xong → toast hiển thị kết quả: "Đã tạo X hóa đơn học phí, Y hóa đơn tiền ăn, Z hóa đơn ngoại khóa gia hạn" (map từ `data.generated`)
  - Nếu `failedStudentIds.length > 0` → hiển thị alert cảnh báo riêng: "Có [n] học sinh chưa tạo được hóa đơn do thiếu cấu hình học phí" kèm nút xem danh sách ID (hoặc link sang màn Cấu hình học phí)

### 6.3. Badge trạng thái publish — dùng nhất quán mọi nơi hiển thị hóa đơn (Principal)

Bất kỳ đâu hiển thị hóa đơn `TUITION`/`MONTHLY` phía hiệu trưởng (màn chi tiết học sinh, chi tiết lớp...) nên thêm badge nhỏ:
- `published = 0` → badge xám/vàng "Nháp — chưa công khai"
- `published = 1` → badge xanh lá "Đã công khai" + tooltip hiện `publishedAt` (format "Công khai lúc 10:05 01/08/2026")

Hóa đơn `EXTRACURRICULAR` **không hiển thị badge này** (vì luôn coi như đã công khai, badge sẽ gây hiểu nhầm không cần thiết).

### 6.4. Phía Phụ huynh — không cần thay đổi UI

Không cần thêm UI mới. Chỉ cần lưu ý cho QA/test: nếu phụ huynh test mà "không thấy hóa đơn tháng này đâu cả" → kiểm tra lại xem hiệu trưởng đã bấm "Công khai" chưa, đừng vội báo bug.

---

## 7. Checklist tránh sai sót khi tích hợp

- [ ] Không hiển thị `dueDate = null` như ngày tháng hợp lệ — luôn check `null` trước khi format.
- [ ] `published` trả về `0`/`1` (number) ở API list (`GET /principal/invoices`), không phải `true`/`false`.
- [ ] Response của `PATCH /billing/invoices/{id}/publish`, `/surcharge`, `/due-date` dùng **PascalCase** raw DB columns (`InvoiceID`, `TotalAmount`...) — khác với **camelCase** của `GET /principal/invoices` và các API list khác. Không dùng chung 1 TypeScript interface cho cả hai.
- [ ] Nút "Công khai" (đơn lẻ) phải **ẩn** khi `invoiceType === 'EXTRACURRICULAR'` hoặc `published === 1`/`true` — nếu không sẽ nhận lỗi 400 vô nghĩa với user.
- [ ] `PATCH /billing/invoices/publish` (hàng loạt) yêu cầu `billingMonth` bắt buộc trong body — thiếu sẽ bị 400.
- [ ] Route `/billing/invoices/publish` và `/billing/invoices/{invoiceId}/publish` là 2 endpoint khác nhau (hàng loạt theo tháng vs. đơn lẻ theo ID) — đừng nhầm khi gọi.
- [ ] Không có API "unpublish" / "hủy công khai" — hành động publish là một chiều, UI phải xác nhận rõ trước khi gọi.
- [ ] Hóa đơn `EXTRACURRICULAR` không xuất hiện trong màn "Duyệt hóa đơn" và không có khái niệm nháp — nếu FE lỡ hiển thị nó trong danh sách chờ duyệt sẽ gây nhầm lẫn vì nó luôn `published=1` sẵn.
- [ ] `GET /principal/invoices/{id}` (xem chi tiết 1 hóa đơn) dùng camelCase giống list, **không phải** PascalCase như `publishInvoice` — 2 response khác convention dù cùng là "1 invoice object".
