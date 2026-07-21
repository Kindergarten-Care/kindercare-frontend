'use client';

import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { DashboardLayout } from '@/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useActivities } from './hooks';
import { MealStatus, NapStatus, participationStatus } from '@/config/types/activities';
import { 
  Utensils, 
  Moon, 
  Sun, 
  BookOpen, 
  Users,
  Check,
  MapPin,
  MessageSquare,
  Camera
} from 'lucide-react';
import { ActivitiesService } from '@/services/Activities/ActivitiesService';

interface ToastItem {
  id: string;
  text: string;
}

// Activity Type mapping for Timeline & Matrix
type ActivityUIGroup = 'arrival' | 'meal' | 'study' | 'play' | 'nap';

const getUIGroup = (title: string, type?: string): ActivityUIGroup => {
  const lower = title.toLowerCase();
  const lowerType = (type || '').toLowerCase();
  if (lower.includes('đón') || lower.includes('trả') || lowerType.includes('arrival')) return 'arrival';
  if (lower.includes('ăn') || lowerType.includes('meal')) return 'meal';
  if (lower.includes('ngủ') || lowerType.includes('sleep') || lowerType.includes('nap')) return 'nap';
  if (lower.includes('học') || lower.includes('bài') || lowerType.includes('learn')) return 'study';
  return 'play';
};

const PALETTES: Record<ActivityUIGroup, { solid: string; tint: string; c: string }> = {
  meal:    { c: '#92400E', tint: '#FEF3C7', solid: '#D97706' },
  nap:     { c: '#2563EB', tint: '#E3EDFD', solid: '#2563EB' },
  study:   { c: '#005A36', tint: '#E6F3ED', solid: '#005A36' },
  play:    { c: '#005A36', tint: '#E6F3ED', solid: '#005A36' },
  arrival: { c: '#8B5CF6', tint: '#F1ECFE', solid: '#8B5CF6' },
};

const OPTSETS = {
  meal:  [
    { k: 'ALL', label: '🟢 Ăn hết', dot: '#005A36' }, 
    { k: 'HALF', label: '🟠 Ăn chậm', dot: '#D97706' }, 
    { k: 'NONE', label: '🔴 Bỏ bữa', dot: '#DC2626' }
  ],
  nap:   [
    { k: 'GOOD', label: '🟢 Ngủ ngoan', dot: '#005A36' }, 
    { k: 'POOR', label: '🟠 Khó ngủ', dot: '#D97706' },
  ],
  study: [
    { k: 'Năng động', label: '🌟 Năng động', dot: '#F59E0B' },
    { k: 'Hòa đồng', label: '🟢 Hòa đồng', dot: '#005A36' }, 
    { k: 'Bình thường', label: '🔵 Bình thường', dot: '#2563EB' },
    { k: 'Thụ động', label: '🟠 Thụ động', dot: '#D97706' }, 
    { k: 'Không tham gia', label: '🔴 Không tham gia', dot: '#DC2626' }
  ],
};

const ICON_MAP: Record<ActivityUIGroup, React.ReactNode> = {
  meal: <Utensils size={19} />,
  nap: <Moon size={19} />,
  study: <BookOpen size={19} />,
  play: <Users size={19} />,
  arrival: <Sun size={19} />
};

const LocalNoteTextarea = ({ value, onChange, placeholder }: { value: string, onChange: (val: string) => void, placeholder: string }) => {
  const [localVal, setLocalVal] = useState(value);
  
  useEffect(() => {
    setLocalVal(value);
  }, [value]);

  return (
    <S.NoteTextarea 
      placeholder={placeholder}
      value={localVal}
      onChange={(e) => setLocalVal(e.target.value)}
      onBlur={() => {
        if (localVal !== value) onChange(localVal);
      }}
    />
  );
};

export const ActivitiesView: React.FC = () => {
  const { user } = useAuth();
  
  const {
    loading,
    mealRecords,
    activityRecords,
    handleMealStatusChange,
    handleMealNoteChange,
    handleMealPhotoChange,
    handleActivityNapChange,
    handleActivityParticipationChange,
    expandedStudentId,
    setExpandedStudentId,
    handleActivityNoteChange,
    handleActivityPhotoChange,
    handleBulkMarkMealsAll,
    handleBulkMarkActivitiesGood,
    handleSave,
    handleSaveMenu,
    saving,
    menu,
    isMenuEditing,
    setIsMenuEditing,
    editedMenu,
    setEditedMenu,
    weeklySchedule,
  } = useActivities();

  // Derive today's schedule items from weeklySchedule API data
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  const scheduleItems = React.useMemo(() => {
    if (!weeklySchedule?.details || !Array.isArray(weeklySchedule.details)) return [];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayName = days[new Date().getDay()];
    return weeklySchedule.details
      .filter((d: any) => d.dayOfWeek === todayName)
      .map((d: any) => ({
        id: d.id || `${d.dayOfWeek}-${d.startTime}-${d.activityName}`,
        timeSlot: `${(d.startTime || '00:00:00').slice(0, 5)} - ${(d.endTime || '23:59:00').slice(0, 5)}`,
        activityName: d.activityName,
        completed: completedIds.has(d.id || `${d.dayOfWeek}-${d.startTime}-${d.activityName}`),
      }));
  }, [weeklySchedule, completedIds]);

  const handleScheduleStatusChange = (id: string, completed: boolean) => {
    setCompletedIds(prev => {
      const next = new Set(prev);
      if (completed) next.add(id);
      else next.delete(id);
      return next;
    });
  };


  // Selected item tracking
  const [selectedActId, setSelectedActId] = useState<string | null>(null);

  // --- TOAST STATE ---
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const addToast = (text: string) => {
    const id = 'toast-' + Date.now() + Math.random();
    setToasts(prev => [...prev, { id, text }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  // --- REALTIME TIMELINE TRACKING ---
  const [currentTotalMins, setCurrentTotalMins] = useState<number>(() => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  });
  const [notifiedActs, setNotifiedActs] = useState<Set<string>>(new Set());

  // Clock tick every 30 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTotalMins(now.getHours() * 60 + now.getMinutes());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  // --- MAPPING SCHEDULE ---
  const sortedSchedule = [...scheduleItems].sort((a, b) => {
    return (a.timeSlot || '').localeCompare(b.timeSlot || '');
  });

  const dynamicSchedule = sortedSchedule.map(item => {
    const [startStr, endStr] = (item.timeSlot || '00:00 - 23:59').split(' - ');
    const [h1, m1] = startStr.split(':').map(Number);
    const startMin = (h1 || 0) * 60 + (m1 || 0);
    
    const [h2, m2] = (endStr || '23:59').split(':').map(Number);
    const endMin = (h2 || 0) * 60 + (m2 || 0);

    const isDone = currentTotalMins >= endMin || item.completed;
    const isCur = !item.completed && currentTotalMins >= startMin && currentTotalMins < endMin;
    
    return { ...item, isDone, isCur, startMin, endMin };
  });

  // Auto select active item or closest
  useEffect(() => {
    if (dynamicSchedule.length > 0 && !selectedActId) {
      const activeOrClosest = dynamicSchedule.find(i => i.isCur) || dynamicSchedule[dynamicSchedule.length - 1];
      if (activeOrClosest) setSelectedActId(activeOrClosest.id);
    }
  }, [dynamicSchedule.length, selectedActId]);

  // Push notifications logic
  useEffect(() => {
    const currentAct = dynamicSchedule.find(i => i.isCur);
    if (currentAct) {
      const timeLeft = currentAct.endMin - currentTotalMins;
      // Notify when 10 mins or less left
      if (timeLeft <= 10 && timeLeft >= 0 && !notifiedActs.has(currentAct.id)) {
        const group = getUIGroup(currentAct.activityName);
        if (['meal', 'nap', 'study', 'play'].includes(group)) {
          addToast(`🔔 Sắp hết giờ: Vui lòng ghi nhận đánh giá cho hoạt động "${currentAct.activityName}"!`);
          setNotifiedActs(prev => new Set(prev).add(currentAct.id));
        }
      }
    }
  }, [currentTotalMins, dynamicSchedule, notifiedActs]);

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>Đang tải lịch trình...</div>;
  }

  const selectedItem = dynamicSchedule.find(i => i.id === selectedActId) || dynamicSchedule[0];
  const curGroup = selectedItem ? getUIGroup(selectedItem.activityName) : 'study';

  // --- MATRIX RESOLUTION ---
  const getMatrixData = () => {
    if (!selectedItem) return { hasMatrix: false, batchLabel: '', matrix: [] };
    const group = getUIGroup(selectedItem.activityName);
    
    // Determine which field to log based on group
    let optType: keyof typeof OPTSETS | null = null;
    let records: any[] = [];
    let field = '';
    
    if (group === 'meal') {
      optType = 'meal';
      records = mealRecords;
      const h = parseInt((selectedItem.timeSlot || '00:00').split(':')[0] || '0', 10);
      if (h < 10) field = 'breakfast';
      else if (h < 13) field = 'lunch';
      else field = 'afternoonSnack';
    } else if (group === 'nap') {
      optType = 'nap';
      records = activityRecords;
      field = 'nap';
    } else if (group === 'study' || group === 'play') {
      optType = 'study';
      records = activityRecords;
      field = 'participation';
    }

    if (!optType || records.length === 0) {
      return { hasMatrix: false, batchLabel: '', matrix: [] };
    }

    const opts = OPTSETS[optType];
    const batchLabel = 'Tất cả: ' + opts[0].label.replace(/^.*? /, '');
    const GROUP_WIDTHS = { meal: 318, nap: 220, study: 650 };
    const groupWidth = GROUP_WIDTHS[optType];

    const matrix = records.map((rec, i) => {
      const val = rec[field];
      const activeIndex = opts.findIndex(o => o.k === val);
      const activeColor = activeIndex >= 0 ? opts[activeIndex].dot : '#005A36';
      
      return {
        id: rec.studentId,
        name: rec.studentName,
        avatar: rec.avatarUrl,
        initial: rec.studentName.charAt(0).toUpperCase(),
        grad: ['#00794A', '#2563EB', '#8B5CF6', '#D97706', '#059669', '#DB2777'][i % 6],
        groupWidth,
        activeIndex,
        activeColor,
        totalOptions: opts.length,
        options: opts.map((o, idx) => ({
          k: o.k,
          label: o.label, // Keep emoji!
          active: val === o.k,
          pick: () => {
            if (group === 'meal') handleMealStatusChange(rec.studentId, field as any, o.k as any);
            if (group === 'nap') handleActivityNapChange(rec.studentId, o.k as any);
            if (group === 'study' || group === 'play') handleActivityParticipationChange(rec.studentId, o.k as any);
          }
        }))
      };
    });

    return { hasMatrix: true, batchLabel, matrix, group };
  };

  const { hasMatrix, batchLabel, matrix, group } = getMatrixData();

  return (
    <DashboardLayout>
    <S.Container>
      <S.TopHeader>
        <div>
          <S.HeaderSubtitle>Lớp Mầm 1 · Hôm nay</S.HeaderSubtitle>
          <S.Title>Hoạt động & Lịch trình</S.Title>
        </div>
        <S.CurrentStatusBadge>
          <S.DotPulse />
          <S.StatusText>
            Đang diễn ra: <strong>{selectedItem?.activityName || 'N/A'}</strong>
          </S.StatusText>
          {saving && <span style={{fontSize: 12, color: '#6b7280'}}>Đang lưu...</span>}
        </S.CurrentStatusBadge>
      </S.TopHeader>

      <S.SplitContainer>
        {/* LEFT COLUMN: TIMELINE */}
        <S.TimelineColumn>
          <S.TimelineHeader>
            <S.TimelineTitle>Lịch sinh hoạt</S.TimelineTitle>
            <S.TimelineProgress>{dynamicSchedule.filter(i => i.isDone).length}/{dynamicSchedule.length} xong</S.TimelineProgress>
          </S.TimelineHeader>
          
          <S.TimelineList>
            {dynamicSchedule.map((item, i) => {
              const uigroup = getUIGroup(item.activityName);
              const pal = PALETTES[uigroup];
              const isSelected = item.id === selectedActId;
              const isCur = item.isCur;
              const isDone = item.isDone;
              
              // Only active timeline item gets full brand color dot, others are gray or light green
              const dotColor = isCur ? '#005A36' : (isDone ? '#A7C9B6' : '#D1D5DB');
              
              return (
                <S.TimelineItemWrapper key={item.id}>
                  <S.TimelineDotCol>
                    <S.DotNode $bg={dotColor} $isCur={isCur} />
                    {i < dynamicSchedule.length - 1 && <S.VerticalLine />}
                  </S.TimelineDotCol>
                  
                  <S.TimelineCard 
                    $bg={isSelected ? pal.tint : '#fff'}
                    $borderColor={isSelected ? pal.solid : '#EEF4F0'}
                    $isDone={isDone && !isCur}
                    $isCur={isCur}
                    onClick={() => setSelectedActId(item.id)}
                  >
                    <S.TimelineIconBox $bg={pal.tint} $color={pal.solid}>
                      {ICON_MAP[uigroup]}
                    </S.TimelineIconBox>
                    <S.TimelineCardContent>
                      <S.TimelineTimeText $color={isDone && !isCur ? '#9CA3AF' : pal.solid}>
                        {item.timeSlot}
                      </S.TimelineTimeText>
                      <S.TimelineNameText $color={isDone && !isCur ? '#9CA3AF' : '#1F2937'}>
                        {item.activityName}
                      </S.TimelineNameText>
                    </S.TimelineCardContent>
                    {isDone && (
                      <S.TimelineDoneIcon>
                        <Check size={17} strokeWidth={2.5} />
                      </S.TimelineDoneIcon>
                    )}
                  </S.TimelineCard>
                </S.TimelineItemWrapper>
              );
            })}
          </S.TimelineList>
        </S.TimelineColumn>

        {/* RIGHT COLUMN: LOGGING & MATRIX */}
        <S.RightCol>
          {curGroup === 'meal' && (
            <S.MenuSection>
              <S.MenuHeader>
                <S.MenuTitle><Utensils size={18} /> Thực đơn hôm nay</S.MenuTitle>
                {!isMenuEditing ? (
                  <S.EditMenuBtn onClick={() => setIsMenuEditing(true)}>
                    Sửa thực đơn
                  </S.EditMenuBtn>
                ) : (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <S.EditMenuBtn 
                      onClick={() => setIsMenuEditing(false)} 
                      style={{ background: '#fff', color: '#6b7280', borderColor: '#d1d5db' }}
                    >
                      Hủy
                    </S.EditMenuBtn>
                    <S.EditMenuBtn 
                      onClick={async () => {
                        const success = await handleSaveMenu();
                        if (success) addToast('✅ Đã lưu thực đơn thành công!');
                      }}
                      style={{ background: '#d97706', color: '#fff' }}
                    >
                      Lưu thực đơn
                    </S.EditMenuBtn>
                  </div>
                )}
              </S.MenuHeader>
              <S.MenuGrid>
                <S.MenuMealBox>
                  <S.MenuMealLabel>Bữa sáng</S.MenuMealLabel>
                  {isMenuEditing ? (
                    <S.MenuInput 
                      value={editedMenu.breakfastMenu}
                      onChange={(e) => setEditedMenu({...editedMenu, breakfastMenu: e.target.value})}
                      placeholder="Nhập thực đơn bữa sáng..."
                    />
                  ) : (
                    <S.MenuMealText>{menu.breakfastMenu || 'Chưa cập nhật'}</S.MenuMealText>
                  )}
                </S.MenuMealBox>
                <S.MenuMealBox>
                  <S.MenuMealLabel>Bữa trưa</S.MenuMealLabel>
                  {isMenuEditing ? (
                    <S.MenuInput 
                      value={editedMenu.lunchMenu}
                      onChange={(e) => setEditedMenu({...editedMenu, lunchMenu: e.target.value})}
                      placeholder="Nhập thực đơn bữa trưa..."
                    />
                  ) : (
                    <S.MenuMealText>{menu.lunchMenu || 'Chưa cập nhật'}</S.MenuMealText>
                  )}
                </S.MenuMealBox>
                <S.MenuMealBox>
                  <S.MenuMealLabel>Bữa xế</S.MenuMealLabel>
                  {isMenuEditing ? (
                    <S.MenuInput 
                      value={editedMenu.afternoonSnackMenu}
                      onChange={(e) => setEditedMenu({...editedMenu, afternoonSnackMenu: e.target.value})}
                      placeholder="Nhập thực đơn bữa xế..."
                    />
                  ) : (
                    <S.MenuMealText>{menu.afternoonSnackMenu || 'Chưa cập nhật'}</S.MenuMealText>
                  )}
                </S.MenuMealBox>
              </S.MenuGrid>
            </S.MenuSection>
          )}

          <S.SectionCard>
            <S.MatrixHeader>
              <S.MatrixIconBox $bg={PALETTES[curGroup].tint} $color={PALETTES[curGroup].solid}>
                {ICON_MAP[curGroup]}
              </S.MatrixIconBox>
              <S.MatrixTitleArea>
                <S.MatrixTitle>{selectedItem?.activityName}</S.MatrixTitle>
                <S.MatrixDesc>{selectedItem?.timeSlot} · Ghi nhận điểm danh & sinh hoạt</S.MatrixDesc>
              </S.MatrixTitleArea>
              
              {hasMatrix && (
                <S.BatchBtn 
                  onClick={() => {
                    if (selectedItem?.completed) return;
                    if (group === 'meal') handleBulkMarkMealsAll();
                    else handleBulkMarkActivitiesGood();
                  }}
                  style={{ 
                    opacity: selectedItem?.completed ? 0.5 : 1, 
                    cursor: selectedItem?.completed ? 'not-allowed' : 'pointer',
                    pointerEvents: selectedItem?.completed ? 'none' : 'auto'
                  }}
                >
                  ⚡ {batchLabel}
                </S.BatchBtn>
              )}
            </S.MatrixHeader>

            {hasMatrix ? (
              <S.MatrixList>
                {matrix.map((m: any) => {
                  const isExpanded = expandedStudentId === m.id;
                  const hasNoteOrPhoto = !!m.note || !!m.photoUrl;
                  return (
                    <div key={m.id}>
                      <S.MatrixRow style={{ borderRadius: isExpanded ? '12px 12px 0 0' : '12px' }}>
                        <S.AvatarNode $bg={m.grad} $imgUrl={m.avatar}>{m.initial}</S.AvatarNode>
                        <S.StudentNameNode>{m.name}</S.StudentNameNode>
                        <S.OptionsGroup $width={m.groupWidth}>
                          <S.ActiveHighlight 
                            $index={m.activeIndex} 
                            $total={m.totalOptions} 
                            $color={m.activeColor} 
                          />
                          {m.options.map((opt: any) => (
                            <S.OptionBtn 
                              key={opt.k} 
                              $active={opt.active} 
                              onClick={() => {
                                if (!selectedItem?.completed) opt.pick();
                              }}
                              style={{
                                opacity: selectedItem?.completed && !opt.active ? 0.4 : 1,
                                cursor: selectedItem?.completed ? 'not-allowed' : 'pointer'
                              }}
                            >
                              {opt.label}
                            </S.OptionBtn>
                          ))}
                        </S.OptionsGroup>
                        <S.EditNoteBtn 
                          $active={isExpanded || hasNoteOrPhoto} 
                          onClick={() => setExpandedStudentId(isExpanded ? null : m.id)}
                          title="Thêm nhận xét và ảnh minh chứng"
                        >
                          <MessageSquare size={18} />
                        </S.EditNoteBtn>
                      </S.MatrixRow>
                      
                      <S.NoteAccordion $expanded={isExpanded}>
                        <S.AccordionContent>
                          <div>
                            <LocalNoteTextarea 
                              placeholder="Nhận xét chi tiết của giáo viên về bé..." 
                              value={m.note || ''}
                              onChange={(val) => curGroup === 'meal' ? handleMealNoteChange(m.id, val) : handleActivityNoteChange(m.id, val)}
                            />
                            <S.PhotoUploadBox>
                              {m.photoUrl ? (
                                <S.PhotoPreview src={m.photoUrl} alt="Minh chứng" />
                              ) : (
                                <>
                                  <Camera size={24} />
                                  <span style={{ fontSize: '12px', fontWeight: 500 }}>Tải ảnh</span>
                                </>
                              )}
                              <input type="file" accept="image/*" onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const url = await ActivitiesService.uploadImage(file);
                                  if (url) {
                                    if (curGroup === 'meal') handleMealPhotoChange(m.id, url);
                                    else handleActivityPhotoChange(m.id, url);
                                  }
                                }
                              }} />
                            </S.PhotoUploadBox>
                          </div>
                        </S.AccordionContent>
                      </S.NoteAccordion>
                    </div>
                  );
                })}
              </S.MatrixList>
            ) : (
              <S.EmptyMatrixCard>
                <S.MatrixIconBox $bg="#E6EEE9" $color="#9CA3AF">
                  <MapPin size={24} />
                </S.MatrixIconBox>
                <div>
                  <S.EmptyMatrixTitle>Hoạt động này không cần ghi nhận chi tiết</S.EmptyMatrixTitle>
                  <S.EmptyMatrixDesc>Chọn một mốc sinh hoạt khác (ăn, ngủ, học) ở cột trái để ghi nhanh cho từng bé.</S.EmptyMatrixDesc>
                </div>
              </S.EmptyMatrixCard>
            )}
            
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '16px' }}>
              {selectedItem?.completed ? (
                <span style={{ color: '#059669', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={18} strokeWidth={2.5} />
                  Đã ghi nhận xong (Khóa)
                </span>
              ) : (
                <S.BatchBtn onClick={async () => {
                  if (selectedItem?.id) {
                    handleScheduleStatusChange(selectedItem.id, true);
                  }
                  await handleSave();
                }}>
                  Lưu cập nhật
                </S.BatchBtn>
              )}
            </div>
          </S.SectionCard>


        </S.RightCol>
      </S.SplitContainer>

      {/* TOASTS CONTAINER */}
      <S.ToastContainer>
        {toasts.map(t => (
          <S.ToastMsg key={t.id}>{t.text}</S.ToastMsg>
        ))}
      </S.ToastContainer>

    </S.Container>
    </DashboardLayout>
  );
};
