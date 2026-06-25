import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { useTeacherProfile } from '@/hooks/useTeacherQueries';

export const TeacherProfileView: React.FC = () => {
  const { data: profile, isLoading } = useTeacherProfile();
  
  // Tab State
  const [activeTab, setActiveTab] = useState<'history' | 'settings' | 'classes'>('history');
  
  // Edit Modal State
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editDraft, setEditDraft] = useState<any>({});
  
  // Toasts
  const [toasts, setToasts] = useState<{id: string, text: string}[]>([]);

  useEffect(() => {
    if (profile) {
      setEditDraft({
        fullName: profile.fullName || '',
        phoneNumber: profile.phoneNumber || '',
        email: profile.email || '',
        address: profile.address || '',
        idCard: profile.idCard || '',
      });
    }
  }, [profile]);

  const addToast = (text: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, text }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  if (isLoading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Đang tải hồ sơ...</div>;
  }

  if (!profile) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Không có dữ liệu hồ sơ.</div>;
  }

  const formatDOB = (dobSeconds?: bigint | null) => {
    if (!dobSeconds) return 'Chưa cập nhật';
    return new Date(Number(dobSeconds) * 1000).toLocaleDateString('vi-VN');
  };

  // Mocked Timeline for History Tab
  const timeline = [
    { date: 'Tháng 8 / 2025', title: 'Thăng hạng Giáo viên Hạng II', desc: 'Xét thăng từ Hạng III lên Hạng II nhờ thành tích giảng dạy xuất sắc.', kind: 'up' },
    { date: 'Tháng 9 / 2023', title: 'Nhận chủ nhiệm Lớp Mầm 1', desc: 'Được phân công làm giáo viên chủ nhiệm chính lớp Mầm 1 (42 bé).', kind: 'role' },
    { date: 'Tháng 8 / 2021', title: 'Gia nhập KinderCare', desc: 'Bắt đầu công tác với vị trí Giáo viên Hạng III.', kind: 'join' },
    { date: 'Tháng 6 / 2021', title: 'Tốt nghiệp Đại học', desc: 'Ngành Giáo dục Mầm non, ĐH Sư phạm Đà Nẵng.', kind: 'edu' },
  ];

  const dotColors: any = { up: '#005A36', role: '#2563EB', join: '#005A36', edu: '#9CA3AF' };
  const glowColors: any = { up: '#C7E3D5', role: '#C7DBFB', join: '#E6F3ED', edu: '#E6EEE9' };
  const dateBgColors: any = { up: '#E6F3ED', role: '#E3EDFD', join: '#E6F3ED', edu: '#F1F4F1' };
  const dateTxtColors: any = { up: '#005A36', role: '#2563EB', join: '#005A36', edu: '#6B7280' };

  // Mocked Classes
  const classes = [
    { code: 'M1', name: 'Lớp Mầm 1', role: 'Giáo viên chủ nhiệm', count: 42, grad: 'linear-gradient(135deg,#34D399,#005A36)', href: '/teacher/classes' },
    { code: 'C2', name: 'Lớp Chồi 2', role: 'Giáo viên hỗ trợ', count: 38, grad: 'linear-gradient(135deg,#60A5FA,#2563EB)', href: '/teacher/classes' }
  ];

  const avatarInitial = profile.fullName ? profile.fullName.charAt(0).toUpperCase() : 'T';

  return (
    <S.Container>
      
      {/* HERO SECTION */}
      <S.HeroBox>
        <S.HeroCover>
          <S.CoverDeco />
          <div style={{ position: 'absolute', right: '22px', top: '18px', display: 'flex', gap: '9px' }}>
            <S.EditProfileButton onClick={() => setIsEditOpen(true)}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"></path>
              </svg>
              Chỉnh sửa hồ sơ
            </S.EditProfileButton>
          </div>
        </S.HeroCover>

        <S.IdentitySection>
          <S.AvatarWrapper>
            <S.AvatarInner>
              {profile.avatarUrl ? (
                <S.ProfileAvatar src={profile.avatarUrl} alt={profile.fullName} fill sizes="120px" />
              ) : (
                <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{avatarInitial}</span>
              )}
            </S.AvatarInner>
            <S.StatusDot />
          </S.AvatarWrapper>

          <div style={{ flex: 1, minWidth: 0, paddingBottom: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '11px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '27px', fontWeight: 800, letterSpacing: '-0.02em', color: '#1F2937', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                {profile.fullName}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 700, color: '#005A36', background: '#E6F3ED', border: '1px solid #C7E3D5', padding: '5px 13px', borderRadius: '999px' }}>
                ★ {profile.professionalRank || 'Giáo viên mầm non'}
              </span>
            </div>
            <div style={{ fontSize: '14px', color: '#6B7280', fontWeight: 500, marginTop: '5px' }}>
              Giáo viên chính
            </div>
          </div>

          <div style={{ display: 'flex', gap: '9px', paddingBottom: '6px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '12.5px', fontWeight: 600, color: '#374151', background: '#F4F8F5', border: '1px solid #E6EEE9', padding: '8px 13px', borderRadius: '10px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a' }}></span>
              {profile.workStatus === 'Active' ? 'Đang làm việc' : profile.workStatus}
            </span>
          </div>
        </S.IdentitySection>
      </S.HeroBox>

      {/* BENTO GRID */}
      <S.BentoGrid>
        
        {/* LEFT COLUMN */}
        <S.LeftCol>
          <S.BentoCard>
            <S.CardTitle style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Thông tin liên hệ</S.CardTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
              <S.ContactItem>
                <span style={{ flex: 'none', width: '34px', height: '34px', borderRadius: '10px', background: '#E3EDFD', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📞</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 600 }}>Số điện thoại</div>
                  <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#1F2937', marginTop: '1px' }}>{profile.phoneNumber || 'Chưa cập nhật'}</div>
                </div>
              </S.ContactItem>
              <S.ContactItem>
                <span style={{ flex: 'none', width: '34px', height: '34px', borderRadius: '10px', background: '#E3EDFD', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✉️</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 600 }}>Email</div>
                  <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#1F2937', marginTop: '1px', wordBreak: 'break-word' }}>{profile.email || 'Chưa cập nhật'}</div>
                </div>
              </S.ContactItem>
              <S.ContactItem>
                <span style={{ flex: 'none', width: '34px', height: '34px', borderRadius: '10px', background: '#E3EDFD', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🎂</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 600 }}>Ngày sinh</div>
                  <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#1F2937', marginTop: '1px' }}>{formatDOB(profile.dateOfBirth)}</div>
                </div>
              </S.ContactItem>
              <S.ContactItem>
                <span style={{ flex: 'none', width: '34px', height: '34px', borderRadius: '10px', background: '#E3EDFD', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🪪</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 600 }}>CCCD/CMND</div>
                  <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#1F2937', marginTop: '1px' }}>{profile.idCard || 'Chưa cập nhật'}</div>
                </div>
              </S.ContactItem>
              <S.ContactItem>
                <span style={{ flex: 'none', width: '34px', height: '34px', borderRadius: '10px', background: '#E3EDFD', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📍</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 600 }}>Địa chỉ</div>
                  <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#1F2937', marginTop: '1px', wordBreak: 'break-word' }}>{profile.address || 'Chưa cập nhật'}</div>
                </div>
              </S.ContactItem>
            </div>
          </S.BentoCard>

          <S.BentoCard>
            <S.CardTitle style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Thống kê nhanh</S.CardTitle>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ background: 'linear-gradient(140deg,#E6F3ED,#F4FBF7)', border: '1px solid #C7E3D5', borderRadius: '14px', padding: '15px' }}>
                <span style={{ display: 'flex', width: '34px', height: '34px', borderRadius: '10px', background: '#fff', color: '#005A36', alignItems: 'center', justifyContent: 'center', marginBottom: '9px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                </span>
                <div style={{ fontSize: '26px', fontWeight: 800, color: '#1F2937', lineHeight: 1, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>2</div>
                <div style={{ fontSize: '11.5px', color: '#6B7280', fontWeight: 600, marginTop: '3px' }}>Lớp phụ trách</div>
              </div>
              <div style={{ background: 'linear-gradient(140deg,#E3EDFD,#F2F7FE)', border: '1px solid #C7DBFB', borderRadius: '14px', padding: '15px' }}>
                <span style={{ display: 'flex', width: '34px', height: '34px', borderRadius: '10px', background: '#fff', color: '#2563EB', alignItems: 'center', justifyContent: 'center', marginBottom: '9px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
                  </svg>
                </span>
                <div style={{ fontSize: '26px', fontWeight: 800, color: '#1F2937', lineHeight: 1, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>5</div>
                <div style={{ fontSize: '11.5px', color: '#6B7280', fontWeight: 600, marginTop: '3px' }}>Năm công tác</div>
              </div>
            </div>
          </S.BentoCard>
        </S.LeftCol>

        {/* RIGHT COLUMN */}
        <S.BentoCard>
          <S.TabBar>
            <S.TabButton $active={activeTab === 'history'} onClick={() => setActiveTab('history')}>🏆 Lịch sử công tác</S.TabButton>
            <S.TabButton $active={activeTab === 'settings'} onClick={() => setActiveTab('settings')}>⚙️ Cài đặt</S.TabButton>
            <S.TabButton $active={activeTab === 'classes'} onClick={() => setActiveTab('classes')}>🎓 Lớp giảng dạy</S.TabButton>
          </S.TabBar>

          {activeTab === 'history' && (
            <S.FadeInContent>
              <div style={{ position: 'relative', paddingLeft: '6px' }}>
                {timeline.map((t, i) => (
                  <div key={i} style={{ position: 'relative', display: 'flex', gap: '16px', paddingBottom: '22px' }}>
                    <div style={{ flex: 'none', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '2px' }}>
                      <span style={{ position: 'relative', width: '16px', height: '16px', borderRadius: '50%', background: dotColors[t.kind], boxShadow: `0 0 0 4px ${glowColors[t.kind]}`, zIndex: 1 }}></span>
                      {i < timeline.length - 1 && <span style={{ position: 'absolute', left: '7px', top: '18px', bottom: '-6px', width: '2px', background: '#E6EEE9' }}></span>}
                    </div>
                    <div style={{ flex: 1, paddingBottom: '2px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: dateTxtColors[t.kind], background: dateBgColors[t.kind], padding: '3px 10px', borderRadius: '7px' }}>{t.date}</span>
                      <div style={{ fontSize: '15.5px', fontWeight: 700, color: '#1F2937', marginTop: '8px', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{t.title}</div>
                      <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '3px', lineHeight: 1.5 }}>{t.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </S.FadeInContent>
          )}

          {activeTab === 'settings' && (
            <S.FadeInContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '4px', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>🔔 Thông báo</div>
                  <div style={{ fontSize: '12.5px', color: '#9CA3AF', marginBottom: '6px' }}>Chọn cách bạn muốn nhận cập nhật.</div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 4px', borderTop: '1px solid #EEF4F0' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '14px', color: '#334155' }}>Email</div>
                      <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>Nhận thông báo qua email cá nhân</div>
                    </div>
                    {/* Dummy toggle */}
                    <div style={{ width: '44px', height: '24px', borderRadius: '12px', background: '#005A36', position: 'relative' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#fff', position: 'absolute', right: '2px', top: '2px' }} />
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #EEF4F0', paddingTop: '18px' }}>
                  <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '4px', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>🔒 Đổi mật khẩu</div>
                  <div style={{ fontSize: '12.5px', color: '#9CA3AF', marginBottom: '16px' }}>Tối thiểu 6 ký tự, nên có chữ và số.</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '13px', maxWidth: '420px' }}>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#475569' }}>
                      Mật khẩu hiện tại
                      <S.ModalInput type="password" placeholder="••••••••" />
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#475569' }}>
                      Mật khẩu mới
                      <S.ModalInput type="password" placeholder="Nhập mật khẩu mới" />
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#475569' }}>
                      Xác nhận mật khẩu mới
                      <S.ModalInput type="password" placeholder="Nhập lại mật khẩu mới" />
                    </label>
                    <S.PrimaryButton style={{ alignSelf: 'flex-start', marginTop: '4px' }} onClick={() => addToast('🔒 Đã cập nhật mật khẩu thành công')}>
                      Cập nhật mật khẩu
                    </S.PrimaryButton>
                  </div>
                </div>
              </div>
            </S.FadeInContent>
          )}

          {activeTab === 'classes' && (
            <S.FadeInContent>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                {classes.map((c, i) => (
                  <a key={i} href={c.href} style={{ display: 'block', textDecoration: 'none', background: '#fff', border: '1px solid #E6EEE9', borderRadius: '14px', boxShadow: '0 4px 18px -4px rgba(0,90,54,.06)', padding: '18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '13px', marginBottom: '14px' }}>
                      <span style={{ flex: 'none', width: '48px', height: '48px', borderRadius: '14px', background: c.grad, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '17px', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                        {c.code}
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: '16px', color: '#1F2937', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{c.name}</div>
                        <div style={{ fontSize: '12.5px', color: '#9CA3AF' }}>{c.role}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '13px', color: '#6B7280', fontWeight: 600 }}>👶 {c.count} bé</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '13px', fontWeight: 700, color: '#005A36' }}>
                        Vào lớp <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </S.FadeInContent>
          )}
        </S.BentoCard>

      </S.BentoGrid>

      {/* EDIT MODAL OVERLAY */}
      {isEditOpen && (
        <S.ModalOverlay onClick={() => setIsEditOpen(false)}>
          <S.ModalContent onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '18px', fontWeight: 700, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Chỉnh sửa hồ sơ</div>
                <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>Cập nhật thông tin cá nhân của bạn</div>
              </div>
              <button 
                onClick={() => setIsEditOpen(false)} 
                style={{ width: '36px', height: '36px', borderRadius: '10px', border: 'none', background: '#F1F4F1', color: '#6B7280', fontSize: '17px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#475569', gridColumn: 'span 2' }}>Họ và tên
                <S.ModalInput value={editDraft.fullName} onChange={e => setEditDraft({...editDraft, fullName: e.target.value})} />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#475569' }}>Số điện thoại
                <S.ModalInput value={editDraft.phoneNumber} onChange={e => setEditDraft({...editDraft, phoneNumber: e.target.value})} />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#475569' }}>Email
                <S.ModalInput value={editDraft.email} onChange={e => setEditDraft({...editDraft, email: e.target.value})} />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#475569', gridColumn: 'span 2' }}>Địa chỉ
                <S.ModalInput value={editDraft.address} onChange={e => setEditDraft({...editDraft, address: e.target.value})} />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#475569' }}>CCCD/CMND
                <S.ModalInput value={editDraft.idCard} onChange={e => setEditDraft({...editDraft, idCard: e.target.value})} />
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '22px' }}>
              <S.SecondaryButton onClick={() => setIsEditOpen(false)}>Hủy</S.SecondaryButton>
              <S.PrimaryButton onClick={() => {
                setIsEditOpen(false);
                addToast('✅ Đã lưu thông tin hồ sơ (Giao diện giả lập)');
              }}>
                Lưu thay đổi
              </S.PrimaryButton>
            </div>
          </S.ModalContent>
        </S.ModalOverlay>
      )}

      {/* TOASTS */}
      <S.ToastContainer>
        {toasts.map(t => (
          <S.Toast key={t.id}>{t.text}</S.Toast>
        ))}
      </S.ToastContainer>

    </S.Container>
  );
};
