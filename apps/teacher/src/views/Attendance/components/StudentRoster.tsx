import React from 'react';
import { Search, Bell, Download, Camera } from 'lucide-react';
import * as S from '../styles';
import { Student } from '../../../config/types/attendance';
import { ST } from '../constants';
import { getAvatarGrad, getStatusKey } from '../utils';

interface StudentRosterProps {
  className: string;
  statusFilter: 'all' | 'present' | 'excused' | 'unexcused' | 'absent';
  setStatusFilter: React.Dispatch<React.SetStateAction<'all' | 'present' | 'excused' | 'unexcused' | 'absent'>>;
  cPresent: number;
  cExcused: number;
  cUnexcused: number;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  sortedStudents: Student[];
  imageErrors: Record<string, boolean>;
  setImageErrors: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  openMenuId: string | null;
  setOpenMenuId: React.Dispatch<React.SetStateAction<string | null>>;
  menuStage: 'options' | 'reason';
  setMenuStage: React.Dispatch<React.SetStateAction<'options' | 'reason'>>;
  reasonDraft: string;
  setReasonDraft: React.Dispatch<React.SetStateAction<string>>;
  popoverRef: React.RefObject<HTMLDivElement | null>;
  pendingLeavesCount: number;
  onOpenLeaveDrawer: () => void;
  onOpenPhotoScanner: () => void;
  onExportCSV: () => void;
  onUpdateStatus: (studentId: string, newStatus: string, reason?: string) => void;
  onReasonSubmit: (e: React.FormEvent) => void;
}

export const StudentRoster: React.FC<StudentRosterProps> = ({
  className,
  statusFilter,
  setStatusFilter,
  cPresent,
  cExcused,
  cUnexcused,
  query,
  setQuery,
  sortedStudents,
  imageErrors,
  setImageErrors,
  openMenuId,
  setOpenMenuId,
  menuStage,
  setMenuStage,
  reasonDraft,
  setReasonDraft,
  popoverRef,
  pendingLeavesCount,
  onOpenLeaveDrawer,
  onOpenPhotoScanner,
  onExportCSV,
  onUpdateStatus,
  onReasonSubmit,
}) => {
  return (
    <S.RightContent>
      <S.HeroSection style={{ padding: '24px' }}>
        <S.HeroLeft>
          <S.HeroTitle style={{ fontSize: '22px' }}>Điểm danh lớp {className || '...'}</S.HeroTitle>
          <S.HeroSubtitle style={{ fontSize: '13px' }}>Tiến độ điểm danh hôm nay</S.HeroSubtitle>
        </S.HeroLeft>
        <S.HeroRight>
          <S.QrBtn onClick={onOpenPhotoScanner} style={{ background: '#059669', color: '#fff', borderColor: '#059669', height: '40px', borderRadius: '12px', padding: '0 16px', fontSize: '13.5px' }}>
            <Camera size={16} /> Chụp ảnh điểm danh
          </S.QrBtn>
          <S.LeaveBtn onClick={onOpenLeaveDrawer} style={{ height: '40px', borderRadius: '12px', padding: '0 16px', fontSize: '13.5px' }}>
            <Bell size={16} />
            Đơn xin nghỉ
            {pendingLeavesCount > 0 && <S.LeaveBadge style={{ minWidth: '18px', height: '18px', fontSize: '11px' }}>{pendingLeavesCount}</S.LeaveBadge>}
          </S.LeaveBtn>
          <S.QrBtn onClick={onExportCSV} style={{ height: '40px', borderRadius: '12px', padding: '0 16px', fontSize: '13.5px' }}>
            <Download size={16} /> Xuất dữ liệu
          </S.QrBtn>
        </S.HeroRight>
      </S.HeroSection>

      <S.ListSection>
        <S.ListHeader>
          <S.ListTitle>Danh sách lớp</S.ListTitle>
          <S.FilterGroup>
            <S.FilterBtn $active={statusFilter === 'all'} onClick={() => setStatusFilter('all')}>Tất cả</S.FilterBtn>
            <S.FilterBtn $active={statusFilter === 'present'} onClick={() => setStatusFilter('present')}>Có mặt ({cPresent})</S.FilterBtn>
            <S.FilterBtn $active={statusFilter === 'excused'} onClick={() => setStatusFilter('excused')}>Có phép ({cExcused})</S.FilterBtn>
            <S.FilterBtn $active={statusFilter === 'unexcused'} onClick={() => setStatusFilter('unexcused')}>Không phép ({cUnexcused})</S.FilterBtn>
          </S.FilterGroup>
          <div style={{ flex: 1 }} />
          <S.SearchBox>
            <Search size={16} color="#9CA3AF" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Tìm bé..."
            />
          </S.SearchBox>
        </S.ListHeader>

        <S.TableHeader>
          <span>Học sinh</span>
          <span>Giờ đến</span>
          <span>Trạng thái</span>
          <span>Ghi chú</span>
        </S.TableHeader>

        <div style={{ maxHeight: '64vh', overflowY: 'auto', paddingRight: '4px' }} className="custom-scroll">
          <style>{`
            .custom-scroll::-webkit-scrollbar { width: 6px; }
            .custom-scroll::-webkit-scrollbar-track { background: transparent; }
            .custom-scroll::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 99px; }
          `}</style>
          {sortedStudents.length === 0 ? (
            <div style={{ padding: '60px 20px', textAlign: 'center', color: '#9CA3AF' }}>
              <span style={{ fontSize: '40px', display: 'block', marginBottom: '12px' }}>🔍</span>
              <span style={{ fontWeight: 600 }}>Không tìm thấy học sinh phù hợp.</span>
            </div>
          ) : (
            sortedStudents.map((s) => {
              const sk = getStatusKey(s);
              const st = ST[sk];
              const grad = getAvatarGrad(s.name);

              return (
                <S.TableRow key={s.id}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <S.StudentAvatar $grad={grad}>
                      {s.avatar && !imageErrors[s.id] ? (
                        <S.AvatarImg src={s.avatar} onError={() => setImageErrors(prev => ({ ...prev, [s.id]: true }))} />
                      ) : (
                        (() => {
                          const parts = s.name.split(' ').filter(Boolean);
                          return parts.map(p => p[0]).slice(-2).join('').toUpperCase();
                        })()
                      )}
                    </S.StudentAvatar>
                    <div>
                      <S.StudentName>{s.name}</S.StudentName>
                      <S.StudentCode>{s.id.substring(0, 8)}</S.StudentCode>
                      <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                        <span title="Ảnh nhận (Dropoff)"><Camera size={14} color={s.dropoffImage ? '#10B981' : '#D1D5DB'} /></span>
                        <span title="Ảnh trả (Pickup)"><Camera size={14} color={s.pickupImage ? '#10B981' : '#D1D5DB'} /></span>
                      </div>
                    </div>
                  </div>

                  <div style={{ fontSize: '13.5px', fontWeight: 600, color: sk === 'present' ? '#1F2937' : '#D1D5DB' }}>
                    {sk === 'present' && s.arrivalTime && s.arrivalTime !== '--:--' ? s.arrivalTime : '—'}
                  </div>

                  <div style={{ position: 'relative' }}>
                    <S.StatusBadgeBtn
                      className="badge-btn"
                      $bg={st.bg}
                      $color={st.c}
                      $bd={st.bd}
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(s.id);
                        setMenuStage('options');
                      }}
                    >
                      <S.StatusDot $color={st.dot} />
                      {st.label}
                    </S.StatusBadgeBtn>

                    {openMenuId === s.id && (
                      <S.PopoverOverlay ref={popoverRef}>
                        {menuStage === 'options' ? (
                          <>
                            <S.PopoverItem onClick={() => onUpdateStatus(s.id, 'Present')}>
                              <S.StatusDot $color="#005A36" /> Có mặt
                            </S.PopoverItem>
                            <S.PopoverItem onClick={() => { setReasonDraft(s.healthNote || ''); setMenuStage('reason'); }}>
                              <S.StatusDot $color="#9CA3AF" /> Vắng có phép
                            </S.PopoverItem>
                            <S.PopoverItem onClick={() => onUpdateStatus(s.id, 'Absent')}>
                              <S.StatusDot $color="#DC2626" /> Vắng không phép
                            </S.PopoverItem>
                          </>
                        ) : (
                          <S.PopoverReasonContainer>
                            <div style={{ fontSize: '12px', fontWeight: 700, color: '#6B7280' }}>Lý do xin phép</div>
                            <S.PopoverInput
                              autoFocus
                              value={reasonDraft}
                              onChange={e => setReasonDraft(e.target.value)}
                              placeholder="Nhập lý do..."
                            />
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <S.PopoverSaveButton onClick={onReasonSubmit} disabled={!reasonDraft.trim()}>Lưu</S.PopoverSaveButton>
                              <S.PopoverSaveButton style={{ background: '#F3F4F6', color: '#4B5563' }} onClick={() => setOpenMenuId(null)}>Hủy</S.PopoverSaveButton>
                            </div>
                          </S.PopoverReasonContainer>
                        )}
                      </S.PopoverOverlay>
                    )}
                  </div>

                  <div style={{ fontSize: '13px', color: '#6B7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {s.healthNote || s.leaveRequestReason || '—'}
                  </div>
                </S.TableRow>
              );
            })
          )}
        </div>
      </S.ListSection>
    </S.RightContent>
  );
};
