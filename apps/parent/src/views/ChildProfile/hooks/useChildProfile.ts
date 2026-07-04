'use client';

import { useState, useEffect, useCallback } from 'react';
import { useStudent } from '@/contexts/StudentContext';
import { getInitials, getAvatarGradient } from '@/utils/Student/Avatar';
import { formatDateFromBigInt } from '@/utils/Student/Date';
import { getTeacherDisplayName } from '@/utils/Teacher/TeacherDisplay';
import { relativeService } from '@/services/Relative/RelativeService';
import { RelativeDomainModel } from '@/config/types/relative';

const calculateAge = (dateOfBirth: bigint | null): number | null => {
  if (!dateOfBirth) return null;
  const dob = new Date(Number(dateOfBirth) * 1000);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
};

export function useChildProfile() {
  const { activeStudent, loading: studentLoading } = useStudent();

  const [relatives, setRelatives] = useState<RelativeDomainModel[]>([]);
  const [relativesLoading, setRelativesLoading] = useState(false);

  const fetchRelatives = useCallback(() => {
    if (!activeStudent?.studentId) return;
    setRelativesLoading(true);
    relativeService.getRelatives(activeStudent.studentId)
      .then(data => setRelatives(data))
      .catch(err => {
        console.error('Failed to fetch relatives:', err);
        setRelatives([]);
      })
      .finally(() => setRelativesLoading(false));
  }, [activeStudent?.studentId]);

  useEffect(() => {
    fetchRelatives();
  }, [fetchRelatives]);

  const leadTeacher = activeStudent?.teachers?.[0] ?? null;
  const age = activeStudent ? calculateAge(activeStudent.dateOfBirth) : null;

  return {
    loading: studentLoading || relativesLoading,
    activeStudent,
    relatives,
    leadTeacher,
    teacherDisplayName: leadTeacher ? getTeacherDisplayName(leadTeacher) : null,
    age,
    avatarGradient: activeStudent ? getAvatarGradient(activeStudent.studentId) : '',
    avatarInitial: activeStudent ? getInitials(activeStudent.fullName) : '',
    dobFormatted: activeStudent ? formatDateFromBigInt(activeStudent.dateOfBirth) : '--',
    admissionFormatted: activeStudent ? formatDateFromBigInt(activeStudent.admissionDate) : '--',
  };
}
