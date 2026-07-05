export interface RequestItem {
  id: string;
  requestId: number;
  type: 'leave' | 'medication' | 'proxy';
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
  proxyPhone?: string | null;
  proxyIDCard?: string | null;
  proxyPhotoUrl?: string | null;
  authorizationDate?: string;
  proxyAuthType?: 'checkin' | 'checkout' | 'both';
  medicines?: {
    name: string;
    dosage: string;
    timeToTake?: string;
    imageUrl?: string;
  }[];
}
