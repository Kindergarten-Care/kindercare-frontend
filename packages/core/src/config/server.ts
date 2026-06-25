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
    getDetailedStudents: '/teacher/classes/:classId/detailed-students',
  },
} as const;
