import { Student, LeaveRequest, AttendanceStatus, LeaveRequestStatus } from '@/config/types/attendance';

// Mock Data matching Figma text nodes
const MOCK_STUDENTS: Student[] = [
  {
    id: 'MN1-001',
    name: 'Nguyễn Gia Bảo',
    avatar: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=80&auto=format&fit=crop&q=60',
    attendanceStatus: 'PRESENT',
    arrivalTime: '08:10',
    healthNote: 'Ho nhẹ, dặn uống nước ấm',
    hasActiveLeaveRequest: false,
  },
  {
    id: 'MN1-02',
    name: 'Trần Minh Anh',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&auto=format&fit=crop&q=60',
    attendanceStatus: 'PRESENT',
    arrivalTime: '07:50',
    healthNote: '',
    hasActiveLeaveRequest: false,
  },
  {
    id: 'MN1-03',
    name: 'Lê Hải Đăng',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=60',
    attendanceStatus: 'PRESENT',
    arrivalTime: '07:55',
    healthNote: '',
    hasActiveLeaveRequest: false,
  },
  {
    id: 'MN1-04',
    name: 'Phạm Ngọc Diệp',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=60',
    attendanceStatus: 'PRESENT',
    arrivalTime: '08:00',
    healthNote: '',
    hasActiveLeaveRequest: false,
  },
  {
    id: 'MN1-05',
    name: 'Vũ Hoàng Long',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=60',
    attendanceStatus: 'PRESENT',
    arrivalTime: '07:40',
    healthNote: '',
    hasActiveLeaveRequest: false,
  },
  {
    id: 'MN1-06',
    name: 'Hoàng Thu Thủy',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60',
    attendanceStatus: 'PRESENT',
    arrivalTime: '07:48',
    healthNote: '',
    hasActiveLeaveRequest: false,
  },
  {
    id: 'MN1-07',
    name: 'Đặng Quang Minh',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=60',
    attendanceStatus: 'PRESENT',
    arrivalTime: '07:52',
    healthNote: '',
    hasActiveLeaveRequest: false,
  },
  {
    id: 'MN1-08',
    name: 'Bùi Khánh Linh',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=60',
    attendanceStatus: 'PRESENT',
    arrivalTime: '08:05',
    healthNote: '',
    hasActiveLeaveRequest: false,
  },
  {
    id: 'MN1-09',
    name: 'Ngô Gia Khiêm',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&auto=format&fit=crop&q=60',
    attendanceStatus: 'PRESENT',
    arrivalTime: '07:42',
    healthNote: '',
    hasActiveLeaveRequest: false,
  },
  {
    id: 'MN1-010',
    name: 'Lý Thảo Nguyên',
    avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=80&auto=format&fit=crop&q=60',
    attendanceStatus: 'PRESENT',
    arrivalTime: '07:44',
    healthNote: '',
    hasActiveLeaveRequest: false,
  },
  {
    id: 'MN1-011',
    name: 'Đỗ Minh Khang',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&auto=format&fit=crop&q=60',
    attendanceStatus: 'PRESENT',
    arrivalTime: '07:58',
    healthNote: '',
    hasActiveLeaveRequest: false,
  },
  {
    id: 'MN1-012',
    name: 'Trương Mỹ Tâm',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=60',
    attendanceStatus: 'PRESENT',
    arrivalTime: '08:02',
    healthNote: '',
    hasActiveLeaveRequest: false,
  },
  {
    id: 'MN1-013',
    name: 'Phan Anh Tuấn',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&auto=format&fit=crop&q=60',
    attendanceStatus: 'PRESENT',
    arrivalTime: '08:08',
    healthNote: '',
    hasActiveLeaveRequest: false,
  },
  {
    id: 'MN1-014',
    name: 'Nguyễn Bích Hà',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&auto=format&fit=crop&q=60',
    attendanceStatus: 'PRESENT',
    arrivalTime: '07:46',
    healthNote: '',
    hasActiveLeaveRequest: false,
  },
  {
    id: 'MN1-015',
    name: 'Trần Đình Trọng',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=80&auto=format&fit=crop&q=60',
    attendanceStatus: 'PRESENT',
    arrivalTime: '07:51',
    healthNote: '',
    hasActiveLeaveRequest: false,
  },
  {
    id: 'MN1-016',
    name: 'Lê Minh Châu',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&auto=format&fit=crop&q=60',
    attendanceStatus: 'PRESENT',
    arrivalTime: '07:53',
    healthNote: '',
    hasActiveLeaveRequest: false,
  },
  {
    id: 'MN1-017',
    name: 'Võ Hữu Phước',
    avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=80&auto=format&fit=crop&q=60',
    attendanceStatus: 'PRESENT',
    arrivalTime: '07:57',
    healthNote: '',
    hasActiveLeaveRequest: false,
  },
  {
    id: 'MN1-018',
    name: 'Phạm Thanh Hằng',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=80&auto=format&fit=crop&q=60',
    attendanceStatus: 'PRESENT',
    arrivalTime: '07:49',
    healthNote: '',
    hasActiveLeaveRequest: false,
  },
  {
    id: 'MN1-019',
    name: 'Đinh Trường Giang',
    avatar: 'https://images.unsplash.com/photo-1489980508314-941910ded1f4?w=80&auto=format&fit=crop&q=60',
    attendanceStatus: 'PRESENT',
    arrivalTime: '08:04',
    healthNote: '',
    hasActiveLeaveRequest: false,
  },
  {
    id: 'MN1-020',
    name: 'Lâm Mỹ Lệ',
    avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&auto=format&fit=crop&q=60',
    attendanceStatus: 'PRESENT',
    arrivalTime: '08:06',
    healthNote: '',
    hasActiveLeaveRequest: false,
  },
  {
    id: 'MN1-021', // Added for the leave requests demo (total size 20 is visual list, we can have 20 total including leave requests)
    name: 'Trần Ngọc Châu',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&auto=format&fit=crop&q=60',
    attendanceStatus: 'PERMISSION_ABSENCE',
    arrivalTime: '--:--',
    healthNote: 'Sốt nhẹ từ đêm qua',
    hasActiveLeaveRequest: true,
    leaveRequestId: 'leave-001',
  },
  {
    id: 'MN1-022',
    name: 'Hồ Công Danh',
    avatar: 'https://images.unsplash.com/photo-1489980508314-941910ded1f4?w=80&auto=format&fit=crop&q=60',
    attendanceStatus: 'PERMISSION_ABSENCE',
    arrivalTime: '07:45',
    healthNote: '',
    hasActiveLeaveRequest: false,
  }
];

const MOCK_LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: 'leave-001',
    studentId: 'MN1-021',
    studentName: 'Trần Ngọc Châu',
    parentName: 'Nguyễn Thị Lan',
    relationship: 'Mẹ',
    reason: 'Bé bị sốt cao từ đêm qua (38.5 độ), gia đình xin phép cho bé nghỉ học và đi khám bác sĩ. Nhờ cô theo dõi bài học giúp bé.',
    attachmentUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&auto=format&fit=crop&q=60', // Doctor receipt mock image
    status: 'PENDING',
  }
];

// In-memory state storage for development session
let studentsState = [...MOCK_STUDENTS];
let leaveRequestsState = [...MOCK_LEAVE_REQUESTS];

// Raw API interface responses
interface RawApiStudent {
  student_id: string;
  full_name: string;
  avatar_url?: string;
  status_code: string;
  arrival_time_str: string;
  health_comment: string;
  active_leave_req_flag: boolean;
  leave_req_id?: string;
}

interface RawApiLeaveRequest {
  req_id: string;
  child_id: string;
  child_name: string;
  sender_name: string;
  sender_rel: string;
  req_reason: string;
  attached_file_url?: string;
  approval_status: string;
}

// Mappers converting raw API structure to defined domain models
function mapApiStudentToDomain(raw: RawApiStudent): Student {
  let domainStatus: AttendanceStatus = 'PRESENT';
  if (raw.status_code === 'P.A') domainStatus = 'PERMISSION_ABSENCE';
  if (raw.status_code === 'U.A') domainStatus = 'UNEXCUSED_ABSENCE';

  return {
    id: raw.student_id,
    name: raw.full_name,
    avatar: raw.avatar_url,
    attendanceStatus: domainStatus,
    arrivalTime: raw.arrival_time_str,
    healthNote: raw.health_comment,
    hasActiveLeaveRequest: raw.active_leave_req_flag,
    leaveRequestId: raw.leave_req_id,
  };
}

function mapApiLeaveRequestToDomain(raw: RawApiLeaveRequest): LeaveRequest {
  return {
    id: raw.req_id,
    studentId: raw.child_id,
    studentName: raw.child_name,
    parentName: raw.sender_name,
    relationship: raw.sender_rel,
    reason: raw.req_reason,
    attachmentUrl: raw.attached_file_url,
    status: raw.approval_status as LeaveRequestStatus,
  };
}

export class AttendanceService {
  /**
   * Fetch daily attendance records for a class and map to domain models.
   */
  public static async getDailyAttendance(classId: string, date: string): Promise<Student[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Convert in-memory state representing external data
    const rawList: RawApiStudent[] = studentsState.map(s => {
      let statusCode = 'P';
      if (s.attendanceStatus === 'PERMISSION_ABSENCE') statusCode = 'P.A';
      if (s.attendanceStatus === 'UNEXCUSED_ABSENCE') statusCode = 'U.A';

      return {
        student_id: s.id,
        full_name: s.name,
        avatar_url: s.avatar,
        status_code: statusCode,
        arrival_time_str: s.arrivalTime,
        health_comment: s.healthNote,
        active_leave_req_flag: s.hasActiveLeaveRequest,
        leave_req_id: s.leaveRequestId,
      };
    });

    // Map through standard domain mappers
    return rawList.map(mapApiStudentToDomain);
  }

  /**
   * Update attendance records on the server.
   */
  public static async updateAttendance(
    classId: string, 
    records: { studentId: string; status: AttendanceStatus; arrivalTime?: string; healthNote?: string }[]
  ): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    studentsState = studentsState.map(student => {
      const match = records.find(r => r.studentId === student.id);
      if (match) {
        return {
          ...student,
          attendanceStatus: match.status,
          arrivalTime: match.arrivalTime !== undefined ? match.arrivalTime : student.arrivalTime,
          healthNote: match.healthNote !== undefined ? match.healthNote : student.healthNote,
        };
      }
      return student;
    });

    return true;
  }

  /**
   * Fetch details for a specific leave request.
   */
  public static async getLeaveRequestDetail(requestId: string): Promise<LeaveRequest | null> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const match = leaveRequestsState.find(r => r.id === requestId);
    if (!match) return null;

    const raw: RawApiLeaveRequest = {
      req_id: match.id,
      child_id: match.studentId,
      child_name: match.studentName,
      sender_name: match.parentName,
      sender_rel: match.relationship,
      req_reason: match.reason,
      attached_file_url: match.attachmentUrl,
      approval_status: match.status,
    };

    return mapApiLeaveRequestToDomain(raw);
  }

  /**
   * Process (approve/reject) a student's leave request.
   */
  public static async processLeaveRequest(requestId: string, status: LeaveRequestStatus): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Update leave request state
    leaveRequestsState = leaveRequestsState.map(req => {
      if (req.id === requestId) {
        return { ...req, status };
      }
      return req;
    });

    const targetReq = leaveRequestsState.find(r => r.id === requestId);
    if (targetReq) {
      // If approved, update matching student to PERMISSION_ABSENCE (Vắng phép)
      // If rejected, remove active request flag
      studentsState = studentsState.map(student => {
        if (student.id === targetReq.studentId) {
          return {
            ...student,
            attendanceStatus: status === 'APPROVED' ? 'PERMISSION_ABSENCE' : student.attendanceStatus,
            hasActiveLeaveRequest: status === 'PENDING', // no longer active once processed
            healthNote: status === 'APPROVED' ? 'Sốt nhẹ từ đêm qua' : student.healthNote,
          };
        }
        return student;
      });
    }

    return true;
  }

  /**
   * Reset in-memory database helper (useful for demos or hot reloads)
   */
  public static resetState(): void {
    studentsState = [...MOCK_STUDENTS];
    leaveRequestsState = [...MOCK_LEAVE_REQUESTS];
  }
}
