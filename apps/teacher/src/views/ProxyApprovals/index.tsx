import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@kindercare/core';
import { toast } from 'react-toastify';
import { ShieldCheck, UserCheck, X, FileText, Phone, CreditCard, Calendar, Clock } from 'lucide-react';
import * as S from './styles';

export type ProxyStatus = 'Pending' | 'Approved' | 'Rejected';

export interface ProxyAuthorization {
  AuthorizationID: number;
  StudentID: number;
  StudentName: string;
  ParentID: number;
  ParentName: string;
  AuthorizationDate: string;
  ProxyName: string;
  ProxyPhone: string;
  ProxyIDCard: string;
  ProxyPhotoURL: string;
  Notes: string;
  Status: ProxyStatus;
  CreatedAt: number;
  ProcessedBy?: number; // teacher ID who processed
}

function normalizePhotoUrl(url: string | null | undefined): string {
  if (!url) return 'https://ui-avatars.com/api/?name=Unknown&background=e5e7eb&color=374151&size=150';
  if (url.startsWith('http') || url.startsWith('data:')) return url;
  // Relative path → prepend media host
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://web-test.kindercare.app/api/v1';
  const host = apiBase.split('/api')[0];
  return `${host}/${url.replace(/^\//, '')}`;
}

export const ProxyApprovalList: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedRequest, setSelectedRequest] = useState<ProxyAuthorization | null>(null);
  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');

  // Fetch all authorizations — pass status=Pending to BE for server-side filtering
  // (mock ignores it; real BE should filter)
  const { data: requests, isLoading } = useQuery<ProxyAuthorization[]>({
    queryKey: ['proxyApprovals', activeTab],
    queryFn: async () => {
      // Only fetch Pending for the pending tab; for history, fetch all
      const params: Record<string, string> = {};
      if (activeTab === 'pending') {
        params.status = 'Pending';
      }
      const res = await apiClient.get('/teacher/proxy-approvals', { params });
      return (res.data?.data || []).map((item: ProxyAuthorization) => ({
        ...item,
        ProxyPhotoURL: normalizePhotoUrl(item.ProxyPhotoURL),
      }));
    },
    refetchInterval: 3000,
  });

  // Re-usable Mutation to Approve or Reject
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: 'Approved' | 'Rejected' }) => {
      const res = await apiClient.patch('/teacher/proxy-approvals', {
        authorizationId: id,
        status: status,
      });
      return res.data;
    },
    onSuccess: (_, variables) => {
      toast.success(
        variables.status === 'Approved'
          ? 'Đã duyệt yêu cầu đón hộ thành công!'
          : 'Đã từ chối yêu cầu đón hộ.'
      );
      setSelectedRequest(null);
      queryClient.invalidateQueries({ queryKey: ['proxyApprovals'] });
    },
    onError: (err: any) => {
      const errMsg =
        err?.response?.data?.error ||
        err?.data?.error ||
        'Có lỗi xảy ra khi xử lý yêu cầu';
      toast.error(errMsg);
    },
  });

  const handleProcess = (status: 'Approved' | 'Rejected') => {
    if (!selectedRequest) return;
    updateStatusMutation.mutate({
      id: selectedRequest.AuthorizationID,
      status: status,
    });
  };

  if (isLoading) {
    return (
      <S.Container>
        <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
          Đang tải yêu cầu đón hộ...
        </div>
      </S.Container>
    );
  }

  const allRequests = requests || [];
  // For history tab, filter client-side since BE may not support status=Approved+Rejected combined
  const pendingRequests =
    activeTab === 'pending' ? allRequests.filter((r) => r.Status === 'Pending') : [];
  const historyRequests =
    activeTab === 'history'
      ? allRequests.filter((r) => r.Status === 'Approved' || r.Status === 'Rejected')
      : [];

  const currentList = activeTab === 'pending' ? pendingRequests : historyRequests;

  return (
    <S.Container>
      {/* Hero Header */}
      <S.HeroSection>
        <S.HeroBgOverlay />
        <S.HeroContent>
          <S.HeroText>
            <S.HeroSubtitle>Đăng ký đón bé hộ</S.HeroSubtitle>
            <S.HeroTitle>Duyệt Ủy Quyền Đón Hộ</S.HeroTitle>
            <S.HeroDesc>
              Giáo viên chủ nhiệm kiểm tra thông tin, ảnh căn cước công dân và xác nhận người đón hộ được phụ huynh uỷ quyền.
            </S.HeroDesc>
          </S.HeroText>
        </S.HeroContent>
      </S.HeroSection>

      {/* Tabs Selector */}
      <S.TabRow>
        <S.TabButton $active={activeTab === 'pending'} onClick={() => setActiveTab('pending')}>
          Chờ duyệt
          <S.TabBadge $active={activeTab === 'pending'}>{pendingRequests.length}</S.TabBadge>
        </S.TabButton>
        <S.TabButton $active={activeTab === 'history'} onClick={() => setActiveTab('history')}>
          Lịch sử duyệt
          <S.TabBadge $active={activeTab === 'history'}>{historyRequests.length}</S.TabBadge>
        </S.TabButton>
      </S.TabRow>

      {/* Requests Grid */}
      {currentList.length === 0 ? (
        <S.EmptyState>
          <UserCheck size={40} color="#9CA3AF" />
          <h3>{activeTab === 'pending' ? 'Không có yêu cầu chờ duyệt' : 'Lịch sử trống'}</h3>
          <p>
            {activeTab === 'pending'
              ? 'Tất cả các yêu cầu đăng ký đón hộ đã được xử lý hoàn tất.'
              : 'Chưa có yêu cầu đón hộ nào được phê duyệt hay từ chối.'}
          </p>
        </S.EmptyState>
      ) : (
        <S.Grid>
          {currentList.map((req) => (
            <S.Card key={req.AuthorizationID}>
              <S.CardHeader>
                <S.StudentInfo>
                  <S.StudentName>Bé: {req.StudentName}</S.StudentName>
                  <S.ParentName>PH: {req.ParentName}</S.ParentName>
                </S.StudentInfo>
                {req.Status === 'Pending' ? (
                  <S.Badge>Chờ duyệt</S.Badge>
                ) : (
                  <S.HistoryStatusBadge $status={req.Status}>
                    {req.Status === 'Approved' ? 'Đã duyệt' : 'Từ chối'}
                  </S.HistoryStatusBadge>
                )}
              </S.CardHeader>

              <S.CardBody>
                <S.AvatarBox>
                  <img src={req.ProxyPhotoURL} alt={req.ProxyName} />
                </S.AvatarBox>
                <S.ProxyDetails>
                  <S.ProxyName>{req.ProxyName}</S.ProxyName>
                  <S.ProxyMeta>
                    <Phone size={12} /> {req.ProxyPhone}
                  </S.ProxyMeta>
                  <S.ProxyMeta>
                    <Calendar size={12} /> Ngày đón: {req.AuthorizationDate}
                  </S.ProxyMeta>
                </S.ProxyDetails>
              </S.CardBody>

              {req.Notes && <S.NotesText>📝 {req.Notes}</S.NotesText>}

              <S.ActionBtn onClick={() => setSelectedRequest(req)}>
                {req.Status === 'Pending' ? 'Xem chi tiết & Duyệt' : 'Xem thông tin'}
              </S.ActionBtn>
            </S.Card>
          ))}
        </S.Grid>
      )}

      {/* Proxy Details Modal */}
      {selectedRequest && (
        <S.ModalBackdrop onClick={() => setSelectedRequest(null)}>
          <S.ModalBox onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitle>Chi tiết Đăng ký Đón hộ</S.ModalTitle>
              <S.CloseBtn onClick={() => setSelectedRequest(null)}>
                <X size={20} />
              </S.CloseBtn>
            </S.ModalHeader>

            <S.ModalBody>
              {/* Photo */}
              <S.LargePhoto>
                <img src={selectedRequest.ProxyPhotoURL} alt={selectedRequest.ProxyName} />
              </S.LargePhoto>

              {/* Meta information */}
              <S.MetaGrid>
                <S.MetaField>
                  <S.Label>Học sinh</S.Label>
                  <S.Value>{selectedRequest.StudentName}</S.Value>
                </S.MetaField>
                <S.MetaField>
                  <S.Label>Phụ huynh ủy quyền</S.Label>
                  <S.Value>{selectedRequest.ParentName}</S.Value>
                </S.MetaField>
                <S.MetaField>
                  <S.Label>Họ tên người đón</S.Label>
                  <S.Value>{selectedRequest.ProxyName}</S.Value>
                </S.MetaField>
                <S.MetaField>
                  <S.Label>Số điện thoại</S.Label>
                  <S.Value>{selectedRequest.ProxyPhone}</S.Value>
                </S.MetaField>
                <S.MetaField style={{ gridColumn: 'span 2' }}>
                  <S.Label>Số CMND/CCCD</S.Label>
                  <S.Value style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CreditCard size={15} /> {selectedRequest.ProxyIDCard}
                  </S.Value>
                </S.MetaField>
                <S.MetaField style={{ gridColumn: 'span 2' }}>
                  <S.Label>Ngày đón bé</S.Label>
                  <S.Value>{selectedRequest.AuthorizationDate}</S.Value>
                </S.MetaField>
                <S.MetaField style={{ gridColumn: 'span 2' }}>
                  <S.Label>Trạng thái</S.Label>
                  <S.Value>
                    {selectedRequest.Status === 'Pending' ? (
                      <span style={{ color: '#D97706', fontWeight: 800 }}>⏳ Đang chờ duyệt</span>
                    ) : selectedRequest.Status === 'Approved' ? (
                      <span style={{ color: '#059669', fontWeight: 800 }}>
                        ✅ Đã phê duyệt
                      </span>
                    ) : (
                      <span style={{ color: '#DC2626', fontWeight: 800 }}>❌ Đã từ chối</span>
                    )}
                  </S.Value>
                </S.MetaField>
              </S.MetaGrid>

              {/* Notes */}
              {selectedRequest.Notes && (
                <S.MetaField>
                  <S.Label>Ghi chú của Phụ huynh</S.Label>
                  <S.NotesText>📝 {selectedRequest.Notes}</S.NotesText>
                </S.MetaField>
              )}
            </S.ModalBody>

            <S.ModalFooter>
              {selectedRequest.Status === 'Pending' ? (
                <>
                  <S.RejectBtn
                    onClick={() => handleProcess('Rejected')}
                    disabled={updateStatusMutation.isPending}
                  >
                    {updateStatusMutation.isPending ? 'Đang xử lý...' : 'Từ chối'}
                  </S.RejectBtn>
                  <S.ApproveBtn
                    onClick={() => handleProcess('Approved')}
                    disabled={updateStatusMutation.isPending}
                  >
                    {updateStatusMutation.isPending ? 'Đang xử lý...' : 'Duyệt đơn'}
                  </S.ApproveBtn>
                </>
              ) : (
                <S.ApproveBtn onClick={() => setSelectedRequest(null)}>Đóng lại</S.ApproveBtn>
              )}
            </S.ModalFooter>
          </S.ModalBox>
        </S.ModalBackdrop>
      )}
    </S.Container>
  );
};
