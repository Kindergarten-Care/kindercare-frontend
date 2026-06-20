export interface LeaveRequestApiDto {
  requestId: number;
  studentId: number;
  parentId: number;
  fromDate: number; // Unix epoch seconds
  toDate: number; // Unix epoch seconds
  reason: string;
  evidenceUrl: string | null;
  status: string;
  approverId: number | null;
  isMealFeeDeducted: number;
  parentNotes: string;
}

export interface LeaveRequestDomainModel {
  requestId: number;
  studentId: number;
  parentId: number;
  fromDate: bigint;
  toDate: bigint;
  reason: string;
  evidenceUrl: string | null;
  status: string;
  approverId: number | null;
  isMealFeeDeducted: number;
  parentNotes: string;
}

export interface CreateLeaveRequestDto {
  studentId: number;
  fromDate: number; // Unix epoch seconds
  toDate: number; // Unix epoch seconds
  reason: string;
  evidenceUrl: string | null;
  parentNotes: string;
}
