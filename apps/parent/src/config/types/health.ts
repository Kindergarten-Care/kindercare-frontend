export interface HealthRecordApiDto {
  recordId: number;
  studentId: number;
  termPeriod: string;
  height: string; // decimal as string from backend
  weight: string; // decimal as string from backend
  bmi: string;    // decimal as string from backend
}

export interface HealthRecordDomainModel {
  recordId: number;
  studentId: number;
  termPeriod: string;
  height: number;
  weight: number;
  bmi: number;
}
