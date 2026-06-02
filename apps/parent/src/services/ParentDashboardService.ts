import { ParentDashboardModel } from '../config/types/dashboard';

export const ParentDashboardService = {
  getDashboardData: async (): Promise<ParentDashboardModel> => {
    // Giả lập delay API
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Dữ liệu mock điểm danh
    const today = new Date();
    const attendanceDays = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(today.getFullYear(), today.getMonth(), i + 1);
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      let status: 'Đúng giờ' | 'Vắng/Ốm' | 'Chưa có' | 'Nghỉ lễ' = 'Chưa có';
      
      if (date < today) {
        if (isWeekend) status = 'Nghỉ lễ'; 
        else {
          const rand = Math.random();
          if (rand > 0.1) status = 'Đúng giờ';
          else status = 'Vắng/Ốm';
        }
      } else if (date.toDateString() === today.toDateString()) {
        status = 'Đúng giờ';
      }

      return {
        date: i + 1, // 1 to 30
        status,
      };
    });

    return {
      childStatus: {
        id: '1',
        name: 'Hồ Công Danh',
        class: 'Mầm Non 1 • Lớp cô Mai & cô Lan',
        weight: 15.5,
        status: 'Đang ở lớp',
      },
      moments: [
        { id: '1', url: '/assets/mock/moment1.png', type: 'activity' },
        { id: '2', url: '/assets/mock/moment2.png', type: 'activity' },
        { id: '3', url: '/assets/mock/moment3.png', type: 'activity' },
      ],
      tuition: {
        month: 6,
        amountDue: 4500000,
      },
      attendance: {
        month: 5,
        days: attendanceDays,
      },
      news: [
        {
          id: 'n1',
          title: 'Thực đơn tuần 3 tháng 5: Dinh dưỡng cân bằng cho bé',
          date: '2 ngày trước',
          imageUrl: '/assets/mock/news1.png',
          category: 'Dinh dưỡng',
        },
        {
          id: 'n2',
          title: 'Mẹo giúp bé ăn ngon miệng và không kén chọn thực phẩm',
          date: '5 ngày trước',
          imageUrl: '/assets/mock/news2.png',
          category: 'Nuôi dạy',
        },
      ],
      upcomingEvents: [
        { id: '1', title: 'Khám sức khỏe định kỳ', date: '15/09/2026', time: '08:00 - 11:00', location: 'Phòng Y tế trường' },
        { id: '2', title: 'Họp phụ huynh đầu năm', date: '20/09/2026', time: '14:00 - 16:00', location: 'Lớp Mầm 1' },
        { id: '3', title: 'Lễ hội Trung Thu', date: '25/09/2026', time: '16:00 - 18:00', location: 'Sân trường' },
      ],
      pickup: {
        personName: 'Hồ Quang Hiếu',
        relation: 'Ba',
        imageUrl: '/assets/mock/parent_avatar.png',
        status: 'Chờ đón'
      }
    };
  },
};
