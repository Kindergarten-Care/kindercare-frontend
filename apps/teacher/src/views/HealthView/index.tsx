import React, { useState, useEffect, useRef } from 'react';
import * as S from './styles';
import { healthService } from '@/services/health/HealthService';
import { studentService } from '@/services/student/StudentService';
import { AttendanceService } from '@/services/attendance';
import type { StudentDetailedDomainModel } from '@/config/types/student';
import type {
  AllergyDomainModel,
  MedicationDomainModel,
} from '@/config/types/health';
import {
  AlertTriangle,
  Pill,
  Ruler,
  Search,
  CheckCircle,
  XCircle,
  Eye,
  TrendingUp,
} from 'lucide-react';

// ─── Color helpers ─────────────────────────────────────────────────────────────

const AVATAR_GRADS = [
  'linear-gradient(135deg, #00794A, #005A36)',
  'linear-gradient(135deg, #3B82F6, #2563EB)',
  'linear-gradient(135deg, #A78BFA, #8B5CF6)',
  'linear-gradient(135deg, #FB923C, #F97316)',
  'linear-gradient(135deg, #34D399, #059669)',
  'linear-gradient(135deg, #F472B6, #DB2777)',
];

function getAvatarGrad(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_GRADS[h % AVATAR_GRADS.length];
}

// ─── BMI helpers ──────────────────────────────────────────────────────────────

function calcBmi(heightCm: number, weightKg: number): number {
  if (!heightCm || heightCm <= 0) return 0;
  const h = heightCm / 100;
  return Math.round((weightKg / (h * h)) * 10) / 10;
}

function bmiStatus(bmi: number, ageYears: number): string {
  if (ageYears >= 5) {
    if (bmi < 18.5) return 'Nhẹ cân';
    if (bmi < 25) return 'Bình thường';
    if (bmi < 30) return 'Thừa cân';
    return 'Béo phì';
  }
  if (bmi < 15) return 'Suy dinh dưỡng';
  if (bmi < 18) return 'Nhẹ cân';
  if (bmi < 22) return 'Bình thường';
  if (bmi < 25) return 'Thừa cân';
  return 'Béo phì';
}

// ─── Age from timestamp ───────────────────────────────────────────────────────

function ageYearsFromTs(ts: number | null): number {
  if (!ts) return 4;
  const birth = new Date(ts * 1000);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
  return Math.max(1, age);
}

// ─── Tab types ────────────────────────────────────────────────────────────────

type Tab = 'allergies' | 'medications' | 'bmi';

// ─── Main Component ────────────────────────────────────────────────────────────

export const HealthView: React.FC = () => {
  const [tab, setTab] = useState<Tab>('bmi');
  const [classId, setClassId] = useState<string>('');
  const [className, setClassName] = useState<string>('');

  // Data
  const [allergies, setAllergies] = useState<AllergyDomainModel[]>([]);
  const [medications, setMedications] = useState<MedicationDomainModel[]>([]);
  const [students, setStudents] = useState<StudentDetailedDomainModel[]>([]);

  // Loading
  const [loadingAllergies, setLoadingAllergies] = useState(false);
  const [loadingMeds, setLoadingMeds] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);

  // Search
  const [allergySearch, setAllergySearch] = useState('');
  const [medSearch, setMedSearch] = useState('');
  const [studentSearch, setStudentSearch] = useState('');

  // Toast
  const [toasts, setToasts] = useState<{ id: string; text: string; type?: 'success' | 'error' | 'info' }[]>([]);
  const toastRef = useRef(0);

  // Popup
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState<'allergies' | 'medications' | 'bmi'>('allergies');
  const [popupStudentId, setPopupStudentId] = useState<number | null>(null);
  const [popupStudentName, setPopupStudentName] = useState('');

  // Student Allergy popup detail
  const [studentAllergyList, setStudentAllergyList] = useState<AllergyDomainModel[]>([]);
  const [loadingStudentAllergies, setLoadingStudentAllergies] = useState(false);

  // Lightbox for med image
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // ── BMI form state ──────────────────────────────────────────────────────────
  const [bmiStudentId, setBmiStudentId] = useState<string>('');
  const [bmiHeight, setBmiHeight] = useState('');
  const [bmiWeight, setBmiWeight] = useState('');
  const [bmiNotes, setBmiNotes] = useState('');
  const [savingBmi, setSavingBmi] = useState(false);
  const [savedStudentIds, setSavedStudentIds] = useState<Set<string>>(new Set());

  const computedBmi = calcBmi(parseFloat(bmiHeight), parseFloat(bmiWeight));
  const selectedStudent = safeStudents.find(s => String(s.studentId) === bmiStudentId);
  const selectedStudentAge = ageYearsFromTs(selectedStudent?.dateOfBirth ?? null);
  const bmiStatusLabel = computedBmi > 0 ? bmiStatus(computedBmi, selectedStudentAge) : '—';

  // ── Fetch class ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const init = async () => {
      try {
        const classes = await AttendanceService.getTeacherClasses();
        if (classes.length > 0) {
          setClassId(String(classes[0].classId));
          setClassName(classes[0].className);
        }
      } catch (e) {
        console.error('Failed to get classes', e);
      }
    };
    init();
  }, []);

  // ── Fetch data when tab/class changes ──────────────────────────────────────
  useEffect(() => {
    if (!classId) return;

    if (tab === 'allergies' && allergySearch === '') {
      // allergies loaded per-student via popup
      setAllergies([]);
    }

    if (tab === 'medications') {
      setLoadingMeds(true);
      healthService.getMedicalRequests(classId).then(data => {
        setMedications(Array.isArray(data) ? data : []);
      }).catch(() => {
        setMedications([]);
        addToast('Lỗi tải đơn thuốc', 'error');
      }).finally(() => setLoadingMeds(false));
    }

    if (tab === 'bmi') {
      setLoadingStudents(true);
      studentService.getDetailedStudents(classId).then(data => {
        setStudents(Array.isArray(data) ? data : []);
      }).catch(() => {
        setStudents([]);
        addToast('Lỗi tải danh sách học sinh', 'error');
      }).finally(() => setLoadingStudents(false));
    }
  }, [classId, tab]);

  // ── Toast ──────────────────────────────────────────────────────────────────
  const addToast = (text: string, type?: 'success' | 'error' | 'info') => {
    const id = 't' + toastRef.current++;
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  // ── Open popup ──────────────────────────────────────────────────────────────
  const openPopup = async (type: 'allergies' | 'medications' | 'bmi', studentId: number, studentName: string) => {
    setPopupType(type);
    setPopupStudentId(studentId);
    setPopupStudentName(studentName);
    setPopupOpen(true);

    if (type === 'allergies') {
      setLoadingStudentAllergies(true);
      try {
        const list = await healthService.getAllergies(classId, studentId);
        setStudentAllergyList(list);
      } catch {
        addToast('Lỗi tải danh sách dị ứng', 'error');
      } finally {
        setLoadingStudentAllergies(false);
      }
    }
  };

  // ── Close popup ─────────────────────────────────────────────────────────────
  const closePopup = () => {
    setPopupOpen(false);
    setPopupStudentId(null);
    setPopupStudentName('');
    setStudentAllergyList([]);
    setLightboxImg(null);
  };

  // ── Handle med status update ───────────────────────────────────────────────
  const handleMedStatus = async (medId: number, newStatus: 'Completed' | 'Rejected', note?: string) => {
    try {
      await healthService.updateMedicationStatus(medId, newStatus, note);
      setMedications(prev => prev.map(m => m.medRequestId === medId ? { ...m, status: newStatus, teacherNote: note } : m));
      addToast(newStatus === 'Completed' ? 'Đã xác nhận đơn thuốc' : 'Đã từ chối đơn thuốc', 'success');
    } catch {
      addToast('Lỗi cập nhật trạng thái', 'error');
    }
  };

  // ── Submit BMI ──────────────────────────────────────────────────────────────
  const handleBmiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bmiStudentId || !bmiHeight || !bmiWeight) {
      addToast('Vui lòng chọn học sinh và nhập đầy đủ chiều cao, cân nặng', 'error');
      return;
    }
    const h = parseFloat(bmiHeight);
    const w = parseFloat(bmiWeight);
    if (h <= 0 || w <= 0) {
      addToast('Chiều cao và cân nặng phải lớn hơn 0', 'error');
      return;
    }
    if (h > 200 || w > 200) {
      addToast('Vui lòng kiểm tra lại dữ liệu', 'error');
      return;
    }
    setSavingBmi(true);
    try {
      await healthService.createHealthLog(classId, bmiStudentId, {
        studentId: parseInt(bmiStudentId),
        height: h,
        weight: w,
        notes: bmiNotes,
      });
      addToast(`Đã lưu chỉ số cho ${selectedStudent?.fullName}`, 'success');
      setSavedStudentIds(prev => new Set([...prev, bmiStudentId]));
      // Reset form
      setBmiStudentId('');
      setBmiHeight('');
      setBmiWeight('');
      setBmiNotes('');
    } catch {
      addToast('Lỗi lưu chỉ số', 'error');
    } finally {
      setSavingBmi(false);
    }
  };

  // ── Normalized arrays (defensive) ───────────────────────────────────────────────
  const safeStudents: StudentDetailedDomainModel[] = Array.isArray(students) ? students : [];
  const safeMedications: MedicationDomainModel[] = Array.isArray(medications) ? medications : [];

  // ── Filtered lists ──────────────────────────────────────────────────────────
  const filteredMeds = safeMedications.filter(m =>
    !medSearch || m.studentName.toLowerCase().includes(medSearch.toLowerCase()) ||
    m.medicineDetails.toLowerCase().includes(medSearch.toLowerCase())
  );

  const filteredStudents = safeStudents.filter(s =>
    !studentSearch || s.fullName?.toLowerCase().includes(studentSearch.toLowerCase())
  );

  // ── Allergy stats (count students with allergies) ───────────────────────────
  const allergyStudentCount = safeStudents.filter(s => s.allergies && s.allergies.trim() !== '' && s.allergies !== 'null').length;

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <S.PageContainer>

      {/* HERO */}
      <S.HeroSection>
        <S.HeroLeft>
          <S.HeroTitle>Y tế & Sức khỏe</S.HeroTitle>
          <S.HeroSubtitle>Lớp {className || '...'} · Quản lý sức khỏe học sinh</S.HeroSubtitle>
        </S.HeroLeft>
      </S.HeroSection>

      {/* BENTO CARDS */}
      <S.BentoGrid>
        <S.BentoCard
          $color="#DC2626"
          $bg="#FEF2F2"
          onClick={() => setTab('allergies')}
          style={{ borderColor: tab === 'allergies' ? '#DC262640' : undefined }}
        >
          <S.BentoIcon $color="#DC2626" $bg="#FEE2E2">
            <AlertTriangle size={24} strokeWidth={2} />
          </S.BentoIcon>
          <S.BentoMeta>
            <S.BentoValue>{allergyStudentCount}</S.BentoValue>
            <S.BentoLabel>Học sinh dị ứng</S.BentoLabel>
          </S.BentoMeta>
          <S.BentoBadge $color="#DC2626" $bg="#FEE2E2">CẦN CHÚ Ý</S.BentoBadge>
        </S.BentoCard>

        <S.BentoCard
          $color="#D97706"
          $bg="#FFFBEB"
          onClick={() => setTab('medications')}
          style={{ borderColor: tab === 'medications' ? '#D9770640' : undefined }}
        >
          <S.BentoIcon $color="#D97706" $bg="#FEF3C7">
            <Pill size={24} strokeWidth={2} />
          </S.BentoIcon>
          <S.BentoMeta>
            <S.BentoValue>{safeMedications.filter(m => m.status === 'Pending').length}</S.BentoValue>
            <S.BentoLabel>Đơn thuốc chờ duyệt</S.BentoLabel>
          </S.BentoMeta>
          {safeMedications.filter(m => m.status === 'Pending').length > 0 && (
            <S.BentoBadge $color="#D97706" $bg="#FEF3C7">CHỜ XỬ LÝ</S.BentoBadge>
          )}
        </S.BentoCard>

        <S.BentoCard
          $color="#059669"
          $bg="#ECFDF5"
          onClick={() => setTab('bmi')}
          style={{ borderColor: tab === 'bmi' ? '#05966940' : undefined }}
        >
          <S.BentoIcon $color="#059669" $bg="#D1FAE5">
            <Ruler size={24} strokeWidth={2} />
          </S.BentoIcon>
          <S.BentoMeta>
            <S.BentoValue>{safeStudents.length}</S.BentoValue>
            <S.BentoLabel>Học sinh đo BMI</S.BentoLabel>
          </S.BentoMeta>
        </S.BentoCard>
      </S.BentoGrid>

      {/* TABS */}
      <S.TabBar>
        <S.TabBtn $active={tab === 'bmi'} onClick={() => setTab('bmi')}>
          <Ruler size={16} strokeWidth={2} /> Nhập BMI
        </S.TabBtn>
        <S.TabBtn $active={tab === 'medications'} onClick={() => setTab('medications')}>
          <Pill size={16} strokeWidth={2} /> Đơn thuốc
        </S.TabBtn>
        <S.TabBtn $active={tab === 'allergies'} onClick={() => setTab('allergies')}>
          <AlertTriangle size={16} strokeWidth={2} /> Dị ứng
        </S.TabBtn>
      </S.TabBar>

      {/* ─── BMI TAB ─────────────────────────────────────────────────────────── */}
      {tab === 'bmi' && (
        <>
          <S.BmiGrid>

            {/* Left: Form */}
            <S.BmiInputCard>
              <S.BmiInputTitle>Nhập chỉ số cân nặng & chiều cao</S.BmiInputTitle>
              <S.BmiForm onSubmit={handleBmiSubmit}>

                <S.FormGroup>
                  <S.FormLabel>Chọn học sinh</S.FormLabel>
                  <S.FormSelect
                    value={bmiStudentId}
                    onChange={e => {
                      setBmiStudentId(e.target.value);
                      // prefill from existing health record
                      const st = safeStudents.find(s => String(s.studentId) === e.target.value);
                      if (st?.healthRecord?.height) setBmiHeight(String(st.healthRecord.height));
                      if (st?.healthRecord?.weight) setBmiWeight(String(st.healthRecord.weight));
                    }}
                  >
                    <option value="">-- Chọn học sinh --</option>
                    {safeStudents.map(s => (
                      <option key={s.studentId} value={s.studentId}>
                        {s.fullName} {s.healthRecord?.bmi ? `· BMI: ${s.healthRecord.bmi}` : ''}
                      </option>
                    ))}
                  </S.FormSelect>
                </S.FormGroup>

                <S.BmiFormRow>
                  <S.FormGroup>
                    <S.FormLabel>Chiều cao (cm)</S.FormLabel>
                    <S.FormInput
                      type="number"
                      step="0.1"
                      min="50"
                      max="200"
                      placeholder="VD: 110.5"
                      value={bmiHeight}
                      onChange={e => setBmiHeight(e.target.value)}
                    />
                  </S.FormGroup>
                  <S.FormGroup>
                    <S.FormLabel>Cân nặng (kg)</S.FormLabel>
                    <S.FormInput
                      type="number"
                      step="0.1"
                      min="5"
                      max="200"
                      placeholder="VD: 18.5"
                      value={bmiWeight}
                      onChange={e => setBmiWeight(e.target.value)}
                    />
                  </S.FormGroup>
                </S.BmiFormRow>

                <S.FormGroup>
                  <S.FormLabel>Ghi chú (tùy chọn)</S.FormLabel>
                  <S.FormTextarea
                    placeholder="VD: Bé ăn uống tốt, tăng cân đều..."
                    value={bmiNotes}
                    onChange={e => setBmiNotes(e.target.value)}
                  />
                </S.FormGroup>

                <S.SubmitBtn type="submit" disabled={savingBmi || !bmiStudentId}>
                  <CheckCircle size={18} strokeWidth={2.2} />
                  {savingBmi ? 'Đang lưu...' : 'Lưu chỉ số'}
                </S.SubmitBtn>

              </S.BmiForm>
            </S.BmiInputCard>

            {/* Right: BMI Preview */}
            <S.BmiPreviewCard>
              <S.BmiPreviewLabel>Chỉ số BMI</S.BmiPreviewLabel>
              <S.BmiPreviewValue $status={bmiStatusLabel}>
                {computedBmi > 0 ? computedBmi : '—'}
              </S.BmiPreviewValue>
              <S.BmiPreviewUnit>kg/m²</S.BmiPreviewUnit>
              <S.BmiPreviewStatus $status={bmiStatusLabel}>
                {bmiStatusLabel}
              </S.BmiPreviewStatus>

              <S.BmiLegendGrid>
                {[
                  { label: 'Suy dinh dưỡng', range: '< 15', color: '#D97706', bg: '#FEF3C7' },
                  { label: 'Nhẹ cân', range: '15 – 18', color: '#F59E0B', bg: '#FEF3C7' },
                  { label: 'Bình thường', range: '18 – 22', color: '#059669', bg: '#D1FAE5' },
                  { label: 'Thừa cân', range: '> 22', color: '#DC2626', bg: '#FEE2E2' },
                ].map(item => (
                  <S.BmiLegendItem key={item.label} $active={bmiStatusLabel.includes(item.label.split(' ')[0])} $color={item.color} $bg={item.bg}>
                    <S.BmiLegendDot $color={item.color} />
                    <div>
                      <S.BmiLegendText>{item.label}</S.BmiLegendText>
                      <S.BmiLegendRange>{item.range}</S.BmiLegendRange>
                    </div>
                  </S.BmiLegendItem>
                ))}
              </S.BmiLegendGrid>
            </S.BmiPreviewCard>

          </S.BmiGrid>

          {/* Student list below */}
          <S.ListSection>
            <S.ListHeader>
              <S.ListTitle>Danh sách học sinh ({filteredStudents.length})</S.ListTitle>
              <div style={{ flex: 1 }} />
              <S.SearchBox>
                <Search size={15} color="#9CA3AF" />
                <input
                  value={studentSearch}
                  onChange={e => setStudentSearch(e.target.value)}
                  placeholder="Tìm học sinh..."
                />
              </S.SearchBox>
            </S.ListHeader>

            {loadingStudents ? (
              <S.EmptyState>Đang tải...</S.EmptyState>
            ) : filteredStudents.length === 0 ? (
              <S.EmptyState>Không tìm thấy học sinh nào.</S.EmptyState>
            ) : (
              filteredStudents.map(s => (
                <S.StudentRow key={s.studentId}>
                  <S.StudentAvatar $grad={getAvatarGrad(s.fullName)}>
                    {s.avatarUrl ? (
                      <S.AvatarImg src={s.avatarUrl} alt={s.fullName} />
                    ) : s.fullName.charAt(0).toUpperCase()}
                    {savedStudentIds.has(String(s.studentId)) && (
                      <div style={{
                        position: 'absolute', bottom: -2, right: -2,
                        width: 18, height: 18, borderRadius: '50%',
                        background: '#059669', color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: '2px solid #fff', fontSize: 9, fontWeight: 800,
                      }}>
                        ✓
                      </div>
                    )}
                  </S.StudentAvatar>
                  <S.StudentInfo>
                    <S.StudentName>{s.fullName}</S.StudentName>
                    <S.StudentMeta>
                      {s.healthRecord?.height ? `${s.healthRecord.height} cm · ` : ''}
                      {s.healthRecord?.weight ? `${s.healthRecord.weight} kg · ` : ''}
                      {s.healthRecord?.bmi ? `BMI: ${s.healthRecord.bmi}` : 'Chưa có dữ liệu'}
                    </S.StudentMeta>
                  </S.StudentInfo>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {s.allergies && s.allergies.trim() !== '' && s.allergies !== 'null' && (
                      <S.AllergenPill title={s.allergies}>⚠ Dị ứng</S.AllergenPill>
                    )}
                    <button
                      onClick={() => openPopup('bmi', s.studentId, s.fullName)}
                      style={{
                        height: 34, padding: '0 12px', borderRadius: 10,
                        border: '1.5px solid #E6EEE9', background: '#fff',
                        fontFamily: 'inherit', fontWeight: 700, fontSize: 12,
                        color: '#00794A', cursor: 'pointer', display: 'flex',
                        alignItems: 'center', gap: 5,
                      }}
                    >
                      <TrendingUp size={14} /> Chi tiết
                    </button>
                  </div>
                </S.StudentRow>
              ))
            )}
          </S.ListSection>
        </>
      )}

      {/* ─── MEDICATIONS TAB ────────────────────────────────────────────────── */}
      {tab === 'medications' && (
        <S.ListSection>
          <S.ListHeader>
            <S.ListTitle>
              Đơn thuốc & dặn thuốc ({filteredMeds.length})
            </S.ListTitle>
            <div style={{ flex: 1 }} />
            <S.SearchBox>
              <Search size={15} color="#9CA3AF" />
              <input
                value={medSearch}
                onChange={e => setMedSearch(e.target.value)}
                placeholder="Tìm học sinh, thuốc..."
              />
            </S.SearchBox>
          </S.ListHeader>

          {loadingMeds ? (
            <S.EmptyState>Đang tải...</S.EmptyState>
          ) : filteredMeds.length === 0 ? (
            <S.EmptyState>Không có đơn thuốc nào.</S.EmptyState>
          ) : (
            filteredMeds.map(m => (
              <S.StudentRow key={m.medRequestId} style={{ flexDirection: 'column', alignItems: 'stretch', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <S.StudentAvatar $grad={getAvatarGrad(m.studentName)}>
                    {m.studentAvatar ? (
                      <S.AvatarImg src={m.studentAvatar} alt={m.studentName} />
                    ) : m.studentName.charAt(0).toUpperCase()}
                  </S.StudentAvatar>
                  <S.StudentInfo style={{ flex: 1 }}>
                    <S.StudentName>{m.studentName}</S.StudentName>
                    <S.StudentMeta>
                      {m.parentName} · {m.requestDate ? new Date(m.requestDate).toLocaleDateString('vi-VN') : ''}
                    </S.StudentMeta>
                  </S.StudentInfo>
                  <S.StatusBadge $status={m.status}>{m.status}</S.StatusBadge>
                </div>

                {/* Medicine details */}
                <div style={{ background: '#F8FBF9', borderRadius: 12, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 4 }}>{m.medicineDetails}</div>
                      <div style={{ fontSize: 12.5, color: '#6B7280' }}>
                        Liều lượng: <strong>{m.dosage}</strong>
                        {m.frequency ? ` · Cách dùng: ${m.frequency}` : ''}
                        {m.timeToTake ? ` · Giờ uống: ${m.timeToTake}` : ''}
                      </div>
                      {m.parentNote && (
                        <div style={{ fontSize: 12.5, color: '#6B7280', marginTop: 4 }}>
                          📝 Ghi chú: {m.parentNote}
                        </div>
                      )}
                    </div>
                    {m.medicineImageUrl && (
                      <S.MedImageThumb
                        src={m.medicineImageUrl}
                        alt="thuốc"
                        onClick={() => setLightboxImg(m.medicineImageUrl!)}
                      />
                    )}
                  </div>
                </div>

                {/* Actions */}
                {m.status === 'Pending' && (
                  <S.ActionRow>
                    <S.ApproveBtn onClick={() => handleMedStatus(m.medRequestId, 'Completed')}>
                      <CheckCircle size={15} strokeWidth={2.2} /> Đã cho uống
                    </S.ApproveBtn>
                    <S.RejectBtn onClick={() => handleMedStatus(m.medRequestId, 'Rejected')}>
                      <XCircle size={15} strokeWidth={2.2} /> Từ chối
                    </S.RejectBtn>
                  </S.ActionRow>
                )}
              </S.StudentRow>
            ))
          )}
        </S.ListSection>
      )}

      {/* ─── ALLERGIES TAB ───────────────────────────────────────────────────── */}
      {tab === 'allergies' && (
        <S.ListSection>
          <S.ListHeader>
            <S.ListTitle>Học sinh có thông tin dị ứng ({allergyStudentCount})</S.ListTitle>
          </S.ListHeader>

          {allergyStudentCount === 0 ? (
            <S.EmptyState>Không có học sinh nào có thông tin dị ứng được ghi nhận.</S.EmptyState>
          ) : (
            safeStudents.filter(s => s.allergies && s.allergies.trim() !== '' && s.allergies !== 'null').map(s => (
              <S.StudentRow key={s.studentId}>
                <S.StudentAvatar $grad={getAvatarGrad(s.fullName)}>
                  {s.avatarUrl ? (
                    <S.AvatarImg src={s.avatarUrl} alt={s.fullName} />
                  ) : s.fullName.charAt(0).toUpperCase()}
                </S.StudentAvatar>
                <S.StudentInfo style={{ flex: 1 }}>
                  <S.StudentName>{s.fullName}</S.StudentName>
                  <S.StudentMeta>
                    {s.allergies?.split(',').map(a => a.trim()).join(', ')}
                  </S.StudentMeta>
                </S.StudentInfo>
                <div style={{ display: 'flex', gap: 8 }}>
                  {s.allergies?.split(',').map(a => (
                    <S.AllergenPill key={a}>{a.trim()}</S.AllergenPill>
                  ))}
                </div>
                <button
                  onClick={() => openPopup('allergies', s.studentId, s.fullName)}
                  style={{
                    height: 34, padding: '0 12px', borderRadius: 10,
                    border: '1.5px solid #FCA5A5', background: '#FEF2F2',
                    fontFamily: 'inherit', fontWeight: 700, fontSize: 12,
                    color: '#DC2626', cursor: 'pointer', display: 'flex',
                    alignItems: 'center', gap: 5,
                  }}
                >
                  <Eye size={14} /> Chi tiết
                </button>
              </S.StudentRow>
            ))
          )}
        </S.ListSection>
      )}

      {/* ─── POPUP ──────────────────────────────────────────────────────────── */}
      {popupOpen && (
        <>
          <S.ModalOverlay onClick={closePopup} />
          <S.ModalContainer onClick={e => e.stopPropagation()}>
            <S.ModalHeader $color="#00794A">
              <S.ModalHeaderIcon $color="#00794A" $bg="#D1FAE5">
                <AlertTriangle size={22} strokeWidth={2} />
              </S.ModalHeaderIcon>
              <S.ModalHeaderMeta>
                <S.ModalTitle>Chi tiết sức khỏe</S.ModalTitle>
                <S.ModalSubtitle>{popupStudentName}</S.ModalSubtitle>
              </S.ModalHeaderMeta>
              <S.ModalCloseBtn onClick={closePopup}>✕</S.ModalCloseBtn>
            </S.ModalHeader>

            <S.ModalBody>

              {/* Allergy list */}
              <S.ModalSection>
                <S.ModalSectionTitle>Danh sách dị ứng</S.ModalSectionTitle>
                {loadingStudentAllergies ? (
                  <div style={{ color: '#9CA3AF', fontSize: 13 }}>Đang tải...</div>
                ) : studentAllergyList.length === 0 ? (
                  <div style={{ color: '#9CA3AF', fontSize: 13 }}>Không có thông tin dị ứng.</div>
                ) : (
                  studentAllergyList.map(a => (
                    <div key={a.allergyId} style={{ marginBottom: 10, padding: '10px 12px', background: '#fff', borderRadius: 10, border: '1px solid #FCA5A5' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#DC2626' }}>{a.allergen}</span>
                        <S.SeverityBadge $severity={a.severity}>{a.severity}</S.SeverityBadge>
                      </div>
                      {a.symptoms && <div style={{ fontSize: 12.5, color: '#6B7280', marginTop: 4 }}>Triệu chứng: {a.symptoms}</div>}
                      {a.notes && <div style={{ fontSize: 12.5, color: '#6B7280', marginTop: 2 }}>Ghi chú: {a.notes}</div>}
                    </div>
                  ))
                )}
              </S.ModalSection>

              {/* Student health record */}
              {selectedStudent && (
                <S.ModalSection>
                  <S.ModalSectionTitle>Chỉ số sức khỏe gần nhất</S.ModalSectionTitle>
                  {selectedStudent.healthRecord?.bmi ? (
                    <>
                      <S.ModalField>
                        <S.ModalFieldLabel>Chiều cao</S.ModalFieldLabel>
                        <S.ModalFieldValue>{selectedStudent.healthRecord.height} cm</S.ModalFieldValue>
                      </S.ModalField>
                      <S.ModalField>
                        <S.ModalFieldLabel>Cân nặng</S.ModalFieldLabel>
                        <S.ModalFieldValue>{selectedStudent.healthRecord.weight} kg</S.ModalFieldValue>
                      </S.ModalField>
                      <S.ModalField>
                        <S.ModalFieldLabel>BMI</S.ModalFieldLabel>
                        <S.ModalFieldValue style={{ color: '#00794A', fontWeight: 800 }}>
                          {selectedStudent.healthRecord.bmi}
                        </S.ModalFieldValue>
                      </S.ModalField>
                      {selectedStudent.healthRecord.lastMeasuredAt && (
                        <S.ModalField>
                          <S.ModalFieldLabel>Ngày đo</S.ModalFieldLabel>
                          <S.ModalFieldValue>
                            {new Date(selectedStudent.healthRecord.lastMeasuredAt).toLocaleDateString('vi-VN')}
                          </S.ModalFieldValue>
                        </S.ModalField>
                      )}
                    </>
                  ) : (
                    <div style={{ color: '#9CA3AF', fontSize: 13 }}>Chưa có dữ liệu BMI.</div>
                  )}
                </S.ModalSection>
              )}

            </S.ModalBody>
          </S.ModalContainer>
        </>
      )}

      {/* ─── LIGHTBOX ────────────────────────────────────────────────────────── */}
      {lightboxImg && (
        <>
          <S.ModalOverlay onClick={() => setLightboxImg(null)} />
          <S.ModalContainer onClick={e => e.stopPropagation()} style={{ maxWidth: 480 }}>
            <S.ModalHeader $color="#D97706" style={{ justifyContent: 'flex-end' }}>
              <S.ModalCloseBtn onClick={() => setLightboxImg(null)}>✕</S.ModalCloseBtn>
            </S.ModalHeader>
            <div style={{ padding: 16 }}>
              <img src={lightboxImg} alt="thuốc" style={{ width: '100%', borderRadius: 12 }} />
            </div>
          </S.ModalContainer>
        </>
      )}

      {/* ─── TOASTS ──────────────────────────────────────────────────────────── */}
      <S.ToastContainer>
        {toasts.map(t => (
          <S.ToastMsg key={t.id} $type={t.type}>{t.text}</S.ToastMsg>
        ))}
      </S.ToastContainer>

    </S.PageContainer>
  );
};
