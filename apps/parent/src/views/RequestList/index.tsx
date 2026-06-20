'use client';

import React, { useState, useMemo } from 'react';
import * as S from './styles';
import { useStudent } from '@/contexts/StudentContext';
import { toast } from '@kindercare/ui';
import {
  IconSearch, IconBell, IconPlus, IconMedicine, IconRequest, IconSchedule
} from '@/assets/icons/dashboard';
import LeaveRequestPopup from '@/views/ParentDashboard/components/LeaveRequestPopup';
import MedicationRequestPopup from '@/views/ParentDashboard/components/MedicationRequestPopup';

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
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  color: string;
  bg: string;
}

const INITIAL_REQUESTS: RequestItem[] = [
  {
    id: 'r1',
    type: 'leave',
    title: 'Đơn xin nghỉ',
    detail: 'Xin nghỉ ngày 15/06/2026',
    reason: 'Khám sức khỏe định kỳ',
    sentTime: 'Hôm nay · 08:10',
    note: 'Bé đi khám tổng quát buổi sáng, chiều có thể đến lớp ạ.',
    status: 'pending',
    color: '#2563eb', // Blue
    bg: '#eff6ff',
  },
  {
    id: 'r2',
    type: 'medication',
    title: 'Dặn dò thuốc',
    detail: 'Dặn cô cho bé uống Siro ho Prospan',
    dosage: '5 ml',
    timeToTake: 'Sau ăn trưa (11:00)',
    sentTime: 'Hôm nay · 07:32',
    note: 'Bé ho nhiều từ sáng, nhờ cô cho uống sau khi ăn trưa giúp em.',
    status: 'pending',
    color: '#ea580c', // Orange
    bg: '#fff7ed',
  },
  {
    id: 'r3',
    type: 'medication',
    title: 'Dặn dò thuốc',
    detail: 'Dặn cô cho bé uống Men tiêu hóa Enterogermina',
    dosage: '1 ống',
    timeToTake: 'Sau ăn sáng (08:30)',
    sentTime: 'Hôm qua · 06:40',
    note: 'Nhờ cô cho uống thuốc trước ăn sáng 15 phút. Cảm ơn cô.',
    status: 'completed',
    color: '#ea580c',
    bg: '#fff7ed',
  },
  {
    id: 'r4',
    type: 'leave',
    title: 'Đơn xin nghỉ',
    detail: 'Xin nghỉ từ ngày 10/06/2026 đến 12/06/2026',
    reason: 'Gia đình có việc riêng về quê',
    sentTime: '09/06/2026 · 14:15',
    status: 'approved',
    color: '#2563eb',
    bg: '#eff6ff',
  },
  {
    id: 'r5',
    type: 'medication',
    title: 'Dặn dò thuốc',
    detail: 'Dặn cô cho bé uống Siro thảo dược Astex',
    dosage: '1 gói',
    timeToTake: 'Sau ăn trưa (11:30)',
    sentTime: '08/06/2026 · 07:15',
    status: 'completed',
    color: '#ea580c',
    bg: '#fff7ed',
  },
  {
    id: 'r6',
    type: 'leave',
    title: 'Đơn xin nghỉ',
    detail: 'Xin nghỉ ngày 02/06/2026',
    reason: 'Bé bị sốt phát ban',
    sentTime: '02/06/2026 · 06:30',
    status: 'approved',
    color: '#2563eb',
    bg: '#eff6ff',
  },
];

export const RequestList: React.FC = () => {
  const { activeStudent } = useStudent();
  const [requests, setRequests] = useState<RequestItem[]>(INITIAL_REQUESTS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'all' | 'leave' | 'medication'>('all');

  const [isLeavePopupOpen, setIsLeavePopupOpen] = useState<boolean>(false);
  const [isMedicationPopupOpen, setIsMedicationPopupOpen] = useState<boolean>(false);

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
    alert(
      `Chi tiết đơn:\n- Loại đơn: ${r.title}\n- Chi tiết: ${r.detail}\n` +
      (r.reason ? `- Lý do: ${r.reason}\n` : '') +
      (r.dosage ? `- Liều dùng: ${r.dosage}\n` : '') +
      (r.timeToTake ? `- Thời gian uống: ${r.timeToTake}\n` : '') +
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
      {filteredRequests.length > 0 ? (
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

                {r.type === 'medication' && (r.dosage || r.timeToTake) && (
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
            studentName={activeStudent.fullName}
            className={activeStudent.className}
          />

          <MedicationRequestPopup
            isOpen={isMedicationPopupOpen}
            onClose={() => setIsMedicationPopupOpen(false)}
            studentName={activeStudent.fullName}
            className={activeStudent.className}
          />
        </>
      )}
    </S.PageContainer>
  );
};
