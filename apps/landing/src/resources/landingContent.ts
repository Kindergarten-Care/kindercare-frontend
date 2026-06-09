import type {
  ChildAgeValue,
  ContactItem,
  EnrollmentRow,
  EnvCard,
  FooterBadge,
  FooterColumn,
  HeroSlide,
  PricingPlan,
  PricingPlanValue,
  StatItem,
  TechCardKind,
} from '@/config/types';
import type { DropdownOption } from '@kindercare/ui';
import { SECTION_IDS, PORTAL_LOGIN_HREF } from '@/config/constants';

export const PARENT_PORTAL_HREF = PORTAL_LOGIN_HREF;

export const HERO_SLIDES: HeroSlide[] = [
  {
    variant: 'forest',
    eyebrow: 'Chào mừng đến KinderCare',
    titleLineOne: 'Nơi ươm mầm &',
    titleLineTwo: 'Phát triển tương lai',
    description:
      'Môi trường học tập an toàn, yêu thương, nơi mỗi đứa trẻ được tỏa sáng theo cách riêng của mình.',
    primaryCta: { label: 'Tìm hiểu tuyển sinh', href: `#${SECTION_IDS.ENROLLMENT}` },
    secondaryCta: { label: 'Đặt lịch tham quan', href: `#${SECTION_IDS.CONTACT}` },
  },
  {
    variant: 'spring',
    eyebrow: 'Môi trường học tập',
    titleLineOne: 'Không gian sáng tạo,',
    titleLineTwo: 'trải nghiệm phong phú',
    description:
      'Phòng học hiện đại, sân chơi rộng rãi và bếp dinh dưỡng chuẩn — tất cả thiết kế riêng cho trẻ mầm non.',
    primaryCta: { label: 'Khám phá ngay', href: `#${SECTION_IDS.ENVIRONMENT}` },
    secondaryCta: { label: 'Liên hệ tư vấn', href: `#${SECTION_IDS.CONTACT}` },
  },
  {
    variant: 'amber',
    eyebrow: 'Công nghệ đồng hành',
    titleLineOne: 'Phụ huynh kết nối,',
    titleLineTwo: 'yên tâm mọi lúc mọi nơi',
    description:
      'Ứng dụng quản lý lớp học thông minh — xem thực đơn, theo dõi phát triển và thanh toán học phí ngay trên điện thoại.',
    primaryCta: { label: 'Xem tính năng', href: `#${SECTION_IDS.TECHNOLOGY}`, tone: 'amber' },
    secondaryCta: { label: 'Dùng thử ngay', href: PORTAL_LOGIN_HREF },
  },
];

export const STATS: StatItem[] = [
  { value: '12', suffix: '+', label: 'Năm thành lập & hoạt động' },
  { value: '480', suffix: '+', label: 'Học sinh đang theo học' },
  { value: '98', suffix: '%', label: 'Phụ huynh hài lòng' },
  { value: '42', suffix: '+', label: 'Giáo viên tận tâm' },
];

export const ENV_CHECKLIST: string[] = [
  'Lớp học theo mô hình Montessori kết hợp STEAM',
  'Sân chơi ngoài trời đạt chuẩn an toàn quốc tế',
  'Thực đơn do chuyên gia dinh dưỡng xây dựng hàng tuần',
  'Phòng nghỉ trưa yên tĩnh, cách nhiệt, ánh sáng dịu',
  'Hệ thống camera an ninh 24/7, phụ huynh theo dõi qua app',
];

export const ENV_CARDS: EnvCard[] = [
  {
    icon: '🎨',
    title: 'Phòng học sáng tạo',
    description:
      'Góc nghệ thuật, góc sách và góc xây dựng theo phương pháp học qua chơi — phát triển trí tưởng tượng tự nhiên.',
  },
  {
    icon: '🌳',
    title: 'Sân chơi ngoài trời',
    description:
      'Cầu trượt, xích đu, bể cát, vườn rau mini — không gian vận động thúc đẩy sự phát triển thể chất toàn diện.',
  },
  {
    icon: '🥗',
    title: 'Bếp dinh dưỡng',
    description:
      'Thực đơn xoay vòng 4 tuần, cân bằng dưỡng chất theo độ tuổi, không sử dụng thực phẩm chế biến sẵn.',
  },
  {
    icon: '😴',
    title: 'Phòng ngủ trưa',
    description:
      'Giường cá nhân, chăn gối riêng, nhiệt độ điều hòa ổn định — giúp trẻ nghỉ ngơi đủ giấc mỗi buổi trưa.',
  },
];

export const TECH_CARDS: TechCardKind[] = [
  {
    id: 'dashboard',
    title: 'Tổng quan hôm nay',
    description: 'Timeline các hoạt động theo thời gian thực',
    mockKind: 'dashboard',
  },
  {
    id: 'camera',
    title: 'Camera lớp học',
    description: 'Xem trực tiếp lớp học, phòng ăn, sân chơi',
    mockKind: 'camera',
  },
  {
    id: 'menu',
    title: 'Thực đơn & Lịch học',
    description: 'Xem thực đơn tuần, lịch hoạt động theo ngày',
    mockKind: 'menu',
  },
  {
    id: 'payments',
    title: 'Học phí & Thanh toán',
    description: 'Thanh toán trực tuyến, xem lịch sử giao dịch',
    mockKind: 'payments',
  },
  {
    id: 'progress',
    title: 'Phát triển & Kết quả',
    description: 'Báo cáo kỹ năng, nhận xét giáo viên theo học kỳ',
    mockKind: 'progress',
  },
];

export const ENROLLMENT_ROWS: EnrollmentRow[] = [
  {
    icon: '👶',
    title: 'Độ tuổi tiếp nhận',
    description: 'Từ 18 tháng đến 5 tuổi (nhà trẻ, mẫu giáo nhỏ, mẫu giáo lớn)',
  },
  {
    icon: '📅',
    title: 'Thời gian mở đăng ký',
    description: '01/06/2025 – 15/08/2025 (ưu tiên nộp hồ sơ sớm)',
  },
  {
    icon: '👥',
    title: 'Sĩ số lớp học',
    description: 'Tối đa 18–20 bé / lớp, tỷ lệ giáo viên 1:8',
  },
  {
    icon: '🕗',
    title: 'Giờ học',
    description: '07:30 – 17:00 (có thể đón trễ đến 18:00 theo gói)',
  },
  {
    icon: '📋',
    title: 'Hồ sơ cần thiết',
    description: 'Giấy khai sinh, sổ tiêm chủng, ảnh 3x4, đơn đăng ký',
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Gói Tháng',
    tag: 'Linh hoạt',
    description: 'Phù hợp với phụ huynh muốn thử trải nghiệm hoặc có lịch học thất thường.',
    features: [
      'Học theo lịch cố định trong tháng',
      'Bao gồm 3 bữa ăn mỗi ngày',
      'Tiếp cận ứng dụng phụ huynh',
      'Báo nghỉ linh hoạt qua app',
    ],
    ctaLabel: 'Hỏi về gói tháng',
    ctaHref: `#${SECTION_IDS.CONTACT}`,
  },
  {
    name: 'Gói Quý',
    tag: '3 tháng',
    description: 'Cân bằng giữa cam kết và linh hoạt — lựa chọn phổ biến nhất của gia đình KinderCare.',
    features: [
      'Ưu đãi so với đóng từng tháng',
      'Bao gồm 3 bữa ăn và hoạt động ngoại khóa',
      'Tiếp cận đầy đủ tính năng ứng dụng',
      'Đón muộn đến 18:00 không phát sinh phí',
      'Báo cáo phát triển hằng tháng',
    ],
    ctaLabel: 'Tư vấn gói quý',
    ctaHref: `#${SECTION_IDS.CONTACT}`,
    featured: true,
    badge: 'Được chọn nhiều nhất',
  },
  {
    name: 'Gói Năm',
    tag: 'Tiết kiệm nhất',
    description: 'Cam kết toàn năm học — tiết kiệm đáng kể, ưu tiên chỗ học kỳ tiếp theo.',
    features: [
      'Tiết kiệm cao nhất trong các gói',
      'Ưu tiên đăng ký năm học tiếp theo',
      'Tất cả tính năng gói quý',
      'Đồng phục trường miễn phí',
      '1 buổi tư vấn phát triển với giáo viên/học kỳ',
    ],
    ctaLabel: 'Tư vấn gói năm',
    ctaHref: `#${SECTION_IDS.CONTACT}`,
  },
];

export const CONTACT_ITEMS: ContactItem[] = [
  { icon: '📍', label: 'Địa chỉ', value: '65 Huỳnh Thúc Kháng, Sài Gòn, Hồ Chí Minh' },
  { icon: '📞', label: 'Hotline tuyển sinh', value: '0901 234 567 (Thứ 2 – Thứ 7, 07:30 – 17:30)' },
  { icon: '✉️', label: 'Email', value: 'tuyensinh@kindercare.edu.vn' },
  { icon: '🕐', label: 'Giờ tham quan trường', value: 'Thứ 3 & Thứ 5: 9:00 – 11:00 (đặt lịch trước)' },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Về trường',
    links: [
      { label: 'Triết lý giáo dục', href: `#${SECTION_IDS.ENVIRONMENT}` },
      { label: 'Cơ sở vật chất', href: `#${SECTION_IDS.ENVIRONMENT}` },
      { label: 'Đội ngũ giáo viên', href: `#${SECTION_IDS.ENVIRONMENT}` },
      { label: 'Chương trình học', href: `#${SECTION_IDS.ENROLLMENT}` },
      { label: 'Tin tức & Sự kiện', href: `#${SECTION_IDS.CONTACT}` },
    ],
  },
  {
    title: 'Dịch vụ',
    links: [
      { label: 'Tuyển sinh 2025–2026', href: `#${SECTION_IDS.ENROLLMENT}` },
      { label: 'Các gói học phí', href: `#${SECTION_IDS.ENROLLMENT}` },
      { label: 'Cổng thông tin phụ huynh', href: PORTAL_LOGIN_HREF },
      { label: 'Ứng dụng KinderCare', href: `#${SECTION_IDS.TECHNOLOGY}` },
      { label: 'Đặt lịch tham quan', href: `#${SECTION_IDS.CONTACT}` },
    ],
  },
  {
    title: 'Hỗ trợ',
    links: [
      { label: 'Câu hỏi thường gặp', href: `#${SECTION_IDS.CONTACT}` },
      { label: 'Liên hệ tư vấn', href: `#${SECTION_IDS.CONTACT}` },
      { label: 'Hướng dẫn sử dụng app', href: PORTAL_LOGIN_HREF },
      { label: 'Chính sách bảo mật', href: `#${SECTION_IDS.CONTACT}` },
      { label: 'Điều khoản dịch vụ', href: `#${SECTION_IDS.CONTACT}` },
    ],
  },
];

export const FOOTER_BADGES: FooterBadge[] = [
  { label: '📜 Bộ GD&ĐT Cấp phép' },
  { label: '🛡️ ISO 45001' },
  { label: '🌿 Trường Xanh 2024' },
];

export const CHILD_AGE_OPTIONS: DropdownOption<ChildAgeValue>[] = [
  { value: '18-24m', label: '18 – 24 tháng' },
  { value: '2', label: '2 tuổi' },
  { value: '3', label: '3 tuổi' },
  { value: '4', label: '4 tuổi' },
  { value: '5', label: '5 tuổi' },
];

export const PRICING_PLAN_OPTIONS: DropdownOption<PricingPlanValue>[] = [
  { value: 'month', label: 'Gói Tháng' },
  { value: 'quarter', label: 'Gói Quý' },
  { value: 'year', label: 'Gói Năm' },
];
