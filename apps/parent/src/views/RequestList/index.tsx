'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import * as S from './styles';
import { useStudent } from '@/contexts/StudentContext';
import { useAuth } from '@kindercare/core';
import { toast } from '@kindercare/ui';
import {
  IconSearch, IconBell, IconPlus, IconMedicine, IconRequest, IconSchedule
} from '@/assets/icons/dashboard';
import LeaveRequestPopup from '@/views/ParentDashboard/components/LeaveRequestPopup';
import MedicationRequestPopup from '@/views/ParentDashboard/components/MedicationRequestPopup';
import { leaveRequestService } from '@/services/LeaveRequest/LeaveRequestService';
import { medicationRequestService } from '@/services/MedicationRequest/MedicationRequestService';

interface RequestItem {
  id: string;
  type: 'leave' | 'medication';
  title: string;
  detail: string;
  reason?: string;
  dosage?: string;
  timeToTake?: string;
  sentTime: string;
  note?: string;
  status: 'pending' | 'approved' | 'completed' | 'cancelled' | 'rejected';
  color: string;
  bg: string;
  rawDate: number;
  medicines?: {
    name: string;
    dosage: string;
    timeToTake?: string;
  }[];
}

export const RequestList: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { activeStudent } = useStudent();
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'all' | 'leave' | 'medication'>('all');

  const [isLeavePopupOpen, setIsLeavePopupOpen] = useState<boolean>(false);
  const [isMedicationPopupOpen, setIsMedicationPopupOpen] = useState<boolean>(false);

  const fetchRequests = useCallback(async () => {
    if (!activeStudent?.studentId) return;
    setLoading(true);
    try {
      const [leaves, medications] = await Promise.all([
        leaveRequestService.getLeaveRequests(activeStudent.studentId),
        medicationRequestService.getMedicationRequests(activeStudent.studentId),
      ]);

      const formatDate = (timestampSec: bigint | number): string => {
        const d = new Date(Number(timestampSec) * 1000);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
      };

      const mappedLeaves: RequestItem[] = leaves.map(l => {
        const fromStr = formatDate(l.fromDate);
        const toStr = formatDate(l.toDate);
        const detail = fromStr === toStr ? `Xin nghỉ ngày ${fromStr}` : `Xin nghỉ từ ngày ${fromStr} đến ${toStr}`;
        const normalizedStatus = (l.status || 'Pending').toLowerCase() as any;

        return {
          id: `leave-${l.requestId}`,
          type: 'leave',
          title: 'Đơn xin nghỉ',
          detail,
          reason: l.reason,
          sentTime: fromStr,
          note: l.parentNotes,
          status: normalizedStatus,
          color: '#2563eb', // Blue
          bg: '#eff6ff',
          rawDate: Number(l.fromDate),
        };
      });

      // Group medication requests by requestDate
      const medGroups: { [key: string]: typeof medications } = {};
      medications.forEach(m => {
        const key = String(m.requestDate);
        if (!medGroups[key]) {
          medGroups[key] = [];
        }
        medGroups[key].push(m);
      });

      const mappedMedications: RequestItem[] = Object.entries(medGroups).map(([_, group]) => {
        const rep = group[0];
        const reqStr = formatDate(rep.requestDate);
        
        // Resolve status of grouped requests
        let normalizedStatus: any = 'pending';
        const statuses = group.map(g => (g.status || 'Pending').toLowerCase());
        if (statuses.includes('pending')) {
          normalizedStatus = 'pending';
        } else if (statuses.includes('completed')) {
          normalizedStatus = 'completed';
        } else if (statuses.includes('approved')) {
          normalizedStatus = 'approved';
        } else if (statuses.includes('cancelled')) {
          normalizedStatus = 'cancelled';
        } else if (statuses.includes('rejected')) {
          normalizedStatus = 'rejected';
        } else {
          normalizedStatus = statuses[0] || 'pending';
        }

        const groupMedicines = group.map(m => ({
          name: m.medicineDetails,
          dosage: m.dosage,
          timeToTake: m.timeToTake || undefined,
        }));

        const detail = groupMedicines.length > 1
          ? `Dặn cô cho bé uống ${groupMedicines.length} loại thuốc`
          : `Dặn cô cho bé uống ${rep.medicineDetails}`;

        // Combine unique parent notes in the group
        const uniqueNotes = Array.from(new Set(group.map(g => g.parentNote?.trim()).filter(Boolean)));
        const combinedNote = uniqueNotes.join('; ') || undefined;

        return {
          id: `med-group-${rep.requestDate}-${rep.medRequestId}`,
          type: 'medication',
          title: 'Dặn dò thuốc',
          detail,
          dosage: groupMedicines.length === 1 ? rep.dosage : undefined,
          timeToTake: groupMedicines.length === 1 ? rep.timeToTake || undefined : undefined,
          sentTime: reqStr,
          note: combinedNote,
          status: normalizedStatus,
          color: '#ea580c', // Orange
          bg: '#fff7ed',
          rawDate: Number(rep.requestDate),
          medicines: groupMedicines,
        };
      });

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

  // Stats calculation
  const stats = useMemo(() => {
    let pending = 0;
    let approvedOrCompleted = 0;
    requests.forEach(r => {
      if (r.status === 'pending') pending++;
      if (r.status === 'approved' || r.status === 'completed') approvedOrCompleted++;
    });
    return {
      pending,
      approvedOrCompleted,
      total: requests.length,
      leaveCount: requests.filter(r => r.type === 'leave').length,
      medicationCount: requests.filter(r => r.type === 'medication').length,
    };
  }, [requests]);

  // Filtering
  const filteredRequests = useMemo(() => {
    return requests.filter(r => {
      const matchesTab = activeTab === 'all' || r.type === activeTab;
      const matchesSearch =
        searchQuery === '' ||
        r.detail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.reason?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.note?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [requests, activeTab, searchQuery]);

  const handleCancelRequest = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn hủy đơn này?')) {
      setRequests(prev =>
        prev.map(r => (r.id === id ? { ...r, status: 'cancelled' as const } : r))
      );
      toast.success('Hủy đơn thành công!');
    }
  };

  const handleShowDetail = (r: RequestItem) => {
    let medDetailsStr = '';
    if (r.type === 'medication' && r.medicines && r.medicines.length > 1) {
      medDetailsStr = r.medicines.map((m, idx) => `  ${idx + 1}. Tên thuốc: ${m.name}\n     Liều: ${m.dosage}\n     Thời gian: ${m.timeToTake || 'Chưa ghi rõ'}`).join('\n');
    }

    alert(
      `Chi tiết đơn:\n- Loại đơn: ${r.title}\n- Chi tiết: ${r.detail}\n` +
      (r.reason ? `- Lý do: ${r.reason}\n` : '') +
      (r.dosage && (!r.medicines || r.medicines.length <= 1) ? `- Liều dùng: ${r.dosage}\n` : '') +
      (r.timeToTake && (!r.medicines || r.medicines.length <= 1) ? `- Thời gian uống: ${r.timeToTake}\n` : '') +
      (medDetailsStr ? `- Danh sách thuốc:\n${medDetailsStr}\n` : '') +
      `- Trạng thái: ${r.status === 'pending' ? 'Chờ phản hồi' : r.status === 'approved' ? 'Đã duyệt' : r.status === 'completed' ? 'Đã thực hiện' : 'Đã hủy'}\n` +
      `- Thời gian gửi: ${r.sentTime}`
    );
  };

  const studentName = activeStudent?.fullName || 'bé';

  return (
    <S.PageContainer>
      {/* Header section */}
      <S.HeaderRow>
        <S.HeaderLeft>
          <S.PageTitle>Đơn từ của tôi</S.PageTitle>
          <S.PageSub>Theo dõi đơn xin nghỉ & dặn dò thuốc của {studentName}</S.PageSub>
        </S.HeaderLeft>

        <S.HeaderRight>
          <S.SearchWrapper>
            <IconSearch size={16} />
            <S.SearchInput
              type="text"
              placeholder="Tìm đơn theo nội dung..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </S.SearchWrapper>

          <S.BellBtn onClick={() => alert('Không có thông báo mới')}>
            <IconBell size={18} />
          </S.BellBtn>
        </S.HeaderRight>
      </S.HeaderRow>

      {/* Main Title Row & Actions */}
      <S.TitleSection>
        <S.TitleText>
          <S.SectionTitle>Đơn xin nghỉ & dặn dò thuốc</S.SectionTitle>
          <S.SectionSub>Các đơn bạn đã gửi cho cô giáo và trạng thái phản hồi.</S.SectionSub>
        </S.TitleText>

        <S.ActionGroup>
          <S.BtnAction onClick={() => setIsMedicationPopupOpen(true)}>
            <IconMedicine size={16} color="var(--brand, #005a36)" />
            Dặn dò thuốc
          </S.BtnAction>

          <S.BtnPrimary onClick={() => setIsLeavePopupOpen(true)}>
            <IconPlus size={16} />
            Báo nghỉ học
          </S.BtnPrimary>
        </S.ActionGroup>
      </S.TitleSection>

      {/* Stats pills */}
      <S.StatsRow>
        <S.StatPill $color="orange">
          <S.StatDot $color="orange" />
          {stats.pending} chờ phản hồi
        </S.StatPill>

        <S.StatPill $color="green">
          <S.StatDot $color="green" />
          {stats.approvedOrCompleted} đã duyệt / xác nhận
        </S.StatPill>

        <S.StatPill $color="blue">
          <S.StatDot $color="blue" />
          {stats.total} tổng số đơn
        </S.StatPill>
      </S.StatsRow>

      {/* Filter Tabs */}
      <S.FilterTabs>
        <S.TabBtn $active={activeTab === 'all'} onClick={() => setActiveTab('all')}>
          Tất cả <span>{stats.total}</span>
        </S.TabBtn>
        <S.TabBtn $active={activeTab === 'leave'} onClick={() => setActiveTab('leave')}>
          Đơn xin nghỉ <span>{stats.leaveCount}</span>
        </S.TabBtn>
        <S.TabBtn $active={activeTab === 'medication'} onClick={() => setActiveTab('medication')}>
          Dặn dò thuốc <span>{stats.medicationCount}</span>
        </S.TabBtn>
      </S.FilterTabs>

      {/* Cards List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 40px', color: 'var(--muted, #6b7280)', fontSize: '14px', fontWeight: 500 }}>
          <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite', marginRight: '8px' }}>🌀</span>
          Đang tải danh sách đơn...
        </div>
      ) : filteredRequests.length > 0 ? (
        <S.CardList>
          {filteredRequests.map(r => (
            <S.RequestCard key={r.id} $color={r.color}>
              <S.CardIconWrapper $bg={r.bg} $color={r.color}>
                {r.type === 'leave' ? <IconRequest size={20} /> : <IconMedicine size={20} />}
              </S.CardIconWrapper>

              <S.CardMiddle>
                <S.CardTitle>{r.title}</S.CardTitle>
                <S.CardDetail>{r.detail}</S.CardDetail>
                {r.reason && (
                  <S.CardDetail>
                    Lý do: <strong>{r.reason}</strong>
                  </S.CardDetail>
                )}

                {r.type === 'medication' && r.medicines && r.medicines.length > 1 && (
                  <S.MedicinesListContainer>
                    {r.medicines.map((med, index) => (
                      <S.NestedMedicineRow key={index}>
                        <S.NestedLeft>
                          <S.NestedIndexBadge>{index + 1}</S.NestedIndexBadge>
                          <S.NestedName>{med.name}</S.NestedName>
                        </S.NestedLeft>
                        <S.NestedRight>
                          <S.DosagePill>+ {med.dosage}</S.DosagePill>
                          {med.timeToTake && (
                            <S.TimePill>
                              <IconSchedule size={12} /> {med.timeToTake}
                            </S.TimePill>
                          )}
                        </S.NestedRight>
                      </S.NestedMedicineRow>
                    ))}
                  </S.MedicinesListContainer>
                )}

                {r.type === 'medication' && (!r.medicines || r.medicines.length <= 1) && (r.dosage || r.timeToTake) && (
                  <S.CardPills>
                    {r.dosage && <S.DosagePill>+ Liều: {r.dosage}</S.DosagePill>}
                    {r.timeToTake && (
                      <S.TimePill>
                        <IconSchedule size={12} /> {r.timeToTake}
                      </S.TimePill>
                    )}
                  </S.CardPills>
                )}

                <S.CardTimeMeta>
                  Gửi: {r.sentTime}
                </S.CardTimeMeta>

                {r.note && <S.CardNote>Ghi chú của bạn: "{r.note}"</S.CardNote>}
              </S.CardMiddle>

              <S.CardRight>
                <S.StatusBadge $status={r.status}>
                  {r.status === 'pending' && '⏱ Chờ phản hồi'}
                  {r.status === 'approved' && '✓ Đã duyệt'}
                  {r.status === 'completed' && '✓ Đã cho uống'}
                  {r.status === 'rejected' && '✕ Từ chối'}
                  {r.status === 'cancelled' && '✕ Đã hủy'}
                </S.StatusBadge>

                <S.CardActions>
                  <S.BtnDetail onClick={() => handleShowDetail(r)}>👁 Chi tiết</S.BtnDetail>
                  {r.status === 'pending' && (
                    <S.BtnCancel onClick={() => handleCancelRequest(r.id)}>✕ Hủy đơn</S.BtnCancel>
                  )}
                </S.CardActions>
              </S.CardRight>
            </S.RequestCard>
          ))}
        </S.CardList>
      ) : (
        <S.EmptyState>
          <IconRequest size={48} />
          <div>Không tìm thấy đơn nào phù hợp với tìm kiếm của bạn.</div>
        </S.EmptyState>
      )}

      {/* Popups */}
      {activeStudent && (
        <>
          <LeaveRequestPopup
            isOpen={isLeavePopupOpen}
            onClose={() => setIsLeavePopupOpen(false)}
            onSubmitSuccess={fetchRequests}
            studentName={activeStudent.fullName}
            className={activeStudent.className}
          />

          <MedicationRequestPopup
            isOpen={isMedicationPopupOpen}
            onClose={() => setIsMedicationPopupOpen(false)}
            onSubmitSuccess={fetchRequests}
            studentName={activeStudent.fullName}
            className={activeStudent.className}
          />
        </>
      )}
    </S.PageContainer>
  );
};
