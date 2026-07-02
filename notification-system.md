# Notification System — Full Specification

> Tài liệu này mô tả đầy đủ kiến trúc, API, và hướng dẫn tích hợp hệ thống thông báo đẩy (FCM) + inbox thông báo cho **bất kỳ app nào** trong monorepo (`apps/*`).
>
> **Reference implementation:** `apps/parent`

---

## Mục lục

1. [Kiến trúc tổng quan](#1-kiến-trúc-tổng-quan)
2. [Backend API specs](#2-backend-api-specs)
3. [Data types](#3-data-types)
4. [Notification types & routing](#4-notification-types--routing)
5. [FCM — cách hoạt động](#5-fcm--cách-hoạt-động)
6. [Tích hợp vào app mới — step by step](#6-tích-hợp-vào-app-mới--step-by-step)
7. [IsRead logic — optimistic update pattern](#7-isread-logic--optimistic-update-pattern)
8. [Unread badge](#8-unread-badge)
9. [Foreground vs Background push](#9-foreground-vs-background-push)
10. [Biến môi trường](#10-biến-môi-trường)
11. [Testing checklist](#11-testing-checklist)

---

## 1. Kiến trúc tổng quan

```
┌─────────────────────────────────────────────────────────────────────┐
│  Backend (Go)                                                       │
│                                                                     │
│  Event xảy ra                                                       │
│  (điểm danh, duyệt đơn,...)  ──► Send FCM via Firebase Admin SDK   │
│                                   │                                 │
│                                   ▼                                 │
│  Lưu NotificationDto vào DB  ◄── Firebase Cloud Messaging (FCM)    │
└───────────────────────────────────┬─────────────────────────────────┘
                                    │ push tới device token
                    ┌───────────────┴──────────────────┐
                    ▼                                  ▼
           App đang mở (foreground)          App đóng/background
                    │                                  │
     CustomEvent kc:push:message           Service Worker nhận
     → Redux prependItem                  → showNotification()
     → badge tăng real-time               → click → mở app
```

**Luồng chính:**
1. BE gọi Firebase Admin SDK để push FCM tới `deviceToken` của user.
2. Đồng thời BE lưu thông báo vào DB.
3. FE đăng ký `deviceToken` với BE qua `POST /notifications/register-token`.
4. Khi có push: nếu app đang mở → `onMessage` handler → Redux; nếu app đóng → Service Worker → OS notification.
5. FE fetch inbox qua `GET /notifications`, render danh sách, cho phép đánh dấu đã đọc.

---

## 2. Backend API specs

Base path: `/notifications` (qua Next.js proxy `/api/notifications/...`)

### `GET /notifications/firebase-config`

Trả về Firebase client config (public, không cần auth — service worker cần fetch trước khi user login).

**Response:**
```json
{
  "success": true,
  "data": {
    "apiKey": "...",
    "authDomain": "project.firebaseapp.com",
    "projectId": "project-id",
    "storageBucket": "project.appspot.com",
    "messagingSenderId": "123456789",
    "appId": "1:123:web:abc"
  }
}
```

---

### `POST /notifications/register-token`

Đăng ký FCM device token của user với BE. Gọi sau khi user đăng nhập và FCM khởi tạo xong.

**Request body:**
```json
{
  "deviceToken": "fGh3K...",
  "deviceType": "web"
}
```

**Response:**
```json
{ "success": true, "data": null }
```

> BE nên upsert (tạo mới nếu chưa có, cập nhật nếu đã có) theo `(userID, deviceToken)`.

---

### `GET /notifications`

Lấy danh sách thông báo của user hiện tại (từ JWT). Sắp xếp mới nhất trước.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "NotifID": 42,
      "UserID": 7,
      "Title": "Bé đã được điểm danh",
      "Message": "Nguyễn Văn A đã vào lúc 07:32",
      "Type": "ATTENDANCE",
      "IsRead": 0,
      "IsCritical": 0,
      "DataPayload": "{\"studentId\":\"123\"}",
      "CreatedAt": 1751200000,
      "UpdatedAt": 1751200000
    }
  ]
}
```

---

### `PUT /notifications/:id/read`

Đánh dấu một thông báo là đã đọc.

**Response:**
```json
{ "success": true, "data": null }
```

---

### `PUT /notifications/read-all`

Đánh dấu tất cả thông báo của user là đã đọc.

**Response:**
```json
{ "success": true, "data": null }
```

---

### FCM payload từ BE (Firebase Admin SDK)

BE gửi FCM message với cấu trúc sau:

```json
{
  "token": "<deviceToken của user>",
  "notification": {
    "title": "Tiêu đề thông báo",
    "body": "Nội dung ngắn"
  },
  "data": {
    "type": "ATTENDANCE",
    "isCritical": "0",
    "studentId": "123"
  }
}
```

> `data` chỉ chứa **string values** (giới hạn của FCM). FE parse `isCritical` bằng `Number()`.

---

## 3. Data types

Định nghĩa tại `packages/core/src/types/notification.ts`, export qua `@kindercare/core`.

```typescript
export type NotificationType = 'ATTENDANCE' | 'LEAVE_REQUEST' | 'HEALTH_ALERT' | string;

export interface NotificationDto {
  NotifID:     number;   // server ID (dương); FCM foreground dùng ID âm tạm thời
  UserID:      number;
  Title:       string;
  Message:     string;
  Type:        NotificationType;
  IsRead:      0 | 1;   // số nguyên, không phải boolean
  IsCritical:  0 | 1;
  DataPayload: string;   // JSON string — parse bằng try/catch
  CreatedAt:   number;   // Unix timestamp (giây)
  UpdatedAt:   number;
}
```

**Lưu ý:** `IsRead` và `IsCritical` là `0 | 1` (không phải `boolean`). Khi so sánh: `item.IsRead === 0`, không dùng `!item.IsRead`.

---

## 4. Notification types & routing

| `Type` | Ý nghĩa | Navigate tới (parent) |
|--------|---------|----------------------|
| `ATTENDANCE` | Điểm danh vào/ra | `/diary` |
| `LEAVE_REQUEST` | Cập nhật trạng thái đơn nghỉ | `/request` |
| `HEALTH_ALERT` | Cảnh báo sức khỏe | `/diary` |

Khi implement cho app khác (vd teacher), định nghĩa bảng routing tương tự theo nghiệp vụ của role đó.

---

## 5. FCM — cách hoạt động

### 5.1 Lấy VAPID key

VAPID key (Web Push Certificate) lấy từ Firebase Console:
**Project Settings → Cloud Messaging → Web configuration → Web Push certificates → Key pair**

Đặt vào biến môi trường: `NEXT_PUBLIC_FIREBASE_VAPID_KEY=BNt3...`

### 5.2 Luồng khởi tạo FCM trên FE

```
initPushNotification()
    │
    ├─ GET /notifications/firebase-config  ← lấy config từ BE
    │
    ├─ import('firebase/app') + import('firebase/messaging')  ← dynamic (SSR safe)
    │
    ├─ Notification.requestPermission()  ← hỏi quyền browser
    │
    ├─ navigator.serviceWorker.register('/firebase-messaging-sw.js')
    │
    ├─ getToken(messaging, { vapidKey, serviceWorkerRegistration })
    │
    ├─ so sánh với sessionStorage cache
    │   ├─ khác → POST /notifications/register-token  ← đăng ký với BE
    │   └─ giống → bỏ qua (tránh gọi API thừa khi reload)
    │
    └─ onMessage(messaging, handler)  ← lắng nghe push khi app đang mở
```

### 5.3 Tại sao dynamic import?

`firebase/messaging` chỉ chạy được trên browser. Nếu dùng static import ở module-level, Next.js SSR sẽ load module này trên server → crash. Dynamic `import()` bên trong hàm (sau guard `typeof window === 'undefined'`) đảm bảo code chỉ chạy ở client.

---

## 6. Tích hợp vào app mới — step by step

### Bước 1 — Copy service worker

```bash
cp apps/parent/public/firebase-messaging-sw.js apps/<tên-app>/public/
```

File này không thay đổi gì — nó tự fetch config từ BE và xử lý background push.

### Bước 2 — Cài dependencies

```bash
yarn workspace apps/<tên-app> add @reduxjs/toolkit react-redux
# firebase đã có trong packages/core — không cần cài lại
```

### Bước 3 — Copy Redux store

```
apps/<tên-app>/src/store/
    index.ts              ← configureStore
    ReduxProvider.tsx     ← 'use client' wrapper
    slices/
        notificationSlice.ts
```

Tham chiếu `apps/parent/src/store/`. Không cần sửa gì nếu logic giống parent.

### Bước 4 — Wrap root layout với ReduxProvider

```tsx
// apps/<tên-app>/src/app/[locale]/layout.tsx
import { ReduxProvider } from '@/store/ReduxProvider';

// ReduxProvider phải là wrapper ngoài cùng trong client tree,
// bên ngoài AuthProvider và mọi context khác
<ReduxProvider>
  <AuthProvider>
    {children}
  </AuthProvider>
</ReduxProvider>
```

### Bước 5 — Khởi tạo FCM trong dashboard view

```tsx
// apps/<tên-app>/src/views/<RoleDashboard>/index.tsx
'use client';
import { useEffect } from 'react';
import { initPushNotification } from '@kindercare/core';

export default function TeacherDashboard() {
  useEffect(() => { initPushNotification(); }, []);
  // ...
}
```

Gọi một lần ở view dashboard chính. `initPushNotification` tự guard chống double-init.

### Bước 6 — Fetch inbox và hiển thị badge ở layout

```tsx
// apps/<tên-app>/src/layout/<RoleLayout>/index.tsx
'use client';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications, prependItem, selectUnreadCount } from '@/store/slices/notificationSlice';
import type { AppDispatch } from '@/store';
import type { NotificationDto } from '@kindercare/core';

const dispatch = useDispatch<AppDispatch>();
const unreadCount = useSelector(selectUnreadCount);

// Fetch inbox lần đầu khi layout mount
useEffect(() => { dispatch(fetchNotifications()); }, [dispatch]);

// Lắng nghe FCM foreground push → prepend vào store
useEffect(() => {
  let counter = 0;
  const handler = (e: Event) => {
    const payload = (e as CustomEvent).detail;
    const notif: NotificationDto = {
      NotifID:     --counter,             // ID âm tạm thời, không trùng với server ID
      UserID:      0,
      Title:       payload.notification?.title ?? '',
      Message:     payload.notification?.body  ?? '',
      Type:        payload.data?.type           ?? 'OTHER',
      IsRead:      0,
      IsCritical:  Number(payload.data?.isCritical ?? 0) as 0 | 1,
      DataPayload: JSON.stringify(payload.data  ?? {}),
      CreatedAt:   Math.floor(Date.now() / 1000),
      UpdatedAt:   Math.floor(Date.now() / 1000),
    };
    dispatch(prependItem(notif));
  };
  window.addEventListener('kc:push:message', handler);
  return () => window.removeEventListener('kc:push:message', handler);
}, [dispatch]);

// Badge
{unreadCount > 0 && <span>{unreadCount > 99 ? '99+' : unreadCount}</span>}
```

### Bước 7 — Implement NotificationPopup

Tham chiếu `apps/parent/src/layout/DashboardLayout/NotificationPopup/index.tsx`.

Các điểm cần tuỳ chỉnh theo role:

1. **Navigation routing** — đổi bảng `TYPE_LABEL` và `switch(item.Type)` theo màn hình của role đó.
2. **Label tiếng Việt** — có thể giữ nguyên hoặc dùng `next-intl`.
3. **Styled-components** — copy `styles.ts` và chỉnh màu theo design system của app.

---

## 7. IsRead logic — optimistic update pattern

Mục tiêu: UI phản hồi ngay lập tức, không chờ API.

```
User click vào thông báo
        │
        ▼
dispatch(markOneRead(id))      ← cập nhật Redux store ngay (IsRead: 1)
        │                         badge giảm ngay lập tức
        ▼
notificationService.markAsRead(id)   ← gọi API ngầm
        │
        ├─ success → không làm gì thêm
        └─ error   → dispatch(fetchNotifications())  ← refetch để đồng bộ lại
```

Tương tự với "Đọc tất cả":
```
dispatch(markAllRead())
notificationService.markAllAsRead().catch(() => dispatch(fetchNotifications()))
```

**Quy tắc:** Không bao giờ block UI chờ API khi đánh dấu đã đọc. Luôn cập nhật store trước, API sau.

---

## 8. Unread badge

Badge hiển thị số lượng thông báo chưa đọc, cập nhật từ Redux selector:

```typescript
// selector trong notificationSlice.ts
export const selectUnreadCount = (state) =>
  state.notifications.items.filter(n => n.IsRead === 0).length;
```

Badge tăng khi:
- `fetchNotifications()` trả về items có `IsRead: 0`
- FCM foreground push → `prependItem(notif)` với `IsRead: 0`

Badge giảm khi:
- `markOneRead(id)` → item đó `IsRead: 1`
- `markAllRead()` → tất cả `IsRead: 1`

Hiển thị:
```tsx
{unreadCount > 0 && (
  <NotifDot>{unreadCount > 99 ? '99+' : unreadCount}</NotifDot>
)}
```

---

## 9. Foreground vs Background push

| Trạng thái app | Xử lý | Kết quả |
|---------------|-------|---------|
| **App đang mở** | `onMessage()` trong `initPushNotification` → dispatch `kc:push:message` CustomEvent → layout handler → `prependItem()` | Badge tăng real-time, item xuất hiện đầu inbox |
| **App đóng / tab ẩn** | Service Worker (`firebase-messaging-sw.js`) → `onBackgroundMessage()` → `showNotification()` | OS notification popup; click → mở app |
| **User click OS notification** | Service Worker mặc định focus/open tab | Không auto deep-link — cần thêm `notificationclick` handler trong SW nếu muốn navigate |

### Deep-link từ background notification (optional)

Nếu muốn click OS notification → navigate thẳng tới màn hình, thêm vào service worker:

```js
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const type = event.notification.data?.type;
  const urlMap = {
    ATTENDANCE:    '/vi/diary',
    LEAVE_REQUEST: '/vi/request',
    HEALTH_ALERT:  '/vi/diary',
  };
  const url = urlMap[type] ?? '/vi';
  event.waitUntil(clients.openWindow(url));
});
```

---

## 10. Biến môi trường

| Biến | Nơi dùng | Mô tả |
|------|---------|-------|
| `NEXT_PUBLIC_FIREBASE_VAPID_KEY` | `initPushNotification()` | VAPID key từ Firebase Console → Project Settings → Cloud Messaging |
| `NEXT_PUBLIC_API_BASE` | `packages/core/lib/apiClient` | Prefix API (vd `/api` để qua Next.js proxy) |

VAPID key là public — có thể commit vào `.env.local`, **không** cần secret.

---

## 11. Testing checklist

### FCM khởi tạo

- [ ] Mở app → browser hỏi quyền notification
- [ ] Cho phép → không thấy lỗi console
- [ ] Reload → không gọi lại `POST /notifications/register-token` (token đã cache trong sessionStorage)
- [ ] Mở tab ẩn danh → hỏi quyền lại, đăng ký token mới

### Inbox

- [ ] Mở popup lần đầu → skeleton loading → danh sách hiện ra
- [ ] Mở popup lần 2 → không gọi API (store đã có data)
- [ ] Thông báo chưa đọc có chấm tròn xanh bên trái
- [ ] Thông báo critical có màu viền/background khác
- [ ] Không có thông báo → hiện empty state

### IsRead

- [ ] Click vào thông báo → badge giảm ngay (không chờ API)
- [ ] Click "Đọc tất cả" → tất cả chấm xanh biến mất ngay
- [ ] Tắt mạng, click đọc → badge giảm; bật lại mạng → refetch để đồng bộ

### FCM foreground

- [ ] Nhờ BE gửi test push khi app đang mở → badge tăng, item xuất hiện đầu danh sách
- [ ] Payload `notification.title` rỗng → không prepend (guard trong `onMessage`)

### FCM background

- [ ] Đóng tab / minimize → BE gửi push → OS notification hiện ra
- [ ] Click notification → tab mở lại

### Navigation

- [ ] Click `ATTENDANCE` notification → navigate `/diary`
- [ ] Click `LEAVE_REQUEST` notification → navigate `/request`
- [ ] Popup đóng sau khi navigate

---

## Cấu trúc file tham chiếu (apps/parent)

```
packages/core/
  index.ts                          ← export initPushNotification, notificationService, NotificationDto
  src/
    config/server.ts                ← SERVER.notifications.* endpoints
    types/notification.ts           ← NotificationDto, NotificationType
    services/NotificationService.ts ← getInbox, markAsRead, markAllAsRead, registerToken, getFirebaseConfig
    utils/pushNotification.ts       ← initPushNotification (FCM init, onMessage, token cache)

apps/parent/
  public/
    firebase-messaging-sw.js        ← Service Worker (copy sang app mới không đổi)
  src/
    app/[locale]/layout.tsx         ← <ReduxProvider> wrap toàn bộ app
    store/
      index.ts                      ← configureStore
      ReduxProvider.tsx             ← 'use client' Provider wrapper
      slices/notificationSlice.ts   ← fetchNotifications, markOneRead, markAllRead, prependItem
    layout/DashboardLayout/
      index.tsx                     ← fetch on mount, FCM foreground listener, unread badge
      NotificationPopup/
        index.tsx                   ← inbox UI, optimistic mark-read, navigation
        styles.ts                   ← styled-components cho popup
    views/ParentDashboard/
      index.tsx                     ← gọi initPushNotification() một lần duy nhất
```
