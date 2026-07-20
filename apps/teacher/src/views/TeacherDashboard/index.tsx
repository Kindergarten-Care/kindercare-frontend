'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as S from './styles';
import { DashboardLayout } from '@/layout/DashboardLayout';
import { LeaveRequestStatus } from '@/config/types/attendance';
import { HeroBannerWidget } from './components/HeroBannerWidget';
import { QuickCategoriesWidget } from './components/QuickCategoriesWidget';
import { TodayKidsWidget, TodayKid } from './components/TodayKidsWidget';
import { KidQuickActionModal } from './components/KidQuickActionModal';
import { PeriodicAssessmentWidget } from './components/GoodBehaviorWidget';
import { TaskListWidget, TaskItem } from './components/TaskListWidget';
import { LeaveApprovalWidget } from './components/LeaveApprovalWidget';
import { QrScannerModal } from '@/components/QrScannerModal';
import { PhotoAttendanceModal } from '@/components/PhotoAttendance/PhotoAttendanceModal';

import { LeaveRequestModal } from './components/LeaveRequestModal';
import { MedicalNoteModal } from './components/MedicalNoteModal';
import { ProxyDetailModal } from './components/ProxyDetailModal';
import { TimelineModal } from './components/TimelineModal';
import { AllFeaturesModal } from './components/AllFeaturesModal';
import { RequestListModal } from './components/RequestListModal';


import { AlertTriangle } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/routing';

const CreateNewsfeedModal = dynamic(() => import('./components/CreateNewsfeedModal').then(mod => mod.CreateNewsfeedModal), { ssr: false });
const ClassNewsfeedWidget = dynamic(() => import('./components/ClassNewsfeedWidget').then(mod => mod.ClassNewsfeedWidget), { ssr: false });

import { useTeacherDashboard } from './hooks/useTeacherDashboard';
import { getStudentInitials } from '@/utils/string';
import { fixImageUrl } from '@/utils/imageUrl';

export const TeacherDashboardView: React.FC = () => {
  const {
    router,
    activeClassId,
    activeClassName,
    studentsList,
    presentCount,
    toasts,
    confetti,
    isLoadingDashboard,
    dashboardError,
    scannerOpen, setScannerOpen,
    photoScannerOpen, setPhotoScannerOpen,
    newsfeedModalOpen, setNewsfeedModalOpen,
    isTimelineModalOpen, setTimelineModalOpen,
    allFeaturesOpen, setAllFeaturesOpen,
    requestListType, setRequestListType,
    selectedLeave, setSelectedLeave,
    selectedMedical, setSelectedMedical,
    selectedProxy, setSelectedProxy,
    selectedQuickKid, setSelectedQuickKid,
    termPeriod,
    todayDate,
    allLeaveRequests,
    rawMedicalReqs,
    rawProxyReqs,
    updateLeaveReq,
    updateMedicalReq,
    updateProxyReq,
    addToast,
    triggerConfetti,
    handleApproveLeave,
    handleRejectLeave,
    loadDashboardData,
  } = useTeacherDashboard();

  const cats = [
    { id: '1', label: 'Điểm danh', icon: '✓', iconBg: '#E6F3ED', iconColor: '#005A36', onClick: () => setScannerOpen(true) },
    { id: '2', label: 'Hoạt động', icon: '🧩', iconBg: '#E0E7FF', iconColor: '#4338CA', onClick: () => setTimelineModalOpen(true) },
    { id: '3', label: 'Y tế', icon: '💊', iconBg: '#FCE7F3', iconColor: '#BE185D', onClick: () => setRequestListType('medical') },
    { id: '4', label: 'Đánh giá định kỳ', icon: '📊', iconBg: '#FEF3C7', iconColor: '#D97706', onClick: () => router.push('/assessment') },
    { id: '5', label: 'Đơn phép', icon: '📝', iconBg: '#F3E8FF', iconColor: '#7E22CE', onClick: () => setRequestListType('leave') },
  ];

  // Map Real Leave Requests to TaskList - show ALL requests, not just pending
  const leaveTasks: TaskItem[] = allLeaveRequests.map((leave: any) => {
    const initial = getStudentInitials(leave.studentName);
    const student = studentsList.find((s: any) => String(s.id) === String(leave.studentId));
    const isDone = leave.status === 'APPROVED' || leave.status === 'Approved' || leave.status === 'REJECTED' || leave.status === 'Rejected';
    return {
      id: String(leave.requestId || leave.id),
      name: leave.studentName,
      initial,
      avatarUrl: leave.studentAvatar || leave.avatarUrl || leave.avatar || student?.avatar,
      color: isDone ? '#E5E7EB' : '#FEF08A', // Gray if processed, yellow if pending
      tag: leave.status === 'APPROVED' || leave.status === 'Approved' ? 'Đã duyệt' : (leave.status === 'REJECTED' || leave.status === 'Rejected' ? 'Đã từ chối' : 'Đơn phép'),
      tagStyle: { 
        color: leave.status === 'APPROVED' || leave.status === 'Approved' ? '#059669' : (leave.status === 'REJECTED' || leave.status === 'Rejected' ? '#DC2626' : '#B45309'), 
        background: leave.status === 'APPROVED' || leave.status === 'Approved' ? '#D1FAE5' : (leave.status === 'REJECTED' || leave.status === 'Rejected' ? '#FEE2E2' : '#FEF3C7'), 
        fontSize: '10px', 
        padding: '2px 6px', 
        borderRadius: '4px', 
        fontWeight: 'bold' 
      },
      sub: `Lý do: ${leave.reason || 'Việc gia đình'}`,
      btn: isDone ? 'Đã xử lý' : (updateLeaveReq.isPending && String(updateLeaveReq.variables?.requestId) === String(leave.requestId || leave.id) ? 'Đang duyệt...' : 'Duyệt'),
      btnColor: isDone ? '#9CA3AF' : '#005A36',
      btnBorder: isDone ? '#D1D5DB' : '#A7E0C6',
      action: () => {
        if (!isDone) {
          handleApproveLeave(String(leave.requestId || leave.id));
        }
      },
      rowStyle: isDone ? { opacity: 0.55, filter: 'grayscale(80%)' } : undefined,
      isDone, // For sorting - processed items go to bottom
      status: String(leave.status).toUpperCase(),
      createdAt: leave.createdAt ? new Date(leave.createdAt).getTime() : Date.now(),
      onRowClick: () => setSelectedLeave({
        id: String(leave.requestId || leave.id),
        studentName: leave.studentName,
        parentName: leave.parentName || 'Phụ huynh',
        parentPhone: leave.parentPhone || 'Chưa cập nhật',
        reason: leave.reason,
        fromDate: leave.fromDate,
        toDate: leave.toDate,
        parentNotes: leave.parentNotes,
        attachmentUrl: leave.attachmentUrl,
        avatarUrl: leave.studentAvatar || leave.avatarUrl || leave.avatar || student?.avatar,
        status: leave.status // Pass status to modal
      })
    };
  });

  const medicalTasks: TaskItem[] = rawMedicalReqs.map((med: any) => {
    const initial = getStudentInitials(med.studentName);
    const isDone = med.status === 'Done' || med.status === 'Completed';
    const student = studentsList.find((s: any) => String(s.id) === String(med.studentId));
    return {
      id: `med_${med.requestId || med.id}`,
      name: med.studentName,
      initial,
      avatarUrl: med.studentAvatar || med.avatarUrl || med.avatar || student?.avatar,
      color: isDone ? '#F3F4F6' : '#FCE7F3', 
      tag: 'Y tế',
      tagStyle: { color: isDone ? '#9CA3AF' : '#DC2626', background: isDone ? '#E5E7EB' : '#FEE2E2', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' },
      sub: `${med.medicineDetails || med.medicineName || 'Thuốc'} - ${med.dosage || 'Liều'}`,
      btn: isDone ? 'Đã cho uống' : (updateMedicalReq.isPending && String(updateMedicalReq.variables?.requestId) === String(med.requestId || med.id) ? 'Đang lưu...' : 'Xác nhận uống'),
      btnColor: isDone ? '#9CA3AF' : '#DC2626',
      btnBorder: isDone ? '#D1D5DB' : '#FCA5A5',
      action: () => {
        if (!isDone) {
          updateMedicalReq.mutate({ requestId: Number(med.requestId || med.id), status: 'Completed' as any }, {
            onSuccess: () => addToast('Đã ghi nhận cho uống thuốc')
          });
        }
      },
      onRowClick: () => setSelectedMedical({
        id: String(med.requestId || med.id),
        studentName: med.studentName,
        medicineName: med.medicineDetails || med.medicineName,
        dosage: med.dosage,
        timeToTake: med.timeToTake,
        parentNotes: med.parentNote || med.parentNotes,
        imageUrl: med.medicineImageUrl || med.attachmentUrl || med.imageUrl,
        avatarUrl: med.studentAvatar || med.avatarUrl || med.avatar || student?.avatar
      }),
      rowStyle: isDone ? { opacity: 0.55, filter: 'grayscale(80%)' } : undefined,
      isDone, // For sorting
      status: String(med.status).toUpperCase(),
      createdAt: med.requestDate ? med.requestDate * 1000 : Date.now()
    };
  });

  const proxyTasks: TaskItem[] = rawProxyReqs.map((proxy: any) => {
    const initial = getStudentInitials(proxy.studentName);
    const isDone = proxy.status === 'Approved';
    const student = studentsList.find((s: any) => String(s.id) === String(proxy.studentId));
    return {
      id: `proxy_${proxy.authorizationId}`,
      name: proxy.studentName,
      initial,
      avatarUrl: proxy.studentAvatar || proxy.avatarUrl || student?.avatar,
      color: isDone ? '#F3F4F6' : '#E0E7FF',
      tag: 'Đón hộ',
      tagStyle: { color: isDone ? '#9CA3AF' : '#4338CA', background: isDone ? '#E5E7EB' : '#C7D2FE', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' },
      sub: `Người đón: ${proxy.proxyName}`,
      btn: isDone ? 'Đã duyệt' : 'Xem & Duyệt',
      btnColor: isDone ? '#9CA3AF' : '#4338CA',
      btnBorder: isDone ? '#D1D5DB' : '#A5B4FC',
      action: (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (!isDone) {
          setSelectedProxy({
            authorizationId: String(proxy.authorizationId),
            studentName: proxy.studentName,
            parentName: proxy.parentName,
            parentPhone: proxy.parentPhone,
            proxyName: proxy.proxyName,
            proxyPhone: proxy.proxyPhone,
            proxyIdCard: proxy.proxyIdCard,
            proxyPhotoUrl: proxy.proxyPhotoUrl,
            authorizationDate: proxy.authorizationDate,
            type: proxy.type,
            notes: proxy.notes,
            status: proxy.status,
            avatarUrl: proxy.studentAvatar || proxy.avatarUrl || student?.avatar
          });
        }
      },
      onRowClick: () => setSelectedProxy({
        authorizationId: String(proxy.authorizationId),
        studentName: proxy.studentName,
        parentName: proxy.parentName,
        parentPhone: proxy.parentPhone,
        proxyName: proxy.proxyName,
        proxyPhone: proxy.proxyPhone,
        proxyIdCard: proxy.proxyIdCard,
        proxyPhotoUrl: proxy.proxyPhotoUrl,
        authorizationDate: proxy.authorizationDate,
        type: proxy.type,
        notes: proxy.notes,
        status: proxy.status,
        avatarUrl: proxy.studentAvatar || proxy.avatarUrl || student?.avatar
      }),
      rowStyle: isDone ? { opacity: 0.55, filter: 'grayscale(80%)' } : undefined,
      isDone,
      status: String(proxy.status).toUpperCase(),
      createdAt: proxy.createdAt * 1000
    };
  });

  const tasks: TaskItem[] = [...leaveTasks, ...medicalTasks, ...proxyTasks].sort((a: any, b: any) => {
    if (a.isDone === b.isDone) return 0;
    return a.isDone ? 1 : -1;
  });

  /**
   * Map studentsList (từ getDailyAttendance) → TodayKid cho widget "Tình trạng hôm nay".
   * Giáo viên click vào thẻ → mở modal KidQuickActionModal để sửa nhanh điểm danh.
   */
  const todayKids: TodayKid[] = studentsList.map(s => {
    const initial = getStudentInitials(s.name || '');
    return {
      id: String(s.id),
      name: s.name || 'Học sinh',
      initial,
      avatarUrl: fixImageUrl(s.avatar),
      attendanceStatus: (s.attendanceStatus as any) || 'NOT_MARKED',
      arrivalTime: s.arrivalTime,
      teacherNote: s.teacherNote,
    };
  });

  const openQuickActionFor = (kid: TodayKid) => setSelectedQuickKid(kid);

  return (
    <DashboardLayout>
    <S.DashboardContainer>
      {/* CONFETTI LAYER */}
      <S.ConfettiContainer>
        {confetti.map(p => (
          <S.ConfettiPiece
            key={p.id}
            $x={p.x}
            $y={p.y}
            $color={p.color}
            $dx={p.dx}
            $dy={p.dy}
            $angle={p.angle}
          />
        ))}
      </S.ConfettiContainer>

      {dashboardError ? (
        <S.ErrorContainer>
          <AlertTriangle size={48} color="#DC2626" />
          <S.ErrorTitle>Không thể tải dữ liệu lớp học</S.ErrorTitle>
          <S.ErrorDesc>{dashboardError}</S.ErrorDesc>
          <S.RetryButton onClick={loadDashboardData}>
            Thử lại
          </S.RetryButton>
        </S.ErrorContainer>
      ) : (
        <S.BodyLayout>
          {/* [1] Hero Banner Quét QR */}
          <HeroBannerWidget
            className={activeClassName || 'Lớp Mầm 1'}
            presentCount={presentCount}
            totalCount={studentsList.length || 42}
            onOpenScanner={() => setScannerOpen(true)}
            onOpenPhotoScanner={() => setPhotoScannerOpen(true)}
          />

          {/* [2] Quick Actions */}
          <QuickCategoriesWidget
            categories={cats}
            onViewAll={() => setAllFeaturesOpen(true)}
          />

          {/* [3] Tình trạng hôm nay (Điểm danh nhanh dạng lưới) */}
          <TodayKidsWidget
            kids={todayKids}
            date={todayDate}
            onKidClick={openQuickActionFor}
            onViewAll={() => router.push('/attendance')}
          />

          {/* [4] Đơn cần xử lý */}
          <TaskListWidget tasks={tasks.slice(0, 5)} onViewAll={() => setRequestListType('all')} />

          {/* [5] Newsfeed */}
          <div>
            <ClassNewsfeedWidget classId={activeClassId} />
          </div>

          {/* [6] Đánh giá định kỳ */}
          <PeriodicAssessmentWidget
            classId={activeClassId}
            termPeriod={termPeriod}
            studentNames={Object.fromEntries(
              studentsList.map((s: any) => [String(s.id), String(s.name ?? '')]).filter(([, n]) => n)
            ) as Record<string, string>}
            studentAvatars={Object.fromEntries(
              studentsList.map((s: any) => [String(s.id), String(fixImageUrl(s.avatar) ?? '')]).filter(([, v]) => v)
            ) as Record<string, string>}
          />
        </S.BodyLayout>
      )}

      {/* FLOATING TOAST NOTIFICATIONS */}
      <S.ToastsContainer>
        {toasts.map(t => (
          <S.Toast key={t.id}>{t.text}</S.Toast>
        ))}
      </S.ToastsContainer>

      {/* QR SCANNER MODAL */}
      {scannerOpen && (
        <QrScannerModal 
          onClose={() => setScannerOpen(false)}
          onScanSuccess={() => {
            loadDashboardData();
            triggerConfetti(window.innerWidth / 2, window.innerHeight / 2);
          }}
        />
      )}

      {/* PHOTO ATTENDANCE MODAL */}
      <PhotoAttendanceModal 
        isOpen={photoScannerOpen}
        onClose={() => setPhotoScannerOpen(false)}
        students={studentsList}
        classId={String(activeClassId)}
        className={activeClassName}
        onSuccess={() => {
          loadDashboardData();
          triggerConfetti(window.innerWidth / 2, window.innerHeight / 2);
        }}
      />

      {/* CREATE NEWSFEED MODAL */}
      <CreateNewsfeedModal 
        isOpen={newsfeedModalOpen}
        onClose={() => setNewsfeedModalOpen(false)}
        classId={activeClassId}
        onSuccess={() => {
          setNewsfeedModalOpen(false);
          addToast('🎉 Tạo nhật ký lớp thành công!');
        }}
      />

      {/* NEW MODALS */}
      <LeaveRequestModal 
        isOpen={!!selectedLeave}
        data={selectedLeave}
        onClose={() => setSelectedLeave(null)}
        onApprove={(id) => { handleApproveLeave(id); setSelectedLeave(null); }}
        onReject={(id) => { handleRejectLeave(id); setSelectedLeave(null); }}
      />

      <MedicalNoteModal 
        isOpen={!!selectedMedical}
        data={selectedMedical}
        onClose={() => setSelectedMedical(null)}
        onMarkDone={(id, note) => { 
          updateMedicalReq.mutate({ requestId: Number(id), status: 'Completed', teacherNote: note }, {
            onSuccess: () => {
              addToast('✅ Đã cho uống thuốc thành công!');
              setSelectedMedical(null);
            }
          });
        }}
      />

      <ProxyDetailModal
        isOpen={!!selectedProxy}
        data={selectedProxy}
        onClose={() => setSelectedProxy(null)}
        onApprove={(id) => {
          updateProxyReq.mutate({ authorizationId: Number(id) }, {
            onSuccess: () => {
              addToast('✅ Đã duyệt đơn đón hộ!');
              setSelectedProxy(null);
            }
          });
        }}
      />

      <KidQuickActionModal
        isOpen={!!selectedQuickKid}
        kid={selectedQuickKid ? {
          id: selectedQuickKid.id,
          name: selectedQuickKid.name,
          avatarUrl: selectedQuickKid.avatarUrl,
          attendanceStatus: selectedQuickKid.attendanceStatus,
          arrivalTime: selectedQuickKid.arrivalTime,
          teacherNote: selectedQuickKid.teacherNote,
        } : null}
        classId={activeClassId}
        date={todayDate}
        onClose={() => setSelectedQuickKid(null)}
        onSaved={() => {
          addToast('✅ Đã cập nhật điểm danh!');
          loadDashboardData();
        }}
      />

      <AllFeaturesModal
        isOpen={allFeaturesOpen}
        onClose={() => setAllFeaturesOpen(false)}
        onSelectFeature={(featureId) => {
          switch (featureId) {
            case 'qr':
              setScannerOpen(true);
              break;
            case 'attendance':
              router.push('/attendance');
              break;
            case 'students':
              router.push('/students');
              break;
            case 'schedule':
              router.push('/schedule');
              break;
            case 'lesson-plan':
              router.push('/lesson-plan');
              break;
            case 'activities':
              setTimelineModalOpen(true);
              break;
            case 'health':
              setRequestListType('medical');
              break;
            case 'leave':
              setRequestListType('leave');
              break;
            case 'assessment':
              router.push('/assessment');
              break;
            case 'newsfeed':
              setNewsfeedModalOpen(true);
              break;
            case 'weekly-schedule':
              router.push('/weekly-schedule');
              break;
            case 'profile':
              router.push('/profile');
              break;
            default:
              addToast(`Đang mở: ${featureId}`);
          }
        }}
      />

      <RequestListModal 
        isOpen={!!requestListType}
        onClose={() => setRequestListType(null)}
        type={requestListType || 'leave'}
        title={requestListType === 'leave' ? 'Đơn xin nghỉ học' : (requestListType === 'medical' ? 'Dặn dò y tế' : 'Tất cả đơn')}
        subtitle="Danh sách cần xử lý"
        tasks={(requestListType === 'leave' ? tasks.filter(t => t.tag === 'Đơn phép') : (requestListType === 'medical' ? tasks.filter(t => t.tag === 'Y tế') : tasks)).map(t => ({
          ...t,
          onRowClick: t.onRowClick ? () => {
            setRequestListType(null); // Đóng bảng danh sách
            t.onRowClick!();          // Bật tờ đơn chi tiết
          } : undefined
        }))}
      />
      
      <TimelineModal
        isOpen={isTimelineModalOpen}
        onClose={() => setTimelineModalOpen(false)}
        classId={activeClassId}
      />
    </S.DashboardContainer>
    </DashboardLayout>
  );
};
export default TeacherDashboardView;
