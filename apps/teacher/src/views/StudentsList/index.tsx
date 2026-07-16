import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { useDetailedStudents, useTeacherClasses } from '@/hooks/queries';
import { useAuth } from '@/contexts/AuthContext';
import { StudentDetailedDomainModel } from '@/config/types/student';
import type { TeacherClassDomainModel } from '@/config/types/class';
import { studentService } from '@/services/student/StudentService';
import { useQueryClient } from '@tanstack/react-query';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { getStudentInitials } from '@/utils/string';
import { AttendanceService } from '@/services/Attendance/AttendanceService';
import type { Student } from '@/config/types/attendance';

type DrawerTab = 'profile' | 'attendance' | 'health' | 'parents';
type FilterType = 'all' | 'present' | 'absent' | 'allergy';
type SortType = 'name' | 'age' | 'status';

export const StudentsListView: React.FC = () => {
  const { user } = useAuth();
  
  // Fetch classes taught by the teacher
  const { data: classes, isLoading: isLoadingClasses } = useTeacherClasses();
  const [activeClassId, setActiveClassId] = useState<number | string | undefined>(undefined);

  useEffect(() => {
    if (classes && classes.length > 0 && activeClassId === undefined) {
      setActiveClassId(classes[0].classId);
    }
  }, [classes, activeClassId]);

  const { data: students, isLoading: isLoadingStudents } = useDetailedStudents(activeClassId);

  // States
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('name');
  const [selectedStudent, setSelectedStudent] = useState<StudentDetailedDomainModel | null>(null);
  const [activeTab, setActiveTab] = useState<DrawerTab>('profile');
  const [toasts, setToasts] = useState<{ id: string; text: string }[]>([]);

  // API Data for selected student
  const [attendanceHistory, setAttendanceHistory] = useState<Array<{ date: string; status: 'PRESENT' | 'PERMISSION_ABSENCE' | 'UNEXCUSED_ABSENCE' }>>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [todayMeds, setTodayMeds] = useState<any[]>([]);
  const [loadingMeds, setLoadingMeds] = useState(false);
  const [dailyAttendance, setDailyAttendance] = useState<Student[]>([]);

  useEffect(() => {
    if (activeClassId) {
      const todayStr = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD
      AttendanceService.getDailyAttendance(activeClassId, todayStr)
        .then(setDailyAttendance)
        .catch(console.error);
    }
  }, [activeClassId]);

  // Form fields for edit
  const [editNickname, setEditNickname] = useState('');
  const [editTeam, setEditTeam] = useState('');
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [permissionModalOpen, setPermissionModalOpen] = useState(false);

  const [historyMonth, setHistoryMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  const loadAttendanceHistory = async (studentId: number, monthStr: string) => {
    try {
      setLoadingHistory(true);
      const res = await studentService.getStudentAttendanceHistory(studentId, monthStr);
      setAttendanceHistory(res);
    } catch (e) {
      console.error('Failed to load attendance history', e);
      setAttendanceHistory([]);
    } finally {
      setLoadingHistory(false);
    }
  };

  const loadTodayMeds = async (studentId: number) => {
    try {
      setLoadingMeds(true);
      const res = await studentService.getStudentMedicationsToday(studentId);
      setTodayMeds(res);
    } catch (e) {
      console.error('Failed to load medications today', e);
      setTodayMeds([]);
    } finally {
      setLoadingMeds(false);
    }
  };

  const handleSaveStudentInfo = async () => {
    if (!selectedStudent) return;
    try {
      setIsSavingProfile(true);
      const updated = await studentService.updateStudentNicknameAndTeam(selectedStudent.studentId, {
        nickname: editNickname.trim() || null,
        team: editTeam.trim() || null
      });

      setSelectedStudent(prev => prev ? { ...prev, nickname: updated.nickname, team: updated.team } : null);
      queryClient.invalidateQueries({ queryKey: ['detailed-students', activeClassId] });
      addToast('Đã cập nhật biệt danh và tổ học sinh!');
    } catch (e) {
      console.error(e);
      addToast('Cập nhật thất bại');
    } finally {
      setIsSavingProfile(false);
    }
  };

  useEffect(() => {
    if (selectedStudent) {
      setEditNickname(selectedStudent.nickname || '');
      setEditTeam(selectedStudent.team || '');
      loadAttendanceHistory(selectedStudent.studentId, historyMonth);
      loadTodayMeds(selectedStudent.studentId);
    }
  }, [selectedStudent]);

  useEffect(() => {
    if (selectedStudent) {
      loadAttendanceHistory(selectedStudent.studentId, historyMonth);
    }
  }, [historyMonth]);

  // Toast Helpers
  const addToast = (text: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, text }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2600);
  };

  if (isLoadingClasses) {
    return (
      <S.Container>
        <S.EmptyState>
          <span style={{ fontSize: '32px' }}>⏳</span>
          <span style={{ fontSize: '15px', fontWeight: 600 }}>Đang tải danh sách lớp học...</span>
        </S.EmptyState>
      </S.Container>
    );
  }

  if (classes && classes.length === 0) {
    return (
      <S.Container>
        <S.EmptyState>
          <span style={{ fontSize: '32px' }}>🏫</span>
          <span style={{ fontSize: '15px', fontWeight: 600 }}>Bạn chưa được phân công quản lý lớp học nào</span>
        </S.EmptyState>
      </S.Container>
    );
  }

  if (isLoadingStudents && activeClassId !== undefined) {
    return (
      <S.Container>
        <S.EmptyState>
          <span style={{ fontSize: '32px' }}>⏳</span>
          <span style={{ fontSize: '15px', fontWeight: 600 }}>Đang tải danh sách học sinh...</span>
        </S.EmptyState>
      </S.Container>
    );
  }

  const allStudents: StudentDetailedDomainModel[] = students?.students || [];

  // Status Helpers based on real attendance
  const getStudentStatus = (studentId: number): 'present' | 'late' | 'absent' => {
    const att = dailyAttendance.find(a => a.id === String(studentId));
    if (!att) return 'absent';
    if (att.attendanceStatus === 'PRESENT') return 'present';
    if (att.attendanceStatus === 'PERMISSION_ABSENCE') return 'late'; // using late as excused for ui
    return 'absent';
  };

  const getStudentMeds = (studentId: number) => {
    if (studentId % 4 === 0) {
      return [{ name: 'Siro ho Bảo Thanh', dose: '1 nắp nhỏ', time: 'Sau ăn trưa' }];
    }
    if (studentId % 7 === 0) {
      return [{ name: 'Thuốc kháng dị ứng', dose: '1 viên', time: 'Sau ăn trưa' }];
    }
    return [];
  };

  const getStudentNick = (studentId: number): string => {
    const nicks = ['Bin', 'Sóc', 'Mây', 'Bo', 'Kẹo', 'Bắp', 'Na', 'Bông', 'Tom', 'Su'];
    return nicks[studentId % nicks.length];
  };

  const getStudentTeam = (studentId: number): string => {
    const teams = ['Tổ Thỏ Trắng', 'Tổ Gấu Nâu', 'Tổ Mèo Vàng'];
    return teams[studentId % teams.length];
  };

  const hashStudentId = (studentId: number) => {
    return (studentId * 31) % 100;
  };

  const buildHeatmap = (studentId: number) => {
    const cells: { day: number; kind: 'present' | 'late' | 'absent' | 'weekend' | 'future' }[] = [];
    const seed = hashStudentId(studentId);
    // Heatmap representing July attendance
    for (let day = 1; day <= 30; day++) {
      const dow = (day - 1) % 7;
      const weekend = dow >= 5; // Sat, Sun
      let kind: 'present' | 'late' | 'absent' | 'weekend' | 'future' = 'present';
      if (weekend) {
        kind = 'weekend';
      } else {
        const r = (seed + day * 17) % 100;
        if (day >= 27) {
          kind = 'future';
        } else if (r < 7) {
          kind = 'absent';
        } else if (r < 16) {
          kind = 'late';
        } else {
          kind = 'present';
        }
      }
      cells.push({ day, kind });
    }
    return cells;
  };

  // Stats Calculations
  const presentCount = allStudents.filter(s => getStudentStatus(s.studentId) !== 'absent').length;
  const absentCount = allStudents.filter(s => getStudentStatus(s.studentId) === 'absent').length;
  const allergyTotal = allStudents.filter(s => s.allergies && s.allergies.trim()).length;

  // Filter students
  let filteredStudents = allStudents.filter(s => {
    const q = searchQuery.trim().toLowerCase();
    const studentNick = s.nickname || getStudentNick(s.studentId);
    const matchesQuery = s.fullName.toLowerCase().includes(q) || studentNick.toLowerCase().includes(q);
    if (!matchesQuery) return false;

    const status = getStudentStatus(s.studentId);
    if (filter === 'present' && status === 'absent') return false;
    if (filter === 'absent' && status !== 'absent') return false;
    if (filter === 'allergy' && (!s.allergies || !s.allergies.trim())) return false;

    return true;
  });

  // Sort students
  const getLastName = (fullName: string) => {
    return fullName.trim().split(' ').slice(-1)[0] || '';
  };

  if (sort === 'name') {
    filteredStudents = [...filteredStudents].sort((a, b) => 
      getLastName(a.fullName).localeCompare(getLastName(b.fullName), 'vi')
    );
  } else if (sort === 'age') {
    filteredStudents = [...filteredStudents].sort((a, b) => {
      const aDob = a.dateOfBirth ? Number(a.dateOfBirth) : 0;
      const bDob = b.dateOfBirth ? Number(b.dateOfBirth) : 0;
      return bDob - aDob; // Younger first
    });
  } else if (sort === 'status') {
    const order = { absent: 0, late: 1, present: 2 };
    filteredStudents = [...filteredStudents].sort((a, b) => 
      order[getStudentStatus(a.studentId)] - order[getStudentStatus(b.studentId)]
    );
  }

  // Calculate age string
  const calculateAgeStr = (dobSeconds?: number | null) => {
    if (!dobSeconds) return 'Chưa cập nhật';
    const birthDate = new Date(Number(dobSeconds) * 1000);
    const birthYear = birthDate.getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    return `${age} tuổi (${birthDate.toLocaleDateString('vi-VN')})`;
  };

  // Status mapping configs
  const statusConfig = {
    present: { label: 'Có mặt', c: '#005A36', bg: '#E6F3ED', bd: '#C7E3D5', dot: '#16a34a', mini: '✓', dim: false },
    late: { label: 'Đi muộn', c: '#D97706', bg: '#FEF3C7', bd: '#FCD34D', dot: '#D97706', mini: '⚠', dim: false },
    absent: { label: 'Vắng mặt', c: '#DC2626', bg: '#FEE2E2', bd: '#FCA5A5', dot: '#DC2626', mini: '✕', dim: true },
  };

  const handleOpenDrawer = (student: StudentDetailedDomainModel) => {
    setSelectedStudent(student);
    setActiveTab('profile');
  };

  // Drawer selected student details calculation
  const buildHeatmapFromApi = (historyList: Array<{ date: string; status: string }>, year: number, month: number) => {
    const cells: { day: number; kind: 'present' | 'late' | 'absent' | 'weekend' | 'future' }[] = [];
    const daysInMonth = new Date(year, month, 0).getDate();
    const todayZero = new Date();
    todayZero.setHours(0, 0, 0, 0);

    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, month - 1, day);
      const dow = dateObj.getDay();
      const weekend = dow === 0 || dow === 6;

      let kind: 'present' | 'late' | 'absent' | 'weekend' | 'future' = 'present';

      if (weekend) {
        kind = 'weekend';
      } else if (dateObj > todayZero) {
        kind = 'future';
      } else {
        const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const match = historyList.find(h => h.date === dateStr);
        if (match) {
          if (match.status === 'PRESENT') {
            kind = 'present';
          } else if (match.status === 'PERMISSION_ABSENCE') {
            kind = 'late';
          } else {
            kind = 'absent';
          }
        } else {
          kind = 'absent';
        }
      }
      cells.push({ day, kind });
    }
    return cells;
  };

  // Drawer selected student details calculation
  const [yearStr, monthStr] = historyMonth.split('-');
  const drawerStudentHeatmap = selectedStudent
    ? buildHeatmapFromApi(attendanceHistory, parseInt(yearStr), parseInt(monthStr))
    : [];
  const drawerStudentAttendanceDays = drawerStudentHeatmap.filter(c => c.kind !== 'weekend' && c.kind !== 'future');
  const drawerStudentPresentOrLateDays = drawerStudentAttendanceDays.filter(c => c.kind === 'present' || c.kind === 'late').length;
  const drawerStudentAttendanceRate = drawerStudentAttendanceDays.length > 0
    ? Math.round((drawerStudentPresentOrLateDays / drawerStudentAttendanceDays.length) * 100)
    : 100;

  const drawerStudentBmi = selectedStudent?.healthRecord?.bmi || 0;
  const getBmiStatus = (bmiValue: number) => {
    if (bmiValue === 0) return '--';
    if (bmiValue < 14) return 'Hơi gầy';
    if (bmiValue <= 17) return 'Bình thường';
    return 'Theo dõi';
  };

  return (
    <S.Container>
      {/* HERO / STATS HEADER */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '24px',
        background: 'linear-gradient(120deg, #005A36 0%, #00794A 60%, #0A8A57 100%)',
        boxShadow: '0 18px 44px -18px rgba(0,90,54,0.5)',
        padding: '28px 32px'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(420px 280px at 90% 130%, rgba(255,255,255,0.12), transparent 60%)'
        }}></div>
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          flexWrap: 'wrap'
        }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', color: '#A7E0C6', textTransform: 'uppercase' }}>Quản lý lớp học</div>
            {classes && classes.length > 0 ? (
              <S.ClassSelectContainer>
                <S.ClassSelect 
                  value={activeClassId} 
                  onChange={(e) => {
                    const val = e.target.value;
                    setActiveClassId(Number(val));
                  }}
                >
                  {classes.map((cls: TeacherClassDomainModel) => (
                    <option key={cls.classId} value={cls.classId}>
                      {cls.displayName}
                    </option>
                  ))}
                </S.ClassSelect>
                <S.ClassSelectArrow>▼</S.ClassSelectArrow>
              </S.ClassSelectContainer>
            ) : (
              <h1 style={{
                fontSize: '27px',
                fontWeight: 800,
                color: '#fff',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                marginTop: '6px',
                margin: '6px 0 0 0',
                fontFamily: 'inherit'
              }}>Danh sách lớp</h1>
            )}
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '14px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '13.5px', color: '#E2F3EA', fontWeight: 600 }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#FBBF24' }}></span>
                {allStudents.length} học sinh
              </div>
              <span style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.25)' }}></span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '13.5px', color: '#E2F3EA', fontWeight: 600 }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#34D399' }}></span>
                {presentCount} có mặt
              </div>
              <span style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.25)' }}></span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '13.5px', color: '#FFD9DD', fontWeight: 600 }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#F87171' }}></span>
                {allergyTotal} dị ứng
              </div>
            </div>
          </div>
          <button 
            onClick={() => setPermissionModalOpen(true)}
            style={{
              flex: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '9px',
              height: '48px',
              padding: '0 22px',
              borderRadius: '14px',
              border: 'none',
              background: '#fff',
              color: '#005A36',
              fontFamily: 'inherit',
              fontWeight: 800,
              fontSize: '14.5px',
              cursor: 'pointer',
              boxShadow: '0 10px 24px -10px rgba(0,0,0,0.2)',
              transition: 'transform 0.15s'
            }}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Thêm bé mới
          </button>
        </div>
      </section>

      {/* TOOLBAR */}
      <S.ToolbarRow>
        {/* Search */}
        <S.SearchBox style={{ flex: 'none', maxWidth: '380px', flexGrow: 1 }}>
          <span style={{ flex: 'none', display: 'flex', width: '18px', height: '18px', color: '#9CA3AF' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <S.SearchInput 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm bé theo tên, biệt danh…" 
          />
        </S.SearchBox>

        {/* Filters */}
        <S.FilterGroup>
          <S.FilterBtn $active={filter === 'all'} onClick={() => setFilter('all')}>
            Tất cả <span style={{ opacity: 0.65, fontWeight: 700 }}>{allStudents.length}</span>
          </S.FilterBtn>
          <S.FilterBtn $active={filter === 'present'} onClick={() => setFilter('present')}>
            Hiện diện <span style={{ opacity: 0.65, fontWeight: 700 }}>{presentCount}</span>
          </S.FilterBtn>
          <S.FilterBtn $active={filter === 'absent'} onClick={() => setFilter('absent')}>
            Vắng <span style={{ opacity: 0.65, fontWeight: 700 }}>{absentCount}</span>
          </S.FilterBtn>
          <S.FilterBtn $active={filter === 'allergy'} onClick={() => setFilter('allergy')}>
            ⚠ Dị ứng <span style={{ opacity: 0.65, fontWeight: 700 }}>{allergyTotal}</span>
          </S.FilterBtn>
        </S.FilterGroup>

        <div style={{ flex: 1 }}></div>

        {/* Sorting */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#9CA3AF' }}>Sắp xếp</span>
          <S.SortContainer>
            <S.SortBtn $active={sort === 'name'} onClick={() => setSort('name')}>Tên</S.SortBtn>
            <S.SortBtn $active={sort === 'age'} onClick={() => setSort('age')}>Tuổi</S.SortBtn>
            <S.SortBtn $active={sort === 'status'} onClick={() => setSort('status')}>TT</S.SortBtn>
          </S.SortContainer>
        </div>
      </S.ToolbarRow>

      {/* STUDENT GRID */}
      {filteredStudents.length > 0 ? (
        <S.Grid>
          {filteredStudents.map(student => {
            const initial = getStudentInitials(student.fullName);
            const status = getStudentStatus(student.studentId);
            const conf = statusConfig[status];
            
            // Deterministic gradient background
            const isBlue = student.studentId % 2 === 0;
            const grad = isBlue ? 'linear-gradient(135deg, #60A5FA, #2563EB)' : 'linear-gradient(135deg, #34D399, #005A36)';
            
            const hasAllergies = !!(student.allergies && student.allergies.trim());
            const hasMeds = getStudentMeds(student.studentId).length > 0;
            const nickname = student.nickname || getStudentNick(student.studentId);
            const ageYear = student.dateOfBirth ? (2026 - new Date(Number(student.dateOfBirth) * 1000).getFullYear()) : 5;

            return (
              <S.StudentCard 
                key={student.studentId} 
                $dim={conf.dim} 
                onClick={() => handleOpenDrawer(student)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '13px', width: '100%' }}>
                  <S.AvatarBox $grad={grad}>
                    {initial}
                    {student.avatarUrl && (
                      <S.ProfileAvatar 
                        src={student.avatarUrl} 
                        alt="" 
                        fill 
                        sizes="52px"
                        onError={(e: any) => { e.currentTarget.style.display = 'none'; }}
                      />
                    )}
                    <span style={{
                      position: 'absolute',
                      right: '-3px',
                      bottom: '-3px',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: conf.dot,
                      boxShadow: '0 0 0 3px #fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '10px',
                      fontWeight: 700
                    }}>{conf.mini}</span>
                  </S.AvatarBox>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="display" style={{ fontWeight: 700, fontSize: '14.5px', color: '#1F2937', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {student.fullName}
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#9CA3AF', marginTop: '1px' }}>
                      {nickname ? `"${nickname}"` : 'Chưa có biệt danh'} · {ageYear} tuổi
                    </div>
                  </div>
                </div>

                <S.TagRow style={{ minHeight: '22px' }}>
                  <S.StatusTag $type={status}>{conf.label}</S.StatusTag>
                  {hasAllergies && <S.AlertTag $type="allergy">⚠ Dị ứng</S.AlertTag>}
                  {hasMeds && <S.AlertTag $type="med">💊 Thuốc</S.AlertTag>}
                </S.TagRow>
              </S.StudentCard>
            );
          })}
        </S.Grid>
      ) : (
        <S.EmptyState>
          <span style={{ fontSize: '42px' }}>🔍</span>
          <span style={{ fontSize: '14px', fontWeight: 600 }}>Không tìm thấy học sinh nào khớp "{searchQuery}"</span>
        </S.EmptyState>
      )}

      {/* DETAIL DRAWER */}
      {selectedStudent && (
        <>
          <S.DrawerBackdrop onClick={() => setSelectedStudent(null)} />
          <S.Drawer onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <S.DrawerHeader style={{
              background: 'linear-gradient(135deg, #E6F3ED, #F4FBF7)'
            }}>
              <button 
                onClick={() => setSelectedStudent(null)} 
                style={{
                  position: 'absolute',
                  top: '18px',
                  right: '18px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  border: 'none',
                  background: '#fff',
                  color: '#6B7280',
                  fontSize: '17px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px -2px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ✕
              </button>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                <span style={{
                  position: 'relative',
                  flex: 'none',
                  width: '66px',
                  height: '66px',
                  borderRadius: '20px',
                  background: selectedStudent.studentId % 2 === 0 ? 'linear-gradient(135deg, #60A5FA, #2563EB)' : 'linear-gradient(135deg, #34D399, #005A36)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '25px',
                  boxShadow: '0 0 0 4px #fff'
                }} className="display">
                  {getStudentInitials(selectedStudent.fullName)}
                  {selectedStudent.avatarUrl && (
                    <S.ProfileAvatar 
                      src={selectedStudent.avatarUrl} 
                      alt="" 
                      fill 
                      sizes="66px"
                      onError={(e: any) => { e.currentTarget.style.display = 'none'; }}
                    />
                  )}
                  
                  <span style={{
                    position: 'absolute',
                    right: '-3px',
                    bottom: '-3px',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: statusConfig[getStudentStatus(selectedStudent.studentId)].dot,
                    boxShadow: '0 0 0 3px #EAF4EE'
                  }}></span>
                </span>

                <div style={{ flex: 1, minWidth: 0, paddingTop: '2px' }}>
                  <div className="display" style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.02em', color: '#1F2937' }}>
                    {selectedStudent.fullName}
                  </div>
                  <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>
                    Biệt danh: {selectedStudent.nickname || 'Chưa có'} · HS{selectedStudent.studentId.toString().padStart(4, '0')}
                  </div>
                  <div style={{ display: 'flex', gap: '6px', marginTop: '9px', flexWrap: 'wrap' }}>
                    <S.StatusTag $type={getStudentStatus(selectedStudent.studentId)}>
                      {statusConfig[getStudentStatus(selectedStudent.studentId)].label}
                    </S.StatusTag>
                    {selectedStudent.allergies && selectedStudent.allergies.trim() && (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#DC2626',
                        background: '#FEE2E2',
                        border: '1px solid #FCA5A5',
                        padding: '3px 9px',
                        borderRadius: '999px'
                      }}>
                        ⚠ Dị ứng
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <S.TabGroup>
                <S.TabBtn $active={activeTab === 'profile'} onClick={() => setActiveTab('profile')}>👤 Hồ sơ</S.TabBtn>
                <S.TabBtn $active={activeTab === 'attendance'} onClick={() => setActiveTab('attendance')}>📅 Chuyên cần</S.TabBtn>
                <S.TabBtn $active={activeTab === 'health'} onClick={() => setActiveTab('health')}>💖 Sức khỏe</S.TabBtn>
                <S.TabBtn $active={activeTab === 'parents'} onClick={() => setActiveTab('parents')}>👨‍👩‍👧 Phụ huynh</S.TabBtn>
              </S.TabGroup>
            </S.DrawerHeader>

            {/* Body */}
            <S.DrawerBody>
              {/* PROFILE TAB */}
              {activeTab === 'profile' && (
                <S.FadeInContent>
                  {selectedStudent.allergies && selectedStudent.allergies.trim() && (
                    <div style={{
                      display: 'flex',
                      gap: '11px',
                      padding: '13px',
                      borderRadius: '13px',
                      background: '#FEE2E2',
                      border: '1px solid #FCA5A5'
                    }}>
                      <span style={{ flex: 'none', fontSize: '18px' }}>⚠️</span>
                      <div>
                        <div className="display" style={{ fontWeight: 700, fontSize: '13px', color: '#991B1B' }}>Cảnh báo dị ứng</div>
                        <div style={{ fontSize: '12.5px', color: '#B91C1C', marginTop: '2px', lineHeight: 1.5 }}>
                          {selectedStudent.allergies}
                        </div>
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                    <S.InfoRow>
                      <span style={{ flex: 'none', width: '32px', height: '32px', borderRadius: '10px', background: '#E6F3ED', color: '#005A36', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px' }}>🎂</span>
                      <span style={{ flex: 1, fontSize: '12px', color: '#9CA3AF', fontWeight: 500 }}>Ngày sinh</span>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#1F2937' }}>{calculateAgeStr(selectedStudent.dateOfBirth)}</span>
                    </S.InfoRow>

                    <S.InfoRow>
                      <span style={{ flex: 'none', width: '32px', height: '32px', borderRadius: '10px', background: '#E6F3ED', color: '#005A36', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px' }}>⚧️</span>
                      <span style={{ flex: 1, fontSize: '12px', color: '#9CA3AF', fontWeight: 500 }}>Giới tính</span>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#1F2937' }}>{selectedStudent.gender === 'Male' ? 'Nam' : 'Nữ'}</span>
                    </S.InfoRow>

                    <S.InfoRow>
                      <span style={{ flex: 'none', width: '32px', height: '32px', borderRadius: '10px', background: '#E6F3ED', color: '#005A36', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px' }}>🏷️</span>
                      <span style={{ flex: 1, fontSize: '12px', color: '#9CA3AF', fontWeight: 500 }}>Mã học sinh</span>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#1F2937' }}>HS{selectedStudent.studentId.toString().padStart(4, '0')}</span>
                    </S.InfoRow>

                    <S.InfoRow>
                      <span style={{ flex: 'none', width: '32px', height: '32px', borderRadius: '10px', background: '#E6F3ED', color: '#005A36', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px' }}>🐾</span>
                      <span style={{ flex: 1, fontSize: '12px', color: '#9CA3AF', fontWeight: 500 }}>Tổ</span>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#1F2937' }}>{selectedStudent.team || 'Chưa phân tổ'}</span>
                    </S.InfoRow>

                    <S.InfoRow>
                      <span style={{ flex: 'none', width: '32px', height: '32px', borderRadius: '10px', background: '#E6F3ED', color: '#005A36', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px' }}>📅</span>
                      <span style={{ flex: 1, fontSize: '12px', color: '#9CA3AF', fontWeight: 500 }}>Ngày nhập học</span>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#1F2937' }}>05/09/2024</span>
                    </S.InfoRow>
                  </div>

                  <div style={{ marginTop: '20px', borderTop: '1px solid #EEF4F0', paddingTop: '15px' }}>
                    <div className="display" style={{ fontWeight: 700, fontSize: '14px', marginBottom: '10px' }}>Chỉnh sửa thông tin nhanh</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div>
                        <label style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Biệt danh</label>
                        <input 
                          value={editNickname}
                          onChange={e => setEditNickname(e.target.value)}
                          placeholder="Ví dụ: Bin, Sóc..."
                          maxLength={50}
                          style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '8px', border: '1.5px solid #E6EEE9', outline: 'none', fontSize: '13px' }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Tổ / Nhóm</label>
                        <input 
                          value={editTeam}
                          onChange={e => setEditTeam(e.target.value)}
                          placeholder="Ví dụ: Tổ Gấu Nâu, Tổ Thỏ Trắng..."
                          maxLength={50}
                          style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '8px', border: '1.5px solid #E6EEE9', outline: 'none', fontSize: '13px' }}
                        />
                      </div>
                      <button
                        onClick={handleSaveStudentInfo}
                        disabled={isSavingProfile}
                        style={{
                          height: '38px',
                          borderRadius: '8px',
                          border: 'none',
                          background: '#005A36',
                          color: '#fff',
                          fontWeight: 700,
                          fontSize: '13px',
                          cursor: 'pointer',
                          marginTop: '5px',
                          transition: 'opacity 0.2s'
                        }}
                        onMouseOver={e => e.currentTarget.style.opacity = '0.9'}
                        onMouseOut={e => e.currentTarget.style.opacity = '1'}
                      >
                        {isSavingProfile ? 'Đang lưu...' : 'Lưu thay đổi'}
                      </button>
                    </div>
                  </div>
                </S.FadeInContent>
              )}

              {/* ATTENDANCE TAB */}
              {activeTab === 'attendance' && (
                <S.FadeInContent>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                    <span className="display" style={{ fontWeight: 700, fontSize: '14px' }}>Chuyên cần</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input 
                        type="month"
                        value={historyMonth}
                        onChange={e => setHistoryMonth(e.target.value)}
                        style={{ padding: '4px 8px', borderRadius: '8px', border: '1.5px solid #C7E3D5', fontSize: '12.5px', outline: 'none' }}
                      />
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#005A36', background: '#E6F3ED', padding: '5px 11px', borderRadius: '8px' }}>
                        {drawerStudentAttendanceRate}%
                      </span>
                    </div>
                  </div>

                  {loadingHistory ? (
                    <div style={{ padding: '30px', textAlign: 'center', fontSize: '13px', color: '#6B7280' }}>Đang tải lịch sử chuyên cần...</div>
                  ) : (
                    <S.HeatmapGrid>
                      {drawerStudentHeatmap.map(c => {
                        const [y, m] = historyMonth.split('-');
                        const dayLabel = `${c.day}/${m} · ${c.kind === 'present' ? 'có mặt' : c.kind === 'late' ? 'vắng phép' : c.kind === 'absent' ? 'vắng' : c.kind === 'weekend' ? 'cuối tuần' : 'chưa tới'}`;
                        return (
                          <S.HeatmapCell 
                            key={c.day}
                            $kind={c.kind}
                            title={dayLabel}
                          >
                            {c.day}
                          </S.HeatmapCell>
                        );
                      })}
                    </S.HeatmapGrid>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '11px', fontWeight: 600, color: '#9CA3AF', marginTop: '4px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#005A36' }} />
                      Có mặt
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#FEF3C7', border: '1px solid #FCD34D' }} />
                      Muộn
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#FEE2E2', border: '1px solid #FCA5A5' }} />
                      Vắng
                    </span>
                  </div>

                  <button 
                    onClick={() => addToast(`✓ Đã mở cập nhật điểm danh cho bé ${getLastName(selectedStudent.fullName)}`)}
                    className="display"
                    style={{
                      height: '44px',
                      borderRadius: '12px',
                      border: '1px solid #C7E3D5',
                      background: '#E6F3ED',
                      color: '#005A36',
                      fontFamily: 'inherit',
                      fontWeight: 700,
                      fontSize: '13.5px',
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                      marginTop: '8px'
                    }}
                  >
                    Cập nhật điểm danh hôm nay
                  </button>
                </S.FadeInContent>
              )}

              {/* HEALTH TAB */}
              {activeTab === 'health' && (
                <S.FadeInContent>
                  <S.HealthRow>
                    <S.HealthCard $theme="blue">
                      <S.HealthTitle $theme="blue">Chiều cao</S.HealthTitle>
                      <S.HealthVal>
                        {selectedStudent.healthRecord?.height || '--'}
                        <span style={{ fontSize: '13px', color: '#6B7280', fontWeight: 600 }}> cm</span>
                      </S.HealthVal>
                    </S.HealthCard>

                    <S.HealthCard $theme="purple">
                      <S.HealthTitle $theme="purple">Cân nặng</S.HealthTitle>
                      <S.HealthVal>
                        {selectedStudent.healthRecord?.weight ? selectedStudent.healthRecord.weight.toFixed(1) : '--'}
                        <span style={{ fontSize: '13px', color: '#6B7280', fontWeight: 600 }}> kg</span>
                      </S.HealthVal>
                    </S.HealthCard>
                  </S.HealthRow>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '11px',
                    padding: '13px 15px',
                    borderRadius: '13px',
                    background: '#E6F3ED',
                    border: '1px solid #C7E3D5'
                  }}>
                    <span style={{ flex: 'none', width: '36px', height: '36px', borderRadius: '11px', background: '#fff', color: '#005A36', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '12px', color: '#3F7B5F', fontWeight: 600 }}>Chỉ số BMI</div>
                      <div className="display" style={{ fontSize: '15px', fontWeight: 700, color: '#1F2937' }}>
                        {drawerStudentBmi ? drawerStudentBmi.toFixed(1) : '--'} · <span style={{ color: '#005A36' }}>{getBmiStatus(drawerStudentBmi)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Medications dặn thuốc */}
                  <S.PrescriptionBox>
                    <span className="display" style={{ fontWeight: 700, fontSize: '13.5px' }}>💊 Đơn thuốc hôm nay</span>
                    
                    {loadingMeds ? (
                      <div style={{ padding: '14px', textAlign: 'center', fontSize: '12.5px', color: '#6B7280' }}>Đang tải đơn thuốc hôm nay...</div>
                    ) : todayMeds && todayMeds.length > 0 ? (
                      todayMeds.map((med, idx) => (
                        <S.PrescriptionItem key={idx}>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: '13px', color: '#1F2937' }}>{med.medicineName}</div>
                            <div style={{ fontSize: '11.5px', color: '#6B7280', marginTop: '1px' }}>{med.dosage} · {med.frequency} · Giờ uống: {med.scheduledTime}</div>
                            {med.parentNote && (
                              <div style={{ fontSize: '11px', color: '#DC2626', marginTop: '4px', fontWeight: 600 }}>Lưu ý: {med.parentNote}</div>
                            )}
                          </div>
                        </S.PrescriptionItem>
                      ))
                    ) : (
                      <div style={{
                        padding: '14px',
                        borderRadius: '12px',
                        background: '#F6FAF7',
                        border: '1px dashed #C7DBCF',
                        fontSize: '12.5px',
                        color: '#6B7280',
                        textAlign: 'center'
                      }}>
                        Không có đơn thuốc 🌿
                      </div>
                    )}
                  </S.PrescriptionBox>
                </S.FadeInContent>
              )}

              {/* PARENTS TAB */}
              {activeTab === 'parents' && (
                <S.FadeInContent>
                  {selectedStudent.parents && selectedStudent.parents.length > 0 ? (
                    selectedStudent.parents.map(parent => {
                      const pInit = parent.fullName.charAt(0).toUpperCase();
                      const parentGrad = parent.isPrimary ? 'linear-gradient(135deg, #00794A, #005A36)' : 'linear-gradient(135deg, #8B5CF6, #6D28D9)';
                      
                      return (
                        <S.ParentCard key={parent.parentId}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                            {parent.avatarUrl ? (
                              <img 
                                src={parent.avatarUrl} 
                                alt={parent.fullName} 
                                style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', flex: 'none' }} 
                              />
                            ) : (
                              <span style={{
                                flex: 'none',
                                width: '42px',
                                height: '42px',
                                borderRadius: '50%',
                                background: parentGrad,
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 700,
                                fontSize: '15px'
                              }} className="display">
                                {pInit}
                              </span>
                            )}
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexWrap: 'wrap' }}>
                                <span className="display" style={{ fontWeight: 700, fontSize: '14px', color: '#1F2937' }}>{parent.fullName}</span>
                                <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#2563EB', background: '#E3EDFD', padding: '2px 7px', borderRadius: '6px' }}>
                                  {parent.relationship}
                                </span>
                                {parent.isPrimary && (
                                  <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#005A36', background: '#E6F3ED', padding: '2px 7px', borderRadius: '6px' }}>
                                    ★ Liên hệ chính
                                  </span>
                                )}
                              </div>
                              <div style={{ fontSize: '12.5px', color: '#6B7280', marginTop: '2px', fontVariantNumeric: 'tabular-nums' }}>
                                {parent.phone}
                              </div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', marginTop: '13px', borderTop: '1px solid #EEF4F0', paddingTop: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '8px 6px' }}>
                              <span style={{ flex: 'none', width: '30px', height: '30px', borderRadius: '9px', background: '#E6F3ED', color: '#005A36', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✉️</span>
                              <span style={{ flex: 1, fontSize: '12px', color: '#9CA3AF', fontWeight: 500 }}>Email</span>
                              <span style={{ fontSize: '13px', fontWeight: 600, color: '#1F2937', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '190px' }}>
                                {parent.email}
                              </span>
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: '9px', marginTop: '13px' }}>
                            <S.PrimaryButton 
                              onClick={() => {
                                addToast(`📞 Đang kết nối cuộc gọi tới ${parent.relationship}…`);
                                window.location.href = `tel:${parent.phone}`;
                              }}
                              style={{ flex: 1 }}
                            >
                              Gọi điện
                            </S.PrimaryButton>
                            <S.SecondaryButton 
                              onClick={() => addToast(`💬 Nhắn ${parent.relationship} bé ${getLastName(selectedStudent.fullName)}`)}
                              style={{ flex: 1 }}
                            >
                              Nhắn tin
                            </S.SecondaryButton>
                          </div>
                        </S.ParentCard>
                      );
                    })
                  ) : (
                    <div style={{
                      padding: '14px',
                      borderRadius: '12px',
                      background: '#F6FAF7',
                      border: '1px dashed #C7DBCF',
                      fontSize: '12.5px',
                      color: '#6B7280',
                      textAlign: 'center'
                    }}>
                      Chưa có thông tin phụ huynh ⚠️
                    </div>
                  )}
                </S.FadeInContent>
              )}
            </S.DrawerBody>
          </S.Drawer>
        </>
      )}

      {/* TOAST LIST */}
      <S.ToastContainer>
        {toasts.map(t => (
          <S.ToastItem key={t.id}>
            {t.text}
          </S.ToastItem>
        ))}
      </S.ToastContainer>

      {permissionModalOpen && (
        <ConfirmDialog
          title="Không có quyền thực hiện"
          message="Tính năng thêm học sinh mới chỉ dành cho Hiệu trưởng hoặc Quản trị viên hệ thống. Vui lòng liên hệ Văn phòng nhà trường để được hỗ trợ."
          confirmText="Đồng ý"
          cancelText="Đóng"
          onConfirm={() => setPermissionModalOpen(false)}
          onCancel={() => setPermissionModalOpen(false)}
        />
      )}
    </S.Container>
  );
};
