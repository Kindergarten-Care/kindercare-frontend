import { ParentDashboardModel } from '@/config/types/dashboard';

class ParentDashboardService {
  async getDashboardData(): Promise<ParentDashboardModel> {
    return {
      childHero: {
        name: 'Nguyễn Bảo Châu',
        className: 'Lớp Hoa Hướng Dương',
        teacher: 'Cô Phạm Thị Hương',
        branch: 'KinderCare Bình Thạnh',
        statusTags: [
          { label: '✅ Đã đến trường', type: 'green' },
          { label: '🍽️ Ăn sáng xong', type: 'blue' },
          { label: '😴 Đang ngủ trưa', type: 'neutral' },
          { label: '⭐ 96% chuyên cần', type: 'neutral' },
        ],
        checkinTime: '7:42 SA',
        checkinSub: 'Đúng giờ · Cổng A'
      },
      timeline: [
        {
          id: '1',
          time: '7:42',
          title: 'Check-in tại trường',
          description: 'Bé vào lớp vui vẻ, chào cô và các bạn. Cổng A · Cô Hương đón.',
          type: 'done',
          icon: '✅'
        },
        {
          id: '2',
          time: '8:15',
          title: 'Ăn sáng',
          description: 'Cháo yến mạch + sữa Vinamilk. Bé ăn hết phần, ngoan ✓',
          type: 'done',
          icon: '🍽️'
        },
        {
          id: '3',
          time: '9:00',
          title: 'Hoạt động sáng tạo',
          description: 'Vẽ tranh "Gia đình yêu thương". Tô màu cẩn thận, tự chọn màu sắc.',
          type: 'done',
          icon: '🎨',
          photos: ['🖼️', '📸', '🎨']
        },
        {
          id: '4',
          time: '11:30',
          title: 'Ngủ trưa',
          description: 'Từ 11:30 · Dự kiến thức 13:00 · Phòng ngủ · 25°C · Nhạc nhẹ',
          type: 'current',
          icon: '😴',
          isNow: true
        },
        {
          id: '5',
          time: '13:00',
          title: 'Giờ chơi nhóm',
          description: 'Sắp tới · Xếp hình & kể chuyện sáng tạo',
          type: 'upcoming',
          icon: '🧩'
        },
        {
          id: '6',
          time: '14:30',
          title: 'Ăn xế',
          description: 'Sắp tới · Bánh mì + sữa chua',
          type: 'upcoming',
          icon: '🥐'
        },
        {
          id: '7',
          time: '17:00',
          title: 'Giờ tan học',
          description: 'Cổng chính · Bà ngoại đón theo lịch',
          type: 'upcoming',
          icon: '🏠'
        }
      ],
      messages: [
        {
          id: '1',
          sender: 'Cô Phạm Thị Hương',
          avatar: '👩‍🏫',
          preview: 'Hôm nay bé Châu rất ngoan, chị xem ảnh lúc vẽ tranh ạ 😊',
          time: '9:30',
          unread: true
        },
        {
          id: '2',
          sender: 'Ban Giám Hiệu',
          avatar: '📢',
          avatarColor: '#e0f2fe',
          preview: 'Thông báo: Họp phụ huynh HK2 · Thứ Bảy 22/06 lúc 8:00 SA',
          time: '8:00',
          unread: true
        },
        {
          id: '3',
          sender: 'Thực đơn tuần 20–24/05',
          avatar: '🍱',
          avatarColor: '#fef3c7',
          preview: 'T2 – Cháo thịt; T3 – Mì trứng; T4 – Cơm gà; T5 – Phở bò',
          time: 'T2',
          unread: false
        }
      ],
      fee: {
        title: 'Học phí tháng 6',
        deadline: '25/06/2025',
        amount: 2850000,
        daysLeft: 41
      },
      attendanceStats: {
        percentage: 96,
        present: 22,
        absent: 0,
        excused: 1,
        totalDays: 23
      },
      upcomingEvents: [
        {
          id: '1',
          day: 17,
          month: 'T5',
          title: 'Phụ huynh tình nguyện',
          timeOrAmount: 'Trồng cây · 8:00 SA',
          tag: 'Trường',
          tagType: 'school'
        },
        {
          id: '2',
          day: 22,
          month: 'T5',
          title: 'Ngày hội thiếu nhi',
          timeOrAmount: 'Biểu diễn · 9:00 SA',
          tag: 'Trường',
          tagType: 'school'
        },
        {
          id: '3',
          day: 25,
          month: 'T6',
          title: 'Hạn đóng học phí',
          timeOrAmount: '2.850.000 đ',
          tag: 'Phí',
          tagType: 'payment'
        },
        {
          id: '4',
          day: 2,
          month: 'T6',
          title: 'Nghỉ hè bắt đầu',
          timeOrAmount: 'Chương trình hè KinderCare',
          tag: 'Nghỉ',
          tagType: 'holiday'
        }
      ]
    };
  }
}

export const parentDashboardService = new ParentDashboardService();
