import { MedicationRequestApiDto, MedicationRequestDomainModel } from '@/config/types/medicationRequest';

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
    };
  }

  static toDomainList(dtos: MedicationRequestApiDto[]): MedicationRequestDomainModel[] {
    return dtos.map(dto => this.toDomain(dto));
  }
}
