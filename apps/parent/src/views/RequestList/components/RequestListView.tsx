import React from 'react';
import * as S from '../styles';
import { Dropdown } from '@kindercare/ui';
import { IconPlus, IconMedicine, IconRequest, IconSchedule } from '@/assets/icons/dashboard';
import { RequestItem } from '../types';

/**
 * Props for RequestListView component.
 */
interface RequestListViewProps {
  /** List of requests filtered by active tab and status */
  filteredRequests: RequestItem[];
  /** Loading state flag representing API request status */
  loading: boolean;
  /** Name of the active student context */
  studentName: string;
  /** Aggregated statistics for request statuses and types */
  stats: {
    pending: number;
    approvedOrCompleted: number;
    total: number;
    leaveCount: number;
    medicationCount: number;
  };
  /** Currently selected type tab filter */
  activeTab: 'all' | 'leave' | 'medication';
  /** Callback to switch active type tab filter */
  setActiveTab: (tab: 'all' | 'leave' | 'medication') => void;
  /** Currently selected status filter */
  activeStatusFilter: 'all' | 'pending' | 'approved_completed' | 'rejected' | 'cancelled';
  /** Callback to switch active status filter */
  setActiveStatusFilter: (filter: 'all' | 'pending' | 'approved_completed' | 'rejected' | 'cancelled') => void;
  /** Callback triggered when user clicks to view a request detail page */
  onShowDetail: (r: RequestItem) => void;
  /** Callback triggered to cancel a pending request */
  onCancelRequest: (id: string) => void;
  /** Callback triggered when user clicks to create a new request */
  onCreateRequestClick: () => void;
}

/**
 * RequestListView renders the request manager panel including aggregated statistics pills,
 * filter tabs/dropdowns, and the request cards list.
 */
export const RequestListView: React.FC<RequestListViewProps> = ({
  filteredRequests,
  loading,
  studentName,
  stats,
  activeTab,
  setActiveTab,
  activeStatusFilter,
  setActiveStatusFilter,
  onShowDetail,
  onCancelRequest,
  onCreateRequestClick,
}) => {
  return (
    <>
      {/* Header section */}
      <S.HeaderRow>
        <S.HeaderLeft>
          <S.PageTitle>Yêu cầu của phụ huynh</S.PageTitle>
          <S.PageSub>Theo dõi đơn xin nghỉ & dặn dò thuốc của {studentName}</S.PageSub>
        </S.HeaderLeft>

        <S.BtnPrimary onClick={onCreateRequestClick}>
          <IconPlus size={16} />
          Tạo yêu cầu
        </S.BtnPrimary>
      </S.HeaderRow>

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

      {/* Filter Row */}
      <S.FilterRow>
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

        <S.DropdownWrapper>
          <Dropdown
            value={activeStatusFilter}
            onChange={(value) => setActiveStatusFilter(value as any)}
            options={[
              { value: 'all', label: 'Tất cả trạng thái' },
              { value: 'pending', label: 'Chờ phản hồi' },
              { value: 'approved_completed', label: 'Đã duyệt / xác nhận' },
              { value: 'rejected', label: 'Từ chối' },
              { value: 'cancelled', label: 'Đã hủy' },
            ]}
            placeholder="Lọc theo trạng thái"
            fullWidth
          />
        </S.DropdownWrapper>
      </S.FilterRow>

      {/* Cards List */}
      {loading ? (
        <S.LoadingContainer>
          <S.LoadingIcon>🌀</S.LoadingIcon>
          Đang tải danh sách đơn...
        </S.LoadingContainer>
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
                  <S.BtnDetail onClick={() => onShowDetail(r)}>👁 Chi tiết</S.BtnDetail>
                  {r.status === 'pending' && (
                    <S.BtnCancel onClick={() => onCancelRequest(r.id)}>✕ Hủy đơn</S.BtnCancel>
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
    </>
  );
};
