'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTeacherClasses } from '@/hooks/useTeacherQueries';
import { useDetailedStudents } from '@/hooks/useTeacherQueries';
import { AllergyCard } from './components/AllergyCard';
import { MedicationCard } from './components/MedicationCard';
import { HealthLogTable } from './components/HealthLogTable';
import { EditModeToggle } from './components/EditModeToggle';
import { EmptyState } from './components/EmptyState';
import { useStudentHealth } from './hooks/useStudentHealth';
import * as S from './styles';
import type {
  AllergyDomainModel,
  AllergySeverity,
  CreateAllergyPayload,
  CreateHealthLogPayload,
  CreateMedicationPayload,
  MedicationStatus,
} from '@/config/types/studentHealth';

export const StudentHealthView: React.FC = () => {
  const { user } = useAuth();
  const { data: classes, isLoading: isLoadingClasses } = useTeacherClasses();
  const [activeClassId, setActiveClassId] = React.useState<number | string | undefined>(undefined);
  const [selectedStudentId, setSelectedStudentId] = React.useState<number | string | undefined>(
    undefined
  );

  React.useEffect(() => {
    if (classes && classes.length > 0 && activeClassId === undefined) {
      setActiveClassId(classes[0].classId);
    }
  }, [classes, activeClassId]);

  const { data: students, isLoading: isLoadingStudents } = useDetailedStudents(activeClassId);

  React.useEffect(() => {
    if (students && students.length > 0 && selectedStudentId === undefined) {
      setSelectedStudentId(students[0].studentId);
    }
  }, [students, selectedStudentId]);

  const [editLocked, setEditLocked] = React.useState(true);
  const [medicationTab, setMedicationTab] = React.useState<MedicationStatus | 'All'>('Pending');
  const [editingAllergy, setEditingAllergy] = React.useState<AllergyDomainModel | null>(null);

  const health = useStudentHealth({ classId: activeClassId, studentId: selectedStudentId });

  const extractErrorMessage = (err: unknown, fallback: string): string => {
    if (!err) return fallback;
    const anyErr = err as {
      response?: { data?: { message?: string } };
      message?: string;
    };
    const apiMessage = anyErr?.response?.data?.message;
    if (apiMessage) return Array.isArray(apiMessage) ? apiMessage.join('; ') : apiMessage;
    return anyErr?.message || fallback;
  };

  // ----------------------------------------------------------- Allergy handlers

  const handleAddAllergy = async (payload: CreateAllergyPayload) => {
    try {
      await health.addAllergy(payload);
      health.showToast('Đã thêm dị ứng', 'success');
    } catch (err) {
      health.showToast(extractErrorMessage(err, 'Không thể thêm dị ứng'), 'error');
      throw err;
    }
  };

  const handleUpdateAllergy = async (
    allergyId: number,
    payload: { allergen?: string; severity?: AllergySeverity; reaction?: string | null; notes?: string | null }
  ) => {
    try {
      await health.updateAllergy({ allergyId, payload });
      setEditingAllergy(null);
      health.showToast('Đã cập nhật dị ứng', 'success');
    } catch (err) {
      health.showToast(extractErrorMessage(err, 'Không thể cập nhật dị ứng'), 'error');
    }
  };

  const handleDeleteAllergy = async (allergyId: number) => {
    if (typeof window !== 'undefined' && !window.confirm('Xóa dị ứng này?')) return;
    try {
      await health.deleteAllergy(allergyId);
      health.showToast('Đã xóa dị ứng', 'success');
    } catch (err) {
      health.showToast(extractErrorMessage(err, 'Không thể xóa dị ứng'), 'error');
    }
  };

  // ----------------------------------------------------- Medication handlers

  const handleAddMedication = async (payload: CreateMedicationPayload) => {
    try {
      await health.addMedication(payload);
      health.showToast('Đã thêm thuốc', 'success');
    } catch (err) {
      health.showToast(extractErrorMessage(err, 'Không thể thêm thuốc'), 'error');
      throw err;
    }
  };

  const handleUpdateMedicationStatus = async (
    medicationId: number,
    payload: { status: MedicationStatus; notes?: string | null }
  ) => {
    try {
      await health.updateMedicationStatus({ medicationId, payload });
      health.showToast(`Đã cập nhật thuốc (${payload.status})`, 'success');
    } catch (err) {
      health.showToast(extractErrorMessage(err, 'Không thể cập nhật thuốc'), 'error');
    }
  };

  const handleDeleteMedication = async (medicationId: number) => {
    if (typeof window !== 'undefined' && !window.confirm('Xóa thuốc này?')) return;
    try {
      await health.deleteMedication(medicationId);
      health.showToast('Đã xóa thuốc', 'success');
    } catch (err) {
      health.showToast(extractErrorMessage(err, 'Không thể xóa thuốc'), 'error');
    }
  };

  // ------------------------------------------------------- Health log handlers

  const handleAddLog = async (payload: CreateHealthLogPayload) => {
    try {
      await health.addLog(payload);
      health.showToast('Đã ghi nhật ký', 'success');
    } catch (err) {
      health.showToast(extractErrorMessage(err, 'Không thể ghi nhật ký'), 'error');
      throw err;
    }
  };

  const handleUpdateLog = async (logId: number, payload: Partial<CreateHealthLogPayload>) => {
    try {
      await health.updateLog({ logId, payload });
      health.showToast('Đã cập nhật nhật ký', 'success');
    } catch (err) {
      health.showToast(extractErrorMessage(err, 'Không thể cập nhật nhật ký'), 'error');
    }
  };

  const handleDeleteLog = async (logId: number) => {
    if (typeof window !== 'undefined' && !window.confirm('Xóa nhật ký này?')) return;
    try {
      await health.deleteLog(logId);
      health.showToast('Đã xóa nhật ký', 'success');
    } catch (err) {
      health.showToast(extractErrorMessage(err, 'Không thể xóa nhật ký'), 'error');
    }
  };

  // ------------------------------------------------------------------ Render

  if (isLoadingClasses) {
    return (
      <S.Page>
        <EmptyState title="Đang tải danh sách lớp…" />
      </S.Page>
    );
  }

  if (!classes || classes.length === 0) {
    return (
      <S.Page>
        <EmptyState
          title="Bạn chưa được phân công quản lý lớp nào"
          description="Liên hệ ban giám hiệu để được phân công lớp."
        />
      </S.Page>
    );
  }

  if (isLoadingStudents && activeClassId !== undefined) {
    return (
      <S.Page>
        <EmptyState title="Đang tải danh sách học sinh…" />
      </S.Page>
    );
  }

  const studentsList = students ?? [];
  const selectedStudent = studentsList.find((s) => s.studentId === selectedStudentId) ?? null;

  return (
    <S.Page>
      <S.HeaderRow>
        <div>
          <h1>Sức khỏe học sinh</h1>
          <p>
            Xin chào {user?.fullName || user?.username} — Theo dõi dị ứng, thuốc và nhật ký sức
            khỏe hằng ngày của các bé.
          </p>
        </div>
        <EditModeToggle
          locked={editLocked}
          onToggle={() => setEditLocked((prev) => !prev)}
          summary={editLocked ? 'Đang khóa' : 'Có thể chỉnh sửa'}
        />
      </S.HeaderRow>

      <S.LayoutGrid>
        <S.StudentRail>
          <S.StudentRailTitle>Học sinh</S.StudentRailTitle>
          <S.StudentList>
            {studentsList.map((student) => {
              const initials = student.fullName
                ? student.fullName
                    .split(' ')
                    .map((s) => s[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase()
                : '?';
              const active = student.studentId === selectedStudentId;
              return (
                <S.StudentItem
                  key={student.studentId}
                  $active={active}
                  onClick={() => {
                    setSelectedStudentId(student.studentId);
                    setEditingAllergy(null);
                  }}
                >
                  <div className="avatar">{initials}</div>
                  <div>
                    <div className="name">{student.fullName}</div>
                    <div style={{ fontSize: 11, opacity: active ? 0.85 : 0.6 }}>
                      Lớp {activeClassId}
                    </div>
                  </div>
                </S.StudentItem>
              );
            })}
          </S.StudentList>
        </S.StudentRail>

        <S.HealthBoard>
          {!selectedStudent && studentsList.length > 0 && (
            <EmptyState title="Chọn học sinh để xem chi tiết" />
          )}

          {!selectedStudent && studentsList.length === 0 && !isLoadingStudents && (
            <EmptyState
              title="Lớp chưa có học sinh"
              description="Lớp hiện tại chưa có học sinh nào."
            />
          )}

          {selectedStudent && (
            <>
              <S.CardsRow>
                <AllergyCard
                  allergies={health.allergies}
                  isLoading={health.isLoadingAllergies}
                  isError={health.isErrorAllergies}
                  error={health.errorAllergies}
                  isReadOnly={editLocked}
                  onRetry={() => health.refetchAllergies()}
                  onSubmit={handleAddAllergy}
                  onDelete={handleDeleteAllergy}
                  onEdit={setEditingAllergy}
                  editingAllergyId={editingAllergy?.allergyId ?? null}
                  editingAllergy={editingAllergy}
                  onCancelEdit={() => setEditingAllergy(null)}
                  onUpdate={handleUpdateAllergy}
                />
                <MedicationCard
                  medications={health.filterMedications(medicationTab)}
                  isLoading={health.isLoadingMedications}
                  isError={health.isErrorMedications}
                  error={health.errorMedications}
                  isReadOnly={editLocked}
                  onRetry={() => health.refetchMedications()}
                  activeTab={medicationTab}
                  onTabChange={setMedicationTab}
                  onSubmit={handleAddMedication}
                  onUpdateStatus={handleUpdateMedicationStatus}
                  onDelete={handleDeleteMedication}
                />
              </S.CardsRow>

              <HealthLogTable
                logs={health.logs}
                isLoading={health.isLoadingLogs}
                isError={health.isErrorLogs}
                error={health.errorLogs}
                isReadOnly={editLocked}
                onRetry={() => health.refetchLogs()}
                onSubmit={handleAddLog}
                onUpdate={handleUpdateLog}
                onDelete={handleDeleteLog}
              />
            </>
          )}
        </S.HealthBoard>
      </S.LayoutGrid>

      <S.ToastStack>
        {health.toasts.map((toast) => (
          <S.ToastBubble key={toast.id} $variant={toast.variant}>
            {toast.text}
          </S.ToastBubble>
        ))}
      </S.ToastStack>
    </S.Page>
  );
};