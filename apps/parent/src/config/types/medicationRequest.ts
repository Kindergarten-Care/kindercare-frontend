export interface MedicationRequestApiDto {
  medRequestId: number;
  studentId: number;
  parentId: number;
  requestDate: number; // Unix epoch seconds
  medicineDetails: string;
  dosage: string;
  medicineImageUrl: string | null;
  medicineImageURL?: string | null;
  status: string;
  teacherNote: string | null;
  frequency: string | null;
  timeToTake: string | null;
  parentNote: string | null;
}

export interface MedicationRequestDomainModel {
  medRequestId: number;
  studentId: number;
  parentId: number;
  requestDate: bigint;
  medicineDetails: string;
  dosage: string;
  medicineImageUrl: string | null;
  medicineImageURL?: string | null;
  status: string;
  teacherNote: string | null;
  frequency: string | null;
  timeToTake: string | null;
  parentNote: string | null;
}

export interface CreateMedicationRequestDto {
  studentId: number;
  requestDate: number; // Unix epoch seconds
  medicineDetails: string;
  dosage: string;
  frequency?: string | null;
  timeToTake?: string | null;
  parentNote?: string | null;
}
