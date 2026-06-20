'use client';

import { useEffect, useState } from 'react';
import { parentDashboardService } from '@/services/ParentDashboardService';
import { ParentDashboardModel } from '@/config/types/dashboard';
import { useStudent } from '@/contexts/StudentContext';
import { getInitials, getAvatarGradient } from '@/utils/Student/Avatar';
import { formatDateFromBigInt } from '@/utils/Student/Date';

export const getTeacherDisplayName = (teacher: { fullName: string; gender?: string }) => {
  if (!teacher) return '';
  const fullName = teacher.fullName || '';
  if (/^(cô|thầy)\b/i.test(fullName)) {
    return fullName;
  }
  const isMale = (teacher.gender || '').toLowerCase() === 'nam';
  const prefix = isMale ? 'Thầy' : 'Cô';
  return `${prefix} ${fullName}`;
};

export function useParentDashboard() {
  const [data, setData] = useState<ParentDashboardModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLeavePopupOpen, setIsLeavePopupOpen] = useState<boolean>(false);
  const [isMedicationPopupOpen, setIsMedicationPopupOpen] = useState<boolean>(false);
  const [isQrPopupOpen, setIsQrPopupOpen] = useState<boolean>(false);
  const { activeStudent } = useStudent();

  useEffect(() => {
    parentDashboardService
      .getDashboardData()
      .then(setData)
      .catch(err => console.error('Dashboard fetch failed:', err))
      .finally(() => setLoading(false));
  }, []);

  const leadTeacher = activeStudent && activeStudent.teachers && activeStudent.teachers.length > 0
    ? activeStudent.teachers[0]
    : null;

  const childHero = activeStudent
    ? {
        name: activeStudent.fullName,
        className: activeStudent.className,
        teacher: leadTeacher ? getTeacherDisplayName(leadTeacher) : 'Chưa phân công',
        academicYear: activeStudent.academicYearName,
        branch: activeStudent.campusName,
        statusTags: [
          { label: `🎂 NS: ${formatDateFromBigInt(activeStudent.dateOfBirth)}`, type: 'neutral' as const },
          { label: `📅 Nhập học: ${formatDateFromBigInt(activeStudent.admissionDate)}`, type: 'neutral' as const },
          { label: activeStudent.allergies ? `⚠️ ${activeStudent.allergies}` : 'Không dị ứng', type: activeStudent.allergies ? 'yellow' as const : 'green' as const },
        ],
        checkinTime: 'Đang học',
        checkinSub: 'Đúng giờ · Cổng A',
      }
    : null;

  const avatarGradient = activeStudent ? getAvatarGradient(activeStudent.studentId) : '';
  const avatarInitial = activeStudent ? getInitials(activeStudent.fullName) : '';

  return {
    data,
    loading,
    activeStudent,
    isLeavePopupOpen,
    setIsLeavePopupOpen,
    isMedicationPopupOpen,
    setIsMedicationPopupOpen,
    isQrPopupOpen,
    setIsQrPopupOpen,
    childHero,
    avatarGradient,
    avatarInitial,
    leadTeacher,
  };
}
