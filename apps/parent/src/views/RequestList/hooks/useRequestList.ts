import { useState, useMemo, useEffect, useCallback } from 'react';
import { useStudent } from '@/contexts/StudentContext';
import { useAuth } from '@kindercare/core';
import { toast } from '@kindercare/ui';
import { leaveRequestService } from '@/services/LeaveRequest/LeaveRequestService';
import { medicationRequestService } from '@/services/MedicationRequest/MedicationRequestService';
import { RequestItem } from '../types';
import { mapLeavesToRequestItems, mapMedicationsToRequestItems, filterRequests, calculateRequestStats } from '../utils';

export const useRequestList = () => {
  const { isAuthenticated } = useAuth();
  const { activeStudent } = useStudent();
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'all' | 'leave' | 'medication'>('all');
  const [activeStatusFilter, setActiveStatusFilter] = useState<'all' | 'pending' | 'approved_completed' | 'rejected' | 'cancelled'>('all');

  const [isLeavePopupOpen, setIsLeavePopupOpen] = useState<boolean>(false);
  const [isMedicationPopupOpen, setIsMedicationPopupOpen] = useState<boolean>(false);
  const [isSelectPopupOpen, setIsSelectPopupOpen] = useState<boolean>(false);
  const [selectedRequest, setSelectedRequest] = useState<RequestItem | null>(null);

  const fetchRequests = useCallback(async () => {
    if (!activeStudent?.studentId) return;
    setLoading(true);
    try {
      const [leaves, medications] = await Promise.all([
        leaveRequestService.getLeaveRequests(activeStudent.studentId),
        medicationRequestService.getMedicationRequests(activeStudent.studentId),
      ]);

      const mappedLeaves = mapLeavesToRequestItems(leaves);
      const mappedMedications = mapMedicationsToRequestItems(medications);

      const combined = [...mappedLeaves, ...mappedMedications].sort((a, b) => b.rawDate - a.rawDate);
      setRequests(combined);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Không thể tải danh sách đơn từ');
    } finally {
      setLoading(false);
    }
  }, [activeStudent?.studentId]);

  useEffect(() => {
    if (isAuthenticated && activeStudent?.studentId) {
      fetchRequests();
    } else {
      setRequests([]);
    }
  }, [isAuthenticated, activeStudent?.studentId, fetchRequests]);

  const stats = useMemo(() => {
    return calculateRequestStats(requests);
  }, [requests]);

  const filteredRequests = useMemo(() => {
    return filterRequests(requests, activeTab, activeStatusFilter);
  }, [requests, activeTab, activeStatusFilter]);

  const handleCancelRequest = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn hủy đơn này?')) {
      setRequests(prev =>
        prev.map(r => (r.id === id ? { ...r, status: 'cancelled' as const } : r))
      );
      toast.success('Hủy đơn thành công!');
    }
  };

  const studentName = activeStudent?.fullName || 'bé';

  return {
    activeStudent,
    loading,
    requests,
    setRequests,
    activeTab,
    setActiveTab,
    activeStatusFilter,
    setActiveStatusFilter,
    isLeavePopupOpen,
    setIsLeavePopupOpen,
    isMedicationPopupOpen,
    setIsMedicationPopupOpen,
    isSelectPopupOpen,
    setIsSelectPopupOpen,
    selectedRequest,
    setSelectedRequest,
    fetchRequests,
    stats,
    filteredRequests,
    handleCancelRequest,
    studentName,
  };
};
