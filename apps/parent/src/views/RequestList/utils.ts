import { RequestItem } from './types';
import { LeaveRequestDomainModel } from '@/config/types/leaveRequest';
import { MedicationRequestDomainModel } from '@/config/types/medicationRequest';
import { StudentDomainModel } from '@/config/types/student';
import { ProxyAuthorizationDomainModel } from '@/config/types/proxyAuthorization';
import { isMaleTeacher, getTeacherDisplayName } from '@/utils/Teacher/TeacherDisplay';

export const formatDate = (timestampSec: bigint | number): string => {
  let val = Number(timestampSec);
  if (val < 10000000000) {
    val = val * 1000;
  }
  const d = new Date(val);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

export const formatLocaltime = (timestampSec: bigint | number): string => {
  let val = Number(timestampSec);
  if (val < 10000000000) {
    val = val * 1000;
  }
  const d = new Date(val);
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${hours}:${minutes} ${day}/${month}/${year}`;
};

export const mapLeavesToRequestItems = (
  leaves: (LeaveRequestDomainModel & { createdAt?: bigint | number | null })[]
): RequestItem[] => {
  return leaves.map(l => {
    const fromStr = formatDate(l.fromDate);
    const toStr = formatDate(l.toDate);
    const detail = fromStr === toStr ? `Xin nghỉ ngày ${fromStr}` : `Xin nghỉ từ ngày ${fromStr} đến ${toStr}`;
    const normalizedStatus = (l.status || 'Pending').toLowerCase() as any;
    const sentTime = l.createdAt ? formatLocaltime(l.createdAt) : fromStr;
    const rawDate = l.createdAt ? Number(l.createdAt) : Number(l.fromDate);
    const updatedTime = l.updatedTime ? formatLocaltime(l.updatedTime) : undefined;

    return {
      id: `leave-${l.requestId}`,
      requestId: Number(l.requestId),
      type: 'leave',
      title: 'Đơn xin nghỉ',
      detail,
      reason: l.reason,
      sentTime,
      updatedTime,
      note: l.parentNotes,
      status: normalizedStatus,
      color: '#2563eb', // Blue
      bg: '#eff6ff',
      rawDate,
      evidenceUrl: l.evidenceUrl || (l as any).evidenceURL || (l as any).EvidenceURL || null,
    };
  });
};

export const mapMedicationsToRequestItems = (
  medications: MedicationRequestDomainModel[]
): RequestItem[] => {
  // Group medication requests by requestDate
  const medGroups: { [key: string]: MedicationRequestDomainModel[] } = {};
  medications.forEach(m => {
    const key = String(m.requestDate);
    if (!medGroups[key]) {
      medGroups[key] = [];
    }
    medGroups[key].push(m);
  });

  return Object.entries(medGroups).map(([_, group]) => {
    const rep = group[0];
    const reqStr = formatLocaltime(rep.requestDate);
    const updatedTime = rep.updatedTime ? formatLocaltime(rep.updatedTime) : undefined;

    // Resolve status of grouped requests
    let normalizedStatus: any = 'pending';
    const statuses = group.map(g => (g.status || 'Pending').toLowerCase());
    if (statuses.includes('pending')) {
      normalizedStatus = 'pending';
    } else if (statuses.includes('completed')) {
      normalizedStatus = 'completed';
    } else if (statuses.includes('approved')) {
      normalizedStatus = 'approved';
    } else if (statuses.includes('cancelled')) {
      normalizedStatus = 'cancelled';
    } else if (statuses.includes('rejected')) {
      normalizedStatus = 'rejected';
    } else {
      normalizedStatus = statuses[0] || 'pending';
    }

    const groupMedicines = group.map(m => ({
      name: m.medicineDetails,
      dosage: m.dosage,
      timeToTake: m.timeToTake || undefined,
      imageUrl: m.medicineImageUrl || m.medicineImageURL || (m as any).MedicineImageURL || undefined,
    }));

    const detail = groupMedicines.length > 1
      ? `Dặn cô cho bé uống ${groupMedicines.length} loại thuốc`
      : `Dặn cô cho bé uống ${rep.medicineDetails}`;

    // Combine unique parent notes in the group
    const uniqueNotes = Array.from(new Set(group.map(g => g.parentNote?.trim()).filter(Boolean)));
    const combinedNote = uniqueNotes.join('; ') || undefined;

    const uniqueTeacherNotes = Array.from(new Set(group.map(g => g.teacherNote?.trim()).filter(Boolean)));
    const combinedTeacherNote = uniqueTeacherNotes.join('; ') || undefined;

    return {
      id: `medicine-${rep.medRequestId}`,
      requestId: Number(rep.medRequestId),
      type: 'medication',
      title: 'Dặn dò thuốc',
      detail,
      dosage: groupMedicines.length === 1 ? rep.dosage : undefined,
      timeToTake: groupMedicines.length === 1 ? rep.timeToTake || undefined : undefined,
      sentTime: reqStr,
      updatedTime,
      note: combinedNote,
      status: normalizedStatus,
      color: '#ef4444', // Red
      bg: '#fee2e2',
      rawDate: Number(rep.requestDate),
      medicines: groupMedicines,
      teacherNote: combinedTeacherNote,
    };
  });
};

export const mapProxiesToRequestItems = (
  proxies: ProxyAuthorizationDomainModel[]
): RequestItem[] => {
  return proxies.map(p => {
    const authDateStr = formatDate(p.authorizationDate);
    const typeLabel = p.type === 'checkin' ? 'đưa bé đi học' : p.type === 'checkout' ? 'đón bé về' : 'đưa đón bé';
    const detail = `Ủy quyền ${typeLabel} hộ ngày ${authDateStr}. Người đón: ${p.proxyName} (${p.proxyPhone || 'Không có SĐT'})`;
    const normalizedStatus = (p.status || 'Pending').toLowerCase() as any;
    const sentTime = p.createdAt ? formatLocaltime(p.createdAt) : authDateStr;
    const rawDate = p.createdAt ? Number(p.createdAt) : Number(p.authorizationDate);

    return {
      id: `proxy-${p.authorizationId}`,
      requestId: Number(p.authorizationId),
      type: 'proxy',
      title: 'Ủy quyền đón hộ',
      detail,
      sentTime,
      note: p.notes || undefined,
      status: normalizedStatus,
      color: '#0d9488', // Teal
      bg: '#f0fdfa',
      rawDate,
      proxyPhone: p.proxyPhone,
      proxyIDCard: p.proxyIDCard,
      proxyPhotoUrl: p.proxyPhotoUrl,
      authorizationDate: authDateStr,
      proxyAuthType: p.type,
    };
  });
};

export const filterRequests = (
  requests: RequestItem[],
  activeTab: 'all' | 'leave' | 'medication' | 'proxy',
  activeStatusFilter: 'all' | 'pending' | 'approved_completed' | 'rejected' | 'cancelled'
): RequestItem[] => {
  return requests.filter(r => {
    const matchesTab = activeTab === 'all' || r.type === activeTab;

    let matchesStatus = true;
    if (activeStatusFilter === 'pending') {
      matchesStatus = r.status === 'pending';
    } else if (activeStatusFilter === 'approved_completed') {
      matchesStatus = r.status === 'approved' || r.status === 'completed';
    } else if (activeStatusFilter === 'rejected') {
      matchesStatus = r.status === 'rejected';
    } else if (activeStatusFilter === 'cancelled') {
      matchesStatus = r.status === 'cancelled';
    }

    return matchesTab && matchesStatus;
  });
};

export const calculateRequestStats = (requests: RequestItem[]) => {
  let pending = 0;
  let approvedOrCompleted = 0;
  let rejected = 0;
  let cancelled = 0;
  requests.forEach(r => {
    if (r.status === 'pending') pending++;
    else if (r.status === 'approved' || r.status === 'completed') approvedOrCompleted++;
    else if (r.status === 'rejected') rejected++;
    else if (r.status === 'cancelled') cancelled++;
  });
  return {
    pending,
    approvedOrCompleted,
    rejected,
    cancelled,
    total: requests.length,
    leaveCount: requests.filter(r => r.type === 'leave').length,
    medicationCount: requests.filter(r => r.type === 'medication').length,
    proxyCount: requests.filter(r => r.type === 'proxy').length,
  };
};

export interface TeacherInfo {
  leadTeacher: any;
  isMaleTeacher: boolean;
  teacherTitle: string;
  homeroomTitle: string;
  homeroomTitleWithName: string;
  teacherDisplayName: string;
}

export const resolveTeacherInfo = (activeStudent: StudentDomainModel | null): TeacherInfo => {
  const leadTeacher = activeStudent?.teachers?.find(
    t => t.roleInClass?.toLowerCase() === 'homeroom' || t.roleInClass?.toLowerCase() === 'primary'
  ) || activeStudent?.teachers?.[0];

  const isMale = leadTeacher ? isMaleTeacher(leadTeacher.gender) : false;

  const teacherTitle = isMale ? 'Thầy giáo' : 'Cô giáo';
  const homeroomTitle = isMale ? 'Thầy giáo chủ nhiệm' : 'Cô giáo chủ nhiệm';

  const homeroomTitleWithName = leadTeacher
    ? `${homeroomTitle} ${leadTeacher.fullName}`
    : homeroomTitle;

  const teacherDisplayName = leadTeacher
    ? getTeacherDisplayName(leadTeacher)
    : teacherTitle;

  return {
    leadTeacher,
    isMaleTeacher: isMale,
    teacherTitle,
    homeroomTitle,
    homeroomTitleWithName,
    teacherDisplayName,
  };
};

