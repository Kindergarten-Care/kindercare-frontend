export interface AttendanceApiDto {
  attendanceId: number;
  studentId: number;
  attendanceDate: number;
  status: string;
  checkInTime: number | null;
  checkOutTime: number | null;

  // Drop-off
  droppedOffByParentId: number | null;
  droppedOffBy: string | null;
  droppedOffRelationship: string | null;
  droppedOffAvatarUrl?: string | null;
  dropoffImage?: string | null;

  // Pick-up
  pickedUpByParentId: number | null;
  pickedUpBy: string | null;
  pickedUpRelationship: string | null;
  pickedUpAvatarUrl?: string | null;
  pickupImage?: string | null;

  // Audit
  checkedInByTeacherId: number | null;
  checkedOutByTeacherId: number | null;
  proxyAuthorizationId: number | null;
}

export interface AttendanceDomainModel {
  attendanceId: number;
  studentId: number;
  attendanceDate: bigint;
  status: string;
  checkInTime: bigint | null;
  checkOutTime: bigint | null;

  // Drop-off
  droppedOffByParentId: number | null;
  droppedOffBy: string | null;
  droppedOffRelationship: string | null;
  droppedOffAvatarUrl?: string | null;
  dropoffImage: string | null;

  // Pick-up
  pickedUpByParentId: number | null;
  pickedUpBy: string | null;
  pickedUpRelationship: string | null;
  pickedUpAvatarUrl?: string | null;
  pickupImage: string | null;

  // Audit
  checkedInByTeacherId: number | null;
  checkedOutByTeacherId: number | null;
  proxyAuthorizationId: number | null;
}
