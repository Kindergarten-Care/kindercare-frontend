import { LeaveRequestApiDto, LeaveRequestDomainModel } from '@/config/types/leaveRequest';

export class LeaveRequestMapper {
  static toDomain(dto: LeaveRequestApiDto): LeaveRequestDomainModel {
    return {
      requestId: dto.requestId,
      studentId: dto.studentId,
      parentId: dto.parentId,
      fromDate: BigInt(dto.fromDate),
      toDate: BigInt(dto.toDate),
      reason: dto.reason,
      evidenceUrl: dto.evidenceUrl,
      status: dto.status,
      approverId: dto.approverId,
      isMealFeeDeducted: dto.isMealFeeDeducted,
      parentNotes: dto.parentNotes,
    };
  }

  static toDomainList(dtos: LeaveRequestApiDto[]): LeaveRequestDomainModel[] {
    return dtos.map(this.toDomain);
  }
}
