# Yêu cầu BE — API công khai hóa đơn theo danh sách chọn (bulk-select)

## Bối cảnh

Màn hình "Duyệt hóa đơn" (principal) hiện có 2 cách công khai hóa đơn:
- `PATCH /billing/invoices/publish` — công khai **toàn bộ** hóa đơn nháp của 1 `billingMonth`.
- `PATCH /billing/invoices/{invoiceId}/publish` — công khai **1 hóa đơn** theo ID.

FE vừa thêm chế độ **bulk-select** (chọn nhiều dòng bằng checkbox) để hiệu trưởng có thể công khai một **tập con tùy ý** trong danh sách nháp (ví dụ: đã rà soát xong 12/45 hóa đơn, muốn công khai riêng 12 hóa đơn đó, chưa muốn động tới 33 hóa đơn còn lại). 2 API hiện có không đáp ứng được trường hợp này (1 = tất cả, 1 = chỉ 1 cái).

## API cần bổ sung

```
PATCH /api/v1/billing/invoices/publish-selected
Authorization: Bearer <principal_token>
Content-Type: application/json

{
  "invoiceIds": [53, 54, 60]
}
```

### Validation đề xuất
- `invoiceIds`: bắt buộc, mảng số nguyên, tối thiểu 1 phần tử.
- Mỗi `invoiceId` phải là hóa đơn `InvoiceType` = `TUITION`/`MONTHLY` và `Published = 0` — nếu lẫn ID không hợp lệ (đã publish, là EXTRACURRICULAR, hoặc không tồn tại), đề xuất **bỏ qua** ID đó (giống hành vi "không báo lỗi" của API bulk theo tháng) và trả về số lượng thực tế đã công khai + danh sách ID bị bỏ qua, để FE có thể thông báo cho hiệu trưởng.

### Response 200 đề xuất
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Đã công khai 3 hóa đơn",
  "data": {
    "publishedCount": 3,
    "publishedIds": [53, 54, 60],
    "skippedIds": []
  }
}
```

### Response 400 đề xuất (thiếu/rỗng `invoiceIds`)
```json
{ "success": false, "message": "Vui lòng chọn ít nhất 1 hóa đơn để công khai" }
```

### DueDate khi publish
Giữ nguyên hành vi hiện có: mỗi hóa đơn được publish có `DueDate = publish lúc đó + 10 ngày` (tính độc lập theo thời điểm gọi API, không nhất thiết cùng 1 mốc cho cả batch).

## Ghi chú cho FE (đã áp dụng tạm thời)

FE đã code sẵn UI bulk-select và gọi endpoint trên qua `financeService.publishSelectedInvoices(invoiceIds)`. Cho đến khi BE triển khai xong, API này sẽ trả `404` — khi BE xong chỉ cần xác nhận lại đúng path/field name ở trên (hoặc báo FE nếu muốn đổi tên field/route khác).
