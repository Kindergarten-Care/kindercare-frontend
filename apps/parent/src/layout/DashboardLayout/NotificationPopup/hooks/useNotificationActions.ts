'use client';

import { useState, useMemo } from 'react';
import { useRouter } from '@/i18n/routing';
import { useDispatch, useSelector } from 'react-redux';
import { notificationService, type NotificationDto } from '@kindercare/core';
import { useStudent } from '@/contexts/StudentContext';
import { leaveRequestService } from '@/services/LeaveRequest/LeaveRequestService';
import { medicationRequestService } from '@/services/MedicationRequest/MedicationRequestService';
import {
  fetchNotifications,
  markOneRead,
  markAllRead,
  selectNotifications,
  selectNotifLoading,
  selectUnreadCount,
  deleteNotification,
  deleteAllNotifications,
} from '@/store/slices/notificationSlice';
import type { AppDispatch } from '@/store';
import { filterByTab, type NotifTab } from '../utils/notificationHelpers';

export function useNotificationActions() {
  const router   = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const items    = useSelector(selectNotifications);
  const loading  = useSelector(selectNotifLoading);
  const unread   = useSelector(selectUnreadCount);
  const { children: students, setActiveStudent } = useStudent();

  const [activeTab, setActiveTab] = useState<NotifTab>('all');

  const filteredItems = useMemo(() => filterByTab(items, activeTab), [items, activeTab]);

  const handleMarkOne = async (item: NotificationDto) => {
    if (item.isRead === 0) {
      dispatch(markOneRead(item.notifId));
      notificationService.markAsRead(item.notifId).catch(() => dispatch(fetchNotifications()));
    }

    // Parse dataPayload safely (could be JSON string or object depending on driver/API response)
    const payload = typeof item.dataPayload === 'string'
      ? (() => { try { return JSON.parse(item.dataPayload); } catch { return {}; } })()
      : (item.dataPayload || {});

    // Resolve student safely without blocking navigation in case of failures
    try {
      // Resolve which student this notification belongs to
      let targetStudentId =
        payload.studentId  ||
        payload.student_id ||
        payload.childId    ||
        payload.child_id;

      let targetStudent = null;
      if (targetStudentId && students?.length) {
        targetStudent = students.find(s => s.studentId === Number(targetStudentId)) || null;
      }

      // Fallback: search by requestId
      if (!targetStudent && students?.length) {
        if (item.type === 'LEAVE_REQUEST') {
          const requestId = Number(payload.requestId || payload.leaveRequestId);
          if (requestId) {
            const results = await Promise.all(
              students.map(async (student) => {
                try {
                  const leaves = await leaveRequestService.getLeaveRequests(student.studentId);
                  return leaves.some(l => Number(l.requestId) === requestId) ? student : null;
                } catch { return null; }
              })
            );
            targetStudent = results.find((s): s is typeof students[0] => s !== null) || null;
          }
        } else if (['MEDICATION', 'MEDICATION_REQUEST', 'MEDICAL_REQUEST', 'MEDICINE', 'MEDICINE_REQUEST'].includes(item.type)) {
          const requestId = Number(payload.medRequestId || payload.requestId);
          if (requestId) {
            const results = await Promise.all(
              students.map(async (student) => {
                try {
                  const meds = await medicationRequestService.getMedicationRequests(student.studentId);
                  return meds.some(m => Number(m.medRequestId) === requestId) ? student : null;
                } catch { return null; }
              })
            );
            targetStudent = results.find((s): s is typeof students[0] => s !== null) || null;
          }
        }
      }

      if (targetStudent) setActiveStudent(targetStudent);
    } catch (err) {
      console.error('Failed to resolve student for notification:', err);
    }

    // Navigate
    console.log('[Notification Click] Handling navigation for type:', item.type, 'payload:', payload);
    switch (item.type) {
      case 'ATTENDANCE':
      case 'CHECKIN':
      case 'CHECKOUT':
      case 'HEALTH_ALERT':
      case 'NEWSFEED':
      case 'NEWSFEEDS':
        console.log('[Notification Click] Navigating to /diary');
        router.push('/diary'); break;
      case 'LEAVE_REQUEST': {
        const id = payload.requestId || payload.leaveRequestId;
        console.log('[Notification Click] Navigating to leave request detail, id:', id);
        router.push(id ? `/request/leave-${id}` : '/request'); break;
      }
      case 'MEDICATION':
      case 'MEDICATION_REQUEST':
      case 'MEDICAL_REQUEST':
      case 'MEDICINE':
      case 'MEDICINE_REQUEST': {
        const id = payload.medRequestId || payload.requestId;
        console.log('[Notification Click] Navigating to medication request detail, id:', id);
        router.push(id ? `/request/medicine-${id}` : '/request'); break;
      }
      default:
        console.log('[Notification Click] No route match for type:', item.type);
    }
  };

  const handleMarkAll = () => {
    dispatch(markAllRead());
    notificationService.markAllAsRead().catch(() => dispatch(fetchNotifications()));
  };

  const handleDeleteOne = async (notifId: number) => {
    dispatch(deleteNotification(notifId));
  };

  const handleDeleteAll = async () => {
    dispatch(deleteAllNotifications());
  };

  return {
    items,
    filteredItems,
    loading,
    unread,
    activeTab,
    setActiveTab,
    handleMarkOne,
    handleMarkAll,
    handleDeleteOne,
    handleDeleteAll,
    dispatch,
  };
}
