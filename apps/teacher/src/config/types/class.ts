// ─── API DTOs (raw shape returned by the server) ────────────────────────────

export interface TeacherClassApiDto {
  classId: number;
  className: string;
  yearId: number;
  studentCount: number;
}

export interface TeacherActiveClassInfoDto {
  classId: number;
  className: string;
  gradeId: number;
  yearId: number;
  roleInClass: string;
}

export interface TeacherAcademicYearDto {
  yearName: string;
  startDate: number;
  endDate: number;
  isActive: number;
}

export interface TeacherActiveClassResponseDto {
  classInfo: TeacherActiveClassInfoDto;
  academicYear: TeacherAcademicYearDto;
}

// ─── Domain Models (shaped for UI consumption) ───────────────────────────────

export interface TeacherClassDomainModel {
  /** Raw class ID from DB */
  classId: number;
  /** Raw class name as stored in DB, e.g. "Mầm 1" */
  className: string;
  /** Academic year ID from the class's active year */
  yearId: number;
  /** Display name with "Lớp" prefix, e.g. "Lớp Mầm 1" */
  displayName: string;
  /** Short initial for avatar/badge, e.g. "M1" */
  classInitial: string;
  /** Active student count */
  studentCount: number;
}
