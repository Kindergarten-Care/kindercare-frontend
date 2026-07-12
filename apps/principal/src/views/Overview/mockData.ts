export const mockKPIData = {
  totalStudents: {
    value: '2,450',
    label: 'Tổng số học sinh',
    subtext: 'Lớp đang hoạt động',
  },
  attendanceToday: {
    value: '92.5%',
    label: 'Tỷ lệ đi học hôm nay',
    subtext: '2,266 / 2,450',
  },
  pendingApprovals: {
    value: 12,
    label: 'Giáo án & TKB chờ duyệt',
    subtext: 'Cần duyệt hôm nay',
  },
  pendingLeaves: {
    value: 3,
    label: 'Đơn xin nghỉ phép',
    subtext: 'Chờ xử lý',
  },
  pendingFeedback: {
    value: 5,
    label: 'Ý kiến phụ huynh',
    subtext: 'Chưa giải quyết',
  },
};

export const mockFinancialData = [
  { name: 'Đã nộp (Paid)', value: 75, color: '#16a34a' },
  { name: 'Chưa nộp (Unpaid)', value: 20, color: '#f87171' },
  { name: 'Quá hạn (Overdue)', value: 5, color: '#ef4444' },
];

export const mockHRData = [
  { name: 'Chủ nhiệm', 'Nhà trẻ': 12, 'Mầm': 20, 'Chồi': 22, 'Lá': 24 },
  { name: 'Phó CN', 'Nhà trẻ': 12, 'Mầm': 20, 'Chồi': 22, 'Lá': 24 },
  { name: 'Bảo mẫu', 'Nhà trẻ': 15, 'Mầm': 10, 'Chồi': 8, 'Lá': 8 },
];

export const mockAdmissionsData = [
  { name: 'Nhà trẻ (1-3t)', students: 350 },
  { name: 'Mầm (3-4t)', students: 600 },
  { name: 'Chồi (4-5t)', students: 700 },
  { name: 'Lá (5-6t)', students: 800 },
];

export const mockApprovalQueue = [
  { id: 1, type: 'Giáo án', title: 'Lớp Chồi 1 (Tuần 5)', submittedBy: 'Cô Vân Anh', time: '10 phút trước' },
  { id: 2, type: 'TKB', title: 'Lớp Lá 2 (Tuần 5)', submittedBy: 'Thầy Hưng', time: '30 phút trước' },
  { id: 3, type: 'Nghỉ phép', title: 'Đơn nghỉ phép (Hôm nay)', submittedBy: 'Cô An (Mầm 1)', time: '1 giờ trước' },
];

export const mockMedicalAlerts = [
  { id: 1, student: 'Nguyễn Minh Khôi', class: 'Lớp Mầm 1', allergy: 'Hải sản', menuConflict: 'Cháo tôm' },
  { id: 2, student: 'Trần Ngọc Mai', class: 'Lớp Lá 3', allergy: 'Đậu phộng', menuConflict: 'Chè hạt sen đậu phộng' },
];

export const mockTeacherSubstitutions = [
  { id: 1, class: 'Lớp Mầm 1', absentTeacher: 'Cô An', reason: 'Nghỉ phép', substituteOptions: ['Cô Hoa (Bảo mẫu)', 'Giáo viên dự khuyết'] },
];
