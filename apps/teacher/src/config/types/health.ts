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
  height: number;
  weight: number;
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

// ─── BMI Submit Payload ───────────────────────────────────────────────────────

export interface SubmitHealthMeasurementPayload {
  studentId: number;
  height: number;
  weight: number;
  notes?: string;
}

// ─── BMI Category ─────────────────────────────────────────────────────────────

export type BMICategory = 'underweight' | 'normal' | 'overweight' | 'obese';

export const BMI_CATEGORIES: Record<BMICategory, { label: string; color: string; bgColor: string; borderColor: string }> = {
  underweight: {
    label: 'Thiếu cân',
    color: '#2563EB',
    bgColor: '#DBEAFE',
    borderColor: '#93C5FD',
  },
  normal: {
    label: 'Bình thường',
    color: '#059669',
    bgColor: '#D1FAE5',
    borderColor: '#6EE7B7',
  },
  overweight: {
    label: 'Thừa cân',
    color: '#D97706',
    bgColor: '#FEF3C7',
    borderColor: '#FCD34D',
  },
  obese: {
    label: 'Béo phì',
    color: '#DC2626',
    bgColor: '#FEE2E2',
    borderColor: '#FCA5A5',
  },
};

export function getBMICategory(bmi: number): BMICategory {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  return 'obese';
}

export function calculateBMI(height: number, weight: number): number {
  if (height <= 0 || weight <= 0) return 0;
  const heightM = height / 100;
  return Math.round((weight / (heightM * heightM)) * 100) / 100;
}

