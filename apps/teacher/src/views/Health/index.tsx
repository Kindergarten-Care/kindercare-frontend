'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Activity, AlertTriangle, Pill, Plus, Save, CheckCircle } from 'lucide-react';
import * as S from './styles';
import { useTeacherClasses } from '@/hooks/useTeacherQueries';
import { useDetailedStudents } from '@/hooks/useTeacherQueries';
import {
  useCreateHealthLog,
  useClassMedicalRequests,
} from '@/hooks/useHealthQueries';
import { healthService } from '@/services/health/HealthService';
import { StudentDetailedDomainModel } from '@/config/types/student';
import type { TeacherClassDomainModel } from '@/config/types/class';
import type { MedicationDomainModel } from '@/config/types/health';
import { calculateBMI, getBMICategory, BMI_CATEGORIES } from '@/config/types/health';
import { AllergiesPopup } from './components/AllergiesPopup';
import { MedicalRequestsPopup } from './components/MedicalRequestsPopup';
import type { BMICategory } from '@/config/types/health';

interface ToastItem {
  id: string;
  text: string;
  variant: 'success' | 'error' | 'warning' | 'info';
}

interface HealthRowState {
  studentId: number;
  height: string;
  weight: string;
  saved: boolean;
}

export const HealthView: React.FC = () => {
  // ── Class & Students ──────────────────────────────────────────────────────────
  const { data: classes } = useTeacherClasses();
  const [activeClassId, setActiveClassId] = useState<number | string | undefined>(undefined);

  useEffect(() => {
    if (classes && classes.length > 0 && activeClassId === undefined) {
      setActiveClassId(classes[0].classId);
    }
  }, [classes, activeClassId]);

  const { data: studentsData } = useDetailedStudents(activeClassId);
  const students = studentsData?.students ?? [];

  // ── Health Measurements ────────────────────────────────────────────────────────
  const [healthRows, setHealthRows] = useState<Map<number, HealthRowState>>(new Map());
  const [savedRows, setSavedRows] = useState<Set<number>>(new Set());

  // Init rows when students load
  useEffect(() => {
    if (students && students.length > 0) {
      const map = new Map<number, HealthRowState>();
      students.forEach((s: StudentDetailedDomainModel) => {
        map.set(s.studentId, {
          studentId: s.studentId,
          height: '',
          weight: '',
          saved: false,
        });
      });
      setHealthRows(map);
    }
  }, [students]);

  // ── Create Health Log ──────────────────────────────────────────────────────────
  const createHealthLog = useCreateHealthLog();

  const handleSaveRow = async (studentId: number) => {
    const row = healthRows.get(studentId);
    if (!row) return;

    const height = parseFloat(row.height);
    const weight = parseFloat(row.weight);

    if (!height || !weight || height < 50 || height > 200 || weight < 5 || weight > 150) {
      addToast('Chiều cao phải từ 50 - 200 cm, cân nặng phải từ 5 - 150 kg', 'warning');
      return;
    }

    try {
      const now = new Date();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const termPeriod = `${now.getFullYear()}-${month}`;
      const payload = {
        studentId,
        height,
        weight,
      };
      await healthService.createHealthLog(activeClassId!, studentId, payload, termPeriod);
      
      setHealthRows(prev => {
        const next = new Map(prev);
        const r = next.get(studentId);
        if (r) next.set(studentId, { ...r, saved: true });
        return next;
      });

      setSavedRows(prev => new Set([...prev, studentId]));
      setTimeout(() => {
        setSavedRows(prev => {
          const next = new Set(prev);
          next.delete(studentId);
          return next;
        });
      }, 3000);

      addToast('Lưu chỉ số thành công!', 'success');
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'Lỗi không xác định';
      addToast(`Lưu thất bại: ${msg}`, 'error');
    }
  };

  const handleSaveAll = async () => {
    const recordsToSave: Array<{ studentId: number; height: number; weight: number }> = [];

    healthRows.forEach((row, studentId) => {
      const isSaved = row.saved;
      if (!isSaved && row.height && row.weight) {
        const h = parseFloat(row.height);
        const w = parseFloat(row.weight);
        if (h >= 50 && h <= 200 && w >= 5 && w <= 150) {
          recordsToSave.push({ studentId, height: h, weight: w });
        }
      }
    });

    if (recordsToSave.length === 0) {
      addToast('Không có chỉ số mới hợp lệ để lưu. (Chiều cao: 50-200 cm, Cân nặng: 5-150 kg)', 'warning');
      return;
    }

    try {
      const now = new Date();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const termPeriod = `${now.getFullYear()}-${month}`;

      await healthService.batchUpdateHealthLogs(activeClassId!, recordsToSave, termPeriod);

      const sids = recordsToSave.map(r => r.studentId);
      setHealthRows(prev => {
        const next = new Map(prev);
        sids.forEach(sid => {
          const row = next.get(sid);
          if (row) {
            next.set(sid, { ...row, saved: true });
          }
        });
        return next;
      });

      setSavedRows(prev => new Set([...prev, ...sids]));
      setTimeout(() => {
        setSavedRows(prev => {
          const next = new Set(prev);
          sids.forEach(sid => next.delete(sid));
          return next;
        });
      }, 3000);

      addToast(`Đã lưu thành công chỉ số cho ${recordsToSave.length} học sinh!`, 'success');
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'Lỗi không xác định';
      addToast(`Lưu hàng loạt thất bại: ${msg}`, 'error');
    }
  };

  // ── BMI Calculation (for preview) ─────────────────────────────────────────────
  const getPreviewBMI = useCallback((studentId: number) => {
    const row = healthRows.get(studentId);
    if (!row) return null;
    const h = parseFloat(row.height);
    const w = parseFloat(row.weight);
    if (!h || !w) return null;
    return calculateBMI(h, w);
  }, [healthRows]);

  // ── Popup State ────────────────────────────────────────────────────────────────
  const [showAllergies, setShowAllergies] = useState(false);
  const [showMedications, setShowMedications] = useState(false);
  const [selectedStudentForAllergy, setSelectedStudentForAllergy] = useState<StudentDetailedDomainModel | null>(null);

  const handleViewAllergies = (student: StudentDetailedDomainModel) => {
    setSelectedStudentForAllergy(student);
    setShowAllergies(true);
  };

  // ── Medical Requests ───────────────────────────────────────────────────────────
  const { data: medicalRequests } = useClassMedicalRequests(activeClassId);
  const pendingRequests = medicalRequests?.filter((r: MedicationDomainModel) => r.status === 'Pending') || [];

  // ── Allergies count (from students with allergy flag) ─────────────────────────
  const studentsWithAllergies = students?.filter((s: StudentDetailedDomainModel) => !!s.allergies) || [];

  // ── Toast ─────────────────────────────────────────────────────────────────────
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (text: string, variant: ToastItem['variant'] = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, text, variant }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  // ─── Avatar helpers ────────────────────────────────────────────────────────────
  const avatarGradients = [
    '#F87171', '#FB923C', '#FBBF24', '#34D399', '#38BDF8', '#818CF8', '#E879F9', '#F472B6',
  ];

  const getAvatarGrad = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return avatarGradients[Math.abs(hash) % avatarGradients.length];
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const today = new Date();
  const dateStr = today.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

  return (
    <S.Container>
      {/* ── Header ─────────────────────────────────────────────────────────────── */}
      <S.TopBar>
        <div>
          <S.Title>Y tế & Sức khỏe</S.Title>
          <S.Subtitle>Cập nhật ngày {dateStr} · Lớp {classes?.find((c: TeacherClassDomainModel) => c.classId === activeClassId)?.className || '...'}</S.Subtitle>
        </div>

        <S.FilterRow>
          <select
            value={activeClassId || ''}
            onChange={e => setActiveClassId(Number(e.target.value))}
            style={{
              height: 42,
              padding: '0 36px 0 14px',
              borderRadius: 12,
              border: '1.5px solid #E6EEE9',
              background: '#fff url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%236B7280\' stroke-width=\'2.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 12px center',
              fontFamily: 'inherit',
              fontWeight: 700,
              fontSize: 14,
              color: '#1F2937',
              appearance: 'none',
              cursor: 'pointer',
              minWidth: 180,
            }}
          >
            {classes?.map((c: TeacherClassDomainModel) => (
              <option key={c.classId} value={c.classId}>{c.className}</option>
            ))}
          </select>
        </S.FilterRow>
      </S.TopBar>

      {/* ── Quick Stat Cards ───────────────────────────────────────────────────── */}
      <S.StatCardsRow>
        <S.StatCard
          $color="#DC2626"
          $bg="#FFF5F5"
          $border="#FECACA"
          onClick={() => { setShowAllergies(true); setSelectedStudentForAllergy(null); }}
        >
          <S.StatIcon $color="#DC2626" $bg="#FEE2E2">
            <AlertTriangle size={20} />
          </S.StatIcon>
          <S.StatInfo>
            <S.StatValue>{studentsWithAllergies.length}</S.StatValue>
            <S.StatLabel>Dị ứng trong lớp</S.StatLabel>
          </S.StatInfo>
        </S.StatCard>

        <S.StatCard
          $color="#2563EB"
          $bg="#EFF6FF"
          $border="#BFDBFE"
          onClick={() => setShowMedications(true)}
        >
          <S.StatIcon $color="#2563EB" $bg="#DBEAFE">
            <Pill size={20} />
          </S.StatIcon>
          <S.StatInfo>
            <S.StatValue>{pendingRequests.length}</S.StatValue>
            <S.StatLabel>Đơn dặn thuốc chờ</S.StatLabel>
          </S.StatInfo>
        </S.StatCard>

        <S.StatCard
          $color="#059669"
          $bg="#ECFDF5"
          $border="#A7F3D0"
          onClick={() => {
            const el = document.getElementById('bmi-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <S.StatIcon $color="#059669" $bg="#D1FAE5">
            <Activity size={20} />
          </S.StatIcon>
          <S.StatInfo>
            <S.StatValue>{students?.length || 0}</S.StatValue>
            <S.StatLabel>Học sinh cần đo</S.StatLabel>
          </S.StatInfo>
        </S.StatCard>
      </S.StatCardsRow>

      {/* ── BMI Input Section ─────────────────────────────────────────────────── */}
      <div id="bmi-section">
        <S.BentoTitle style={{ marginBottom: 12 }}>
          <Activity size={16} color="#059669" />
          Nhập chỉ số Chiều cao & Cân nặng
        </S.BentoTitle>

        <S.BentoGrid>
          {/* Form */}
          <S.BentoCard $colSpan={2}>
            <S.BentoTitle>
              <Plus size={14} color="#6B7280" />
              Thông tin đo lường
            </S.BentoTitle>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <S.FormGroup>
                <S.FormLabel>Chiều cao (cm)</S.FormLabel>
                <S.FormInput
                  type="number"
                  placeholder="VD: 110"
                  min={50}
                  max={200}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      // bulk update mode: apply same height to all non-saved rows
                      const h = e.target.value;
                    setHealthRows(prev => {
                      const next = new Map(prev);
                      prev.forEach((row, sid) => {
                        if (!row.saved) {
                          next.set(sid, { ...row, height: h });
                        }
                      });
                      return next;
                    });
                  }}
                />
              </S.FormGroup>
              <S.FormGroup>
                <S.FormLabel>Cân nặng (kg)</S.FormLabel>
                <S.FormInput
                  type="number"
                  placeholder="VD: 18"
                  min={5}
                  max={150}
                  step="0.1"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const w = e.target.value;
                    setHealthRows(prev => {
                      const next = new Map(prev);
                      prev.forEach((row, sid) => {
                        if (!row.saved) {
                          next.set(sid, { ...row, weight: w });
                        }
                      });
                      return next;
                    });
                  }}
                />
              </S.FormGroup>
            </div>
            <S.NoteText style={{ marginTop: 8 }}>
              Nhập nhanh: Giá trị nhập sẽ áp dụng cho tất cả học sinh chưa lưu.
            </S.NoteText>
          </S.BentoCard>

          {/* BMI Guide */}
          <S.BentoCard>
            <S.BentoTitle style={{ color: '#6B7280', fontSize: 12 }}>
              Tham chiếu BMI trẻ em (5–19 tuổi)
            </S.BentoTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {Object.entries(BMI_CATEGORIES).map(([key, cat]) => (
                <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: cat.color, flex: 'none',
                  }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#374151', flex: 1 }}>
                    {cat.label}
                  </span>
                  <span style={{ fontSize: 11, color: '#9CA3AF' }}>
                    {key === 'underweight' ? '< 18.5' : key === 'normal' ? '18.5 – 24.9' : key === 'overweight' ? '25 – 29.9' : '≥ 30'}
                  </span>
                </div>
              ))}
            </div>
          </S.BentoCard>
        </S.BentoGrid>
      </div>

      {/* ── Student Measurement Table ─────────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '14px', marginTop: '16px' }}>
        <button
          onClick={handleSaveAll}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 22px',
            background: '#059669',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            fontWeight: 800,
            fontSize: '13.5px',
            cursor: 'pointer',
            boxShadow: '0 8px 20px -8px rgba(5,150,105,0.4)',
            transition: 'all 0.2s',
          }}
          onMouseOver={e => e.currentTarget.style.background = '#047857'}
          onMouseOut={e => e.currentTarget.style.background = '#059669'}
        >
          <Save size={15} />
          Lưu tất cả chỉ số
        </button>
      </div>

      <S.StudentTable>
        <S.TableHeader>
          <div>Học sinh</div>
          <div>Chiều cao (cm)</div>
          <div>Cân nặng (kg)</div>
          <div>BMI</div>
          <div>Tình trạng</div>
          <div style={{ textAlign: 'right' }}>Hành động</div>
        </S.TableHeader>

        {!students || students.length === 0 ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: '#9CA3AF' }}>
            Chưa có học sinh trong lớp này
          </div>
        ) : (
          students.map((student: StudentDetailedDomainModel, idx: number) => {
            const row = healthRows.get(student.studentId);
            const height = row?.height || '';
            const weight = row?.weight || '';
            const bmi = getPreviewBMI(student.studentId);
            const isSaved = savedRows.has(student.studentId) || row?.saved;

            let bmiCategory: BMICategory | null = null;
            let bmiStyle = { color: '#9CA3AF', bg: '#F3F4F6', border: '#E5E7EB' };

            if (bmi !== null) {
              bmiCategory = getBMICategory(bmi);
              const cat = BMI_CATEGORIES[bmiCategory];
              bmiStyle = { color: cat.color, bg: cat.bgColor, border: cat.borderColor };
            }

            return (
              <S.TableRow key={student.studentId} $saved={isSaved} style={{ animationDelay: `${idx * 40}ms` }}>
                <S.StudentCell>
                  <S.AvatarSmall $grad={getAvatarGrad(student.fullName)}>
                    {student.avatarUrl ? (
                      <img src={student.avatarUrl} alt={student.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      getInitials(student.fullName)
                    )}
                  </S.AvatarSmall>
                  <div>
                    <S.StudentName>{student.fullName}</S.StudentName>
                    {student.allergies && (
                      <span style={{
                        fontSize: 10, fontWeight: 700, color: '#DC2626',
                        background: '#FEE2E2', padding: '1px 6px', borderRadius: 999,
                        border: '1px solid #FCA5A5',
                      }}>
                        Dị ứng
                      </span>
                    )}
                  </div>
                </S.StudentCell>

                <S.CellValue>
                  <input
                    type="number"
                    value={height}
                    placeholder="--"
                    min={50}
                    max={200}
                    disabled={isSaved}
                    onChange={e => {
                      setHealthRows(prev => {
                        const next = new Map(prev);
                        next.set(student.studentId, { ...prev.get(student.studentId)!, height: e.target.value });
                        return next;
                      });
                    }}
                    style={{
                      width: '100%', height: 36, padding: '0 10px', borderRadius: 8,
                      border: `1.5px solid ${isSaved ? '#E6EEE9' : '#34D399'}`,
                      background: isSaved ? '#F8FAF9' : '#fff',
                      fontFamily: 'inherit', fontSize: 14, fontWeight: 600,
                      color: '#1F2937', textAlign: 'center', outline: 'none',
                    }}
                  />
                </S.CellValue>

                <S.CellValue>
                  <input
                    type="number"
                    value={weight}
                    placeholder="--"
                    min={5}
                    max={150}
                    step="0.1"
                    disabled={isSaved}
                    onChange={e => {
                      setHealthRows(prev => {
                        const next = new Map(prev);
                        next.set(student.studentId, { ...prev.get(student.studentId)!, weight: e.target.value });
                        return next;
                      });
                    }}
                    style={{
                      width: '100%', height: 36, padding: '0 10px', borderRadius: 8,
                      border: `1.5px solid ${isSaved ? '#E6EEE9' : '#34D399'}`,
                      background: isSaved ? '#F8FAF9' : '#fff',
                      fontFamily: 'inherit', fontSize: 14, fontWeight: 600,
                      color: '#1F2937', textAlign: 'center', outline: 'none',
                    }}
                  />
                </S.CellValue>

                <S.CellValue>
                  {bmi !== null ? (
                    <S.BMIBadge $color={bmiStyle.color} $bg={bmiStyle.bg} $border={bmiStyle.border}>
                      {bmi.toFixed(1)}
                    </S.BMIBadge>
                  ) : (
                    <span style={{ color: '#C7CFCA', fontSize: 13, fontWeight: 600 }}>--</span>
                  )}
                </S.CellValue>

                <S.CellValue>
                  {bmiCategory ? (
                    <span style={{ fontSize: 11, fontWeight: 700, color: bmiStyle.color, background: bmiStyle.bg, padding: '2px 8px', borderRadius: 999, border: `1px solid ${bmiStyle.border}` }}>
                      {BMI_CATEGORIES[bmiCategory].label}
                    </span>
                  ) : (
                    <span style={{ color: '#C7CFCA', fontSize: 11, fontWeight: 500 }}>Chưa đo</span>
                  )}
                </S.CellValue>

                <div style={{ textAlign: 'right' }}>
                  {isSaved ? (
                    <S.SavedButton>
                      <CheckCircle size={13} />
                      Đã lưu
                    </S.SavedButton>
                  ) : (
                    <S.SaveButton
                      onClick={() => handleSaveRow(student.studentId)}
                      disabled={createHealthLog.isPending}
                    >
                      <Save size={13} />
                      Lưu
                    </S.SaveButton>
                  )}
                </div>
              </S.TableRow>
            );
          })
        )}
      </S.StudentTable>

      {/* ── Popups ─────────────────────────────────────────────────────────────── */}
      {showAllergies && (
        <AllergiesPopup
          onClose={() => setShowAllergies(false)}
          students={studentsWithAllergies}
        />
      )}

      {showMedications && (
        <MedicalRequestsPopup
          onClose={() => setShowMedications(false)}
          requests={pendingRequests}
          classId={activeClassId}
          addToast={addToast}
        />
      )}

      {/* ── Toast ─────────────────────────────────────────────────────────────── */}
      <S.ToastContainer>
        {toasts.map(t => (
          <S.Toast key={t.id} $variant={t.variant}>
            {t.variant === 'success' && <CheckCircle size={16} />}
            {t.text}
          </S.Toast>
        ))}
      </S.ToastContainer>
    </S.Container>
  );
};
