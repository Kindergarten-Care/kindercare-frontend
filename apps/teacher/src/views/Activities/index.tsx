'use client';

import React from 'react';
import { useActivities } from './hooks';
import * as S from './styles';
import { 
  Utensils, 
  Calendar as CalendarIcon, 
  Search, 
  Edit2, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Save, 
  Image as ImageIcon,
  Plus
} from 'lucide-react';
import { MealStatus, NapStatus, ParticipationStatus } from '@/config/types/activities';

export function ActivitiesView(): React.ReactElement {
  const {
    loading,
    saving,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    
    // Menu States
    isMenuOpen,
    setIsMenuOpen,
    isMenuEditing,
    setIsMenuEditing,
    menu,
    setMenu,
    editedMenu,
    setEditedMenu,

    // Filtered lists
    filteredMeals,
    filteredActivities,
    scheduleItems,

    // Actions
    handleMealStatusChange,
    handleMealNoteChange,
    handleActivityNapChange,
    handleActivityParticipationChange,
    handleActivityNoteChange,
    handleScheduleStatusChange,
    handleSchedulePhotoChange,
    handleBulkMarkMealsAll,
    handleBulkMarkActivitiesGood,
    handleSave,
  } = useActivities();

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px', flexDirection: 'column', gap: '16px' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #0e793c', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <span style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: '600' }}>Đang tải dữ liệu hoạt động & ăn uống...</span>
        <style dangerouslySetInnerHTML={{ __html: '@keyframes spin { to { transform: rotate(360deg); } }' }} />
      </div>
    );
  }

  return (
    <S.ActivitiesPageContainer>
      {/* Top Header & Save Control */}
      <S.HeaderActionsSection>
        <S.DateHeader>
          <CalendarIcon size={20} style={{ color: '#0e793c' }} />
          Hôm nay, 17/06/2026 - Lớp Mầm 1
        </S.DateHeader>

        <S.ActionsGroup>
          <S.SaveBtn onClick={handleSave} disabled={saving}>
            <Save size={18} />
            Lưu báo cáo hôm nay
          </S.SaveBtn>
        </S.ActionsGroup>
      </S.HeaderActionsSection>

      {/* Tab Switcher */}
      <S.TabBar>
        <S.TabButton $active={activeTab === 'meals'} onClick={() => setActiveTab('meals')}>
          Phần ăn trong ngày
        </S.TabButton>
        <S.TabButton $active={activeTab === 'activities'} onClick={() => setActiveTab('activities')}>
          Hoạt động & Ngủ nghỉ
        </S.TabButton>
        <S.TabButton $active={activeTab === 'schedule'} onClick={() => setActiveTab('schedule')}>
          Lịch trình trong ngày
        </S.TabButton>
      </S.TabBar>

      {/* TAB 1: MEALS */}
      {activeTab === 'meals' && (
        <>
          {/* Collapse Menu Editor Section */}
          <S.MenuSection>
            <S.MenuHeader onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <S.MenuTitle>
                <Utensils size={18} style={{ color: '#0e793c' }} />
                Thực đơn hôm nay
              </S.MenuTitle>
              <S.MenuToggleButton as="div">
                {isMenuEditing ? (
                  <span style={{ color: '#64748b' }}>Đang chỉnh sửa</span>
                ) : (
                  <>
                    <span>{isMenuOpen ? 'Thu gọn' : 'Xem chi tiết'}</span>
                    {isMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </>
                )}
              </S.MenuToggleButton>
            </S.MenuHeader>

            <S.MenuContent $isOpen={isMenuOpen}>
              {isMenuEditing ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <S.MenuGrid>
                    <S.MenuCard>
                      <S.MenuLabel>Bữa sáng</S.MenuLabel>
                      <S.MenuTextarea 
                        value={editedMenu.breakfastMenu} 
                        onChange={(e) => setEditedMenu({ ...editedMenu, breakfastMenu: e.target.value })}
                        placeholder="Nhập món ăn sáng..."
                      />
                    </S.MenuCard>
                    <S.MenuCard>
                      <S.MenuLabel>Bữa trưa</S.MenuLabel>
                      <S.MenuTextarea 
                        value={editedMenu.lunchMenu} 
                        onChange={(e) => setEditedMenu({ ...editedMenu, lunchMenu: e.target.value })}
                        placeholder="Nhập món ăn trưa..."
                      />
                    </S.MenuCard>
                    <S.MenuCard>
                      <S.MenuLabel>Bữa xế</S.MenuLabel>
                      <S.MenuTextarea 
                        value={editedMenu.afternoonSnackMenu} 
                        onChange={(e) => setEditedMenu({ ...editedMenu, afternoonSnackMenu: e.target.value })}
                        placeholder="Nhập món ăn xế..."
                      />
                    </S.MenuCard>
                  </S.MenuGrid>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                    <S.QuickFillBtn onClick={() => {
                      setEditedMenu(menu);
                      setIsMenuEditing(false);
                    }}>
                      Hủy
                    </S.QuickFillBtn>
                    <S.SaveBtn onClick={() => {
                      setMenu(editedMenu);
                      setIsMenuEditing(false);
                    }} style={{ padding: '8px 16px', fontSize: '0.8125rem' }}>
                      <Check size={16} /> Xong
                    </S.SaveBtn>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <S.MenuGrid>
                    <S.MenuCard>
                      <S.MenuLabel>Bữa sáng</S.MenuLabel>
                      <S.MenuText>{menu.breakfastMenu || 'Chưa cập nhật thực đơn'}</S.MenuText>
                    </S.MenuCard>
                    <S.MenuCard>
                      <S.MenuLabel>Bữa trưa</S.MenuLabel>
                      <S.MenuText>{menu.lunchMenu || 'Chưa cập nhật thực đơn'}</S.MenuText>
                    </S.MenuCard>
                    <S.MenuCard>
                      <S.MenuLabel>Bữa xế</S.MenuLabel>
                      <S.MenuText>{menu.afternoonSnackMenu || 'Chưa cập nhật thực đơn'}</S.MenuText>
                    </S.MenuCard>
                  </S.MenuGrid>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <S.QuickFillBtn onClick={() => setIsMenuEditing(true)}>
                      <Edit2 size={14} /> Chỉnh sửa thực đơn
                    </S.QuickFillBtn>
                  </div>
                </div>
              )}
            </S.MenuContent>
          </S.MenuSection>

          {/* Controls Bar */}
          <S.WorkspaceControlsRow>
            <S.SearchInputWrapper>
              <Search size={18} />
              <S.SearchField 
                type="text" 
                placeholder="Tìm học sinh theo tên..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </S.SearchInputWrapper>

            <S.QuickActionsRow>
              <S.QuickFillBtn onClick={handleBulkMarkMealsAll}>
                <Check size={16} style={{ color: '#0e793c' }} />
                Tất cả ăn hết sạch
              </S.QuickFillBtn>
            </S.QuickActionsRow>
          </S.WorkspaceControlsRow>

          {/* Student Grid Container */}
          <S.GridContainer>
            <S.Table>
              <S.TableHead>
                <tr>
                  <S.Th>Học sinh</S.Th>
                  <S.Th>Bữa sáng</S.Th>
                  <S.Th>Bữa trưa</S.Th>
                  <S.Th>Bữa xế</S.Th>
                  <S.Th>Nhận xét / Ghi chú của giáo viên</S.Th>
                </tr>
              </S.TableHead>
              <S.TBody>
                {filteredMeals.map((record) => (
                  <S.Tr key={record.studentId}>
                    <S.Td>
                      <S.StudentProfileCell>
                        <S.StudentAvatar>
                          <img src={record.studentAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=60'} alt={record.studentName} />
                        </S.StudentAvatar>
                        <S.StudentMeta>
                          <S.StudentName>{record.studentName}</S.StudentName>
                          <S.StudentIdBadge>{record.studentId}</S.StudentIdBadge>
                        </S.StudentMeta>
                      </S.StudentProfileCell>
                    </S.Td>
                    
                    <S.Td>
                      <S.MealButtonGroup>
                        <S.MealToggleBtn 
                          $active={record.breakfast === 'ALL'} 
                          $status="ALL"
                          onClick={() => handleMealStatusChange(record.studentId, 'breakfast', 'ALL')}
                        >
                          Hết
                        </S.MealToggleBtn>
                        <S.MealToggleBtn 
                          $active={record.breakfast === 'HALF'} 
                          $status="HALF"
                          onClick={() => handleMealStatusChange(record.studentId, 'breakfast', 'HALF')}
                        >
                          1/2
                        </S.MealToggleBtn>
                        <S.MealToggleBtn 
                          $active={record.breakfast === 'NONE'} 
                          $status="NONE"
                          onClick={() => handleMealStatusChange(record.studentId, 'breakfast', 'NONE')}
                        >
                          Không
                        </S.MealToggleBtn>
                      </S.MealButtonGroup>
                    </S.Td>

                    <S.Td>
                      <S.MealButtonGroup>
                        <S.MealToggleBtn 
                          $active={record.lunch === 'ALL'} 
                          $status="ALL"
                          onClick={() => handleMealStatusChange(record.studentId, 'lunch', 'ALL')}
                        >
                          Hết
                        </S.MealToggleBtn>
                        <S.MealToggleBtn 
                          $active={record.lunch === 'HALF'} 
                          $status="HALF"
                          onClick={() => handleMealStatusChange(record.studentId, 'lunch', 'HALF')}
                        >
                          1/2
                        </S.MealToggleBtn>
                        <S.MealToggleBtn 
                          $active={record.lunch === 'NONE'} 
                          $status="NONE"
                          onClick={() => handleMealStatusChange(record.studentId, 'lunch', 'NONE')}
                        >
                          Không
                        </S.MealToggleBtn>
                      </S.MealButtonGroup>
                    </S.Td>

                    <S.Td>
                      <S.MealButtonGroup>
                        <S.MealToggleBtn 
                          $active={record.afternoonSnack === 'ALL'} 
                          $status="ALL"
                          onClick={() => handleMealStatusChange(record.studentId, 'afternoonSnack', 'ALL')}
                        >
                          Hết
                        </S.MealToggleBtn>
                        <S.MealToggleBtn 
                          $active={record.afternoonSnack === 'HALF'} 
                          $status="HALF"
                          onClick={() => handleMealStatusChange(record.studentId, 'afternoonSnack', 'HALF')}
                        >
                          1/2
                        </S.MealToggleBtn>
                        <S.MealToggleBtn 
                          $active={record.afternoonSnack === 'NONE'} 
                          $status="NONE"
                          onClick={() => handleMealStatusChange(record.studentId, 'afternoonSnack', 'NONE')}
                        >
                          Không
                        </S.MealToggleBtn>
                      </S.MealButtonGroup>
                    </S.Td>

                    <S.Td style={{ width: '30%' }}>
                      <S.NoteInput 
                        type="text" 
                        placeholder="Nhập ghi chú ăn uống..." 
                        value={record.note || ''}
                        onChange={(e) => handleMealNoteChange(record.studentId, e.target.value)}
                      />
                    </S.Td>
                  </S.Tr>
                ))}
                {filteredMeals.length === 0 && (
                  <S.Tr>
                    <S.Td colSpan={5} style={{ textAlign: 'center', padding: '32px', color: '#64748b', fontWeight: '500' }}>
                      Không tìm thấy học sinh phù hợp.
                    </S.Td>
                  </S.Tr>
                )}
              </S.TBody>
            </S.Table>
          </S.GridContainer>
        </>
      )}

      {/* TAB 2: ACTIVITIES */}
      {activeTab === 'activities' && (
        <>
          {/* Controls Bar */}
          <S.WorkspaceControlsRow>
            <S.SearchInputWrapper>
              <Search size={18} />
              <S.SearchField 
                type="text" 
                placeholder="Tìm học sinh theo tên..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </S.SearchInputWrapper>

            <S.QuickActionsRow>
              <S.QuickFillBtn onClick={handleBulkMarkActivitiesGood}>
                <Check size={16} style={{ color: '#0e793c' }} />
                Tất cả ngủ tốt & năng nổ
              </S.QuickFillBtn>
            </S.QuickActionsRow>
          </S.WorkspaceControlsRow>

          {/* Student Grid Container */}
          <S.GridContainer>
            <S.Table>
              <S.TableHead>
                <tr>
                  <S.Th>Học sinh</S.Th>
                  <S.Th>Giấc ngủ trưa</S.Th>
                  <S.Th>Tinh thần hoạt động</S.Th>
                  <S.Th>Hình ảnh</S.Th>
                  <S.Th>Ghi chú chi tiết hôm nay</S.Th>
                </tr>
              </S.TableHead>
              <S.TBody>
                {filteredActivities.map((record) => (
                  <S.Tr key={record.studentId}>
                    <S.Td>
                      <S.StudentProfileCell>
                        <S.StudentAvatar>
                          <img src={record.studentAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=60'} alt={record.studentName} />
                        </S.StudentAvatar>
                        <S.StudentMeta>
                          <S.StudentName>{record.studentName}</S.StudentName>
                          <S.StudentIdBadge>{record.studentId}</S.StudentIdBadge>
                        </S.StudentMeta>
                      </S.StudentProfileCell>
                    </S.Td>

                    <S.Td>
                      <S.DropdownSelect 
                        value={record.nap}
                        onChange={(e) => handleActivityNapChange(record.studentId, e.target.value as NapStatus)}
                      >
                        <option value="GOOD">Ngủ ngon (2h)</option>
                        <option value="POOR">Ngủ ít (1h)</option>
                        <option value="NONE">Không ngủ</option>
                      </S.DropdownSelect>
                    </S.Td>

                    <S.Td>
                      <S.DropdownSelect 
                        value={record.participation}
                        onChange={(e) => handleActivityParticipationChange(record.studentId, e.target.value as ParticipationStatus)}
                      >
                        <option value="ACTIVE">Năng nổ, tích cực</option>
                        <option value="NORMAL">Bình thường</option>
                        <option value="TIRED">Mệt mỏi, uể oải</option>
                      </S.DropdownSelect>
                    </S.Td>

                    <S.Td>
                      <S.PhotoUploadWrapper>
                        {record.participation === 'ACTIVE' ? (
                          <S.PhotoThumbnail>
                            <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=80&auto=format&fit=crop&q=60" alt="hoat dong" />
                          </S.PhotoThumbnail>
                        ) : (
                          <S.PhotoThumbnail as="div">
                            <ImageIcon size={18} style={{ color: '#94a3b8' }} />
                          </S.PhotoThumbnail>
                        )}
                        <S.AddPhotoBtn>
                          <Plus size={16} />
                        </S.AddPhotoBtn>
                      </S.PhotoUploadWrapper>
                    </S.Td>

                    <S.Td style={{ width: '35%' }}>
                      <S.NoteInput 
                        type="text" 
                        placeholder="Nhận xét tinh thần, sức khỏe..." 
                        value={record.note || ''}
                        onChange={(e) => handleActivityNoteChange(record.studentId, e.target.value)}
                      />
                    </S.Td>
                  </S.Tr>
                ))}
                {filteredActivities.length === 0 && (
                  <S.Tr>
                    <S.Td colSpan={5} style={{ textAlign: 'center', padding: '32px', color: '#64748b', fontWeight: '500' }}>
                      Không tìm thấy học sinh phù hợp.
                    </S.Td>
                  </S.Tr>
                )}
              </S.TBody>
            </S.Table>
          </S.GridContainer>
        </>
      )}

      {/* TAB 3: DAILY SCHEDULE TIMELINE */}
      {activeTab === 'schedule' && (
        <S.TimelineContainer>
          {scheduleItems.map((item, index) => (
            <S.TimelineItem key={item.id}>
              <S.TimelineDot $completed={item.completed}>
                {index + 1}
              </S.TimelineDot>
              
              <S.TimelineBody>
                <S.TimelineLeft>
                  <S.TimelineTime>{item.timeSlot}</S.TimelineTime>
                  <S.TimelineTitle>{item.activityName}</S.TimelineTitle>
                </S.TimelineLeft>
                
                <S.TimelineRight>
                  {/* Class Photo Upload/Preview section */}
                  <S.ClassPhotoUpload>
                    {item.classPhoto ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <S.ClassPhotoPreview>
                          <img src={item.classPhoto} alt="Ảnh hoạt động tập thể lớp" />
                        </S.ClassPhotoPreview>
                        <S.AddPhotoBtn 
                          onClick={() => handleSchedulePhotoChange(item.id, undefined)}
                          title="Xóa ảnh"
                          style={{ color: '#ef4444', borderColor: '#fca5a5', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          ✕
                        </S.AddPhotoBtn>
                      </div>
                    ) : (
                      <S.ClassPhotoPlaceholder onClick={() => {
                        const urls = [
                          'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&auto=format&fit=crop&q=60',
                          'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400&auto=format&fit=crop&q=60',
                          'https://images.unsplash.com/photo-1489980508314-941910ded1f4?w=400&auto=format&fit=crop&q=60',
                          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60'
                        ];
                        const chosenUrl = urls[index % urls.length];
                        handleSchedulePhotoChange(item.id, chosenUrl);
                      }}>
                        <ImageIcon size={18} />
                        Tải ảnh tập thể
                      </S.ClassPhotoPlaceholder>
                    )}
                  </S.ClassPhotoUpload>

                  {/* Completion check btn */}
                  <S.TimelineCheckBtn 
                    $completed={item.completed}
                    onClick={() => handleScheduleStatusChange(item.id, !item.completed)}
                  >
                    {item.completed ? (
                      <>
                        <Check size={16} />
                        Đã hoàn thành
                      </>
                    ) : (
                      'Đánh dấu xong'
                    )}
                  </S.TimelineCheckBtn>
                </S.TimelineRight>
              </S.TimelineBody>
            </S.TimelineItem>
          ))}
        </S.TimelineContainer>
      )}
    </S.ActivitiesPageContainer>
  );
}
