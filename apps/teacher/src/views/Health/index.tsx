'use client';

import React from 'react';
import { CheckCircle, Save } from 'lucide-react';
import * as S from './styles';
import { DashboardLayout } from '@/layout/DashboardLayout';
import type { TeacherClassDomainModel } from '@/config/types/class';
import { AllergiesPopup } from './components/AllergiesPopup';
import { MedicalRequestsPopup } from './components/MedicalRequestsPopup';
import { TopBar } from './components/TopBar';
import { StatsSidebar } from './components/StatsSidebar';
import { StudentHealthTable } from './components/StudentHealthTable';
import { useHealthView } from './hooks/useHealthView';

export const HealthView: React.FC = () => {
  const h = useHealthView();

  const today = new Date();
  const dateStr = today.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const activeClassName = h.classes?.find((c: TeacherClassDomainModel) => c.classId === h.activeClassId)?.className;

  const setHeight = (studentId: number, value: string) => {
    h.setHealthRows(prev => {
      const next = new Map(prev);
      next.set(studentId, { ...prev.get(studentId)!, height: value, saved: false });
      return next;
    });
  };

  const setWeight = (studentId: number, value: string) => {
    h.setHealthRows(prev => {
      const next = new Map(prev);
      next.set(studentId, { ...prev.get(studentId)!, weight: value, saved: false });
      return next;
    });
  };

  return (
    <DashboardLayout>
      <S.Container>
        <TopBar
          dateStr={dateStr}
          className={activeClassName}
          classes={h.classes}
          activeClassId={h.activeClassId}
          onChangeClass={(classId) => h.setActiveClassId(classId)}
          termPeriod={h.termPeriod}
          onChangeTermPeriod={h.setTermPeriod}
        />

        <S.MainLayout>
          <StatsSidebar
            allergiesCount={h.studentsWithAllergies.length}
            pendingRequestsCount={h.pendingRequests.length}
            pendingMeasurementCount={h.pendingMeasurementCount}
            onShowAllergies={() => { h.setShowAllergies(true); h.setSelectedStudentForAllergy(null); }}
            onShowMedications={() => h.setShowMedications(true)}
          />

          <S.RightContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <S.TabBar>
                <S.Tab $active={h.statusFilter === 'all'} onClick={() => h.setStatusFilter('all')}>
                  Tất cả ({h.students.length})
                </S.Tab>
                <S.Tab $active={h.statusFilter === 'pending'} onClick={() => h.setStatusFilter('pending')}>
                  Chưa cập nhật ({h.students.filter(s => !(h.savedRows.has(s.studentId) || h.healthRows.get(s.studentId)?.saved)).length})
                </S.Tab>
                <S.Tab $active={h.statusFilter === 'updated'} onClick={() => h.setStatusFilter('updated')}>
                  Đã cập nhật ({h.students.filter(s => (h.savedRows.has(s.studentId) || h.healthRows.get(s.studentId)?.saved)).length})
                </S.Tab>
              </S.TabBar>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <S.SearchInput
                  type="text"
                  placeholder="Tìm kiếm học sinh..."
                  value={h.searchQuery}
                  onChange={(e) => h.setSearchQuery(e.target.value)}
                />

                <button
                  onClick={h.handleSaveAll}
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
            </div>

            <StudentHealthTable
              hasAnyStudents={!!h.students && h.students.length > 0}
              loading={h.loadingLogs}
              filteredStudents={h.filteredStudents}
              healthRows={h.healthRows}
              savedRows={h.savedRows}
              editingStudentIds={h.editingStudentIds}
              saving={h.createHealthLog.isPending}
              getPreviewBMI={h.getPreviewBMI}
              onHeightChange={setHeight}
              onWeightChange={setWeight}
              onViewAllergies={h.handleViewAllergies}
              onEdit={(studentId) => h.setEditingStudentIds(prev => new Set([...prev, studentId]))}
              onSave={h.handleSaveRow}
            />
          </S.RightContent>
        </S.MainLayout>

        {h.showAllergies && (
          <AllergiesPopup
            onClose={() => h.setShowAllergies(false)}
            students={h.studentsWithAllergies}
          />
        )}

        {h.showMedications && (
          <MedicalRequestsPopup
            onClose={() => h.setShowMedications(false)}
            requests={h.pendingRequests}
            classId={h.activeClassId}
            addToast={h.addToast}
          />
        )}

        <S.ToastContainer>
          {h.toasts.map(t => (
            <S.Toast key={t.id} $variant={t.variant}>
              {t.variant === 'success' && <CheckCircle size={16} />}
              {t.text}
            </S.Toast>
          ))}
        </S.ToastContainer>
      </S.Container>
    </DashboardLayout>
  );
};
