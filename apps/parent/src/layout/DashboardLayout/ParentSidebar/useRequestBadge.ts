'use client';

import { useState, useEffect } from 'react';
import { useStudent } from '@/contexts/StudentContext';
import { useAuth } from '@kindercare/core';
import { leaveRequestService } from '@/services/LeaveRequest/LeaveRequestService';
import { medicationRequestService } from '@/services/MedicationRequest/MedicationRequestService';

export function useRequestBadge(): number {
  const { isAuthenticated } = useAuth();
  const { activeStudent } = useStudent();
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    if (!isAuthenticated || !activeStudent?.studentId) {
      setPendingCount(0);
      return;
    }

    const id = activeStudent.studentId;
    Promise.allSettled([
      leaveRequestService.getLeaveRequests(id),
      medicationRequestService.getMedicationRequests(id),
    ]).then(([leaves, meds]) => {
      let count = 0;
      if (leaves.status === 'fulfilled') {
        count += leaves.value.filter(r => (r.status || '').toLowerCase() === 'pending').length;
      }
      if (meds.status === 'fulfilled') {
        const seen = new Set<string>();
        meds.value.forEach(m => {
          const key = String(m.requestDate);
          if (!seen.has(key) && (m.status || '').toLowerCase() === 'pending') {
            seen.add(key);
            count++;
          }
        });
      }
      setPendingCount(count);
    });
  }, [isAuthenticated, activeStudent?.studentId]);

  return pendingCount;
}
