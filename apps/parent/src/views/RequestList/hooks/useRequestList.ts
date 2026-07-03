import { useState, useMemo, useEffect, useCallback } from 'react';
import { useStudent } from '@/contexts/StudentContext';
import { useAuth } from '@kindercare/core';
import { toast } from '@kindercare/ui';
import { leaveRequestService } from '@/services/LeaveRequest/LeaveRequestService';
import { medicationRequestService } from '@/services/MedicationRequest/MedicationRequestService';
import { proxyRequestService } from '@/services/ProxyRequest/ProxyRequestService';
import { RequestItem } from '../types';
import { mapLeavesToRequestItems, mapMedicationsToRequestItems, mapProxiesToRequestItems, filterRequests, calculateRequestStats } from '../utils';

/**
 * Custom React hook that encapsulates all state, side effects, filtering,
 * and statistical calculations for parent leave and medication requests.
 * 
 * It coordinates:
 * - API request fetching for leaves and medication requests.
 * - Combining and sorting requests by sending time.
 * - Computing statistics (pending count, approved counts, totals).
 * - Modal popup show/hide toggle states.
 * - Actions like request cancellation.
 */
export const useRequestList = () => {
  const { isAuthenticated } = useAuth();
  const { activeStudent } = useStudent();
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'all' | 'leave' | 'medication' | 'proxy'>('all');
  const [activeStatusFilter, setActiveStatusFilter] = useState<'all' | 'pending' | 'approved_completed' | 'rejected' | 'cancelled'>('all');

  const [isLeavePopupOpen, setIsLeavePopupOpen] = useState<boolean>(false);
  const [isMedicationPopupOpen, setIsMedicationPopupOpen] = useState<boolean>(false);
  const [isProxyPopupOpen, setIsProxyPopupOpen] = useState<boolean>(false);
  const [isSelectPopupOpen, setIsSelectPopupOpen] = useState<boolean>(false);
  const [selectedRequest, setSelectedRequest] = useState<RequestItem | null>(null);

  const fetchRequests = useCallback(async () => {
    if (!activeStudent?.studentId) return;
    setLoading(true);
    try {
      const [leaves, medications, proxies] = await Promise.all([
        leaveRequestService.getLeaveRequests(activeStudent.studentId),
        medicationRequestService.getMedicationRequests(activeStudent.studentId),
        proxyRequestService.getProxyRequests(activeStudent.studentId),
      ]);

      const mappedLeaves = mapLeavesToRequestItems(leaves);
      const mappedMedications = mapMedicationsToRequestItems(medications);
      const mappedProxies = mapProxiesToRequestItems(proxies);

      const combined = [...mappedLeaves, ...mappedMedications, ...mappedProxies].sort((a, b) => b.rawDate - a.rawDate);
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

  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [requestToCancel, setRequestToCancel] = useState<string | null>(null);

  const triggerCancelRequest = (id: string) => {
    setRequestToCancel(id);
    setIsConfirmOpen(true);
  };

  const confirmCancelRequest = async (onSuccess?: () => void) => {
    if (!requestToCancel) return;
    setLoading(true);
    try {
      if (requestToCancel.startsWith('leave-')) {
        const requestId = requestToCancel.replace('leave-', '');
        await leaveRequestService.cancelLeaveRequest(requestId);
      } else if (requestToCancel.startsWith('medicine-')) {
        const medRequestId = requestToCancel.replace('medicine-', '');
        await medicationRequestService.cancelMedicationRequest(medRequestId);
      } else if (requestToCancel.startsWith('proxy-')) {
        const authorizationId = requestToCancel.replace('proxy-', '');
        await proxyRequestService.cancelProxyRequest(authorizationId);
      }
      await fetchRequests();
      toast.success('Hủy đơn thành công!');
      setIsConfirmOpen(false);
      setRequestToCancel(null);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Không thể hủy đơn');
    } finally {
      setLoading(false);
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
    isProxyPopupOpen,
    setIsProxyPopupOpen,
    isSelectPopupOpen,
    setIsSelectPopupOpen,
    selectedRequest,
    setSelectedRequest,
    fetchRequests,
    stats,
    filteredRequests,
    isConfirmOpen,
    setIsConfirmOpen,
    triggerCancelRequest,
    confirmCancelRequest,
    studentName,
  };
};
