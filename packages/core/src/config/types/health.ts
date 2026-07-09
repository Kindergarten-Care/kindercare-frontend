// ─── Allergy ───────────────────────────────────────────────────────────────────

export interface AllergyApiDto {
  allergyId: number;
  studentId: number;
  allergen: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  symptoms?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AllergyDomainModel {
  allergyId: number;
  studentId: number;
  allergen: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  symptoms?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Medication Request ───────────────────────────────────────────────────────

export interface MedicationApiDto {
  medRequestId: number;
  studentId: number;
  studentName: string;
  parentName: string;
  requestDate: number;
  medicineDetails: string;
  dosage: string;
  frequency?: string;
  timeToTake?: string;
  parentNote?: string;
  medicineImageURL?: string;
  status: 'Pending' | 'Completed' | 'Rejected';
  teacherNote?: string;
  updatedTime?: number;
  studentAvatar?: string;
}

export interface MedicationDomainModel {
  medRequestId: number;
  studentId: number;
  studentName: string;
  parentName: string;
  requestDate: number;
  medicineDetails: string;
  dosage: string;
  frequency?: string;
  timeToTake?: string;
  parentNote?: string;
  medicineImageUrl?: string;
  status: 'Pending' | 'Completed' | 'Rejected';
  teacherNote?: string;
  updatedTime?: number;
  studentAvatar?: string;
}

// ─── Health Log (height/weight/bmi) ──────────────────────────────────────────

export interface HealthLogApiDto {
  logId: number;
  studentId: number;
  height: number;   // cm
  weight: number;    // kg
  bmi: number;
  measuredAt: string;
  notes?: string;
}

export interface HealthLogDomainModel {
  logId: number;
  studentId: number;
  height: number;
  weight: number;
  bmi: number;
  measuredAt: string;
  notes?: string;
}

// ─── Student with Health Info ─────────────────────────────────────────────────

export interface StudentHealthApiDto {
  studentId: number;
  fullName: string;
  dateOfBirth: number | null;
  gender: string;
  allergies: string | null;   // comma-separated allergens
  avatarUrl: string | null;
  healthRecord: {
    height: number | null;
    weight: number | null;
    bmi: number | null;
    lastMeasuredAt?: string;
  } | null;
}

// ─── BMI Submit Payload ───────────────────────────────────────────────────────

export interface SubmitHealthMeasurementPayload {
  studentId: number;
  height: number;  // cm
  weight: number;  // kg
  notes?: string;
}
