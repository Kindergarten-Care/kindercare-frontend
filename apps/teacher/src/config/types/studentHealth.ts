/**
 * Teacher Student Health module — wire types.
 *
 * Mirrors the BE response shape defined in:
 *   Backend/kindercare-backend/src/modules/teacher/sub/health.{route,controller,service}.js
 *
 * The BE returns rows in `ApiResponse<T>` envelopes: `{ success, statusCode,
 * message, data: { allergies | medications | logs: [...] } }`.
 */

export type AllergySeverity = 'Mild' | 'Moderate' | 'Severe';
export type LogType = 'Temperature' | 'Incident' | 'Observation' | 'Mood' | 'Meal' | 'Nap';
export type LogSeverity = 'Normal' | 'Mild' | 'Moderate' | 'Severe';
export type MedicationStatus = 'Pending' | 'Done' | 'Skipped';

// -----------------------------------------------------------------------------
// Allergies
// -----------------------------------------------------------------------------

export interface AllergyApiDto {
  AllergyID: number;
  StudentID: number;
  Allergen: string;
  Severity: AllergySeverity;
  Reaction: string | null;
  Notes: string | null;
  CreatedAt: number;
  UpdatedAt: number;
}

export interface AllergyDomainModel {
  allergyId: number;
  studentId: number;
  allergen: string;
  severity: AllergySeverity;
  reaction: string | null;
  notes: string | null;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface CreateAllergyPayload {
  allergen: string;
  severity?: AllergySeverity;
  reaction?: string | null;
  notes?: string | null;
}

export interface UpdateAllergyPayload extends Partial<CreateAllergyPayload> {}

// -----------------------------------------------------------------------------
// Medications
// -----------------------------------------------------------------------------

export interface MedicationApiDto {
  MedicationID: number;
  StudentID: number;
  MedRequestID: number | null;
  MedicineName: string;
  Dosage: string;
  ScheduledTime: string | null;
  Frequency: string | null;
  Status: MedicationStatus;
  AdministeredAt: number | null;
  AdministeredBy: number | null;
  Notes: string | null;
  CreatedAt: number;
  UpdatedAt: number;
}

export interface MedicationDomainModel {
  medicationId: number;
  studentId: number;
  medRequestId: number | null;
  medicineName: string;
  dosage: string;
  scheduledTime: string | null;
  frequency: string | null;
  status: MedicationStatus;
  administeredAt: bigint | null;
  administeredBy: number | null;
  notes: string | null;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface CreateMedicationPayload {
  medicineName: string;
  dosage: string;
  scheduledTime?: string | null;
  frequency?: string | null;
  status?: MedicationStatus;
  medRequestId?: number;
  notes?: string | null;
}

export interface UpdateMedicationStatusPayload {
  status: MedicationStatus;
  notes?: string | null;
}

// -----------------------------------------------------------------------------
// Health Logs
// -----------------------------------------------------------------------------

export interface HealthLogApiDto {
  LogID: number;
  StudentID: number;
  LogType: LogType;
  Value: string | null;
  Description: string | null;
  Severity: LogSeverity;
  ActionTaken: string | null;
  LoggedBy: number;
  LoggedByName: string | null;
  LoggedAt: number;
  CreatedAt: number;
}

export interface HealthLogDomainModel {
  logId: number;
  studentId: number;
  logType: LogType;
  value: string | null;
  description: string | null;
  severity: LogSeverity;
  actionTaken: string | null;
  loggedBy: number;
  loggedByName: string | null;
  loggedAt: bigint;
  createdAt: bigint;
}

export interface CreateHealthLogPayload {
  logType: LogType;
  value?: string | null;
  description?: string | null;
  severity?: LogSeverity;
  actionTaken?: string | null;
  loggedAt?: number;
}

export interface UpdateHealthLogPayload extends Partial<CreateHealthLogPayload> {}

// -----------------------------------------------------------------------------
// BE response envelopes
// -----------------------------------------------------------------------------

export interface AllergyListResponse {
  allergies: AllergyApiDto[];
}

export interface AllergySingleResponse {
  allergy: AllergyApiDto;
}

export interface MedicationListResponse {
  medications: MedicationApiDto[];
}

export interface MedicationSingleResponse {
  medication: MedicationApiDto;
}

export interface HealthLogListResponse {
  logs: HealthLogApiDto[];
}

export interface HealthLogSingleResponse {
  log: HealthLogApiDto;
}