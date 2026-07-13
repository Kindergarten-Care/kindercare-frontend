# Bổ sung ngày nghỉ lễ (holidays) vào API sự kiện hàng ngày — FE Integration Guide

## 1. Bối cảnh

`GET /parent/events/daily` trước đây chỉ trả về `events` (từ bảng `Events` — sự kiện do hiệu trưởng tạo: School/Class/Student/Holiday), **hoàn toàn không có** dữ liệu từ bảng `Holidays` — bảng ngày nghỉ lễ chính thức mà hệ thống billing đang dùng để tính trừ tiền ăn hàng tháng.

**Quan trọng:** `Events` (loại `EventType='Holiday'`) và `Holidays` là **2 nguồn dữ liệu độc lập, không liên kết với nhau**:
- `Events` loại `Holiday` — do hiệu trưởng tạo tay qua màn Sự kiện, mang tính hiển thị/thông báo, KHÔNG ảnh hưởng đến tính tiền.
- `Holidays` — bảng cấu hình riêng theo năm học (`YearID`), là nguồn **duy nhất** mà cron tính tiền ăn hàng tháng (`runMonthlyBilling`) dùng để trừ ngày công khi tính `ExpectedMealFee`.

Nếu FE trước đây chỉ hiển thị `events` mà mong đó là "toàn bộ ngày nghỉ ảnh hưởng đến tiền ăn", thì thiếu — vì `Holidays` có thể có dữ liệu khác hoàn toàn với `Events` loại Holiday (hiệu trưởng có thể quên tạo Event nhưng vẫn đã cấu hình `Holidays` cho billing, hoặc ngược lại).

Giờ API đã bổ sung thêm field **`holidays`** lấy đúng từ bảng `Holidays` — cùng nguồn dữ liệu mà billing dùng để tính tiền, để FE hiển thị nhất quán với con số tiền ăn thực tế.

---

## 2. API thay đổi

### `GET /api/v1/parent/events/daily`

**Request không đổi** — vẫn dùng `studentId` + (`date` hoặc `startDate`+`endDate`).

**Response — thêm field mới `holidays`:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Lấy danh sách sự kiện thành công",
  "data": {
    "date": "2027-09-02",
    "startDate": null,
    "endDate": null,
    "studentId": 19,
    "classId": 13,
    "events": [],
    "holidays": [
      {
        "holidayId": 1,
        "holidayDate": 1787884800,
        "holidayName": "Quốc khánh 2/9"
      }
    ]
  }
}
```

### Field `holidays[]`
| Field | Kiểu | Ý nghĩa |
|---|---|---|
| `holidayId` | `integer` | ID ngày lễ |
| `holidayDate` | `integer` | Unix timestamp (giây) — **1 mốc ngày duy nhất**, không có khoảng start/end như `events` |
| `holidayName` | `string \| null` | Tên ngày lễ, vd "Quốc khánh 2/9" |

**Lọc theo đúng năm học của học sinh:** `Holidays` có cột `YearID` — BE tự động lấy `YearID` từ lớp hiện tại của học sinh (`Classes.YearID`) để chỉ trả về ngày lễ thuộc năm học đó. Nếu học sinh **chưa được xếp lớp** (`ClassID = NULL`), `holidays` sẽ luôn là mảng rỗng `[]` (không đoán bừa lấy ngày lễ của năm học nào).

---

## 3. Khác biệt cấu trúc — `holidays` KHÔNG giống `events`

| | `events[]` | `holidays[]` |
|---|---|---|
| Nguồn | Bảng `Events` | Bảng `Holidays` |
| Có `startTime`/`endTime` | ✅ (khoảng thời gian) | ❌ — chỉ có `holidayDate` (1 mốc) |
| Có `eventType`, `status`, `location`, `description` | ✅ | ❌ — không có field nào trong số này |
| Ảnh hưởng tới tính tiền ăn | ❌ Không | ✅ Có — nguồn billing dùng để trừ ngày công |
| Do ai tạo | Hiệu trưởng tạo tay qua màn Sự kiện | Cấu hình riêng theo năm học (màn Cấu hình ngày nghỉ lễ) |

**Đừng gộp 2 mảng này thành 1 danh sách chung** — cấu trúc dữ liệu khác nhau hoàn toàn (không có `eventId`, không có khoảng thời gian), gộp sẽ phải bịa thêm field giả.

---

## 4. Gợi ý hiển thị UI

- Nếu đang hiển thị lịch/timeline theo ngày cho phụ huynh, nên đánh dấu riêng các ngày có trong `holidays` bằng 1 icon/màu khác với `events` loại School/Class — vì đây là ngày **chắc chắn nghỉ theo quy định trường**, khác với "sự kiện" thông thường.
- Nếu FE có màn hình liên quan tới hóa đơn/tiền ăn (vd giải thích "vì sao tháng này ít ngày công hơn tháng trước"), nên đối chiếu với `holidays` từ API này — đây là dữ liệu đúng với con số đã trừ trong hóa đơn `MONTHLY` (`ExpectedMealFee`), không phải `events`.

---

## 5. Checklist tránh sai sót

- [ ] `holidays[].holidayDate` là **1 mốc thời gian duy nhất** (không phải khoảng) — khác hoàn toàn với `events[].startTime`/`endTime`. Đừng tái dùng logic parse "khoảng ngày" của `events` cho `holidays`.
- [ ] `holidays` không có `eventType`/`status`/`description`/`location` — nếu component hiển thị đang cố đọc các field này từ item trong `holidays`, sẽ luôn nhận `undefined`.
- [ ] `holidays` trả rỗng `[]` nếu học sinh chưa được xếp lớp — không phải lỗi API, không phải "chưa có ngày lễ nào cấu hình".
- [ ] `holidays` và `events` (loại `Holiday`) là 2 nguồn **độc lập** — không giả định chúng luôn khớp nhau. Có thể `events` có 1 sự kiện "Nghỉ lễ ABC" nhưng `holidays` không có ngày đó (hiệu trưởng quên cấu hình `Holidays` cho billing), hoặc ngược lại.
- [ ] Chỉ `holidays` (không phải `events`) là nguồn dữ liệu đúng khi cần đối chiếu với số tiền ăn đã tính trong hóa đơn hàng tháng.
