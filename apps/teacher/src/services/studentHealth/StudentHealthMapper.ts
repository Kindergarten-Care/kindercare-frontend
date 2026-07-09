import type {
  AllergyApiDto,
  AllergyDomainModel,
  HealthLogApiDto,
  HealthLogDomainModel,
  MedicationApiDto,
  MedicationDomainModel,
} from '@/config/types/studentHealth';

const toBigInt = (value: number | null | undefined): bigint | null => {
  if (value === null || value === undefined) return null;
  return BigInt(value);
};

const ZERO_BIGINT: bigint = BigInt(0);

export class StudentHealthMapper {
  // Allergies ----------------------------------------------------------------

  static toAllergy(dto: AllergyApiDto): AllergyDomainModel {
    return {
      allergyId: dto.AllergyID,
      studentId: dto.StudentID,
      allergen: dto.Allergen,
      severity: dto.Severity,
      reaction: dto.Reaction,
      notes: dto.Notes,
      createdAt: toBigInt(dto.CreatedAt) ?? ZERO_BIGINT,
      updatedAt: toBigInt(dto.UpdatedAt) ?? ZERO_BIGINT,
    };
  }

  static toAllergyList(dtos: AllergyApiDto[]): AllergyDomainModel[] {
    return dtos.map((dto) => StudentHealthMapper.toAllergy(dto));
  }

  // Medications --------------------------------------------------------------

  static toMedication(dto: MedicationApiDto): MedicationDomainModel {
    return {
      medicationId: dto.MedicationID,
      studentId: dto.StudentID,
      medRequestId: dto.MedRequestID,
      medicineName: dto.MedicineName,
      dosage: dto.Dosage,
      scheduledTime: dto.ScheduledTime,
      frequency: dto.Frequency,
      status: dto.Status,
      administeredAt: toBigInt(dto.AdministeredAt),
      administeredBy: dto.AdministeredBy,
      notes: dto.Notes,
      createdAt: toBigInt(dto.CreatedAt) ?? ZERO_BIGINT,
      updatedAt: toBigInt(dto.UpdatedAt) ?? ZERO_BIGINT,
    };
  }

  static toMedicationList(dtos: MedicationApiDto[]): MedicationDomainModel[] {
    return dtos.map((dto) => StudentHealthMapper.toMedication(dto));
  }

  // Health logs --------------------------------------------------------------

  static toHealthLog(dto: HealthLogApiDto): HealthLogDomainModel {
    return {
      logId: dto.LogID,
      studentId: dto.StudentID,
      logType: dto.LogType,
      value: dto.Value,
      description: dto.Description,
      severity: dto.Severity,
      actionTaken: dto.ActionTaken,
      loggedBy: dto.LoggedBy,
      loggedByName: dto.LoggedByName ?? null,
      loggedAt: toBigInt(dto.LoggedAt) ?? ZERO_BIGINT,
      createdAt: toBigInt(dto.CreatedAt) ?? ZERO_BIGINT,
    };
  }

  static toHealthLogList(dtos: HealthLogApiDto[]): HealthLogDomainModel[] {
    return dtos.map((dto) => StudentHealthMapper.toHealthLog(dto));
  }
}