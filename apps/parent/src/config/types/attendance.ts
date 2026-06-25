export interface AttendanceApiDto {
  attendanceId: number;
  studentId: number;
  attendanceDate: number;
  status: string;
  checkInTime: number | null;
  checkOutTime: number | null;
  pickedUpBy: string | null;
}

export interface AttendanceDomainModel {
  attendanceId: number;
  studentId: number;
  attendanceDate: bigint;
  status: string;
  checkInTime: bigint | null;
  checkOutTime: bigint | null;
  pickedUpBy: string | null;
}
