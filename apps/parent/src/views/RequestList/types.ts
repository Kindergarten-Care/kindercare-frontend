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
  note?: string;
  status: 'pending' | 'approved' | 'completed' | 'cancelled' | 'rejected';
  color: string;
  bg: string;
  rawDate: number;
  medicines?: {
    name: string;
    dosage: string;
    timeToTake?: string;
    imageUrl?: string;
  }[];
}
