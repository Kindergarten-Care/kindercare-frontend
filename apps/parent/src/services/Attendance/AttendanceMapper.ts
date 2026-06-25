import { AttendanceApiDto, AttendanceDomainModel } from '@/config/types/attendance';

export class AttendanceMapper {
  static toDomain(dto: AttendanceApiDto): AttendanceDomainModel {
    return {
      attendanceId: dto.attendanceId,
      studentId: dto.studentId,
      attendanceDate: BigInt(dto.attendanceDate),
      status: dto.status,
      checkInTime: dto.checkInTime !== null && dto.checkInTime !== undefined ? BigInt(dto.checkInTime) : null,
      checkOutTime: dto.checkOutTime !== null && dto.checkOutTime !== undefined ? BigInt(dto.checkOutTime) : null,
      pickedUpBy: dto.pickedUpBy,
    };
  }

  static toDomainList(dtos: AttendanceApiDto[]): AttendanceDomainModel[] {
    return dtos.map(dto => this.toDomain(dto));
  }
}
