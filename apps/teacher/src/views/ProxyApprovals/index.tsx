import React, { useState } from 'react';
import { useProxyAuthorizations, useProcessProxyAuthorization } from '@/hooks/useProxyAuthorizationQueries';
import { ShieldCheck, UserCheck, X, Phone, CreditCard, Calendar } from 'lucide-react';
import * as S from './styles';

export const ProxyApprovalList: React.FC = () => {
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');

  const { data: pendingData, isLoading: loadingPending } = useProxyAuthorizations('Pending');
  const { data: historyData, isLoading: loadingHistory } = useProxyAuthorizations();
  const updateMutation = useProcessProxyAuthorization();

  const pendingList = (pendingData || []).filter((r) => r.status === 'Pending');
  const historyList = (historyData || []).filter(
    (r) => r.status === 'Approved' || r.status === 'Rejected'
  );

  const currentList = activeTab === 'pending' ? pendingList : historyList;
  const isLoading = activeTab === 'pending' ? loadingPending : loadingHistory;

  const handleProcess = (status: 'Approved' | 'Rejected') => {
    if (!selectedRequest) return;
    updateMutation.mutate({
      authorizationId: selectedRequest.authorizationId,
      status,
    });
    setSelectedRequest(null);
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

      {/* Tabs */}
      <S.TabRow>
        <S.TabButton $active={activeTab === 'pending'} onClick={() => setActiveTab('pending')}>
          Chờ duyệt
          <S.TabBadge $active={activeTab === 'pending'}>{pendingList.length}</S.TabBadge>
        </S.TabButton>
        <S.TabButton $active={activeTab === 'history'} onClick={() => setActiveTab('history')}>
          Lịch sử duyệt
          <S.TabBadge $active={activeTab === 'history'}>{historyList.length}</S.TabBadge>
        </S.TabButton>
      </S.TabRow>

      {/* Grid */}
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
            <S.Card key={req.authorizationId}>
              <S.CardHeader>
                <S.StudentInfo>
                  <S.StudentName>Bé: {req.studentName}</S.StudentName>
                  <S.ParentName>PH: {req.parentName}</S.ParentName>
                </S.StudentInfo>
                {req.status === 'Pending' ? (
                  <S.Badge>Chờ duyệt</S.Badge>
                ) : (
                  <S.HistoryStatusBadge $status={req.status}>
                    {req.status === 'Approved' ? 'Đã duyệt' : 'Từ chối'}
                  </S.HistoryStatusBadge>
                )}
              </S.CardHeader>

              <S.CardBody>
                <S.AvatarBox>
                  <img src={req.proxyPhotoUrl} alt={req.proxyName} />
                </S.AvatarBox>
                <S.ProxyDetails>
                  <S.ProxyName>{req.proxyName}</S.ProxyName>
                  <S.ProxyMeta>
                    <Phone size={12} /> {req.proxyPhone}
                  </S.ProxyMeta>
                  <S.ProxyMeta>
                    <Calendar size={12} /> Ngày đón: {req.authorizationDate}
                  </S.ProxyMeta>
                  <S.ProxyMeta>
                    <UserCheck size={12} /> Hình thức: {
                      (req.type || '').toLowerCase() === 'checkin' ? 'Đưa bé đến' :
                      (req.type || '').toLowerCase() === 'checkout' ? 'Đón bé về' : 'Đưa và đón'
                    }
                  </S.ProxyMeta>
                </S.ProxyDetails>
              </S.CardBody>

              {req.notes && <S.NotesText>📝 {req.notes}</S.NotesText>}

              <S.ActionBtn onClick={() => setSelectedRequest(req)}>
                {req.status === 'Pending' ? 'Xem chi tiết & Duyệt' : 'Xem thông tin'}
              </S.ActionBtn>
            </S.Card>
          ))}
        </S.Grid>
      )}

      {/* Modal */}
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
              <S.LargePhoto>
                <img src={selectedRequest.proxyPhotoUrl} alt={selectedRequest.proxyName} />
              </S.LargePhoto>

              <S.MetaGrid>
                <S.MetaField>
                  <S.Label>Học sinh</S.Label>
                  <S.Value>{selectedRequest.studentName}</S.Value>
                </S.MetaField>
                <S.MetaField>
                  <S.Label>Phụ huynh ủy quyền</S.Label>
                  <S.Value>{selectedRequest.parentName}</S.Value>
                </S.MetaField>
                <S.MetaField>
                  <S.Label>Họ tên người đón</S.Label>
                  <S.Value>{selectedRequest.proxyName}</S.Value>
                </S.MetaField>
                <S.MetaField>
                  <S.Label>Số điện thoại</S.Label>
                  <S.Value>{selectedRequest.proxyPhone}</S.Value>
                </S.MetaField>
                <S.MetaField style={{ gridColumn: 'span 2' }}>
                  <S.Label>Số CMND/CCCD</S.Label>
                  <S.Value style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CreditCard size={15} /> {selectedRequest.proxyIdCard}
                  </S.Value>
                </S.MetaField>
                <S.MetaField style={{ gridColumn: 'span 2' }}>
                  <S.Label>Ngày thực hiện</S.Label>
                  <S.Value>{selectedRequest.authorizationDate}</S.Value>
                </S.MetaField>
                <S.MetaField style={{ gridColumn: 'span 2' }}>
                  <S.Label>Hình thức đăng ký</S.Label>
                  <S.Value style={{ color: '#005A36', fontWeight: 600 }}>
                    {
                      (selectedRequest.type || '').toLowerCase() === 'checkin' ? 'Đưa bé đến' :
                      (selectedRequest.type || '').toLowerCase() === 'checkout' ? 'Đón bé về' : 'Cả ngày (Đưa và Đón)'
                    }
                  </S.Value>
                </S.MetaField>
                <S.MetaField style={{ gridColumn: 'span 2' }}>
                  <S.Label>Trạng thái</S.Label>
                  <S.Value>
                    {selectedRequest.status === 'Pending' ? (
                      <span style={{ color: '#D97706', fontWeight: 800 }}>⏳ Đang chờ duyệt</span>
                    ) : selectedRequest.status === 'Approved' ? (
                      <span style={{ color: '#059669', fontWeight: 800 }}>
                        ✅ Đã phê duyệt
                      </span>
                    ) : (
                      <span style={{ color: '#DC2626', fontWeight: 800 }}>❌ Đã từ chối</span>
                    )}
                  </S.Value>
                </S.MetaField>
              </S.MetaGrid>

              {selectedRequest.notes && (
                <S.MetaField>
                  <S.Label>Ghi chú của Phụ huynh</S.Label>
                  <S.NotesText>📝 {selectedRequest.notes}</S.NotesText>
                </S.MetaField>
              )}
            </S.ModalBody>

            <S.ModalFooter>
              {selectedRequest.status === 'Pending' ? (
                <>
                  <S.RejectBtn
                    onClick={() => handleProcess('Rejected')}
                    disabled={updateMutation.isPending}
                  >
                    {updateMutation.isPending ? '�ang xử lý...' : 'Từ chối'}
                  </S.RejectBtn>
                  <S.ApproveBtn
                    onClick={() => handleProcess('Approved')}
                    disabled={updateMutation.isPending}
                  >
                    {updateMutation.isPending ? 'Đang xử lý...' : 'Duyệt đơn'}
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
