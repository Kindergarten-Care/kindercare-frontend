# QR Attendance — KinderCare

**Version:** 1.0 | **Signing:** JWT HS256 | **Liên quan:** `Attendances` table

---

## Tổng quan luồng

```
Parent app  ──GET qr-token──▶  BE sinh JWT  ──▶  FE hiển thị QR
                                                        │
Teacher app  ──camera quét──▶  đọc JWT string  ──POST scan──▶  BE ghi điểm danh
```

---

## API 1 — Sinh QR Token (Parent)

### Endpoint

```
GET /api/v1/parent/children/:studentId/qr-token
Authorization: Bearer <parent_jwt>
```

### Response 200

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "expiresAt": 1719532860,
    "ttl": 60
  }
}
```

### JWT Payload (trước khi ký)

```json
{
  "sub": "123",
  "iat": 1719532800,
  "exp": 1719532860,
  "jti": "uuid-v4"
}
```

### Logic BE

1. Xác nhận parent có quyền truy cập `studentId` (bảng `StudentParents`)
2. Sinh JWT HS256 bằng `QR_TOKEN_SECRET` (tách biệt với `JWT_SECRET`)
3. Trả về `token`, `expiresAt`, `ttl`

### Error

| HTTP | Message |
|------|---------|
| 403 | Học sinh không thuộc về phụ huynh này |
| 404 | Không tìm thấy học sinh |

---

## API 2 — Quét QR và ghi điểm danh (Teacher)

### Endpoint

```
POST /api/v1/teacher/attendance/scan
Authorization: Bearer <teacher_jwt>
Content-Type: application/json
```

### Request Body

```json
{
  "qrToken": "eyJhbGciOiJIUzI1NiJ9..."
}
```

### Response 200

```json
{
  "success": true,
  "data": {
    "studentId": 123,
    "fullName": "Nguyễn Văn A",
    "className": "Lớp 1A",
    "campusName": "Cơ sở Quận 1",
    "attendanceType": "checkin",
    "time": "07:45"
  }
}
```

### Logic BE (theo thứ tự)

| # | Bước | Thất bại |
|---|------|---------|
| 1 | Verify chữ ký JWT bằng `QR_TOKEN_SECRET` | 400 — Mã QR không hợp lệ |
| 2 | Kiểm tra `exp` chưa hết hạn | 400 — Mã QR đã hết hạn, yêu cầu phụ huynh làm mới |
| 3 | Kiểm tra `jti` chưa có trong cache (chống replay) | 409 — Mã QR đã được sử dụng |
| 4 | Query `Attendances` theo `studentId` + ngày hôm nay | 500 |
| 5 | Auto-detect checkin / checkout (bảng bên dưới) | 409 — Bé đã điểm danh đủ cả ngày |
| 6 | Ghi `jti` vào in-memory cache với TTL còn lại | 500 |
| 7 | Insert / Update bản ghi điểm danh | 500 |

### Auto-detect checkin vs checkout

| Trạng thái record hôm nay | Hành động |
|--------------------------|-----------|
| Không có record | **checkin** — Insert mới, `checkInTime = now`, `status = Present` |
| Có `checkInTime`, chưa có `checkOutTime` | **checkout** — Update `checkOutTime = now` |
| Có cả `checkInTime` và `checkOutTime` | 409 — Bé đã điểm danh đủ cả ngày |
| Có record với `status = Absent/Excused` | **checkin** — Update `checkInTime = now`, `status = Present` |

---

## FE Teacher — Hướng dẫn implement

### Stack gợi ý

React Native (hoặc Flutter) với thư viện camera scan QR, ví dụ:
- **React Native:** `react-native-vision-camera` + `vision-camera-code-scanner`
- **Flutter:** `mobile_scanner`

---

### Luồng màn hình

```
[Màn hình chính giáo viên]
        │
        ▼
[Nút "Quét điểm danh"]
        │
        ▼
[Màn hình Camera / QR Scanner]
        │  ── quét được QR ──▶  gọi POST /teacher/attendance/scan
        │
        ├─ success ──▶  [Màn hình kết quả: tên bé, checkin/checkout, giờ]
        │
        └─ error   ──▶  [Toast lỗi + tự reset camera để quét tiếp]
```

---

### React Native — Ví dụ implementation

#### 1. Màn hình scanner

```jsx
import { useCameraDevice, useCodeScanner } from 'react-native-vision-camera';

export default function QRScannerScreen() {
  const device = useCameraDevice('back');
  const [isProcessing, setIsProcessing] = useState(false);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: async (codes) => {
      if (isProcessing || !codes[0]?.value) return;

      setIsProcessing(true);
      await handleScan(codes[0].value);
      // Reset sau 2s để tránh quét lại liên tục
      setTimeout(() => setIsProcessing(false), 2000);
    },
  });

  return (
    <Camera
      device={device}
      isActive={!isProcessing}
      codeScanner={codeScanner}
      style={StyleSheet.absoluteFill}
    />
  );
}
```

#### 2. Gọi API scan

```js
const handleScan = async (qrToken) => {
  try {
    const res = await api.post('/teacher/attendance/scan', { qrToken });
    const { attendanceType, fullName, time } = res.data.data;

    showSuccessModal({
      title: attendanceType === 'checkin' ? '✅ Điểm danh vào' : '👋 Điểm danh ra',
      body: `${fullName} — ${time}`,
    });
  } catch (err) {
    const msg = err.response?.data?.message || 'Có lỗi xảy ra';
    showErrorToast(msg);
  }
};
```

#### 3. Màn hình kết quả (modal hoặc screen mới)

```jsx
function AttendanceResultModal({ data, onClose }) {
  const isCheckin = data.attendanceType === 'checkin';
  return (
    <Modal>
      <Icon name={isCheckin ? 'login' : 'logout'} />
      <Text style={styles.type}>{isCheckin ? 'Điểm danh vào' : 'Điểm danh ra'}</Text>
      <Text style={styles.name}>{data.fullName}</Text>
      <Text style={styles.class}>{data.className} · {data.campusName}</Text>
      <Text style={styles.time}>{data.time}</Text>
      <Button title="Quét tiếp" onPress={onClose} />
    </Modal>
  );
}
```

---

### Xử lý các error case ở FE

| Message từ BE | Hiển thị cho giáo viên |
|---------------|----------------------|
| Mã QR không hợp lệ | "QR không đọc được, thử lại" |
| Mã QR đã hết hạn... | "QR hết hạn rồi, nhờ phụ huynh làm mới" |
| Mã QR đã được sử dụng | "QR này đã được quét rồi" |
| Bé đã điểm danh đủ cả ngày | "Bé đã có đủ checkin + checkout hôm nay" |

---

## Env vars cần thêm

```env
QR_TOKEN_SECRET=<random 32+ chars, khác JWT_SECRET>
QR_TOKEN_TTL=60
```

---

## Bảo mật

- `QR_TOKEN_SECRET` **phải khác** `JWT_SECRET` — nếu dùng chung, lộ một cái ảnh hưởng cả hai
- Chống replay: sau mỗi lần scan thành công, `jti` bị block trong in-memory cache cho đến khi token hết hạn
- Token TTL ngắn (60s) — FE cần tự refresh mỗi 60s
