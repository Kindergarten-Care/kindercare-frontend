import { LeaveRequestApiDto, LeaveRequestDomainModel } from '@/config/types/leaveRequest';

const parseToTimestamp = (val: any): bigint | null => {
  if (val === undefined || val === null) return null;
  
  if (typeof val === 'number' || (typeof val === 'string' && /^\d+$/.test(val))) {
    const num = Number(val);
    if (num < 10000000000) {
      return BigInt(num);
    } else {
      return BigInt(Math.floor(num / 1000));
    }
  }

  if (typeof val === 'string') {
    const match = val.match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2}))?/);
    if (match) {
      const [_, year, month, day, hours, minutes, seconds] = match;
      const secs = seconds || '00';
      const isoStr = `${year}-${month}-${day}T${hours}:${minutes}:${secs}+07:00`;
      const parsed = new Date(isoStr);
      if (!isNaN(parsed.getTime())) {
        return BigInt(Math.floor(parsed.getTime() / 1000));
      }
    }
  }

  const parsed = new Date(val);
  if (!isNaN(parsed.getTime())) {
    return BigInt(Math.floor(parsed.getTime() / 1000));
  }
  return null;
};

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
      createdAt: dto.createdAt !== undefined && dto.createdAt !== null ? BigInt(dto.createdAt) : null,
      updatedTime: parseToTimestamp(dto.updatedTime),
    };
  }

  static toDomainList(dtos: LeaveRequestApiDto[]): LeaveRequestDomainModel[] {
    return dtos.map(this.toDomain);
  }
}
