import { MedicationRequestApiDto, MedicationRequestDomainModel } from '@/config/types/medicationRequest';

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

export class MedicationRequestMapper {
  static toDomain(dto: MedicationRequestApiDto): MedicationRequestDomainModel {
    return {
      medRequestId: dto.medRequestId,
      studentId: dto.studentId,
      parentId: dto.parentId,
      requestDate: BigInt(dto.requestDate),
      medicineDetails: dto.medicineDetails,
      dosage: dto.dosage,
      medicineImageUrl: dto.medicineImageUrl || dto.medicineImageURL || (dto as any).MedicineImageURL || null,
      medicineImageURL: dto.medicineImageURL || dto.medicineImageUrl || (dto as any).MedicineImageURL || null,
      status: dto.status,
      teacherNote: dto.teacherNote,
      frequency: dto.frequency,
      timeToTake: dto.timeToTake,
      parentNote: dto.parentNote,
      updatedTime: parseToTimestamp(dto.updatedTime),
    };
  }

  static toDomainList(dtos: MedicationRequestApiDto[]): MedicationRequestDomainModel[] {
    return dtos.map(dto => this.toDomain(dto));
  }
}
