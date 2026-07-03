// TODO: replace with real API data when available

export const MOCK_MEALS = [
  { name: 'Bữa sáng', menu: 'Cháo thịt bằm', rateLabel: 'Ăn hết suất', rateType: 'good' as const },
  { name: 'Bữa trưa', menu: 'Cơm, trứng cuộn, canh rau', rateLabel: 'Ăn ngoan, hơi chậm', rateType: 'ok' as const },
  { name: 'Bữa xế', menu: 'Sữa tươi & Bánh flan', rateLabel: 'Ăn hết suất', rateType: 'good' as const },
];

export const MOCK_ACTIVITIES = [
  { name: 'Ngủ trưa', desc: 'Ngủ từ 12:00 – 14:00 (2 giờ)', rateLabel: 'Ngủ ngon', rateType: 'good' as const, bg: '#E3EDFD', color: '#2563EB' },
  { name: 'Vệ sinh', desc: 'Đi vệ sinh bình thường, tự giác', rateLabel: 'Bình thường', rateType: 'info' as const, bg: '#D7F0EC', color: '#0E8A7D' },
  { name: 'Hoạt động chiều', desc: 'Múa hát & chơi cùng các bạn', rateLabel: 'Hòa đồng', rateType: 'good' as const, bg: '#F1ECFE', color: '#8B5CF6' },
];

export const MOCK_PHOTOS = [
  { tag: 'ảnh giờ ăn sáng', time: '08:05' },
  { tag: 'ảnh giờ múa hát', time: '10:20' },
  { tag: 'ảnh giờ chơi nhóm', time: '11:30' },
  { tag: 'ảnh giờ học vẽ', time: '15:10' },
];

export const MOCK_FEED = [
  {
    initial: 'L',
    author: 'Cô Nguyễn Thị Lan',
    role: 'Lớp Mầm 1',
    time: '14:20 · Hôm nay',
    pill: 'Hoạt động',
    body: 'Hôm nay lớp mình có buổi học chủ đề "Các loài hoa" 🌸. Các con đã cùng nhau làm một bức tranh tập thể thật đẹp. Mời ba mẹ cùng xem thành quả của các con nhé!',
    hasImg: true,
    imgLabel: 'ảnh tranh tập thể của lớp',
    likes: 12,
  },
  {
    initial: 'B',
    author: 'Ban giám hiệu',
    role: 'Thông báo chung',
    time: '09:00 · Hôm nay',
    pill: 'Thông báo',
    body: '📢 Nhắc ba mẹ: Thứ Sáu tuần này (04/07) trường tổ chức "Ngày hội đọc sách". Các con có thể mang theo 1 cuốn sách yêu thích đến lớp để chia sẻ cùng các bạn.',
    hasImg: false,
    imgLabel: '',
    likes: 8,
  },
];
