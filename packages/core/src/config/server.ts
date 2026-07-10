/**
 * Client-side base URL.
 * In dev: NEXT_PUBLIC_API_BASE=/api  (relative → Next.js rewrite → no CORS)
 * In prod: unset → falls back to full NEXT_PUBLIC_API_URL
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE ??
  process.env.NEXT_PUBLIC_API_URL ??
  'http://localhost:8080';

/** All API endpoints — single source of truth for the monorepo. */
export const SERVER = {
  auth: {
    login:          '/auth/login',
    logout:         '/auth/logout',
    refresh:        '/auth/refresh',
    me:             '/auth/me',
    changePassword: '/auth/change-password',
  },
  parent: {
    getChildren: '/parent/children',
    getProfile:  '/parent/profile',
    changePassword: '/parent/change-password',
    getHealthRecords: '/parent/children/:studentId/health-records',
    createLeaveRequest: '/parent/leave-requests',
    createMedicationRequest: '/parent/medication-requests',
    getAttendance: '/parent/children/:studentId/attendance',
    getLeaveRequests: '/parent/children/:studentId/leave-requests',
    getMedicationRequests: '/parent/children/:studentId/medication-requests',
    cancelLeaveRequest: '/parent/leave-requests/:requestId/cancel',
    cancelMedicationRequest: '/parent/medication-requests/:medRequestId/cancel',
    createProxyAuthorization: '/parent/proxy-authorizations',
    getProxyAuthorizations: '/parent/children/:studentId/proxy-authorizations',
    cancelProxyAuthorization: '/parent/proxy-authorizations/:authorizationId/cancel',
    getDailySchedule: '/parent/children/:studentId/daily-schedule',
    getDailyLessons: '/parent/children/:studentId/daily-lessons',
    getDailyAlbums: '/parent/children/:studentId/daily-albums',
    getAssessments: '/parent/children/:studentId/assessments',
    getQrToken: '/parent/children/:studentId/qr-token',
    getNewsfeeds: '/parent/children/:studentId/newsfeeds',
    getMenu: '/parent/children/:studentId/menu',
    getDailyActivities: '/parent/children/:studentId/daily-activities',
    getRelatives: '/parent/children/:studentId/relatives',
    getWeeklyTimetable: '/parent/children/:studentId/weekly-timetable',
    getDailyEvents: '/parent/events/daily',
    getInvoices: '/parent/children/:studentId/invoices',
    getInvoiceDetail: '/parent/invoices/:invoiceId',
    payInvoice: '/parent/invoices/:invoiceId/pay',
    payInvoiceMomo: '/parent/invoices/:invoiceId/pay-momo',
    payInvoiceVnpay: '/parent/invoices/:invoiceId/pay-vnpay',
    getExtracurriculars: '/parent/extracurriculars',
    getStudentExtracurriculars: '/parent/children/:studentId/extracurriculars',
    createExtracurricularEnrollment: '/parent/children/:studentId/extracurriculars',
    cancelExtracurricularEnrollment: '/parent/children/:studentId/extracurriculars/:enrollmentId/cancel',
  },
  teacher: {
    scanAttendance:          '/teacher/attendance/scan',
    getClasses:              '/teacher/classes',
    getStudents:             '/teacher/classes/:classId/students',
    getDetailedStudents:     '/teacher/classes/:classId/detailed-students',
    getDashboard:            '/teacher/dashboard',
    getProfile:              '/teacher/profile',
    getSchedule:             '/teacher/classes/:classId/schedule',
    getMenu:                 '/teacher/classes/:classId/menu',
    getMedicalRequests:      '/teacher/classes/:classId/medical-requests',
    getWeeklyRewards:        '/teacher/classes/:classId/weekly-rewards',
    postWeeklyRewards:       '/teacher/classes/:classId/weekly-rewards',
    getLeaveRequests:        '/teacher/leave-requests',
    getLeaveRequestDetail:   '/teacher/leave-requests/:requestId',
    updateLeaveRequestStatus:'/teacher/leave-requests/:requestId/status',
    postAttendanceQuick:     '/teacher/attendance/quick',
    postAttendanceMeals:     '/teacher/attendance/meals',
    getNotifications:        '/teacher/notifications',
    getRewardBadges:         '/teacher/reward-badges',
    getNewsfeeds:            '/teacher/classes/:classId/newsfeeds',
    postNewsfeed:            '/teacher/classes/:classId/newsfeeds',
    workHistory:             '/teacher/work-history',
    settings:                '/teacher/settings',
  },
  notifications: {
    getFirebaseConfig: '/notifications/firebase-config',
    registerToken:     '/notifications/register-token',
    getInbox:          '/notifications',
    markAsRead:        '/notifications/:id/read',
    markAllAsRead:     '/notifications/read-all',
    deleteNotification: '/notifications/:id',
    deleteAllNotifications: '/notifications',
  },
  teacher: {
    getDetailedStudents: '/teacher/classes/:classId/detailed-students',
    getSchedule: '/teacher/classes/:classId/schedule',
    getProfile: '/teacher/profile',
  },
} as const;
