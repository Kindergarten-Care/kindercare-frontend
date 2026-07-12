import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@kindercare/core';
import { toast } from 'react-toastify';
import { ShieldCheck, UserCheck, X, FileText, Phone, CreditCard, Calendar, Clock } from 'lucide-react';
import * as S from './styles';

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
  Status: 'Pending' | 'Approved' | 'Rejected';
  CreatedAt: number;
}

export const ProxyApprovalList: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedRequest, setSelectedRequest] = useState<ProxyAuthorization | null>(null);
  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');

  // Fetch all authorizations with 3-second smart polling interval
  const { data: requests, isLoading } = useQuery<ProxyAuthorization[]>({
    queryKey: ['proxyApprovals'],
    queryFn: async () => {
      const res = await apiClient.get('/teacher/proxy-approvals');
      return res.data?.data || [];
    },
    refetchInterval: 3000, // 3 seconds polling
  });

  // Re-usable Mutation to Approve or Reject
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: 'Approved' | 'Rejected' }) => {
      const res = await apiClient.patch('/teacher/proxy-approvals', {
        authorizationId: id,
        status: status
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
      // Invalidate query to refresh list
      queryClient.invalidateQueries({ queryKey: ['proxyApprovals'] });
    },
    onError: (err: any) => {
      const errMsg = err?.response?.data?.error || 'Có lỗi xảy ra khi xử lý yêu cầu';
      toast.error(errMsg);
    }
  });

  const handleProcess = (status: 'Approved' | 'Rejected') => {
    if (!selectedRequest) return;
    updateStatusMutation.mutate({
      id: selectedRequest.AuthorizationID,
      status: status
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
  const pendingRequests = allRequests.filter(r => r.Status === 'Pending');
  const historyRequests = allRequests.filter(r => r.Status === 'Approved' || r.Status === 'Rejected');
  
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
                      <span style={{ color: '#059669', fontWeight: 800 }}>✅ Đã phê duyệt</span>
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
                <S.ApproveBtn onClick={() => setSelectedRequest(null)}>
                  Đóng lại
                </S.ApproveBtn>
              )}
            </S.ModalFooter>
          </S.ModalBox>
        </S.ModalBackdrop>
      )}
    </S.Container>
  );
};
