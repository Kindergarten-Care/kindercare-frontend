'use client';

import { useState, useEffect, useCallback } from 'react';
import { useStudent } from '@/contexts/StudentContext';
import { extracurricularService } from '@/services/Extracurricular/ExtracurricularService';
import { ExtracurricularActivityDomainModel, ExtracurricularEnrollmentDomainModel } from '@/config/types/extracurricular';

export function useExtracurricular() {
  const { activeStudent, loading: studentLoading } = useStudent();

  const [activities, setActivities] = useState<ExtracurricularActivityDomainModel[]>([]);
  const [enrollments, setEnrollments] = useState<ExtracurricularEnrollmentDomainModel[]>([]);
  const [apiLoading, setApiLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enrollingId, setEnrollingId] = useState<number | null>(null);
  const [cancellingId, setCancellingId] = useState<number | null>(null);

  const fetchData = useCallback(() => {
    if (!activeStudent?.studentId) return;
    setApiLoading(true);
    setError(null);
    Promise.allSettled([
      extracurricularService.getActivities(),
      extracurricularService.getStudentEnrollments(activeStudent.studentId),
    ])
      .then(([activitiesResult, enrollmentsResult]) => {
        if (activitiesResult.status === 'fulfilled') setActivities(activitiesResult.value);
        else console.error('Failed to fetch activities:', activitiesResult.reason);

        if (enrollmentsResult.status === 'fulfilled') setEnrollments(enrollmentsResult.value);
        else console.error('Failed to fetch enrollments:', enrollmentsResult.reason);
      })
      .finally(() => setApiLoading(false));
  }, [activeStudent?.studentId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const enroll = useCallback(
    async (activityId: number) => {
      if (!activeStudent?.studentId) return null;
      setEnrollingId(activityId);
      try {
        const result = await extracurricularService.enroll(activeStudent.studentId, activityId);
        fetchData();
        return result;
      } finally {
        setEnrollingId(null);
      }
    },
    [activeStudent?.studentId, fetchData]
  );

  const cancelEnrollment = useCallback(
    async (enrollmentId: number) => {
      if (!activeStudent?.studentId) return null;
      setCancellingId(enrollmentId);
      try {
        const result = await extracurricularService.cancelEnrollment(activeStudent.studentId, enrollmentId);
        fetchData();
        return result;
      } finally {
        setCancellingId(null);
      }
    },
    [activeStudent?.studentId, fetchData]
  );

  const currentMonth = (() => {
    const now = new Date();
    return `${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;
  })();

  const currentMonthEnrollments = enrollments
    .filter(e => e.registeredMonth === currentMonth)
    .filter(e => !(e.status === 'Cancelled' && e.feeRefunded));
  const enrolledActivityIds = new Set(
    currentMonthEnrollments.filter(e => e.status === 'Pending' || e.status === 'Active').map(e => e.activityId)
  );

  return {
    loading: studentLoading || apiLoading,
    error,
    activeStudent,
    activities,
    enrollments,
    currentMonth,
    currentMonthEnrollments,
    enrolledActivityIds,
    enrollingId,
    cancellingId,
    enroll,
    cancelEnrollment,
    refetch: fetchData,
  };
}
