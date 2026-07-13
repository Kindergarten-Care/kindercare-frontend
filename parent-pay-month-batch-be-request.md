# Yêu cầu BE — API thanh toán gộp cả tháng (pay-month)

## Bối cảnh

Màn "Hóa đơn" (phụ huynh) hiện gộp hiển thị các hóa đơn cùng `billingMonth` thành 1 thẻ tổng (vd "Hóa đơn Tháng 7/2026" = Học phí + Ngoại khóa = 27.300.000đ), nhưng đây **chỉ là gộp hiển thị phía FE** — bấm vào vẫn dẫn tới từng hóa đơn riêng để thanh toán từng cái một.

Phụ huynh muốn có thể **thanh toán 1 lần cho cả tháng** thay vì phải thanh toán từng hóa đơn (Học phí, Tiền ăn, Ngoại khóa...) riêng lẻ. Hiện tại 3 API thanh toán đều là REST gắn cứng 1 `:invoiceId` (`/parent/invoices/:invoiceId/pay`, `/pay-momo`, `/pay-vnpay`) — không đáp ứng được trường hợp này.

## Luồng đề xuất

```
[1] FE gọi API thanh toán gộp theo billingMonth + studentId
        │
        ▼
[2] BE gom toàn bộ hóa đơn Unpaid/Partial của tháng đó (loại trừ hóa đơn đã Paid)
        │
        ▼
[3] BE tạo 1 giao dịch gộp (1 orderId/txnRef) với tổng tiền còn phải thu
        │
        ▼
[4] Trả về 1 payUrl duy nhất — phụ huynh redirect sang cổng thanh toán 1 lần
        │
        ▼
[5] Callback từ MoMo/VNPay về → BE tự cập nhật PaymentStatus = Paid
    cho TẤT CẢ invoiceId đã gộp trong giao dịch đó
```

## API cần bổ sung

### 1. `POST /api/v1/parent/invoices/pay-month`

**Request:**
```json
POST /api/v1/parent/invoices/pay-month
Authorization: Bearer <parent_token>
Content-Type: application/json

{
  "studentId": 19,
  "billingMonth": "07-2026",
  "paymentMethod": "momo"
}
```

| Field | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `studentId` | number | Có | Học sinh cần thanh toán |
| `billingMonth` | string `MM-YYYY` | Có | Tháng billing cần gộp thanh toán |
| `paymentMethod` | `"momo"` \| `"vnpay"` | Có | Cổng thanh toán — vẫn cần 2 API/nhánh riêng như hiện tại (`pay-momo`/`pay-vnpay`), không gộp chung 1 phương thức xử lý cả 2 cổng nếu logic khác nhau nhiều |

### Validation đề xuất
- Chỉ gộp các hóa đơn có `PaymentStatus IN ('Unpaid', 'Partial')` và `BillingMonth` khớp — **bỏ qua** hóa đơn đã `Paid` (không tính vào tổng, không lỗi).
- Nếu hóa đơn `Partial` (đã trả 1 phần), số tiền gộp vào giao dịch mới chỉ tính phần **còn thiếu** (`TotalAmount - đã trả`), không phải `TotalAmount` gốc.
- Nếu tháng đó không còn hóa đơn nào cần thanh toán (tất cả đã Paid, hoặc `billingMonth` không tồn tại), trả lỗi rõ ràng — xem Response 400 bên dưới.
- Hóa đơn `EXTRACURRICULAR` cùng tháng vẫn được gộp bình thường (không có quy tắc loại trừ nào khác với `TUITION`/`MONTHLY`).

### Response 200 đề xuất
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Tạo giao dịch thanh toán gộp thành công",
  "data": {
    "payUrl": "https://payment.momo.vn/...",
    "orderId": "KC-MONTH-20260714-001",
    "billingMonth": "07-2026",
    "invoiceIds": [73, 74],
    "totalAmount": 27300000
  }
}
```
(Với `paymentMethod = "vnpay"`, đổi `orderId` thành `txnRef` để nhất quán với response hiện có của `/pay-vnpay` — xem ghi chú "Khác biệt response theo cổng" bên dưới.)

### Response 400 đề xuất
```json
{ "success": false, "message": "Không có hóa đơn nào cần thanh toán cho tháng 07-2026" }
```
```json
{ "success": false, "message": "paymentMethod phải là 'momo' hoặc 'vnpay'" }
```

## 2. Cập nhật cần thiết ở callback/webhook của MoMo & VNPay

Đây là phần **quan trọng nhất** — không chỉ thêm API mới, mà callback xử lý kết quả thanh toán hiện tại (đang map 1 giao dịch → 1 `InvoiceID`) cần sửa để hỗ trợ **1 giao dịch → nhiều `InvoiceID`**:

- Khi tạo giao dịch gộp ở bước 3, BE cần lưu lại danh sách `invoiceIds` đã gộp, gắn với `orderId`/`txnRef` đó (vd bảng `TransactionInvoiceMap` hoặc cột JSON `InvoiceIds` trên bảng giao dịch — tùy giải pháp DB hiện có).
- Khi callback báo thành công, BE lặp qua toàn bộ `invoiceIds` đã lưu, set `PaymentStatus = Paid` (hoặc `Partial` nếu logic chia tiền theo tỷ lệ — cần BE quyết định, xem mục 4) cho từng hóa đơn, thay vì chỉmột `InvoiceID` như hiện tại.
- Nếu giữ nguyên bảng `Transactions` hiện có (1 dòng = 1 giao dịch gắn 1 `InvoiceID`), có thể tạo **nhiều dòng transaction** (1 dòng/hóa đơn) nhưng cùng chia sẻ 1 `orderId`/`txnRef` — miễn sao khi FE gọi lại `GET /parent/invoices/{invoiceId}` cho từng hóa đơn trong nhóm, đều thấy `transactions[]` phản ánh đúng giao dịch đã thực hiện.

## 3. Field mới cần thiết ở API polling kết quả

Sau khi redirect về, FE cần biết **toàn bộ** hóa đơn trong batch đã Paid hay chưa (không chỉ 1 cái) — 2 hướng có thể chọn, đề xuất BE quyết định hướng nào dễ triển khai hơn với hạ tầng hiện có:

- **(A)** FE tự gọi lại `GET /parent/invoices/{invoiceId}` cho từng ID trong `invoiceIds` đã lưu tạm ở FE (từ response bước 200 ở trên) — không cần BE làm thêm gì, chỉ cần đảm bảo mỗi hóa đơn riêng lẻ đã được cập nhật đúng `PaymentStatus` sau callback (xem mục 2).
- **(B)** BE thêm API mới `GET /parent/invoices/pay-month/{orderId}/status` trả về trạng thái gộp:
  ```json
  { "data": { "orderId": "KC-MONTH-...", "allPaid": true, "invoices": [{ "invoiceId": 73, "paymentStatus": "Paid" }, { "invoiceId": 74, "paymentStatus": "Paid" }] } }
  ```

FE hiện đã có sẵn cơ chế polling từng `invoiceId` riêng lẻ (`usePaymentResult.ts`), nên hướng (A) là ít việc nhất cho BE — chỉ cần đảm bảo mục 2 hoạt động đúng.

## 4. Câu hỏi cần BE xác nhận trước khi FE tích hợp

- [ ] Với hóa đơn đang `Partial` (đã trả 1 phần), khi gộp vào giao dịch mới, có tính đúng phần còn thiếu không, hay bắt buộc phải trả hết `TotalAmount` gốc (không hỗ trợ trả góp thêm lần nữa qua kênh gộp)?
- [ ] Giới hạn số lượng hóa đơn tối đa có thể gộp trong 1 giao dịch (nếu cổng thanh toán có giới hạn mô tả/số dòng)?
- [ ] Có cần hiển thị breakdown (từng hóa đơn + số tiền) trên trang thanh toán của MoMo/VNPay, hay chỉ cần 1 dòng mô tả tổng quát ("Thanh toán học phí tháng 07-2026")?

## Ghi chú cho FE (đã áp dụng tạm thời)

FE sẽ code sẵn nút "Thanh toán cả tháng" ở thẻ gộp trong `MonthGroupList`, gọi qua `invoiceService.payMonthMomo(studentId, billingMonth)` / `payMonthVnpay(...)`. Cho đến khi BE triển khai xong, API này sẽ trả `404` — khi xong chỉ cần xác nhận lại đúng path/field name ở trên (hoặc báo FE nếu muốn đổi tên field/route/response shape khác).
