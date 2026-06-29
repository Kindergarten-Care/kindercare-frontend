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
    getLeaveRequests: '/parent/children/:studentId/leave-requests',
    getMedicationRequests: '/parent/children/:studentId/medication-requests',
    cancelLeaveRequest: '/parent/leave-requests/:requestId/cancel',
    cancelMedicationRequest: '/parent/medication-requests/:medRequestId/cancel',
    getDailySchedule: '/parent/children/:studentId/daily-schedule',
    getDailyLessons: '/parent/children/:studentId/daily-lessons',
    getDailyAlbums: '/parent/children/:studentId/daily-albums',
    getAssessments: '/parent/children/:studentId/assessments',
    getQrToken: '/parent/children/:studentId/qr-token',
  },
  teacher: {
    scanAttendance:      '/teacher/attendance/scan',
    getDetailedStudents: '/teacher/classes/:classId/detailed-students',
    getSchedule:         '/teacher/classes/:classId/schedule',
  },
  notifications: {
    getFirebaseConfig: '/notifications/firebase-config',
    registerToken:     '/notifications/register-token',
    getInbox:          '/notifications',
    markAsRead:        '/notifications/:id/read',
    markAllAsRead:     '/notifications/read-all',
  },
} as const;
