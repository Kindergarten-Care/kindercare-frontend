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
    login:   '/auth/login',
    logout:  '/auth/logout',
    refresh: '/auth/refresh',
    me:      '/auth/me',
  },
  parent: {
    getChildren: '/parent/children',
    getProfile:  '/parent/profile',
    getHealthRecords: '/parent/children/:studentId/health-records',
    createLeaveRequest: '/parent/leave-requests',
    createMedicationRequest: '/parent/medication-requests',
    getAttendance: '/parent/children/:studentId/attendance',
  },
  teacher: {
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
  },
} as const;
