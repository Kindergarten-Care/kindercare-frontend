// Fallback content shown only when the entire week has no real data from the API
// (e.g. a fresh demo environment). Never mixed with real data day-by-day.

export interface MockMealGroup {
  label: string;
  dishes: string[];
}

export interface MockDayMenu {
  groups: MockMealGroup[];
}

export const MOCK_WEEK_MENU: MockDayMenu[] = [
  { groups: [
    { label: 'Bữa sáng', dishes: ['Cháo thịt bằm', 'Sữa tươi'] },
    { label: 'Bữa trưa', dishes: ['Cơm trắng', 'Thịt kho trứng', 'Canh bí đỏ', 'Tráng miệng: Chuối'] },
    { label: 'Bữa xế', dishes: ['Bánh flan', 'Nước cam'] },
  ] },
  { groups: [
    { label: 'Bữa sáng', dishes: ['Phở gà', 'Sữa chua'] },
    { label: 'Bữa trưa', dishes: ['Cơm trắng', 'Cá thu sốt cà', 'Canh rau ngót', 'Tráng miệng: Dưa hấu'] },
    { label: 'Bữa xế', dishes: ['Bánh quy', 'Sữa tươi'] },
  ] },
  { groups: [
    { label: 'Bữa sáng', dishes: ['Bún riêu cua', 'Sữa tươi'] },
    { label: 'Bữa trưa', dishes: ['Cơm trắng', 'Gà rang gừng', 'Canh khoai mỡ', 'Tráng miệng: Nho'] },
    { label: 'Bữa xế', dishes: ['Chè đậu xanh', 'Nước ép táo'] },
  ] },
  { groups: [
    { label: 'Bữa sáng', dishes: ['Cháo yến mạch', 'Sữa chua'] },
    { label: 'Bữa trưa', dishes: ['Cơm trắng', 'Tôm rim thịt', 'Canh cải thảo', 'Tráng miệng: Táo'] },
    { label: 'Bữa xế', dishes: ['Bánh bông lan', 'Sữa tươi'] },
  ] },
  { groups: [
    { label: 'Bữa sáng', dishes: ['Nui nấu thịt', 'Sữa tươi'] },
    { label: 'Bữa trưa', dishes: ['Cơm trắng', 'Trứng chiên thịt', 'Canh mồng tơi', 'Tráng miệng: Xoài'] },
    { label: 'Bữa xế', dishes: ['Sữa chua trái cây', 'Nước cam'] },
  ] },
];

export interface MockLesson {
  subject: string;
  iconType: string;
  title: string;
  details: string;
}

export const MOCK_WEEK_LESSONS: MockLesson[][] = [
  [
    { subject: 'Ngôn ngữ', iconType: 'language', title: 'Làm quen chữ cái', details: 'Nhận biết & phát âm chữ H, K' },
    { subject: 'Kỹ năng', iconType: 'sport', title: 'Vận động tinh', details: 'Xâu hạt tạo hình bông hoa' },
  ],
  [
    { subject: 'Toán', iconType: 'math', title: 'Đếm số 1–10', details: 'Đếm cánh hoa, so sánh nhiều-ít' },
    { subject: 'Âm nhạc', iconType: 'music', title: 'Hát & vận động', details: 'Bài "Màu hoa"' },
  ],
  [
    { subject: 'Tạo hình', iconType: 'art', title: 'Vẽ & tô màu', details: 'Vẽ vườn hoa mùa xuân' },
    { subject: 'KP Khoa học', iconType: 'science', title: 'Khám phá thiên nhiên', details: 'Các bộ phận của cây hoa' },
  ],
  [
    { subject: 'Ngôn ngữ', iconType: 'language', title: 'Kể chuyện', details: 'Truyện "Sự tích hoa hồng"' },
    { subject: 'Vận động', iconType: 'sport', title: 'Thể dục', details: 'Trò chơi "Gieo hạt nảy mầm"' },
  ],
  [
    { subject: 'Kỹ năng sống', iconType: 'science', title: 'Chăm sóc cây', details: 'Tập tưới nước cho cây trong lớp' },
    { subject: 'Âm nhạc', iconType: 'music', title: 'Biểu diễn cuối tuần', details: 'Ôn các bài hát về hoa' },
  ],
];

// ─── Theme banner (month/week topic) — no backend concept for this yet ─────────

export const MOCK_MONTH_THEME = 'Thế giới thực vật 🌿';
export const MOCK_WEEK_THEME = 'Các loài hoa 🌸';

// ─── Weekly routine timetable — grid layout has no matching real-data shape ────
// (backend gives independent per-day activity lists with arbitrary times, not
// fixed period/slot rows), so this section is mock-only per product decision.

export interface MockTimetableSlot {
  time: string;
  name: string;
  icon: string;
  c: string;
  tint: string;
  /** If set, this slot's cell content differs per weekday, pulled from that day's mock lesson at this index. */
  perDayLessonIndex?: number;
}

export interface MockTimetablePeriod {
  label: string;
  icon: string;
  c: string;
  tint: string;
  slots: MockTimetableSlot[];
}

export const MOCK_TIMETABLE: MockTimetablePeriod[] = [
  {
    label: 'Buổi sáng', icon: 'sun', c: '#92400E', tint: '#FEF3C7',
    slots: [
      { time: '07:00 – 08:00', name: 'Đón trẻ & Thể dục sáng', icon: 'bus', c: '#0E8A7D', tint: '#D7F0EC' },
      { time: '08:00 – 08:30', name: 'Ăn sáng', icon: 'meal', c: '#F97316', tint: '#FFEEDF' },
      { time: '08:30 – 09:15', name: 'Giờ học chính', icon: 'book', c: '#8B5CF6', tint: '#F1ECFE', perDayLessonIndex: 0 },
      { time: '09:15 – 10:15', name: 'Hoạt động ngoài trời', icon: 'play', c: '#005A36', tint: '#E6F3ED' },
      { time: '10:15 – 10:45', name: 'Hoạt động góc', icon: 'run', c: '#2563EB', tint: '#E3EDFD', perDayLessonIndex: 1 },
    ],
  },
  {
    label: 'Buổi trưa', icon: 'lunch', c: '#F97316', tint: '#FFEEDF',
    slots: [
      { time: '11:00 – 11:45', name: 'Ăn trưa', icon: 'lunch', c: '#F97316', tint: '#FFEEDF' },
      { time: '11:45 – 12:00', name: 'Vệ sinh trước ngủ', icon: 'wash', c: '#0E8A7D', tint: '#D7F0EC' },
      { time: '12:00 – 14:00', name: 'Ngủ trưa', icon: 'sleep', c: '#2563EB', tint: '#E3EDFD' },
    ],
  },
  {
    label: 'Buổi chiều', icon: 'moon', c: '#8B5CF6', tint: '#F1ECFE',
    slots: [
      { time: '14:00 – 14:30', name: 'Vận động nhẹ sau ngủ', icon: 'run', c: '#2563EB', tint: '#E3EDFD' },
      { time: '14:30 – 15:00', name: 'Ăn xế', icon: 'snack', c: '#DB2777', tint: '#FCE7F2' },
      { time: '15:00 – 16:00', name: 'Hoạt động chiều', icon: 'art', c: '#8B5CF6', tint: '#F1ECFE', perDayLessonIndex: 1 },
      { time: '16:00 – 17:00', name: 'Vệ sinh & Trả trẻ', icon: 'home', c: '#0E8A7D', tint: '#D7F0EC' },
    ],
  },
];
