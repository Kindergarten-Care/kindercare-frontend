export interface RequestItem {
  id: string;
  requestId: number;
  type: 'leave' | 'medication';
  title: string;
  detail: string;
  reason?: string;
  dosage?: string;
  timeToTake?: string;
  sentTime: string;
  updatedTime?: string;
  note?: string;
  status: 'pending' | 'approved' | 'completed' | 'cancelled' | 'rejected';
  color: string;
  bg: string;
  rawDate: number;
  evidenceUrl?: string | null;
  teacherNote?: string | null;
  medicines?: {
    name: string;
    dosage: string;
    timeToTake?: string;
    imageUrl?: string;
  }[];
}
