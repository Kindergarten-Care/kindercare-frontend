# Chế độ demo "tính tiền ăn theo ngày thực tế" (partialMonth) — FE Integration Guide

## 1. Bối cảnh

Bình thường `POST /billing/run-monthly` tính `ExpectedMealFee` = **thu trước cả tháng** (số ngày công cả tháng × đơn giá) — đúng với nghiệp vụ thật vì cron chạy 00:05 ngày 1, chưa có ngày nào trôi qua để biết chính xác bé nghỉ hay không.

Nhưng khi **demo/test** bằng cách trigger tay giữa tháng (vd hôm nay là 13/7 mà muốn xem thử luồng tạo hóa đơn), tính cả tháng sẽ không phản ánh đúng thực tế đã diễn ra. Giờ có thêm cờ **`partialMonth`** để xử lý đúng trường hợp này — **không ảnh hưởng gì đến cron thật** (cron tự động không gửi cờ này).

---

## 2. API thay đổi

### `POST /api/v1/billing/run-monthly`

**Request — thêm field mới `partialMonth` (optional, boolean, default `false`):**
```json
{
  "billingMonth": "07-2026",
  "partialMonth": true
}
```

### Công thức khi `partialMonth: true`
```
ExpectedMealFee = (số ngày công từ ngày 1 → HÔM NAY) − (số ngày nghỉ có phép cùng khoảng đó)
                  × đơn giá tiền ăn/ngày
```
"Ngày công" = Thứ 2–6, đã trừ ngày lễ (`Holidays`). "Nghỉ có phép" = `LeaveRequests` có `IsMealFeeDeducted = 1` giao với khoảng ngày 1 → hôm nay.

### ⚠️ Điều kiện để cờ này thực sự có tác dụng
`partialMonth: true` **chỉ áp dụng khi `billingMonth` trùng đúng tháng/năm hiện tại** của server. Nếu bạn truyền `billingMonth` là tháng đã qua hoặc tháng tương lai, "hôm nay" không có ý nghĩa gì bên trong tháng đó — BE sẽ **âm thầm bỏ qua cờ này** và tính cả tháng như bình thường (không báo lỗi, không cảnh báo).

→ Cách kiểm tra chắc chắn cờ có hiệu lực: đọc lại response, xem `data.partialMonth` (server xác nhận có áp dụng hay không) chứ đừng tự suy đoán ở FE.

---

## 3. Response mới

**Response 200:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Chạy hóa đơn hàng tháng thành công",
  "data": {
    "billingMonth": "07-2026",
    "generated": {
      "tuition": 2,
      "monthly": 42,
      "extracurricular": 5
    },
    "skipped": 0,
    "failedStudentIds": [],
    "partialMonth": true,
    "partialUntilDay": 13
  }
}
```

### Field mới
| Field | Kiểu | Ý nghĩa |
|---|---|---|
| `partialMonth` | `boolean` | **Xác nhận thực tế** đã áp dụng chế độ tính theo ngày hay chưa — có thể là `false` dù bạn gửi `partialMonth: true` trong request, nếu `billingMonth` không phải tháng hiện tại (xem mục 2). |
| `partialUntilDay` | `integer \| null` | Ngày trong tháng dùng làm mốc cắt (vd `13` = tính đến hết ngày 13). `null` nếu `partialMonth = false`. |

**Khi gọi bình thường (không gửi `partialMonth`, hoặc gửi `false`):**
```json
{
  "data": {
    "...": "...",
    "partialMonth": false,
    "partialUntilDay": null
  }
}
```

---

## 4. Luồng demo đề xuất cho FE

1. UI có 1 khu vực riêng (nên tách biệt rõ khỏi luồng "chạy billing thật", ví dụ khung "Demo/Test" hoặc chỉ hiện ở môi trường dev/staging).
2. Cho hiệu trưởng chọn tháng (mặc định = tháng hiện tại) + toggle "Tính theo ngày thực tế (demo)".
3. Gọi API với `partialMonth` = giá trị toggle.
4. Sau khi nhận response, **đọc lại `data.partialMonth`** để hiển thị đúng thông báo:
   - `true` → "Đã tạo hóa đơn tính theo X ngày công đã qua (đến ngày `partialUntilDay`)."
   - `false` (dù đã gửi `true` trong request) → "Tháng đã chọn không phải tháng hiện tại, hệ thống đã tính đủ cả tháng như bình thường." (tránh để user hiểu nhầm là tính theo ngày mà thực ra không phải).

---

## 5. Checklist tránh sai sót

- [ ] Cờ `partialMonth` chỉ nên xuất hiện ở khu vực demo/test — **không** đưa vào luồng chạy billing thật hàng tháng của hiệu trưởng, dễ gây nhầm lẫn giữa "thu trước" và "thu theo ngày đã qua".
- [ ] Không tự suy luận "cờ có hiệu lực hay không" ở FE bằng cách so sánh `billingMonth` với ngày hiện tại của **client** — dùng đúng field `partialMonth` trong response (do server tính, theo giờ server).
- [ ] Cron tự động (00:05 ngày 1 hàng tháng) **không bao giờ** gửi `partialMonth` — hành vi thu trước cả tháng cho nghiệp vụ thật hoàn toàn không đổi, không cần lo ngại ảnh hưởng.
- [ ] `partialUntilDay` chỉ ảnh hưởng đến `ExpectedMealFee` của hóa đơn `MONTHLY` — không ảnh hưởng gì đến hóa đơn `TUITION` (học phí theo gói, vẫn tính nguyên chu kỳ như cũ) hay `EXTRACURRICULAR`.
- [ ] Đây vẫn là hóa đơn **nháp** (`Published = 0`) như luồng bình thường — vẫn cần hiệu trưởng bấm "Công khai" (`PATCH /billing/invoices/publish`) mới cho phụ huynh thấy được, không có gì thay đổi ở bước này.
