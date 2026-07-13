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

      // Drop-off
      droppedOffByParentId: dto.droppedOffByParentId ?? null,
      droppedOffBy: dto.droppedOffBy ?? null,
      droppedOffRelationship: dto.droppedOffRelationship ?? null,
      droppedOffAvatarUrl: dto.droppedOffAvatarUrl ?? null,
      dropoffImage: dto.dropoffImage ?? null,

      // Pick-up
      pickedUpByParentId: dto.pickedUpByParentId ?? null,
      pickedUpBy: dto.pickedUpBy ?? null,
      pickedUpRelationship: dto.pickedUpRelationship ?? null,
      pickedUpAvatarUrl: dto.pickedUpAvatarUrl ?? null,
      pickupImage: dto.pickupImage ?? null,

      // Audit
      checkedInByTeacherId: dto.checkedInByTeacherId ?? null,
      checkedOutByTeacherId: dto.checkedOutByTeacherId ?? null,
      proxyAuthorizationId: dto.proxyAuthorizationId ?? null,
    };
  }

  static toDomainList(dtos: AttendanceApiDto[]): AttendanceDomainModel[] {
    return dtos.map(dto => this.toDomain(dto));
  }
}
