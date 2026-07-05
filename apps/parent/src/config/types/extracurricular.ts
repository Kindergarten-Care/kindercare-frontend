export type EnrollmentStatus = 'Pending' | 'Active' | 'Cancelled' | 'Expired';

export interface ExtracurricularActivityApiDto {
  activityId: number;
  activityName: string;
  monthlyFee: number;
  description: string | null;
}

export interface ExtracurricularActivityDomainModel {
  activityId: number;
  activityName: string;
  monthlyFee: number;
  description: string | null;
}

export interface ExtracurricularEnrollmentApiDto {
  enrollmentId: number;
  activityId: number;
  activityName: string;
  monthlyFee: number;
  registeredMonth: string;
  status: EnrollmentStatus;
  createdAt: number;
}

export interface ExtracurricularEnrollmentDomainModel {
  enrollmentId: number;
  activityId: number;
  activityName: string;
  monthlyFee: number;
  registeredMonth: string;
  status: EnrollmentStatus;
  createdAt: number;
}

export interface CreateEnrollmentResult {
  enrollmentId: number;
  studentId: number;
  activityId: number;
  registeredMonth: string;
  status: EnrollmentStatus;
  invoiceId: number;
}

export interface CancelEnrollmentResult {
  enrollmentId: number;
  status: EnrollmentStatus;
  feeRefunded: boolean;
}
