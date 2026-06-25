import React, { useState } from 'react';
import * as S from './styles';
import { useDetailedStudents } from '@/hooks/useTeacherQueries';
import { useAuth } from '@/contexts/AuthContext';
import { StudentDetailedDomainModel } from '@/config/types/student';

type DrawerTab = 'profile' | 'attendance' | 'health' | 'parents';

export const StudentsListView: React.FC = () => {
  const { user } = useAuth();
  // Using user.classIds[0] assuming a teacher has at least 1 class
  const classId = (user as any)?.classIds?.[0] || 1;
  
  const { data: students, isLoading } = useDetailedStudents(classId);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<StudentDetailedDomainModel | null>(null);
  const [activeTab, setActiveTab] = useState<DrawerTab>('profile');

  if (isLoading) {
    return <S.Container><S.EmptyState>Đang tải danh sách học sinh...</S.EmptyState></S.Container>;
  }

  const allStudents = students || [];
  
  // Filter by search query
  const filteredStudents = allStudents.filter(s => 
    s.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculateAgeStr = (dobSeconds?: bigint | null) => {
    if (!dobSeconds) return 'Chưa cập nhật';
    return new Date(Number(dobSeconds) * 1000).toLocaleDateString('vi-VN');
  };

  const presentCount = allStudents.length; // Mocked for now
  const absentCount = 0; // Mocked for now

  // Handle drawer opening
  const openDrawer = (student: StudentDetailedDomainModel) => {
    setSelectedStudent(student);
    setActiveTab('profile');
  };

  const closeDrawer = () => {
    setSelectedStudent(null);
  };

  return (
    <S.Container>
      {/* TOP BAR */}
      <S.TopBar>
        <S.HeaderLeft>
          <S.SubTitle>Quản lý lớp học</S.SubTitle>
          <S.TitleRow>
            <S.Title>Lớp Mầm 1</S.Title>
            <S.StatPill>
              <span style={{ color: '#6B7280' }}>Sĩ số <b style={{ color: '#1F2937' }}>{allStudents.length}</b></span>
              <S.StatDivider />
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#005A36' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#005A36' }} />Hiện diện <b>{presentCount}</b>
              </span>
              <S.StatDivider />
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#DC2626' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#DC2626' }} />Vắng <b>{absentCount}</b>
              </span>
            </S.StatPill>
          </S.TitleRow>
        </S.HeaderLeft>

        <S.SearchBox>
          <span style={{ flex: 'none', display: 'flex', width: '18px', height: '18px', color: '#9CA3AF' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <S.SearchInput 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            placeholder="Tìm bé theo tên…" 
          />
        </S.SearchBox>
      </S.TopBar>

      {/* STUDENT GRID */}
      {filteredStudents.length > 0 ? (
        <S.Grid>
          {filteredStudents.map((student) => {
            const initial = student.fullName.charAt(0).toUpperCase();
            // Deterministic gradient based on ID
            const isBlue = student.studentId % 2 === 0;
            const grad = isBlue ? 'linear-gradient(135deg, #60A5FA, #2563EB)' : 'linear-gradient(135deg, #34D399, #005A36)';
            
            return (
              <S.StudentCard key={student.studentId} onClick={() => openDrawer(student)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
                  <S.AvatarBox $grad={grad}>
                    {student.avatarUrl ? (
                      <S.ProfileAvatar src={student.avatarUrl} alt={student.fullName} fill sizes="52px" />
                    ) : initial}
                    {/* Mock present dot */}
                    <S.StatusDot $active={true} />
                  </S.AvatarBox>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: '15px', color: '#1F2937', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                      {student.fullName}
                    </div>
                    <div style={{ fontSize: '12px', color: '#9CA3AF', fontVariantNumeric: 'tabular-nums' }}>
                      {calculateAgeStr(student.dateOfBirth)}
                    </div>
                  </div>
                </div>
                
                <S.TagRow>
                  <S.StatusTag $type="present">
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#005A36' }} /> Có mặt
                  </S.StatusTag>
                  {student.allergies && (
                    <S.AlertTag $type="allergy">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                      Dị ứng
                    </S.AlertTag>
                  )}
                  {/* Mock meds pill */}
                  {student.studentId % 3 === 0 && (
                    <S.AlertTag $type="med">💊 Dặn thuốc</S.AlertTag>
                  )}
                </S.TagRow>
              </S.StudentCard>
            );
          })}
        </S.Grid>
      ) : (
        <S.EmptyState>
          <span style={{ fontSize: '46px' }}>🔍</span>
          <span style={{ fontSize: '14px', fontWeight: 600 }}>Không tìm thấy bé nào khớp "{searchQuery}"</span>
        </S.EmptyState>
      )}

      {/* SLIDING DRAWER */}
      {selectedStudent && (
        <>
          <S.DrawerBackdrop onClick={closeDrawer} />
          <S.Drawer>
            
            {/* Drawer Header */}
            <S.DrawerHeader>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                <S.AvatarBox $grad={selectedStudent.studentId % 2 === 0 ? 'linear-gradient(135deg, #60A5FA, #2563EB)' : 'linear-gradient(135deg, #34D399, #005A36)'} style={{ width: '64px', height: '64px', fontSize: '24px' }}>
                  {selectedStudent.avatarUrl ? (
                    <S.ProfileAvatar src={selectedStudent.avatarUrl} alt={selectedStudent.fullName} fill sizes="64px" />
                  ) : selectedStudent.fullName.charAt(0).toUpperCase()}
                  <S.StatusDot $active={true} style={{ width: '16px', height: '16px', right: '1px', bottom: '1px' }} />
                </S.AvatarBox>
                <div style={{ flex: 1, minWidth: 0, paddingTop: '3px' }}>
                  <div style={{ fontSize: '21px', fontWeight: 800, letterSpacing: '-0.02em', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                    {selectedStudent.fullName}
                  </div>
                  <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '1px' }}>
                    Giới tính: {selectedStudent.gender === 'Male' ? 'Nam' : 'Nữ'} · {calculateAgeStr(selectedStudent.dateOfBirth)}
                  </div>
                </div>
                <button 
                  onClick={closeDrawer} 
                  style={{ flex: 'none', width: '36px', height: '36px', borderRadius: '10px', border: 'none', background: '#F1F4F1', color: '#6B7280', fontSize: '17px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  ✕
                </button>
              </div>

              {/* Tabs */}
              <S.TabGroup>
                <S.TabBtn $active={activeTab === 'profile'} onClick={() => setActiveTab('profile')}>📋 Hồ sơ</S.TabBtn>
                <S.TabBtn $active={activeTab === 'attendance'} onClick={() => setActiveTab('attendance')}>📅 Điểm danh</S.TabBtn>
                <S.TabBtn $active={activeTab === 'health'} onClick={() => setActiveTab('health')}>❤️ Sức khỏe</S.TabBtn>
                <S.TabBtn $active={activeTab === 'parents'} onClick={() => setActiveTab('parents')}>👨‍👩‍👧 Phụ huynh</S.TabBtn>
              </S.TabGroup>
            </S.DrawerHeader>

            {/* Drawer Body */}
            <S.DrawerBody>
              
              {activeTab === 'profile' && (
                <S.FadeInContent>
                  {selectedStudent.allergies && (
                    <div style={{ display: 'flex', gap: '13px', padding: '16px', borderRadius: '14px', background: '#FEE2E2', border: '1px solid #FCA5A5' }}>
                      <span style={{ flex: 'none', width: '38px', height: '38px', borderRadius: '11px', background: '#fff', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                      </span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '14px', color: '#991B1B', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>⚠ Cảnh báo dị ứng</div>
                        <div style={{ fontSize: '13px', color: '#B91C1C', marginTop: '3px', lineHeight: 1.5 }}>{selectedStudent.allergies}</div>
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <S.InfoRow>
                      <span style={{ flex: 'none', width: '34px', height: '34px', borderRadius: '10px', background: '#E3EDFD', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🎂</span>
                      <span style={{ flex: 1, fontSize: '12.5px', color: '#9CA3AF', fontWeight: 500 }}>Ngày sinh</span>
                      <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#1F2937' }}>{calculateAgeStr(selectedStudent.dateOfBirth)}</span>
                    </S.InfoRow>
                    <S.InfoRow>
                      <span style={{ flex: 'none', width: '34px', height: '34px', borderRadius: '10px', background: '#E3EDFD', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⚧️</span>
                      <span style={{ flex: 1, fontSize: '12.5px', color: '#9CA3AF', fontWeight: 500 }}>Giới tính</span>
                      <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#1F2937' }}>{selectedStudent.gender === 'Male' ? 'Nam' : 'Nữ'}</span>
                    </S.InfoRow>
                    <S.InfoRow>
                      <span style={{ flex: 'none', width: '34px', height: '34px', borderRadius: '10px', background: '#E3EDFD', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🆔</span>
                      <span style={{ flex: 1, fontSize: '12.5px', color: '#9CA3AF', fontWeight: 500 }}>Mã học sinh</span>
                      <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#1F2937' }}>HS{selectedStudent.studentId.toString().padStart(4, '0')}</span>
                    </S.InfoRow>
                  </div>
                </S.FadeInContent>
              )}

              {activeTab === 'attendance' && (
                <S.FadeInContent>
                  <div style={{ padding: '16px', borderRadius: '12px', background: '#F6FAF7', border: '1px dashed #C7DBCF', fontSize: '13px', color: '#6B7280', textAlign: 'center' }}>
                    Chức năng điểm danh chi tiết đang được phát triển 🛠️
                  </div>
                </S.FadeInContent>
              )}

              {activeTab === 'health' && (
                <S.FadeInContent>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div style={{ background: '#E3EDFD', border: '1px solid #C7DBFB', borderRadius: '14px', padding: '16px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#1D4ED8' }}>Chiều cao</div>
                      <div style={{ fontSize: '26px', fontWeight: 800, color: '#1F2937', marginTop: '4px', fontVariantNumeric: 'tabular-nums', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                        {selectedStudent.healthRecord?.height || '--'}<span style={{ fontSize: '14px', fontWeight: 600, color: '#6B7280' }}> cm</span>
                      </div>
                    </div>
                    <div style={{ background: '#F1ECFE', border: '1px solid #DDD0FB', borderRadius: '14px', padding: '16px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#7C3AED' }}>Cân nặng</div>
                      <div style={{ fontSize: '26px', fontWeight: 800, color: '#1F2937', marginTop: '4px', fontVariantNumeric: 'tabular-nums', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                        {selectedStudent.healthRecord?.weight || '--'}<span style={{ fontSize: '14px', fontWeight: 600, color: '#6B7280' }}> kg</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '15px 16px', borderRadius: '14px', background: '#E6F3ED', border: '1px solid #C7E3D5' }}>
                    <span style={{ flex: 'none', width: '40px', height: '40px', borderRadius: '12px', background: '#fff', color: '#005A36', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '12px', color: '#3F7B5F', fontWeight: 600 }}>Chỉ số BMI</div>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: '#1F2937', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                        {selectedStudent.healthRecord?.bmi || '--'}
                      </div>
                    </div>
                  </div>

                  {selectedStudent.studentId % 3 === 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', marginTop: '8px' }}>
                      <span style={{ fontWeight: 700, fontSize: '14px', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>💊 Đơn thuốc đang dùng</span>
                      <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', borderRadius: '12px', background: '#F8FBF9', border: '1px solid #E6EEE9' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: '14px', color: '#005A36' }}>Siro ho Bảo Thanh</div>
                          <div style={{ fontSize: '11.5px', color: '#6B7280', marginTop: '2px' }}>1 nắp nhỏ · Sau ăn trưa</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ padding: '16px', borderRadius: '12px', background: '#F6FAF7', border: '1px dashed #C7DBCF', fontSize: '13px', color: '#6B7280', textAlign: 'center' }}>
                      Không có đơn thuốc nào hôm nay 🌿
                    </div>
                  )}
                </S.FadeInContent>
              )}

              {activeTab === 'parents' && (
                <S.FadeInContent>
                  {selectedStudent.parents && selectedStudent.parents.length > 0 ? (
                    selectedStudent.parents.map(parent => (
                      <S.ParentCard key={parent.parentId}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '13px' }}>
                          <S.AvatarBox $grad={parent.isPrimary ? 'linear-gradient(135deg, #00794A, #005A36)' : 'linear-gradient(135deg, #8B5CF6, #6D28D9)'}>
                            {parent.fullName.charAt(0).toUpperCase()}
                          </S.AvatarBox>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexWrap: 'wrap' }}>
                              <span style={{ fontWeight: 700, fontSize: '15.5px', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{parent.fullName}</span>
                              <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#2563EB', background: '#E3EDFD', padding: '2px 8px', borderRadius: '6px' }}>{parent.relationship}</span>
                              {parent.isPrimary && (
                                <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#005A36', background: '#E6F3ED', padding: '2px 8px', borderRadius: '6px' }}>★ Liên hệ chính</span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', marginTop: '13px', borderTop: '1px solid #EEF4F0', paddingTop: '10px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '8px 6px' }}>
                            <span style={{ flex: 'none', width: '30px', height: '30px', borderRadius: '9px', background: '#E6F3ED', color: '#005A36', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📞</span>
                            <span style={{ flex: 1, fontSize: '12px', color: '#9CA3AF', fontWeight: 500 }}>Điện thoại</span>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: '#1F2937' }}>{parent.phone}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '8px 6px' }}>
                            <span style={{ flex: 'none', width: '30px', height: '30px', borderRadius: '9px', background: '#E3EDFD', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✉️</span>
                            <span style={{ flex: 1, fontSize: '12px', color: '#9CA3AF', fontWeight: 500 }}>Email</span>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: '#1F2937', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '190px' }}>{parent.email}</span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '9px', marginTop: '13px' }}>
                          <S.PrimaryButton style={{ flex: 1 }}>Gọi điện</S.PrimaryButton>
                          <S.SecondaryButton style={{ flex: 1 }}>Nhắn tin</S.SecondaryButton>
                        </div>
                      </S.ParentCard>
                    ))
                  ) : (
                    <div style={{ padding: '16px', borderRadius: '12px', background: '#F6FAF7', border: '1px dashed #C7DBCF', fontSize: '13px', color: '#6B7280', textAlign: 'center' }}>
                      Chưa có thông tin phụ huynh ⚠️
                    </div>
                  )}
                </S.FadeInContent>
              )}

            </S.DrawerBody>
          </S.Drawer>
        </>
      )}

    </S.Container>
  );
};
